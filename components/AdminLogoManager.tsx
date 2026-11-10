"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { DEFAULT_LOGOS_CLIENT } from "@/lib/logo-defaults";

type Slot = "logo_url" | "footer_logo_url";

const SLOTS: { key: Slot; title: string; hint: string; fallback: string; dark?: boolean }[] = [
  {
    key: "logo_url",
    title: "Logo principal",
    hint: "Se usa en el encabezado, el menú mobile y el ingreso al panel. Ideal PNG o SVG con fondo transparente, unos 600 × 160 px.",
    fallback: DEFAULT_LOGOS_CLIENT.header,
  },
  {
    key: "footer_logo_url",
    title: "Logo del pie de página",
    hint: "Va sobre fondo negro: conviene una versión clara (blanca) con fondo transparente, unos 400 × 110 px.",
    fallback: DEFAULT_LOGOS_CLIENT.footer,
    dark: true,
  },
];

const MAX_MB = 3;
const ACCEPT = "image/png,image/svg+xml,image/webp,image/jpeg";

function safe(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9.]+/g, "-");
}

export default function AdminLogoManager({ initial }: { initial: Record<Slot, string | null> }) {
  const router = useRouter();
  const [urls, setUrls] = useState(initial);
  const [busy, setBusy] = useState<Slot | null>(null);
  const [status, setStatus] = useState("");
  const inputs = useRef<Record<Slot, HTMLInputElement | null>>({ logo_url: null, footer_logo_url: null });

  async function save(slot: Slot, value: string | null) {
    const { error } = await createClient()
      .from("site_settings")
      .update({ [slot]: value, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (error) throw error;
    setUrls((u) => ({ ...u, [slot]: value }));
    router.refresh();
  }

  async function onFile(e: ChangeEvent<HTMLInputElement>, slot: Slot) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setStatus("El archivo tiene que ser una imagen (PNG, SVG, WEBP o JPG).");
    if (file.size > MAX_MB * 1024 * 1024) return setStatus(`La imagen pesa más de ${MAX_MB} MB. Probá con una versión más liviana.`);

    setBusy(slot);
    setStatus("");
    try {
      const supabase = createClient();
      const path = `brand/${slot === "logo_url" ? "header" : "footer"}-${Date.now()}-${safe(file.name)}`;
      const { error } = await supabase.storage
        .from("site-content")
        .upload(path, file, { contentType: file.type || undefined, cacheControl: "31536000" });
      if (error) throw error;
      const url = supabase.storage.from("site-content").getPublicUrl(path).data.publicUrl;
      await save(slot, url);
      setStatus("Logo actualizado. Ya se ve en el sitio.");
    } catch (err: any) {
      setStatus(`Error: ${err?.message || err}`);
    } finally {
      setBusy(null);
    }
  }

  async function restore(slot: Slot) {
    if (!confirm("¿Volver al logo original?")) return;
    setBusy(slot);
    try {
      await save(slot, null);
      setStatus("Se restauró el logo original.");
    } catch (err: any) {
      setStatus(`Error: ${err?.message || err}`);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="admin-card admin-logo-card">
      <div className="admin-editor-head">
        <h2>Logo del sitio</h2>
      </div>
      {status && <p className="admin-status">{status}</p>}
      <div className="admin-media-grid">
        {SLOTS.map((s) => {
          const current = urls[s.key] || s.fallback;
          const custom = !!urls[s.key];
          return (
            <div key={s.key} className="admin-upload-box">
              <h3>{s.title}</h3>
              <p>{s.hint}</p>
              <div className={`admin-logo-preview${s.dark ? " is-dark" : ""}`}>
                <img
                  src={current}
                  alt={s.title}
                  style={{ display: "block", maxWidth: "100%", maxHeight: 98, width: "auto", height: "auto", objectFit: "contain", margin: 0, background: "transparent" }}
                />
              </div>
              <div className="admin-logo-actions">
                <button
                  type="button"
                  className="primary"
                  disabled={busy !== null}
                  onClick={() => inputs.current[s.key]?.click()}
                >
                  {busy === s.key ? "Subiendo..." : "Actualizar logo"}
                </button>
                {custom && (
                  <button type="button" className="admin-link-button" disabled={busy !== null} onClick={() => restore(s.key)}>
                    Restaurar original
                  </button>
                )}
              </div>
              <input
                ref={(el) => { inputs.current[s.key] = el; }}
                type="file"
                accept={ACCEPT}
                hidden
                onChange={(e) => onFile(e, s.key)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
