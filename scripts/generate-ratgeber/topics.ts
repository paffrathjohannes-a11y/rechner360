/**
 * Thema-Pool für AI-generierte Ratgeber-Artikel.
 *
 * Jedes Thema wird:
 *  - mit bestehenden Slugs dedupliziert (keine doppelten Artikel)
 *  - nach Saison priorisiert (aktueller Monat in `season.months`)
 *  - nach Urgency gewichtet (current > seasonal > evergreen)
 *
 * Neue Themen einfach unten anhängen — je mehr, desto mehr Variation über Monate.
 */

export interface RatgeberTopic {
  /** Stabile ID, keine Relation zum Slug — für Tracking, welche Topics zuletzt lief */
  id: string;
  /** Arbeitstitel (Claude darf den natürlicher formulieren) */
  titleSeed: string;
  /** Konkreter Fokus — steuert den Artikel-Winkel */
  angle: string;
  /** Slug des Rechners, der im Artikel verlinkt wird */
  relatedRechner: string;
  /** Saison-Fenster (1–12). Ohne Angabe = evergreen. */
  season?: { months: number[] };
  /** evergreen = zeitlos, seasonal = saisonaler Peak, current = topaktuell */
  urgency?: 'evergreen' | 'seasonal' | 'current';
}

export const RATGEBER_TOPICS: RatgeberTopic[] = [
  // ─── Gehalt & Steuern ────────────────────────────────────────────────────
  {
    id: 'pendlerpauschale-2026',
    titleSeed: 'Pendlerpauschale 2026 — Was Sie absetzen können',
    angle: 'Entfernungspauschale 30 Cent/Erhöhung ab 21. km, Höchstbetrag 4.500 €, Ausnahmen (Auto), Nachweise, Home-Office-Tage kombinieren',
    relatedRechner: 'brutto-netto-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'home-office-pauschale',
    titleSeed: 'Home-Office-Pauschale 2026 optimal nutzen',
    angle: '6 €/Tag, max. 1.260 €/Jahr (210 Tage), auch ohne separates Arbeitszimmer, Kombination mit Arbeitsmitteln, was Finanzamt akzeptiert',
    relatedRechner: 'brutto-netto-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'werbungskosten-optimieren',
    titleSeed: 'Werbungskosten-Pauschale ausreizen — 12 absetzbare Posten',
    angle: 'Arbeitnehmer-Pauschbetrag 1.230 €, was darüber hinaus geht: Arbeitsmittel, Fachliteratur, Fortbildung, doppelte Haushaltsführung, Umzug aus beruflichen Gründen',
    relatedRechner: 'einkommensteuer-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'firmenwagen-versteuern',
    titleSeed: 'Firmenwagen 2026 — 1-%-Regel oder Fahrtenbuch?',
    angle: 'Geldwerter Vorteil 1 %/Monat, 0,5 % Hybrid, 0,25 % E-Auto; wann sich Fahrtenbuch lohnt (Vielprivatfahrer vs. Wenig), Bruttolistenpreis-Basis',
    relatedRechner: 'gehaltsrechner',
    urgency: 'evergreen',
  },
  {
    id: 'minijob-midijob-2026',
    titleSeed: 'Mini-Job vs. Midi-Job 2026 — die Grenzen',
    angle: 'Minijob bis 538 €, Midijob 538,01–2.000 € mit Übergangsbereich (Formel F=0,6846), SV-Entlastung für Arbeitnehmer',
    relatedRechner: 'brutto-netto-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'steuerfreie-benefits',
    titleSeed: '12 steuerfreie Gehaltsextras 2026',
    angle: 'Jobticket, Essensgutschein (7,23 €/Tag), Kita-Zuschuss, BAV, Jobrad, Erholungsbeihilfe, Sachbezug 50 €/Monat — alles statt Bruttogehalt',
    relatedRechner: 'gehaltsrechner',
    urgency: 'evergreen',
  },
  {
    id: 'kirchensteuer-austritt-rechnen',
    titleSeed: 'Kirchensteuer 2026 — lohnt der Austritt finanziell?',
    angle: '8 % in BY/BW, 9 % sonst; konkrete Berechnung bei 3.000 / 5.000 / 8.000 € brutto; Austrittsprozess, Folgen (Taufe, Trauung)',
    relatedRechner: 'einkommensteuer-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'elterngeld-richtig-planen',
    titleSeed: 'Elterngeld 2026 — 5 Stellschrauben für höheres Netto',
    angle: 'Bemessungszeitraum 12 Monate vor Geburt, Steuerklasse 7 Monate vorher wechseln, Partnermonate, Geschwisterbonus, 200k-Grenze',
    relatedRechner: 'elterngeld-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'abfindung-fuenftelregelung',
    titleSeed: 'Abfindung 2026 steueroptimal — die Fünftelregelung erklärt',
    angle: '§34 EStG, Arbeitgeber zieht nicht mehr vor (seit 2025), Erstattung über ESt-Erklärung, Beispielrechnung 20k / 50k Abfindung',
    relatedRechner: 'abfindungsrechner',
    urgency: 'evergreen',
  },
  {
    id: 'gehaltsverhandlung-argumente',
    titleSeed: 'Gehaltsverhandlung 2026 — Marktwert und Argumente',
    angle: 'Durchschnittsgehalt-Daten, Inflation 2024/25 als Argument, Benefits als Alternative, Verhandlungstiming',
    relatedRechner: 'gehaltsrechner',
    urgency: 'evergreen',
  },

  // ─── Immobilien & Finanzen ───────────────────────────────────────────────
  {
    id: 'bauzinsen-prognose-2026',
    titleSeed: 'Bauzinsen 2026 — Wohin geht die Reise?',
    angle: 'Aktuelle EZB-Leitzinsen, Bundesanleihen-Rendite, Spread, Experten-Prognosen, Handlungsempfehlung: jetzt abschließen oder warten',
    relatedRechner: 'tilgungsrechner',
    urgency: 'current',
  },
  {
    id: 'sondertilgung-strategie',
    titleSeed: 'Sondertilgung clever planen — 3 Strategien',
    angle: 'Anfangseffekt (hohe Zinsersparnis), Laufzeit verkürzen vs. Rate senken, optimaler Zeitpunkt (Bonus/Erbe)',
    relatedRechner: 'tilgungsrechner',
    urgency: 'evergreen',
  },
  {
    id: 'anschlussfinanzierung-zeitpunkt',
    titleSeed: 'Anschlussfinanzierung 2026 — Forward-Darlehen sinnvoll?',
    angle: '36 Monate im Voraus, Zinsaufschlag vs. Sicherheit, § 489 BGB Sonderkündigung nach 10 Jahren, Prolongation vs. Wechsel',
    relatedRechner: 'tilgungsrechner',
    urgency: 'evergreen',
  },
  {
    id: 'immobilienkauf-eigenkapital',
    titleSeed: 'Immobilienkauf 2026 — Wie viel Eigenkapital ist nötig?',
    angle: '20 % Kaufpreis + Nebenkosten (10–15 %), 110-%-Finanzierung = sehr teuer, Bausparen / KfW / Familiendarlehen als Ergänzung',
    relatedRechner: 'baukosten-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'grunderwerbsteuer-bundesland',
    titleSeed: 'Grunderwerbsteuer 2026 — Warum Bayern günstiger ist',
    angle: '3,5 % (BY) bis 6,5 % (NRW, Brandenburg, Saarland, SH); Gestaltung über Kaufpreisaufteilung Gebäude/Mobiliar; Anfall nur beim Immobilienkauf',
    relatedRechner: 'grundsteuer-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'kredit-ohne-schufa',
    titleSeed: 'Kredit ohne Schufa 2026 — seriöse Optionen',
    angle: 'P2P-Plattformen, Schweizer Kredite, Bürgen-Varianten; hohe Zinsen als Risiko, bessere Alternativen (Dispo schließen, Umschuldung)',
    relatedRechner: 'kreditrechner',
    urgency: 'evergreen',
  },
  {
    id: 'kredit-laufzeit-wahl',
    titleSeed: 'Kredit-Laufzeit optimal wählen — 12, 36, 60 oder 84 Monate?',
    angle: 'Kurz = weniger Zinsen, hohe Rate; lang = teurer, entspanntere Monatsbelastung; Break-Even-Kalkulation',
    relatedRechner: 'kreditrechner',
    urgency: 'evergreen',
  },

  // ─── Vorsorge & Investment ───────────────────────────────────────────────
  {
    id: 'rentenluecke-schliessen-40',
    titleSeed: 'Rentenlücke mit 40 schließen — So viel müssen Sie sparen',
    angle: 'Typische Lücke 30–50 % des Nettos; konkrete Beispiele: 50€/100€/200€ monatlich × 27 Jahre bei 5 %, ETF vs. private Rente',
    relatedRechner: 'rentenrechner',
    urgency: 'evergreen',
  },
  {
    id: 'zinseszins-kleine-betraege',
    titleSeed: 'Zinseszins: Warum 50 € monatlich ausreichen',
    angle: 'Demonstrativ: 50 € × 40 Jahre bei 6 % = ~95.000 €; Start früh statt viel, Sparplan-Disziplin, ETF vs. Tagesgeld-Rendite',
    relatedRechner: 'zinseszinsrechner',
    urgency: 'evergreen',
  },
  {
    id: 'etf-vs-rente',
    titleSeed: 'ETF-Sparplan vs. private Rente — Was lohnt 2026 mehr?',
    angle: 'Rendite-Vergleich über 30 Jahre, steuerliche Behandlung (Abgeltungssteuer vs. Rentenbesteuerung), Flexibilität, Kosten',
    relatedRechner: 'zinseszinsrechner',
    urgency: 'evergreen',
  },
  {
    id: 'riester-2026-noch-sinnvoll',
    titleSeed: 'Riester 2026 — Lohnt sich das noch?',
    angle: 'Zulagen 175 € + 300 € pro Kind, Steuervorteile, Kritik (hohe Kosten, geringe Rendite), wann sich Riester noch rechnet (kinderreiche Familien)',
    relatedRechner: 'rentenrechner',
    urgency: 'evergreen',
  },
  {
    id: 'ruerup-selbststaendige',
    titleSeed: 'Rürup-Rente für Selbstständige 2026',
    angle: 'Steuerlich ab 2023 voll absetzbar (§10 EStG), lebenslange Rente, Vererbbarkeit, Vergleich mit ETF/freiwilliger GRV',
    relatedRechner: 'rentenrechner',
    urgency: 'evergreen',
  },
  {
    id: 'bav-entgeltumwandlung',
    titleSeed: 'Betriebliche Altersvorsorge 2026 — Wann sich BAV lohnt',
    angle: 'Steuer- und SV-Ersparnis, AG-Zuschuss 15 %, Nachteil: SV-Beitrag auf Rente (Doppelverbeitragung ab 176,75 €/Mon 2026), Direktversicherung',
    relatedRechner: 'rentenrechner',
    urgency: 'evergreen',
  },
  {
    id: 'inflation-vermoegensschutz',
    titleSeed: 'Inflationsschutz 2026 — 5 Anlageklassen im Vergleich',
    angle: 'Aktien/ETF, Immobilien, Gold, inflationsindexierte Anleihen, Rohstoffe — reale Rendite pro Klasse',
    relatedRechner: 'inflationsrechner',
    urgency: 'evergreen',
  },

  // ─── Versicherung ────────────────────────────────────────────────────────
  {
    id: 'pkv-gkv-wechsel-rueckweg',
    titleSeed: 'Von PKV zurück in GKV — geht das 2026 noch?',
    angle: 'Pflichtversicherungsgrenze 77.400 €, nur unter 55, Rückkehr-Tricks (Teilzeit, ALG, Familienversicherung), was wirklich funktioniert',
    relatedRechner: 'pkv-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'bu-absicherungshoehe',
    titleSeed: 'BU-Rente 2026 — Wie hoch muss die Absicherung sein?',
    angle: 'Faustregel 75–80 % vom Netto, Inflationsdynamik, Endalter 65/67, Verzicht auf abstrakte Verweisung, konkrete Beiträge',
    relatedRechner: 'bu-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'kfz-wechsel-november',
    titleSeed: 'Kfz-Versicherung wechseln bis 30.11. — So sparen Sie dreistellig',
    angle: 'Kündigungsfrist normaler Wechsel, Sonderkündigungsrecht (Beitragserhöhung, Schadensfall), SF-Klassen-Mitnahme',
    relatedRechner: 'kfz-versicherung-rechner',
    season: { months: [10, 11] },
    urgency: 'seasonal',
  },
  {
    id: 'zahnzusatzversicherung-lohnt',
    titleSeed: 'Zahnzusatzversicherung 2026 — Für wen lohnt sie sich?',
    angle: 'Regelversorgung GKV vs. Privatleistung, Zahnersatz-Kosten (Implantat 2.000 €), Wartezeiten, beste Tarife',
    relatedRechner: 'pkv-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'haftpflicht-pflicht',
    titleSeed: 'Haftpflicht: Welche Versicherungen sind wirklich Pflicht?',
    angle: 'Kfz-Haftpflicht (Pflicht), Privathaftpflicht (keine Pflicht, aber essenziell), Berufshaftpflicht für bestimmte Berufe',
    relatedRechner: 'pkv-rechner',
    urgency: 'evergreen',
  },

  // ─── Saisonal: Steuer-Jahreszyklus ───────────────────────────────────────
  {
    id: 'steuer-fristen-2026',
    titleSeed: 'Steuererklärung 2026 — Alle Fristen auf einen Blick',
    angle: 'Pflichtveranlagung 31.07., mit Berater 31.03., Verspätungszuschlag, Verlängerung beantragen, Einspruchfrist',
    relatedRechner: 'einkommensteuer-rechner',
    season: { months: [3, 4, 5, 6, 7] },
    urgency: 'seasonal',
  },
  {
    id: 'steuer-last-minute-dezember',
    titleSeed: 'Jahresendsprint Steuern — 10 Dinge vor Silvester',
    angle: 'Werbungskosten-Rechnungen, Spenden, Handwerker-Rechnungen, Rürup-Einzahlung, Sparerpauschbetrag ausnutzen',
    relatedRechner: 'einkommensteuer-rechner',
    season: { months: [11, 12] },
    urgency: 'seasonal',
  },
  {
    id: 'elster-anmeldung',
    titleSeed: 'ELSTER 2026 — Zugang einrichten in 5 Schritten',
    angle: 'Registrierung mit Steuer-ID, Zertifikat, ELSTER Online vs. Dienstleister, ELSTER-Basis mit PC-Zertifikat',
    relatedRechner: 'einkommensteuer-rechner',
    season: { months: [1, 2, 3, 4] },
    urgency: 'seasonal',
  },
  {
    id: 'neue-werte-2026',
    titleSeed: 'Diese Zahlen ändern sich 2026 — Steuern, Rente, Bürgergeld',
    angle: 'Grundfreibetrag 12.348 €, Kinderfreibetrag, BBG KV/RV, Mindestlohn, Bürgergeld-Regelsätze, Pflegeversicherung',
    relatedRechner: 'brutto-netto-rechner',
    season: { months: [1, 2] },
    urgency: 'seasonal',
  },
  {
    id: 'weihnachtsgeld-steuer',
    titleSeed: 'Weihnachtsgeld 2026 versteuern — So viel bleibt netto',
    angle: 'Sonstiger Bezug, Fünftelregelung greift nicht, Progressionseffekt, Netto-Beispielrechnungen 500/1500/3000€',
    relatedRechner: 'brutto-netto-rechner',
    season: { months: [10, 11, 12] },
    urgency: 'seasonal',
  },
  {
    id: 'halbjahres-check',
    titleSeed: 'Halbjahres-Finanzcheck — 7 Kennzahlen im Juli prüfen',
    angle: 'Sparquote, Inflationsrate vs. Zinsen, Kreditrate-Einkommen-Verhältnis, Altersvorsorge-Beitrag, Notgroschen',
    relatedRechner: 'zinseszinsrechner',
    season: { months: [6, 7, 8] },
    urgency: 'seasonal',
  },
  {
    id: 'kurzarbeit-netto',
    titleSeed: 'Kurzarbeitergeld 2026 — So viel bleibt netto',
    angle: '60 % / 67 % mit Kind, Steuerfrei aber Progressionsvorbehalt, Steuererklärungspflicht, Aufstocken durch AG',
    relatedRechner: 'brutto-netto-rechner',
    urgency: 'current',
  },

  // ─── Alltag & Tools ──────────────────────────────────────────────────────
  {
    id: 'bmi-alter-gesundheit',
    titleSeed: 'BMI nach Alter — Warum ältere Menschen etwas mehr wiegen dürfen',
    angle: 'BMI 18,5–24,9 als Standard, Anpassung 70+ (24–29 gilt als gesund), Körperfettanteil als bessere Messung, Muskelmasse',
    relatedRechner: 'bmi-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'kalorien-abnehmen-nachhaltig',
    titleSeed: 'Nachhaltig abnehmen 2026 — Realistische Kaloriendefizite',
    angle: '500 kcal/Tag = 0,5 kg/Woche, Jo-Jo-Effekt vermeiden, Proteinbedarf, Grundumsatz nicht unterschreiten',
    relatedRechner: 'kalorienrechner',
    urgency: 'evergreen',
  },
  {
    id: 'prozent-rabatt-tricks',
    titleSeed: 'Prozentrechnen im Alltag — 8 Fallen beim Einkaufen',
    angle: '3 × 20 % ≠ 60 %, Mehrwertsteuer richtig herausrechnen, Trinkgeld auf Brutto oder Netto, Kreditkarten-Cashback',
    relatedRechner: 'prozentrechner',
    urgency: 'evergreen',
  },
  {
    id: 'wohngeld-2026-anspruch',
    titleSeed: 'Wohngeld 2026 — Wer bekommt die neue Reform?',
    angle: 'Einkommensgrenzen, Miet-Höchstbeträge nach Mietstufe, Heizkostenkomponente, Antragsverfahren',
    relatedRechner: 'wohngeld-rechner',
    urgency: 'current',
  },

  // ─── Bürgergeld & Sozialleistungen ───────────────────────────────────────
  {
    id: 'buergergeld-reform-2026',
    titleSeed: 'Bürgergeld 2026 — Was sich ändert',
    angle: 'Regelsätze, neue Sanktions-Regeln, Freibeträge §11b SGB II, Kosten der Unterkunft, Mehrbedarfe',
    relatedRechner: 'buergergeld-rechner',
    urgency: 'current',
  },
  {
    id: 'buergergeld-nebenverdienst',
    titleSeed: 'Bürgergeld + Nebenjob — So viel behalten Sie',
    angle: '100 € Grundfreibetrag, 20 %/30 %/10 %-Staffelung, Minijob-Kombination, Mehrbedarf für Alleinerziehende',
    relatedRechner: 'buergergeld-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'pfaendung-eigenes-konto',
    titleSeed: 'Pfändungsschutzkonto (P-Konto) — Alles zum Grundfreibetrag',
    angle: '1.560 € monatlicher Grundfreibetrag, Erhöhung pro Unterhaltspflicht, P-Konto beantragen, Bescheinigungen',
    relatedRechner: 'pfaendungsrechner',
    urgency: 'evergreen',
  },

  // ─── Erbschaft & Schenkung ───────────────────────────────────────────────
  {
    id: 'erbschaftsteuer-freibetraege',
    titleSeed: 'Erbschaftsteuer 2026 — Freibeträge clever nutzen',
    angle: 'Ehepartner 500k, Kinder 400k, Enkel 200k; Schenkung alle 10 Jahre neu, Kettenschenkung, Versorgungsfreibetrag',
    relatedRechner: 'erbschaftsteuer-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'schenkung-statt-vererben',
    titleSeed: 'Schenken statt vererben — Die 10-Jahres-Regel nutzen',
    angle: 'Freibeträge alle 10 Jahre neu nutzbar, Nießbrauch als Gestaltung, Steuerliche Vor- und Nachteile, Wohnimmobilie',
    relatedRechner: 'erbschaftsteuer-rechner',
    urgency: 'evergreen',
  },

  // ─── Unterhalt & Familie ─────────────────────────────────────────────────
  {
    id: 'unterhalt-volljaehrige-kinder',
    titleSeed: 'Unterhalt für volljährige Kinder 2026 — Ausbildung und Studium',
    angle: 'Ausbildungs- oder Studienfinanzierung, Kindergeld-Anrechnung voll, Bedarfssätze, Studentenwohnung 930 €',
    relatedRechner: 'unterhalt-rechner',
    urgency: 'evergreen',
  },
  {
    id: 'trennungsunterhalt-berechnen',
    titleSeed: 'Trennungsunterhalt 2026 — Höhe, Dauer, Ausschluss',
    angle: '3/7-Regel Einkommensdifferenz, Trennungsjahr, verwirkter Anspruch, Unterschied zum nachehelichen Unterhalt',
    relatedRechner: 'unterhalt-rechner',
    urgency: 'evergreen',
  },
];

