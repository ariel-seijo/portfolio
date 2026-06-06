export interface EducationInfo {
  degree: string;
  institution: string;
  address: string;
  yearRange: string;
  status: string;
  gpa: {
    value: string;
    label: string;
    percentage: number; // 0-100 for the ring fill
  };
  certificateUrl: string;
}

export const EDUCATION: EducationInfo = {
  degree: "Técnico Superior en Desarrollo de Software",
  institution: "Instituto de Formación Técnica Superior Nº4",
  address: "Murguiondo 2105, Mataderos, CABA",
  yearRange: "2022 — 2024",
  status: "Graduado",
  gpa: {
    value: "9,30",
    label: "Promedio",
    percentage: 93, // ~93% of 10
  },
  certificateUrl:
    "https://sisfet-firma.educacion.gob.ar/d/1086579Oq5ptSeqklCD5LAY",
};

/** Pre-computed SVG dash values for the GPA ring */
const RING_RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS; // ~276.46

export function getGpaRingDash(): {
  circumference: number;
  offset: number;
} {
  const fill = CIRCUMFERENCE * (EDUCATION.gpa.percentage / 100);
  const offset = CIRCUMFERENCE - fill;
  return {
    circumference: CIRCUMFERENCE,
    offset: Math.round(offset * 100) / 100,
  };
}
