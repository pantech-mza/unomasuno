"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/projects";

const AUTOPLAY_MS = 8000;

export default function HeroSlider({ projects }: { projects?: Project[] | null }) {
  const slides = useMemo(() => (Array.isArray(projects) ? projects : []).filter((project) => Boolean(project.hero_image || project.cover_image)), [projects]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  useEffect(() => { if (index >= slides.length) setIndex(0); }, [index, slides.length]);

  if (!slides.length) return <section className="home-hero home-hero-empty" />;
  const current = slides[index];

  return (
    <section className="home-hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="home-hero-slides">
        {slides.map((project, slideIndex) => (
          <div key={project.id} className={`home-hero-slide ${slideIndex === index ? "is-active" : ""}`} aria-hidden={slideIndex !== index}>
            <img src={project.hero_image ?? project.cover_image ?? ""} alt={project.title} />
          </div>
        ))}
      </div>
      <Link href={`/proyectos/${current.slug}`} className="home-hero-label">{current.title}</Link>
      {slides.length > 1 && <>
        <button className="home-hero-arrow left" type="button" aria-label="Proyecto anterior" onClick={() => setIndex((v) => v === 0 ? slides.length - 1 : v - 1)}>‹</button>
        <button className="home-hero-arrow right" type="button" aria-label="Proyecto siguiente" onClick={() => setIndex((v) => (v + 1) % slides.length)}>›</button>
      </>}
    </section>
  );
}
