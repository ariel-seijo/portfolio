import { useCallback, useRef } from "react";
import { TECH_ICON_MAP } from "@data/projects";
import "./ProjectCardGrid.css";

const STATUS_CONFIG = {
  deployed: {
    label: "Produccion",
    dot: "var(--color-success)",
    glow: "var(--color-success-muted)",
  },
  development: {
    label: "Desarrollo",
    dot: "var(--color-warning)",
    glow: "var(--color-warning-muted)",
  },
};

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleImageClick = useCallback(() => {
    if (project.images.length === 0) return;
    window.dispatchEvent(
      new CustomEvent("open-lightbox", {
        detail: { projectId: project.id, imageIndex: 0 },
      }),
    );
  }, [project.id, project.images.length]);

  const status = STATUS_CONFIG[project.status];
  const accent = project.accentColor || "#8b5cf6";
  const mainImage = project.images[0];
  const hasGallery = project.images.length > 1;

  return (
    <article
      ref={cardRef}
      className="gallery-card"
      style={{
        "--card-accent": accent,
        "--card-accent-muted": `${accent}1a`,
        "--card-index": index,
      }}
    >
      {/* ── Image 16:9 ── */}
      <div
        className="gallery-card__media"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        aria-label={`Ver galería de ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleImageClick();
          }
        }}
      >
        {mainImage ? (
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="gallery-card__img"
            loading={index === 0 ? "eager" : "lazy"}
          />
        ) : (
          <div className="gallery-card__img--placeholder" aria-hidden="true" />
        )}

        {/* Status badge */}
        <span
          className="gallery-card__status"
          style={{ "--status-dot": status.dot, "--status-glow": status.glow }}
        >
          <span className="gallery-card__status-dot" aria-hidden="true" />
          {status.label}
        </span>

        {/* Gallery indicator */}
        {hasGallery && (
          <span className="gallery-card__gallery-badge" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            {project.images.length}
          </span>
        )}

        {/* Hover gradient */}
        <div className="gallery-card__media-overlay" aria-hidden="true" />
      </div>

      {/* ── Body ── */}
      <div className="gallery-card__body">
        <h3 className="gallery-card__title">{project.title}</h3>
        <p className="gallery-card__desc">{project.description}</p>

        {/* Tech pills */}
        <div className="gallery-card__tech">
          {project.techStack.map((tech) => {
            const icon = TECH_ICON_MAP[tech.toLowerCase()];
            return (
              <span className="gallery-card__pill" key={tech}>
                {icon && (
                  <img
                    src={icon}
                    alt=""
                    className="gallery-card__pill-icon"
                    aria-hidden="true"
                    width="14"
                    height="14"
                  />
                )}
                {tech}
              </span>
            );
          })}
        </div>

        {/* Actions */}
        <div className="gallery-card__actions">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              className="gallery-card__btn gallery-card__btn--demo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--btn-accent": accent }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 3h6v6M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Demo
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              className="gallery-card__btn gallery-card__btn--code"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Código
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectCardGrid({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="gallery-grid">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
