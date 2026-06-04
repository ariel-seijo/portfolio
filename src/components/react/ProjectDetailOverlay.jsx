import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { TECH_ICON_MAP } from "@data/projects"
import "./ProjectDetailOverlay.css"

const STATUS_LABEL = {
  deployed: "Desplegado",
  development: "En desarrollo",
}

export default function ProjectDetailOverlay({ project, onClose }) {
  const [phase, setPhase] = useState("idle")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const overlayRef = useRef(null)

  const techIcon = useCallback(
    (tech) => TECH_ICON_MAP[tech.toLowerCase()],
    [],
  )

  useEffect(() => {
    if (project) {
      setActiveImageIndex(0)
      setPhase("entering")
      document.body.style.overflow = "hidden"

      const timer = setTimeout(() => setPhase("open"), 400)
      return () => clearTimeout(timer)
    }
  }, [project])

  const handleClose = useCallback(() => {
    setPhase("exiting")
    setTimeout(() => {
      setPhase("idle")
      document.body.style.overflow = ""
      onClose()
    }, 300)
  }, [onClose])

  useEffect(() => {
    if (!project || phase !== "open" || phase === "exiting") return

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setActiveImageIndex((i) => (i > 0 ? i - 1 : i))
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        setActiveImageIndex((i) =>
          project.images && i < project.images.length - 1 ? i + 1 : i,
        )
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [project, phase, handleClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose()
  }

  const openLightbox = () => {
    if (!project) return
    window.dispatchEvent(
      new CustomEvent("open-lightbox", {
        detail: { projectId: project.id, imageIndex: activeImageIndex },
      }),
    )
  }

  if (!project || phase === "idle") return null

  const images = project.images || []
  const currentImage = images[activeImageIndex]
  const hasMultiple = images.length > 1
  const accentColor = project.accentColor || "#8b5cf6"

  return createPortal(
    <div
      ref={overlayRef}
      className={`detail-overlay detail-overlay--${phase}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${project.title}`}
    >
      <div
        className={`detail-overlay__container detail-overlay__container--${phase}`}
      >
        <button
          className="detail-overlay__close"
          onClick={handleClose}
          aria-label="Cerrar detalle"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className="detail-overlay__gallery"
          onClick={openLightbox}
          role="button"
          tabIndex={0}
          aria-label={`Abrir galería de ${project.title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              openLightbox()
            }
          }}
        >
          {currentImage && (
            <img
              key={activeImageIndex}
              src={currentImage.src}
              alt={currentImage.alt}
              className="detail-overlay__image"
            />
          )}

          {hasMultiple && (
            <>
              {activeImageIndex > 0 && (
                <button
                  className="detail-overlay__arrow detail-overlay__arrow--prev"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex((i) => i - 1)
                  }}
                  aria-label="Imagen anterior"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              {activeImageIndex < images.length - 1 && (
                <button
                  className="detail-overlay__arrow detail-overlay__arrow--next"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex((i) => i + 1)
                  }}
                  aria-label="Imagen siguiente"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <span className="detail-overlay__counter">
                {activeImageIndex + 1} / {images.length}
              </span>
            </>
          )}

          {!hasMultiple && (
            <div className="detail-overlay__zoom-hint" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>

        <div className="detail-overlay__content">
          <span className={`project-status project-status--${project.status}`}>
            <span className="project-status-dot" aria-hidden="true" />
            {STATUS_LABEL[project.status]}
          </span>

          <h2 className="detail-overlay__title">{project.title}</h2>

          <p className="detail-overlay__desc">
            {project.longDescription || project.description}
          </p>

          <div className="detail-overlay__tech">
            {project.techStack.map((tech) => (
              <span className="detail-overlay__pill" key={tech}>
                {techIcon(tech) && (
                  <img
                    src={techIcon(tech)}
                    alt=""
                    className="detail-overlay__pill-icon"
                    aria-hidden="true"
                    width="14"
                    height="14"
                  />
                )}
                {tech}
              </span>
            ))}
          </div>

          <div className="detail-overlay__actions">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Ver demo
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

        {hasMultiple && (
          <div className="detail-overlay__thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                className={`detail-overlay__thumb ${i === activeImageIndex ? "active" : ""}`}
                onClick={() => setActiveImageIndex(i)}
                aria-label={`Imagen ${i + 1}`}
              >
                <img src={img.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
