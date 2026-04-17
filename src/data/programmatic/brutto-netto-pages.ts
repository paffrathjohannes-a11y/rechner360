/**
 * Programmatic SEO Pages für den Brutto-Netto-Rechner
 *
 * Jede Seite erhält einen unique, kontextabhängigen Intro und 2–3 FAQs,
 * die sich aus der Kombination aus Brutto-Betrag und Steuerklasse ergeben.
 * Dadurch sind die Seiten für Google NICHT mehr thin-content und werden
 * indexierbar (`indexable: true` → `robots.index = true` in der Page-Route).
 */

const GEHAELTER = [
  1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  5500, 6000, 6500, 7000, 7500, 8000, 9000, 10000, 12000, 15000,
];

const STEUERKLASSEN = [1, 2, 3, 4, 5] as const;

export interface BruttoNettoPageDef {
  slug: string;
  brutto: number;
  steuerklasse: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faqs: { question: string; answer: string }[];
  /** Wenn true: Seite ist indexierbar und in Sitemap aufgenommen */
  indexable: boolean;
}

// ─── Text-Bausteine ────────────────────────────────────────────────────────

function getIncomeBracket(brutto: number): 'low' | 'mid' | 'upper' | 'high' | 'top' {
  if (brutto < 2000) return 'low';
  if (brutto < 3500) return 'mid';
  if (brutto < 6000) return 'upper';
  if (brutto < 10000) return 'high';
  return 'top';
}

function getSteuerklasseContext(sk: number): string {
  switch (sk) {
    case 1:
      return 'Steuerklasse I gilt für Ledige, dauerhaft Getrenntlebende und Geschiedene ohne Kindergeldanspruch.';
    case 2:
      return 'Steuerklasse II gilt für Alleinerziehende mit mindestens einem im Haushalt lebenden Kind — mit Entlastungsbetrag.';
    case 3:
      return 'Steuerklasse III ist für Verheiratete gedacht, bei denen ein Partner deutlich mehr verdient (Partner dann in SK V).';
    case 4:
      return 'Steuerklasse IV gilt für verheiratete Paare mit ähnlich hohen Einkommen — alternativ mit Faktor für genauere Verteilung.';
    case 5:
      return 'Steuerklasse V ist die Gegenklasse zu III. Das höhere Nettogehalt landet beim Partner in SK III.';
    default:
      return '';
  }
}

function getIncomeNarrative(brutto: number, bruttoStr: string, sk: number): string {
  const bracket = getIncomeBracket(brutto);
  const grundfreibetrag = 12348;
  const monatsGrundfreibetrag = Math.round(grundfreibetrag / 12);

  if (bracket === 'low') {
    return `Ein Bruttogehalt von ${bruttoStr} € liegt im unteren Einkommensbereich. Die Sozialabgaben (rund 20 %) schlagen hier prozentual stärker zu Buche als die Einkommensteuer, weil der Jahreslohn nur knapp über dem Grundfreibetrag von ${grundfreibetrag.toLocaleString('de-DE')} € (${monatsGrundfreibetrag} €/Monat) liegt.`;
  }
  if (bracket === 'mid') {
    return `Mit ${bruttoStr} € brutto bewegen Sie sich im Median-Bereich deutscher Gehälter. In der Progressionszone zwischen 17.800 € und 69.878 € Jahreseinkommen steigt der Steuersatz spürbar mit jeder Gehaltserhöhung — eine gute Gelegenheit, die Steuerklassen-Kombination zu prüfen.`;
  }
  if (bracket === 'upper') {
    return `${bruttoStr} € brutto pro Monat ergeben rund ${(brutto * 12).toLocaleString('de-DE')} € Jahresbrutto und liegen damit klar oberhalb des Durchschnittsverdiensts. In dieser Zone ist die Steuerprogression bereits markant, auch die Krankenkassen-Beitragsbemessungsgrenze (5.812,50 €/Monat) wird schrittweise relevant.`;
  }
  if (bracket === 'high') {
    return `Bei ${bruttoStr} € brutto liegen Sie im hohen Einkommensbereich. Oberhalb von 5.812,50 €/Monat greifen die Beitragsbemessungsgrenzen der Krankenversicherung, oberhalb von 8.450 €/Monat die der Rentenversicherung — auf Einkommen darüber zahlen Sie keine weiteren Sozialbeiträge.`;
  }
  return `${bruttoStr} € brutto monatlich entsprechen rund ${(brutto * 12).toLocaleString('de-DE')} € Jahresbrutto. Ab einem zu versteuernden Einkommen von 277.826 € greift die Reichensteuer mit 45 %. Für Spitzenverdiener lohnt oft eine individuelle Steuerstrategie inklusive betrieblicher Altersvorsorge und Sonderausgaben.`;
}

