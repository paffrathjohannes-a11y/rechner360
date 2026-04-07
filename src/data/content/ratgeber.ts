export interface RatgeberArtikel {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { title: string; content: string }[];
  relatedRechner: string;
  publishDate: string;
}

export const RATGEBER_ARTIKEL: RatgeberArtikel[] = [
  {
    slug: 'steuerklasse-wechseln',
    title: 'Steuerklasse wechseln \u2014 So geht\u2019s 2026',
    metaTitle: 'Steuerklasse wechseln 2026 \u2014 Anleitung, Fristen & Formulare',
    metaDescription: 'Steuerklasse wechseln leicht gemacht. Wann lohnt sich ein Wechsel? Welche Fristen gelten? Schritt-f\u00fcr-Schritt Anleitung f\u00fcr 2026.',
    intro: 'Ein Wechsel der Steuerklasse kann sich erheblich auf Ihr monatliches Nettogehalt auswirken. Besonders f\u00fcr Ehepaare lohnt sich ein Blick auf die verschiedenen Kombinationen. Hier erfahren Sie, wann und wie Sie Ihre Steuerklasse wechseln k\u00f6nnen.',
    sections: [
      {
        title: 'Wann lohnt sich ein Steuerklassenwechsel?',
        content: 'Ein Wechsel lohnt sich besonders, wenn sich Ihre Lebenssituation ändert: Heirat, Geburt eines Kindes, Gehaltsänderung, oder wenn ein Partner in Elternzeit geht. Die Kombination III/V ist vorteilhaft, wenn ein Partner deutlich mehr verdient. Die Kombination IV/IV eignet sich bei ähnlichem Einkommen. Seit 2020 gibt es zudem das Faktorverfahren (IV/IV mit Faktor), das die Steuerlast gerechter verteilt.',
      },
      {
        title: 'Fristen und Antrag',
        content: 'Den Steuerklassenwechsel können Sie seit 2020 mehrmals im Jahr beantragen — es gibt keine Beschränkung mehr auf einen Wechsel pro Jahr. Der Antrag erfolgt beim zuständigen Finanzamt mit dem Formular „Antrag auf Steuerklassenwechsel bei Ehegatten/Lebenspartnern". Änderungen gelten ab dem Folgemonat nach Eingang des Antrags.',
      },
      {
        title: 'Auswirkung auf Elterngeld und Arbeitslosengeld',
        content: 'Die Steuerklasse beeinflusst die Höhe von Elterngeld und Arbeitslosengeld I, da diese auf dem Nettogehalt basieren. Werdende Eltern sollten spätestens 7 Monate vor dem errechneten Geburtstermin in Steuerklasse III wechseln, um ein höheres Elterngeld zu erhalten. Bei drohendem Jobverlust kann ein Wechsel in Steuerklasse III das spätere Arbeitslosengeld erhöhen.',
      },
      {
        title: 'Steuerklassen im \u00dcberblick',
        content: '<strong>Steuerklasse I:</strong> Ledige, Geschiedene, Verwitwete. <strong>Steuerklasse II:</strong> Alleinerziehende (Entlastungsbetrag 4.260 €). <strong>Steuerklasse III:</strong> Verheiratete mit höherem Einkommen (Splitting). <strong>Steuerklasse IV:</strong> Verheiratete mit ähnlichem Einkommen. <strong>Steuerklasse V:</strong> Verheiratete mit niedrigerem Einkommen. <strong>Steuerklasse VI:</strong> Zweitjob.',
      },
    ],
    relatedRechner: 'brutto-netto-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'baufinanzierung-tipps',
    title: '10 Tipps f\u00fcr Ihre Baufinanzierung 2026',
    metaTitle: 'Baufinanzierung 2026 \u2014 10 Tipps f\u00fcr g\u00fcnstige Konditionen',
    metaDescription: '10 Tipps f\u00fcr Ihre Baufinanzierung: Eigenkapital, Tilgung, Zinsbindung, Sondertilgung und mehr. Aktuell f\u00fcr 2026.',
    intro: 'Eine Baufinanzierung ist die größte finanzielle Entscheidung für die meisten Menschen. Mit diesen 10 Tipps sichern Sie sich die besten Konditionen und vermeiden teure Fehler.',
    sections: [
      {
        title: '1. Eigenkapital: Je mehr, desto besser',
        content: 'Bringen Sie mindestens 20-30% des Kaufpreises als Eigenkapital ein. Zusätzlich sollten die Kaufnebenkosten (10-15% des Kaufpreises) aus Eigenkapital finanziert werden. Je höher Ihr Eigenkapitalanteil, desto niedriger der Zinssatz — oft 0,3-0,5 Prozentpunkte Unterschied.',
      },
      {
        title: '2. Tilgung: Mindestens 2% w\u00e4hlen',
        content: 'Mit 1% Tilgung dauert die Rückzahlung bei 3,5% Zins über 40 Jahre. Bei 2% sind es ca. 29 Jahre, bei 3% nur noch ca. 22 Jahre. Die höhere monatliche Rate zahlt sich langfristig durch deutlich geringere Gesamtzinsen aus.',
      },
      {
        title: '3. Zinsbindung an Marktlage anpassen',
        content: 'Bei niedrigen Zinsen lohnt sich eine lange Zinsbindung (15-20 Jahre). Bei hohen Zinsen kann eine kürzere Bindung (5-10 Jahre) sinnvoll sein, wenn Sie auf sinkende Zinsen hoffen. Aktuell (2026) liegen die Zinsen bei ca. 3-4% — eine Zinsbindung von 10-15 Jahren ist ein guter Kompromiss.',
      },
      {
        title: '4. Sondertilgungen vereinbaren',
        content: 'Vereinbaren Sie Möglichkeiten für jährliche Sondertilgungen (typisch: 5-10% der Darlehenssumme). So können Sie bei Gehaltsbonus, Erbschaft oder Steuerrückerstattung die Restschuld schneller reduzieren.',
      },
      {
        title: '5. Angebote vergleichen',
        content: 'Holen Sie mindestens 3-5 Angebote ein — von Hausbank, Direktbanken und Vermittlern. Die Zinsunterschiede zwischen Anbietern können 0,2-0,5 Prozentpunkte betragen, was bei 300.000 € Darlehen über 10 Jahre mehrere tausend Euro ausmacht.',
      },
    ],
    relatedRechner: 'tilgungsrechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'elterngeld-antrag',
    title: 'Elterngeld beantragen \u2014 Schritt f\u00fcr Schritt',
    metaTitle: 'Elterngeld beantragen 2026 \u2014 Anleitung, Fristen & Unterlagen',
    metaDescription: 'Elterngeld Antrag Schritt f\u00fcr Schritt: Welche Unterlagen brauche ich? Welche Fristen gelten? Basis vs. Plus?',
    intro: 'Das Elterngeld muss schriftlich beantragt werden. Hier erfahren Sie, welche Unterlagen Sie brauchen, welche Fristen gelten und wie Sie das Maximum herausholen.',
    sections: [
      {
        title: 'Wann beantragen?',
        content: 'Der Elterngeldantrag kann erst nach der Geburt gestellt werden. Elterngeld wird rückwirkend für maximal 3 Monate gezahlt. Stellen Sie den Antrag daher innerhalb der ersten 3 Lebensmonate Ihres Kindes. Die Bearbeitungszeit dauert in der Regel 4-8 Wochen.',
      },
      {
        title: 'Ben\u00f6tigte Unterlagen',
        content: 'Geburtsurkunde des Kindes (Original oder beglaubigte Kopie), Einkommensnachweis der letzten 12 Monate vor der Geburt (Gehaltsabrechnungen oder Steuerbescheid bei Selbstständigen), Bescheinigung der Krankenkasse über Mutterschaftsgeld, Arbeitgeberbescheinigung über Zuschuss zum Mutterschaftsgeld, und ggf. Nachweis über Teilzeitarbeit während des Elterngeldbezugs.',
      },
      {
        title: 'Basis vs. Plus \u2014 was lohnt sich?',
        content: 'Basiselterngeld (65-67% des Nettos, 300-1.800 €, 12 Monate) lohnt sich, wenn Sie komplett zu Hause bleiben. ElterngeldPlus (halber Betrag, doppelte Dauer) ist ideal bei Teilzeitarbeit nach der Geburt. Kombinationen sind möglich und oft optimal: z.B. 6 Monate Basis + 12 Monate Plus.',
      },
    ],
    relatedRechner: 'elterngeld-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'firmenwagen-steuer',
    title: 'Firmenwagen versteuern — 1%-Regel, Hybrid & E-Auto',
    metaTitle: 'Firmenwagen versteuern 2026 — 1%-Regel, 0,5% Hybrid, 0,25% E-Auto',
    metaDescription: 'Firmenwagen Versteuerung: 1%-Regel für Verbrenner, 0,5% für Hybrid, 0,25% für E-Auto. Was bedeutet das für Ihr Netto?',
    intro: 'Ein Firmenwagen ist ein attraktiver Gehaltsbestandteil — aber er muss als geldwerter Vorteil versteuert werden. Die Höhe hängt von der Antriebsart ab.',
    sections: [
      {
        title: 'Die 1%-Regel erklärt',
        content: 'Bei der 1%-Regel wird monatlich 1% des Bruttolistenpreises als geldwerter Vorteil zum Gehalt addiert. Bei einem Fahrzeug mit 40.000 € Listenpreis sind das 400 €/Monat, die versteuert und verbeitragt werden müssen. Das steuerliche Brutto steigt von z.B. 4.000 € auf 4.400 €.',
      },
      {
        title: 'Vergünstigung für Hybrid und E-Auto',
        content: 'Für Plug-in-Hybride gilt die <strong>0,5%-Regel</strong> (statt 1%). Für reine Elektroautos mit einem Listenpreis bis 70.000 € gilt sogar die <strong>0,25%-Regel</strong>. Bei einem E-Auto mit 50.000 € Listenpreis sind das nur 125 €/Monat statt 500 € beim Verbrenner — eine erhebliche Steuerersparnis.',
      },
      {
        title: 'Fahrtenbuch als Alternative',
        content: 'Alternativ zur Pauschalversteuerung können Sie ein Fahrtenbuch führen. Dann wird nur der tatsächliche private Nutzungsanteil versteuert. Das lohnt sich, wenn Sie den Firmenwagen überwiegend dienstlich nutzen. Allerdings sind die Anforderungen an ein ordnungsgemäßes Fahrtenbuch hoch.',
      },
      {
        title: 'Auswirkung auf Netto und Sozialversicherung',
        content: 'Der geldwerte Vorteil erhöht sowohl die Lohnsteuer als auch die Sozialversicherungsbeiträge. Bei Steuerklasse I und einem 40.000 € Verbrenner-Firmenwagen sinkt das Netto bei 4.000 € Brutto um ca. 150-180 € im Vergleich zum gleichen Gehalt ohne Firmenwagen. Nutzen Sie unseren Brutto-Netto-Rechner mit Firmenwagen-Option für Ihre individuelle Berechnung.',
      },
    ],
    relatedRechner: 'brutto-netto-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'etf-sparplan-rendite',
    title: 'ETF-Sparplan — Rendite und Kosten berechnen',
    metaTitle: 'ETF-Sparplan 2026 — Rendite, Kosten & Zinseszins berechnen',
    metaDescription: 'ETF-Sparplan Rendite berechnen: Wie viel Vermögen bauen Sie mit 200€/Monat auf? Zinseszins-Effekt, Kosten und realistische Renditen.',
    intro: 'Ein ETF-Sparplan ist einer der einfachsten und günstigsten Wege, langfristig Vermögen aufzubauen. Doch wie viel kommt dabei wirklich raus?',
    sections: [
      {
        title: 'Was bringt ein ETF-Sparplan langfristig?',
        content: 'Der MSCI World ETF hat in den letzten 30 Jahren durchschnittlich ca. 8% pro Jahr vor Kosten und Inflation erbracht. Bei 200 €/Monat Sparrate und 7% Rendite (nach Kosten) wächst Ihr Vermögen in 20 Jahren auf ca. 104.000 € — bei nur 48.000 € Einzahlung. Der Zinseszins-Effekt macht den Unterschied.',
      },
      {
        title: 'Kosten im Blick behalten',
        content: 'Die jährlichen Kosten (TER) eines ETF-Sparplans liegen typisch bei 0,1-0,5% pro Jahr. Depotführung ist bei Online-Brokern meist kostenlos. Ordergebühren beim Sparplan: 0-1,5 € pro Ausführung. Auf 30 Jahre summieren sich selbst kleine Kostenunterschiede zu tausenden Euro Differenz.',
      },
      {
        title: 'Steuern auf ETF-Gewinne',
        content: 'Auf ETF-Gewinne fallen 26,375% Abgeltungssteuer (inkl. Soli) an. Teilfreistellung: Bei Aktien-ETFs sind 30% der Erträge steuerfrei. Der Sparerpauschbetrag beträgt 1.000 € pro Person (2.000 € für Ehepaare). Vorabpauschale wird seit 2018 jährlich berechnet.',
      },
    ],
    relatedRechner: 'zinseszinsrechner',
    publishDate: '2026-04-07',
  },
];
