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
  {
    slug: 'mindestlohn-2026',
    title: 'Mindestlohn 2026 — Was Sie wissen müssen',
    metaTitle: 'Mindestlohn 2026 — Höhe, Änderungen & Auswirkungen',
    metaDescription: 'Mindestlohn 2026: Wie hoch ist er? Was bedeutet er für Minijob und Teilzeit? Alle Infos auf einen Blick.',
    intro: 'Der gesetzliche Mindestlohn wird regelmäßig angepasst. Hier erfahren Sie, wie hoch er 2026 ist und was das für Ihr Einkommen bedeutet.',
    sections: [
      { title: 'Höhe des Mindestlohns 2026', content: 'Der gesetzliche Mindestlohn beträgt seit Januar 2025 <strong>12,82 € brutto pro Stunde</strong>. Eine weitere Erhöhung für 2026 steht noch aus — die Mindestlohnkommission gibt ihre Empfehlung typischerweise im Juni ab. Bei 40 Stunden/Woche entspricht der aktuelle Mindestlohn einem Monatsgehalt von ca. 2.222 € brutto.' },
      { title: 'Minijob-Grenze', content: 'Die Minijob-Grenze ist dynamisch an den Mindestlohn gekoppelt: 10 Stunden × Mindestlohn × 52 Wochen ÷ 12 Monate. Aktuell liegt sie bei <strong>538 €/Monat</strong>. Bei einer Mindestlohnerhöhung steigt auch die Minijob-Grenze automatisch.' },
      { title: 'Übergangsbereich (Midijob)', content: 'Der Übergangsbereich erstreckt sich von 538,01 € bis 2.000 €/Monat. In diesem Bereich zahlen Arbeitnehmer reduzierte Sozialversicherungsbeiträge, erwerben aber volle Rentenansprüche. Bei Erhöhung des Mindestlohns verschiebt sich auch diese Grenze.' },
    ],
    relatedRechner: 'stundenlohn-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'steuererklaerung-tipps',
    title: 'Steuererklärung 2025 — Die wichtigsten Tipps',
    metaTitle: 'Steuererklärung 2025 — 10 Tipps für mehr Rückerstattung',
    metaDescription: 'Steuererklärung 2025: Fristen, Werbungskosten, Sonderausgaben und die besten Tipps für mehr Rückerstattung.',
    intro: 'Die durchschnittliche Steuererstattung in Deutschland liegt bei über 1.000 €. Mit diesen Tipps holen Sie das Maximum raus.',
    sections: [
      { title: 'Fristen 2026 für die Steuererklärung 2025', content: 'Wer zur Abgabe verpflichtet ist, muss die Erklärung bis <strong>31. Juli 2026</strong> einreichen. Mit Steuerberater gilt eine verlängerte Frist bis <strong>28. Februar 2027</strong>. Freiwillige Abgabe (z.B. Arbeitnehmer in SK I ohne Nebeneinkünfte) ist bis zu 4 Jahre rückwirkend möglich.' },
      { title: 'Werbungskosten — der Klassiker', content: 'Jeder Arbeitnehmer bekommt automatisch 1.230 € Werbungskostenpauschale. Erst wenn Ihre tatsächlichen Kosten darüber liegen, lohnt sich das Angeben. Typische Werbungskosten: Fahrtkosten (0,30 €/km einfache Strecke), Homeoffice-Pauschale (6 €/Tag, max. 1.260 €/Jahr), Arbeitsmittel, Fortbildungen, Fachliteratur.' },
      { title: 'Sonderausgaben und außergewöhnliche Belastungen', content: 'Absetzbar sind u.a.: Kirchensteuer, Spenden (bis 20% des Einkommens), Kranken- und Pflegeversicherungsbeiträge, Riester-Beiträge. Bei außergewöhnlichen Belastungen (Krankheitskosten, Pflege) gilt eine zumutbare Eigenbelastung abhängig vom Einkommen.' },
      { title: 'Handwerkerkosten und haushaltsnahe Dienstleistungen', content: '<strong>Handwerkerkosten</strong>: 20% der Arbeitskosten (max. 1.200 € Steuerermäßigung/Jahr). <strong>Haushaltsnahe Dienstleistungen</strong>: 20% der Kosten (max. 4.000 € Steuerermäßigung/Jahr). Gilt für: Reinigung, Gartenpflege, Kinderbetreuung, Pflegedienste. Wichtig: Nur per Überweisung bezahlen, keine Barzahlung!' },
    ],
    relatedRechner: 'brutto-netto-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'gehaltserhoehung-verhandeln',
    title: 'Gehaltserhöhung verhandeln — Tipps & Argumente',
    metaTitle: 'Gehaltserhöhung verhandeln 2026 — 7 Tipps für mehr Gehalt',
    metaDescription: 'So verhandeln Sie erfolgreich eine Gehaltserhöhung: Timing, Argumente, Vorbereitung und wie viel Sie fordern können.',
    intro: 'Die meisten Arbeitnehmer verhandeln zu selten über ihr Gehalt. Dabei können Sie mit der richtigen Strategie deutlich mehr herausholen.',
    sections: [
      { title: 'Der richtige Zeitpunkt', content: 'Ideal: nach einem erfolgreichen Projekt, zum Jahresgespräch, bei Übernahme neuer Verantwortung, oder wenn Sie ein besseres Angebot haben. Vermeiden Sie Zeiten mit Stellenabbau oder schlechten Quartalszahlen. Tipp: Kündigen Sie das Gespräch 1-2 Wochen vorher an.' },
      { title: 'Wie viel kann ich fordern?', content: 'Üblich sind <strong>3-10% bei regulären Erhöhungen</strong>, 10-20% bei Beförderung oder deutlich erweiterten Aufgaben. Recherchieren Sie vorher den Marktwert Ihrer Position (Glassdoor, Gehalt.de, StepStone Gehaltsreport). Von einer Erhöhung um 500 € brutto kommen typischerweise nur 250-300 € netto an.' },
      { title: 'Die besten Argumente', content: 'Fokussieren Sie auf Ihren <strong>Mehrwert für das Unternehmen</strong>, nicht auf private Gründe: Erfolgreiche Projekte, Umsatzsteigerungen, Prozessverbesserungen, positive Kundenfeedbacks, übernommene Zusatzaufgaben. Vermeiden Sie: „Ich brauche mehr Geld" oder „Kollege X verdient mehr".' },
      { title: 'Alternativen zum Gehalt', content: 'Wenn eine Gehaltserhöhung nicht möglich ist: Firmenwagen (mit E-Auto besonders steuergünstig), zusätzliche Urlaubstage, Homeoffice-Tage, Weiterbildungsbudget, betriebliche Altersvorsorge mit AG-Zuschuss, oder ein Bonus-Modell. Manche Alternativen sind steuerlich sogar günstiger als reines Gehalt.' },
    ],
    relatedRechner: 'gehaltserhoehung-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'grundsteuer-reform-erklaert',
    title: 'Grundsteuer Reform 2025 — einfach erklärt',
    metaTitle: 'Grundsteuer Reform 2025 — Was ändert sich? Einfach erklärt',
    metaDescription: 'Grundsteuer Reform 2025 einfach erklärt: Was ändert sich? Wird es teurer? Bundesmodell vs. Ländermodelle.',
    intro: 'Seit dem 1. Januar 2025 wird die Grundsteuer in Deutschland nach neuen Regeln berechnet. Für viele Eigentümer ändert sich die Höhe — manchmal deutlich.',
    sections: [
      { title: 'Warum wurde die Grundsteuer reformiert?', content: 'Das Bundesverfassungsgericht hat 2018 entschieden, dass die bisherige Berechnung auf Basis veralteter Einheitswerte (West: 1964, Ost: 1935) verfassungswidrig ist. Die neuen Werte basieren auf aktuellen Bodenrichtwerten und sollen gerechter sein.' },
      { title: 'Was ändert sich konkret?', content: 'Die <strong>Grundsteuerwerte</strong> wurden komplett neu berechnet. In vielen Fällen steigen sie deutlich — besonders in gefragten Innenstadtlagen. Gleichzeitig wurden die <strong>Steuermesszahlen</strong> gesenkt (von 3,5‰ auf 0,31‰ für Wohnen). Ob Sie mehr oder weniger zahlen, hängt vom <strong>Hebesatz</strong> Ihrer Kommune ab.' },
      { title: 'Bundesmodell vs. Ländermodelle', content: 'Nicht alle Bundesländer nutzen das Bundesmodell. <strong>Bayern</strong> hat ein reines Flächenmodell (nur Grundstücks- und Gebäudefläche, kein Wert). <strong>Baden-Württemberg</strong> nutzt ein modifiziertes Bodenwertmodell. <strong>Hamburg, Hessen und Niedersachsen</strong> haben ebenfalls eigene Regelungen.' },
    ],
    relatedRechner: 'grundsteuer-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'unterhalt-berechnen',
    title: 'Kindesunterhalt berechnen — Düsseldorfer Tabelle erklärt',
    metaTitle: 'Kindesunterhalt berechnen 2026 — Düsseldorfer Tabelle einfach erklärt',
    metaDescription: 'Kindesunterhalt berechnen: Düsseldorfer Tabelle, Kindergeld-Anrechnung, Selbstbehalt und Mangelfälle erklärt.',
    intro: 'Nach einer Trennung ist der Kindesunterhalt oft ein strittiges Thema. Die Düsseldorfer Tabelle gibt einen klaren Rahmen vor — hier erfahren Sie, wie sie funktioniert.',
    sections: [
      { title: 'So funktioniert die Düsseldorfer Tabelle', content: 'Die Tabelle staffelt den Unterhalt nach dem <strong>bereinigten Nettoeinkommen</strong> des Unterhaltspflichtigen (10 Einkommensgruppen) und dem <strong>Alter des Kindes</strong> (4 Altersstufen). Die Tabelle wird für 2 Kinder berechnet — bei mehr Kindern kann eine niedrigere Gruppe gelten.' },
      { title: 'Bereinigtes Nettoeinkommen', content: 'Vom Bruttoeinkommen werden abgezogen: Steuern, Sozialversicherung, berufsbedingte Aufwendungen (pauschal 5% oder nachweisbar), Schulden, die vor der Trennung entstanden sind, und Kosten für Umgangsrecht. Das Ergebnis ist das bereinigte Nettoeinkommen, das in die Tabelle eingeht.' },
      { title: 'Kindergeld-Anrechnung', content: 'Bei <strong>minderjährigen Kindern</strong> wird das hälftige Kindergeld (127,50 €) vom Tabellenbetrag abgezogen — den Zahlbetrag zahlt der unterhaltspflichtige Elternteil. Bei <strong>volljährigen Kindern</strong> wird das volle Kindergeld (255 €) angerechnet, da es direkt an das Kind geht.' },
      { title: 'Mangelfall', content: 'Wenn das Einkommen nicht für den vollen Unterhalt aller Kinder reicht und nach Zahlung weniger als der Selbstbehalt (1.450 € für Erwerbstätige) verbleibt, liegt ein <strong>Mangelfall</strong> vor. Der verfügbare Betrag wird dann anteilig auf alle Kinder aufgeteilt.' },
    ],
    relatedRechner: 'unterhalt-rechner',
    publishDate: '2026-04-07',
  },

  // ─── Hochpreis-Artikel (SEO + Affiliate) ───────────────────

  {
    slug: 'kredit-aufnehmen-2026',
    title: 'Kredit aufnehmen 2026 — Was Sie wissen müssen',
    metaTitle: 'Kredit aufnehmen 2026 — Zinsen, Voraussetzungen & Tipps',
    metaDescription: 'Kredit aufnehmen leicht gemacht: Aktuelle Zinsen, Voraussetzungen, Kreditarten und Tipps für die günstigste Finanzierung 2026.',
    intro: 'Ob Autokauf, Renovierung oder Umschuldung — ein Kredit kann die richtige Lösung sein. Doch welche Kreditart passt zu Ihnen? Worauf sollten Sie achten? Und wie bekommen Sie die besten Zinsen? Dieser Ratgeber gibt Ihnen alle Antworten für 2026.',
    sections: [
      {
        title: 'Welche Kreditarten gibt es?',
        content: '<strong>Ratenkredit:</strong> Der Klassiker — feste monatliche Rate, fester Zinssatz, feste Laufzeit. Ideal für Anschaffungen von 1.000 bis 75.000 €. <strong>Rahmenkredit:</strong> Flexibel wie ein Dispo, aber günstiger. Sie zahlen nur Zinsen auf den genutzten Betrag. <strong>Autokredit:</strong> Zweckgebunden und dadurch oft günstiger als ein freier Ratenkredit. <strong>Umschuldung:</strong> Einen teuren Altkredit durch einen günstigeren ersetzen — lohnt sich oft bei Zinsdifferenz ab 1 Prozentpunkt.',
      },
      {
        title: 'Aktuelle Kreditzinsen 2026',
        content: 'Die Zinsen für Ratenkredite liegen 2026 zwischen <strong>3,5 % und 9 %</strong> effektiv, je nach Bonität, Laufzeit und Anbieter. Kurze Laufzeiten (12–36 Monate) sind oft günstiger. Bei Vergleichsportalen wie Smava oder CHECK24 finden Sie die besten Konditionen Ihrer Bonität — der Vergleich ist kostenlos und dauert wenige Minuten.',
      },
      {
        title: 'Voraussetzungen für einen Kredit',
        content: 'Die wichtigsten Voraussetzungen: <strong>Volljährigkeit</strong> und Wohnsitz in Deutschland, <strong>regelmäßiges Einkommen</strong> (Festanstellung bevorzugt), <strong>positive Schufa</strong> (kein harter Negativeintrag), und eine <strong>stabile Kontoführung</strong> ohne Rücklastschriften. Selbstständige brauchen meist die letzten 2–3 Steuerbescheide.',
      },
      {
        title: 'So bekommen Sie den günstigsten Kredit',
        content: '<strong>1. Vergleichen:</strong> Nie das erste Angebot nehmen. Vergleichsportale prüfen über 20 Banken gleichzeitig. <strong>2. Laufzeit optimieren:</strong> So kurz wie möglich, so lang wie nötig. Kürzere Laufzeiten = weniger Gesamtzinsen. <strong>3. Zweiter Kreditnehmer:</strong> Ein zweiter Antragsteller verbessert die Bonität und senkt den Zinssatz. <strong>4. Sondertilgung sichern:</strong> Achten Sie auf kostenlose Sondertilgung — so können Sie bei Bonuszahlung oder Erbschaft schneller tilgen.',
      },
      {
        title: 'Häufige Fehler vermeiden',
        content: 'Nehmen Sie keinen Kredit auf, um andere Kredite zu bedienen — das ist ein Warnsignal. Vergleichen Sie immer den <strong>Effektivzins</strong>, nicht den Sollzins. Achten Sie auf versteckte Kosten wie Restschuldversicherungen — diese sind fast nie sinnvoll und verteuern den Kredit um 10–20 %. Und: Die monatliche Rate sollte maximal 35 % Ihres Nettoeinkommens betragen.',
      },
    ],
    relatedRechner: 'kreditrechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'baufinanzierung-vergleich-2026',
    title: 'Baufinanzierung Vergleich 2026 — So finden Sie die besten Zinsen',
    metaTitle: 'Baufinanzierung Vergleich 2026 — Bauzinsen, Tipps & Anbieter',
    metaDescription: 'Baufinanzierung vergleichen und Tausende Euro sparen. Aktuelle Bauzinsen, Anbieter-Vergleich und Tipps für die optimale Finanzierung 2026.',
    intro: 'Bei einer Baufinanzierung über 300.000 € macht bereits 0,3 % Zinsdifferenz über 20 Jahre mehr als 15.000 € Unterschied. Ein sorgfältiger Vergleich lohnt sich also enorm. Hier erfahren Sie, worauf es 2026 ankommt.',
    sections: [
      {
        title: 'Aktuelle Bauzinsen 2026',
        content: 'Die Bauzinsen für 10 Jahre Zinsbindung liegen Anfang 2026 bei etwa <strong>3,2–3,8 %</strong>, für 15 Jahre bei <strong>3,5–4,1 %</strong> und für 20 Jahre bei <strong>3,7–4,3 %</strong>. Die Zinsen sind stark abhängig von Eigenkapitalquote, Beleihungsauslauf und Bonität. Über Vergleichsportale wie CHECK24 Baufinanzierung erreichen Sie oft Konditionen unter dem Marktdurchschnitt.',
      },
      {
        title: 'Zinsbindung — kurz oder lang?',
        content: 'Bei <strong>steigenden Zinsen</strong> lohnt sich eine lange Zinsbindung (15–20 Jahre), um sich den aktuellen Zins zu sichern. Bei <strong>fallenden Zinsen</strong> ist eine kürzere Bindung (5–10 Jahre) günstiger, da Sie früher zu besseren Konditionen umfinanzieren können. Faustregel: Im Zweifel lieber länger binden — die Planungssicherheit ist den kleinen Zinsaufschlag wert.',
      },
      {
        title: 'Eigenkapital und Beleihungsauslauf',
        content: 'Je mehr Eigenkapital, desto besser der Zins. Bei <strong>unter 60 % Beleihungsauslauf</strong> (also mind. 40 % Eigenkapital) bekommen Sie die besten Konditionen. Bei 80 % steigt der Zins deutlich, bei 100 % Finanzierung nochmals. Die Kaufnebenkosten (10–15 %) sollten immer aus Eigenkapital kommen — diese finanziert kaum eine Bank zu guten Konditionen.',
      },
      {
        title: 'Tilgung richtig wählen',
        content: 'Mindestens <strong>2 % Anfangstilgung</strong> sind empfehlenswert, besser 3 %. Bei 300.000 € und 3,5 % Zins sind Sie mit 2 % Tilgung nach 30 Jahren schuldenfrei, mit 3 % bereits nach 23 Jahren — und sparen über 50.000 € Zinsen. Vereinbaren Sie immer kostenlose Sondertilgung (mindestens 5 % p.a.) und die Möglichkeit zur Tilgungsanpassung.',
      },
      {
        title: 'So vergleichen Sie richtig',
        content: 'Vergleichen Sie immer den <strong>Effektivzins bei gleicher Zinsbindung und Tilgung</strong>. Holen Sie mindestens 3 Angebote ein: Ihre Hausbank, einen Online-Vermittler (z.B. CHECK24, Interhyp) und eine Direktbank. Achten Sie auf Bereitstellungszinsen (ab wann?), Sondertilgungsoptionen und Tilgungswechsel. Nutzen Sie unseren Tilgungsrechner, um verschiedene Szenarien durchzuspielen.',
      },
    ],
    relatedRechner: 'tilgungsrechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'etf-sparplan-anfaenger',
    title: 'ETF-Sparplan für Anfänger — Schritt für Schritt zum Vermögen',
    metaTitle: 'ETF-Sparplan für Anfänger 2026 — Einfach erklärt mit Beispielen',
    metaDescription: 'ETF-Sparplan starten: Was sind ETFs, welcher ist der richtige, und wie viel sollte man sparen? Der komplette Einsteigerguide 2026.',
    intro: 'Mit einem ETF-Sparplan können Sie schon ab 1 € monatlich ein Vermögen aufbauen. Dank Zinseszinseffekt und breiter Streuung ist es eine der einfachsten und effektivsten Geldanlagen. Hier erfahren Sie alles, was Sie als Einsteiger wissen müssen.',
    sections: [
      {
        title: 'Was ist ein ETF?',
        content: 'Ein ETF (Exchange Traded Fund) ist ein börsengehandelter Indexfonds. Er bildet einen Index wie den <strong>MSCI World</strong> (1.500 Unternehmen weltweit) oder den <strong>S&P 500</strong> (500 größte US-Unternehmen) nach. Statt einzelne Aktien zu kaufen, investieren Sie mit einem ETF automatisch in Hunderte oder Tausende Unternehmen gleichzeitig. Die Kosten liegen bei nur 0,1–0,3 % pro Jahr — ein Bruchteil aktiv verwalteter Fonds.',
      },
      {
        title: 'Warum ein Sparplan?',
        content: 'Ein Sparplan investiert automatisch jeden Monat einen festen Betrag. Das hat drei Vorteile: <strong>1. Cost-Average-Effekt:</strong> Bei niedrigen Kursen kaufen Sie mehr Anteile, bei hohen weniger — das glättet den Einstiegspreis. <strong>2. Disziplin:</strong> Sie sparen automatisch, ohne jeden Monat eine Entscheidung treffen zu müssen. <strong>3. Flexibilität:</strong> Sie können jederzeit erhöhen, pausieren oder aufhören.',
      },
      {
        title: 'So viel wird aus Ihrem Sparplan',
        content: 'Bei 200 € monatlich und 7 % durchschnittlicher Rendite (historischer Schnitt MSCI World): Nach <strong>10 Jahren: ca. 34.000 €</strong> (24.000 € eingezahlt), nach <strong>20 Jahren: ca. 104.000 €</strong> (48.000 € eingezahlt), nach <strong>30 Jahren: ca. 243.000 €</strong> (72.000 € eingezahlt). Der Zinseszinseffekt wird umso stärker, je länger Sie investiert bleiben. Berechnen Sie Ihr persönliches Ergebnis mit unserem Zinseszinsrechner.',
      },
      {
        title: 'Den richtigen ETF wählen',
        content: 'Für Einsteiger empfehlen sich breit gestreute Welt-ETFs: <strong>MSCI World</strong> (Industrieländer), <strong>MSCI ACWI</strong> (Industrie- + Schwellenländer) oder <strong>FTSE All-World</strong>. Achten Sie auf niedrige Kosten (TER unter 0,3 %), ausreichend Fondsvolumen (über 500 Mio. €) und ob der ETF thesaurierend (Dividenden werden reinvestiert) oder ausschüttend ist. Für maximalen Zinseszins wählen Sie thesaurierend.',
      },
      {
        title: 'Depot eröffnen und starten',
        content: 'Sie brauchen ein Wertpapierdepot bei einem Online-Broker. Neo-Broker wie Trade Republic oder Scalable Capital bieten kostenlose Depots und Sparpläne ab 1 €. Die Eröffnung dauert etwa 10 Minuten per Video-Ident. Danach richten Sie Ihren Sparplan ein: ETF auswählen, Betrag festlegen, Ausführungstag wählen — fertig. Ab jetzt wächst Ihr Vermögen automatisch.',
      },
    ],
    relatedRechner: 'zinseszinsrechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'steuererklaerung-tipps-2026',
    title: 'Steuererklärung 2026 — Die besten Tipps für maximale Erstattung',
    metaTitle: 'Steuererklärung 2026 — Tipps für maximale Steuererstattung',
    metaDescription: 'Steuererklärung 2026: Die besten Tipps und Tricks für eine hohe Erstattung. Welche Kosten absetzen? Welche Software nutzen? Fristen und Pflichten.',
    intro: 'Die durchschnittliche Steuererstattung in Deutschland liegt bei über 1.000 €. Trotzdem verzichten Millionen auf ihre Steuererklärung. Mit den richtigen Tipps holen Sie sich Ihr Geld zurück — oft in weniger als einer Stunde.',
    sections: [
      {
        title: 'Lohnt sich die Steuererklärung?',
        content: 'Kurz: Fast immer. Arbeitnehmer bekommen im Schnitt <strong>1.063 € zurück</strong>. Besonders lohnt es sich, wenn Sie Werbungskosten über 1.230 € haben (Fahrtkosten, Homeoffice, Fortbildung), Sonderausgaben wie Versicherungen oder Spenden geltend machen, außergewöhnliche Belastungen hatten (Krankheitskosten, Brille, Zahnersatz) oder haushaltsnahe Dienstleistungen bezahlt haben (Handwerker, Reinigung, Gartenpflege).',
      },
      {
        title: 'Die wichtigsten Pauschalen 2026',
        content: '<strong>Arbeitnehmer-Pauschbetrag:</strong> 1.230 € — wird automatisch abgezogen, auch ohne Nachweis. <strong>Homeoffice-Pauschale:</strong> 6 € pro Tag, max. 1.260 € (210 Tage). <strong>Entfernungspauschale:</strong> 0,30 € pro km (einfache Strecke) für die ersten 20 km, 0,38 € ab dem 21. km. <strong>Verpflegungspauschale:</strong> 14 € bei 8+ Stunden Abwesenheit, 28 € bei 24+ Stunden. <strong>Sonderausgaben-Pauschbetrag:</strong> 36 € (72 € für Ehepaare).',
      },
      {
        title: 'Fristen und Pflicht',
        content: 'Abgabefrist für die freiwillige Steuererklärung 2025: <strong>31. Dezember 2029</strong> (4 Jahre rückwirkend). Bei Pflichtveranlagung (z.B. Steuerklasse III/V, Nebeneinkünfte über 410 €): <strong>31. Juli 2026</strong>. Mit Steuerberater oder Lohnsteuerhilfeverein verlängert sich die Frist um 6–14 Monate. Tipp: Auch für vergangene Jahre können Sie noch Erstattungen holen — bis zu 4 Jahre rückwirkend.',
      },
      {
        title: 'Die beste Steuersoftware',
        content: 'Moderne Steuersoftware führt Sie Schritt für Schritt durch die Erklärung und findet automatisch Abzugsmöglichkeiten. <strong>WISO Steuer</strong> ist der Testsieger und Marktführer — mit automatischem Belegabruf, Plausibilitätsprüfung und Erstattungsrechner. Für einfache Fälle reicht auch eine App wie Taxfix. Mit Software erledigen Sie die Erklärung in 30–60 Minuten statt mehreren Stunden.',
      },
      {
        title: 'Handwerkerkosten und haushaltsnahe Dienstleistungen',
        content: 'Oft übersehen und besonders lukrativ: <strong>Handwerkerkosten</strong> sind zu 20 % absetzbar (max. 1.200 € Steuerersparnis pro Jahr). Das gilt für Renovierung, Reparatur, Modernisierung — aber nur den Arbeitslohn, nicht das Material. <strong>Haushaltsnahe Dienstleistungen</strong> wie Reinigung, Gartenpflege oder Winterdienst sind ebenfalls zu 20 % absetzbar (max. 4.000 € Steuerersparnis). Wichtig: Immer per Überweisung zahlen, nie bar.',
      },
    ],
    relatedRechner: 'brutto-netto-rechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'private-altersvorsorge',
    title: 'Private Altersvorsorge — So schließen Sie die Rentenlücke',
    metaTitle: 'Private Altersvorsorge 2026 — Rentenlücke berechnen & schließen',
    metaDescription: 'Private Altersvorsorge: Wie groß ist Ihre Rentenlücke? Welche Optionen gibt es? ETF, Riester, Rürup oder Betriebsrente — der komplette Überblick 2026.',
    intro: 'Die gesetzliche Rente wird für die meisten nicht reichen. Wer heute 3.000 € netto verdient, bekommt als Rente nur etwa 1.500 € — vor Steuern. Die Rentenlücke von 1.500 € monatlich muss privat geschlossen werden. Je früher Sie anfangen, desto leichter ist es.',
    sections: [
      {
        title: 'Wie groß ist Ihre Rentenlücke?',
        content: 'Die Rentenlücke ist die Differenz zwischen Ihrem heutigen Nettoeinkommen und der erwarteten gesetzlichen Rente. Faustregel: Die gesetzliche Rente ersetzt etwa <strong>48 % des letzten Bruttogehalts</strong> — Tendenz sinkend. Bei 3.500 € brutto sind das ca. 1.680 € Rente (vor Steuern und Krankenversicherung). Netto bleiben davon etwa 1.400 €. Wenn Sie 2.500 € zum Leben brauchen, fehlen monatlich 1.100 €. Berechnen Sie Ihre persönliche Rentenlücke mit unserem Rentenrechner.',
      },
      {
        title: 'ETF-Sparplan — der effizienteste Weg',
        content: 'Ein breit gestreuter ETF-Sparplan (z.B. auf den MSCI World) bietet langfristig die höchste Rendite bei vertretbarem Risiko: historisch <strong>7–9 % pro Jahr</strong> im Durchschnitt. Bei 300 € monatlich über 30 Jahre ergibt das ca. <strong>365.000 €</strong> Vermögen. Daraus können Sie sich im Alter monatlich ca. 1.200 € entnehmen — über 30 Jahre. Depots bei Neo-Brokern wie Trade Republic oder Scalable Capital sind kostenlos.',
      },
      {
        title: 'Betriebliche Altersvorsorge',
        content: 'Falls Ihr Arbeitgeber eine betriebliche Altersvorsorge (bAV) mit Zuschuss anbietet, sollten Sie diese nutzen. Der Arbeitgeber muss mindestens <strong>15 % Zuschuss</strong> auf die Entgeltumwandlung geben. Die Beiträge sind bis 302 € monatlich steuer- und sozialversicherungsfrei. Nachteil: Die Auszahlung ist im Alter voll steuerpflichtig und krankenversicherungspflichtig.',
      },
      {
        title: 'Riester und Rürup — für wen lohnt es sich?',
        content: '<strong>Riester</strong> lohnt sich vor allem für Familien (300 € Kinderzulage pro Kind) und Geringverdiener (175 € Grundzulage bei 60 € Mindestbeitrag). Für Gutverdiener ohne Kinder ist die Rendite oft mager. <strong>Rürup</strong> (Basisrente) lohnt sich für Selbstständige und Gutverdiener: Beiträge bis 27.566 € (2026) sind steuerlich absetzbar. Die Auszahlung erfolgt als lebenslange Rente.',
      },
      {
        title: 'Die richtige Strategie nach Alter',
        content: '<strong>20–35 Jahre:</strong> Voll auf ETF-Sparplan setzen — Sie haben 30+ Jahre Zeit, Schwankungen auszusitzen. Mindestens 15 % vom Netto investieren. <strong>35–50 Jahre:</strong> ETF-Sparplan fortführen, bAV mitnehmen wenn Arbeitgeber zuzahlt. Riester prüfen wenn Kinder da sind. <strong>50–65 Jahre:</strong> Schrittweise sicherer werden — Anleihen-Anteil erhöhen. Rürup kann steuerlich attraktiv sein. Immobilie bis Renteneintritt abbezahlt haben.',
      },
    ],
    relatedRechner: 'rentenrechner',
    publishDate: '2026-04-07',
  },
  {
    slug: 'pkv-gkv-vergleich',
    title: 'PKV oder GKV? So entscheiden Sie richtig 2026',
    metaTitle: 'PKV vs. GKV Vergleich 2026 — Wann lohnt sich die Private?',
    metaDescription: 'PKV oder GKV? Vergleich der Kosten, Leistungen und Voraussetzungen. Erfahren Sie, wann sich ein Wechsel in die private Krankenversicherung lohnt.',
    intro: 'Die Entscheidung zwischen gesetzlicher (GKV) und privater Krankenversicherung (PKV) hat langfristige finanzielle Folgen. Wir erklären die Unterschiede, Voraussetzungen und für wen sich die PKV wirklich lohnt.',
    sections: [
      {
        title: 'Wer darf in die PKV wechseln?',
        content: 'Angestellte dürfen in die PKV, wenn ihr Bruttojahresgehalt die <strong>Versicherungspflichtgrenze</strong> von 73.800 € (2026) überschreitet — und zwar ein ganzes Kalenderjahr lang. Selbstständige und Beamte können unabhängig vom Einkommen in die PKV wechseln. Beamte erhalten Beihilfe vom Dienstherrn und versichern nur den Restanteil privat, was die PKV besonders günstig macht.',
      },
      {
        title: 'PKV vs. GKV — die wichtigsten Unterschiede',
        content: '<strong>Beitragsberechnung:</strong> Die GKV berechnet Beiträge nach Einkommen (14,6% + Zusatzbeitrag). Die PKV kalkuliert nach Alter, Gesundheit und Leistungsumfang — unabhängig vom Einkommen. <strong>Leistungen:</strong> Die GKV bietet einen gesetzlichen Leistungskatalog. Die PKV ermöglicht individuelle Tarife mit Chefarztbehandlung, Einbettzimmer und Zahnersatz. <strong>Familienversicherung:</strong> In der GKV sind Kinder und nicht erwerbstätige Ehepartner kostenlos mitversichert. In der PKV zahlt jedes Familienmitglied einen eigenen Beitrag.',
      },
      {
        title: 'Wann lohnt sich die PKV finanziell?',
        content: 'Die PKV lohnt sich vor allem für: <strong>Gutverdiener ohne Kinder</strong> (niedriger Einstiegstarif, keine Familienversicherung nötig), <strong>Beamte</strong> (Beihilfe deckt 50-80%), <strong>Selbstständige</strong> mit stabilem Einkommen. Weniger geeignet ist die PKV für Familien mit vielen Kindern, Angestellte knapp über der Pflichtgrenze und Personen mit Vorerkrankungen. Nutzen Sie unseren PKV Rechner für einen individuellen Vergleich.',
      },
      {
        title: 'Beitragsentwicklung im Alter',
        content: 'PKV-Beiträge steigen im Alter — das ist der größte Nachteil. Moderne Tarife bilden <strong>Altersrückstellungen</strong>, die den Anstieg abfedern. Trotzdem sollten Sie mit Beitragssteigerungen von 2-3% pro Jahr rechnen. Ein Wechsel zurück in die GKV ist ab 55 nahezu unmöglich. Tipp: Wählen Sie einen Tarif mit hoher Selbstbeteiligung (z.B. 600 €/Jahr), um die Beiträge niedrig zu halten.',
      },
    ],
    relatedRechner: 'pkv-rechner',
    publishDate: '2026-04-11',
  },
  {
    slug: 'kfz-versicherung-wechseln',
    title: 'Kfz-Versicherung wechseln — So sparen Sie bis zu 50%',
    metaTitle: 'Kfz-Versicherung wechseln 2026 — Fristen, Tipps & Vergleich',
    metaDescription: 'Kfz-Versicherung wechseln und sparen. Kündigungsfristen, Sonderkündigungsrecht und die besten Tipps für günstigere Tarife 2026.',
    intro: 'Die Kfz-Versicherung ist einer der größten laufenden Posten für Autobesitzer. Ein jährlicher Vergleich lohnt sich fast immer — Einsparungen von 200-500 € pro Jahr sind keine Seltenheit.',
    sections: [
      {
        title: 'Kündigungsfristen und Stichtag',
        content: 'Die meisten Kfz-Versicherungen laufen vom 01.01. bis 31.12. Die Kündigungsfrist beträgt <strong>einen Monat</strong> zum Vertragsende — der Stichtag ist also der <strong>30. November</strong>. Die Kündigung muss schriftlich erfolgen und bis zu diesem Datum beim Versicherer eingegangen sein. Tipp: Kündigen Sie per Einschreiben oder Fax mit Sendebestätigung.',
      },
      {
        title: 'Sonderkündigungsrecht nutzen',
        content: 'Sie können Ihre Kfz-Versicherung außerordentlich kündigen bei: <strong>Beitragserhöhung</strong> ohne Leistungsverbesserung (4 Wochen nach Mitteilung), <strong>nach einem Schadensfall</strong> (4 Wochen nach Regulierung) oder <strong>bei Fahrzeugwechsel</strong>. Das Sonderkündigungsrecht ermöglicht einen sofortigen Wechsel unabhängig vom regulären Stichtag.',
      },
      {
        title: 'Was beeinflusst den Beitrag?',
        content: '<strong>Schadenfreiheitsklasse (SF-Klasse):</strong> Der wichtigste Faktor. Pro schadenfreiem Jahr steigen Sie eine Klasse auf — bis zu SF 35 mit über 30% Rabatt. <strong>Typklasse:</strong> Je nach Fahrzeugmodell unterschiedlich. SUVs und Sportwagen sind teurer. <strong>Regionalklasse:</strong> Großstädte sind teurer als ländliche Gebiete. <strong>Jährliche Fahrleistung:</strong> Weniger Kilometer = günstigerer Beitrag. <strong>Selbstbeteiligung:</strong> 300 € SB in der Vollkasko und 150 € in der Teilkasko senken den Beitrag erheblich.',
      },
      {
        title: 'Haftpflicht, Teilkasko oder Vollkasko?',
        content: '<strong>Kfz-Haftpflicht</strong> ist gesetzlich vorgeschrieben und deckt Schäden an Dritten ab. <strong>Teilkasko</strong> schützt zusätzlich vor Diebstahl, Glasbruch, Sturm und Wildunfall — empfehlenswert für Fahrzeuge bis ca. 10 Jahre. <strong>Vollkasko</strong> deckt auch selbst verschuldete Unfälle und Vandalismus — sinnvoll bei Neuwagen und Leasingfahrzeugen. Faustregel: Vollkasko für die ersten 3-5 Jahre, danach Teilkasko.',
      },
    ],
    relatedRechner: 'kfz-versicherung-rechner',
    publishDate: '2026-04-11',
  },
  {
    slug: 'abfindung-steuern-sparen',
    title: 'Abfindung versteuern — So nutzen Sie die Fünftelregelung',
    metaTitle: 'Abfindung Steuern 2026 — Fünftelregelung & Netto berechnen',
    metaDescription: 'Abfindung versteuern mit der Fünftelregelung. So berechnen Sie die Steuer auf Ihre Abfindung und sparen bares Geld. Mit Beispielrechnung.',
    intro: 'Eine Abfindung ist kein Geschenk vom Arbeitgeber — das Finanzamt kassiert kräftig mit. Dank der Fünftelregelung lässt sich die Steuerlast aber oft deutlich senken. Wir erklären, wie das funktioniert.',
    sections: [
      {
        title: 'So funktioniert die Fünftelregelung',
        content: 'Die Fünftelregelung nach § 34 EStG glättet die Steuerprogression: Die Abfindung wird rechnerisch auf <strong>5 Jahre verteilt</strong>. Das Finanzamt berechnet die Steuer auf ein Fünftel der Abfindung, multipliziert das Ergebnis mit 5 und vergleicht es mit der normalen Besteuerung. Der niedrigere Betrag wird angesetzt. Seit 2025 wird die Fünftelregelung nicht mehr vom Arbeitgeber, sondern erst über die <strong>Einkommensteuererklärung</strong> gewährt.',
      },
      {
        title: 'Beispielrechnung: Abfindung 30.000 €',
        content: 'Angenommen Sie verdienen 45.000 € brutto/Jahr und erhalten 30.000 € Abfindung. <strong>Ohne Fünftelregelung:</strong> Die gesamten 75.000 € werden als Einkommen versteuert — Steuerlast auf die Abfindung ca. 9.800 €. <strong>Mit Fünftelregelung:</strong> Nur 6.000 € (ein Fünftel) werden zum Einkommen addiert, die Mehrsteuer wird ×5 genommen — Steuerlast ca. 7.200 €. <strong>Ersparnis: ca. 2.600 €.</strong> Je höher die Abfindung im Verhältnis zum Gehalt, desto größer die Ersparnis.',
      },
      {
        title: 'Strategien zur Steueroptimierung',
        content: '<strong>Auszahlung ins Folgejahr verschieben:</strong> Wenn Sie Ende des Jahres gekündigt werden, verhandeln Sie eine Auszahlung im Januar — dann ist das reguläre Jahreseinkommen niedriger und die Fünftelregelung wirkt stärker. <strong>Einzahlung in die Altersvorsorge:</strong> Teile der Abfindung in eine betriebliche Altersvorsorge oder Rürup-Rente einzahlen. Diese Beiträge sind steuerlich absetzbar. <strong>Dispojahr nutzen:</strong> Ein Jahr ohne Einkommen (z.B. Sabbatical) minimiert die Steuerlast auf die Abfindung erheblich.',
      },
      {
        title: 'Abfindung und Arbeitslosengeld',
        content: 'Eine Abfindung führt <strong>nicht</strong> automatisch zur Sperrzeit beim Arbeitslosengeld. Voraussetzung: Die Kündigung ging vom Arbeitgeber aus und die Kündigungsfrist wurde eingehalten. Bei einem Aufhebungsvertrag droht eine 12-wöchige Sperrzeit, es sei denn der Arbeitgeber hätte ohnehin betriebsbedingt gekündigt. Tipp: Lassen Sie den Aufhebungsvertrag so formulieren, dass eine drohende betriebsbedingte Kündigung dokumentiert wird.',
      },
    ],
    relatedRechner: 'abfindungsrechner',
    publishDate: '2026-04-11',
  },
  {
    slug: 'erbschaftsteuer-freibetraege',
    title: 'Erbschaftsteuer Freibeträge 2026 — Alle Steuerklassen erklärt',
    metaTitle: 'Erbschaftsteuer Freibeträge 2026 — Tabelle & Steuerklassen',
    metaDescription: 'Erbschaftsteuer Freibeträge 2026: Übersicht aller Steuerklassen, Freibeträge und Steuersätze. Erfahren Sie, wie Sie Erbschaftsteuer sparen können.',
    intro: 'Ob Immobilie, Geldvermögen oder Unternehmensnachfolge — bei einer Erbschaft oder Schenkung kann erheblich Erbschaftsteuer anfallen. Die Höhe der Freibeträge hängt vom Verwandtschaftsgrad ab.',
    sections: [
      {
        title: 'Freibeträge nach Verwandtschaftsgrad',
        content: 'Die Freibeträge gelten sowohl für Erbschaften als auch Schenkungen: <strong>Ehepartner/Lebenspartner:</strong> 500.000 €. <strong>Kinder:</strong> 400.000 € pro Elternteil. <strong>Enkelkinder:</strong> 200.000 €. <strong>Eltern und Großeltern (bei Erbschaft):</strong> 100.000 €. <strong>Geschwister, Nichten, Neffen:</strong> 20.000 €. <strong>Nicht verwandte Personen:</strong> 20.000 €. Alles über dem Freibetrag wird nach der jeweiligen Steuerklasse besteuert.',
      },
      {
        title: 'Die drei Erbschaftsteuerklassen',
        content: '<strong>Steuerklasse I</strong> (7-30%): Ehepartner, Kinder, Enkelkinder, Eltern (bei Erbschaft). <strong>Steuerklasse II</strong> (15-43%): Geschwister, Nichten/Neffen, Schwiegereltern, Schwiegerkinder, geschiedene Ehepartner, Eltern (bei Schenkung). <strong>Steuerklasse III</strong> (30-50%): Alle übrigen Personen, z.B. Freunde, nicht verwandte Partner. Je niedriger die Steuerklasse, desto günstiger die Steuersätze.',
      },
      {
        title: 'Immobilien vererben — Sonderregeln',
        content: 'Für selbstgenutzte Immobilien gibt es eine <strong>komplette Steuerbefreiung</strong>: Ehepartner erben das Familienheim steuerfrei, wenn sie es mindestens 10 Jahre selbst bewohnen. Für Kinder gilt die Befreiung bis 200 m² Wohnfläche. Bei vermieteten Immobilien wird nur <strong>90% des Verkehrswerts</strong> angesetzt (10% Abschlag). Die Immobilienbewertung erfolgt nach dem Ertragswert- oder Sachwertverfahren.',
      },
      {
        title: 'Schenkung zu Lebzeiten als Steuerstrategie',
        content: 'Die Freibeträge erneuern sich alle <strong>10 Jahre</strong>. Durch gestaffelte Schenkungen zu Lebzeiten können Eltern große Vermögen steuerfrei übertragen: Ein Ehepaar kann pro Kind alle 10 Jahre 800.000 € (2 × 400.000 €) steuerfrei schenken. Bei zwei Kindern über 30 Jahre sind das 4,8 Millionen € — komplett steuerfrei. Beginnen Sie daher frühzeitig mit der Nachlassplanung.',
      },
    ],
    relatedRechner: 'erbschaftsteuer-rechner',
    publishDate: '2026-04-11',
  },
  {
    slug: 'gehaltsvergleich-deutschland',
    title: 'Durchschnittsgehalt Deutschland 2026 — So stehen Sie im Vergleich',
    metaTitle: 'Durchschnittsgehalt Deutschland 2026 — Gehalt nach Branche & Region',
    metaDescription: 'Durchschnittsgehalt Deutschland 2026: Verdienen Sie genug? Gehälter nach Branche, Region und Berufserfahrung im Vergleich.',
    intro: 'Was verdient Deutschland? Das Durchschnittsgehalt liegt 2026 bei ca. 45.800 € brutto im Jahr. Doch die Unterschiede nach Branche, Region und Qualifikation sind enorm.',
    sections: [
      {
        title: 'Durchschnittsgehalt und Median',
        content: 'Das <strong>Durchschnittsgehalt</strong> (arithmetisches Mittel) liegt bei ca. 45.800 € brutto/Jahr. Der <strong>Median</strong> (50% verdienen mehr, 50% weniger) liegt bei ca. 40.500 €. Der Median ist aussagekräftiger, da Spitzengehälter den Durchschnitt nach oben verzerren. Das entspricht einem Monatsgehalt von ca. 3.375 € brutto (Median) bzw. nach Steuern und Sozialabgaben ca. 2.200-2.500 € netto je nach Steuerklasse.',
      },
      {
        title: 'Gehalt nach Branche',
        content: 'Die bestverdienenden Branchen in Deutschland: <strong>Banken/Versicherungen:</strong> ca. 64.000 €, <strong>Pharmaindustrie:</strong> ca. 60.000 €, <strong>IT/Technologie:</strong> ca. 58.000 €, <strong>Automobilindustrie:</strong> ca. 56.000 €, <strong>Maschinenbau:</strong> ca. 54.000 €. Am unteren Ende: Gastronomie (ca. 28.000 €), Einzelhandel (ca. 32.000 €) und Pflege (ca. 36.000 €). Innerhalb einer Branche variieren Gehälter stark nach Position und Unternehmensgröße.',
      },
      {
        title: 'Gehaltsunterschiede nach Bundesland',
        content: 'Das <strong>West-Ost-Gefälle</strong> besteht weiter: In Hessen (höchstes Durchschnittsgehalt, ca. 52.000 €) verdient man rund 30% mehr als in Mecklenburg-Vorpommern (ca. 37.000 €). Topverdiener-Bundesländer: Hessen, Bayern, Baden-Württemberg, Hamburg. Die Lebenshaltungskosten sind in diesen Regionen allerdings ebenfalls höher — besonders Mieten in München, Frankfurt und Hamburg.',
      },
      {
        title: 'Einflussfaktoren auf das Gehalt',
        content: '<strong>Berufserfahrung:</strong> Mit 10+ Jahren steigt das Gehalt im Schnitt um 30-50% gegenüber dem Einstieg. <strong>Abschluss:</strong> Akademiker verdienen im Schnitt 17.000 € mehr pro Jahr als Nicht-Akademiker. Ein Master bringt ca. 4.000 € mehr als ein Bachelor. <strong>Unternehmensgröße:</strong> Konzerne (5.000+ Mitarbeiter) zahlen 20-30% mehr als KMUs. <strong>Verhandlung:</strong> Wer gut verhandelt, verdient 5-15% mehr — nutzen Sie unseren Gehaltsrechner, um Ihr Marktwert-Gehalt zu berechnen.',
      },
    ],
    relatedRechner: 'gehaltsrechner',
    publishDate: '2026-04-11',
  },
];
