import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectDetailHero from "@/components/ProjectDetailHero";
import ProjectGallery from "@/components/ProjectGallery";
import OtherProjects from "@/components/OtherProjects";
import ProjectSideNav from "@/components/ProjectSideNav";
import ScrollToTop from "@/components/ScrollToTop";
import { getProjectDetailData } from "@/lib/projects";

export const revalidate = 60;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getProjectDetailData(slug);
  if (!data) notFound();
  const { project, previous, next, others } = data;
  const heroImages = [project.hero_image, project.cover_image].filter((value, index, list) => Boolean(value) && list.indexOf(value) === index) as string[];

  return <>
    <ScrollToTop />
    <Header />
    <main className="project-detail-page">
      <section className="project-detail-title"><h1>{project.title}</h1></section>
      <ProjectDetailHero images={heroImages} title={project.title} />
      <section className="project-detail-copy-section">
        <div className="project-detail-copy">
          {(project.location || project.area || project.year) && <h2>{[project.location, project.area, project.year].filter(Boolean).join(" | ")}</h2>}
          {project.description?.split(/\n+/).map((p) => p.trim()).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>
      <ProjectGallery images={project.images.map((image) => image.image_url)} title={project.title} />
      <OtherProjects projects={others} />
    </main>
    <ProjectSideNav previous={previous} next={next} />
    <Footer />
  </>;
}
