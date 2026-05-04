import type { CategoryId } from '@/lib/utils/constants';

/**
 * Hub-Definition pro Kategorie. Jede Hub-Page ist eine SEO-Pillar-Page für
 * einen Themen-Cluster: sie listet alle Rechner der Kategorie, beantwortet
 * grundlegende Fragen, verweist auf Ratgeber-Artikel und schickt Crawler-
 * Signal "Topical Authority" für Long-Tail-Suchanfragen rund um das Thema.
 *
 * URL-Pattern: /themen/<slug>. Slug bewusst gleich der CategoryId, damit
 * keine Mapping-Tabelle entsteht.
 */

export interface HubFAQ {
  question: string;
  answer: string;
}

export interface HubKeyConcept {
  title: string;
  text: string;
}

export interface HubData {
  slug: CategoryId;
  /** Browser-Titel + H1. */
  title: string;
  /** Meta-Description (~155 Zeichen). */
  metaDescription: string;
  /** Untertitel auf der Seite. */
  subtitle: string;
  /** Intro-Absätze als Plain-Text-Array. */
  intro: string[];
  /** 4-6 Schlüsselbegriffe mit Erklärung. */
  keyConcepts: HubKeyConcept[];
  /** 5-8 FAQs zur Kategorie. */
  faqs: HubFAQ[];
  /** Slugs der Ratgeber-Artikel, die thematisch zur Kategorie gehören. */
  ratgeberSlugs?: string[];
}

