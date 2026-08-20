/**
 * Schéma partagé client / serveur du formulaire de candidature /tarifs.
 * Le client s'en sert pour valider chaque écran, la server action pour
 * revalider l'intégralité de la soumission — jamais de confiance au client.
 */

import { z } from "zod";
import {
  BUDGET_FIT_OPTIONS,
  CONTENT_READINESS_OPTIONS,
  LOOKING_FOR_OPTIONS,
  NEEDS_OPTIONS,
  PROFILE_OPTIONS,
  TIMELINE_OPTIONS,
} from "../../data/tarifs-content";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Ce champ est limité à ${max} caractères.`)
    .optional()
    .transform((value) => (value ? value : undefined));

export const leadSchema = z
  .object({
    // Écran 1 — Vous
    fullName: z
      .string()
      .trim()
      .min(2, "Indiquez votre prénom et votre nom.")
      .max(120, "Ce champ est limité à 120 caractères."),
    email: z
      .email("Vérifiez cette adresse email.")
      .max(160, "Cette adresse email est trop longue."),
    profile: z.enum(PROFILE_OPTIONS).optional(),
    structureName: optionalText(160),
    siteUrl: optionalText(300),
    noSiteYet: z.boolean().default(false),

    // Écran 2 — Le projet
    pitch: z
      .string()
      .trim()
      .min(20, "Décrivez votre projet en deux phrases (20 caractères minimum).")
      .max(2000, "Ce champ est limité à 2000 caractères."),
    lookingFor: z.enum(LOOKING_FOR_OPTIONS).optional(),
    needs: z.array(z.enum(NEEDS_OPTIONS)).max(NEEDS_OPTIONS.length).default([]),

    // Écran 3 — Le cadrage
    contentReadiness: z.enum(CONTENT_READINESS_OPTIONS).optional(),
    timeline: z.enum(TIMELINE_OPTIONS).optional(),
    inspirations: optionalText(1000),
    budgetFit: z.enum(BUDGET_FIT_OPTIONS).optional(),
    consent: z
      .boolean()
      .refine(
        (value) => value === true,
        "Cochez cette case pour envoyer votre candidature.",
      ),
  })
  .transform((lead) => ({
    ...lead,
    // Un site saisi sans schéma reste exploitable : « monsite.fr » → « https://monsite.fr ».
    siteUrl:
      lead.noSiteYet || !lead.siteUrl
        ? undefined
        : /^https?:\/\//i.test(lead.siteUrl)
          ? lead.siteUrl
          : `https://${lead.siteUrl}`,
  }));

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

/** Champs de l'écran 1, 2 puis 3 — sert au gating étape par étape côté client. */
export const STEP_FIELDS: readonly (readonly (keyof LeadInput)[])[] = [
  ["fullName", "email", "profile", "structureName", "siteUrl", "noSiteYet"],
  ["pitch", "lookingFor", "needs"],
  ["contentReadiness", "timeline", "inspirations", "budgetFit", "consent"],
] as const;

export const emptyLead: LeadInput = {
  fullName: "",
  email: "",
  profile: undefined,
  structureName: "",
  siteUrl: "",
  noSiteYet: false,
  pitch: "",
  lookingFor: undefined,
  needs: [],
  contentReadiness: undefined,
  timeline: undefined,
  inspirations: "",
  budgetFit: undefined,
  consent: false,
};

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

/** Aplatit les issues zod en un message par champ (le premier suffit à l'UI). */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in errors)) {
      errors[field as keyof LeadInput] = issue.message;
    }
  }
  return errors;
}

/**
 * Valide uniquement les champs d'un écran donné.
 * On parse l'objet complet puis on ne retient que les erreurs de l'écran :
 * l'utilisateur n'est jamais bloqué par un champ qu'il n'a pas encore vu.
 */
export function validateStep(
  values: LeadInput,
  stepIndex: number,
): FieldErrors {
  const result = leadSchema.safeParse(values);
  if (result.success) return {};

  const fields = STEP_FIELDS[stepIndex] ?? [];
  const all = toFieldErrors(result.error);
  const scoped: FieldErrors = {};
  for (const field of fields) {
    if (all[field]) scoped[field] = all[field];
  }
  return scoped;
}
