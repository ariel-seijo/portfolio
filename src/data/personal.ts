export interface StatConfig {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  variant: "default" | "alt" | "cyan" | "red";
  duration?: number;
}

export interface PersonalInfo {
  name: string;
  fullName: string;
  email: string;
  location: string;
  cvPath: string;
  avatar: {
    hero: string;
    profile: string;
  };
  social: {
    github: string;
    linkedin: string;
  };
  availability: string;
  tagline: string;
  bio: string;
  terminalTitle: string;
  jobTitle: string;
}

export const PERSONAL: PersonalInfo = {
  name: "Ariel Seijo",
  fullName: "Hugo Ariel Seijo",
  email: "hariel.seijo@gmail.com",
  location: "Buenos Aires, Argentina",
  cvPath: "/Hugo_Desarrollador_FullStack.pdf",
  avatar: {
    hero: "/avatar-img.webp",
    profile: "/avatar-profile-img.webp",
  },
  social: {
    github: "https://github.com/ariel-seijo",
    linkedin: "https://linkedin.com/in/arielseijo",
  },
  availability: "Abierto a nuevas oportunidades",
  tagline: "Construyo software que funciona tan bien como se ve.",
  bio: "Diseño, desarrollo, pruebo y despliego aplicaciones web atractivas y funcionales, que resuelven necesidades de la manera más eficiente.",
  terminalTitle: "arielseijo — bash — 80×24",
  jobTitle: "Desarrollador Full Stack",
};

export const STATS: StatConfig[] = [
  {
    target: 4,
    prefix: "+",
    label: "Años programando",
    variant: "default",
    duration: 2500,
  },
  {
    target: 999,
    prefix: "+",
    label: "Bugs arreglados",
    variant: "alt",
    duration: 2500,
  },
  {
    target: 300,
    prefix: "+",
    label: "Commits realizados",
    variant: "cyan",
    duration: 2500,
  },
  {
    target: 3,
    prefix: "+",
    label: "Proyectos completados",
    variant: "red",
    duration: 2500,
  },
];
