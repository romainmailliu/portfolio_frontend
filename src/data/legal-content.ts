/**
 * Informations légales de l'éditeur, affichées sur /mentions-legales et
 * /politique-de-confidentialite.
 *
 * TODO(Romain) : adresse et téléphone volontairement non publiés pour
 * l'instant (décision du 30/09/2026). La LCEN (art. 6-III) les impose à un
 * professionnel : les renseigner ici après le transfert du siège à Marseille
 * (adresse de domiciliation possible) et le choix d'un numéro pro. Une valeur
 * `null` masque simplement la ligne.
 */

export const legalUpdatedAt = "30 septembre 2026";

export const publisher = {
  name: "Romain Mailliu",
  /** Nature juridique 1000 au répertoire Sirene. */
  status: "Entrepreneur individuel",
  siret: "925 120 032 00014",
  /** Franchise en base : les factures sont émises sans TVA. */
  vat: "TVA non applicable, article 293 B du CGI",
  /** Adresse professionnelle ou de domiciliation. */
  address: null as string | null,
  phone: null as string | null,
  email: "romain.mailliu@gmail.com",
};

export const host = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  website: "https://vercel.com",
};