function getIntro(brutto: number, bruttoStr: string, sk: number): string {
  const income = getIncomeNarrative(brutto, bruttoStr, sk);
  const skContext = getSteuerklasseContext(sk);
  return `${income} ${skContext} Der folgende Rechner berechnet Ihr Netto 2026 für genau diese Konstellation und zeigt alle Abzüge (Lohnsteuer, Soli, Sozialabgaben) transparent auf.`;
}

function getFaqs(brutto: number, bruttoStr: string, sk: number): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const jahresbrutto = brutto * 12;
  const jahresbruttoStr = jahresbrutto.toLocaleString('de-DE');

  // FAQ 1: immer — grober Netto-Richtwert
  const approxNettoRate = sk === 3 ? 0.76 : sk === 5 ? 0.58 : sk === 2 ? 0.72 : 0.65;
  const nettoApprox = Math.round(brutto * approxNettoRate);
  faqs.push({
    question: `Wie viel Netto bleiben von ${bruttoStr} € brutto in Steuerklasse ${sk}?`,
    answer: `Ohne Kirchensteuer, Kinderfreibeträge und ohne Firmenwagen bleiben in Steuerklasse ${sk} ca. ${nettoApprox.toLocaleString('de-DE')} € netto pro Monat (Schätzung, rund ${Math.round(approxNettoRate * 100)} % des Bruttos). Der exakte Wert hängt von Krankenkasse, Zusatzbeitrag und Bundesland ab — der Rechner oben zeigt den genauen Betrag für Ihre Situation.`,
  });

  // FAQ 2: Steuerklassenwahl/-wechsel
  if (sk === 3 || sk === 5) {
    faqs.push({
      question: `Lohnt sich die Kombination III/V bei ${bruttoStr} € brutto?`,
      answer: `Die Kombination III/V lohnt sich, wenn ein Partner mindestens 60 % des gemeinsamen Einkommens verdient. Bei ${bruttoStr} € in Steuerklasse ${sk} ist das monatlich im Vergleich zu IV/IV ein spürbarer Unterschied — aber nur cashflowmäßig. Die Jahres-Steuerlast wird erst mit der Einkommensteuererklärung final ausgeglichen. Mit Faktorverfahren (IV/IV mit Faktor) bekommen Sie eine gerechtere Monatsverteilung.`,
    });
  } else if (sk === 2) {
    faqs.push({
      question: `Wie viel Entlastungsbetrag gibt es in Steuerklasse II 2026?`,
      answer: `Der Entlastungsbetrag für Alleinerziehende beträgt 2026 pauschal 4.260 € pro Jahr plus 240 € für jedes weitere Kind. Er wird direkt in die Lohnsteuerberechnung von Steuerklasse II eingearbeitet — bei ${bruttoStr} € brutto spart das monatlich eine dreistellige Summe gegenüber Steuerklasse I.`,
    });
  } else {
    faqs.push({
      question: `Ist Steuerklasse IV mit Faktor bei ${bruttoStr} € brutto besser als III/V?`,
      answer: `Wenn beide Partner ähnlich viel verdienen (etwa 50/50), ist IV/IV (ohne Faktor) bereits optimal. Bei unterschiedlichen Einkommen verteilt das Faktorverfahren (IV/IV mit Faktor) die Lohnsteuer monatlich präzise — ohne Nachzahlungsrisiko wie bei III/V. Bei ${bruttoStr} € und einem ähnlich verdienenden Partner hätten Sie in IV/IV ein vergleichbares Nettobild wie jetzt.`,
    });
  }

  // FAQ 3: BBG-Relevanz bei hohen Einkommen
  if (brutto >= 5500) {
    faqs.push({
      question: `Greifen bei ${bruttoStr} € brutto schon die Beitragsbemessungsgrenzen?`,
      answer: `Die Beitragsbemessungsgrenze für Kranken- und Pflegeversicherung liegt 2026 bei 5.812,50 €/Monat (69.750 €/Jahr), für Renten- und Arbeitslosenversicherung bei 8.450 €/Monat (101.400 €/Jahr). ${brutto >= 8450 ? 'Bei Ihrem Bruttogehalt sind BEIDE Grenzen überschritten — alles darüber ist sozialabgabenfrei.' : brutto >= 5812.50 ? 'Die KV-/PV-Grenze ist überschritten (keine Mehrbelastung dort), die RV-/ALV-Grenze jedoch noch nicht.' : 'Bei Ihrem Bruttogehalt greifen beide BBGs noch nicht — alle Sozialabgaben werden voll fällig.'}`,
    });
  } else {
    faqs.push({
      question: `Sind ${bruttoStr} € brutto mit Jahresbrutto ${jahresbruttoStr} € über dem Grundfreibetrag?`,
      answer: `Der Grundfreibetrag 2026 liegt bei 12.348 € (Ledige) bzw. 24.696 € (Zusammenveranlagung). Ein Jahresbrutto von ${jahresbruttoStr} € liegt ${jahresbrutto > 12348 ? 'darüber — Einkommensteuer wird fällig' : 'darunter — es fällt keine Einkommensteuer an'}. Unabhängig davon werden Sozialabgaben (KV, RV, ALV, PV) ab dem ersten Euro berechnet.`,
    });
  }

  return faqs;
}

