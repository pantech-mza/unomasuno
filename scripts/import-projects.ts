import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type ProjectJson = {
  wordpress_id?: number;
  title: string;
  slug: string;
  status?: string;
  date?: string;
  modified?: string;
  menu_order?: number;
  location?: string;
  area?: string;
  year?: string | number;
  description?: string;
  images?: Array<{
    file: string;
    original_relative_path?: string;
    sources?: string[];
  }>;
};

const ROOT = process.cwd();
const IMPORT_ROOT = path.join(ROOT, "import-data", "Proyectos");
const ENV_FILE = path.join(ROOT, ".env.local");
const BUCKET = "projects";

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function mimeType(filename: string) {
  switch (path.extname(filename).toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".avif":
      return "image/avif";
    case ".tif":
    case ".tiff":
      return "image/tiff";
    default:
      return "application/octet-stream";
  }
}

function safeStorageName(filename: string) {
  return filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-");
}

function parseYear(value: ProjectJson["year"]) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(String(value).match(/\d{4}/)?.[0] ?? value);
  return Number.isFinite(n) ? n : null;
}

async function main() {
  loadEnvFile(ENV_FILE);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local"
    );
  }

  if (!fs.existsSync(IMPORT_ROOT)) {
    throw new Error(`No existe: ${IMPORT_ROOT}`);
  }

  const supabase = createClient(url, serviceRole, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const folders = fs
    .readdirSync(IMPORT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "es"));

  console.log(`\nEncontrados ${folders.length} proyectos.\n`);

  let ok = 0;
  let failed = 0;

  for (const [folderIndex, folderName] of folders.entries()) {
    const folderPath = path.join(IMPORT_ROOT, folderName);
    const jsonPath = path.join(folderPath, "proyecto.json");
    const imagesPath = path.join(folderPath, "images");

    console.log(
      `\n[${folderIndex + 1}/${folders.length}] ${folderName}`
    );

    try {
      if (!fs.existsSync(jsonPath)) {
        throw new Error("No existe proyecto.json");
      }

      const project: ProjectJson = JSON.parse(
        fs.readFileSync(jsonPath, "utf8")
      );

      if (!project.title || !project.slug) {
        throw new Error("proyecto.json no tiene title o slug");
      }

      const { data: projectRow, error: projectError } = await supabase
        .from("projects")
        .upsert(
          {
            title: project.title,
            slug: project.slug,
            location: project.location || null,
            area: project.area || null,
            year: parseYear(project.year),
            description: project.description || null,
            position: project.menu_order ?? folderIndex,
            published: project.status ? project.status === "publish" : true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "slug" }
        )
        .select("id, slug")
        .single();

      if (projectError || !projectRow) {
        throw projectError ?? new Error("No se pudo guardar el proyecto");
      }

      const projectId = projectRow.id;
      const slug = projectRow.slug;

      // Limpiamos las relaciones previas para que el script sea re-ejecutable.
      const { error: deleteImagesError } = await supabase
        .from("project_images")
        .delete()
        .eq("project_id", projectId);

      if (deleteImagesError) {
        throw deleteImagesError;
      }

      let imageFiles: string[] = [];

      if (fs.existsSync(imagesPath)) {
        imageFiles = fs
          .readdirSync(imagesPath)
          .filter((file) =>
            [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif", ".tif", ".tiff"].includes(
              path.extname(file).toLowerCase()
            )
          );
      }

      // Mantiene el orden del JSON cuando existe.
      if (project.images?.length) {
        const order = new Map(
          project.images.map((img, index) => [img.file, index])
        );

        imageFiles.sort((a, b) => {
          const ai = order.has(a) ? order.get(a)! : 999999;
          const bi = order.has(b) ? order.get(b)! : 999999;
          return ai - bi || a.localeCompare(b);
        });
      } else {
        imageFiles.sort((a, b) => a.localeCompare(b));
      }

      const insertedImages: Array<{
        image_url: string;
        position: number;
        storage_path: string;
      }> = [];

      for (const [position, filename] of imageFiles.entries()) {
        const absolutePath = path.join(imagesPath, filename);
        const storageFilename = safeStorageName(filename);
        const storagePath = `${slug}/${String(position + 1).padStart(
          3,
          "0"
        )}-${storageFilename}`;

        const fileBuffer = fs.readFileSync(absolutePath);

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(storagePath, fileBuffer, {
            contentType: mimeType(filename),
            upsert: true,
            cacheControl: "31536000",
          });

        if (uploadError) {
          throw new Error(
            `Error subiendo ${filename}: ${uploadError.message}`
          );
        }

        const { data: publicUrlData } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(storagePath);

        const publicUrl = publicUrlData.publicUrl;

        insertedImages.push({
          image_url: publicUrl,
          position,
          storage_path: storagePath,
        });

        const { error: relationError } = await supabase
          .from("project_images")
          .insert({
            project_id: projectId,
            image_url: publicUrl,
            position,
          });

        if (relationError) {
          throw new Error(
            `Error creando project_images para ${filename}: ${relationError.message}`
          );
        }

        console.log(`   ✓ ${position + 1}/${imageFiles.length} ${filename}`);
      }

      // Primera imagen = portada inicial.
      // Luego podemos separar cover/sketch manualmente desde el Admin.
      if (insertedImages.length > 0) {
        const { error: coverError } = await supabase
          .from("projects")
          .update({
            cover_image: insertedImages[0].image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", projectId);

        if (coverError) {
          throw coverError;
        }
      }

      console.log(
        `   ✓ ${project.title}: ${imageFiles.length} imágenes + texto importados`
      );
      ok++;
    } catch (error) {
      failed++;
      console.error(
        `   ✗ ERROR:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log("\n========================================");
  console.log(`IMPORTACIÓN TERMINADA`);
  console.log(`Correctos: ${ok}`);
  console.log(`Errores:   ${failed}`);
  console.log("========================================\n");

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("\nERROR GENERAL:");
  console.error(error);
  process.exit(1);
});
