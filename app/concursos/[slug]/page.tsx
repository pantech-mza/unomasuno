import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CompetitionCard from "@/components/CompetitionCard";
import CompetitionGallery from "@/components/CompetitionGallery";
import { clean } from "@/lib/competition-categories";
import { getCompetitionDetail } from "@/lib/competitions";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCompetitionDetail(slug);
  return { title: data ? `${data.competition.title} | Concursos | UNO MÁS UNO` : "Concursos | UNO MÁS UNO" };
}

export default async function CompetitionPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCompetitionDetail(slug);
  if (!data) notFound();
  const { competition: c, sections, others } = data;

  // Cada dato se muestra solo si está cargado.
  const logo = clean(c.logo_url);
  const result = clean(c.result);
  const fullName = clean(c.full_name);
  const meta = [clean(c.organizer), clean(c.location), clean(c.year)].filter(Boolean).join(" | ");
  const cover = clean(c.cover_image);
  const paragraphs = (c.description ?? "").split(/\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="competition-detail">
        <section className="competition-head">
          {logo && <img className="competition-logo" src={logo} alt={`Logo del concurso ${c.title}`} />}
          {result && <span className="competition-result">{result}</span>}
          <h1>{c.title}</h1>
          {fullName && <p className="competition-full-name">{fullName}</p>}
          {meta && <p className="competition-meta">{meta}</p>}
        </section>

        {cover && (
          <section className="competition-cover">
            <img src={cover} alt={`${c.title} – portada`} />
          </section>
        )}

        {paragraphs.length > 0 && (
          <section className="project-detail-copy-section">
            <div className="project-detail-copy">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        )}

        {sections.length > 1 && (
          <nav className="competition-index" aria-label="Categorías del concurso">
            <div className="site-container">
              {sections.map((s) => <a key={s.key} href={`#${s.key}`}>{s.label}</a>)}
            </div>
          </nav>
        )}

        {sections.map((s) => (
          <section key={s.key} id={s.key} className={`competition-section competition-section-${s.key}`}>
            <div className="competition-section-inner">
              <div className="competition-section-head">
                <span className="competition-section-number">{s.number}</span>
                <h2>{s.label}</h2>
                {s.hint && <span className="competition-section-hint">{s.hint}</span>}
              </div>
              <CompetitionGallery images={s.images} variant={s.key} title={`${c.title} – ${s.label}`} />
            </div>
          </section>
        ))}

        {others.length > 0 && (
          <section className="other-projects-section competition-others">
            <div className="site-container">
              <h2 className="other-projects-title">Otros concursos</h2>
              <div className="competition-grid competition-grid-small">
                {others.map((o) => <CompetitionCard key={o.id} competition={o} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
