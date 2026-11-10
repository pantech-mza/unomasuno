"use client";

import { ChangeEvent, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import {
  COMPETITION_CATEGORIES,
  RESULT_SUGGESTIONS,
  clean,
  type Competition,
  type CompetitionCategory,
  type CompetitionImage,
} from "@/lib/competition-categories";

type Row = Competition & { images: CompetitionImage[] };

type Form = {
  title: string;
  slug: string;
  full_name: string;
  organizer: string;
  location: string;
  year: string;
  result: string;
  description: string;
  position: string;
  published: boolean;
};

const BUCKET = "competitions";
const EMPTY_FORM: Form = {
  title: "", slug: "", full_name: "", organizer: "", location: "", year: "",
  result: "", description: "", position: "0", published: true,
};

function slugify(v: string) {
  return v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function safeName(v: string) {
  return v.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w.-]+/g, "-");
}
function toForm(c?: Competition): Form {
  if (!c) return { ...EMPTY_FORM };
  return {
    title: c.title ?? "", slug: c.slug ?? "", full_name: c.full_name ?? "", organizer: c.organizer ?? "",
    location: c.location ?? "", year: c.year ?? "", result: c.result ?? "", description: c.description ?? "",
    position: String(c.position ?? 0), published: c.published !== false,
  };
}

