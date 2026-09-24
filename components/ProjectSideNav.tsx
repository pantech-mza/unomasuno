import Link from "next/link";
import type { Project } from "@/lib/projects";

function Item({ project, side }: { project: Project; side: "left" | "right" }) {
  return (
    <Link href={`/proyectos/${project.slug}`} scroll={true} className={`side-project-nav ${side}`} aria-label={side === "left" ? `Proyecto anterior: ${project.title}` : `Proyecto siguiente: ${project.title}`}>
      <span className="side-project-arrow">{side === "left" ? "‹" : "›"}</span>
      <span className="side-project-preview">
        {project.sketch_image && <span className="side-project-thumb"><img src={project.sketch_image} alt="" /></span>}
        <span className="side-project-copy"><strong>{project.title}</strong><span>Ver proyecto</span></span>
      </span>
    </Link>
  );
}

export default function ProjectSideNav({ previous, next }: { previous?: Project | null; next?: Project | null }) {
  return <>{previous && <Item project={previous} side="left" />}{next && <Item project={next} side="right" />}</>;
}
