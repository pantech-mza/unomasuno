import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompetitionCard from "@/components/CompetitionCard";
import { getCompetitions } from "@/lib/competitions";

export const revalidate = 60;
export const metadata: Metadata = { title: "Concursos | UNO MÁS UNO Arquitectos" };

export default async function ConcursosPage() {
  const competitions = await getCompetitions();

  return (
    <>
      <Header />
      <main className="competitions-page">
        <section className="project-detail-title"><h1>Concursos</h1></section>
        <section className="competitions-section">
          <div className="site-container">
            {competitions.length ? (
              <div className="competition-grid">
                {competitions.map((c) => <CompetitionCard key={c.id} competition={c} />)}
              </div>
            ) : (
              <p className="competitions-empty">Próximamente.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
