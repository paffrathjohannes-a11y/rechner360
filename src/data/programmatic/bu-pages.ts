import type { ProgrammaticPageData } from '@/types/content';

const berufe = [
  { slug: 'bueroangestellter', label: 'Büroangestellter', gruppe: 'buero', risiko: 'niedrig' },
  { slug: 'it-fachkraft', label: 'IT-Fachkraft', gruppe: 'it', risiko: 'niedrig' },
  { slug: 'handwerker', label: 'Handwerker', gruppe: 'handwerk', risiko: 'erhöht' },
  { slug: 'krankenpfleger', label: 'Krankenpfleger', gruppe: 'medizin', risiko: 'mittel' },
  { slug: 'selbststaendiger', label: 'Selbstständiger', gruppe: 'selbststaendig', risiko: 'mittel' },
  { slug: 'bauarbeiter', label: 'Bauarbeiter', gruppe: 'koerperlich', risiko: 'hoch' },
];

const altersgruppen = [
  { slug: '25-jahre', label: '25 Jahre', alter: 25 },
  { slug: '30-jahre', label: '30 Jahre', alter: 30 },
  { slug: '40-jahre', label: '40 Jahre', alter: 40 },
];

function generatePages(): ProgrammaticPageData[] {
  const pages: ProgrammaticPageData[] = [];

  for (const beruf of berufe) {
    for (const age of altersgruppen) {
      pages.push({
        slug: `${beruf.slug}-${age.slug}`,
        parentSlug: 'bu-rechner',
        title: `BU-Versicherung für ${beruf.label} mit ${age.label}`,
        metaTitle: `BU-Versicherung ${beruf.label} ${age.label} — Beitrag berechnen 2026`,
        metaDescription: `Was kostet die Berufsunfähigkeitsversicherung als ${beruf.label} mit ${age.label}? Beitrag berechnen und vergleichen.`,
        h1: `BU-Versicherung: ${beruf.label}, ${age.label}`,
        intro: `Als ${beruf.label} mit ${age.label} liegt Ihr BU-Risiko im Bereich "${beruf.risiko}". ${beruf.risiko === 'niedrig' ? 'Das bedeutet vergleichsweise günstige Beiträge.' : beruf.risiko === 'hoch' ? 'Die Beiträge sind höher, aber gerade deshalb ist eine BU besonders wichtig — das Risiko berufsunfähig zu werden ist in körperlichen Berufen am höchsten.' : 'Die Beiträge liegen im mittleren Bereich.'} Berechnen Sie hier Ihren individuellen Beitrag.`,
        prefillValues: { alter: age.alter, berufsgruppe: beruf.gruppe },
        faqs: [
          {
            question: `Was kostet die BU als ${beruf.label} mit ${age.label}?`,
            answer: beruf.risiko === 'niedrig'
              ? `Als ${beruf.label} profitieren Sie von günstigen Beiträgen. Mit ${age.label} und 1.500 € BU-Rente rechnen Sie mit ca. ${age.alter <= 25 ? '35–55' : age.alter <= 30 ? '40–65' : '60–90'} € monatlich.`
              : beruf.risiko === 'hoch'
                ? `Körperliche Berufe wie ${beruf.label} haben die höchsten BU-Beiträge. Mit ${age.label} und 1.500 € BU-Rente rechnen Sie mit ca. ${age.alter <= 25 ? '80–120' : age.alter <= 30 ? '90–140' : '130–200'} € monatlich. Alternativen: Erwerbsminderungsversicherung oder Grundfähigkeitsversicherung.`
                : `Als ${beruf.label} liegen die Beiträge im mittleren Bereich. Mit ${age.label} und 1.500 € BU-Rente rechnen Sie mit ca. ${age.alter <= 25 ? '50–75' : age.alter <= 30 ? '55–85' : '80–120'} € monatlich.`,
          },
        ],
        relatedSlugs: ['rentenrechner', 'brutto-netto-rechner', 'pkv-rechner'],
      });
    }
  }

  return pages;
}

export const BU_PAGES = generatePages();
