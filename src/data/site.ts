export const SITE = {
  name: "Ariel Seijo",
  title: "Full Stack Engineer",
  description:
    "Arquitectura que convierte complejidad en producto. Especialista en sistemas financieros y plataformas de alto tráfico.",
  url: "https://arielseijo.dev",
  locale: "es",
};

export const NAV_LINKS = [
  { id: "hero", label: "Inicio", href: "#hero" },
  { id: "projects", label: "Proyectos", href: "#projects" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "experience", label: "Experiencia", href: "#experience" },
  { id: "contact", label: "Contacto", href: "#contact" },
] as const;

export type SectionId = (typeof NAV_LINKS)[number]["id"];
