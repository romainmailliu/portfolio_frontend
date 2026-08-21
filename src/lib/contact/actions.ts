"use server";

import { headers } from "next/headers";
import { isEmailConfigured, sendNotification } from "../email/resend";
import {
  clientIpFromHeaders,
  consumeLeadRateLimit,
} from "../leads/rate-limit";
import { contactSchema, type ContactInput } from "./contact-schema";
import { getPostHogClient } from "../posthog-server";

export type ContactResult = { ok: true } | { ok: false; formError: string };

export type ContactPayload = ContactInput & {
  /** Honeypot — invisible pour les humains, rempli par les bots. */
  website?: string;
};

const GENERIC_ERROR =
  "L'envoi a échoué de mon côté. Réessayez dans un instant, ou écrivez-moi directement à romain.mailliu@gmail.com.";

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  // 1. Pot de miel : succès silencieux, le bot n'apprend rien.
  if (payload?.website) {
    return { ok: true };
  }

  // 2. Limite par IP, dans un seau distinct de celui des candidatures pour
  //    qu'un message de contact ne consomme pas le quota de /site-vitrine.
  const requestHeaders = await headers();
  const ip = clientIpFromHeaders(requestHeaders);
  if (!consumeLeadRateLimit(`contact:${ip}`)) {
    return {
      ok: false,
      formError:
        "Vous avez déjà envoyé plusieurs messages. Réessayez dans une heure.",
    };
  }

  // 3. Validation serveur — le client n'est jamais cru sur parole.
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      formError:
        parsed.error.issues[0]?.message ?? "Vérifiez les champs du formulaire.",
    };
  }

  const { email, phone, message } = parsed.data;

  if (!isEmailConfigured()) {
    // Sans clé, le message n'est pas perdu : il reste dans les logs runtime.
    // En production c'est une anomalie de configuration, journalisée en `error`
    // pour qu'elle remonte — sinon le formulaire dirait « Reçu » pour rien.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] RESEND_API_KEY absente — message conservé dans les logs uniquement",
      );
    }
    console.info("[contact] message reçu", { email, phone, message });
    return { ok: true };
  }

  try {
    await sendNotification({
      subject: `Contact — ${email}`,
      text: [
        `Email : ${email}`,
        phone ? `Téléphone : ${phone}` : null,
        "",
        message ?? "(aucun message)",
      ]
        .filter((line) => line !== null)
        .join("\n"),
      replyTo: email,
    });
  } catch (error) {
    console.error("[contact] échec de livraison", error);
    return { ok: false, formError: GENERIC_ERROR };
  }

  const ph = getPostHogClient();
  if (ph) {
    ph.capture({
      distinctId: "anonymous",
      event: "contact_received",
      properties: {
        has_phone: Boolean(phone),
        has_message: Boolean(message),
      },
    });
    await ph.flush();
  }

  return { ok: true };
}
