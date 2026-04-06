export interface GuideSection {
  id: string;
  title: string;
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CalculatorPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  guide: GuideSection[];
  faqs: FAQ[];
  relatedCalculators: string[];
  affiliateContext: string;
  lastUpdated: string;
}

export interface ProgrammaticPageData {
  slug: string;
  parentSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  prefillValues: Record<string, string | number | boolean>;
  faqs: FAQ[];
  relatedSlugs: string[];
}
