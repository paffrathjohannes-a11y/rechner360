import type { AffiliateOffer } from '@/components/ads/affiliate-box';

// ─────────────────────────────────────────────────────────────
// TODO: Ersetze YOUR_AWIN_ID mit deiner AWIN Publisher-ID
// TODO: Ersetze YOUR_FINANCEADS_ID mit deiner FinanceAds Publisher-ID
// Anmeldung: https://www.awin.com (Smava, CHECK24, Verivox, WISO, Clark)
// Anmeldung: https://www.financeads.net (Trade Republic, Scalable Capital)
// ─────────────────────────────────────────────────────────────

const AWIN_ID = '2845164';
const FINANCEADS_ID = '44072';

// ─── Kredit & Baufinanzierung ────────────────────────────────

const smavaKredit: AffiliateOffer = {
  partner: 'smava',
  product: 'kreditvergleich',
  title: 'Smava Kreditvergleich',
  description: 'Über 20 Banken vergleichen. Negativzins ab -0,4 % möglich. TÜV-geprüft.',
  cta: 'Kredit vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=11092&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.smava.de`,
  badge: 'Empfehlung',
  highlight: true,
};

const check24Kredit: AffiliateOffer = {
  partner: 'check24',
  product: 'kredit',
  title: 'CHECK24 Kredit',
  description: 'Deutschlands größtes Vergleichsportal — Sofortzusage möglich.',
  cta: 'Vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fkredit%2F`,
};

const verivoxKredit: AffiliateOffer = {
  partner: 'verivox',
  product: 'kredit',
  title: 'Verivox Kreditrechner',
  description: 'Günstige Zinsen von über 400 Anbietern.',
  cta: 'Zinsen prüfen',
  url: `https://www.awin1.com/cread.php?awinmid=14797&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.verivox.de%2Fkredit%2F`,
};

// ─── Baufinanzierung ─────────────────────────────────────────

