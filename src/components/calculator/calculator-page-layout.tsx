import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import {
  ProgrammaticVariantsList,
  type ProgrammaticVariantEntry,
} from '@/components/content/programmatic-variants-list';
import { WebApplicationJsonLd, HowToJsonLd, type HowToStep } from '@/components/seo/json-ld';
import { HOWTO_BY_SLUG } from '@/data/howto';
import { NativeAdSlot } from '@/components/ads/native-ad-slot';
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup';
import { getCategoryForRechner } from '@/lib/utils/constants';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';
import { Sources } from '@/components/calculator/sources';
import { sourcesBySlug } from '@/data/sources';
import { PrintButton } from '@/components/calculator/print-button';

interface FAQ {
  question: string;
  answer: string;
}

interface ProgrammaticVariants {
  /** URL-Prefix ohne trailing slash, z.B. "/brutto-netto-rechner". Fällt zurück auf `/${slug}`. */
  basePath?: string;
  /** PAGES-Array aus src/data/programmatic/. */
  pages: ReadonlyArray<ProgrammaticVariantEntry>;
  /** Optional: eigene Überschrift. */
  headline?: string;
  /** Optional: Intro-Text. */
  intro?: string;
}

interface CalculatorPageLayoutProps {
  slug: string;
  title: string;
  subtitle: string;
  /**
   * Schema.org WebApplication-Daten. `category` ist Schema.org `applicationCategory`
   * — Default 'FinanceApplication' passt für alle Steuer-/Finanz-/Sozial-Rechner.
   * Für BMI/Kalorien o.ä. explizit 'HealthApplication' setzen, für reine Mathe-
   * Tools (Prozent) 'UtilitiesApplication'. Falsche Kategorie ist Schema-Spam.
   */
  jsonLd: { name: string; url: string; description: string; category?: string };
  /**
   * Optionale HowTo-Anleitung. Wenn gesetzt, wird ein zusätzliches
   * Schema.org `HowTo`-Markup gerendert. Steps müssen Plain-Text sein.
   */
  howTo?: { name: string; description: string; steps: HowToStep[]; totalTimeISO?: string };
  children: ReactNode;
  guideContent?: ReactNode;
  faqs?: FAQ[];
  affiliateSection?: ReactNode;
  /**
   * Link-Liste aller programmatischen Unter-Varianten dieses Rechners.
   * Signalisiert Google die Wichtigkeit der Varianten (Internal Linking),
   * damit sie aus dem "Gefunden – zurzeit nicht indexiert"-Status rauskommen.
   */
  programmaticVariants?: ProgrammaticVariants;
}

