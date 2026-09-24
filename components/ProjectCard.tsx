import Link from "next/link";
import type { Project } from "@/lib/projects";
import ProjectLikeButton from "@/components/ProjectLikeButton";

export default function ProjectCard({ project }: { project: Project }) {
  const image =
    project.sketch_image ??
    project.cover_image ??
    project.hero_image ??
    null;

  return (
    <article className="project-card">
      <Link
        href={`/proyectos/${project.slug}`}
        scroll={true}
        className="project-card-visual"
        aria-label={`Ver ${project.title}`}
      >
        {image ? (
          <img
            src={image}
            alt={project.title}
            className="project-card-image"
            loading="lazy"
          />
        ) : (
          <div className="project-card-placeholder" />
        )}
      </Link>

      <div className="project-card-meta">
        <Link
          href={`/proyectos/${project.slug}`}
          scroll={true}
          className="project-card-title"
        >
          {project.title}
        </Link>

        <ProjectLikeButton
          slug={project.slug}
          initialCount={project.likes_count ?? 0}
        />
      </div>
    </article>
  );
}
