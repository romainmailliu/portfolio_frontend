/**
 * Schéma du formulaire contact (composant `Moderne`, présent sur / et /contact).
 * Seul l'email est obligatoire — c'était déjà la règle du formulaire EmailJS,
 * on ne durcit pas la saisie au passage sur Resend.
 */

import { z } from "zod";

export const contactSchema = z.object({
  email: z
    .email("Vérifiez cette adresse email.")
    .max(160, "Cette adresse email est trop longue."),
  phone: z
    .string()
    .trim()
    .max(40, "Ce champ est limité à 40 caractères.")
    .optional()
    .transform((value) => (value ? value : undefined)),
  message: z
    .string()
    .trim()
    .max(2000, "Ce champ est limité à 2000 caractères.")
    .optional()
    .transform((value) => (value ? value : undefined)),
});

export type ContactInput = z.input<typeof contactSchema>;
export type Contact = z.output<typeof contactSchema>;
