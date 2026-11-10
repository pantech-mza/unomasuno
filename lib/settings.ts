import { createClient } from "@/lib/supabase-server";
import { DEFAULT_LOGOS_CLIENT } from "@/lib/logo-defaults";

export type SiteSettings = {
  id: number;
  phone: string | null;
  email: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  address: string | null;
  about_title: string | null;
  about_body: string | null;
  logo_url: string | null;
  footer_logo_url: string | null;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  phone: "+54 9 261 5162064 | +54 9 261 5925445",
  email: "arquitectos1mas1@gmail.com",
  instagram_url: "https://www.instagram.com/unomasuno_arquitectos",
  facebook_url: null,
  address: "Mendoza, Argentina",
  about_title: "UNO MÁS UNO Arquitectos",
  about_body: null,
  logo_url: null,
  footer_logo_url: null,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error || !data) return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...data } as SiteSettings;
}

/** Logos por defecto (archivos en /public/brand). Se usan si no se subió uno desde el panel. */
export const DEFAULT_LOGOS = DEFAULT_LOGOS_CLIENT;

export async function getSiteLogos() {
  try {
    const s = await getSiteSettings();
    return {
      header: s.logo_url?.trim() || DEFAULT_LOGOS.header,
      footer: s.footer_logo_url?.trim() || DEFAULT_LOGOS.footer,
    };
  } catch {
    return DEFAULT_LOGOS;
  }
}
