import Link from "next/link";
import { clean } from "@/lib/competition-categories";
import type { CompetitionWithCover } from "@/lib/competitions";

export default function CompetitionCard({ competition: c }: { competition: CompetitionWithCover }) {
  const href = `/concursos/${c.slug}`;
  const result = clean(c.result);
  const year = clean(c.year);
  const subline = [clean(c.full_name), clean(c.organizer)].filter(Boolean).join(" · ");

  return (
    <article className="competition-card">
      <Link href={href} className="competition-card-visual" aria-label={`Ver concurso ${c.title}`}>
        {c.cover ? (
          <img src={c.cover} alt={c.title} loading="lazy" />
        ) : (
          <span className="competition-card-placeholder" />
        )}
        {result && <span className="competition-result competition-result-card">{result}</span>}
      </Link>
      <div className="competition-card-meta">
        <Link href={href} className="competition-card-title">{c.title}</Link>
        {year && <span className="competition-card-year">{year}</span>}
      </div>
      {subline && <p className="competition-card-sub">{subline}</p>}
    </article>
  );
}
