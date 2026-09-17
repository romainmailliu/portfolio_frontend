# Dashboard simplifié + Storynous — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réduire `/admin` à une seule table « Site / Visiteurs 30 j / Évolution » et ajouter Storynous aux projets du portfolio.

**Architecture:** Next.js App Router, page serveur `src/app/admin/page.tsx` qui appelle `loadDashboardRows()` (une requête HogQL PostHog par métrique et par site) puis rend un composant serveur. On remplace les cinq composants actuels par `SitesTable`, on réduit le loader et la couche PostHog aux seules requêtes visiteurs, puis on supprime le code mort. Storynous est une entrée de plus dans le tableau `PROJECTS` de `src/views/App.tsx`.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind + `src/styles/admin.css`, PostHog HogQL via `fetch`, lucide-react. Pas de framework de test : la vérification passe par `npx tsc --noEmit`, `npm run lint`, `npm run build` et un contrôle visuel de `/admin`.

**Spec:** `docs/superpowers/specs/2026-09-17-dashboard-simplifie-et-storynous-design.md`

---

## Fichiers

| Action | Fichier | Rôle |
|---|---|---|
| Modifier | `src/views/App.tsx` | ajouter Storynous en tête de `PROJECTS` |
| Créer | `src/components/dashboard/SitesTable.tsx` | la table unique |
| Modifier | `src/lib/analytics/load-dashboard.ts` | définit `SiteMetricPayload`, ne charge que les visiteurs |
| Modifier | `src/app/admin/page.tsx` | rend `SitesTable` |
| Modifier | `src/app/admin/loading.tsx` | squelette d'une seule table |
| Supprimer | `src/components/dashboard/SiteCard.tsx`, `KPIBox.tsx`, `RatioEngagementIndicator.tsx`, `VisitorHistoryPanel.tsx`, `SitesComparisonTable.tsx` | composants morts |
| Modifier | `src/lib/analytics/posthog.ts` | 2 requêtes visiteurs, plus d'historique ni de pages vues / Google |
| Modifier | `src/lib/analytics/math.ts` | garder `getEvolution`, `formatCompactNumber`, `formatSignedPercent` |
| Modifier | `src/styles/admin.css` | retirer `.admin-cell-top`, `.admin-chart-track`, `.admin-chart-bar` |

Ordre des tâches choisi pour que chaque commit compile : on branche d'abord la nouvelle table, on supprime ensuite les anciens composants, et seulement après on réduit la couche PostHog dont ils dépendaient.

---

### Task 1 : Storynous dans le portfolio

**Files:**
- Modify: `src/views/App.tsx:21-23`

- [ ] **Step 1 : Ajouter l'entrée en tête de `PROJECTS`**

Remplacer

```ts
const PROJECTS: ProjectItem[] = [
  {
    name: "Rivière",
```

par

```ts
const PROJECTS: ProjectItem[] = [
  {
    name: "Storynous",
    href: "https://www.storynous.fr/",
    description: "transmettre son histoire familiale à ses enfants",
  },
  {
    name: "Rivière",
```

- [ ] **Step 2 : Vérifier la compilation**

Run: `npx tsc --noEmit && npm run lint`
Expected: aucune sortie d'erreur, code de retour 0.

- [ ] **Step 3 : Vérifier le rendu**

Run: `npm run dev` puis ouvrir `http://localhost:3000/`.
Expected: la puce « Storynous, transmettre son histoire familiale à ses enfants » apparaît en premier dans la liste des projets (desktop et mobile) et ouvre `https://www.storynous.fr/` dans un nouvel onglet. Arrêter le serveur.

- [ ] **Step 4 : Commit**

```bash
git add src/views/App.tsx
git commit -m "Ajouter Storynous aux projets du portfolio

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2 : Composant `SitesTable`

**Files:**
- Create: `src/components/dashboard/SitesTable.tsx`

Le composant définit son propre type de ligne pour ne pas dépendre de `SiteCard` (qui sera supprimé). Ce type sera réexporté par le loader en Task 3.

- [ ] **Step 1 : Créer le composant**

```tsx
import { ExternalLink } from "lucide-react";
import { type AnalyticsSite, publicSiteHref } from "../../config/analytics-sites";
import {
  formatCompactNumber,
  formatSignedPercent,
  getEvolution,
} from "../../lib/analytics/math";

