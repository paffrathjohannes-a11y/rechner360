import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';
import '@/app/(legal)/legal.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return RATGEBER_ARTIKEL.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const artikel = RATGEBER_ARTIKEL.find((a) => a.slug === slug);
    if (!artikel) return {};
    return {
      title: artikel.metaTitle,
      description: artikel.metaDescription,
      alternates: { canonical: `/ratgeber/${artikel.slug}` },
      openGraph: {
        title: artikel.metaTitle,
        description: artikel.metaDescription,
        url: `/ratgeber/${artikel.slug}`,
        type: 'article',
        publishedTime: artikel.publishDate,
        authors: ['rechner360.de'],
      },
    };
  });
}

export default async function RatgeberArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artikel = RATGEBER_ARTIKEL.find((a) => a.slug === slug);
  if (!artikel) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artikel.title,
    description: artikel.metaDescription,
    datePublished: artikel.publishDate,
    dateModified: artikel.publishDate,
    author: { '@type': 'Organization', name: 'rechner360.de', url: 'https://www.rechner360.de' },
    publisher: { '@type': 'Organization', name: 'rechner360.de', url: 'https://www.rechner360.de' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.rechner360.de/ratgeber/${artikel.slug}` },
  };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumbs items={[{ label: 'Ratgeber', href: '/ratgeber' }, { label: artikel.title }]} />

      <article className="legal-content">
        <h1>{artikel.title}</h1>
        <p className="text-text-muted text-sm mb-6">
          {new Date(artikel.publishDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p className="text-lg leading-relaxed mb-8">{artikel.intro}</p>

        {artikel.sections.map((section, i) => (
          <div key={i}>
            <h2>{section.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: `<p>${section.content}</p>` }} />
          </div>
        ))}

        <div className="mt-8 p-4 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10">
          <p className="text-sm text-text-secondary">
            Passender Rechner:{' '}
            <Link href={`/${artikel.relatedRechner}`} className="font-medium text-primary-600 hover:underline">
              Jetzt berechnen →
            </Link>
          </p>
        </div>
      </article>

      <RelatedCalculators currentSlug={artikel.relatedRechner} className="mt-8" />
    </div>
  );
}
