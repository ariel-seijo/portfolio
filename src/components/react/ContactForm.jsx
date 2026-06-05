import { useState, useRef, useCallback } from "react";
import "./ContactForm.css";

const MESSAGE_MAX = 1000;

function validate({ name, email, message }) {
  if (!name.trim() || !email.trim() || !message.trim()) {
    return "Todos los campos son obligatorios.";
  }
  if (!email.includes("@") || !email.includes(".")) {
    return "Ingresá un email válido.";
  }
  if (message.trim().length < 10) {
    return "El mensaje debe tener al menos 10 caracteres.";
  }
  if (message.length > MESSAGE_MAX) {
    return `El mensaje no puede superar los ${MESSAGE_MAX} caracteres.`;
  }
  return null;
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = formRef.current;
    const data = new FormData(form);
    const fields = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };

    const validationError = validate(fields);
    if (validationError) {
      setErrorMsg(validationError);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Error al enviar el mensaje.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err.message || "Error inesperado. Intentá de nuevo.");
      setStatus("error");
    }
  }

  function handleRetry() {
    setStatus("idle");
    setErrorMsg("");
  }

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("hariel.seijo@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silently
    }
  }, []);

  return (
    <section id="contacto" className="contact-section">
      <div className="section-heading">
        <h2 className="title-block">
          <span className="bracket bracket--open" aria-hidden="true">&lt;</span>
          <span className="title-main">Contacto</span>
          <span className="bracket bracket--close" aria-hidden="true">/&gt;</span>
        </h2>
      </div>

      <div className="contact-grid stagger-children">
        {/* ── Left: Form ── */}
        <div className="contact-card stagger-1">
          <div className="contact-card-header">
            <h3 className="contact-card-title">Trabajemos juntos</h3>
            <p className="contact-card-desc">
              Si tenés un proyecto, una idea o propuesta de la que quieras
              conversar conmigo, escribime y te respondo lo antes posible.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
            noValidate
          >
            <div className="form-field">
              <label htmlFor="contact-name" className="form-label">
                Nombre
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Tu nombre completo"
                className="form-input"
                required
                disabled={status === "loading"}
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                className="form-input"
                required
                disabled={status === "loading"}
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message" className="form-label">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={MESSAGE_MAX}
                placeholder="Contame sobre tu proyecto o idea..."
                className="form-textarea"
                required
                disabled={status === "loading"}
                onChange={(e) => setCharCount(e.target.value.length)}
              />
              <span
                className={`form-counter${charCount >= MESSAGE_MAX ? " form-counter--full" : ""}`}
                aria-live="polite"
              >
                {charCount}/{MESSAGE_MAX}
              </span>
            </div>

            {status === "error" && (
              <div className="form-alert form-alert--error">
                <svg
                  className="form-alert-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 5v3M8 11h.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            {status === "success" ? (
              <div className="form-success">
                <svg
                  className="form-success-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 13l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>¡Mensaje enviado! Te respondo lo antes posible.</span>
                <button
                  type="button"
                  className="form-send-another"
                  onClick={handleRetry}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="form-submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <span className="form-spinner" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg
                      className="form-submit-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M14 2L7 9M14 2l-4 12-3-5-5-3L14 2z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Enviar mensaje
                  </>
                )}
              </button>
            )}
          </form>
        </div>

        <div className="contact-info stagger-2">
          <div className="info-card">
            <h4 className="info-card-title">Información de contacto</h4>
            <ul className="info-list">
              <li className="info-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 5l6 3.5L14 5M3 3h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="email-row">
                  <span>hariel.seijo@gmail.com</span>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={handleCopyEmail}
                    aria-label={
                      copied ? "Copiado" : "Copiar email al portapapeles"
                    }
                  >
                    {copied ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect
                          x="5"
                          y="5"
                          width="9"
                          height="9"
                          rx="1.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </button>
                </span>
              </li>
              <li className="info-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 1a6 6 0 00-6 6c0 4.5 6 9 6 9s6-4.5 6-9a6 6 0 00-6-6z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="8"
                    cy="7"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          <div className="info-card">
            <h4 className="info-card-title">Disponibilidad</h4>
            <p className="info-availability">
              <span className="availability-dot" aria-hidden="true" />
              Abierto a nuevas oportunidades
            </p>
          </div>

          <div className="info-card">
            <h4 className="info-card-title">Curriculum</h4>
            <a href="/cv.pdf" className="cv-download-link" download>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 11V1M8 11L5 8M8 11L11 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Descargar CV
            </a>
          </div>

          <div className="info-card">
            <h4 className="info-card-title">Social</h4>
            <div className="info-social">
              <a
                href="https://github.com/ariel-seijo"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 22v-2.8c0-1 .3-2-1-2.7 3.5-.4 7.5-1.7 7.5-7.7a6 6 0 00-1.6-4.2 5.5 5.5 0 00-.2-4.3s-1.3-.4-4.3 1.6a14.8 14.8 0 00-7.8 0C4.5 0 3.2.4 3.2 1c-.8 1.3-.9 2.8-.2 4.2A6 6 0 001.5 9.5c0 6 4 7.3 7.5 7.7-1.3.7-1 1.7-1 2.7V22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/arielseijo"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 11v6M8 8v.01M12 17v-3.5a1.5 1.5 0 113 0V17M12 13.5V17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* ── Right: Info ── */}
      </div>
    </section>
  );
}
