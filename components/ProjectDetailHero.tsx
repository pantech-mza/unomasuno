"use client";

import { useEffect, useMemo, useState } from "react";

export default function ProjectDetailHero({ images, title }: { images?: Array<string | null> | null; title: string }) {
  const slides = useMemo(() => [...new Set((Array.isArray(images) ? images : []).filter((value): value is string => typeof value === "string" && value.trim().length > 0))], [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => setIndex((v) => (v + 1) % slides.length), 8500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;
  return (
    <div className="detail-hero-slider">
      {slides.map((src, i) => <div key={src} className={`detail-hero-slide ${i === index ? "is-active" : ""}`}><img src={src} alt={`${title} ${i + 1}`} /></div>)}
      {slides.length > 1 && <>
        <button className="detail-hero-arrow left" onClick={() => setIndex((v) => v === 0 ? slides.length - 1 : v - 1)} aria-label="Imagen anterior">‹</button>
        <button className="detail-hero-arrow right" onClick={() => setIndex((v) => (v + 1) % slides.length)} aria-label="Imagen siguiente">›</button>
      </>}
    </div>
  );
}
