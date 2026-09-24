import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type SectionName = "mentions" | "academia";

type StructureLink = {
  label?: string;
  href?: string;
  class?: string;
};

type StructureImage = {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
};

type StructureBlock = {
  position: number;
  class?: string;
  id?: string;
  data?: {
    text?: string;
    headings?: string[];
    paragraphs?: string[];
    images?: StructureImage[];
    links?: StructureLink[];
  };
};

type StructureJson = {
  page?: {
    id?: number;
    slug?: string;
    title?: string;
    permalink?: string;
  };
  blocks?: StructureBlock[];
  links?: StructureLink[];
  rendered_html?: string;
};

const ROOT = process.cwd();
const ENV_FILE = path.join(ROOT, ".env.local");

// Carpeta donde vas a copiar los JSON V3.
const SOURCE_DIR =
  process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(ROOT, "import-data", "SitioV3");

// Bucket donde ya subimos las imágenes de Menciones/Academia/Nosotros.
const BUCKET = "site-content";

const FILES: Array<{
  file: string;
  section: SectionName;
  storageFolder: string;
}> = [
  { file: "menciones-structure.json", section: "mentions", storageFolder: "mentions" },
  { file: "academia-structure.json", section: "academia", storageFolder: "academia" },
];

const IGNORE_IMAGE_PARTS = [
  "umu_marca",
  "01-blanco-sin-fondo",
  "home_architect2_sep2",
  "footer",
  "logo-horizontal-premio-edificar-negro-300x146-1", // se conserva solo si es la única imagen útil
];

function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) {
    throw new Error(`No existe ${ENV_FILE}`);
  }

  const text = fs.readFileSync(ENV_FILE, "utf8");

  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;

    const i = t.indexOf("=");
    if (i < 0) continue;

    const key = t.slice(0, i).trim();
    let value = t.slice(i + 1).trim();

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

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function fileNameFromUrl(url: string) {
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname.split("/").pop() ?? "");
  } catch {
    return decodeURIComponent(url.split("/").pop() ?? "");
  }
}

function isUsefulImage(image: StructureImage) {
  const src = image.src ?? "";
  const file = normalize(fileNameFromUrl(src));

  if (!src) return false;

  return !IGNORE_IMAGE_PARTS.some((part) => file.includes(part));
}

function chooseImage(images: StructureImage[] = []) {
  const useful = images.filter(isUsefulImage);

  if (useful.length) return useful[0];

  // Si el bloque no tiene otra cosa, permitimos un logo que puede ser contenido.
  return images.find((image) => {
    const file = normalize(fileNameFromUrl(image.src ?? ""));
    return file && !file.includes("home_architect2_sep2");
  }) ?? null;
}

function chooseTitle(block: StructureBlock) {
  const headings = (block.data?.headings ?? [])
    .map((s) => s.trim())
    .filter(Boolean);

  if (headings.length) return headings[0];

  const paragraphs = (block.data?.paragraphs ?? [])
    .map((s) => s.trim())
    .filter(Boolean);

  if (paragraphs.length) {
    // Si no hay heading, una línea corta puede ser el título.
    const short = paragraphs.find((p) => p.length <= 100);
    if (short) return short;
  }

  const text = (block.data?.text ?? "").trim();
  return text ? text.slice(0, 100) : "Contenido";
}

function chooseSubtitle(block: StructureBlock, title: string) {
  const headings = (block.data?.headings ?? [])
    .map((s) => s.trim())
    .filter(Boolean);

  if (headings.length > 1) {
    return headings[1];
  }

  const paragraphs = (block.data?.paragraphs ?? [])
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((p) => p !== title);

  if (!paragraphs.length) return null;

  const first = paragraphs[0];

  // En el sitio viejo, muchas bajadas son frases relativamente cortas:
  // "SEGUNDO PREMIO", "MENCIÓN ESPECIAL", "Club House N° ...", etc.
  return first.length <= 160 ? first : null;
}

function chooseBody(
  block: StructureBlock,
  title: string,
  subtitle: string | null
) {
  const paragraphs = (block.data?.paragraphs ?? [])
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((p) => p !== title && p !== subtitle);

  if (!paragraphs.length) return null;

  return paragraphs.join("\n");
}

function chooseActions(block: StructureBlock) {
  const links = block.data?.links ?? [];

  return links
    .map((link) => ({
      label: (link.label ?? "").trim(),
      url: (link.href ?? "").trim(),
    }))
    .filter(
      (link) =>
        link.url &&
        link.label &&
        /^ver\b/i.test(link.label)
    );
}

