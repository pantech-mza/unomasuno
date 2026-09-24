import { createClient } from "@/lib/supabase-server";

export type ContentAction = {
  label: string;
  url: string;
};

export type ContentEntry = {
  id: string;
  section: "mentions" | "academia" | "news" | "nosotros";
  title: string;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  actions: ContentAction[];
  layout_variant: string | null;
  position: number;
  published: boolean;
};

export async function getContentEntries(
  section: ContentEntry["section"]
): Promise<ContentEntry[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_entries")
    .select("*")
    .eq("section", section)
    .eq("published", true)
    .order("position", { ascending: true });

  if (error) {
    console.error(`Error cargando ${section}:`, error);
    return [];
  }

  return ((data ?? []) as ContentEntry[]).map((entry) => ({
    ...entry,
    actions: Array.isArray(entry.actions) ? entry.actions : [],
  }));
}
