export interface StrengthCard {
  column: "hire" | "differentiate";
  title: string;
  description: string;
  icon: string;
}

export const STRENGTH_COLUMNS = [
  {
    id: "hire",
    heading: "¿Por qué contratarme?",
  },
  {
    id: "differentiate",
    heading: "¿Qué me diferencia?",
  },
] as const;

export const STRENGTHS: StrengthCard[] = [
  {
    column: "hire",
    title: "Puedo adaptarme a cualquier desafío.",
    description:
      "Lo desconocido no me intimida. Si me piden algo que nunca he hecho antes, voy a investigar y aprender a hacerlo. No me limito a lo que conozco. Siempre estoy dispuesto a salir de mi zona de confort.",
    icon: "adapt",
  },
  {
    column: "hire",
    title: "Trabajar conmigo es cómodo.",
    description:
      "Busco ser el compañero de trabajo que todos deseamos: Comunicativo, resolutivo y responsable. Me gusta transmitir seguridad y confianza a quienes trabajan conmigo, como lo haría un buen líder.",
    icon: "comfort",
  },
  {
    column: "hire",
    title: "Hago mucho más que programar.",
    description:
      "Me gusta diseñar, entiendo el negocio, me preocupo por la experiencia del usuario, cuido la accesibilidad y la performance. Pruebo todo lo que construyo. Soy muy bueno hallando bugs y proponiendo mejoras. Me fijo en los detalles que la gente suele ignorar.",
    icon: "multitool",
  },
  {
    column: "differentiate",
    title: "Utilizo la IA con criterio.",
    description:
      "La IA acelera mi trabajo y mi aprendizaje, pero yo tomo las decisiones. Optimizo mis consultas con prompt engineering, ahorrando tokens y consiguiendo resultados precisos.",
    icon: "ai",
  },
  {
    column: "differentiate",
    title: "Me preocupo por los detalles.",
    description:
      "Presto atención a los pequeños detalles que marcan la diferencia entre un producto que simplemente funciona y uno que ofrece una experiencia de calidad para los usuarios.",
    icon: "detail",
  },
  {
    column: "differentiate",
    title: "Sé buscar la información.",
    description:
      "Es mi habilidad más valiosa: encontrar las respuestas por mi cuenta. Soy consciente de todo lo que me falta por aprender y lejos de abrumarme, me apasiona saber que puedo seguir mejorando. Sin depender de nadie, más que de mi curiosidad.",
    icon: "critical",
  },
];
