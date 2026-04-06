/**
 * Sozialversicherungskonstanten 2026
 * Quelle: Bundesregierung / Deutsche Rentenversicherung
 */
export const SV_2026 = {
  /** Krankenversicherung */
  kv: {
    /** Allgemeiner Beitragssatz */
    rate: 0.146,
    /** Durchschnittlicher Zusatzbeitrag 2026 */
    avg_zusatz: 0.029,
    /** Beitragsbemessungsgrenze monatlich */
    bbg_monthly: 5812.50,
    /** Beitragsbemessungsgrenze jährlich */
    bbg_yearly: 69750,
    /** AN-Anteil Faktor (halber allg. Satz + halber Zusatz) */
    an_factor: (rate: number, zusatz: number) => rate / 2 + zusatz / 2,
    /** AG-Anteil Faktor */
    ag_factor: (rate: number, zusatz: number) => rate / 2 + zusatz / 2,
  },

  /** Rentenversicherung */
  rv: {
    rate: 0.186,
    /** BBG einheitlich ab 2025 (Ost=West) */
    bbg_monthly: 8450.00,
    bbg_yearly: 101400,
    an_share: 0.093,
    ag_share: 0.093,
  },

  /** Arbeitslosenversicherung */
  alv: {
    rate: 0.026,
    /** Gleiche BBG wie RV */
    bbg_monthly: 8450.00,
    bbg_yearly: 101400,
    an_share: 0.013,
    ag_share: 0.013,
  },

  /** Pflegeversicherung */
  pv: {
    /** Basissatz */
    rate: 0.036,
    /** Zuschlag für Kinderlose ab 23 */
    kinderlos_zuschlag: 0.006,
    /** Abschlag pro Kind ab dem 2. Kind (bis max 5 Kinder) */
    kind_abschlag: 0.0025,
    /** Maximaler Abschlag */
    max_abschlag: 0.01,
    /** BBG = KV BBG */
    bbg_monthly: 5812.50,
    bbg_yearly: 69750,
    /** In Sachsen: AN zahlt mehr (1,525% statt 0,9%) */
    sachsen_extra_an: 0.005,
  },

  /** Midijob / Übergangsbereich */
  midijob: {
    /** Untergrenze (über Minijob) */
    lower: 538.01,
    /** Obergrenze */
    upper: 2000.00,
    /** Faktor F für 2026 */
    factor_f: 0.6846,
  },

  /** Minijob-Grenze */
  minijob: {
    grenze: 538.00,
  },

  /** AG-Umlagen */
  umlagen: {
    /** U1 (Entgeltfortzahlung, nur <30 AN) */
    u1: 0.011,
    /** U2 (Mutterschaftsgeld) */
    u2: 0.0029,
    /** Insolvenzgeldumlage */
    insolvenz: 0.0006,
  },
} as const;
