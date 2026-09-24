export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const clean = [...new Set((images ?? []).filter(Boolean))];
  if (!clean.length) return null;
  return (
    <section className="project-gallery-section" aria-label={`Galería de ${title}`}>
      <div className="project-gallery-grid">
        {clean.map((src, index) => <figure className="project-gallery-item" key={`${src}-${index}`}><img src={src} alt={`${title} - imagen ${index + 1}`} loading={index < 8 ? "eager" : "lazy"} /></figure>)}
      </div>
    </section>
  );
}