/**
 * Wähle ein Thema, das weder in bereits bestehenden Slugs noch kürzlich
 * generiert wurde. Saisonale Themen bekommen im aktuellen Monat Vorrang.
 */
export function pickTopic(
  existingSlugs: Set<string>,
  recentlyUsedIds: Set<string>,
  currentMonth: number, // 1–12
): RatgeberTopic | null {
  // Kandidaten = noch nicht verwendete Topics
  const candidates = RATGEBER_TOPICS.filter((t) => {
    if (recentlyUsedIds.has(t.id)) return false;
    // heuristische Slug-Kollisionsprüfung
    if (existingSlugs.has(slugify(t.titleSeed))) return false;
    return true;
  });

  if (candidates.length === 0) {
    // Fallback: nur recentlyUsed-Check ignorieren, Kollisionen trotzdem vermeiden
    const loose = RATGEBER_TOPICS.filter((t) => !existingSlugs.has(slugify(t.titleSeed)));
    if (loose.length === 0) return null;
    return loose[Math.floor(Math.random() * loose.length)];
  }

  // Gewichtung: saisonal im aktuellen Monat = 3 Lose, current = 2, evergreen = 1
  const weighted: RatgeberTopic[] = [];
  for (const t of candidates) {
    const inSeason = t.season?.months.includes(currentMonth);
    const weight = inSeason ? 3 : t.urgency === 'current' ? 2 : 1;
    for (let i = 0; i < weight; i++) weighted.push(t);
  }

  return weighted[Math.floor(Math.random() * weighted.length)];
}

/**
 * Einfache Slug-Heuristik — NICHT der finale Slug des Artikels.
 * Claude generiert den definitiven Slug; das hier ist nur für die
 * Kollisionsprüfung im Pool, damit wir dasselbe Thema nicht doppelt ziehen.
 */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
