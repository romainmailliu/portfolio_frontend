# Dashboard `/admin` simplifié + projet Storynous

Date : 2026-09-17

## Objectif

1. Réduire le dashboard de suivi du trafic à une seule table lisible d'un coup d'œil.
2. Ajouter Storynous à la liste des projets du portfolio.

## 1. Dashboard `/admin`

### État actuel

`src/app/admin/page.tsx` affiche un tableau comparatif (pages vues, visiteurs,
deux évolutions, ratio pages/visiteur avec indicateur d'engagement) puis onze
cartes `SiteCard` avec quatre KPI chacune, un total historique et un
histogramme mensuel. Chaque site déclenche huit requêtes HogQL.

### Cible

**Page** : l'en-tête est conservé tel quel (libellé « Analytics », titre
« Dashboard », alerte de déconnexion, lien « ← Site public », bouton
« Déconnexion »). En dessous, un seul composant `SitesTable`. Rien d'autre.

**Tableau `SitesTable`** (`src/components/dashboard/SitesTable.tsx`) :

| Colonne | Contenu |
|---|---|
| Site | nom + icône lien externe (`ExternalLink`) vers `publicSiteHref(site.gscSiteUrl)`, `target="_blank"` |
| Visiteurs | `formatCompactNumber(currentVisitors)` — personnes distinctes sur 30 j glissants |
| Évolution | `formatSignedPercent(getEvolution(current, previous))` — vert (`text-emerald-700`) si > 0, rouge (`text-red-700`) si < 0, gris (`text-forest/60`) sinon |

- Tri : visiteurs décroissants.
- Pied : ligne « Total » avec somme des visiteurs et évolution de la somme.
- Sous-titre du bloc : « 30 derniers jours (fenêtre glissante) vs les 30 jours précédents ».
- Note unique sous le tableau : « Le total visiteurs n'est pas une somme de personnes uniques entre sites. »
- Site en erreur : « Données indisponibles » en `text-xs text-red-700` sous le nom, message technique dans `title`. La ligne reste affichée avec « — » dans les colonnes chiffrées.
- Mobile : pas de `min-w` sur la table ; trois colonnes tiennent à 360 px sans scroll horizontal. Le wrapper garde `overflow-x-auto` par sécurité.
- Styles : réutilise `admin-table-wrap`, `admin-table`, `sticky-card sticky-card--cream`.

**Données** :

- `SiteMetricPayload` (déplacé dans `src/lib/analytics/load-dashboard.ts`) devient
  `{ site: AnalyticsSite; currentVisitors: number; previousVisitors: number; error: string | null }`.
- `loadDashboardRows()` n'appelle plus que `getPosthogTrafficMetrics(site.id)`.
  Les messages d'ID manquant sont conservés.
- `getPosthogTrafficMetrics()` (`src/lib/analytics/posthog.ts`) ne conserve que
  les deux requêtes visiteurs (30 j courants, 30 j précédents). Son type de
  retour `PosthogTrafficMetrics` se réduit à `{ currentVisitors; previousVisitors }`.
  Passage de 8 à 2 requêtes HogQL par site.

**Suppressions** :

- Composants : `SiteCard.tsx`, `KPIBox.tsx`, `RatioEngagementIndicator.tsx`,
  `VisitorHistoryPanel.tsx`, `SitesComparisonTable.tsx`.
- `posthog.ts` : `getPosthogVisitorHistory`, `MonthlyVisitorBin`,
  `PosthogVisitorHistory`, requêtes pages vues et referrer Google.
- `math.ts` : `getPagesPerVisitorRatio`, `formatPagesPerVisitorRatio`,
  `getPagesPerVisitorEngagement`. Restent `getEvolution`, `formatCompactNumber`,
  `formatSignedPercent`.
- `src/styles/admin.css` : `.admin-cell-top`, `.admin-chart-track`, `.admin-chart-bar`.
  `.admin-skeleton` est conservé si `loading.tsx` l'utilise encore ; `loading.tsx`
  est adapté pour n'afficher qu'un squelette de table.

**Inchangé** : `src/config/analytics-sites.ts`, variables d'environnement,
authentification, `error.tsx`, `layout.tsx`.

### Tests

- `npm run build` sans erreur ni import mort.
- `/admin` en local avec `.env.local` : onze lignes, tri décroissant, total cohérent,
  aucune erreur console.
- Un site sans `POSTHOG_PROJECT_ID_*` affiche « Données indisponibles » sans casser la page.
- Largeur 360 px : aucun scroll horizontal.

## 2. Storynous dans le portfolio

Une entrée ajoutée **en tête** de `PROJECTS` dans `src/views/App.tsx` :

```ts
{
  name: "Storynous",
  href: "https://www.storynous.fr/",
  description: "transmettre son histoire familiale à ses enfants",
},
```

- Wording validé : la mission d'abord ; l'IA est un moyen, elle n'apparaît pas
  dans la puce (le site lui-même ne la met pas en avant).
- Chip cliquable, tracké via `project_link_clicked` comme les autres.
- Pas d'ajout au dashboard `/admin` (nécessiterait un projet PostHog dédié).

### Tests

- Chip visible sur mobile (`mobile_chips`) et desktop (`desktop_chips`), lien ouvert
  dans un nouvel onglet.
- Les accents alternés (`STICKY_ACCENTS`) se décalent d'un cran : acceptable.

## Hors périmètre

- Nouvelle métrique, nouveau site dans le dashboard, refonte de l'authentification.
- Modification du texte des autres puces.
