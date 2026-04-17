# Ratgeber-Artikel-Generator

Erstellt automatisiert Blog-Artikel (Ratgeber) für rechner360.de per Claude API.

## Was passiert

- Läuft als GitHub-Actions-Cron **Mo/Mi/Fr um 07:15 MEZ** (siehe `.github/workflows/generate-ratgeber.yml`).
- Wählt ein Thema aus dem Pool `scripts/generate-ratgeber/topics.ts` — saisonale Themen im aktuellen Monat werden bevorzugt.
- Ruft **OpenAI gpt-4o** mit strukturiertem System-Prompt auf.
- Validiert die JSON-Response gegen das `RatgeberArtikel`-Schema.
- Hängt den neuen Artikel an `src/data/content/ratgeber-generated.json` an.
- Committet + pusht — Vercel deployt automatisch. Artikel sind sofort unter `/ratgeber/<slug>` live und stehen in der Sitemap.

## Setup (einmalig)

### 1. Workflow-Datei installieren

Die Workflow-Definition liegt als Template unter
`scripts/generate-ratgeber/workflow-template.yml`. Sie wurde **nicht** direkt
nach `.github/workflows/` committet, weil das Push-Token des Entwicklers
dafür den `workflow`-Scope bräuchte (PAT-Restriktion).

**Installation per GitHub Web-UI (30 Sekunden)**:

1. Im Repo **Add file → Create new file** drücken
2. Dateinamen `.github/workflows/generate-ratgeber.yml` eingeben
3. Inhalt aus `scripts/generate-ratgeber/workflow-template.yml` kopieren
4. Commit direkt auf `main`

Alternativ per CLI, wenn du ein PAT mit `workflow`-Scope hast:
```bash
mkdir -p .github/workflows
cp scripts/generate-ratgeber/workflow-template.yml .github/workflows/generate-ratgeber.yml
git add .github/workflows/generate-ratgeber.yml
git commit -m "ci: ratgeber-generator workflow"
git push
```

### 2. GitHub Secret setzen

Im rechner360-Repo unter **Settings → Secrets and variables → Actions → New repository secret**:

| Name | Wert |
|---|---|
| `OPENAI_API_KEY` | Dein OpenAI-API-Key (beginnt mit `sk-ant-…`) |

### 3. Branch-Protection anpassen (falls aktiv)

Falls `main` geschützt ist und direkte Commits blockiert sind: Die GitHub-App
`github-actions[bot]` zur Bypass-Liste hinzufügen, oder in der Branch-Protection
"Allow specified actors to bypass required pull requests" aktivieren.

### 4. Workflow testen

Einmal manuell triggern: **Actions → Ratgeber-Artikel generieren → Run workflow → Run workflow**.
Nach ~30–60 Sekunden sollte ein neuer Commit auf main liegen.

## Lokales Testen

```bash
# Dry-Run — zeigt nur welches Thema gewählt würde, kein API-Call
DRY_RUN=1 npx tsx scripts/generate-ratgeber/index.ts

# Echter Lauf — schreibt in ratgeber-generated.json und brauch den Key
OPENAI_API_KEY=sk-ant-… npx tsx scripts/generate-ratgeber/index.ts
```

## Themen-Pool erweitern

In `scripts/generate-ratgeber/topics.ts` neue Einträge im `RATGEBER_TOPICS`-Array anhängen:

```ts
{
  id: 'steuertipps-vermieter',                  // stabile, eindeutige ID
  titleSeed: 'Steuertipps für Vermieter 2026',  // Arbeitstitel (Claude formuliert natürlicher)
  angle: 'AfA, Werbungskosten, Mieteinnahmen versteuern, §21 EStG, Modernisierung absetzen',
  relatedRechner: 'einkommensteuer-rechner',     // muss exakt zu einem existierenden Rechner-Slug passen
  season: { months: [3, 4, 5] },                 // optional — wann besonders relevant
  urgency: 'seasonal',                           // evergreen | seasonal | current
},
```

Bei ca. 50 Themen im Pool und 3 Artikeln/Woche läuft der Generator ~4 Monate ohne Kollisionen.
Der Script erkennt auch heuristisch, wenn ein ähnlicher Artikel bereits existiert, und überspringt dann das Thema.

## Fehlerbehandlung

- **API-Timeout / Invalid JSON**: Automatische Retries (3 Versuche mit Backoff).
- **Alle Themen abgearbeitet**: Workflow schlägt fehl mit klarer Fehlermeldung — neue Topics ergänzen.
- **Slug-Kollision**: Wird mit `-2`, `-3`, … Suffix umbenannt.
- **Ungültige Response**: Wird nicht committet; Actions-Run markiert sich als failed.

## Rollback

Falls ein Artikel nicht passt:

```bash
# Den betroffenen Artikel-Eintrag aus src/data/content/ratgeber-generated.json entfernen,
# Commit + Push. Vercel redeployed automatisch ohne den Artikel.
```

## Kosten

Pro Artikel ~3.000 Output-Tokens bei gpt-4o ≈ **~0,03 € pro Artikel**.
Bei 3 Artikeln/Woche: ca. **0,40 € pro Monat**.

## Erweiterungsideen

- **A/B-Test Title**: Zwei Titel-Varianten generieren, nach CTR auf `/ratgeber` bewerten
- **Cover-Image**: Via ImageResponse ein themenbezogenes OG-Image pro Artikel generieren
- **Auto-Übersetzung**: Englische Version für `/en/guide/…` (wenn de/en-Split kommt)
- **Internal-Linking-Agent**: Script das bestehende Artikel analysiert und Links zwischen ihnen vorschlägt