function normalizeExternalUrl(url: string) {
  // En producción conviene HTTPS.
  if (url.startsWith("http://unomasunoarquitectos.com.ar/")) {
    return url.replace(
      "http://unomasunoarquitectos.com.ar/",
      "https://unomasunoarquitectos.com.ar/"
    );
  }
  return url;
}

function publicStorageUrl(
  supabaseUrl: string,
  folder: string,
  originalImageUrl: string
) {
  const filename = fileNameFromUrl(originalImageUrl);

  // El importador anterior creó nombres 001-, 002-, etc.
  // En vez de adivinar el prefijo consultaremos Storage.
  return { filename, folder };
}

async function findUploadedImageUrl(
  supabase: ReturnType<typeof createClient>,
  storageFolder: string,
  originalImageUrl: string
): Promise<string | null> {
  const filename = fileNameFromUrl(originalImageUrl);

  if (!filename) return null;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(storageFolder, {
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error(`Storage ${storageFolder}: ${error.message}`);
    return null;
  }

  const normalizedTarget = normalize(filename);

  const match = (data ?? []).find((object) => {
    const candidate = normalize(object.name);

    return (
      candidate === normalizedTarget ||
      candidate.endsWith(`-${normalizedTarget}`) ||
      candidate.includes(normalizedTarget)
    );
  });

  if (!match) return null;

  return supabase.storage
    .from(BUCKET)
    .getPublicUrl(`${storageFolder}/${match.name}`).data.publicUrl;
}

function meaningfulBlocks(structure: StructureJson) {
  return (structure.blocks ?? []).filter((block) => {
    const data = block.data;
    if (!data) return false;

    const title = chooseTitle(block);
    const usefulImage = chooseImage(data.images ?? []);
    const actions = chooseActions(block);

    // Evita bloques meramente decorativos.
    return Boolean(
      usefulImage ||
      actions.length ||
      (title && title.length > 2)
    );
  });
}

async function importSection(
  supabase: ReturnType<typeof createClient>,
  sourceFile: string,
  section: SectionName,
  storageFolder: string
) {
  const jsonPath = path.join(SOURCE_DIR, sourceFile);

  if (!fs.existsSync(jsonPath)) {
    throw new Error(`No existe ${jsonPath}`);
  }

  const structure: StructureJson = JSON.parse(
    fs.readFileSync(jsonPath, "utf8")
  );

  const blocks = meaningfulBlocks(structure);

  console.log(`\n${section.toUpperCase()}: ${blocks.length} bloques detectados`);

  // Primero quitamos las entradas genéricas creadas por el importador anterior.
  const { error: deleteError } = await supabase
    .from("content_entries")
    .delete()
    .eq("section", section);

  if (deleteError) throw deleteError;

  let position = 1;

  for (const block of blocks) {
    const title = chooseTitle(block);
    const subtitle = chooseSubtitle(block, title);
    const body = chooseBody(block, title, subtitle);

    const image = chooseImage(block.data?.images ?? []);
    const imageUrl = image?.src
      ? await findUploadedImageUrl(
          supabase,
          storageFolder,
          image.src
        )
      : null;

    const actions = chooseActions(block).map((action) => ({
      ...action,
      url: normalizeExternalUrl(action.url),
    }));

    const layoutVariant =
      position % 2 === 1 ? "text-left" : "image-left";

    const { error } = await supabase.from("content_entries").insert({
      section,
      title,
      subtitle,
      body,
      image_url: imageUrl,
      actions,
      layout_variant: layoutVariant,
      position,
      published: true,
    });

    if (error) {
      console.error(`✗ ${title}: ${error.message}`);
      continue;
    }

    console.log(`✓ ${position}. ${title}`);
    console.log(`   Layout: ${layoutVariant}`);
    if (imageUrl) console.log(`   Imagen: ${fileNameFromUrl(imageUrl)}`);
    for (const action of actions) {
      console.log(`   ${action.label}: ${action.url}`);
    }

    position++;
  }
}

async function main() {
  loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local"
    );
  }

  const supabase = createClient(url, serviceRole, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  for (const config of FILES) {
    await importSection(
      supabase,
      config.file,
      config.section,
      config.storageFolder
    );
  }

  console.log("\n======================================");
  console.log("IMPORTACIÓN EDITORIAL V3 TERMINADA");
  console.log("======================================");
  console.log("");
  console.log("Ahora revisá:");
  console.log("http://localhost:3000/menciones");
  console.log("http://localhost:3000/academia");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