export function CalculatorPageLayout({
  slug,
  title,
  subtitle,
  jsonLd,
  howTo,
  children,
  guideContent,
  faqs,
  affiliateSection,
  programmaticVariants,
}: CalculatorPageLayoutProps) {
  const category = getCategoryForRechner(slug);

  // Breadcrumbs: Kategorie verlinkt jetzt auf den Themen-Hub `/themen/<id>`,
  // nicht mehr auf den Homepage-Anker. Schließt den Topic-Cluster-Loop:
  // Calculator → Hub → verwandte Calculators (statt nur zurück zur Home).
  const breadcrumbItems = [
    ...(category ? [{ label: category.title, href: `/themen/${category.id}` }] : []),
    { label: title, href: `/${slug}` },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">{title}</h1>
          <PrintButton className="shrink-0 mt-2" />
        </div>
        <p className="text-text-secondary text-lg">{subtitle}</p>
        <TrustSignals compact className="mt-3" />
      </div>

      <WebApplicationJsonLd {...jsonLd} />
      {/* HowTo-Schema: explizit über `howTo`-Prop oder zentral aus
          src/data/howto.ts per Slug. Page-Override schlägt zentrale
          Datei — z.B. wenn ein Rechner kontextspezifische Schritte
          braucht (Sonderfall Brutto-Netto vor der Migration). */}
      {(() => {
        const effectiveHowTo = howTo ?? HOWTO_BY_SLUG[slug];
        if (!effectiveHowTo) return null;
        return (
          <HowToJsonLd
            name={effectiveHowTo.name}
            description={effectiveHowTo.description}
            steps={effectiveHowTo.steps}
            totalTimeISO={effectiveHowTo.totalTimeISO}
          />
        );
      })()}

      {/*
        aria-live="polite" announced Ergebnis-Aktualisierungen für Screenreader,
        ohne Input-Eingaben zu unterbrechen. aria-atomic="false" meldet nur den
        geänderten Text, nicht den gesamten Subtree.
      */}
      <div aria-live="polite" aria-atomic="false">
        {children}
      </div>

      {/* Post-Result Ad-Slot — direkt nach dem Calculator-Output, vor Affiliate
          und Guide. Vorher war der Slot über dem Calculator (above-fold) und
          dominierte den ersten Viewport — AdSense-Policy-Risiko ("Page-Layout
          dominated by ads") und schlechte UX. Jetzt sieht der Nutzer zuerst
          das Ergebnis, dann werbliche Anschluss-Touchpoints (Ad, Affiliate). */}
      <NativeAdSlot format="horizontal" slot={process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT} className="mt-8" />

      {/* Affiliate recommendations — natural next step after results */}
      {affiliateSection && <div className="mt-8">{affiliateSection}</div>}

      {/* Newsletter-Capture nach Result + Affiliate. Rendert sich selbst
          nur wenn `NEXT_PUBLIC_NEWSLETTER_ENABLED=1` gesetzt ist — sonst
          komplett ausgeblendet. Slug als source-Attribut für Brevo, damit
          später ausgewertet werden kann, von welchem Rechner der Kontakt kam. */}
      <NewsletterSignup source={slug} className="mt-8" />

      {guideContent && <div className="mt-12">{guideContent}</div>}

      {/* Ad placement — between guide content and FAQ for natural reading flow */}
      <NativeAdSlot format="horizontal" slot={process.env.NEXT_PUBLIC_ADSENSE_MID_SLOT} className="mt-8" />

      {faqs && faqs.length > 0 && (
        <FAQSection faqs={faqs} className="mt-8" />
      )}

      {/* Ad nach FAQ — "Post-Engagement"-Position. Nutzer hat den Inhalt
          durchgelesen, ist engagiert, offen für kontextuelle Angebote. */}
      {faqs && faqs.length > 0 && (
        <NativeAdSlot
          format="horizontal"
          slot={process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT}
          className="mt-8"
        />
      )}

      {/* Internal Linking: alle programmatischen Varianten verlinken */}
      {programmaticVariants && programmaticVariants.pages.length > 0 && (
        <ProgrammaticVariantsList
          basePath={programmaticVariants.basePath ?? `/${slug}`}
          pages={programmaticVariants.pages}
          headline={programmaticVariants.headline}
          intro={programmaticVariants.intro}
          className="mt-8"
        />
      )}

      {/* Related ratgeber articles */}
      {(() => {
        const relatedArticles = RATGEBER_ARTIKEL.filter((a) => a.relatedRechner === slug).slice(0, 3);
        if (relatedArticles.length === 0) return null;
        return (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-text">Passende Ratgeber</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/ratgeber/${a.slug}`}
                  className="group block rounded-xl border border-border bg-surface p-4 hover:border-accent-500/30 hover:bg-surface-raised transition-all"
                >
                  <h3 className="text-sm font-medium text-text group-hover:text-accent-600 transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1 line-clamp-2">{a.intro.substring(0, 100)}...</p>
                  <span className="inline-flex items-center gap-1 text-sm text-accent-600 mt-2">
                    Weiterlesen <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Sources */}
      {sourcesBySlug[slug] && sourcesBySlug[slug].sources.length > 0 && (
        <Sources
          items={sourcesBySlug[slug].sources}
          disclaimer={sourcesBySlug[slug].disclaimer}
          className="mt-8"
        />
      )}

      <RelatedCalculators currentSlug={slug} className="mt-8" />
    </div>
  );
}
