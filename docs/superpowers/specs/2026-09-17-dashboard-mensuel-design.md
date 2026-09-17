# Dashboard `/admin` par mois

Date : 2026-09-17

## Objectif

Voir l'évolution du trafic sur le moyen terme : la table de `/admin` affiche
les visiteurs uniques de chaque site pour les 6 derniers mois civils (mois en
cours inclus), à la place des colonnes « Visiteurs 30 j / Évolution ».
L'email du lundi ne change pas (7 j / 30 j, via `loadDashboardRows`).

## Données

- `getPosthogMonthlyVisitors(siteId, months)` (`src/lib/analytics/posthog.ts`) :
  une requête HogQL par site,
  `SELECT toStartOfMonth(timestamp) AS month_start, uniq(person_id) AS visitors
   FROM events WHERE event = '$pageview' AND timestamp >= toStartOfMonth(now() - INTERVAL <months-1> MONTH)
   GROUP BY month_start ORDER BY month_start`,
  retourne `Map<"YYYY-MM", number>`.
- `lastCalendarMonths(now, count)` (`src/lib/analytics/months.ts`) : fonction
  pure, liste des `count` derniers mois civils `{ key: "2026-04", label: "avr. 2026" | "mai" }`
  (année affichée sur la première colonne et sur janvier).
- `loadMonthlyRows(now)` (`src/lib/analytics/load-monthly.ts`) →
  `{ months, rows: SiteMonthlyRow[] }` avec
  `SiteMonthlyRow = { site, visitorsByMonth: number[] (aligné sur months, 0 si absent), error }`.
  Mêmes règles d'erreur que `loadDashboardRows` (ID manquant, exception PostHog → `error`).

## Table

`SitesTable` reçoit `{ months, rows }` :

| Colonne | Contenu |
|---|---|
| Site | nom + lien externe, colonne collante (`sticky left-0`) avec fond, pour rester lisible en défilement horizontal |
| un mois par colonne | `formatCompactNumber(visiteurs)`, alignés à droite ; « — » sur toute la ligne si `error` |

- Tri : visiteurs du mois en cours, décroissant.
- Pied : Total par mois.
- Sous-titre : « Visiteurs uniques par mois civil · 6 derniers mois, mois en cours partiel ».
- Note : « Une même personne peut compter dans plusieurs mois. Le total n'est pas une somme de personnes uniques entre sites. »
- Erreur : « Données indisponibles » sous le nom, message dans `title`.
- Mobile : `overflow-x-auto` assumé ; la colonne Site fixée compense.

## Inchangé

`loadDashboardRows`, `SiteVisitorsRow`, `getPosthogTrafficMetrics`, la route cron,
`traffic-report.ts`, l'authentification, la config des sites.

## Tests

- `tsc`, `lint`, `build`.
- `/admin` local : 12 lignes, 6 colonnes de mois, total ; Storynous à « — » ou 0.
- 360 px : la colonne Site reste visible pendant le défilement.
