/**
 * Programmatic SEO Pages für den Nebenkostenrechner
 * "Kaufnebenkosten Bayern", "Nebenkosten NRW" etc.
 */

import { BUNDESLAENDER } from '@/lib/utils/constants';

export interface NebenkostenPageDef {
  slug: string;
  bundesland: string;
  bundeslandName: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const NEBENKOSTEN_PAGES: NebenkostenPageDef[] = BUNDESLAENDER.map((bl) => ({
  slug: `kaufnebenkosten-${bl.id}`,
  bundesland: bl.id,
  bundeslandName: bl.name,
  title: `Kaufnebenkosten ${bl.name}`,
  metaTitle: `Kaufnebenkosten ${bl.name} 2026 \u2014 Grunderwerbsteuer & Nebenkosten`,
  metaDescription: `Kaufnebenkosten in ${bl.name} berechnen. \u2713 Grunderwerbsteuer ${bl.kirchensteuer === 0.08 ? '3,5-5%' : '5-6,5%'} \u2713 Notar \u2713 Makler \u2713 Kostenlos`,
  h1: `Kaufnebenkosten in ${bl.name}`,
}));
