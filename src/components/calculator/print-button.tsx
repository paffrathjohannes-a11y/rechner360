'use client';

import { Printer } from 'lucide-react';

/**
 * Zero-Dependency PDF-Export: triggert das native Browser-Druckdialog, das
 * auf allen modernen Browsern eine "Als PDF speichern"-Option hat.
 *
 * Das begleitende Print-CSS (in globals.css) blendet Header, Footer, Ads,
 * Affiliate-Boxen und Navigation aus — übrig bleibt nur Rechner + Ergebnis.
 */
export function PrintButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-600 transition-colors print:hidden ${className}`}
      aria-label="Berechnung als PDF speichern oder drucken"
    >
      <Printer className="w-4 h-4" />
      <span>Als PDF speichern</span>
    </button>
  );
}