const check24Baufi: AffiliateOffer = {
  partner: 'check24',
  product: 'baufinanzierung',
  title: 'CHECK24 Baufinanzierung',
  description: 'Über 450 Anbieter vergleichen — beste Bauzinsen sichern.',
  cta: 'Bauzinsen vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fbaufinanzierung%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

// ─── Steuern ─────────────────────────────────────────────────

const wisoSteuer: AffiliateOffer = {
  partner: 'wiso-steuer',
  product: 'steuersoftware',
  title: 'WISO Steuer 2026',
  description: 'Deutschlands beliebteste Steuersoftware — im Schnitt 1.674 € Erstattung.',
  cta: 'Steuererklärung starten',
  url: `https://www.awin1.com/cread.php?awinmid=17387&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.buhl.de%2Fprodukte%2Falle%2Fwiso-steuer%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

const check24Steuer: AffiliateOffer = {
  partner: 'check24',
  product: 'steuerberatung',
  title: 'CHECK24 Steuerberater',
  description: 'Steuerberater online vergleichen — kostenlos Angebote erhalten.',
  cta: 'Berater finden',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fsteuerberater%2F`,
};

// ─── Investment & Vorsorge ───────────────────────────────────

const tradeRepublic: AffiliateOffer = {
  partner: 'trade-republic',
  product: 'depot',
  title: 'Trade Republic',
  description: 'Kostenloses Depot + 3,25 % Zinsen aufs Verrechnungskonto. 4 Mio.+ Kunden.',
  cta: 'Depot eröffnen',
  url: `https://www.financeads.net/tc.php?t=TRADE_REPUBLIC_TID&c=${FINANCEADS_ID}`,
  badge: 'Empfehlung',
  highlight: true,
};

const scalableCapital: AffiliateOffer = {
  partner: 'scalable-capital',
  product: 'depot',
  title: 'Scalable Capital',
  description: 'ETF-Sparpläne ab 1 € — Europas führender digitaler Vermögensverwalter.',
  cta: 'Depot eröffnen',
  url: `https://www.financeads.net/tc.php?t=SCALABLE_TID&c=${FINANCEADS_ID}`,
};

// ─── Versicherung ────────────────────────────────────────────

const clarkVersicherung: AffiliateOffer = {
  partner: 'clark',
  product: 'versicherungscheck',
  title: 'Clark Versicherungsmanager',
  description: 'Alle Versicherungen in einer App — kostenloser Vergleich & Optimierung.',
  cta: 'Versicherungen prüfen',
  url: `https://www.awin1.com/cread.php?awinmid=29697&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.clark.de`,
};

// ─── Nebenkosten / Energie ───────────────────────────────────

const check24Immobilien: AffiliateOffer = {
  partner: 'check24',
  product: 'immobilien',
  title: 'CHECK24 Umzugsservice',
  description: 'Strom, Gas & Internet am neuen Wohnort vergleichen und sofort wechseln.',
  cta: 'Anbieter vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fstrom%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

const verivoxEnergie: AffiliateOffer = {
  partner: 'verivox',
  product: 'strom-gas',
  title: 'Verivox Strom & Gas',
  description: 'Bis zu 800 € jährlich sparen durch Anbieterwechsel.',
  cta: 'Tarife vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=14797&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.verivox.de%2Fstromvergleich%2F`,
};

// ─── Karriere ────────────────────────────────────────────────

const stepstone: AffiliateOffer = {
  partner: 'stepstone',
  product: 'gehaltsvergleich',
  title: 'StepStone Gehaltsplaner',
  description: 'Finde heraus, was du wirklich verdienen solltest — kostenloser Gehaltsreport.',
  cta: 'Gehalt prüfen',
  url: 'https://www.stepstone.de/gehalt/',
  badge: 'Empfehlung',
  highlight: true,
};

// ─── Baukosten ───────────────────────────────────────────────

const check24Handwerker: AffiliateOffer = {
  partner: 'check24',
  product: 'handwerker',
  title: 'CHECK24 Handwerker',
  description: 'Kostenlose Angebote von geprüften Handwerkern aus deiner Region.',
  cta: 'Angebote einholen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fprofis%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

// ═══════════════════════════════════════════════════════════════
// Offers pro Rechner-Slug
// ═══════════════════════════════════════════════════════════════

export const affiliateOffersBySlug: Record<string, { headline: string; offers: AffiliateOffer[] }> = {
  // Immobilien & Finanzen
  kreditrechner: {
    headline: 'Kredite vergleichen & sparen',
    offers: [smavaKredit, check24Kredit, verivoxKredit],
  },
  tilgungsrechner: {
    headline: 'Baufinanzierung vergleichen',
    offers: [check24Baufi, smavaKredit, verivoxKredit],
  },
  zinseszinsrechner: {
    headline: 'Geld anlegen & Zinsen maximieren',
    offers: [tradeRepublic, scalableCapital],
  },
  'baukosten-rechner': {
    headline: 'Handwerker & Finanzierung finden',
    offers: [check24Handwerker, check24Baufi],
  },
  nebenkostenrechner: {
    headline: 'Nebenkosten senken',
    offers: [check24Immobilien, verivoxEnergie],
  },
  'grundsteuer-rechner': {
    headline: 'Steuererklärung einfach erledigen',
    offers: [wisoSteuer, check24Steuer],
  },

  // Gehalt & Steuern
  'brutto-netto-rechner': {
    headline: 'Mehr Netto vom Brutto',
    offers: [wisoSteuer, check24Steuer],
  },
  gehaltsrechner: {
    headline: 'Gehalt optimieren',
    offers: [stepstone, wisoSteuer],
  },
  abfindungsrechner: {
    headline: 'Abfindung richtig versteuern',
    offers: [wisoSteuer, check24Steuer],
  },
  'erbschaftsteuer-rechner': {
    headline: 'Erbschaft richtig versteuern',
    offers: [wisoSteuer, check24Steuer],
  },
  'mwst-rechner': {
    headline: 'Buchhaltung vereinfachen',
    offers: [wisoSteuer, check24Steuer],
  },

  // Vorsorge & Investment
  'elterngeld-rechner': {
    headline: 'Absicherung für junge Familien',
    offers: [clarkVersicherung, wisoSteuer],
  },
  rentenrechner: {
    headline: 'Privat für die Rente vorsorgen',
    offers: [tradeRepublic, scalableCapital, clarkVersicherung],
  },
  inflationsrechner: {
    headline: 'Kaufkraft erhalten — Geld anlegen',
    offers: [tradeRepublic, scalableCapital],
  },
};
