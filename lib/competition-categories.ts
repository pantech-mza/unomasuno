// Categorías de imágenes de un concurso: las mismas carpetas del Drive.
// Sin dependencias de servidor para usarlas también en el panel (cliente).

export const COMPETITION_CATEGORIES = [
  { key: "tecnicas", label: "Técnicas", hint: "Plantas, cortes, vistas" },
  { key: "axonometrias", label: "Axonometrías", hint: "" },
  { key: "renders", label: "Renders", hint: "" },
  { key: "fotos", label: "Fotos", hint: "" },
  { key: "graficos", label: "Gráficos", hint: "" },
  { key: "paneles", label: "Paneles", hint: "Láminas de entrega" },
  { key: "difusion", label: "Difusión gráfica", hint: "" },
] as const;

export type CompetitionCategory = (typeof COMPETITION_CATEGORIES)[number]["key"];

export const RESULT_SUGGESTIONS = [
  "Primer premio",
  "Segundo premio",
  "Tercer premio",
  "Mención",
  "Mención honorífica",
  "Finalista",
  "Participación",
];

export type Competition = {
  id: string;
  title: string;
  slug: string;
  full_name: string | null;
  organizer: string | null;
  location: string | null;
  year: string | null;
  result: string | null;
  description: string | null;
  logo_url: string | null;
  cover_image: string | null;
  position: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type CompetitionImage = {
  id: string;
  competition_id: string;
  category: CompetitionCategory;
  image_url: string;
  caption: string | null;
  position: number;
  created_at: string;
};

/** Devuelve el texto sin espacios, o null si quedó vacío. */
export function clean(value?: string | null) {
  const v = (value ?? "").trim();
  return v ? v : null;
}
