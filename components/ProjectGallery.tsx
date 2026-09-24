"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ProjectGallery.module.css";

export default function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const clean = useMemo(
    () => [...new Set((images ?? []).filter(Boolean))],
    [images]
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;
  const activeImage = activeIndex !== null ? clean[activeIndex] : null;

  const close = () => setActiveIndex(null);

  const previous = () => {
    if (activeIndex === null || clean.length < 2) return;

    setActiveIndex(
      activeIndex === 0 ? clean.length - 1 : activeIndex - 1
    );
  };

  const next = () => {
    if (activeIndex === null || clean.length < 2) return;

    setActiveIndex(
      activeIndex === clean.length - 1 ? 0 : activeIndex + 1
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }

      if (event.key === "ArrowLeft") {
        previous();
      }

      if (event.key === "ArrowRight") {
        next();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex, clean.length]);

  if (!clean.length) return null;

  return (
    <>
      <section
        className="project-gallery-section"
        aria-label={`Galería de ${title}`}
      >
        <div className="project-gallery-grid">
          {clean.map((src, index) => (
            <figure
              className={`project-gallery-item ${styles.galleryItem}`}
              key={`${src}-${index}`}
            >
              <button
                type="button"
                className={styles.imageButton}
                onClick={() => setActiveIndex(index)}
                aria-label={`Abrir imagen ${index + 1} de ${clean.length}`}
              >
                <img
                  src={src}
                  alt={`${title} - imagen ${index + 1}`}
                  loading={index < 6 ? "eager" : "lazy"}
                />
              </button>
            </figure>
          ))}
        </div>
      </section>

      {isOpen && activeImage && (
        <div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería ampliada de ${title}`}
          onMouseDown={close}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={close}
            aria-label="Cerrar imagen"
          >
            ×
          </button>

          {clean.length > 1 && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={(event) => {
                event.stopPropagation();
                previous();
              }}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
          )}

          <div
            className={styles.modalContent}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage}
              alt={`${title} - imagen ${(activeIndex ?? 0) + 1} ampliada`}
              className={styles.modalImage}
            />

            <div className={styles.counter}>
              {(activeIndex ?? 0) + 1} / {clean.length}
            </div>
          </div>

          {clean.length > 1 && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
