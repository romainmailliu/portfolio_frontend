# Email hebdomadaire de trafic + Storynous — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Un email texte chaque lundi matin avec les visiteurs 30 j de chaque site, et Storynous ajouté aux sites suivis.

**Architecture:** Cron Vercel → `GET /api/cron/weekly-traffic` (bearer `CRON_SECRET`) → `loadDashboardRows()` (existant) → `buildTrafficReport()` (nouvelle fonction pure) → `sendNotification()` (Resend, existant, + `fromName`).

**Tech Stack:** Next.js App Router (route handler), Vercel Cron, Resend SDK, PostHog HogQL via le loader existant. Pas de framework de test : `tsc`, `eslint`, `next build`, `curl`.

**Spec:** `docs/superpowers/specs/2026-09-17-email-hebdo-trafic-design.md`

---

### Task 1 : Storynous dans la config du dashboard

**Files:**
- Modify: `src/config/analytics-sites.ts` (tableau `SITE_DEFINITIONS`)
- Modify: `.env.example` (avant le bloc Amidou)
- Modify: `.env.local` (hors dépôt)

- [ ] **Step 1 : Ajouter la définition**

Dans `SITE_DEFINITIONS`, insérer avant l'entrée `id: "portfolio"` :

```ts
  {
    id: "storynous",
    name: "Storynous",
    suffix: "STORYNOUS",
    siteUrl: "https://www.storynous.fr/",
  },
```

- [ ] **Step 2 : Documenter les variables**

Dans `.env.example`, après le bloc `POSTHOG_PROJECT_ID_PORTFOLIO` / `GSC_SITE_URL_PORTFOLIO`, ajouter :

```
POSTHOG_PROJECT_ID_STORYNOUS=
GSC_SITE_URL_STORYNOUS=https://www.storynous.fr/
```

- [ ] **Step 3 : Renseigner `.env.local`**

Ajouter `POSTHOG_PROJECT_ID_STORYNOUS=269397` après `POSTHOG_PROJECT_ID_PORTFOLIO`.

- [ ] **Step 4 : Vérifier**

Run: `npx tsc --noEmit && npm run lint`
Expected: exit 0.

- [ ] **Step 5 : Commit**

