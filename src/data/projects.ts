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
  nodejs: "/tech-icons/nodejs.svg",
  prisma: "/tech-icons/prisma.svg",
  git: "/tech-icons/git.svg",
  github: "/tech-icons/github.svg",
  vercel: "/tech-icons/vercel.svg",
  vitest: "/tech-icons/vitest.svg",
}

export const PROJECTS: Project[] = [
  {
    id: "electroshop",
    title: "ElectroShop",
    status: "deployed",
    description:
      "Desarrollo full stack de ecommerce con carrito de compras, autenticación, gestión de inventario, panel de admin con CRUD propio y checkout simulado.",
    longDescription:
      "Una tienda virtual de productos de hardware que cuenta con autenticación de usuarios, carrito de compra con sincronización entre sesiones, checkout simulado, gestión de inventario y panel de administración con CRUD propio.",
    accentColor: "#0084ff",
    techStack: ["react", "nextjs", "typescript", "tailwindcss", "postgresql", "nodejs"],
    images: [
      { src: "/ecommerce-1.png", alt: "Página principal de Electroshop" },
      { src: "/ecommerce-2.png", alt: "Página de producto" },
      { src: "/ecommerce-3.png", alt: "Página de productos y carrito de compras" },
      { src: "/ecommerce-4.png", alt: "Proceso de compra en computadora y celular" },
      { src: "/ecommerce-5.png", alt: "Dashboard de administrador con métricas" },
      { src: "/ecommerce-6.png", alt: "Página de gestión de inventario" },
      { src: "/ecommerce-7.png", alt: "Página de edición de producto" },
      { src: "/ecommerce-8.webp", alt: "Página de detalles de pedido" },
    ],
    demoUrl: "https://electroshop-store.vercel.app/",
    codeUrl: "https://github.com/ariel-seijo/electroshop",
    featured: true,
  },
  {
    id: "oid",
    title: "Oid Mortales - Test de Nivelación Inglés",
    status: "deployed",
    description:
      "Plataforma para realizar un test de nivelación de inglés mientras aprendes historia argentina. Cuatro tipos de ejercicios y resultados basados en el CEFR.",
    longDescription:
      "Plataforma de aprendizaje que busca cambiar la forma de enseñar y aprender, mezclando el idioma con la historia para aprender ambas al mismo tiempo. Actualmente se puede realizar un test de nivelación de inglés con cuatro tipo de ejercicios diferentes y temática de historia argentina, con resultados basados en el CEFR.",
    accentColor: "#00aeff",
    techStack: ["react", "nextjs", "typescript", "tailwindcss"],
    images: [
      { src: "/oid-1.png", alt: "Documentación interactiva de la API" },
      { src: "/oid-2.png", alt: "Documentación interactiva de la API" },
      { src: "/oid-3.png", alt: "Documentación interactiva de la API" },
      { src: "/oid-4.png", alt: "Documentación interactiva de la API" },
      { src: "/oid-5.png", alt: "Documentación interactiva de la API" },
      { src: "/oid-6.png", alt: "Documentación interactiva de la API" },
    ],
    demoUrl: "https://oidmortales.vercel.app/",
    codeUrl: "https://github.com/ariel-seijo/Oid-Mortales",
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
