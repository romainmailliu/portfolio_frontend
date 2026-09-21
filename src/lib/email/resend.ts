import { Resend } from "resend";

/**
 * Point d'envoi unique — les deux formulaires (contact et candidature) passent
 * par ici. Le domaine `romainmailliu.com` est vérifié côté Resend, région EU.
 *
 * `RESEND_API_KEY` vit dans `.env.local` en local et dans les variables
 * d'environnement Vercel en production. Si elle est absente, `getResend()`
 * renvoie `null` : chaque appelant retombe alors sur un mode dégradé plutôt
 * que de faire échouer la soumission.
 */

const FROM_ADDRESS = "contact@romainmailliu.com";
const DEFAULT_FROM_NAME = "Formulaire romainmailliu.com";

/** Destinataire des notifications — surchargeable sans toucher au code. */
export const notificationRecipient =
  process.env.LEADS_NOTIFICATION_EMAIL ?? "romain.mailliu@gmail.com";

let client: Resend | null | undefined;

function getResend(): Resend | null {
  if (client === undefined) {
    const key = process.env.RESEND_API_KEY;
    client = key ? new Resend(key) : null;
  }
  return client;
}

export function isEmailConfigured(): boolean {
  return getResend() !== null;
}

/**
 * Envoie une notification interne. `replyTo` porte l'adresse de la personne qui
 * a rempli le formulaire : répondre depuis sa boîte suffit à lui écrire.
 *
 * Lève si Resend refuse l'envoi — l'appelant décide quoi montrer à l'utilisateur.
 */
export async function sendNotification({
  subject,
  text,
  html,
  replyTo,
  fromName = DEFAULT_FROM_NAME,
}: {
  subject: string;
  text: string;
  /** Version HTML facultative ; `text` reste l'alternative pour les clients sans HTML. */
  html?: string;
  replyTo?: string;
  /** Nom affiché de l'expéditeur ; l'adresse reste `contact@romainmailliu.com`. */
  fromName?: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) {
    throw new Error("RESEND_API_KEY absente : envoi impossible.");
  }

  const { error } = await resend.emails.send({
    from: `${fromName} <${FROM_ADDRESS}>`,
    to: notificationRecipient,
    subject,
    text,
    ...(html ? { html } : {}),
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    throw new Error(`Resend a refusé l'envoi : ${error.message}`);
  }
}
