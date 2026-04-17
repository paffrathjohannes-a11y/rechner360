#!/usr/bin/env node
/**
 * Täglicher Ratgeber-Artikel-Generator für rechner360.de
 *
 * Ablauf:
 *   1. Lädt alle existierenden Slugs (kuratiert + generiert) → Deduplizierung
 *   2. Wählt Thema aus dem Pool, gewichtet nach Saison / Urgency
 *   3. Ruft Claude API mit strukturiertem Prompt
 *   4. Validiert die JSON-Antwort gegen das `RatgeberArtikel`-Schema
 *   5. Schreibt Artikel in `src/data/content/ratgeber-generated.json`
 *
 * Der Commit + Push passiert im übergeordneten GitHub-Actions-Workflow.
 *
 * Lokaler Test:  ANTHROPIC_API_KEY=… npx tsx scripts/generate-ratgeber/index.ts
 * Dry-Run:       DRY_RUN=1 npx tsx scripts/generate-ratgeber/index.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { RATGEBER_TOPICS, pickTopic } from './topics';
import { buildSystemPrompt, buildUserPrompt } from './prompt';
import { sanitizeArticleHtml } from '../../src/lib/content/sanitize';

// ─── Paths ────────────────────────────────────────────────────────────────

const REPO_ROOT = resolve(__dirname, '..', '..');
const GENERATED_PATH = resolve(REPO_ROOT, 'src/data/content/ratgeber-generated.json');
const CURATED_PATH = resolve(REPO_ROOT, 'src/data/content/ratgeber.ts');

// ─── Types ────────────────────────────────────────────────────────────────

interface RatgeberArtikel {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { title: string; content: string }[];
  relatedRechner: string;
  publishDate: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function extractCuratedSlugs(tsSource: string): Set<string> {
  // Robuste Regex-Extraktion: alle `slug: '...'` im TS-File.
  const slugs = new Set<string>();
  const re = /slug:\s*['"]([a-z0-9-]+)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(tsSource)) !== null) {
    slugs.add(match[1]);
  }
  return slugs;
}

function loadGenerated(): RatgeberArtikel[] {
  try {
    const raw = readFileSync(GENERATED_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('ratgeber-generated.json ist kein Array');
    return parsed;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

function validateArticle(raw: unknown): RatgeberArtikel {
  if (!raw || typeof raw !== 'object') throw new Error('Response ist kein Objekt');
  const a = raw as Record<string, unknown>;

  const strField = (key: string, minLen = 1, maxLen?: number): string => {
    const v = a[key];
    if (typeof v !== 'string') throw new Error(`Feld "${key}" fehlt oder ist kein String`);
    if (v.length < minLen) throw new Error(`Feld "${key}" ist zu kurz (${v.length} < ${minLen})`);
    if (maxLen && v.length > maxLen) throw new Error(`Feld "${key}" ist zu lang (${v.length} > ${maxLen})`);
    return v;
  };

  const slug = strField('slug', 3, 80);
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Slug "${slug}" enthält ungültige Zeichen`);

  const title = strField('title', 10, 75);
  const metaTitle = strField('metaTitle', 10, 70);
  const metaDescription = strField('metaDescription', 100, 170);
  const intro = strField('intro', 150, 600);
  const relatedRechner = strField('relatedRechner', 3, 60);
  const publishDate = strField('publishDate', 10, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishDate)) {
    throw new Error(`publishDate "${publishDate}" ist kein ISO-Datum`);
  }

  const sectionsRaw = a.sections;
  if (!Array.isArray(sectionsRaw)) throw new Error('Feld "sections" ist kein Array');
  if (sectionsRaw.length < 3 || sectionsRaw.length > 8) {
    throw new Error(`sections.length = ${sectionsRaw.length}, erwartet 3-8`);
  }
  const sections = sectionsRaw.map((s, i) => {
    if (!s || typeof s !== 'object') throw new Error(`sections[${i}] ist kein Objekt`);
    const obj = s as Record<string, unknown>;
    if (typeof obj.title !== 'string' || obj.title.length < 4) {
      throw new Error(`sections[${i}].title fehlt oder zu kurz`);
    }
    if (typeof obj.content !== 'string' || obj.content.length < 200) {
      throw new Error(`sections[${i}].content zu kurz (${(obj.content as string)?.length ?? 0})`);
    }
    return { title: obj.title, content: obj.content };
  });

  return { slug, title, metaTitle, metaDescription, intro, sections, relatedRechner, publishDate };
}

function extractJson(text: string): unknown {
  // Claude liefert im System-Prompt gefordertes pures JSON, aber defensiv
  // falls versehentlich Markdown-Fences kommen, schneiden wir das weg.
  let t = text.trim();
  if (t.startsWith('```')) {
    t = t.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }
  return JSON.parse(t);
}

function isoToday(): string {
  return new Date().toISOString().slice(0, 10);
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('FEHLER: ANTHROPIC_API_KEY nicht gesetzt');
    process.exit(1);
  }

  const curatedSource = readFileSync(CURATED_PATH, 'utf-8');
  const curatedSlugs = extractCuratedSlugs(curatedSource);
  const generated = loadGenerated();
  const generatedSlugs = new Set(generated.map((a) => a.slug));
  const allSlugs = new Set<string>([...curatedSlugs, ...generatedSlugs]);

  // Die letzten 20 generierten Topics ausschließen, damit der Pool rotiert.
  // Wir tracken Topic-IDs in keinem Feld, nähern das aber über Slug-Präfix-Vergleich an:
  // wenn der Slug eines Topics (slugified) mit einem existierenden Slug beginnt, gilt
  // er als "kürzlich verwendet" und wird übersprungen.
  const recentlyUsedIds = new Set<string>();
  for (const topic of RATGEBER_TOPICS) {
    const hint = topic.titleSeed
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .slice(0, 3)
      .join('-');
    if (hint && [...allSlugs].some((s) => s.includes(hint))) {
      recentlyUsedIds.add(topic.id);
    }
  }

  const currentMonth = new Date().getMonth() + 1;
  const topic = pickTopic(allSlugs, recentlyUsedIds, currentMonth);
  if (!topic) {
    console.error('Kein freies Thema im Pool gefunden — pool ist ausgeschöpft. Neue Topics ergänzen.');
    process.exit(1);
  }

  console.log(`→ Thema: ${topic.id} / "${topic.titleSeed}"`);
  console.log(`→ relatedRechner: ${topic.relatedRechner}`);

  if (process.env.DRY_RUN) {
    console.log('DRY_RUN gesetzt — kein API-Call, keine Datei-Änderung.');
    return;
  }

  const client = new Anthropic({ apiKey });
  const today = isoToday();

  // Bis zu 2 Retries bei JSON-Parse- oder Validierungsfehlern
  let lastError: unknown = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`→ Claude API Call (Versuch ${attempt}/3)…`);
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: buildSystemPrompt(),
        messages: [{ role: 'user', content: buildUserPrompt(topic, today) }],
      });

      const firstBlock = response.content[0];
      if (!firstBlock || firstBlock.type !== 'text') {
        throw new Error(`Unerwarteter Response-Block: ${firstBlock?.type}`);
      }

      const jsonRaw = extractJson(firstBlock.text);
      const article = validateArticle(jsonRaw);

      // Slug-Kollision? Dann mit Counter-Suffix.
      let finalSlug = article.slug;
      if (allSlugs.has(finalSlug)) {
        let counter = 2;
        while (allSlugs.has(`${finalSlug}-${counter}`)) counter++;
        finalSlug = `${finalSlug}-${counter}`;
        article.slug = finalSlug;
        console.log(`→ Slug-Kollision — umbenannt zu "${finalSlug}"`);
      }

      // `publishDate` und `relatedRechner` auf die vom Script vorgegebenen Werte fixieren.
      // Claude wird gebeten, sie zu übernehmen, wir erzwingen es nochmal.
      article.publishDate = today;
      article.relatedRechner = topic.relatedRechner;

      // Defense in Depth: HTML im Content sanitizen, bevor es ins Repo
      // committet wird. Damit landet niemals ungesäubertes HTML im Git —
      // auch dann nicht, wenn das Frontend-Sanitize später umgangen würde.
      article.sections = article.sections.map((s) => ({
        title: s.title,
        content: sanitizeArticleHtml(s.content),
      }));

      generated.push(article);
      writeFileSync(GENERATED_PATH, JSON.stringify(generated, null, 2) + '\n', 'utf-8');

      console.log(`✓ Artikel generiert: "${article.title}"`);
      console.log(`✓ Slug: ${article.slug}`);
      console.log(`✓ Sektionen: ${article.sections.length}`);
      console.log(`✓ Gesamt-Zeichen: ${article.sections.reduce((n, s) => n + s.content.length, 0)}`);
      return;
    } catch (err) {
      lastError = err;
      console.warn(`⚠ Versuch ${attempt} fehlgeschlagen: ${(err as Error).message}`);
      if (attempt < 3) await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }

  console.error(`✗ Alle 3 Versuche fehlgeschlagen. Letzter Fehler:`, lastError);
  process.exit(1);
}

main().catch((err) => {
  console.error('Unerwarteter Fehler:', err);
  process.exit(1);
});
