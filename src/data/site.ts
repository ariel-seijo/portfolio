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
  { id: "perfil", label: "Sobre Mi", href: "#perfil" },
  { id: "proyectos", label: "Experiencia", href: "#proyectos" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
] as const;

export type SectionId = (typeof NAV_LINKS)[number]["id"];
