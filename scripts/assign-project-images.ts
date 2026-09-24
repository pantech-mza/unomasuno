import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type Project = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  hero_image: string | null;
  sketch_image: string | null;
};

type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  position: number;
};

const ROOT = process.cwd();
const ENV_FILE = path.join(ROOT, ".env.local");
const APPLY = process.argv.includes("--apply");

/**
 * Opcional: si algún proyecto no queda perfecto con la detección automática,
 * podés forzarlo acá usando una parte única del nombre del archivo.
 *
 * Ejemplo:
 * "casa-pi": {
 *   sketch: "CASAPI",
 *   hero: "Luis-Abba-3-scaled",
 *   cover: "Luis-Abba-3-scaled",
 * },
 */
const OVERRIDES: Record<
  string,
  { sketch?: string; hero?: string; cover?: string }
> = {};

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

    if (!process.env[key]) process.env[key] = value;
  }
}

function filenameFromUrl(url: string) {
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname.split("/").pop() ?? "");
  } catch {
    return decodeURIComponent(url.split("/").pop() ?? "");
  }
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.(jpe?g|png|webp|gif|avif|svg|tiff?)$/i, "")
    .replace(/^\d{3}-/, "")
    .replace(/[^a-z0-9]+/g, "");
}

function readableName(url: string) {
  return filenameFromUrl(url).replace(/^\d{3}-/, "");
}

function findOverride(
  images: ProjectImage[],
  fragment?: string
): ProjectImage | null {
  if (!fragment) return null;

  const f = normalize(fragment);
  return (
    images.find((img) => normalize(readableName(img.image_url)).includes(f)) ??
    null
  );
}

const globalAssetWords = [
  "architect2",
  "footer",
  "pattern",
  "retina",
  "logo",
  "favicon",
  "header",
  "background",
  "bg",
  "icon",
  "muro-page",
];

const planWords = [
  "plano",
  "plant",
  "floorplan",
  "floor-plan",
  "corte",
  "seccion",
  "section",
  "elevacion",
  "elevation",
  "axo",
  "axonometr",
  "pdf",
  "croquis",
];

function isGlobalAsset(name: string) {
  const n = name.toLowerCase();
  return globalAssetWords.some((word) => n.includes(word));
}

function isLikelyPlan(name: string) {
  const n = name.toLowerCase();
  return planWords.some((word) => n.includes(word));
}

function sketchScore(project: Project, image: ProjectImage) {
  const file = readableName(image.image_url);
  const n = normalize(file);
  const slug = normalize(project.slug);
  const title = normalize(project.title);

  let score = 0;

  // Los croquis originales suelen llamarse CASAPI.png, CASARINGO.png, MIOH.png, etc.
  if (n === slug || n === title) score += 120;
  if (n.includes(slug) || slug.includes(n)) score += 75;
  if (n.includes(title) || title.includes(n)) score += 70;

  if (/\.png$/i.test(file)) score += 25;
  if (file.toLowerCase().includes("croquis")) score += 60;
  if (file.toLowerCase().includes("sketch")) score += 60;

  // Evitar recursos globales.
  if (isGlobalAsset(file)) score -= 150;

  // Un plano puede ser válido como miniatura, pero menos probable que el PNG nombrado como proyecto.
  if (isLikelyPlan(file)) score += 5;

  // Preferir los primeros elementos si hay empate.
  score -= image.position * 0.05;

  return score;
}

function photoScore(project: Project, image: ProjectImage) {
  const file = readableName(image.image_url);
  const lower = file.toLowerCase();

  let score = 0;

  if (/\.(jpg|jpeg|webp|avif)$/i.test(file)) score += 35;
  if (/scaled\.(jpg|jpeg|webp)$/i.test(file)) score += 20;

  // Nombres de fotos provenientes del sitio original.
  if (lower.includes("luis")) score += 16;
  if (lower.includes("abba")) score += 16;
  if (lower.includes(project.slug.toLowerCase())) score += 12;

  // Penalizaciones fuertes para croquis, planos y assets de tema.
  if (isGlobalAsset(file)) score -= 200;
  if (isLikelyPlan(file)) score -= 90;
  if (/\.png$/i.test(file)) score -= 10;

  const n = normalize(file);
  if (n === normalize(project.slug) || n === normalize(project.title)) {
    score -= 120;
  }

  // Preferimos imágenes tempranas de la galería, pero no necesariamente la primera.
  score -= image.position * 0.15;

  return score;
}