export const HUBS: Record<CategoryId, HubData> = {
  'gehalt-steuern': {
    slug: 'gehalt-steuern',
    title: 'Gehalt & Steuern berechnen — Brutto, Netto, Steuern und Sozialabgaben 2026',
    metaDescription:
      'Alle Rechner rund um Gehalt und Steuern: Brutto-Netto, Lohnsteuer, Einkommensteuer, Stundenlohn, Abfindung. Aktuelle Werte 2026, kostenlos & ohne Anmeldung.',
    subtitle: 'Brutto, Netto, Lohnsteuer, Einkommensteuer und Sozialabgaben — alle Rechner mit den offiziellen Werten 2026.',
    intro: [
      'Wer in Deutschland angestellt ist, sieht von seinem Bruttogehalt nur einen Teil als Nettolohn auf dem Konto. Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und vier Sozialversicherungsbeiträge schmälern den Betrag — bei Steuerklasse I und einem Bruttogehalt von 4.000 € pro Monat bleibt rund 60 % netto übrig.',
      'Welcher Anteil genau abgezogen wird, hängt von der Steuerklasse, dem Bundesland (Kirchensteuer-Satz), dem Krankenkassen-Zusatzbeitrag und vom Familienstand ab. Die Rechner in dieser Kategorie bilden alle Berechnungen nach den offiziellen Programmablaufplänen des Bundesfinanzministeriums (PAP 2026) ab.',
    ],
    keyConcepts: [
      {
        title: 'Lohnsteuer vs. Einkommensteuer',
        text: 'Die Lohnsteuer wird monatlich vom Arbeitgeber abgeführt, die Einkommensteuer am Jahresende über die Steuererklärung verrechnet. Beide nutzen denselben Steuertarif, aber die Lohnsteuer ist nur eine Vorauszahlung.',
      },
      {
        title: 'Steuerklassen I bis VI',
        text: 'Die Steuerklasse bestimmt den monatlichen Lohnsteuer-Abzug. Steuerklasse I für Ledige, II für Alleinerziehende, III/V für Ehepaare mit ungleichem Einkommen, IV für gleiche Einkommen, VI für Zweitjobs.',
      },
      {
        title: 'Sozialversicherungsbeiträge',
        text: 'Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung machen 2026 zusammen rund 21 % vom Brutto aus, hälftig getragen von Arbeitnehmer und Arbeitgeber. Bis zur Beitragsbemessungsgrenze.',
      },
      {
        title: 'Beitragsbemessungsgrenze 2026',
        text: 'Bis zu welchem Bruttogehalt Sozialabgaben erhoben werden: 5.812,50 € pro Monat für Kranken- und Pflegeversicherung, 8.450 € für Renten- und Arbeitslosenversicherung. Darüber bleibt das Brutto unberücksichtigt.',
      },
      {
        title: 'Solidaritätszuschlag',
        text: 'Seit 2021 entfällt der Soli für rund 90 % aller Steuerzahler. Ab einer Einkommensteuer von 18.130 € (Single) bzw. 36.260 € (Verheiratete) setzt eine Milderungszone ein, darüber 5,5 % auf die Einkommensteuer.',
      },
      {
        title: 'Kirchensteuer',
        text: 'Mitglieder einer steuerberechtigten Religionsgemeinschaft zahlen 8 % (Bayern, Baden-Württemberg) oder 9 % (alle anderen Bundesländer) der Lohn- bzw. Einkommensteuer als Kirchensteuer.',
      },
    ],
    faqs: [
      {
        question: 'Welcher Rechner ist für mich der richtige?',
        answer:
          'Wenn Sie wissen wollen, was vom Brutto übrig bleibt, nutzen Sie den Brutto-Netto-Rechner. Für die Jahressteuer ist der Einkommensteuer-Rechner richtig. Bei einer Abfindung lohnt der Abfindungsrechner mit Fünftelregelung. Selbstständige rechnen mit dem Stundenlohn-Rechner kalkulatorisch.',
      },
      {
        question: 'Stimmen die Rechner mit dem ELSTER-Rechner überein?',
        answer:
          'Ja. Alle Steuer-Rechner basieren auf dem offiziellen Programmablaufplan 2026 des Bundesfinanzministeriums. Abweichungen entstehen nur, wenn Sie individuelle Frei-/Pauschbeträge nutzen, die hier nicht eingegeben sind.',
      },
      {
        question: 'Muss ich Lohnsteuer und Einkommensteuer separat zahlen?',
        answer:
          'Nein. Die Lohnsteuer ist eine Vorauszahlung auf die Einkommensteuer. Am Jahresende wird über die Steuererklärung abgerechnet — entweder gibt es eine Rückzahlung oder eine Nachzahlung.',
      },
      {
        question: 'Wann lohnt sich ein Steuerklassenwechsel bei Verheirateten?',
        answer:
          'Die Kombination III/V lohnt sich, wenn ein Partner deutlich mehr verdient als der andere — der höher Verdienende zahlt dann monatlich weniger, der andere mehr. Am Jahresende gleicht die Steuererklärung das aus. IV/IV lohnt sich bei ähnlichem Einkommen.',
      },
      {
        question: 'Wie wirken sich Sonderzahlungen wie Weihnachts- oder Urlaubsgeld aus?',
        answer:
          'Sonderzahlungen werden nach der Sonstige-Bezüge-Methode versteuert: Das Jahreseinkommen wird hochgerechnet und der zusätzliche Steueranteil ermittelt. Das Brutto-Netto-Berechnungsergebnis ist daher für Sonderzahlungen nicht 1:1 übertragbar.',
      },
      {
        question: 'Wann muss ich eine Einkommensteuer-Erklärung abgeben?',
        answer:
          'Pflichtveranlagung tritt z. B. ein bei Steuerklassen-Kombinationen III/V, mehreren Arbeitgebern, Lohnersatzleistungen über 410 € (Krankengeld, Elterngeld), Nebenverdiensten über 410 € oder bei selbst beantragter Veranlagung.',
      },
    ],
    ratgeberSlugs: [],
  },

  'immobilien-finanzen': {
    slug: 'immobilien-finanzen',
    title: 'Immobilien & Finanzen berechnen — Kredit, Tilgung, Bauen 2026',
    metaDescription:
      'Rechner für Baufinanzierung, Kreditrate, Tilgungsplan, Baukosten, Nebenkosten und Zinseszins. Aktuelle Bauzinsen 2026, Schritt für Schritt.',
    subtitle: 'Bauen, Kaufen, Finanzieren — Annuitätenrate, Tilgungsplan, Kaufnebenkosten und Zinsentwicklung im Überblick.',
    intro: [
      'Beim Immobilienkauf liegt der eigentliche Kaufpreis nur bei rund 90 % der Gesamtkosten. Grunderwerbsteuer, Notar, Grundbucheintrag und Maklercourtage kommen obendrauf — abhängig vom Bundesland sind das zwischen 8 und 13 % zusätzlich.',
      'Wer finanzieren will, braucht einen klaren Blick auf Monatsrate, Tilgungsplan und Restschuld am Ende der Zinsbindung. Die Rechner in dieser Kategorie bilden Annuitätendarlehen, Sondertilgungen und Volltilgungs-Szenarien präzise ab.',
    ],
    keyConcepts: [
      {
        title: 'Annuitätendarlehen',
        text: 'Standard bei Baufinanzierungen: Die Rate bleibt konstant, der Zins-Anteil sinkt mit jedem Monat, der Tilgungs-Anteil steigt. Am Ende der Zinsbindung muss meist ein Restbetrag refinanziert werden.',
      },
      {
        title: 'Sollzinssatz vs. Effektivzinssatz',
        text: 'Der Sollzinssatz ist der reine Kapital-Zins. Der Effektivzinssatz enthält zusätzlich alle Nebenkosten der Finanzierung (Bearbeitungsgebühr, Disagio). Banken müssen den Effektivzins ausweisen — er ist der echte Vergleichswert.',
      },
      {
        title: 'Anfangstilgung 1 % vs. 3 %',
        text: 'Eine höhere Anfangstilgung reduziert die Gesamtlaufzeit deutlich: Bei 200.000 € Darlehen und 4 % Zins sind es bei 1 % Tilgung über 50 Jahre, bei 3 % Tilgung rund 25 Jahre bis zur vollen Rückzahlung.',
      },
      {
        title: 'Sondertilgung',
        text: 'Banken erlauben üblich 5 % p. a. zusätzliche Tilgung ohne Vorfälligkeitsentschädigung. Sondertilgung wirkt überproportional, weil der gesparte Zins-Anteil ebenfalls in die Rückzahlung fließt.',
      },
      {
        title: 'Grunderwerbsteuer',
        text: 'Variiert von 3,5 % (Bayern, Sachsen) bis 6,5 % (Brandenburg, NRW, Saarland, Schleswig-Holstein). Bemessungsgrundlage ist der notarielle Kaufpreis ohne Inventar.',
      },
      {
        title: 'Maklercourtage seit 2020',
        text: 'Käufer und Verkäufer teilen sich die Courtage zu gleichen Teilen, üblich 7,14 % gesamt (3,57 % je Seite). In einigen Märkten verlangen Verkäufer keine Provision mehr — Verhandlungssache.',
      },
    ],
    faqs: [
      {
        question: 'Wie viel Eigenkapital sollte ich beim Immobilienkauf einbringen?',
        answer:
          'Faustregel: Mindestens die Kaufnebenkosten (8-13 % je Bundesland) sollten aus Eigenkapital kommen, besser zusätzlich 20 % vom Kaufpreis. Vollfinanzierungen sind möglich, aber die Bank verlangt höhere Zinsaufschläge und prüft die Bonität strenger.',
      },
      {
        question: 'Welche Zinsbindungsdauer ist die richtige?',
        answer:
          'Bei steigenden Zinsen längere Bindung (15-20 Jahre), bei fallenden kürzere (10 Jahre). 2026 sind die Bauzinsen historisch wieder gestiegen — eine 10- oder 15-jährige Bindung ist in den meisten Szenarien sinnvoll.',
      },
      {
        question: 'Wann lohnt sich eine Umschuldung?',
        answer:
          'Wenn der aktuelle Marktzins mindestens 0,5 Prozentpunkte unter dem laufenden Zins liegt. Nach 10 Jahren Zinsbindung kann auch eine Umschuldung trotz laufender Bindung greifen — dann gilt das gesetzliche Sonderkündigungsrecht.',
      },
      {
        question: 'Wie funktioniert Zinseszins beim Vermögensaufbau?',
        answer:
          'Zinsen werden im Folgejahr selbst wieder verzinst. Bei 7 % Rendite verdoppelt sich Kapital nach rund 10 Jahren, nach 20 Jahren ist es vervierfacht. Der Effekt wirkt umso stärker, je länger die Anlagedauer ist.',
      },
      {
        question: 'Was kostet ein typischer Hausbau 2026?',
        answer:
          'Mittlere Ausstattung, 140 m² Wohnfläche: rund 3.500-4.500 € pro Quadratmeter Baukosten plus Außenanlagen plus Grundstück. Massivbauten sind im Schnitt 5-10 % teurer als Fertighäuser, aber langlebiger.',
      },
      {
        question: 'Wie wird die Grundsteuer 2025 berechnet?',
        answer:
          'Seit der Reform 2025 nutzen 11 Bundesländer das Bundesmodell (Wert + Wohnfläche + Hebesatz), 5 nutzen Ländermodelle (Bayern: nur Fläche; Hamburg, Niedersachsen: Flächen-Lage-Modell; Hessen, Baden-Württemberg: eigene Mischformen).',
      },
    ],
    ratgeberSlugs: [],
  },

  'vorsorge-soziales': {
    slug: 'vorsorge-soziales',
    title: 'Vorsorge & Soziales berechnen — Rente, BU, PKV, Bürgergeld 2026',
    metaDescription:
      'Rechner für gesetzliche Rente, Berufsunfähigkeit, PKV, Kfz, Elterngeld, Unterhalt, Bürgergeld, Wohngeld und Pfändung. Aktuelle Werte 2026.',
    subtitle: 'Renteneintritt, Versicherungsbeiträge, Familienleistungen und soziale Absicherung — Rechner mit den geltenden Sätzen 2026.',
    intro: [
      'Die gesetzliche Rente reicht für die meisten nicht aus, um den Lebensstandard zu halten. Wer aktuell 3.500 € brutto im Monat verdient, bekommt nach 35 Beitragsjahren rund 1.300 € gesetzliche Rente — die Lücke zum Wunsch-Lebensstandard liegt typischerweise bei 600-1.200 € pro Monat.',
      'Berufsunfähigkeit, Krankheit, Familiengründung und Unterhaltspflichten verändern die Situation zusätzlich. Die Rechner in dieser Kategorie helfen, Beiträge, Ansprüche und Lücken auf Basis der offiziellen Werte 2026 zu kalkulieren.',
    ],
    keyConcepts: [
      {
        title: 'Entgeltpunkte',
        text: 'Wer ein Jahr lang das Durchschnittseinkommen aller Versicherten verdient, sammelt einen Entgeltpunkt. Bei Renteneintritt wird die Summe der Punkte mit dem aktuellen Rentenwert (West 2026: 39,32 €) multipliziert.',
      },
      {
        title: 'Renteneintritt mit 67',
        text: 'Für Geburtsjahrgänge ab 1964 gilt der reguläre Renteneintritt mit 67. Frühere Eintritte sind mit Abschlägen möglich (0,3 % pro Vormonat = 14,4 % bei 4 Jahren früher). 45 Beitragsjahre erlauben den abschlagsfreien Bezug ab 65.',
      },
      {
        title: 'Berufsunfähigkeit',
        text: 'Liegt vor, wenn der zuletzt ausgeübte Beruf zu mindestens 50 % nicht mehr ausgeübt werden kann. Die gesetzliche Erwerbsminderungsrente reicht nur ein Bruchteil — eine private BU ist die Standard-Empfehlung für alle unter 60.',
      },
      {
        title: 'Düsseldorfer Tabelle',
        text: 'Standard für die Berechnung des Kindesunterhalts. Gestaffelt nach Einkommen des Unterhaltspflichtigen und Alter des Kindes. Mindestunterhalt 2026: 482 € (0-5 Jahre), 554 € (6-11), 649 € (12-17).',
      },
      {
        title: 'Bürgergeld-Regelbedarf',
        text: 'Pauschale Bedarfssätze: 563 € für Alleinstehende, 506 € für Partner, 357 € für Kinder 14-17, 390 € für 6-13 Jahre, 357 € für unter 6. Plus angemessene Kosten für Unterkunft und Heizung.',
      },
      {
        title: 'Elterngeld Basis und Plus',
        text: '67 % vom Netto-Einkommen vor Geburt, mindestens 300 €, maximal 1.800 €. Basis-Elterngeld bis 14 Monate, ElterngeldPlus halbiert den Betrag, läuft aber doppelt so lang. Mehrlinge erhöhen um 300 € pro weiteres Kind.',
      },
    ],
    faqs: [
      {
        question: 'Wie groß ist meine Rentenlücke wirklich?',
        answer:
          'Faustformel: 80 % des letzten Netto-Einkommens als Wunsch-Rente, davon die voraussichtliche gesetzliche Rente abziehen. Bei 3.500 € Netto-Wunsch und 1.300 € gesetzlicher Rente: 2.200 € pro Monat müssten privat geschlossen werden — dafür braucht es ca. 500.000 € Kapital bei 4 % Auszahlung.',
      },
      {
        question: 'Brauche ich eine private Krankenversicherung?',
        answer:
          'Pflicht-Versicherte können ab 73.800 € Jahreseinkommen (2026) wechseln. Für Beamte und Selbstständige ist die PKV oft günstiger und leistungsstärker. Im Alter steigen die Beiträge — der Wechsel zurück in die GKV ist nach 55 nicht mehr möglich.',
      },
      {
        question: 'Wann lohnt sich eine BU-Versicherung?',
        answer:
          'Für jeden, der seinen Lebensunterhalt vom Beruf bestreitet, lohnt sie sich — also fast für jeden zwischen 18 und 60. Akademische Berufe zahlen ab 50 € pro Monat für 2.000 € BU-Rente, handwerkliche Berufe etwa das 2-3-fache.',
      },
      {
        question: 'Was zählt als bereinigtes Nettoeinkommen beim Unterhalt?',
        answer:
          'Netto minus berufsbedingte Aufwendungen (5 % pauschal oder belegt), minus berücksichtigungsfähige Schulden (z. B. eheprägende Kredite), minus Altersvorsorge bis 4 % des Brutto. Aus dem bereinigten Nettoeinkommen wird die Tabellenspalte ermittelt.',
      },
      {
        question: 'Wie hoch ist der Pfändungsfreibetrag 2026?',
        answer:
          'Für Alleinstehende ohne Unterhaltspflichten: 1.499,99 € pro Monat sind unpfändbar. Pro unterhaltsberechtigter Person erhöht sich der Freibetrag um 502,50 € für die erste, 280,00 € für jede weitere Person.',
      },
      {
        question: 'Wer hat Anspruch auf Wohngeld?',
        answer:
          'Haushalte mit geringem Einkommen, die nicht bereits Bürgergeld oder Sozialhilfe beziehen. Anspruchsgrenze hängt von Haushaltsgröße, Mietstufe (I-VII) und Bruttoeinkommen ab. Seit 2023 ist die Klimakomponente Bestandteil des Wohngelds.',
      },
    ],
    ratgeberSlugs: [],
  },

  'alltag-tools': {
    slug: 'alltag-tools',
    title: 'Alltag & Tools — Prozent, MwSt, BMI, Inflation, Kalorien',
    metaDescription:
      'Hilfreiche Rechner für den Alltag: Prozent, Mehrwertsteuer, BMI, Kalorien und Inflation. Schnell, kostenlos und ohne Anmeldung.',
    subtitle: 'Schnelle Tools für Alltagsfragen — Prozent, MwSt, Body-Mass-Index, Kalorienbedarf und Inflations-Wertverlust.',
    intro: [
      'Manche Berechnungen kommen täglich vor: Prozentwerte umrechnen, Mehrwertsteuer aus einem Bruttobetrag herausziehen, BMI prüfen oder den Wertverlust eines Geldbetrags durch Inflation einschätzen. Die Rechner in dieser Kategorie sind bewusst minimalistisch — Eingabe, Ergebnis, fertig.',
      'Auch wenn die Berechnungen mathematisch einfach sind, sparen die Rechner Tipparbeit und vermeiden Flüchtigkeitsfehler. Alle Tools laufen direkt im Browser, ohne Tracking und ohne Registrierung.',
    ],
    keyConcepts: [
      {
        title: 'Prozent vs. Prozentpunkt',
        text: 'Steigt ein Zinssatz von 2 % auf 3 %, ist das eine Erhöhung um einen Prozentpunkt — oder um 50 % relativ. Die Unterscheidung ist wichtig in der Wirtschaftsberichterstattung und bei Tarifvergleichen.',
      },
      {
        title: 'Mehrwertsteuer 19 % vs. 7 %',
        text: 'Regelsatz 19 %, ermäßigter Satz 7 % (Lebensmittel, Bücher, ÖPNV). Bei einem Bruttobetrag von 119 € regulär enthalten 19 € MwSt — also 1/(1+19/100) × 100 % als Netto-Anteil.',
      },
      {
        title: 'BMI und Aussagekraft',
        text: 'Body-Mass-Index = Gewicht / (Größe in m)². Über 25 Übergewicht, über 30 Adipositas. Die WHO-Kategorien gelten ab 19 Jahren — bei Sportlern mit hoher Muskelmasse ist der BMI nur eingeschränkt aussagekräftig.',
      },
      {
        title: 'Grundumsatz nach Harris-Benedict',
        text: 'Energiebedarf im Ruhezustand: für Männer rund 24 kcal pro Kilogramm Körpergewicht und Tag, für Frauen 22 kcal. Dazu kommt der Aktivitäts-Faktor (1,2 sitzend bis 1,9 sehr aktiv) für den Gesamtumsatz.',
      },
      {
        title: 'Inflation und Kaufkraft',
        text: 'Bei 3 % Inflation pro Jahr verliert ein heute fester Geldbetrag in 10 Jahren rund 26 % seiner Kaufkraft — aus 10.000 € werden Kaufkraft-Äquivalente von rund 7.400 €. Sparbuch-Zinsen liegen meist unter der Inflationsrate.',
      },
    ],
    faqs: [
      {
        question: 'Welche Inflationsrate sollte ich für Langfristrechnungen ansetzen?',
        answer:
          'Der EZB-Zielwert liegt bei 2 % pro Jahr. Der historische Durchschnitt in Deutschland seit 1970 beträgt rund 2,5 %. Für konservative Planungen über 20+ Jahre ist eine Annahme von 2,5-3 % realistisch.',
      },
      {
        question: 'Wie genau ist der BMI-Wert?',
        answer:
          'Für die Allgemeinbevölkerung ab 19 Jahren ist der BMI ein guter Indikator. Bei Bodybuildern, Profisportlern oder älteren Menschen über 65 ist er nur eingeschränkt aussagekräftig — Muskelmasse zählt im BMI wie Fett, was zu falschen Adipositas-Klassifikationen führen kann.',
      },
      {
        question: 'Brauche ich für ein Kaloriendefizit eine genaue Messung?',
        answer:
          'Nein. 500 kcal Defizit pro Tag ergeben rund 0,5 kg Gewichtsverlust pro Woche. Wer den Grundumsatz +/- 200 kcal genau schätzt, kommt zu validen Ergebnissen. Wichtiger als Genauigkeit ist Konstanz über mehrere Wochen.',
      },
      {
        question: 'Wie rechne ich Brutto in Netto bei der Mehrwertsteuer um?',
        answer:
          'Netto = Brutto / 1,19 bei 19 % MwSt, oder Netto = Brutto / 1,07 bei 7 %. Die Differenz zwischen Brutto und Netto ist der Mehrwertsteuer-Anteil.',
      },
      {
        question: 'Wann lohnt sich eine prozentuale Erhöhung gegenüber einem festen Eurobetrag?',
        answer:
          'Bei Gehaltsverhandlungen sind prozentuale Erhöhungen meist günstiger, weil sie zukünftige Erhöhungen multiplikativ vergrößern. Bei Tarifverträgen mit jährlichem Inflations-Ausgleich sind feste Eurobeträge in einkommensschwachen Gruppen oft fairer.',
      },
    ],
    ratgeberSlugs: [],
  },
};
