import { createClient } from "@/lib/supabase-server";
import {
  COMPETITION_CATEGORIES,
  clean,
  type Competition,
  type CompetitionCategory,
  type CompetitionImage,
} from "@/lib/competition-categories";

export type CompetitionSection = {
  key: CompetitionCategory;
  label: string;
  hint: string;
  number: string;
  images: CompetitionImage[];
};

export type CompetitionWithCover = Competition & { cover: string | null };

function sortCompetitions(list: Competition[]) {
  return [...list].sort(
    (a, b) =>
      (a.position ?? 0) - (b.position ?? 0) ||
      (b.year ?? "").localeCompare(a.year ?? "") ||
      a.title.localeCompare(b.title, "es"),
  );
}

/** Concursos publicados, con una portada resuelta (portada cargada o primera imagen disponible). */
export async function getCompetitions(): Promise<CompetitionWithCover[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("competitions").select("*").eq("published", true);
  if (error) {
    console.error("Error cargando concursos:", error);
    return [];
  }
  const list = sortCompetitions((data ?? []) as Competition[]);
  const missing = list.filter((c) => !clean(c.cover_image)).map((c) => c.id);
  const fallback = new Map<string, string>();

  if (missing.length) {
    const { data: imgs } = await supabase
      .from("competition_images")
      .select("competition_id,category,image_url,position")
      .in("competition_id", missing)
      .order("position", { ascending: true });
    const priority = ["renders", "fotos", "axonometrias", "tecnicas", "graficos", "paneles", "difusion"];
    const sorted = [...(imgs ?? [])].sort(
      (a: any, b: any) => priority.indexOf(a.category) - priority.indexOf(b.category) || a.position - b.position,
    );
    for (const img of sorted as any[]) if (!fallback.has(img.competition_id)) fallback.set(img.competition_id, img.image_url);
  }

  return list.map((c) => ({ ...c, cover: clean(c.cover_image) ?? fallback.get(c.id) ?? null }));
}

export async function getCompetitionDetail(slug: string) {
  const supabase = await createClient();
  const { data: competition } = await supabase
    .from("competitions")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (!competition) return null;

  const { data: images } = await supabase
    .from("competition_images")
    .select("*")
    .eq("competition_id", competition.id)
    .order("position", { ascending: true });

  const all = (images ?? []) as CompetitionImage[];
  // Solo las categorías que tienen imágenes; se numeran en el orden en que aparecen.
  const sections: CompetitionSection[] = COMPETITION_CATEGORIES.map((cat) => ({
    key: cat.key,
    label: cat.label,
    hint: cat.hint,
    number: "",
    images: all.filter((img) => img.category === cat.key && clean(img.image_url)),
  }))
    .filter((s) => s.images.length > 0)
    .map((s, i) => ({ ...s, number: String(i + 1).padStart(2, "0") }));

  const others = (await getCompetitions()).filter((c) => c.id !== competition.id).slice(0, 8);

  return { competition: competition as Competition, sections, others };
}
