# Email hebdomadaire de trafic + Storynous dans le dashboard

Date : 2026-09-17

## Objectif

1. Recevoir chaque lundi matin un email texte qui résume les visiteurs des sites
   suivis dans `/admin` (mêmes chiffres, même fenêtre de 30 jours).
2. Ajouter Storynous à la liste des sites suivis.

## 1. Email du lundi

### Déclencheur

Cron Vercel déclaré dans `vercel.json` :

```json
"crons": [{ "path": "/api/cron/weekly-traffic", "schedule": "0 6 * * 1" }]
```

6 h UTC = 8 h à Paris en heure d'été, 7 h en heure d'hiver. Vercel appelle la
route en `GET` avec l'en-tête `Authorization: Bearer <CRON_SECRET>` dès que la
variable `CRON_SECRET` existe sur le projet.

### Route `src/app/api/cron/weekly-traffic/route.ts`

- `GET` uniquement, `dynamic = "force-dynamic"`, `maxDuration = 300`
  (24 requêtes PostHog ; plusieurs minutes quand PostHog throttle la clé).
- Sans `CRON_SECRET` côté serveur, ou si le bearer ne correspond pas
  (comparaison via `timingSafePasswordEqual`) → `401 { error: "Non autorisé" }`.
- Sinon : `loadDashboardRows()` → `buildTrafficReport(rows, new Date())`
  → `sendNotification({ subject, text, fromName: "Trafic romainmailliu.com" })`
  → `200 { sent: true, sites: <n>, unavailable: <n sites en erreur> }`.
- Un site en erreur n'empêche pas l'envoi : il figure dans l'email avec la
  mention « données indisponibles ». Si Resend échoue, l'exception remonte
  → 500, visible dans les logs Vercel.

### Générateur de texte `src/lib/analytics/traffic-report.ts`

Fonction pure `buildTrafficReport(rows: SiteVisitorsRow[], now: Date): { subject: string; text: string }`.

- Tri par visiteurs décroissants (même règle que `SitesTable`).
- Total = somme des visiteurs courants ; évolution du total = `getEvolution(totalCurrent, totalPrevious)`.
- Nombres au format `fr-FR` (`Intl.NumberFormat`), évolutions via `formatSignedPercent`.
- Objet : `Trafic des 30 derniers jours · 2 712 visiteurs (+45.8%)`.
- Corps, une ligne par site (aucun alignement par espaces : Gmail affiche le
  texte brut en police proportionnelle) :

```
Visiteurs uniques des 30 derniers jours (au 21/09/2026), comparés aux 30 jours précédents.

Gomett : 896 (+132.1%)
Coexister : 891 (+31.6%)
…
Storynous : données indisponibles

Total : 2 712 (+45.8%)

Détail : https://www.romainmailliu.com/admin
```

### Envoi

`sendNotification()` dans `src/lib/email/resend.ts` gagne un paramètre optionnel
`fromName` (défaut : `"Formulaire romainmailliu.com"`, inchangé pour les deux
formulaires). L'adresse reste `contact@romainmailliu.com`, le destinataire
`notificationRecipient`.

### Configuration

- `CRON_SECRET` : généré par `openssl rand -hex 32`, ajouté à `.env.local` et à
  Vercel (Production). Documenté dans `.env.example`.
- Test manuel : `curl -H "Authorization: Bearer $CRON_SECRET" https://www.romainmailliu.com/api/cron/weekly-traffic`.

## 2. Storynous dans le dashboard

Entrée ajoutée à la fin de `SITE_DEFINITIONS` (`src/config/analytics-sites.ts`),
juste avant `portfolio` :

```ts
{
  id: "storynous",
  name: "Storynous",
  suffix: "STORYNOUS",
  siteUrl: "https://www.storynous.fr/",
},
```

`POSTHOG_PROJECT_ID_STORYNOUS` (+ `GSC_SITE_URL_STORYNOUS`) documentés dans
`.env.example` ; la valeur (`269397`) va dans `.env.local` et Vercel, jamais
dans le dépôt. Le projet PostHog n'a encore reçu aucun événement : la ligne
affichera 0 tant que PostHog n'est pas installé sur storynous.fr.

## Tests

- `npx tsc --noEmit`, `npm run lint`, `npm run build` sans erreur.
- `curl` local sans bearer → 401 ; avec le bon bearer → 200 et un email reçu
  contenant 12 lignes de sites et un total.
- `/admin` local affiche 12 lignes, Storynous à 0 en bas.
- Après déploiement : appel manuel de la route en production → email reçu.

## Hors périmètre

Installer PostHog sur storynous.fr (autre dépôt) ; format HTML ; fenêtre 7 jours ;
l'organisation PostHog « guedi voyage ».
