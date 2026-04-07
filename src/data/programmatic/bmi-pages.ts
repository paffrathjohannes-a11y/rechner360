/**
 * Programmatic SEO Pages für den BMI Rechner
 * Keywords wie "BMI bei 80kg 180cm" haben hohes Volumen
 */

const GEWICHTE = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120];
const GROESSEN = [160, 165, 170, 175, 180, 185, 190];

export interface BmiPageDef {
  slug: string;
  gewicht: number;
  groesse: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export function generateBmiPages(): BmiPageDef[] {
  const pages: BmiPageDef[] = [];

  for (const gewicht of GEWICHTE) {
    for (const groesse of GROESSEN) {
      const slug = `${gewicht}kg-${groesse}cm`;
      pages.push({
        slug,
        gewicht,
        groesse,
        title: `BMI bei ${gewicht} kg und ${groesse} cm`,
        metaTitle: `BMI bei ${gewicht} kg und ${groesse} cm — Body-Mass-Index berechnen`,
        metaDescription: `Wie hoch ist der BMI bei ${gewicht} kg Gewicht und ${groesse} cm Gr\u00f6\u00dfe? \u2713 Sofort berechnen \u2713 WHO-Klassifikation \u2713 Idealgewicht`,
        h1: `BMI bei ${gewicht} kg und ${groesse} cm`,
      });
    }
  }

  return pages;
}

export const BMI_PAGES = generateBmiPages();
