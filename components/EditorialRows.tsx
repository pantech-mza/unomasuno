import type { ContentEntry } from "@/lib/content";

function EntryActions({ actions }: { actions: ContentEntry["actions"] }) {
  if (!actions?.length) return null;

  return (
    <div className="original-actions">
      {actions.map((action, index) => (
        <a
          key={`${action.url}-${index}`}
          href={action.url}
          className="original-action-button"
          target="_blank"
          rel="noreferrer"
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}

export default function EditorialRows({
  entries,
  section,
}: {
  entries: ContentEntry[];
  section: "mentions" | "academia";
}) {
  return (
    <div className={`original-editorial-list ${section}`}>
      {entries.map((entry, index) => {
        const textLeft =
          entry.layout_variant === "text-left" ||
          (!entry.layout_variant && index % 2 === 0);

        return (
          <article
            key={entry.id}
            className={`original-editorial-row ${
              textLeft ? "text-left" : "image-left"
            }`}
          >
            <div className="original-editorial-copy">
              <h2>{entry.title}</h2>

              {entry.subtitle && (
                <div className="original-editorial-subtitle">
                  {entry.subtitle}
                </div>
              )}

              {entry.body && (
                <div className="original-editorial-body">
                  {entry.body
                    .split(/\n+/)
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((line, i) => <p key={i}>{line}</p>)}
                </div>
              )}

              <EntryActions actions={entry.actions} />
            </div>

            <div className="original-editorial-visual">
              {entry.image_url ? (
                <img src={entry.image_url} alt={entry.title} />
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
