import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = process.cwd();
const ENV_FILE = path.join(ROOT, ".env.local");
const BUCKET = "projects";

function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) throw new Error(`No existe ${ENV_FILE}`);

  for (const line of fs.readFileSync(ENV_FILE, "utf8").split(/\r?\n/)) {
    const text = line.trim();
    if (!text || text.startsWith("#")) continue;

    const i = text.indexOf("=");
    if (i === -1) continue;

    const key = text.slice(0, i).trim();
    let value = text.slice(i + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) value = value.slice(1, -1);

    if (!process.env[key]) process.env[key] = value;
  }
}

function normalizeFileNameFromUrl(url?: string | null) {
  if (!url) return "";
  try {
    return decodeURIComponent(new URL(url).pathname.split("/").pop() || "").toLowerCase();
  } catch {
    return decodeURIComponent(url.split("/").pop() || "").toLowerCase();
  }
}

function naturalSort(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

const GLOBAL_ASSET_PATTERNS = [
  "home_architect2_",
  "footer",
  "retina",
  "umu_marca",
  "01-blanco-sin-fondo",
  "pattern",
  "sep2",
  "logo",
];

function shouldIgnoreGlobalAsset(filename: string) {
  const f = filename.toLowerCase();
  return GLOBAL_ASSET_PATTERNS.some((part) => f.includes(part));
}

async function main() {
  loadEnv();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRole) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, slug, title, hero_image, sketch_image, cover_image")
    .order("title");

  if (projectsError) throw projectsError;

  for (const project of projects ?? []) {
    const { data: objects, error } = await supabase.storage
      .from(BUCKET)
      .list(project.slug, {
        limit: 1000,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error(`✗ ${project.title}: ${error.message}`);
      continue;
    }

    const hero = normalizeFileNameFromUrl(project.hero_image);
    const sketch = normalizeFileNameFromUrl(project.sketch_image);
    const cover = normalizeFileNameFromUrl(project.cover_image);

    const imageObjects = (objects ?? [])
      .filter((object) => {
        const name = object.name.toLowerCase();

        if (!/\.(jpe?g|png|webp|gif)$/i.test(name)) return false;
        if (shouldIgnoreGlobalAsset(name)) return false;

        // El croquis NUNCA va dentro de la galería interna.
        if (name === sketch) return false;

        // Cover suele ser la misma imagen que hero; evitamos duplicados.
        if (cover && name === cover && cover !== hero) return false;

        return true;
      })
      .sort((a, b) => naturalSort(a.name, b.name));

    const urls = imageObjects.map((object) =>
      supabase.storage
        .from(BUCKET)
        .getPublicUrl(`${project.slug}/${object.name}`).data.publicUrl
    );

    const { error: updateError } = await supabase
      .from("projects")
      .update({ gallery_images: urls })
      .eq("id", project.id);

    if (updateError) {
      console.error(`✗ ${project.title}: ${updateError.message}`);
      continue;
    }

    console.log(`✓ ${project.title}: ${urls.length} imágenes de galería`);
  }

  console.log("\nGalerías sincronizadas por carpeta de proyecto.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