```bash
git add src/config/analytics-sites.ts .env.example
git commit -m "Suivre Storynous dans le dashboard

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2 : Paramètre `fromName` sur `sendNotification`

**Files:**
- Modify: `src/lib/email/resend.ts`

- [ ] **Step 1 : Remplacer la constante `FROM`**

Remplacer

```ts
const FROM = "Formulaire romainmailliu.com <contact@romainmailliu.com>";
```

par

```ts
const FROM_ADDRESS = "contact@romainmailliu.com";
const DEFAULT_FROM_NAME = "Formulaire romainmailliu.com";
```

- [ ] **Step 2 : Étendre la signature**

Remplacer

```ts
export async function sendNotification({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
```

par

```ts
export async function sendNotification({
  subject,
  text,
  replyTo,
  fromName = DEFAULT_FROM_NAME,
}: {
  subject: string;
  text: string;
  replyTo?: string;
  /** Nom affiché de l'expéditeur ; l'adresse reste `contact@romainmailliu.com`. */
  fromName?: string;
}): Promise<void> {
```

et, dans l'appel `resend.emails.send`, remplacer `from: FROM,` par
`from: \`${fromName} <${FROM_ADDRESS}>\`,`.

- [ ] **Step 3 : Vérifier**

Run: `npx tsc --noEmit && npm run lint && grep -n "FROM" src/lib/email/resend.ts`
Expected: exit 0 ; la constante `FROM` seule n'existe plus, `FROM_ADDRESS` et `DEFAULT_FROM_NAME` sont utilisées.

- [ ] **Step 4 : Commit**

```bash
git add src/lib/email/resend.ts
git commit -m "Permettre un nom d'expéditeur par notification

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3 : Générateur de rapport texte

**Files:**
- Create: `src/lib/analytics/traffic-report.ts`

- [ ] **Step 1 : Créer le fichier**

```ts
import type { SiteVisitorsRow } from "./load-dashboard";
import { formatSignedPercent, getEvolution } from "./math";

const DASHBOARD_URL = "https://www.romainmailliu.com/admin";
const UNAVAILABLE = "données indisponibles";

const numberFr = new Intl.NumberFormat("fr-FR");
const dateFr = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Paris",
});

/**
 * Rapport texte des visiteurs 30 j par site, même tri et mêmes règles que
 * `SitesTable`. Pure : aucun accès réseau, testable avec des lignes factices.
 */
export function buildTrafficReport(
  rows: SiteVisitorsRow[],
  now: Date,
): { subject: string; text: string } {
  const sorted = [...rows].sort(
    (a, b) => b.currentVisitors - a.currentVisitors,
  );
  const totalCurrent = sorted.reduce((s, r) => s + r.currentVisitors, 0);
  const totalPrevious = sorted.reduce((s, r) => s + r.previousVisitors, 0);
  const totalEvolution = formatSignedPercent(
    getEvolution(totalCurrent, totalPrevious),
  );

  const nameWidth =
    Math.max("Total".length, ...sorted.map((r) => r.site.name.length)) + 2;

  const line = (name: string, visitors: number, evolution: string) =>
    `${name.padEnd(nameWidth)}${numberFr.format(visitors).padStart(6)}   ${evolution.padStart(8)}`;

  const siteLines = sorted.map((r) =>
    line(
      r.site.name,
      r.currentVisitors,
      r.error
        ? UNAVAILABLE
        : formatSignedPercent(getEvolution(r.currentVisitors, r.previousVisitors)),
    ),
  );

  const text = [
    `Visiteurs uniques des 30 derniers jours (au ${dateFr.format(now)}), comparés aux 30 jours précédents.`,
    "",
    ...siteLines,
    "─".repeat(nameWidth + 6 + 3 + 8),
    line("Total", totalCurrent, totalEvolution),
    "",
    `Détail : ${DASHBOARD_URL}`,
    "",
  ].join("\n");

  const subject = `Trafic des 30 derniers jours · ${numberFr.format(totalCurrent)} visiteurs (${totalEvolution})`;

  return { subject, text };
}
```

- [ ] **Step 2 : Vérifier le rendu avec des lignes factices**

Run:
```bash
cat > /tmp/report-check.ts <<'EOS'
import { buildTrafficReport } from "../Users/romainmailliu/Local/Deploiement/Portfolio/src/lib/analytics/traffic-report";
EOS
npx tsx -e '
import { buildTrafficReport } from "./src/lib/analytics/traffic-report";
const site = (id: string, name: string) => ({ id, name, posthogProjectId: "1", gscSiteUrl: `https://${id}.fr/`, posthogCredentialSuffix: id.toUpperCase() });
const r = buildTrafficReport([
  { site: site("a", "Gomett"), currentVisitors: 896, previousVisitors: 386, error: null },
  { site: site("b", "Klink, le son du vin"), currentVisitors: 30, previousVisitors: 39, error: null },
  { site: site("c", "Storynous"), currentVisitors: 0, previousVisitors: 0, error: "POSTHOG_PROJECT_ID_STORYNOUS manquant" },
  { site: site("d", "Portfolio"), currentVisitors: 1900, previousVisitors: 1900, error: null },
], new Date("2026-09-21T06:00:00Z"));
console.log(r.subject); console.log(r.text);
'
```
(si `tsx` n'est pas installé, `npx --yes tsx` le télécharge ; ne rien ajouter à `package.json`).

Expected (alignement exact) :
```
Trafic des 30 derniers jours · 2 826 visiteurs (+21.6%)
Visiteurs uniques des 30 derniers jours (au 21/09/2026), comparés aux 30 jours précédents.

Portfolio              1 900       +0%
Gomett                   896   +132.1%
Klink, le son du vin      30    -23.1%
Storynous                  0   données indisponibles
───────────────────────────────────────
Total                  2 826    +21.6%

Détail : https://www.romainmailliu.com/admin
```
Le tri, les largeurs et la ligne « données indisponibles » doivent correspondre. Supprimer `/tmp/report-check.ts` (inutile) s'il a été créé.

- [ ] **Step 3 : Vérifier tsc + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: exit 0.

- [ ] **Step 4 : Commit**

```bash
git add src/lib/analytics/traffic-report.ts
git commit -m "Générer le rapport texte des visiteurs par site

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4 : Route cron + planification + secret

**Files:**
- Create: `src/app/api/cron/weekly-traffic/route.ts`
- Modify: `vercel.json`
- Modify: `.env.example` (après le bloc Resend)
- Modify: `.env.local` (hors dépôt)

- [ ] **Step 1 : Créer la route**

```ts
import { NextResponse } from "next/server";
import { loadDashboardRows } from "../../../../lib/analytics/load-dashboard";
import { buildTrafficReport } from "../../../../lib/analytics/traffic-report";
import { timingSafePasswordEqual } from "../../../../lib/dashboard-password";
import { sendNotification } from "../../../../lib/email/resend";

export const dynamic = "force-dynamic";
/** 22 requêtes HogQL, parfois lentes quand PostHog throttle. */
export const maxDuration = 120;

/**
 * Appelée par le cron Vercel (`vercel.json`) chaque lundi matin avec
 * `Authorization: Bearer <CRON_SECRET>`. Test manuel : même en-tête via curl.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";

  if (!secret || !timingSafePasswordEqual(bearer, secret)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const rows = await loadDashboardRows();
  const { subject, text } = buildTrafficReport(rows, new Date());

  await sendNotification({
    subject,
    text,
    fromName: "Trafic romainmailliu.com",
  });

  return NextResponse.json({
    sent: true,
    sites: rows.length,
    unavailable: rows.filter((r) => r.error).length,
  });
}
```

- [ ] **Step 2 : Planifier le cron**

`vercel.json` devient :

```json
{
  "crons": [
    { "path": "/api/cron/weekly-traffic", "schedule": "0 6 * * 1" }
  ],
  "headers": [
    {
      "source": "/(.*)\\.md",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/plain; charset=utf-8"
        }
      ]
    }
  ]
}
```

- [ ] **Step 3 : Documenter et renseigner le secret**

Dans `.env.example`, après la ligne `LEADS_NOTIFICATION_EMAIL=`, ajouter :

```
# --- Email hebdo de trafic (cron Vercel, lundi 6 h UTC) ---
# Secret partagé : Vercel l'envoie en `Authorization: Bearer` à /api/cron/weekly-traffic.
# Générer avec `openssl rand -hex 32`, dupliquer sur Vercel (Production).
CRON_SECRET=
```

Dans `.env.local`, ajouter `CRON_SECRET=<sortie de openssl rand -hex 32>`.

- [ ] **Step 4 : Vérifier en local (envoie un vrai email)**

Run: `npx tsc --noEmit && npm run lint`, puis `npm run dev` en arrière-plan et :
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/cron/weekly-traffic` → `401`
- `curl -s -H "Authorization: Bearer $(grep '^CRON_SECRET=' .env.local | cut -d= -f2-)" http://localhost:3000/api/cron/weekly-traffic` → `{"sent":true,"sites":12,"unavailable":0}` (Storynous à 0 visiteurs mais sans erreur puisque l'ID est renseigné).
Un email « Trafic des 30 derniers jours · … » doit arriver sur romain.mailliu@gmail.com. Arrêter le serveur, `git checkout -- next-env.d.ts` si modifié.

- [ ] **Step 5 : Commit**

```bash
git add src/app/api/cron/weekly-traffic/route.ts vercel.json .env.example
git commit -m "Envoyer chaque lundi un email de synthèse du trafic

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5 : Variables Vercel, déploiement, test en production

**Files:** aucun.

- [ ] **Step 1 : Variables sur Vercel (Production)**

```bash
printf '%s' 269397 | vercel env add POSTHOG_PROJECT_ID_STORYNOUS production
printf '%s' "$(grep '^CRON_SECRET=' .env.local | cut -d= -f2-)" | vercel env add CRON_SECRET production
vercel env ls production | grep -E "CRON_SECRET|STORYNOUS"
```

- [ ] **Step 2 : Build et push**

Run: `npm run build` → « Compiled successfully » ; puis `git push origin main`.

- [ ] **Step 3 : Attendre le déploiement et tester**

`vercel ls --prod` jusqu'à `Ready`, puis :
- `curl -s -o /dev/null -w "%{http_code}\n" https://www.romainmailliu.com/api/cron/weekly-traffic` → `401`
- `curl -s -H "Authorization: Bearer <CRON_SECRET>" https://www.romainmailliu.com/api/cron/weekly-traffic` → `{"sent":true,"sites":12,…}` et email reçu.
- `vercel crons ls` (ou l'onglet Cron Jobs du projet) liste `/api/cron/weekly-traffic` à `0 6 * * 1`.
