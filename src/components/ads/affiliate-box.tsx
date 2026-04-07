'use client';

import { ExternalLink, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trackAffiliateClick } from '@/lib/utils/analytics-events';
import { cn } from '@/lib/utils/cn';

export interface AffiliateOffer {
  partner: string;
  product: string;
  title: string;
  description: string;
  cta: string;
  url: string;
  badge?: string;
  highlight?: boolean;
}

interface AffiliateBoxProps {
  headline?: string;
  subline?: string;
  offers: AffiliateOffer[];
  className?: string;
}

export function AffiliateBox({
  headline = 'Kredite vergleichen & sparen',
  subline,
  offers,
  className,
}: AffiliateBoxProps) {
  if (offers.length === 0) return null;

  const featured = offers.find((o) => o.highlight);
  const rest = offers.filter((o) => !o.highlight);

  return (
    <Card padding="lg" className={cn('space-y-5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-text">{headline}</h3>
          {subline && <p className="text-sm text-text-secondary mt-0.5">{subline}</p>}
        </div>
        <Badge variant="muted">Anzeige</Badge>
      </div>

      {/* Featured offer */}
      {featured && (
        <a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          onClick={() => trackAffiliateClick(featured.partner, featured.product)}
          className="block group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg bg-accent-500/5 border border-accent-500/15 hover:border-accent-500/30 transition-all">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text group-hover:text-accent-600 transition-colors">
                  {featured.title}
                </span>
                {featured.badge && <Badge variant="accent">{featured.badge}</Badge>}
              </div>
              <p className="text-sm text-text-secondary mt-1">{featured.description}</p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent-600 text-white hover:bg-accent-700 transition-colors shrink-0">
              {featured.cta}
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </a>
      )}

      {/* Other offers — compact row */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rest.map((offer) => (
            <a
              key={`${offer.partner}-${offer.product}`}
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              onClick={() => trackAffiliateClick(offer.partner, offer.product)}
              className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent-500/30 hover:bg-surface-raised transition-all"
            >
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-text group-hover:text-accent-600 transition-colors">
                  {offer.title}
                </span>
                <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{offer.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-500 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      )}

      <p className="text-xs text-text-muted">
        * Bei Abschluss über einen Link erhalten wir eine Provision. Für Sie entstehen keine Mehrkosten.
      </p>
    </Card>
  );
}