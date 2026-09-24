import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = process.cwd();
const IMPORT_PROJECTS = path.join(ROOT, "import-data", "Proyectos");
const ENV_FILE = path.join(ROOT, ".env.local");

const sqlArg = process.argv.find(
  (arg) => arg.toLowerCase().endsWith(".sql")
);

if (!sqlArg) {
  console.error(
    'Uso: npx tsx scripts/import-wordpress-likes.ts "C:\\ruta\\database-local.sql"'
  );
  process.exit(1);
}

const SQL_FILE = path.resolve(sqlArg);

function loadEnv() {
  const content = fs.readFileSync(ENV_FILE, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) val = val.slice(1, -1);
    if (!process.env[key]) process.env[key] = val;
  }
}

async function main() {
  loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const wordpressToSlug = new Map<number, string>();

  for (const folder of fs.readdirSync(IMPORT_PROJECTS)) {
    const jsonPath = path.join(IMPORT_PROJECTS, folder, "proyecto.json");
    if (!fs.existsSync(jsonPath)) continue;

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (data.wordpress_id && data.slug) {
      wordpressToSlug.set(Number(data.wordpress_id), data.slug);
    }
  }

  const sql = fs.readFileSync(SQL_FILE, "utf8");

  // BeTheme usa mfn-post-love para el contador de "Love".
  const regex =
    /\(\s*\d+\s*,\s*(\d+)\s*,\s*'mfn-post-love'\s*,\s*'([^']*)'\s*\)/g;

  let match: RegExpExecArray | null;
  let count = 0;

  while ((match = regex.exec(sql)) !== null) {
    const wpPostId = Number(match[1]);
    const likes = Number.parseInt(match[2], 10);
    const slug = wordpressToSlug.get(wpPostId);

    if (!slug || !Number.isFinite(likes)) continue;

    const { error } = await supabase
      .from("projects")
      .update({ likes_count: likes })
      .eq("slug", slug);

    if (error) {
      console.error(`✗ ${slug}: ${error.message}`);
    } else {
      console.log(`✓ ${slug}: ${likes}`);
      count++;
    }
  }

  console.log(`\nLikes importados: ${count}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
