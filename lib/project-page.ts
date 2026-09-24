import { createClient } from "@/lib/supabase-server";

export async function getProjectPageData(slug: string) {
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) {
    return null;
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("id, slug, title, sketch_image, hero_image, cover_image, likes_count, published, position")
    .eq("published", true)
    .order("position", { ascending: true })
    .order("title", { ascending: true });

  const ordered = projects ?? [];
  const index = ordered.findIndex((item) => item.slug === slug);

  const previous =
    index > 0 ? ordered[index - 1] : ordered.length ? ordered[ordered.length - 1] : null;

  const next =
    index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : ordered.length ? ordered[0] : null;

  const others = ordered
    .filter((item) => item.slug !== slug)
    .slice(0, 12);

  return {
    project,
    previous,
    next,
    others,
  };
}
