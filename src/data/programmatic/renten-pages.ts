/**
 * Programmatic SEO Pages für den Rentenrechner
 */

const GEHAELTER = [25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 100000];

export interface RentenPageDef {
  slug: string;
  jahresbrutto: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const RENTEN_PAGES: RentenPageDef[] = GEHAELTER.map((g) => {
  const gStr = g.toLocaleString('de-DE');
  return {
    slug: `${g}-euro-jahresgehalt`,
    jahresbrutto: g,
    title: `Rente bei ${gStr} € Jahresgehalt`,
    metaTitle: `Rente bei ${gStr} € Gehalt — Wie viel Rente bekomme ich?`,
    metaDescription: `Wie viel Rente bei ${gStr} € Jahresgehalt? ✓ Entgeltpunkte ✓ Rentenlücke ✓ Kostenlos berechnen`,
    h1: `Rente bei ${gStr} € Jahresgehalt`,
  };
});