export type SiteVisitorsRow = {
  site: AnalyticsSite;
  /** Personnes distinctes ayant vu au moins une page sur les 30 derniers jours. */
  currentVisitors: number;
  /** Même mesure sur les 30 jours précédents. */
  previousVisitors: number;
  error: string | null;
};

type SitesTableProps = {
  rows: SiteVisitorsRow[];
};

function evolutionClass(delta: number): string {
  if (delta > 0) return "text-emerald-700";
  if (delta < 0) return "text-red-700";
  return "text-forest/60";
}

export function SitesTable({ rows }: SitesTableProps) {
  const sorted = [...rows].sort(
    (a, b) => b.currentVisitors - a.currentVisitors,
  );
  const totalCurrent = sorted.reduce((s, r) => s + r.currentVisitors, 0);
  const totalPrevious = sorted.reduce((s, r) => s + r.previousVisitors, 0);
  const totalEvolution = getEvolution(totalCurrent, totalPrevious);

  return (
    <section className="admin-table-wrap sticky-card sticky-card--cream">
      <div className="border-b border-pencil px-5 py-4">
        <h2 className="field-label !opacity-100">Visiteurs par site</h2>
        <p className="mt-1 text-caption text-forest/80">
          30 derniers jours (fenêtre glissante) vs les 30 jours précédents
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table w-full text-left text-sm">
          <thead>
            <tr>
              <th scope="col" className="px-5 py-3">
                Site
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Visiteurs
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Évolution
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const href = publicSiteHref(row.site.gscSiteUrl);
              const evolution = getEvolution(
                row.currentVisitors,
                row.previousVisitors,
              );
              return (
                <tr key={row.site.id}>
                  <td className="px-5 py-3.5 font-medium text-forest">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ouvrir le site ${row.site.name} (nouvel onglet)`}
                        className="inline-flex items-center gap-1.5 hover:underline"
                      >
                        {row.site.name}
                        <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
                      </a>
                    ) : (
                      row.site.name
                    )}
                    {row.error ? (
                      <span
                        className="mt-0.5 block text-xs font-normal text-red-700"
                        title={row.error}
                      >
                        Données indisponibles
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums font-semibold text-forest">
                    {row.error ? "—" : formatCompactNumber(row.currentVisitors)}
                  </td>
                  <td
                    className={`px-5 py-3.5 text-right tabular-nums ${evolutionClass(evolution)}`}
                  >
                    {row.error ? "—" : formatSignedPercent(evolution)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-5 py-3.5 text-forest">Total</td>
              <td className="px-4 py-3.5 text-right tabular-nums text-forest">
                {formatCompactNumber(totalCurrent)}
              </td>
              <td
                className={`px-5 py-3.5 text-right tabular-nums ${evolutionClass(totalEvolution)}`}
              >
                {formatSignedPercent(totalEvolution)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="border-t border-pencil px-5 py-2 text-[11px] text-pencil">
        Le total visiteurs n&apos;est pas une somme de personnes uniques entre
        sites.
      </p>
    </section>
  );
}
```

- [ ] **Step 2 : Vérifier la compilation**

Run: `npx tsc --noEmit && npm run lint`
Expected: code de retour 0.

- [ ] **Step 3 : Commit**

```bash
git add src/components/dashboard/SitesTable.tsx
git commit -m "Créer la table unique des visiteurs par site

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3 : Brancher la table sur la page

**Files:**
- Modify: `src/lib/analytics/load-dashboard.ts` (réécriture complète)
- Modify: `src/app/admin/page.tsx:1-5` et `:52-58`
- Modify: `src/app/admin/loading.tsx` (réécriture complète)

- [ ] **Step 1 : Réécrire `load-dashboard.ts`**

```ts
import type { SiteVisitorsRow } from "../../components/dashboard/SitesTable";
import { ANALYTICS_SITES } from "../../config/analytics-sites";
import { getPosthogTrafficMetrics } from "./posthog";

export type SiteMetricPayload = SiteVisitorsRow;

const emptyPayload = (
  site: (typeof ANALYTICS_SITES)[number],
  error: string,
): SiteMetricPayload => ({
  site,
  currentVisitors: 0,
  previousVisitors: 0,
  error,
});

export async function loadDashboardRows(): Promise<SiteMetricPayload[]> {
  return Promise.all(
    ANALYTICS_SITES.map(async (site) => {
      if (!site.posthogProjectId.trim()) {
        let missingId: string;
        if (site.id === "amidou") {
          missingId =
            "Renseignez POSTHOG_PROJECT_ID_AMIDOU (Project settings → Project ID).";
        } else if (site.id === "ats-seduction") {
          missingId =
            "Renseignez POSTHOG_PROJECT_ID_ATS_SEDUCTION (repli possible : POSTHOG_PROJECT_ID_ATS).";
        } else {
          missingId = `Renseignez l’identifiant projet PostHog pour « ${site.name} ».`;
        }
        return emptyPayload(site, missingId);
      }

      try {
        const metrics = await getPosthogTrafficMetrics(site.id);
        return {
          site,
          currentVisitors: metrics.currentVisitors,
          previousVisitors: metrics.previousVisitors,
          error: null,
        };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "PostHog métriques : erreur";
        return emptyPayload(site, message);
      }
    }),
  );
}
```

- [ ] **Step 2 : Mettre à jour les imports de `page.tsx`**

Remplacer

```tsx
import Link from "next/link";
import { SiteCard } from "../../components/dashboard/SiteCard";
import { SitesComparisonTable } from "../../components/dashboard/SitesComparisonTable";
import { loadDashboardRows } from "../../lib/analytics/load-dashboard";
```

par

```tsx
import Link from "next/link";
import { SitesTable } from "../../components/dashboard/SitesTable";
import { loadDashboardRows } from "../../lib/analytics/load-dashboard";
```

- [ ] **Step 3 : Remplacer le corps de la page**

Remplacer

```tsx
      <SitesComparisonTable rows={rows} />

      <div className="flex flex-col gap-6">
        {rows.map((row) => (
          <SiteCard key={row.site.id} {...row} />
        ))}
      </div>
    </main>
```

par

```tsx
      <SitesTable rows={rows} />
    </main>
```

- [ ] **Step 4 : Réécrire `loading.tsx`**

```tsx
export default function DashboardLoading() {
  return (
    <main className="page-container max-w-7xl py-10">
      <div className="admin-skeleton mb-10 h-28 animate-pulse" />
      <div className="admin-skeleton h-[32rem] animate-pulse" />
    </main>
  );
}
```

- [ ] **Step 5 : Vérifier la compilation**

Run: `npx tsc --noEmit && npm run lint`
Expected: code de retour 0. (`SiteCard.tsx` compile encore : il définit son propre type et importe des fonctions toujours présentes.)

- [ ] **Step 6 : Vérifier `/admin` en local**

Run: `npm run dev`, ouvrir `http://localhost:3000/admin`, se connecter.
Expected :
- une seule table, onze lignes triées par visiteurs décroissants, pied « Total » ;
- évolution verte / rouge / grise selon le signe ;
- aucune carte ni graphique sous la table ;
- en réduisant la fenêtre à 360 px de large, pas de barre de scroll horizontal.
Arrêter le serveur.

- [ ] **Step 7 : Commit**

```bash
git add src/lib/analytics/load-dashboard.ts src/app/admin/page.tsx src/app/admin/loading.tsx
git commit -m "Réduire /admin à la table des visiteurs par site

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4 : Supprimer les composants morts

**Files:**
- Delete: `src/components/dashboard/SiteCard.tsx`
- Delete: `src/components/dashboard/KPIBox.tsx`
- Delete: `src/components/dashboard/RatioEngagementIndicator.tsx`
- Delete: `src/components/dashboard/VisitorHistoryPanel.tsx`
- Delete: `src/components/dashboard/SitesComparisonTable.tsx`

- [ ] **Step 1 : Vérifier qu'aucun autre fichier ne les importe**

Run: `grep -rn "SiteCard\|KPIBox\|RatioEngagementIndicator\|VisitorHistoryPanel\|SitesComparisonTable" src --include='*.ts' --include='*.tsx' | grep -v "src/components/dashboard/"`
Expected: aucune ligne.

- [ ] **Step 2 : Supprimer les fichiers**

```bash
git rm src/components/dashboard/SiteCard.tsx \
       src/components/dashboard/KPIBox.tsx \
       src/components/dashboard/RatioEngagementIndicator.tsx \
       src/components/dashboard/VisitorHistoryPanel.tsx \
       src/components/dashboard/SitesComparisonTable.tsx
```

- [ ] **Step 3 : Vérifier la compilation**

Run: `npx tsc --noEmit && npm run lint`
Expected: code de retour 0. `ls src/components/dashboard` ne liste plus que `SitesTable.tsx`.

- [ ] **Step 4 : Commit**

```bash
git commit -m "Supprimer les cartes et graphiques du dashboard

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5 : Réduire la couche PostHog aux visiteurs

**Files:**
- Modify: `src/lib/analytics/posthog.ts:125-360`

- [ ] **Step 1 : Supprimer les helpers d'historique**

Supprimer intégralement les fonctions `parseMonth` et `extractMonthlyVisitors` ainsi que les types `MonthlyVisitorBin` et `PosthogVisitorHistory` (tout ce qui va de `function parseMonth(` jusqu'à la ligne `};` qui clôt `PosthogVisitorHistory`).

- [ ] **Step 2 : Réduire le type de retour et supprimer le filtre Google**

Remplacer

```ts
export type PosthogTrafficMetrics = {
  currentPageviews: number;
  previousPageviews: number;
  currentVisitors: number;
  previousVisitors: number;
  currentGoogleVisitors: number;
  previousGoogleVisitors: number;
};

/** Sessions dont le referrer indique Google (trafic organique approximatif côté site). */
const GOOGLE_REFERRER_FILTER = `
  AND (
    ilike(toString(properties.\`$referring_domain\`), '%google.%')
    OR ilike(toString(properties.\`$referring_domain\`), '%google%')
    OR ilike(toString(properties.\`$referrer\`), '%google.%')
  )
`.trim();

/**
 * Fenêtres glissantes 30 j vs 30 j précédents — pages vues et visiteurs uniques PostHog.
 */
```

par

```ts
export type PosthogTrafficMetrics = {
  currentVisitors: number;
  previousVisitors: number;
};

/**
 * Visiteurs uniques PostHog (`uniq(person_id)` sur `$pageview`),
 * fenêtres glissantes 30 j vs 30 j précédents.
 */
```

- [ ] **Step 3 : Ne garder que les deux requêtes visiteurs**

Dans `getPosthogTrafficMetrics`, remplacer tout ce qui suit `const extra = ...;` jusqu'à la fin de la fonction par :

```ts
  const visitorCurrent = `
    SELECT uniq(person_id) AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
      AND timestamp < now()
      ${extra}
  `.trim();

  const visitorPrevious = `
    SELECT uniq(person_id) AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 60 DAY
      AND timestamp < now() - INTERVAL 30 DAY
      ${extra}
  `.trim();

  const pid = site.posthogProjectId;

  const [currentVisitors, previousVisitors] = await Promise.all([
    runHogQLScalar(pid, visitorCurrent, credentials, "dash_vis_current"),
    runHogQLScalar(pid, visitorPrevious, credentials, "dash_vis_previous"),
  ]);

  return { currentVisitors, previousVisitors };
}
```

- [ ] **Step 4 : Supprimer `getPosthogVisitorHistory`**

Supprimer la fonction entière, de son commentaire JSDoc `/** Visiteurs uniques depuis la première donnée ...` jusqu'à son `}` final (fin du fichier).

- [ ] **Step 5 : Vérifier que `runHogQLJson` reste utilisé et que le fichier compile**

Run: `grep -c "runHogQLJson\|runHogQLScalar\|extractScalar" src/lib/analytics/posthog.ts && npx tsc --noEmit && npm run lint`
Expected: le compte est ≥ 3 (définitions + appels dans `runHogQLScalar`), puis code de retour 0. Si ESLint signale une fonction inutilisée, la supprimer aussi.

- [ ] **Step 6 : Commit**

```bash
git add src/lib/analytics/posthog.ts
git commit -m "Ne requêter PostHog que pour les visiteurs uniques

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 6 : Nettoyer `math.ts` et le CSS

**Files:**
- Modify: `src/lib/analytics/math.ts:29-130`
- Modify: `src/styles/admin.css:69-79`

- [ ] **Step 1 : Réduire `math.ts` aux trois helpers utilisés**

Le fichier devient exactement :

```ts
/** Percent change vs previous period (can be negative). */
export function getEvolution(current: number, previous: number): number {
  if (!Number.isFinite(current) || !Number.isFinite(previous)) return 0;
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

/** e.g. 12000 → "12k", 950 → "950" */
export function formatCompactNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1_000_000)
    return `${(n / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`.replace(
      /\.0$/,
      "",
    );
  if (abs >= 1000)
    return `${(n / 1000).toFixed(abs >= 10000 ? 0 : 1)}k`.replace(/\.0$/, "");
  return String(Math.round(n));
}

export function formatSignedPercent(delta: number): string {
  if (!Number.isFinite(delta)) return "—";
  const rounded = Math.round(delta * 10) / 10;
  const sign = rounded > 0 ? "+" : "";
  return `${sign}${rounded}%`;
}
```

- [ ] **Step 2 : Retirer les règles CSS orphelines**

Dans `src/styles/admin.css`, supprimer ces trois blocs :

```css
.admin-cell-top {
  background: var(--sticky-teal) !important;
}

.admin-chart-track {
  background: var(--whisper-gray);
}

.admin-chart-bar {
  background: linear-gradient(to top, var(--forest-ink) 0%, #4a6b20 100%);
}
```

- [ ] **Step 3 : Vérifier qu'aucune classe supprimée n'est encore référencée**

Run: `grep -rn "admin-cell-top\|admin-chart-track\|admin-chart-bar\|PagesPerVisitor" src`
Expected: aucune ligne.

- [ ] **Step 4 : Vérifier la compilation**

Run: `npx tsc --noEmit && npm run lint`
Expected: code de retour 0.

- [ ] **Step 5 : Commit**

```bash
git add src/lib/analytics/math.ts src/styles/admin.css
git commit -m "Purger les helpers de ratio et le CSS des graphiques

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 7 : Vérification finale

**Files:** aucun.

- [ ] **Step 1 : Build de production**

Run: `npm run build`
Expected: « Compiled successfully », la route `/admin` listée en dynamique (`ƒ`), aucun avertissement d'import inutilisé.

- [ ] **Step 2 : Contrôle visuel complet**

Run: `npm run dev`, puis :
- `http://localhost:3000/` → la puce Storynous est première, cliquable ;
- `http://localhost:3000/admin` → connexion, table unique, onze lignes, total, aucune erreur dans la console navigateur ni dans le terminal ;
- largeur 360 px → pas de scroll horizontal sur `/admin`.
Arrêter le serveur.

- [ ] **Step 3 : Test d'un site en erreur**

Dans `.env.local`, commenter temporairement `POSTHOG_PROJECT_ID_KLINK`, relancer `npm run dev`, recharger `/admin`.
Expected: la ligne « Klink, le son du vin » affiche « Données indisponibles » en rouge sous le nom, « — » dans les deux colonnes, et se retrouve en bas du tri ; le reste de la page est intact. Rétablir la variable, arrêter le serveur.

- [ ] **Step 4 : État git**

Run: `git status --short && git log --oneline -7`
Expected: arbre propre (hors `posthog-self-driving-report.md`, déjà non suivi avant ce chantier), six commits de ce plan au-dessus de `604d969`.
