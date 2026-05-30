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
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="margin-bottom: 8px; color: #8b5cf6;">Nuevo mensaje del portfolio</h2>
          <p style="color: #71717a; margin-bottom: 24px;">Recibiste un mensaje de un potencial recruiter o colaborador.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #a1a1aa; border-bottom: 1px solid #1a1a20;">Nombre</td>
              <td style="padding: 8px 12px; color: #fafafa; border-bottom: 1px solid #1a1a20;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #a1a1aa; border-bottom: 1px solid #1a1a20;">Email</td>
              <td style="padding: 8px 12px; color: #fafafa; border-bottom: 1px solid #1a1a20;">${email}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #131317; border-radius: 8px; border: 1px solid rgb(255 255 255 / 0.06);">
            <p style="color: #fafafa; white-space: pre-wrap; line-height: 1.6; margin: 0;">${message}</p>
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
