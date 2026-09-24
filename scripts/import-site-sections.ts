import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = process.cwd();
const ENV = path.join(ROOT, ".env.local");
const SOURCE =
  process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(ROOT, "import-data", "Sitio");

function loadEnv() {
  const txt = fs.readFileSync(ENV, "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[k]) process.env[k] = v;
  }
}

function mime(file: string) {
  const e = path.extname(file).toLowerCase();
  if (e === ".png") return "image/png";
  if (e === ".webp") return "image/webp";
  if (e === ".svg") return "image/svg+xml";
  if (e === ".gif") return "image/gif";
  return "image/jpeg";
}

async function main() {
  loadEnv();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  const map: Record<string, "mentions" | "academia" | "nosotros"> = {
    menciones: "mentions",
    academia: "academia",
    nosotros: "nosotros",
  };

  for (const [fileSlug, section] of Object.entries(map)) {
    const jsonPath = path.join(SOURCE, `${fileSlug}.json`);
    if (!fs.existsSync(jsonPath)) {
      console.log(`- Falta ${jsonPath}`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const imageDir = path.join(SOURCE, "images");

    console.log(`\n${fileSlug.toUpperCase()}: ${data.images?.length ?? 0} imágenes`);

    // Subimos todas las imágenes del módulo al bucket.
    const uploaded: string[] = [];

    for (const [i, image] of (data.images ?? []).entries()) {
      const local = path.join(imageDir, image.file);
      if (!fs.existsSync(local)) continue;

      const storagePath = `${section}/${String(i + 1).padStart(3, "0")}-${image.file}`;
      const buffer = fs.readFileSync(local);

      const { error } = await supabase.storage
        .from("site-content")
        .upload(storagePath, buffer, {
          upsert: true,
          contentType: mime(local),
          cacheControl: "31536000",
        });

      if (error) {
        console.error(`✗ ${image.file}: ${error.message}`);
        continue;
      }

      uploaded.push(
        supabase.storage.from("site-content").getPublicUrl(storagePath).data.publicUrl
      );

      console.log(`✓ ${image.file}`);
    }

    // Creamos una entrada base por imagen para que ya aparezcan en el CRM / front.
    // Después pueden editar título/texto/link desde Admin.
    for (const [i, url] of uploaded.entries()) {
      const { error } = await supabase.from("content_entries").insert({
        section,
        title:
          section === "nosotros"
            ? `Contenido Nosotros ${i + 1}`
            : `Contenido ${i + 1}`,
        image_url: url,
        position: i + 1,
        published: true,
      });

      if (error) console.error(`✗ DB ${section} ${i + 1}: ${error.message}`);
    }

    console.log(
      `→ Imágenes cargadas. Los textos estructurados de BeBuilder se terminarán de mapear desde el CRM.`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