// ─── Page-Generierung ──────────────────────────────────────────────────────

export function generateBruttoNettoPages(): BruttoNettoPageDef[] {
  const pages: BruttoNettoPageDef[] = [];

  for (const brutto of GEHAELTER) {
    for (const sk of STEUERKLASSEN) {
      const bruttoStr = brutto.toLocaleString('de-DE');
      const slug = `${brutto}-euro-steuerklasse-${sk}`;

      pages.push({
        slug,
        brutto,
        steuerklasse: sk,
        title: `${bruttoStr} € brutto in netto — Steuerklasse ${sk}`,
        metaTitle: `${bruttoStr} € brutto in netto (Steuerklasse ${sk}) 2026`,
        metaDescription: `Wie viel Netto bleiben von ${bruttoStr} € Brutto in Steuerklasse ${sk}? ✓ Aktuell 2026 ✓ Alle Abzüge ✓ Kostenlos berechnen`,
        h1: `${bruttoStr} € brutto — wie viel netto in Steuerklasse ${sk}?`,
        intro: getIntro(brutto, bruttoStr, sk),
        faqs: getFaqs(brutto, bruttoStr, sk),
        indexable: true,
      });
    }
  }

  // Kirchensteuer-Varianten für die Top-Gehälter (SK 1 only)
  const TOP_GEHAELTER = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000];
  for (const brutto of TOP_GEHAELTER) {
    const bruttoStr = brutto.toLocaleString('de-DE');
    const kirchenIntro = `${getIncomeNarrative(brutto, bruttoStr, 1)} Die Kirchensteuer beträgt in den meisten Bundesländern 9 % der Lohnsteuer (Bayern und Baden-Württemberg: 8 %). Für Kirchenmitglieder reduziert das bei ${bruttoStr} € brutto das Nettogehalt um einen festen Prozentsatz — im Folgenden mit 9 % Kirchensteuer berechnet.`;
    pages.push({
      slug: `${brutto}-euro-mit-kirchensteuer`,
      brutto,
      steuerklasse: 1,
      title: `${bruttoStr} € brutto mit Kirchensteuer`,
      metaTitle: `${bruttoStr} € brutto netto mit Kirchensteuer 2026`,
      metaDescription: `${bruttoStr} € brutto mit Kirchensteuer — wie viel netto? ✓ Steuerklasse 1 ✓ Mit 9 % Kirchensteuer ✓ Alle Abzüge`,
      h1: `${bruttoStr} € brutto in netto — mit Kirchensteuer`,
      intro: kirchenIntro,
      faqs: [
        {
          question: `Wie viel Kirchensteuer fällt bei ${bruttoStr} € brutto monatlich an?`,
          answer: `Die Kirchensteuer wird von der fälligen Lohnsteuer berechnet (9 % in den meisten Bundesländern, 8 % in Bayern und Baden-Württemberg). Bei ${bruttoStr} € brutto in Steuerklasse I ergibt das monatlich typischerweise eine niedrige bis mittlere zweistellige Summe. Ein Kirchenaustritt reduziert das Netto-Gehalt entsprechend.`,
        },
        {
          question: `Kann ich durch Kirchenaustritt netto mehr haben?`,
          answer: `Ja, direkt und dauerhaft. Der Kirchenaustritt wird beim Standesamt bzw. Amtsgericht erklärt, die neue Lohnsteuerklasse ohne Kirchensteuer gilt ab dem folgenden Monat. Über das Jahr ergibt sich bei ${bruttoStr} € brutto eine dreistellige Netto-Ersparnis — Sie verlieren aber auch Leistungen (Taufe, kirchliche Trauung, Seelsorge im Bestattungsfall).`,
        },
        {
          question: `Gilt die Kirchensteuer auch für private Krankenversicherungen?`,
          answer: `Nein, die Kirchensteuer orientiert sich ausschließlich an der Lohnsteuer — sie ist unabhängig davon, ob Sie gesetzlich oder privat krankenversichert sind. Auch Kapitalerträge werden mit Kirchensteuer belegt (über die Abgeltungsteuer).`,
        },
      ],
      indexable: true,
    });
  }

  return pages;
}

export const BRUTTO_NETTO_PAGES = generateBruttoNettoPages();
