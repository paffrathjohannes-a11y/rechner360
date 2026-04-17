import type { AffiliateOffer } from '@/components/ads/affiliate-box';

// ─────────────────────────────────────────────────────────────
// Genehmigte Partner: CHECK24 (9364) + Verivox (14797) via Awin
// ─────────────────────────────────────────────────────────────

const AWIN_ID = '2845164';

// ─── CHECK24 Produkte ───────────────────────────────────────

const check24Kredit: AffiliateOffer = {
  partner: 'check24',
  product: 'kredit',
  title: 'CHECK24 Kreditvergleich',
  description: 'Deutschlands größtes Vergleichsportal — über 300 Banken vergleichen. Sofortzusage möglich.',
  cta: 'Kredit vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fkredit%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

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

const check24Steuer: AffiliateOffer = {
  partner: 'check24',
  product: 'steuerberatung',
  title: 'CHECK24 Steuerberater',
  description: 'Steuerberater online vergleichen — kostenlos Angebote erhalten.',
  cta: 'Berater finden',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fsteuerberater%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

const check24PKV: AffiliateOffer = {
  partner: 'check24',
  product: 'pkv',
  title: 'CHECK24 PKV-Vergleich',
  description: 'Private Krankenversicherung vergleichen — über 4.500 Tarife im Überblick.',
  cta: 'PKV vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fprivate-krankenversicherung%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

const check24Strom: AffiliateOffer = {
  partner: 'check24',
  product: 'strom',
  title: 'CHECK24 Stromvergleich',
  description: 'Stromanbieter vergleichen und sofort wechseln — bis zu 800 € sparen.',
  cta: 'Anbieter vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fstrom%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

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

const check24KFZ: AffiliateOffer = {
  partner: 'check24',
  product: 'kfz',
  title: 'CHECK24 Kfz-Versicherung',
  description: 'Über 330 Tarife vergleichen — bis zu 850 € pro Jahr sparen.',
  cta: 'Kfz vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fkfz-versicherung%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

const check24BU: AffiliateOffer = {
  partner: 'check24',
  product: 'bu',
  title: 'CHECK24 Berufsunfähigkeit',
  description: 'BU-Tarife vergleichen — von über 40 Anbietern das beste Angebot.',
  cta: 'BU vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=9364&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.check24.de%2Fberufsunfaehigkeitsversicherung%2F`,
  badge: 'Empfehlung',
  highlight: true,
};

// ─── WISO (Buhl Data) Produkte ─────────────────────────────
// WISO Steuer-Software von Buhl Data — AWIN-MID 17387, freigeschaltet 04/2026.
const WISO_AWIN_MID = '17387';

const wisoSteuer: AffiliateOffer = {
  partner: 'wiso',
  product: 'steuer',
  title: 'WISO Steuer 2026',
  description: 'Die Steuererklärung einfach selbst machen. Im Schnitt 1.674 € Rückerstattung. ELSTER-Versand inklusive.',
  cta: 'WISO Steuer starten',
  url: `https://www.awin1.com/cread.php?awinmid=${WISO_AWIN_MID}&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.buhl.de%2Fwiso-steuer%2F`,
  badge: 'Bestseller',
  highlight: true,
};

const wisoMeinGeld: AffiliateOffer = {
  partner: 'wiso',
  product: 'finanzen',
  title: 'WISO Mein Geld',
  description: 'Finanzen, Konten und Depots zentral verwalten. Mit automatischer Transaktions-Kategorisierung.',
  cta: 'Finanzen im Griff',
  url: `https://www.awin1.com/cread.php?awinmid=${WISO_AWIN_MID}&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.buhl.de%2Fwiso-mein-geld%2F`,
  badge: 'Tipp',
};

// ─── Verivox Produkte ──────────────────────────────────────

const verivoxStrom: AffiliateOffer = {
  partner: 'verivox',
  product: 'strom',
  title: 'Verivox Stromvergleich',
  description: 'Über 1.000 Stromanbieter vergleichen — Wechsel in 5 Minuten, bis zu 850 € sparen.',
  cta: 'Strom vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=14797&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.verivox.de%2Fstromvergleich%2F`,
  badge: 'Tipp',
};

const verivoxGas: AffiliateOffer = {
  partner: 'verivox',
  product: 'gas',
  title: 'Verivox Gasvergleich',
  description: 'Gasanbieter vergleichen und wechseln — schnell, einfach und kostenlos.',
  cta: 'Gas vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=14797&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.verivox.de%2Fgasvergleich%2F`,
  badge: 'Tipp',
};

const verivoxKredit: AffiliateOffer = {
  partner: 'verivox',
  product: 'kredit',
  title: 'Verivox Kreditvergleich',
  description: 'Kredite von über 400 Banken vergleichen — günstiger Zinssatz ab 1,99 %.',
  cta: 'Kredit vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=14797&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.verivox.de%2Fkredit%2F`,
  badge: 'Tipp',
};

const verivoxKFZ: AffiliateOffer = {
  partner: 'verivox',
  product: 'kfz',
  title: 'Verivox Kfz-Versicherung',
  description: 'Kfz-Versicherung vergleichen — über 300 Tarife, Wechsel in Minuten.',
  cta: 'Kfz vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=14797&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.verivox.de%2Fkfz-versicherung%2F`,
  badge: 'Tipp',
};

const verivoxDSL: AffiliateOffer = {
  partner: 'verivox',
  product: 'dsl',
  title: 'Verivox Internetvergleich',
  description: 'DSL, Kabel & Glasfaser vergleichen — die besten Tarife in deiner Region.',
  cta: 'Internet vergleichen',
  url: `https://www.awin1.com/cread.php?awinmid=14797&awinaffid=${AWIN_ID}&ued=https%3A%2F%2Fwww.verivox.de%2Finternet%2F`,
  badge: 'Tipp',
};

// ═══════════════════════════════════════════════════════════════
// Offers pro Rechner-Slug — CHECK24 + Verivox
// ═══════════════════════════════════════════════════════════════

export const affiliateOffersBySlug: Record<string, { headline: string; offers: AffiliateOffer[] }> = {
  // Immobilien & Finanzen
  kreditrechner: {
    headline: 'Kredite vergleichen & sparen',
    offers: [check24Kredit, verivoxKredit],
  },
  tilgungsrechner: {
    headline: 'Baufinanzierung vergleichen',
    offers: [check24Baufi, verivoxKredit],
  },
  'baukosten-rechner': {
    headline: 'Handwerker & Finanzierung finden',
    offers: [check24Handwerker, check24Baufi],
  },
  nebenkostenrechner: {
    headline: 'Nebenkosten senken',
    offers: [check24Strom, verivoxStrom, verivoxGas],
  },

  // Gehalt & Steuern
  'grundsteuer-rechner': {
    headline: 'Steuererklärung einfach erledigen',
    offers: [check24Steuer],
  },
  'brutto-netto-rechner': {
    headline: 'Steuererklärung schnell erledigen',
    offers: [wisoSteuer, check24Steuer],
  },
  gehaltsrechner: {
    headline: 'Gehalt optimieren & Steuern sparen',
    offers: [wisoSteuer, check24Steuer],
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
    headline: 'Buchhaltung & Steuer vereinfachen',
    offers: [wisoSteuer, check24Steuer],
  },
  'elterngeld-rechner': {
    headline: 'Finanzen für junge Familien',
    offers: [wisoSteuer, check24Steuer],
  },

  // Versicherung
  'pkv-rechner': {
    headline: 'PKV-Tarife vergleichen',
    offers: [check24PKV],
  },
  'kfz-versicherung-rechner': {
    headline: 'Kfz-Versicherung vergleichen',
    offers: [check24KFZ, verivoxKFZ],
  },
  'bu-rechner': {
    headline: 'BU-Versicherung vergleichen',
    offers: [check24BU],
  },

  // Vorsorge & Investment — Check24 Alternativen bis FinanceAds genehmigt
  rentenrechner: {
    headline: 'Vorsorge optimieren',
    offers: [check24PKV, check24Steuer],
  },
  inflationsrechner: {
    headline: 'Finanzen optimieren',
    offers: [check24Steuer],
  },
  zinseszinsrechner: {
    headline: 'Finanzen vergleichen',
    offers: [check24Kredit, verivoxKredit],
  },

  // Allgemeine Spar-Tipps für Rechner ohne spezifischen Partner
  'bmi-rechner': {
    headline: 'Nebenkosten senken',
    offers: [verivoxStrom, verivoxDSL],
  },
  'buergergeld-rechner': {
    headline: 'Kosten senken & sparen',
    offers: [verivoxStrom, verivoxGas],
  },
  'gehaltserhoehung-rechner': {
    headline: 'Gehaltserhöhung steueroptimal nutzen',
    offers: [wisoSteuer, check24Steuer],
  },
  'einkommensteuer-rechner': {
    headline: 'Steuererklärung 2026 selber machen',
    offers: [wisoSteuer, check24Steuer],
  },

  // Globale Platzierungen (Homepage, Ratgeber-Sidebar): prominente Bestseller.
  homepage: {
    headline: 'Steuererklärung clever erledigen',
    offers: [wisoSteuer, check24Steuer],
  },
  'ratgeber-steuer': {
    headline: 'Passende Software für Ihre Steuererklärung',
    offers: [wisoSteuer],
  },
  'ratgeber-altersvorsorge': {
    headline: 'Finanzen und Vorsorge im Blick',
    offers: [wisoMeinGeld, wisoSteuer],
  },
  kalorienrechner: {
    headline: 'Nebenkosten senken',
    offers: [verivoxStrom, verivoxDSL],
  },
  pfaendungsrechner: {
    headline: 'Kosten senken & sparen',
    offers: [verivoxStrom, verivoxGas],
  },
  prozentrechner: {
    headline: 'Nebenkosten senken',
    offers: [verivoxStrom, verivoxDSL],
  },
  'stundenlohn-rechner': {
    headline: 'Ausgaben optimieren',
    offers: [verivoxStrom, verivoxGas],
  },
  'unterhalt-rechner': {
    headline: 'Kosten senken & sparen',
    offers: [verivoxStrom, verivoxGas],
  },
};