function bestByScore(
  project: Project,
  images: ProjectImage[],
  scorer: (project: Project, image: ProjectImage) => number,
  excludeIds = new Set<string>()
) {
  const candidates = images
    .filter((img) => !excludeIds.has(img.id))
    .map((img) => ({ img, score: scorer(project, img) }))
    .sort((a, b) => b.score - a.score);

  return candidates[0] ?? null;
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

  const supabase = createClient(url, serviceRole, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id,title,slug,cover_image,hero_image,sketch_image")
    .order("position", { ascending: true });

  if (projectsError) throw projectsError;

  console.log("");
  console.log(
    APPLY
      ? "MODO APLICAR: se actualizará Supabase."
      : "MODO PRUEBA: no se modificará Supabase."
  );
  console.log("");

  let updated = 0;

  for (const project of (projects ?? []) as Project[]) {
    const { data: images, error: imagesError } = await supabase
      .from("project_images")
      .select("id,project_id,image_url,position")
      .eq("project_id", project.id)
      .order("position", { ascending: true });

    if (imagesError) {
      console.error(`✗ ${project.title}: ${imagesError.message}`);
      continue;
    }

    const list = (images ?? []) as ProjectImage[];

    if (!list.length) {
      console.log(`- ${project.title}: sin imágenes`);
      continue;
    }

    const override = OVERRIDES[project.slug] ?? {};

    const sketchOverride = findOverride(list, override.sketch);
    const heroOverride = findOverride(list, override.hero);
    const coverOverride = findOverride(list, override.cover);

    const sketchCandidate =
      sketchOverride ??
      bestByScore(project, list, sketchScore)?.img ??
      null;

    const excludeForHero = new Set<string>();
    if (sketchCandidate) excludeForHero.add(sketchCandidate.id);

    const heroCandidate =
      heroOverride ??
      bestByScore(project, list, photoScore, excludeForHero)?.img ??
      null;

    // Por ahora cover = hero salvo override.
    // Luego el cliente podrá elegir una portada distinta desde el CRM.
    const coverCandidate =
      coverOverride ??
      heroCandidate ??
      bestByScore(project, list, photoScore)?.img ??
      null;

    const sketchScoreValue = sketchCandidate
      ? sketchScore(project, sketchCandidate)
      : -999;

    const heroScoreValue = heroCandidate
      ? photoScore(project, heroCandidate)
      : -999;

    console.log(`▶ ${project.title} (${project.slug})`);
    console.log(
      `   CROQUIS: ${sketchCandidate ? readableName(sketchCandidate.image_url) : "NO DETECTADO"}`
    );
    console.log(
      `            score=${sketchScoreValue.toFixed(1)}`
    );
    console.log(
      `   HERO:    ${heroCandidate ? readableName(heroCandidate.image_url) : "NO DETECTADO"}`
    );
    console.log(
      `            score=${heroScoreValue.toFixed(1)}`
    );
    console.log(
      `   PORTADA: ${coverCandidate ? readableName(coverCandidate.image_url) : "NO DETECTADA"}`
    );

    if (!APPLY) {
      console.log("");
      continue;
    }

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        sketch_image: sketchCandidate?.image_url ?? null,
        hero_image: heroCandidate?.image_url ?? null,
        cover_image: coverCandidate?.image_url ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (updateError) {
      console.error(`   ✗ No se pudo actualizar: ${updateError.message}`);
    } else {
      console.log("   ✓ Actualizado");
      updated++;
    }

    console.log("");
  }

  if (!APPLY) {
    console.log("============================================");
    console.log("PRUEBA TERMINADA - NO SE MODIFICÓ SUPABASE");
    console.log("");
    console.log("Revisá especialmente CASA PI, CASA SP y CASA RINGO.");
    console.log("Si las elecciones se ven correctas, ejecutá:");
    console.log("");
    console.log("npx tsx scripts/assign-project-images.ts --apply");
    console.log("============================================");
  } else {
    console.log("============================================");
    console.log(`ACTUALIZACIÓN TERMINADA: ${updated} proyectos`);
    console.log("============================================");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
