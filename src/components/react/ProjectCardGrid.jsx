import ProjectCard from "./projects/ProjectCard.jsx";
import "./ProjectCardGrid.css";

export default function ProjectCardGrid({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="gallery-grid stagger-children">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
