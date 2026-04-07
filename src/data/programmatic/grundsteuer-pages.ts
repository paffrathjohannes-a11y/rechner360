/**
 * Programmatic SEO Pages für den Grundsteuer Rechner
 * "Grundsteuer Bayern", "Grundsteuer NRW" etc.
 */

import { BUNDESLAENDER } from '@/lib/utils/constants';

export interface GrundsteuerPageDef {
  slug: string;
  bundesland: string;
  bundeslandName: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const GRUNDSTEUER_PAGES: GrundsteuerPageDef[] = BUNDESLAENDER.map((bl) => ({
  slug: `grundsteuer-${bl.id}`,
  bundesland: bl.id,
  bundeslandName: bl.name,
  title: `Grundsteuer ${bl.name}`,
  metaTitle: `Grundsteuer ${bl.name} 2026 — Berechnung nach Reform`,
  metaDescription: `Grundsteuer in ${bl.name} berechnen. ✓ Neue Grundsteuer nach Reform 2025 ✓ Mit Hebesatz ✓ Kostenlos`,
  h1: `Grundsteuer in ${bl.name} berechnen`,
}));
