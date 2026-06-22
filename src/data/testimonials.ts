export interface Testimonial {
  name: string;
  initials: string;
  linkedinUrl: string;
  relationship: string;
  message: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sebastián López",
    initials: "SL",
    linkedinUrl: "https://linkedin.com/in/sebastianlopez",
    relationship: "Compañero de carrera",
    message:
      "Trabajar con Ariel fue una experiencia maravillosa. Especialmente durante el proyecto final de la carrera, donde demostró una capacidad de liderazgo y resolución de problemas que pocas veces he visto. Siempre dispuesto a ayudar, con una actitud positiva y un enfoque meticuloso en cada detalle del código. No tengo dudas de que va a destacar en cualquier equipo al que se sume.",
  },
  {
    name: "María García",
    initials: "MG",
    linkedinUrl: "https://linkedin.com/in/mariagarcia",
    relationship: "Mentora en Desarrollo Web",
    message:
      "Ariel tiene una curiosidad intelectual poco común. No se conforma con que las cosas funcionen; quiere entender por qué funcionan. Eso lo convierte en un desarrollador que no solo escribe código, sino que comprende los sistemas en profundidad. Lo he visto crecer técnicamente a una velocidad impresionante gracias a esa actitud de aprendizaje constante.",
  },
  {
    name: "Carlos Rodríguez",
    initials: "CR",
    linkedinUrl: "https://linkedin.com/in/carlosrodriguez",
    relationship: "Cliente — Proyecto E-commerce",
    message:
      "Contraté a Ariel para desarrollar el sitio web de mi negocio y el resultado superó mis expectativas. No solo me entregó una página rápida y atractiva, sino que se tomó el tiempo de entender mi negocio y sugerir funcionalidades que yo no había considerado. El sitio quedó impecable, accesible y posiciona mejor en Google que el anterior.",
  },
  {
    name: "Laura Fernández",
    initials: "LF",
    linkedinUrl: "https://linkedin.com/in/laurafernandez",
    relationship: "Diseñadora UX — Proyecto conjunto",
    message:
      "Colaborar con Ariel en el proyecto de rediseño fue un placer. Lo que más valoro es su atención al detalle en la implementación del diseño. Respeta los espaciados, las tipografías, las animaciones... cosas que muchos desarrolladores pasan por alto. Además propone mejoras desde el lado técnico sin imponer, siempre buscando la mejor experiencia para el usuario.",
  },
  {
    name: "Diego Martínez",
    initials: "DM",
    linkedinUrl: "https://linkedin.com/in/diegomartinez",
    relationship: "Tech Lead — Proyecto Startup",
    message:
      "Ariel entró al equipo en un momento crítico y en dos semanas ya estaba contribuyendo como si llevara meses. Tiene una capacidad de adaptación brutal. Lo que más destaco es su criterio para priorizar: sabe cuándo hacer las cosas bien y cuándo hacerlas rápido, sin sacrificar calidad donde importa. Un perfil difícil de encontrar.",
  },
  {
    name: "Ana Torres",
    initials: "AT",
    linkedinUrl: "https://linkedin.com/in/anatorres",
    relationship: "Profesora — Desarrollo Web",
    message:
      "Como docente, valoro mucho a los alumnos que van más allá de la consigna. Ariel siempre fue ese tipo de estudiante. Entregaba trabajos que no solo cumplían los requisitos, sino que exploraban tecnologías y enfoques que ni siquiera habíamos dado en clase. Su autonomía para aprender es su mayor fortaleza.",
  },
];

const AVATAR_COLORS = [
  "#8b5cf6",
  "#4ade80",
  "#fbbf24",
  "#f87171",
  "#60a5fa",
  "#f472b6",
] as const;

export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
