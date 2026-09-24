import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContentEntries } from "@/lib/content";

export const revalidate = 60;

export default async function NosotrosPage() {
  const entries = await getContentEntries("nosotros");

  const intro =
    entries.find((entry) => entry.layout_variant === "intro") ??
    entries.find((entry) => entry.position === 1);

  const people = entries
    .filter((entry) => entry.layout_variant === "person")
    .sort((a, b) => a.position - b.position);

  return (
    <>
      <Header />

      <main className="about-original-page">
        <section className="about-original-intro">
          <div className="about-original-intro-inner">
            <aside className="about-original-side">
              <span className="about-original-badge">SOBRE NOSOTROS</span>

              <img
                src="/brand/about-logo.jpg"
                alt="UNO MÁS UNO"
                className="about-original-logo-img"
              />
            </aside>

            <div className="about-original-copy">
              <h1>{intro?.title || "UNO MÁS UNO Arquitectos"}</h1>

              {intro?.subtitle && (
                <p className="about-original-lead">{intro.subtitle}</p>
              )}

              {intro?.body?.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="about-original-team">
          <div className="about-original-team-inner">
            <aside className="about-original-side about-original-side-team">
              <span className="about-original-badge">CONOCENOS</span>
            </aside>

            <div className="about-original-people">
              {people.map((person) => (
                <article className="about-original-person" key={person.id}>
                  {person.image_url && (
                    <img
                      src={person.image_url}
                      alt={person.title}
                      className="about-original-person-photo"
                    />
                  )}

                  <h2>{person.title}</h2>

                  {person.subtitle && (
                    <div className="about-original-role">{person.subtitle}</div>
                  )}

                  {person.body?.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
