export interface Testimonial {
  name: string;
  initials: string;
  photo?: string;
  linkedinUrl: string;
  relationship: string;
  message: string;
}

export const TESTIMONIALS: Testimonial[] = [
  
    {
    name: "Elias Marolla",
    initials: "EM",
        photo: "/images/testimonials/em-avatar.jpg",
    linkedinUrl: "https://linkedin.com/in/elias-marolla",
    relationship: "Developer — Compañero en No Country",
    message:
      "Quiero destacar la excelente predisposición que tuvo durante todo el proyecto para colaborar con el equipo, incluso en aspectos que excedían sus responsabilidades directas. A pesar de estar liderando el desarrollo del backend, siempre se mostró disponible para ayudarme con dudas relacionadas con el frontend y para brindar orientación cuando fue necesario. También considero que demostró un liderazgo sólido, promoviendo una comunicación clara, facilitando el trabajo en equipo y generando un ambiente de colaboración. Su actitud proactiva y su disposición para apoyar a sus compañeros tuvieron un impacto muy positivo en el desarrollo del proyecto y en la dinámica del equipo.",
  },
  {
    name: "Matias Bertuccio",
    initials: "MB",
    photo: "/images/testimonials/mb-avatar.png",
    linkedinUrl: "https://linkedin.com/in/matiasbertuccio",
    relationship: "Developer — Compañero de carrera",
    message:
    "Tuve la suerte de ser compañero de Ariel y haber realizado varios proyectos juntos, siempre responsable, educado, buscando aprender en cada momento y poder aportar todo los conocimientos que él sabe. Sin dudas, en algún momento me gustaría volver a trabajar o colaborar con él en algún proyecto.",
  },
  {
    name: "Luis Antonio Feliz",
    initials: "LAF",
        photo: "/images/testimonials/lf-avatar.jpg",
    linkedinUrl: "https://linkedin.com/in/luis-antonio-feliz",
    relationship: "Developer — Compañero en No Country",
    message:
      "Eres un desarrollador sumamente entregado en cada proyecto que desarrollas. Trabajando en equipo aportas excelentes ideas y siempre buscas las mejores soluciones.",
  },
];

