import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  return <>
    <Header />
    <HeroSlider projects={projects} />
    <main className="projects-section">
      <div className="site-container project-grid">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </main>
    <Footer />
  </>;
}
