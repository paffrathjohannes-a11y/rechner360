import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { FAQSection } from '@/components/content/faq-section';
import { HUBS } from '@/data/hubs';
import { RECHNER_CATEGORIES, getRechnerByCategory, type CategoryId } from '@/lib/utils/constants';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';

/**
 * Pillar-Hub-Page pro Kategorie. URL: /themen/<categoryId>.
 *
 * Aufbau (Topic-Cluster-Pattern):
 *   1. Intro: warum das Thema relevant ist
 *   2. Liste aller Rechner der Kategorie (Internal Links nach unten)
 *   3. Schlüsselbegriffe als Glossar-Sektion (auf-Topic-Begriffe zur
 *      semantischen Anreicherung — Google erkennt das als Topical Authority)
 *   4. FAQs (FAQPage-Schema)
 *   5. Verwandte Ratgeber-Artikel (Cross-Linking in den Cluster)
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RECHNER_CATEGORIES.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = HUBS[slug as CategoryId];
  if (!hub) return {};
  return {
    title: hub.title,
    description: hub.metaDescription,
    alternates: { canonical: `/themen/${slug}` },
    openGraph: {
      title: hub.title,
      description: hub.metaDescription,
      url: `/themen/${slug}`,
      type: 'website',
    },
  };
}

export default async function ThemenHubPage({ params }: PageProps) {
  const { slug } = await params;
  const hub = HUBS[slug as CategoryId];
  if (!hub) notFound();

  const category = RECHNER_CATEGORIES.find((c) => c.id === slug)!;
  const rechner = getRechnerByCategory(slug as CategoryId);
  const popular = rechner.filter((r) => 'popular' in r && r.popular);
  const rest = rechner.filter((r) => !('popular' in r && r.popular));

  const relatedRatgeber = (hub.ratgeberSlugs ?? [])
    .map((s) => RATGEBER_ARTIKEL.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div className="space-y-10">
      <Breadcrumbs items={[
        { label: 'Themen', href: '/themen' },
        { label: category.title, href: `/themen/${slug}` },
      ]} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">{category.title}</h1>
        <p className="text-lg text-text-secondary">{hub.subtitle}</p>
      </header>

      {/* Intro */}
      <section className="space-y-3 text-text-secondary leading-relaxed prose prose-rechner360 max-w-none">
        {hub.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {/* Rechner-Liste — beliebte zuerst, dann der Rest */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-text">Rechner in dieser Kategorie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...popular, ...rest].map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className="group block rounded-xl border border-border bg-surface p-5 hover:border-accent-500/30 hover:bg-surface-raised transition-all"
            >
              <h3 className="text-base font-semibold text-text group-hover:text-accent-600 transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1.5 line-clamp-2">{r.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-accent-600 mt-3">
                Berechnen <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Schlüsselbegriffe — semantisches Glossar für Topical Authority */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-text">Wichtige Begriffe und Zusammenhänge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hub.keyConcepts.map((c) => (
            <Card key={c.title} padding="md" className="space-y-1.5">
              <h3 className="text-base font-semibold text-text">{c.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{c.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs (rendert FAQPage-Schema) */}
      {hub.faqs.length > 0 && (
        <FAQSection faqs={hub.faqs} />
      )}

      {/* Cross-Links zu Ratgeber-Artikeln */}
      {relatedRatgeber.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Vertiefende Ratgeber</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedRatgeber.map((a) => (
              <Link
                key={a.slug}
                href={`/ratgeber/${a.slug}`}
                className="group block rounded-xl border border-border bg-surface p-4 hover:border-accent-500/30 hover:bg-surface-raised transition-all"
              >
                <h3 className="text-sm font-medium text-text group-hover:text-accent-600 transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-sm text-text-muted mt-1 line-clamp-2">{a.intro.substring(0, 100)}…</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
