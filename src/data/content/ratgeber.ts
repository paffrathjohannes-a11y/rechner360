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
  {
    slug: 'bmi-normalgewicht',
    title: 'BMI Normalgewicht — Was ist ein gesunder BMI?',
    metaTitle: 'BMI Normalgewicht 2026 — Tabelle, Grenzen & Idealgewicht',
    metaDescription: 'Was ist ein normaler BMI? WHO-Tabelle, Idealgewicht nach Größe und Alter. Wann ist man übergewichtig?',
    intro: 'Der Body-Mass-Index ist ein einfacher Richtwert zur Einschätzung des Körpergewichts. Doch was genau ist Normalgewicht und wo liegen die Grenzen?',
    sections: [
      { title: 'BMI Normalbereich nach WHO', content: 'Die WHO definiert Normalgewicht als BMI zwischen 18,5 und 24,9. Ein BMI unter 18,5 gilt als Untergewicht, ab 25 als Übergewicht und ab 30 als Adipositas (Fettleibigkeit). Diese Werte gelten für Erwachsene zwischen 18 und 65 Jahren.' },
      { title: 'Idealgewicht nach Größe', content: 'Das Idealgewicht lässt sich einfach berechnen: Für einen BMI von 22 (Mitte des Normalbereichs) gilt: Idealgewicht = 22 × Größe² (in Metern). Beispiel: Bei 1,75 m → 22 × 1,75² = 67,4 kg. Der gesunde Bereich erstreckt sich von ca. 57 kg bis 76 kg.' },
      { title: 'BMI bei Kindern und Senioren', content: 'Bei Kindern und Jugendlichen werden alters- und geschlechtsspezifische Perzentilen verwendet statt fester BMI-Grenzen. Bei Senioren über 65 gilt ein BMI von 24-29 als optimal — etwas höher als bei jüngeren Erwachsenen, da leichtes Übergewicht im Alter protektiv sein kann.' },
      { title: 'Grenzen des BMI', content: 'Der BMI unterscheidet nicht zwischen Muskelmasse und Fettmasse. Sportler mit hohem Muskelanteil können einen „übergewichtigen" BMI haben, ohne tatsächlich zu viel Körperfett zu haben. Umgekehrt kann ein normaler BMI bei wenig Muskeln und viel Bauchfett täuschen. Ergänzende Maße wie der Bauchumfang sind daher sinnvoll.' },
    ],
    relatedRechner: 'bmi-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'nebenkostenrechner-hauskauf',
    title: 'Kaufnebenkosten beim Hauskauf — Alle Kosten im Überblick',
    metaTitle: 'Kaufnebenkosten Hauskauf 2026 — Grunderwerbsteuer, Notar & Makler',
    metaDescription: 'Alle Kaufnebenkosten beim Hauskauf: Grunderwerbsteuer, Notar, Grundbuch und Makler. Was kostet ein Hauskauf wirklich?',
    intro: 'Beim Kauf einer Immobilie fallen neben dem Kaufpreis erhebliche Nebenkosten an. Diese werden oft unterschätzt und können 10-15% des Kaufpreises ausmachen.',
    sections: [
      { title: 'Grunderwerbsteuer — der größte Posten', content: 'Die Grunderwerbsteuer ist der größte Nebenkostenposten und variiert je nach Bundesland zwischen 3,5% (Bayern) und 6,5% (NRW, Brandenburg, Schleswig-Holstein). Bei einem Kaufpreis von 400.000 € sind das 14.000 € bis 26.000 €. Die Steuer wird einmalig fällig und ist nicht verhandelbar.' },
      { title: 'Notar und Grundbuch', content: 'Die Notarkosten betragen ca. 1,5% und die Grundbuchkosten ca. 0,5% des Kaufpreises. Bei 400.000 € sind das zusammen ca. 8.000 €. Der Notar beurkundet den Kaufvertrag und veranlasst die Eintragung ins Grundbuch. Diese Kosten sind gesetzlich geregelt und nicht verhandelbar.' },
      { title: 'Maklerkosten — seit 2020 geteilt', content: 'Seit Dezember 2020 werden Maklerkosten beim Kauf hälftig zwischen Käufer und Verkäufer geteilt. Die Gesamtprovision liegt typisch bei 5,95-7,14% inkl. MwSt. Ihr Anteil als Käufer: ca. 2,98-3,57%. Bei 400.000 € sind das 11.900-14.280 €. Ohne Makler können Sie diesen Posten sparen.' },
      { title: 'Gesamtrechnung Beispiel', content: 'Für ein Haus mit 400.000 € in NRW (6,5% GrEwSt) mit Makler: Grunderwerbsteuer 26.000 € + Notar 6.000 € + Grundbuch 2.000 € + Makler 14.280 € = <strong>48.280 € Nebenkosten (12,1%)</strong>. Gesamtkosten: 448.280 €. Diesen Betrag müssen Sie größtenteils aus Eigenkapital finanzieren.' },
    ],
    relatedRechner: 'nebenkostenrechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'buergergeld-hinzuverdienst',
    title: 'Bürgergeld und Hinzuverdienst — Freibeträge 2026',
    metaTitle: 'Bürgergeld Hinzuverdienst 2026 — Freibeträge & Anrechnung',
    metaDescription: 'Wie viel darf man zum Bürgergeld hinzuverdienen? Freibeträge, Anrechnungsregeln und Beispielrechnungen.',
    intro: 'Wer Bürgergeld bezieht, darf hinzuverdienen — aber nicht alles behalten. Die Freibetragsregelung bestimmt, wie viel vom Verdienst anrechnungsfrei bleibt.',
    sections: [
      { title: 'Die Freibeträge im Detail', content: 'Vom Bruttoeinkommen bleiben anrechnungsfrei: Die ersten <strong>100 €</strong> komplett (Grundfreibetrag für Versicherungen, Fahrtkosten etc.). Von 100 bis 520 € zusätzlich <strong>20%</strong>. Von 520 bis 1.000 € zusätzlich <strong>30%</strong>. Von 1.000 bis 1.200 € (1.500 € mit Kind) zusätzlich <strong>10%</strong>.' },
      { title: 'Beispielrechnung: 800 € Minijob', content: 'Bei 800 € Bruttoeinkommen: Grundfreibetrag 100 € + 20% von 420 € (100-520) = 84 € + 30% von 280 € (520-800) = 84 €. <strong>Freibetrag: 268 €</strong>. Anrechenbares Einkommen: 532 €. Das Bürgergeld wird um 532 € gekürzt, Sie behalten 268 € zusätzlich zum reduzierten Bürgergeld.' },
      { title: 'Sonderfälle: Ehrenamtspauschale und Schüler', content: 'Ehrenamtliche Aufwandsentschädigungen bis 250 €/Monat sind vollständig anrechnungsfrei. Schüler unter 25 dürfen in den Ferien unbegrenzt hinzuverdienen. Auszubildende haben einen Grundfreibetrag von 520 €/Monat.' },
    ],
    relatedRechner: 'buergergeld-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'pfaendungsschutz',
    title: 'Pfändungsschutz — Wie schütze ich mein Einkommen?',
    metaTitle: 'Pfändungsschutz 2026 — Freigrenze, P-Konto & Rechte',
    metaDescription: 'Pfändungsschutz: Was ist die Pfändungsfreigrenze? Wie funktioniert ein P-Konto? Welche Einkünfte sind geschützt?',
    intro: 'Bei einer Kontopfändung oder Lohnpfändung steht Ihnen ein gesetzlicher Schutz zu. Hier erfahren Sie, wie Sie Ihr Einkommen absichern.',
    sections: [
      { title: 'Das P-Konto (Pfändungsschutzkonto)', content: 'Jeder hat das Recht, sein Girokonto in ein P-Konto umzuwandeln. Die Bank muss dies innerhalb von 4 Geschäftstagen tun. Auf dem P-Konto ist automatisch der Grundfreibetrag von 1.402,28 €/Monat geschützt. Dieser Betrag kann nicht gepfändet werden — auch nicht bei bestehenden Pfändungen.' },
      { title: 'Erhöhung bei Unterhaltspflichten', content: 'Den Grundfreibetrag können Sie erhöhen lassen: Für die erste unterhaltspflichtige Person um 527,76 €, für jede weitere um 294,02 €. Dafür benötigen Sie eine Bescheinigung (Schuldnerberatung, Arbeitgeber, oder Familienkasse). Die Bescheinigung reichen Sie bei Ihrer Bank ein.' },
      { title: 'Welche Einkünfte sind geschützt?', content: 'Kindergeld ist unpfändbar und wird über den Grundfreibetrag hinaus geschützt. Weihnachtsgeld ist bis zur Hälfte des monatlichen Arbeitseinkommens geschützt (max. 500 €). Überstundenvergütung ist zur Hälfte unpfändbar. Sozialhilfe und Bürgergeld sind grundsätzlich unpfändbar.' },
    ],
    relatedRechner: 'pfaendungsrechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'rente-frueh-planen',
    title: 'Rente früh planen — So schließen Sie die Rentenlücke',
    metaTitle: 'Rentenlücke schließen 2026 — Private Vorsorge, Sparpläne & Tipps',
    metaDescription: 'Wie Sie Ihre Rentenlücke schließen: Private Vorsorge, ETF-Sparpläne, Betriebsrente und Riester. Mit Rechenbeispielen.',
    intro: 'Die gesetzliche Rente allein wird für die meisten nicht reichen. Wer früh anfängt vorzusorgen, profitiert vom Zinseszins-Effekt.',
    sections: [
      { title: 'Die typische Rentenlücke', content: 'Ein Durchschnittsverdiener (45.000 €/Jahr) mit 45 Beitragsjahren erhält ca. 1.770 € Rente brutto — nach Abzügen ca. 1.500 € netto. Das aktuelle Nettoeinkommen liegt bei ca. 2.400 €. Die Rentenlücke: ca. 900 €/Monat oder 10.800 €/Jahr.' },
      { title: 'ETF-Sparplan als Säule', content: 'Mit einem ETF-Sparplan von 200 €/Monat und 7% Rendite bauen Sie in 30 Jahren ca. 240.000 € auf. Bei einer Entnahmerate von 4% pro Jahr ergibt das ca. 800 €/Monat — fast genug, um die typische Rentenlücke zu schließen. Der Schlüssel: früh anfangen.' },
      { title: 'Betriebliche Altersvorsorge (bAV)', content: 'Über den Arbeitgeber können Sie steuerbegünstigt vorsorgen. Seit 2019 muss der Arbeitgeber mindestens 15% der Entgeltumwandlung dazugeben. Bei 200 €/Monat Eigenanteil kommen mindestens 30 € AG-Zuschuss dazu. Vorteil: Steuer- und SV-Ersparnis in der Ansparphase.' },
      { title: 'Riester-Rente — lohnt sich das noch?', content: 'Riester lohnt sich vor allem für Geringverdiener (Grundzulage 175 €/Jahr) und Familien (Kinderzulage 185-300 €/Kind/Jahr). Für Gutverdiener ist der Steuervorteil relevant. Nachteil: hohe Kosten und geringe Flexibilität. Alternative: freier ETF-Sparplan ist oft besser.' },
    ],
    relatedRechner: 'rentenrechner',
    publishDate: '2026-04-07',
  },
];
