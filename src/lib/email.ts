/**
 * Envoi de la demande de devis.
 *
 * Implémentation prête pour EmailJS (aucun backend requis). Pour passer à
 * Resend ou Nodemailer, remplacer le corps de `sendQuoteRequest` par un
 * `fetch("/api/send-quote", { method: "POST", body: JSON.stringify(payload) })`
 * vers votre route serverless — la signature de la fonction ne change pas,
 * donc `QuoteBuilder` n'a rien à modifier.
 *
 * Variables d'environnement attendues (Vite) :
 *   VITE_EMAILJS_SERVICE_ID
 *   VITE_EMAILJS_TEMPLATE_ID
 *   VITE_EMAILJS_PUBLIC_KEY
 */

export interface QuoteRequestPayload {
  eventType: string;
  guests: number;
  location: string;
  formulaName: string;
  addonLabels: string[];
  estimateTotal: number;
  contact: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
}

export class QuoteSubmissionError extends Error {}

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export async function sendQuoteRequest(payload: QuoteRequestPayload): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    // En développement sans clés configurées : on ne bloque pas la démo,
    // mais on prévient clairement au lieu de faire semblant d'avoir envoyé l'e-mail.
    console.warn(
      "[sendQuoteRequest] Variables EmailJS manquantes — configurez VITE_EMAILJS_* pour un envoi réel."
    );
    throw new QuoteSubmissionError(
      "La configuration d'envoi n'est pas encore active. Merci de nous contacter directement par téléphone ou WhatsApp."
    );
  }

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        event_type: payload.eventType,
        guests: payload.guests,
        location: payload.location,
        formula: payload.formulaName,
        addons: payload.addonLabels.join(", ") || "Aucune option",
        estimate_total: `${payload.estimateTotal.toLocaleString("fr-FR")} €`,
        from_name: payload.contact.name,
        reply_to: payload.contact.email,
        phone: payload.contact.phone,
        message: payload.contact.message,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new QuoteSubmissionError(
      `Échec de l'envoi (${response.status}). ${body || "Merci de réessayer ou de nous appeler directement."}`
    );
  }
}
