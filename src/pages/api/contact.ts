import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL || "arielseijo@outlook.com";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    // Validación básica
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son obligatorios." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!email.includes("@") || !email.includes(".")) {
      return new Response(
        JSON.stringify({ error: "Email inválido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Enviar email vía Resend
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Mensaje de ${name} — Portfolio`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
          <!-- Header -->
          <div style="background: #8b5cf6; padding: 28px 32px;">
            <h2 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.01em;">Nuevo mensaje del portfolio</h2>
            <p style="color: rgb(255 255 255 / 0.8); font-size: 14px; margin: 6px 0 0;">arielseijo.dev</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px; line-height: 1.5;">
              Recibiste un mensaje de un potencial recruiter o colaborador.
            </p>

            <!-- Fields table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; font-size: 11px; font-weight: 600; color: #8b5cf6; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #f3f4f6;">Nombre</td>
              </tr>
              <tr>
                <td style="padding: 6px 0 14px; font-size: 15px; color: #111827; border-bottom: 1px solid #f3f4f6;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0 0; font-size: 11px; font-weight: 600; color: #8b5cf6; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
              </tr>
              <tr>
                <td style="padding: 6px 0 14px; font-size: 15px; color: #111827; border-bottom: 1px solid #f3f4f6;">
                  <a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>

            <!-- Message block -->
            <div style="margin-bottom: 0;">
              <p style="font-size: 11px; font-weight: 600; color: #8b5cf6; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px;">Mensaje</p>
              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
                <p style="color: #374151; font-size: 14px; white-space: pre-wrap; line-height: 1.6; margin: 0;">${message}</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
              Enviado desde el formulario de contacto de <a href="https://arielseijo.dev" style="color: #8b5cf6; text-decoration: none;">arielseijo.dev</a>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Error al enviar el mensaje. Intentá de nuevo." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "¡Mensaje enviado! Te respondo pronto." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ error: "Error inesperado. Intentá de nuevo más tarde." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
