import { useState, useRef, useEffect, useCallback } from "react"
import { TECH_ICON_MAP } from "@data/projects"
import ProjectDetailOverlay from "./ProjectDetailOverlay.jsx"
import "./ProjectBentoGrid.css"

const STATUS_LABEL = {
  deployed: "Desplegado",
  development: "En desarrollo",
}

function useTilt() {
  const ref = useRef(null)
  const raf = useRef(null)
  const target = useRef({ rx: 0, ry: 0 })
  const current = useRef({ rx: 0, ry: 0, x: 0.5, y: 0.5 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let active = false

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = (e.clientX - rect.left) / rect.width
      const cy = (e.clientY - rect.top) / rect.height
      target.current.rx = (cy - 0.5) * -16
      target.current.ry = (cx - 0.5) * 16
      current.current.x = cx
      current.current.y = cy

      if (!active) {
        active = true
        el.classList.add("bento-card--hovering")
      }
    }

    const onLeave = () => {
      active = false
      target.current.rx = 0
      target.current.ry = 0
      current.current.x = 0.5
      current.current.y = 0.5
      el.classList.remove("bento-card--hovering")
    }

    const tick = () => {
      current.current.rx += (target.current.rx - current.current.rx) * 0.1
      current.current.ry += (target.current.ry - current.current.ry) * 0.1

      if (Math.abs(current.current.rx) < 0.01 && Math.abs(target.current.rx) === 0) {
        current.current.rx = 0
      }
      if (Math.abs(current.current.ry) < 0.01 && Math.abs(target.current.ry) === 0) {
        current.current.ry = 0
      }

      el.style.setProperty("--tilt-rx", `${current.current.rx}deg`)
      el.style.setProperty("--tilt-ry", `${current.current.ry}deg`)
      el.style.setProperty("--glow-x", `${current.current.x * 100}%`)
      el.style.setProperty("--glow-y", `${current.current.y * 100}%`)

      raf.current = requestAnimationFrame(tick)
    }

    el.addEventListener("mousemove", onMove, { passive: true })
    el.addEventListener("mouseleave", onLeave)
    raf.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf.current)
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return ref
}

function BentoCard({ project, index, onClick }) {
  const tiltRef = useTilt()
  const techIcon = (tech) => TECH_ICON_MAP[tech.toLowerCase()]
  const featured = project.featured
  const accentColor = project.accentColor || "#8b5cf6"

  return (
    <article
      ref={tiltRef}
      className={`bento-card ${featured ? "bento-card--featured" : ""}`}
      style={{ "--card-accent": accentColor, animationDelay: `${index * 100}ms` }}
      data-index={index + 1}
      aria-label={`Ver detalles de ${project.title}`}
      onClick={() => onClick?.(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.(project)
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="bento-card__inner">
        <div className="bento-card__grain" aria-hidden="true" />

        {project.images[0] && (
          <div
            className="bento-card__bg"
            style={{ backgroundImage: `url(${project.images[0].src})` }}
            aria-hidden="true"
          />
        )}

        <div className="bento-card__glow" aria-hidden="true" />

        <span className="bento-card__number" aria-hidden="true">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        <div className="bento-card__content">
          <span className={`project-status project-status--${project.status}`}>
            <span className="project-status-dot" aria-hidden="true" />
            {STATUS_LABEL[project.status]}
          </span>

          <h3 className="bento-card__title">{project.title}</h3>
          <p className="bento-card__desc">{project.description}</p>

          <div className="bento-card__tech">
            {project.techStack.slice(0, 4).map((tech) => (
              <span className="bento-card__pill" key={tech}>
                {techIcon(tech) && (
                  <img
                    src={techIcon(tech)}
                    alt=""
                    className="bento-card__pill-icon"
                    aria-hidden="true"
                    width="12"
                    height="12"
                  />
                )}
                {tech}
              </span>
            ))}
          </div>

          <span className="bento-card__hint" aria-hidden="true">
            Ver más
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}

export default function ProjectBentoGrid({ projects }) {
  const [activeProject, setActiveProject] = useState(null)
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const featuredProject = projects.find((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  const handleCardClick = useCallback((project) => {
    setActiveProject(project)
  }, [])

  const handleCloseOverlay = useCallback(() => {
    setActiveProject(null)
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className={`project-bento ${visible ? "project-bento--visible" : ""}`}
      >
        {featuredProject && (
          <div className="project-bento__featured">
            <BentoCard
              project={featuredProject}
              index={0}
              onClick={handleCardClick}
            />
          </div>
        )}
        <div className="project-bento__stack">
          {otherProjects.map((project, i) => (
            <BentoCard
              key={project.id}
              project={project}
              index={i + 1}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      <ProjectDetailOverlay
        project={activeProject}
        onClose={handleCloseOverlay}
      />
    </>
  )
}
