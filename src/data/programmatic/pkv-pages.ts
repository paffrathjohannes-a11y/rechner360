import type { ProgrammaticPageData } from '@/types/content';

type Beruf = { slug: string; label: string; berufsgruppe: string };
type Alter = { slug: string; label: string; alter: number; brutto: number };

const berufe: Beruf[] = [
  { slug: 'angestellter', label: 'Angestellter', berufsgruppe: 'angestellt' },
  { slug: 'selbststaendiger', label: 'Selbstständiger', berufsgruppe: 'selbststaendig' },
  { slug: 'beamter', label: 'Beamter', berufsgruppe: 'beamter' },
];

const altersgruppen: Alter[] = [
  { slug: '25-jahre', label: '25 Jahre', alter: 25, brutto: 75000 },
  { slug: '30-jahre', label: '30 Jahre', alter: 30, brutto: 80000 },
  { slug: '35-jahre', label: '35 Jahre', alter: 35, brutto: 85000 },
  { slug: '40-jahre', label: '40 Jahre', alter: 40, brutto: 90000 },
  { slug: '50-jahre', label: '50 Jahre', alter: 50, brutto: 95000 },
];

function generatePages(): ProgrammaticPageData[] {
  const pages: ProgrammaticPageData[] = [];

  for (const beruf of berufe) {
    for (const age of altersgruppen) {
      const slug = `${beruf.slug}-${age.slug}`;
      pages.push({
        slug,
        parentSlug: 'pkv-rechner',
        title: `PKV Rechner für ${beruf.label} mit ${age.label}`,
        metaTitle: `PKV Rechner ${beruf.label} ${age.label} — Lohnt sich die PKV?`,
        metaDescription: `PKV oder GKV als ${beruf.label} mit ${age.label}? Berechnen Sie Ihren Beitrag und die Ersparnis. Kostenloser Vergleich 2026.`,
        h1: `PKV Rechner: ${beruf.label}, ${age.label}`,
        intro: `Lohnt sich die private Krankenversicherung als ${beruf.label} mit ${age.label}? Unser Rechner vergleicht Ihren GKV-Beitrag mit dem geschätzten PKV-Beitrag und gibt eine Empfehlung.`,
        prefillValues: {
          alter: age.alter,
          bruttoeinkommen: age.brutto,
          berufsgruppe: beruf.berufsgruppe,
        },
        faqs: [
          {
            question: `Lohnt sich die PKV als ${beruf.label} mit ${age.label}?`,
            answer: beruf.berufsgruppe === 'beamter'
              ? `Als Beamter profitieren Sie von der Beihilfe. Mit ${age.label} sind die PKV-Beiträge noch vergleichsweise günstig. Die PKV lohnt sich für Beamte fast immer.`
              : beruf.berufsgruppe === 'selbststaendig'
                ? `Als Selbstständiger tragen Sie den vollen Beitrag allein. Mit ${age.label} sind die PKV-Beiträge ${age.alter <= 35 ? 'noch günstig — ein Wechsel kann sich lohnen' : 'bereits höher — vergleichen Sie sorgfältig, ob die besseren Leistungen den Mehrpreis rechtfertigen'}.`
                : `Als Angestellter bekommen Sie einen Arbeitgeberzuschuss zur PKV. Mit ${age.label} sind die Beiträge ${age.alter <= 35 ? 'attraktiv' : 'moderat'} — nutzen Sie unseren Rechner für einen genauen Vergleich.`,
          },
          {
            question: 'Wie hoch ist der AG-Zuschuss zur PKV?',
            answer: beruf.berufsgruppe === 'angestellt'
              ? 'Der Arbeitgeber zahlt maximal die Hälfte des PKV-Beitrags, begrenzt auf den halben GKV-Höchstbeitrag (ca. 420 € monatlich 2026).'
              : beruf.berufsgruppe === 'beamter'
                ? 'Beamte erhalten statt eines AG-Zuschusses Beihilfe vom Dienstherrn (50–80 % der Krankheitskosten). Sie versichern nur den Restanteil privat.'
                : 'Als Selbstständiger gibt es keinen Arbeitgeberzuschuss — Sie tragen den vollen PKV-Beitrag selbst.',
          },
        ],
        relatedSlugs: ['brutto-netto-rechner', 'rentenrechner', 'kreditrechner'],
      });
    }
  }

  return pages;
}

export const PKV_PAGES = generatePages();
