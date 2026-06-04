export interface ProjectImage {
  src: string
  alt: string
}

export type ProjectStatus = "deployed" | "development"

export interface Project {
  id: string
  title: string
  status: ProjectStatus
  description: string
  longDescription?: string
  accentColor?: string
  techStack: string[]
  images: ProjectImage[]
  demoUrl?: string
  codeUrl?: string
  featured?: boolean
}

/** Mapea nombre de tecnología → ícono en /tech-icons/ */
export const TECH_ICON_MAP: Record<string, string> = {
  astro: "/tech-icons/astro.svg",
  react: "/tech-icons/react.svg",
  nextjs: "/tech-icons/nextjs.svg",
  typescript: "/tech-icons/typescript.svg",
  tailwindcss: "/tech-icons/tailwindcss.svg",
  postgresql: "/tech-icons/postgresql.svg",
}

export const PROJECTS: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    status: "deployed",
    description:
      "Plataforma de comercio electrónico con carrito, pasarela de pagos y panel de administración. Más de 500 productos activos y 2.000 usuarios registrados.",
    longDescription:
      "Una plataforma de comercio electrónico full-stack construida con Astro y React para el frontend, con un backend serverless y base de datos PostgreSQL gestionada a través de una API RESTful. Incluye autenticación JWT, carrito de compras persistente, integración con pasarela de pagos Stripe, panel de administración con dashboard analítico, y gestión completa de inventario con más de 500 productos activos.",
    accentColor: "#8b5cf6",
    techStack: ["astro", "react", "typescript", "tailwindcss", "postgresql"],
    images: [
      { src: "/electroshop-1.png", alt: "Dashboard principal del e-commerce" },
      { src: "/imagen-ejemplo.jpg", alt: "Página de producto con galería" },
      { src: "/imagen-ejemplo.jpg", alt: "Panel de administración de inventario" },
      { src: "/imagen-ejemplo.jpg", alt: "Proceso de checkout optimizado" },
    ],
    demoUrl: "https://demo.ecommerce.example.com",
    codeUrl: "https://github.com/arielseijo/ecommerce-platform",
    featured: true,
  },
  {
    id: "task-manager-api",
    title: "Task Manager API",
    status: "development",
    description:
      "API RESTfull para gestión de tareas con autenticación JWT, roles de usuario y notificaciones en tiempo real vía WebSockets.",
    longDescription:
      "Una API RESTful construida con Next.js App Router y TypeScript, diseñada para gestionar tareas colaborativas con control de acceso basado en roles. Implementa autenticación JWT con refresh tokens, documentación OpenAPI generada automáticamente, y un sistema de notificaciones en tiempo real mediante WebSockets para mantener al equipo sincronizado.",
    accentColor: "#22d3ee",
    techStack: ["nextjs", "typescript", "postgresql"],
    images: [
      { src: "/imagen-ejemplo.jpg", alt: "Documentación interactiva de la API" },
      { src: "/imagen-ejemplo.jpg", alt: "Esquema de base de datos" },
    ],
    codeUrl: "https://github.com/arielseijo/task-manager-api",
  },
  {
    id: "portfolio-3d",
    title: "Portfolio 3D Interactivo",
    status: "deployed",
    description:
      "Portfolio personal con escenas 3D interactivas usando Three.js, scroll narrativo y transiciones cinematográficas entre secciones.",
    longDescription:
      "Un portfolio interactivo que utiliza Three.js y React Three Fiber para renderizar escenas 3D envolventes que reaccionan al scroll del usuario. Las transiciones cinematográficas entre secciones, combinadas con animaciones fluidas y una narrativa visual cuidadosamente diseñada, crean una experiencia inmersiva que destaca el trabajo creativo.",
    accentColor: "#f59e0b",
    techStack: ["astro", "react", "typescript", "tailwindcss"],
    images: [
      { src: "/imagen-ejemplo.jpg", alt: "Vista hero con escena 3D" },
      { src: "/imagen-ejemplo.jpg", alt: "Sección de proyectos con animaciones" },
      { src: "/imagen-ejemplo.jpg", alt: "Página de contacto con formulario" },
    ],
    demoUrl: "https://3d.arielseijo.dev",
    codeUrl: "https://github.com/arielseijo/portfolio-3d",
  },
]
