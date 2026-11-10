"use client";

import { useEffect, useState } from "react";
import styles from "./ProjectGallery.module.css";
import { clean } from "@/lib/competition-categories";

type Item = { id: string; image_url: string; caption: string | null };

/**
 * Galería de una categoría de concurso. La disposición depende de `variant`
 * (las clases están en globals.css); al hacer clic abre la imagen en grande.
 */
export default function CompetitionGallery({
  images,
  variant,
  title,
}: {
  images: Item[];
  variant: string;
  title: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;
  const count = images.length;

  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? i : (i - 1 + count) % count));
  const next = () => setActive((i) => (i === null ? i : (i + 1) % count));

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, count]);

  if (!count) return null;
  const current = active !== null ? images[active] : null;
  const currentCaption = clean(current?.caption);

  return (
    <>
      <div className={`competition-gallery competition-gallery-${variant} competition-count-${Math.min(count, 4)}`}>
        {images.map((img, i) => {
          const caption = clean(img.caption);
          return (
            <figure key={img.id} className="competition-figure">
              <button
                type="button"
                className={styles.imageButton}
                onClick={() => setActive(i)}
                aria-label={`Ampliar ${caption ?? `imagen ${i + 1}`}`}
              >
                <img src={img.image_url} alt={caption ?? `${title} – imagen ${i + 1}`} loading={i < 3 ? "eager" : "lazy"} />
              </button>
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          );
        })}
      </div>

      {open && current && (
        <div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} ampliada`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button type="button" className={styles.closeButton} onClick={close} aria-label="Cerrar imagen">×</button>
          {count > 1 && (
            <button type="button" className={`${styles.navButton} ${styles.prevButton}`} onClick={prev} aria-label="Imagen anterior">‹</button>
          )}
          <div className={styles.modalContent} onMouseDown={(e) => e.stopPropagation()}>
            <img src={current.image_url} alt={currentCaption ?? `${title} – imagen ${(active ?? 0) + 1}`} className={styles.modalImage} draggable={false} />
            <div className={styles.counter}>
              {currentCaption ? `${currentCaption} · ` : ""}{(active ?? 0) + 1} / {count}
            </div>
          </div>
          {count > 1 && (
            <button type="button" className={`${styles.navButton} ${styles.nextButton}`} onClick={next} aria-label="Imagen siguiente">›</button>
          )}
        </div>
      )}
    </>
  );
}
