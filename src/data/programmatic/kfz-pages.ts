import type { ProgrammaticPageData } from '@/types/content';

type FzTyp = { slug: string; label: string; typ: string };

const fahrzeugtypen: FzTyp[] = [
  { slug: 'kleinwagen', label: 'Kleinwagen', typ: 'kleinwagen' },
  { slug: 'kompaktklasse', label: 'Kompaktklasse', typ: 'kompakt' },
  { slug: 'mittelklasse', label: 'Mittelklasse', typ: 'mittelklasse' },
  { slug: 'suv', label: 'SUV', typ: 'suv' },
  { slug: 'elektroauto', label: 'Elektroauto', typ: 'elektro' },
  { slug: 'oberklasse', label: 'Oberklasse', typ: 'oberklasse' },
];

const sfKlassen = [
  { slug: 'fahranfaenger', label: 'Fahranfänger (SF0)', sf: 0 },
  { slug: 'sf10', label: 'SF10', sf: 10 },
  { slug: 'sf20', label: 'SF20', sf: 20 },
];

function generatePages(): ProgrammaticPageData[] {
  const pages: ProgrammaticPageData[] = [];

  for (const fz of fahrzeugtypen) {
    pages.push({
      slug: `${fz.slug}-versichern`,
      parentSlug: 'kfz-versicherung-rechner',
      title: `Kfz-Versicherung ${fz.label} — Kosten berechnen`,
      metaTitle: `Kfz-Versicherung ${fz.label} 2026 — Was kostet die Versicherung?`,
      metaDescription: `Was kostet die Kfz-Versicherung für einen ${fz.label}? Haftpflicht, Teilkasko und Vollkasko im Vergleich. Kostenlos berechnen.`,
      h1: `Kfz-Versicherung für ${fz.label} berechnen`,
      intro: `Die Versicherungskosten für einen ${fz.label} variieren stark je nach SF-Klasse, Fahrleistung und Region. Hier berechnen Sie Ihren individuellen Beitrag für Haftpflicht, Teilkasko und Vollkasko.`,
      prefillValues: { fahrzeugtyp: fz.typ },
      faqs: [
        {
          question: `Was kostet die Versicherung für einen ${fz.label}?`,
          answer: fz.typ === 'kleinwagen'
            ? 'Kleinwagen haben die günstigsten Versicherungsbeiträge: Haftpflicht ab ca. 200 € pro Jahr (SF10). Die niedrige Typklasse und geringe Motorleistung halten die Kosten niedrig.'
            : fz.typ === 'elektro'
              ? 'Elektroautos sind in der Haftpflicht oft 5-10% günstiger als vergleichbare Verbrenner. Die Kaskoversicherung kann wegen der teuren Batterie etwas höher ausfallen. Viele Versicherer bieten spezielle E-Auto-Tarife mit Akku-Schutz.'
              : fz.typ === 'oberklasse'
                ? 'Oberklasse-Fahrzeuge haben die höchsten Versicherungsbeiträge: Die Typklassen sind hoch, und die Reparaturkosten treiben die Kaskoprämien. Vollkasko kann über 1.000 € pro Jahr kosten.'
                : `Ein ${fz.label} liegt bei den Versicherungskosten im mittleren Bereich. Mit einer guten SF-Klasse (SF10+) und Garagenstellplatz können Sie deutlich sparen.`,
        },
      ],
      relatedSlugs: ['kreditrechner', 'bu-rechner'],
    });
  }

  // Fahranfänger-Seite (sehr gesucht)
  for (const sf of sfKlassen) {
    if (sf.sf !== 0) continue;
    pages.push({
      slug: 'fahranfaenger-versicherung',
      parentSlug: 'kfz-versicherung-rechner',
      title: 'Kfz-Versicherung für Fahranfänger — Kosten & Spartipps',
      metaTitle: 'Kfz-Versicherung Fahranfänger 2026 — Kosten senken',
      metaDescription: 'Kfz-Versicherung als Fahranfänger: Warum ist sie so teuer? Und wie sparen Sie bis zu 50%? Tipps und Kostenrechner.',
      h1: 'Kfz-Versicherung für Fahranfänger',
      intro: 'Als Fahranfänger (SF0) zahlen Sie bis zu 230% des Grundbeitrags — das kann schnell über 1.000 € pro Jahr werden. Mit den richtigen Tricks sparen Sie bis zu 50%.',
      prefillValues: { sfKlasse: 0, alter: 20 },
      faqs: [
        {
          question: 'Warum ist die Versicherung für Fahranfänger so teuer?',
          answer: 'Fahranfänger haben statistisch das höchste Unfallrisiko. In SF0 zahlen Sie den 2,3-fachen Grundbeitrag. Dazu kommt der Altersaufschlag für unter 25-Jährige (+50%). Tipp: Lassen Sie sich als Zweitfahrer bei den Eltern eintragen und übernehmen Sie deren SF-Klasse.',
        },
        {
          question: 'Wie spare ich als Fahranfänger?',
          answer: 'Die besten Spartipps: SF-Klasse von Eltern/Großeltern übernehmen, Telematik-Tarif nutzen (bis  30% Rabatt), Auto als Zweitwagen der Eltern versichern, niedrige Fahrleistung angeben, höhere Selbstbeteiligung wählen, und jährlich den Anbieter wechseln.',
        },
      ],
      relatedSlugs: ['kreditrechner', 'brutto-netto-rechner'],
    });
  }

  return pages;
}

export const KFZ_PAGES = generatePages();
