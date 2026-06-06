export interface ContactText {
  form: {
    title: string;
    description: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    submit: string;
    submitting: string;
    sendAnother: string;
  };
  info: {
    contactTitle: string;
    availabilityTitle: string;
    cvTitle: string;
    cvDownload: string;
    socialTitle: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    messageMin: string;
    messageMax: (max: number) => string;
  };
  success: string;
  errorDefault: string;
}

export const MESSAGE_MAX = 1000;
export const MESSAGE_MIN = 10;

export const CONTACT_TEXT: ContactText = {
  form: {
    title: "¡Trabajemos juntos!",
    description:
      "Escribime y te respondo lo antes posible.",
    fields: {
      name: {
        label: "Nombre",
        placeholder: "Tu nombre completo",
      },
      email: {
        label: "Email",
        placeholder: "tu@email.com",
      },
      message: {
        label: "Mensaje",
        placeholder: "Contame sobre tu proyecto o idea...",
      },
    },
    submit: "Enviar mensaje",
    submitting: "Enviando...",
    sendAnother: "Enviar otro mensaje",
  },
  info: {
    contactTitle: "Información de contacto",
    availabilityTitle: "Disponibilidad",
    cvTitle: "Curriculum",
    cvDownload: "Descargar CV",
    socialTitle: "Social",
  },
  validation: {
    required: "Todos los campos son obligatorios.",
    invalidEmail: "Ingresá un email válido.",
    messageMin: "El mensaje debe tener al menos 10 caracteres.",
    messageMax: (max: number) =>
      `El mensaje no puede superar los ${max} caracteres.`,
  },
  success: "¡Mensaje enviado! Te respondo lo antes posible.",
  errorDefault: "Error al enviar el mensaje.",
};

export const FORM_STATUS = ["idle", "loading", "success", "error"] as const;
export type FormStatus = (typeof FORM_STATUS)[number];
