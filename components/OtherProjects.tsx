import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

export default function OtherProjects({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  return <section className="other-projects-section"><div className="site-container"><h2 className="other-projects-title">Otros proyectos</h2><div className="other-projects-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></div></section>;
}
