import type { HowToStep } from '@/components/seo/json-ld';

/**
 * HowTo-Schemata pro Rechner. Wird in `CalculatorPageLayout` über die
 * `howTo`-Prop gerendert. Steps müssen Plain-Text sein (kein HTML, kein
 * Markdown). `totalTimeISO` im ISO-8601-Duration-Format (`PTxM`).
 *
 * Pflege-Hinweis: Wenn ein Form-Input neu hinzukommt oder umbenannt wird,
 * den entsprechenden Step hier nachziehen. Schema, das nicht zur UI passt,
 * ist Schema-Spam und schädigt die Crawl-Qualität.
 */
export interface HowToData {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTimeISO: string;
}

export const HOWTO_BY_SLUG: Record<string, HowToData> = {
  'abfindungsrechner': {
    name: 'Abfindung mit der Fünftelregelung berechnen',
    description: 'Schritt-für-Schritt-Anleitung zur Berechnung der Steuerlast auf eine Abfindung nach Fünftelregelung.',
    steps: [
      { name: 'Abfindungssumme eingeben', text: 'Tragen Sie die Bruttosumme der Abfindung ein, die Sie vom Arbeitgeber erhalten.' },
      { name: 'Reguläres Bruttojahresgehalt angeben', text: 'Geben Sie Ihr reguläres steuerpflichtiges Bruttojahresgehalt ohne Abfindung an.' },
      { name: 'Steuerklasse wählen', text: 'Wählen Sie Ihre Lohnsteuerklasse. Bei Verheirateten beeinflusst Steuerklasse III oder V den Splittingvorteil.' },
      { name: 'Kirchensteuerpflicht prüfen', text: 'Aktivieren Sie Kirchensteuer, wenn Sie Mitglied einer steuerberechtigten Religionsgemeinschaft sind.' },
      { name: 'Ergebnis ablesen', text: 'Sie sehen die Steuer mit und ohne Fünftelregelung, den Netto-Auszahlungsbetrag und die Ersparnis.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'baukosten-rechner': {
    name: 'Baukosten für ein Eigenheim kalkulieren',
    description: 'Anleitung zur Schätzung der Gesamtbaukosten inklusive Nebenkosten und Außenanlagen.',
    steps: [
      { name: 'Wohnfläche eingeben', text: 'Tragen Sie die geplante Wohnfläche in Quadratmetern ein.' },
      { name: 'Bauweise wählen', text: 'Wählen Sie zwischen Massivhaus oder Fertighaus. Massivbauten sind im Schnitt 5 bis 10 Prozent teurer als Fertighäuser.' },
      { name: 'Ausstattungsstandard festlegen', text: 'Entscheiden Sie zwischen einfacher, gehobener und luxuriöser Ausstattung. Der Standard wirkt sich erheblich auf Quadratmeterpreis und Folgekosten aus.' },
      { name: 'Keller und Garage einplanen', text: 'Wählen Sie, ob Sie einen Vollkeller, einen Carport oder eine Garage einplanen.' },
      { name: 'Gesamtkosten ablesen', text: 'Der Rechner zeigt Baukosten, Außenanlagen-Anteil und Baunebenkosten in einer Gesamtsumme.' },
    ],
    totalTimeISO: 'PT3M',
  },

  'bmi-rechner': {
    name: 'Body-Mass-Index nach WHO-Klassifikation berechnen',
    description: 'Anleitung zur Berechnung des BMI mit Einordnung in die WHO-Gewichtskategorien und Idealgewicht.',
    steps: [
      { name: 'Körpergröße eingeben', text: 'Tragen Sie Ihre Körpergröße in Zentimetern ein.' },
      { name: 'Gewicht eingeben', text: 'Geben Sie Ihr aktuelles Gewicht in Kilogramm an.' },
      { name: 'Geschlecht angeben', text: 'Wählen Sie männlich oder weiblich. Für Frauen wird ein leicht geringeres Idealgewicht ausgewiesen.' },
      { name: 'Alter eingeben', text: 'Tragen Sie Ihr Alter ein. Bei älteren Menschen verschiebt sich der gesunde BMI-Bereich nach oben.' },
      { name: 'Klassifikation und Idealgewicht ablesen', text: 'Sie sehen Ihren BMI, die WHO-Einordnung von Untergewicht bis Adipositas und einen Idealgewichts-Korridor.' },
    ],
    totalTimeISO: 'PT1M',
  },

  'brutto-netto-rechner': {
    name: 'Nettogehalt mit dem Brutto-Netto-Rechner berechnen',
    description: 'Schritt-für-Schritt-Anleitung zur Berechnung des Nettogehalts auf Basis der offiziellen Steuerformeln 2026.',
    steps: [
      { name: 'Bruttogehalt eingeben', text: 'Tragen Sie Ihr monatliches oder jährliches Bruttogehalt ein. Sonderzahlungen und geldwerte Vorteile bleiben zunächst unberücksichtigt.' },
      { name: 'Steuerklasse wählen', text: 'Wählen Sie Ihre Lohnsteuerklasse von I bis VI. Standardmäßig ist Steuerklasse I für Ledige eingestellt.' },
      { name: 'Bundesland auswählen', text: 'Geben Sie Ihr Bundesland an. Die Kirchensteuer beträgt 8 Prozent in Bayern und Baden-Württemberg, sonst 9 Prozent.' },
      { name: 'Krankenkassen-Zusatzbeitrag eintragen', text: 'Tragen Sie den individuellen Zusatzbeitrag Ihrer gesetzlichen Krankenkasse ein. Der durchschnittliche Zusatzbeitrag liegt bei rund 1,7 Prozent.' },
      { name: 'Kirchensteuerpflicht prüfen', text: 'Aktivieren Sie das Häkchen für Kirchensteuer, wenn Sie Mitglied einer steuerberechtigten Religionsgemeinschaft sind.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und alle Sozialversicherungsbeiträge sowie das resultierende Nettogehalt.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'bu-rechner': {
    name: 'Berufsunfähigkeitsversicherung-Beitrag schätzen',
    description: 'Anleitung zur Schätzung des Monatsbeitrags einer Berufsunfähigkeitsversicherung anhand Beruf, Alter und Rentenhöhe.',
    steps: [
      { name: 'Beruf wählen', text: 'Wählen Sie Ihre Berufsgruppe. Akademische und Bürotätigkeiten sind günstiger eingestuft als handwerkliche oder körperlich belastende Berufe.' },
      { name: 'Geburtsjahr eingeben', text: 'Tragen Sie Ihr Geburtsjahr ein. Je jünger der Versicherungsbeginn, desto niedriger der Beitrag.' },
      { name: 'Gewünschte BU-Rente festlegen', text: 'Wählen Sie die Höhe der monatlichen BU-Rente, die im Leistungsfall ausgezahlt werden soll.' },
      { name: 'Vertragslaufzeit angeben', text: 'Bestimmen Sie die Endalter-Wahl, üblich sind 65 oder 67 Jahre.' },
      { name: 'Beitrag ablesen', text: 'Der Rechner zeigt Monats- und Jahresbeitrag sowie eine Beitragsübersicht über die gesamte Laufzeit.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'buergergeld-rechner': {
    name: 'Bürgergeld-Anspruch nach Regelbedarfen 2026 berechnen',
    description: 'Anleitung zur Berechnung des Bürgergeld-Anspruchs für Bedarfsgemeinschaften.',
    steps: [
      { name: 'Haushaltsgröße angeben', text: 'Tragen Sie die Anzahl der Personen in Ihrer Bedarfsgemeinschaft ein, getrennt nach Erwachsenen und Kindern.' },
      { name: 'Alter der Kinder eintragen', text: 'Geben Sie das Alter der Kinder an. Die Regelbedarfe unterscheiden sich für unter 6, 6 bis 13 und 14 bis 17 Jahre.' },
      { name: 'Anrechenbare Einkünfte eingeben', text: 'Tragen Sie Erwerbseinkommen, ALG I, Unterhalt und sonstige Einkünfte der Bedarfsgemeinschaft ein.' },
      { name: 'Kosten der Unterkunft angeben', text: 'Geben Sie Bruttokaltmiete und Heizkosten ein. Übersteigen sie die örtliche Angemessenheitsgrenze, droht eine Kürzung.' },
      { name: 'Anspruch ablesen', text: 'Der Rechner zeigt Regelbedarfe, Mehrbedarfe, anrechenbares Einkommen und den verbleibenden Bürgergeld-Anspruch.' },
    ],
    totalTimeISO: 'PT3M',
  },

  'einkommensteuer-rechner': {
    name: 'Einkommensteuer und Solidaritätszuschlag 2026 berechnen',
    description: 'Anleitung zur Berechnung der Einkommensteuer nach offiziellem Einkommensteuertarif 2026.',
    steps: [
      { name: 'Bruttojahreseinkommen eingeben', text: 'Tragen Sie Ihr zu versteuerndes Bruttojahreseinkommen ein. Werbungskosten und Sonderausgaben können vorab abgezogen werden.' },
      { name: 'Veranlagungsart wählen', text: 'Wählen Sie zwischen Einzelveranlagung und Zusammenveranlagung. Bei Zusammenveranlagung wird der Splittingtarif angewendet.' },
      { name: 'Kirchensteuersatz angeben', text: 'Geben Sie an, ob Sie kirchensteuerpflichtig sind. Der Satz beträgt 8 oder 9 Prozent abhängig vom Bundesland.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Einkommensteuer, Solidaritätszuschlag, Kirchensteuer sowie Grenz- und Durchschnittssteuersatz.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'elterngeld-rechner': {
    name: 'Elterngeld nach BEEG 2026 berechnen',
    description: 'Anleitung zur Berechnung des Basis- und ElterngeldPlus-Anspruchs für Geburten ab 2026.',
    steps: [
      { name: 'Nettoeinkommen vor Geburt eingeben', text: 'Tragen Sie das durchschnittliche monatliche Nettoeinkommen der letzten zwölf Monate vor der Geburt ein.' },
      { name: 'Einkommen während der Elternzeit angeben', text: 'Geben Sie das geplante Einkommen während der Elternzeit ein. Bei null wird der volle Elterngeld-Anspruch berechnet.' },
      { name: 'Mehrlingsgeburt prüfen', text: 'Aktivieren Sie das Häkchen bei Zwillingen oder Mehrlingen. Pro weiteres Kind erhöht sich das Elterngeld um 300 Euro.' },
      { name: 'Geschwisterbonus aktivieren', text: 'Wenn ältere Geschwister im Haushalt leben, kann ein Geschwisterbonus von 10 Prozent gewährt werden.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt monatliches Elterngeld, Mehrlingszuschlag, Geschwisterbonus und Gesamtbetrag über die Bezugsdauer.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'erbschaftsteuer-rechner': {
    name: 'Erbschaftsteuer nach Steuerklassen und Freibeträgen berechnen',
    description: 'Anleitung zur Berechnung der Erbschaftsteuer abhängig von Verwandtschaftsgrad und Erbsumme.',
    steps: [
      { name: 'Bruttowert des Erbes eingeben', text: 'Tragen Sie den Verkehrswert von Vermögen, Immobilien und sonstigem Erbe ein, vor Abzug von Freibeträgen.' },
      { name: 'Verwandtschaftsgrad wählen', text: 'Wählen Sie das Verwandtschaftsverhältnis zum Erblasser. Ehegatten haben den höchsten Freibetrag von 500.000 Euro.' },
      { name: 'Hausrat und Versorgungsfreibetrag prüfen', text: 'Geben Sie an, ob Hausrat oder ein Versorgungsfreibetrag für Ehegatten und Kinder geltend gemacht wird.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Freibeträge, steuerpflichtigen Erwerb, Steuersatz und das Netto-Erbe.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'gehaltserhoehung-rechner': {
    name: 'Netto-Effekt einer Gehaltserhöhung berechnen',
    description: 'Anleitung zur Berechnung, wie viel von einer Bruttogehaltserhöhung tatsächlich netto übrig bleibt.',
    steps: [
      { name: 'Aktuelles Bruttogehalt eingeben', text: 'Tragen Sie Ihr derzeitiges Bruttojahresgehalt ein.' },
      { name: 'Erhöhung in Euro oder Prozent angeben', text: 'Geben Sie die Erhöhung als Eurobetrag oder Prozentsatz ein.' },
      { name: 'Steuerklasse wählen', text: 'Wählen Sie Ihre Lohnsteuerklasse. Sie bestimmt den Grenzsteuersatz auf den zusätzlichen Eurobetrag.' },
      { name: 'Kirchensteuer prüfen', text: 'Aktivieren Sie das Häkchen, wenn Sie kirchensteuerpflichtig sind.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Netto-Erhöhung pro Monat und Jahr, Anteil von Steuern und Sozialversicherung sowie den effektiven Grenzsteuersatz.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'gehaltsrechner': {
    name: 'Bruttogehalt in Nettolohn umrechnen',
    description: 'Anleitung zur Berechnung von Lohnsteuer, Sozialabgaben und Nettolohn aus dem Bruttogehalt.',
    steps: [
      { name: 'Bruttogehalt eingeben', text: 'Tragen Sie Ihr Bruttogehalt monatlich oder jährlich ein.' },
      { name: 'Steuerklasse wählen', text: 'Wählen Sie Ihre Lohnsteuerklasse. Standard ist Steuerklasse I.' },
      { name: 'Krankenkassen-Zusatzbeitrag angeben', text: 'Geben Sie den individuellen Zusatzbeitrag Ihrer Krankenkasse ein. Im Bundesschnitt liegt er bei 1,7 Prozent.' },
      { name: 'Kirchensteuer und Bundesland prüfen', text: 'Aktivieren Sie Kirchensteuer und wählen Sie das Bundesland. Bayern und Baden-Württemberg haben 8 Prozent, alle anderen 9 Prozent.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Lohnsteuer, Sozialabgaben, alle Abzüge und das Nettogehalt monatlich und jährlich.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'grundsteuer-rechner': {
    name: 'Grundsteuer 2026 nach Bundesland-Modell berechnen',
    description: 'Anleitung zur Berechnung der Grundsteuer nach Bundes- oder Ländermodellen seit der Reform 2025.',
    steps: [
      { name: 'Bundesland wählen', text: 'Wählen Sie Ihr Bundesland. Bayern, Baden-Württemberg, Hamburg, Hessen und Niedersachsen nutzen abweichende Modelle vom Bundesmodell.' },
      { name: 'Grundstücksart festlegen', text: 'Wählen Sie zwischen Einfamilienhaus, Zweifamilienhaus, Eigentumswohnung oder unbebautem Grundstück.' },
      { name: 'Grundstücksfläche und Wohnfläche eintragen', text: 'Tragen Sie Grundstücksfläche und Wohnfläche in Quadratmetern ein.' },
      { name: 'Bodenrichtwert eingeben', text: 'Geben Sie den vom Gutachterausschuss veröffentlichten Bodenrichtwert pro Quadratmeter ein.' },
      { name: 'Hebesatz angeben', text: 'Tragen Sie den Hebesatz Ihrer Gemeinde ein. Die Werte stehen meist auf der Webseite der Stadt oder Gemeinde.' },
      { name: 'Grundsteuer ablesen', text: 'Der Rechner zeigt Grundsteuerwert, Steuermessbetrag und die jährlich zu zahlende Grundsteuer.' },
    ],
    totalTimeISO: 'PT3M',
  },

  'inflationsrechner': {
    name: 'Kaufkraftverlust durch Inflation berechnen',
    description: 'Anleitung zur Berechnung, wie stark Inflation einen Geldbetrag über mehrere Jahre entwertet.',
    steps: [
      { name: 'Geldbetrag eingeben', text: 'Tragen Sie den Anfangsbetrag in Euro ein, dessen Kaufkraft Sie über die Zeit verfolgen wollen.' },
      { name: 'Inflationsrate angeben', text: 'Geben Sie die durchschnittliche jährliche Inflationsrate in Prozent ein. Der historische Mittelwert in Deutschland liegt bei rund 2 Prozent.' },
      { name: 'Zeitraum festlegen', text: 'Bestimmen Sie die Anzahl der Jahre, über die der Kaufkraftverlust berechnet wird.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Kaufkraft am Ende, kumulierten Wertverlust und eine Jahr-für-Jahr-Tabelle.' },
    ],
    totalTimeISO: 'PT1M',
  },

  'kalorienrechner': {
    name: 'Täglichen Kalorienbedarf nach Harris-Benedict berechnen',
    description: 'Anleitung zur Berechnung von Grundumsatz und Gesamtumsatz mit Zielkalorien für Gewicht halten oder reduzieren.',
    steps: [
      { name: 'Geschlecht wählen', text: 'Wählen Sie männlich oder weiblich. Männer haben im Schnitt einen höheren Grundumsatz.' },
      { name: 'Alter, Größe und Gewicht eingeben', text: 'Tragen Sie Alter, Körpergröße und aktuelles Gewicht ein.' },
      { name: 'Aktivitätslevel angeben', text: 'Wählen Sie zwischen sitzender, leichter, mittlerer, hoher und sehr hoher körperlicher Aktivität.' },
      { name: 'Ziel festlegen', text: 'Wählen Sie zwischen Gewicht halten, abnehmen oder zunehmen. Der Rechner berücksichtigt ein moderates Defizit oder Überschuss.' },
      { name: 'Ergebnis ablesen', text: 'Sie sehen Grundumsatz im Ruhezustand, Gesamtumsatz inklusive Aktivität und die empfohlenen Zielkalorien pro Tag.' },
    ],
    totalTimeISO: 'PT1M',
  },

  'kfz-versicherung-rechner': {
    name: 'Kfz-Versicherungsbeitrag schätzen',
    description: 'Anleitung zur Schätzung des Jahresbeitrags für Haftpflicht, Teil- und Vollkaskoversicherung.',
    steps: [
      { name: 'Fahrzeugdaten eingeben', text: 'Tragen Sie Erstzulassung, Fahrzeugklasse und Typklasse ein. Die Typklasse beeinflusst den Beitrag erheblich.' },
      { name: 'Schadenfreiheitsklasse angeben', text: 'Geben Sie Ihre aktuelle SF-Klasse ein. Eine höhere SF-Klasse senkt den Beitrag deutlich.' },
      { name: 'Region und Postleitzahl wählen', text: 'Wählen Sie Ihre Regionalklasse über die Postleitzahl. Großstädte sind meist teurer als ländliche Gebiete.' },
      { name: 'Versicherungsumfang wählen', text: 'Entscheiden Sie zwischen Haftpflicht, Haftpflicht plus Teilkasko oder Vollkasko mit oder ohne Selbstbeteiligung.' },
      { name: 'Beitrag ablesen', text: 'Der Rechner zeigt Jahresbeitrag pro Variante und einen Leistungsvergleich.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'kreditrechner': {
    name: 'Monatsrate und Gesamtkosten eines Annuitätenkredits berechnen',
    description: 'Anleitung zur Berechnung der monatlichen Rate, Tilgungsanteil und Gesamtzinsen eines Ratenkredits.',
    steps: [
      { name: 'Darlehensbetrag eingeben', text: 'Tragen Sie die Höhe des gewünschten Kredits in Euro ein.' },
      { name: 'Sollzinssatz angeben', text: 'Geben Sie den effektiven Jahreszins ein. Banken weisen ihn in jedem Kreditangebot aus.' },
      { name: 'Laufzeit festlegen', text: 'Bestimmen Sie die Laufzeit in Monaten oder Jahren. Längere Laufzeiten senken die Monatsrate, erhöhen aber die Gesamtzinsen.' },
      { name: 'Sondertilgung optional eintragen', text: 'Falls Sie jährliche Sondertilgungen planen, tragen Sie den Betrag ein.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Monatsrate, Tilgungsplan, Gesamtzinsen und Gesamtkosten.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'mwst-rechner': {
    name: 'Mehrwertsteuer aus Brutto- oder Nettobetrag berechnen',
    description: 'Anleitung zur Umrechnung von Netto- in Bruttobetrag oder umgekehrt mit 7 oder 19 Prozent Mehrwertsteuer.',
    steps: [
      { name: 'Berechnungsart wählen', text: 'Entscheiden Sie, ob Sie aus einem Nettobetrag den Bruttobetrag berechnen wollen oder umgekehrt aus brutto netto.' },
      { name: 'Betrag eingeben', text: 'Tragen Sie den Ausgangsbetrag in Euro ein.' },
      { name: 'Mehrwertsteuersatz wählen', text: 'Wählen Sie zwischen 19 Prozent regulär und 7 Prozent ermäßigt für Lebensmittel, Bücher und ÖPNV.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Netto, Mehrwertsteuer-Anteil und Brutto.' },
    ],
    totalTimeISO: 'PT1M',
  },

  'nebenkostenrechner': {
    name: 'Kaufnebenkosten beim Immobilienkauf kalkulieren',
    description: 'Anleitung zur Berechnung von Grunderwerbsteuer, Notar-, Grundbuch- und Maklerkosten.',
    steps: [
      { name: 'Kaufpreis eingeben', text: 'Tragen Sie den Kaufpreis der Immobilie ein. Ohne Grundstücksanteil bei Eigentumswohnungen, mit Grundstück bei Häusern.' },
      { name: 'Bundesland wählen', text: 'Wählen Sie das Bundesland. Die Grunderwerbsteuer variiert von 3,5 Prozent in Bayern und Sachsen bis 6,5 Prozent in Brandenburg, NRW, Saarland und Schleswig-Holstein.' },
      { name: 'Notar und Grundbuch automatisch berechnen', text: 'Notar- und Grundbuchkosten werden mit rund 1,5 Prozent des Kaufpreises pauschal angesetzt. Diese gesetzlich geregelten Sätze müssen Sie nicht selbst eintragen.' },
      { name: 'Maklercourtage angeben', text: 'Geben Sie an, ob ein Makler beteiligt ist. Seit Dezember 2020 teilen sich Käufer und Verkäufer die Provision von typisch 7,14 Prozent zu gleichen Teilen.' },
      { name: 'Gesamtkosten ablesen', text: 'Der Rechner zeigt Grunderwerbsteuer, Notar, Grundbuch, Makler und die Gesamtkaufnebenkosten in Euro und Prozent vom Kaufpreis.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'pfaendungsrechner': {
    name: 'Pfändbares Einkommen nach Pfändungstabelle 2026 berechnen',
    description: 'Anleitung zur Berechnung des pfändbaren Anteils des Nettoeinkommens unter Berücksichtigung von Unterhaltspflichten.',
    steps: [
      { name: 'Nettoeinkommen eingeben', text: 'Tragen Sie Ihr monatliches Nettoeinkommen ein. Sonderzahlungen und Spesen können separat behandelt werden.' },
      { name: 'Unterhaltspflichtige angeben', text: 'Geben Sie die Anzahl Personen an, denen Sie gesetzlich unterhaltspflichtig sind, also etwa Ehepartner und unterhaltspflichtige Kinder.' },
      { name: 'Pfändungsfreigrenze ablesen', text: 'Der Rechner ermittelt automatisch die für Sie geltende Freigrenze nach offizieller Pfändungstabelle 2026.' },
      { name: 'Ergebnis ablesen', text: 'Sie sehen den pfändungsfreien Betrag, den pfändbaren Betrag und das verbleibende Nettoeinkommen.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'pkv-rechner': {
    name: 'Beitrag zur privaten Krankenversicherung schätzen',
    description: 'Anleitung zur Schätzung eines PKV-Monatsbeitrags abhängig von Beruf, Alter und Tarifoptionen.',
    steps: [
      { name: 'Beruflichen Status wählen', text: 'Wählen Sie zwischen Angestellt, Selbstständig oder Beamter. Beamte zahlen aufgrund der Beihilfe deutlich weniger.' },
      { name: 'Geburtsjahr und Bruttoeinkommen eingeben', text: 'Tragen Sie Ihr Geburtsjahr und Bruttojahreseinkommen ein. Angestellte müssen die Versicherungspflichtgrenze überschreiten, um in die PKV wechseln zu können.' },
      { name: 'Tarifoptionen wählen', text: 'Wählen Sie Selbstbeteiligung, Krankenhaustarif (Ein- oder Zweibettzimmer) und Zahnersatzleistungen. Höhere Selbstbeteiligungen senken den Beitrag.' },
      { name: 'Beitrag ablesen', text: 'Der Rechner zeigt geschätzten Monatsbeitrag, Arbeitgeberzuschuss und den Eigenanteil über die Vertragslaufzeit.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'prozentrechner': {
    name: 'Prozente, Anteile und Veränderungen berechnen',
    description: 'Anleitung zur Berechnung von Prozentwerten, Grundwerten, Prozentsätzen und prozentualen Veränderungen.',
    steps: [
      { name: 'Berechnungsart wählen', text: 'Entscheiden Sie, ob Sie einen Prozentwert, Grundwert, Prozentsatz oder die prozentuale Veränderung zwischen zwei Werten berechnen wollen.' },
      { name: 'Bekannte Werte eingeben', text: 'Tragen Sie die zwei bekannten Werte ein. Der dritte Wert wird automatisch berechnet.' },
      { name: 'Ergebnis ablesen', text: 'Sie sehen das Ergebnis sowie die ausgeschriebene Rechenformel zur Nachvollziehbarkeit.' },
    ],
    totalTimeISO: 'PT1M',
  },

  'rentenrechner': {
    name: 'Voraussichtliche gesetzliche Rente und Rentenlücke berechnen',
    description: 'Anleitung zur Schätzung der monatlichen Rente bei Renteneintritt und der monatlichen Rentenlücke.',
    steps: [
      { name: 'Aktuelles Bruttojahresgehalt eingeben', text: 'Tragen Sie Ihr derzeitiges Bruttojahresgehalt ein. Daraus werden die Entgeltpunkte pro Jahr abgeleitet.' },
      { name: 'Geburtsjahr angeben', text: 'Geben Sie Ihr Geburtsjahr ein. Daraus berechnet der Rechner Ihren regulären Renteneintrittszeitpunkt.' },
      { name: 'Bisherige Beitragsjahre eintragen', text: 'Tragen Sie ein, wie viele Jahre Sie bereits in die gesetzliche Rentenversicherung eingezahlt haben.' },
      { name: 'Gewünschten Lebensstandard angeben', text: 'Geben Sie den monatlichen Bedarf an, den Sie im Ruhestand erreichen möchten. Daraus wird die Rentenlücke berechnet.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Entgeltpunkte, voraussichtliche Monatsrente, Renteneintrittszeitpunkt und die monatliche Rentenlücke.' },
    ],
    totalTimeISO: 'PT2M',
  },

  'stundenlohn-rechner': {
    name: 'Stundenlohn aus Monats- oder Jahresgehalt berechnen',
    description: 'Anleitung zur Umrechnung von Monats- oder Jahresgehalt in einen effektiven Stundenlohn.',
    steps: [
      { name: 'Gehalt eingeben', text: 'Tragen Sie Monats- oder Jahresgehalt brutto ein.' },
      { name: 'Wochenarbeitszeit angeben', text: 'Geben Sie Ihre vertragliche Wochenarbeitszeit in Stunden an. Vollzeit liegt typisch bei 38 bis 40 Stunden.' },
      { name: 'Urlaubs- und Feiertage berücksichtigen', text: 'Tragen Sie Anzahl Urlaubstage und gesetzliche Feiertage in Ihrem Bundesland ein. Der Rechner berücksichtigt sie als nicht-arbeitende Tage.' },
      { name: 'Stundenlohn ablesen', text: 'Sie sehen den effektiven Brutto-Stundenlohn, sowie Hochrechnung auf Monats- und Jahresgehalt.' },
    ],
    totalTimeISO: 'PT1M',
  },

  'tilgungsrechner': {
    name: 'Tilgungsplan einer Baufinanzierung berechnen',
    description: 'Anleitung zur Berechnung von Monatsrate, Restschuld und Gesamtlaufzeit eines Annuitätendarlehens.',
    steps: [
      { name: 'Darlehensbetrag eingeben', text: 'Tragen Sie das Nettodarlehen in Euro ein, ohne Disagio und Bearbeitungskosten.' },
      { name: 'Sollzinssatz und Tilgungssatz angeben', text: 'Geben Sie den gebundenen Sollzins und den Anfangstilgungssatz ein. Üblich sind 1 bis 3 Prozent Anfangstilgung.' },
      { name: 'Zinsbindung festlegen', text: 'Wählen Sie die Dauer der Zinsbindung in Jahren. Üblich sind 10, 15 oder 20 Jahre.' },
      { name: 'Sondertilgung optional eintragen', text: 'Falls möglich, geben Sie eine jährliche Sondertilgung ein, üblich sind 5 Prozent.' },
      { name: 'Tilgungsplan ablesen', text: 'Der Rechner zeigt Monatsrate, Tilgungsplan Jahr für Jahr, Restschuld am Ende der Zinsbindung und Gesamtlaufzeit bis zur Volltilgung.' },
    ],
    totalTimeISO: 'PT3M',
  },

  'unterhalt-rechner': {
    name: 'Kindesunterhalt nach Düsseldorfer Tabelle 2026 berechnen',
    description: 'Anleitung zur Berechnung des Mindest- und Zahlbetrags für Kindesunterhalt.',
    steps: [
      { name: 'Bereinigtes Nettoeinkommen eingeben', text: 'Tragen Sie das bereinigte Nettoeinkommen des Unterhaltspflichtigen ein, also nach Abzug berufsbedingter Aufwendungen und berücksichtigungsfähiger Schulden.' },
      { name: 'Anzahl und Alter der Kinder angeben', text: 'Geben Sie die Anzahl unterhaltsberechtigter Kinder und ihr Alter ein. Die Tabelle staffelt nach Altersgruppen 0 bis 5, 6 bis 11, 12 bis 17 und ab 18.' },
      { name: 'Selbstbehalt prüfen', text: 'Der Rechner berücksichtigt automatisch den notwendigen Selbstbehalt von 1.450 Euro für nicht-erwerbstätige und 1.750 Euro für erwerbstätige Unterhaltspflichtige.' },
      { name: 'Mangelfall einschätzen', text: 'Reicht das Einkommen nicht für alle Berechtigten aus, weist der Rechner einen Mangelfall aus und verteilt den verfügbaren Betrag anteilig.' },
      { name: 'Ergebnis ablesen', text: 'Sie sehen Tabellenbetrag, Zahlbetrag nach Kindergeldanrechnung, Selbstbehalt und Mangelfall-Status.' },
    ],
    totalTimeISO: 'PT3M',
  },

  'wohngeld-rechner': {
    name: 'Wohngeld-Anspruch nach WoGG 2026 berechnen',
    description: 'Anleitung zur Berechnung des Wohngeld-Anspruchs nach Wohngeldgesetz mit Klimakomponente.',
    steps: [
      { name: 'Haushaltsgröße angeben', text: 'Tragen Sie die Anzahl der Haushaltsmitglieder ein, die im Haushalt leben und beim Wohngeld berücksichtigt werden.' },
      { name: 'Bruttoeinkommen aller Mitglieder eingeben', text: 'Geben Sie das monatliche Brutto-Gesamteinkommen aller Haushaltsmitglieder ein.' },
      { name: 'Bruttokaltmiete eintragen', text: 'Tragen Sie die monatliche Bruttokaltmiete ein, also Grundmiete plus kalte Nebenkosten ohne Heizung und Strom.' },
      { name: 'Mietstufe wählen', text: 'Wählen Sie die Mietstufe Ihres Wohnorts von I für ländliche Regionen bis VII für teure Großstädte wie München.' },
      { name: 'Heizkosten und Klimakomponente berücksichtigen', text: 'Tragen Sie die Heizkosten ein. Die Klimakomponente wird abhängig von Wohnort und Energieträger automatisch ergänzt.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Wohngeld-Höchstbetrag, Heizkostenkomponente, Klimakomponente und den Auszahlungsbetrag.' },
    ],
    totalTimeISO: 'PT3M',
  },

  'zinseszinsrechner': {
    name: 'Vermögensaufbau mit Zinseszinseffekt berechnen',
    description: 'Anleitung zur Berechnung des Endkapitals durch Zinseszins bei Einmalanlage und monatlichen Sparraten.',
    steps: [
      { name: 'Startkapital eingeben', text: 'Tragen Sie das Anfangskapital ein, das einmalig angelegt wird.' },
      { name: 'Monatliche Sparrate festlegen', text: 'Geben Sie die regelmäßige monatliche Sparrate ein. Bei null wird nur das Startkapital verzinst.' },
      { name: 'Erwartete Rendite eintragen', text: 'Tragen Sie die durchschnittliche jährliche Rendite in Prozent ein. ETF-Welt-Aktien-Indizes haben historisch rund 7 Prozent erzielt.' },
      { name: 'Anlagedauer festlegen', text: 'Bestimmen Sie den Anlagezeitraum in Jahren.' },
      { name: 'Steuerbelastung optional aktivieren', text: 'Aktivieren Sie die Berücksichtigung von Abgeltungsteuer und Solidaritätszuschlag, um die Netto-Rendite zu sehen.' },
      { name: 'Ergebnis ablesen', text: 'Der Rechner zeigt Endkapital, eingezahltes Kapital, kumulierte Zinsen und gegebenenfalls Steuern.' },
    ],
    totalTimeISO: 'PT2M',
  },
};
