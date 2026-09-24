import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = process.cwd();
const ENV = path.join(ROOT, ".env.local");
const JSON_FILE = path.join(ROOT, "import-data", "SitioV3", "nosotros-structure.json");

function loadEnv() {
  const text = fs.readFileSync(ENV, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  }
}

function textOnly(html: string) {
  return html
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSegment(html: string, start: string, end?: string) {
  const s = html.toLowerCase().indexOf(start.toLowerCase());
  if (s < 0) return "";
  const tail = html.slice(s);
  if (!end) return tail;
  const e = tail.toLowerCase().indexOf(end.toLowerCase());
  return e > 0 ? tail.slice(0, e) : tail;
}

function extractParagraphs(html: string) {
  const out: string[] = [];
  const re = /<(?:p|div)[^>]*>([\s\S]*?)<\/(?:p|div)>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const t = textOnly(m[1]);
    if (t.length > 20) out.push(t);
  }
  return [...new Set(out)];
}

async function findImage(supabase: any, needle: string) {
  const { data, error } = await supabase.storage.from("site-content").list("nosotros", { limit: 1000 });
  if (error) throw error;
  const item = (data ?? []).find((x: any) => x.name.includes(needle));
  if (!item) return null;
  return supabase.storage.from("site-content").getPublicUrl(`nosotros/${item.name}`).data.publicUrl;
}

async function main() {
  loadEnv();
  const data = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));
  const html = data.rendered_html ?? "";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  const introHtml = extractSegment(html, "UNO MÁS UNO Arquitectos", "CONOCENOS");
  const introParagraphs = extractParagraphs(introHtml);
  const lead = introParagraphs.find((p) => /Somos un Estudio de Arquitectura/i.test(p)) ?? introParagraphs[0] ?? null;
  const introBody = introParagraphs.filter((p) => p !== lead).join("\n");

  const celesteHtml = extractSegment(html, "CELESTE GOMEZ LAHOZ", "Nahuel Salcedo");
  const nahuelHtml = extractSegment(html, "Nahuel Salcedo");

  const celesteBody = extractParagraphs(celesteHtml).filter((p) => !/CELESTE GOMEZ LAHOZ|MGTR\. ARQUITECTA/i.test(p)).join("\n");
  const nahuelBody = extractParagraphs(nahuelHtml).filter((p) => !/Nahuel Salcedo|ARQUITECTO/i.test(p)).join("\n");

  const celesteImage = await findImage(supabase, "14_11_50");
  const nahuelImage = await findImage(supabase, "14_11_49");

  await supabase.from("content_entries").delete().eq("section", "nosotros");

  const rows = [
    {
      section: "nosotros",
      title: "UNO MÁS UNO Arquitectos",
      subtitle: lead,
      body: introBody || null,
      image_url: null,
      actions: [],
      layout_variant: "intro",
      position: 1,
      published: true,
    },
    {
      section: "nosotros",
      title: "CELESTE GOMEZ LAHOZ",
      subtitle: "MGTR. ARQUITECTA",
      body: celesteBody || null,
      image_url: celesteImage,
      actions: [],
      layout_variant: "person",
      position: 2,
      published: true,
    },
    {
      section: "nosotros",
      title: "Nahuel Salcedo",
      subtitle: "ARQUITECTO",
      body: nahuelBody || null,
      image_url: nahuelImage,
      actions: [],
      layout_variant: "person",
      position: 3,
      published: true,
    },
  ];

  for (const row of rows) {
    const { error } = await supabase.from("content_entries").insert(row);
    if (error) console.error(`✗ ${row.title}: ${error.message}`);
    else console.log(`✓ ${row.title}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