export default function AdminCompetitionManager({ initial }: { initial: Row[] }) {
  const [items, setItems] = useState<Row[]>(initial);
  const [selectedId, setSelectedId] = useState<string>(initial[0]?.id ?? "new");
  const [form, setForm] = useState<Form>(toForm(initial[0]));
  const [openCats, setOpenCats] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const current = items.find((c) => c.id === selectedId) ?? null;
  const supabase = createClient();

  function choose(id: string) {
    setSelectedId(id);
    setForm(toForm(items.find((c) => c.id === id)));
    setOpenCats(new Set());
    setStatus("");
  }

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !current && (!f.slug || f.slug === slugify(f.title))) next.slug = slugify(String(value));
      return next;
    });
  }

  function patchRow(id: string, patch: Partial<Row>) {
    setItems((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function fail(err: any) {
    setStatus(`Error: ${err?.message || err}`);
  }

  // ---- Datos -------------------------------------------------------------
  async function save() {
    if (!clean(form.title)) return setStatus("El nombre corto es obligatorio.");
    setBusy("save");
    setStatus("");
    try {
      const payload = {
        title: form.title.trim(),
        slug: slugify(form.slug || form.title),
        full_name: clean(form.full_name),
        organizer: clean(form.organizer),
        location: clean(form.location),
        year: clean(form.year),
        result: clean(form.result),
        description: clean(form.description),
        position: Number(form.position) || 0,
        published: form.published,
        updated_at: new Date().toISOString(),
      };
      if (current) {
        const { data, error } = await supabase.from("competitions").update(payload).eq("id", current.id).select("*").single();
        if (error) throw error;
        patchRow(current.id, data as Competition);
        setForm(toForm(data as Competition));
      } else {
        const { data, error } = await supabase.from("competitions").insert(payload).select("*").single();
        if (error) throw error;
        const row = { ...(data as Competition), images: [] };
        setItems((list) => [...list, row]);
        setSelectedId(row.id);
        setForm(toForm(row));
      }
      setStatus("Guardado correctamente.");
    } catch (err: any) {
      if (String(err?.message).includes("duplicate key")) setStatus("Ya existe un concurso con ese slug. Cambialo y volvé a guardar.");
      else fail(err);
    } finally {
      setBusy(null);
    }
  }

  async function removeCompetition() {
    if (!current) return;
    if (!confirm(`¿Eliminar el concurso "${current.title}" y todas sus imágenes? No se puede deshacer.`)) return;
    setBusy("delete");
    const { error } = await supabase.from("competitions").delete().eq("id", current.id);
    setBusy(null);
    if (error) return fail(error);
    const rest = items.filter((c) => c.id !== current.id);
    setItems(rest);
    setSelectedId(rest[0]?.id ?? "new");
    setForm(toForm(rest[0]));
    setStatus("Concurso eliminado.");
  }

  // ---- Archivos ----------------------------------------------------------
  async function uploadFile(file: File, folder: string) {
    if (!current) throw new Error("Primero guardá el concurso.");
    const path = `${current.slug}/${folder}/${Date.now()}-${safeName(file.name)}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type || undefined });
    if (error) throw error;
    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  async function setMedia(column: "logo_url" | "cover_image", url: string | null) {
    if (!current) return;
    const { error } = await supabase.from("competitions").update({ [column]: url, updated_at: new Date().toISOString() }).eq("id", current.id);
    if (error) throw error;
    patchRow(current.id, { [column]: url } as Partial<Row>);
  }

  async function onMedia(e: ChangeEvent<HTMLInputElement>, column: "logo_url" | "cover_image") {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(column);
    try {
      const url = await uploadFile(file, column === "logo_url" ? "logo" : "portada");
      await setMedia(column, url);
      setStatus(column === "logo_url" ? "Logo actualizado." : "Portada actualizada.");
    } catch (err) {
      fail(err);
    } finally {
      setBusy(null);
    }
  }

  async function clearMedia(column: "logo_url" | "cover_image") {
    if (!confirm(column === "logo_url" ? "¿Quitar el logo del concurso?" : "¿Quitar la portada?")) return;
    try {
      await setMedia(column, null);
    } catch (err) {
      fail(err);
    }
  }

  // ---- Galerías ----------------------------------------------------------
  function imagesOf(cat: CompetitionCategory) {
    return (current?.images ?? []).filter((i) => i.category === cat).sort((a, b) => a.position - b.position);
  }

  function setImages(updater: (imgs: CompetitionImage[]) => CompetitionImage[]) {
    if (!current) return;
    setItems((list) => list.map((c) => (c.id === current.id ? { ...c, images: updater(c.images) } : c)));
  }

  async function onGallery(e: ChangeEvent<HTMLInputElement>, cat: CompetitionCategory) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length || !current) return;
    setBusy(cat);
    try {
      let pos = Math.max(-1, ...imagesOf(cat).map((i) => i.position));
      for (const file of files) {
        const url = await uploadFile(file, cat);
        pos += 1;
        const { data, error } = await supabase
          .from("competition_images")
          .insert({ competition_id: current.id, category: cat, image_url: url, position: pos })
          .select("*")
          .single();
        if (error) throw error;
        setImages((imgs) => [...imgs, data as CompetitionImage]);
      }
      setOpenCats((s) => new Set(s).add(cat));
      setStatus(`${files.length} imagen(es) subida(s).`);
    } catch (err) {
      fail(err);
    } finally {
      setBusy(null);
    }
  }

  async function saveCaption(img: CompetitionImage, value: string) {
    const caption = clean(value);
    if (caption === clean(img.caption)) return;
    const { error } = await supabase.from("competition_images").update({ caption }).eq("id", img.id);
    if (error) return fail(error);
    setImages((imgs) => imgs.map((i) => (i.id === img.id ? { ...i, caption } : i)));
  }

  async function move(cat: CompetitionCategory, index: number, dir: -1 | 1) {
    const list = imagesOf(cat);
    const target = index + dir;
    if (target < 0 || target >= list.length) return;
    const reordered = [...list];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    const oldPos = new Map(list.map((img) => [img.id, img.position]));
    const updates = reordered.map((img, i) => ({ ...img, position: i })).filter((img) => oldPos.get(img.id) !== img.position);
    setImages((imgs) => imgs.map((i) => updates.find((u) => u.id === i.id) ?? i));
    for (const u of updates) {
      const { error } = await supabase.from("competition_images").update({ position: u.position }).eq("id", u.id);
      if (error) return fail(error);
    }
  }

  async function removeImage(img: CompetitionImage) {
    if (!confirm("¿Quitar esta imagen?")) return;
    const { error } = await supabase.from("competition_images").delete().eq("id", img.id);
    if (error) return fail(error);
    setImages((imgs) => imgs.filter((i) => i.id !== img.id));
  }

  function toggleCat(cat: string) {
    setOpenCats((s) => {
      const n = new Set(s);
      n.has(cat) ? n.delete(cat) : n.add(cat);
      return n;
    });
  }

  // ---- Render ------------------------------------------------------------
  const saved = Boolean(current);

  return (
    <div className="admin-project-layout">
      <aside className="admin-project-list">
        <button onClick={() => choose("new")} className={selectedId === "new" ? "active" : ""}>+ Nuevo concurso</button>
        {items.map((c) => (
          <button key={c.id} onClick={() => choose(c.id)} className={selectedId === c.id ? "active" : ""}>
            {c.title}
            <small>{c.published ? "Publicado" : "Borrador"} · {c.images.length} imágenes</small>
          </button>
        ))}
      </aside>

      <section className="admin-card admin-editor">
        <div className="admin-editor-head">
          <h1>{current ? `Editar ${current.title}` : "Nuevo concurso"}</h1>
          <div className="admin-logo-actions">
            {current?.published && (
              <a className="admin-link-button" href={`/concursos/${current.slug}`} target="_blank" rel="noreferrer">Ver en el sitio</a>
            )}
            <button className="primary" onClick={save} disabled={busy !== null}>{busy === "save" ? "Guardando..." : "Guardar"}</button>
          </div>
        </div>
        {status && <p className="admin-status">{status}</p>}

        <p style={{ margin: "0 0 14px", color: "#6b737d", fontSize: 13 }}>
          Solo el nombre corto es obligatorio. Los campos que quedan vacíos no aparecen en el sitio.
        </p>

        <div className="admin-form-grid">
          <label className="admin-field">Nombre corto *<input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Ej. SVP" /></label>
          <label className="admin-field">Slug <small>Dirección: /concursos/{slugify(form.slug || form.title) || "…"}</small><input value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} /></label>
          <label className="admin-field">Nombre completo <small>Opcional</small><input value={form.full_name} onChange={(e) => set("full_name", e.target.value)} /></label>
          <label className="admin-field">Organizador <small>Opcional</small><input value={form.organizer} onChange={(e) => set("organizer", e.target.value)} /></label>
          <label className="admin-field">Ubicación <small>Opcional</small><input value={form.location} onChange={(e) => set("location", e.target.value)} /></label>
          <label className="admin-field">Año <small>Opcional</small><input value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2026" /></label>
          <label className="admin-field">Resultado <small>Opcional · elegí uno o escribilo</small>
            <input list="competition-results" value={form.result} onChange={(e) => set("result", e.target.value)} placeholder="Sin resultado" />
            <datalist id="competition-results">{RESULT_SUGGESTIONS.map((r) => <option key={r} value={r} />)}</datalist>
          </label>
          <label className="admin-field">Orden <small>Menor número aparece primero</small><input type="number" value={form.position} onChange={(e) => set("position", e.target.value)} /></label>
          <label className="admin-field admin-field-wide">Memoria / descripción <small>Opcional · un párrafo por línea</small><textarea value={form.description} onChange={(e) => set("description", e.target.value)} /></label>
        </div>
        <div className="admin-checks">
          <label><input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} /> Publicado</label>
        </div>

        {!saved ? (
          <p className="admin-hint">Guardá el concurso para poder subir el logo, la portada y las imágenes.</p>
        ) : (
          <>
            <div className="admin-media-grid">
              {([
                ["logo_url", "Logo del concurso", "Opcional (carpeta 00-LOGO). PNG o SVG con fondo transparente. Sin logo, la ficha empieza por el nombre."],
                ["cover_image", "Imagen de portada", "Se usa en el listado y arriba del detalle. Ideal 2400 px de ancho. Si no hay, el listado toma el primer render."],
              ] as const).map(([col, title, hint]) => {
                const url = current?.[col];
                return (
                  <div key={col} className="admin-upload-box admin-comp-media">
                    <h3>{title}</h3>
                    <p>{hint}</p>
                    {url ? <img src={url} alt={title} /> : <div className="admin-comp-media-empty">Sin cargar · no se muestra</div>}
                    <div className="admin-logo-actions">
                      <label className={`admin-comp-upload${busy ? " is-disabled" : ""}`}>
                        {busy === col ? "Subiendo..." : url ? "Cambiar" : "Subir"}
                        <input type="file" accept="image/*" onChange={(e) => onMedia(e, col)} />
                      </label>
                      {url && <button type="button" className="admin-link-button" onClick={() => clearMedia(col)}>Quitar</button>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="admin-comp-section">
              <h2>Galerías por categoría</h2>
              <p>Las mismas carpetas del Drive. Podés subir varias imágenes juntas, ordenarlas con las flechas y agregar un epígrafe. Las categorías vacías no aparecen en el sitio.</p>
              <div className="admin-comp-cats">
                {COMPETITION_CATEGORIES.map((cat, n) => {
                  const imgs = imagesOf(cat.key);
                  const isOpen = openCats.has(cat.key);
                  return (
                    <div key={cat.key} className="admin-comp-cat">
                      <div className="admin-comp-cat-head">
                        <div>
                          <strong>{String(n + 1).padStart(2, "0")} · {cat.label}</strong>
                          <small style={{ display: "block" }}>{imgs.length ? `${imgs.length} imagen${imgs.length === 1 ? "" : "es"}` : "Vacía · no se muestra"}</small>
                        </div>
                        <span className="admin-comp-spacer" />
                        {imgs.length > 0 && (
                          <button type="button" className="admin-comp-toggle" onClick={() => toggleCat(cat.key)}>
                            {isOpen ? "Cerrar" : "Editar orden y epígrafes"}
                          </button>
                        )}
                        <label className={`admin-comp-upload${busy ? " is-disabled" : ""}`}>
                          {busy === cat.key ? "Subiendo..." : "Subir imágenes"}
                          <input type="file" accept="image/*" multiple onChange={(e) => onGallery(e, cat.key)} />
                        </label>
                      </div>

                      {!isOpen && imgs.length > 0 && (
                        <div className="admin-comp-thumbs">
                          {imgs.slice(0, 10).map((img) => <img key={img.id} src={img.image_url} alt="" />)}
                          {imgs.length > 10 && <small style={{ alignSelf: "center", color: "#6b737d" }}>+{imgs.length - 10}</small>}
                        </div>
                      )}

                      {isOpen && (
                        <div className="admin-comp-items">
                          {imgs.map((img, i) => (
                            <div key={img.id} className="admin-comp-item">
                              <img src={img.image_url} alt="" />
                              <input
                                defaultValue={img.caption ?? ""}
                                placeholder="Epígrafe (opcional)"
                                aria-label="Epígrafe"
                                onBlur={(e) => saveCaption(img, e.target.value)}
                              />
                              <div className="admin-comp-item-actions">
                                <button type="button" onClick={() => move(cat.key, i, -1)} disabled={i === 0} aria-label="Mover antes">←</button>
                                <button type="button" onClick={() => move(cat.key, i, 1)} disabled={i === imgs.length - 1} aria-label="Mover después">→</button>
                                <button type="button" className="admin-comp-del" onClick={() => removeImage(img)}>Quitar</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="admin-comp-danger">
              <button type="button" onClick={removeCompetition} disabled={busy !== null}>Eliminar concurso</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
