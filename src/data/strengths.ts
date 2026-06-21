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
      "No importa el stack, el dominio ni la complejidad. Aprendo rápido, investigo a fondo y encuentro la forma de resolver lo que haga falta. Cada proyecto es una oportunidad de dominar algo nuevo.",
    icon: "adapt",
  },
  {
    column: "hire",
    title: "Trabajar conmigo es cómodo.",
    description:
      "Comunico claro, pregunto cuando no sé y documento lo que hago. No dejo cabos sueltos ni sorpresas de último momento. La confianza se construye con profesionalismo y transparencia.",
    icon: "comfort",
  },
  {
    column: "hire",
    title: "Hago mucho más que programar.",
    description:
      "Entiendo el negocio, pienso en el usuario, optimizo el SEO, cuido la accesibilidad y me preocupo por la performance. No solo entrego código: entrego soluciones completas que funcionan en el mundo real.",
    icon: "multitool",
  },
  {
    column: "differentiate",
    title: "Aprovecho la IA con criterio.",
    description:
      "Uso inteligencia artificial a diario para acelerar mi trabajo, pero nunca a ciegas. Sé cuándo confiar, cuándo verificar y cuándo descartar. La IA es mi herramienta, no mi reemplazo.",
    icon: "ai",
  },
  {
    column: "differentiate",
    title: "Me fijo en cada detalle.",
    description:
      "Un pixel fuera de lugar, una animación que no fluye, un contraste que falla. Nada se me escapa. La diferencia entre un producto aceptable y uno excelente está en los detalles que la mayoría ignora.",
    icon: "detail",
  },
  {
    column: "differentiate",
    title: "Soy muy autocrítico.",
    description:
      "No entrego algo hasta que estoy convencido de que es lo mejor que puedo hacer. Me exijo más que nadie porque sé que siempre hay margen para mejorar. La autocomplacencia es enemiga del crecimiento.",
    icon: "critical",
  },
];
