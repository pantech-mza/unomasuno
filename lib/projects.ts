import { createClient } from "@/lib/supabase-server";

export type Project = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  area: string | null;
  year: number | null;
  description: string | null;
  cover_image: string | null;
  hero_image: string | null;
  sketch_image: string | null;
  likes_count: number;
  position: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  position: number;
  created_at: string;
};

export type ProjectWithImages = Project & { images: ProjectImage[] };

const ORIGINAL_ORDER = [
  "museo-ms", "casa-pi", "casa-sp", "casa-f",
  "casa-up", "oficina-f", "planta-mihoh", "casa-ringo",
  "casa-qc", "casa-delacroix", "casa-tapiz", "la-casa-y-el-piano",
  "casa-yeri", "casa-mm", "casa-wm", "casa-zen",
];

function orderProjects(projects: Project[]) {
  const rank = new Map(ORIGINAL_ORDER.map((slug, index) => [slug, index]));
  return [...projects].sort((a, b) => {
    const ar = rank.has(a.slug) ? rank.get(a.slug)! : 1000 + (a.position ?? 0);
    const br = rank.has(b.slug) ? rank.get(b.slug)! : 1000 + (b.position ?? 0);
    return ar - br || a.title.localeCompare(b.title, "es");
  });
}

function fileName(url?: string | null) {
  if (!url) return "";
  let name = "";
  try { name = decodeURIComponent(new URL(url).pathname.split("/").pop() || "").toLowerCase(); }
  catch { name = decodeURIComponent(url.split("/").pop() || "").toLowerCase(); }
  return name.replace(/^\d{3}-/, "");
}

const globalWords = ["architect2", "footer", "pattern", "retina", "logo", "contentslider", "offerslider", "sectionbg", "sep2", "sep.", "umu_marca"];
function isGlobal(url: string) { const name = fileName(url); return globalWords.some((word) => name.includes(word)); }

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("*").eq("published", true);
  if (error) { console.error("Error cargando proyectos:", error); return []; }
  return orderProjects((data ?? []) as Project[]);
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithImages | null> {
  const supabase = await createClient();
  const { data: project, error: projectError } = await supabase.from("projects").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (projectError || !project) return null;

  const { data: images } = await supabase.from("project_images").select("*").eq("project_id", project.id).order("position", { ascending: true });
  const allProjects = await getProjects();
  const sketchNames = new Set(allProjects.map((p) => fileName(p.sketch_image)).filter(Boolean));
  const ownSketch = fileName(project.sketch_image);
  const ownHero = fileName(project.hero_image);

  const filtered = ((images ?? []) as ProjectImage[]).filter((image) => {
    const name = fileName(image.image_url);
    if (!name || isGlobal(image.image_url)) return false;
    if (name === ownSketch) return false;
    if (sketchNames.has(name)) return false;
    if (name === ownHero) return false;
    return true;
  });

  return { ...(project as Project), images: filtered };
}

export async function getProjectDetailData(slug: string) {
  const project = await getProjectBySlug(slug);
  if (!project) return null;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  const previous = index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : null;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null;
  const others = projects.filter((p) => p.id !== project.id).slice(0, 12);
  return { project, previous, next, others };
}
