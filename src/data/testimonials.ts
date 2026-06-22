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
  }
];

