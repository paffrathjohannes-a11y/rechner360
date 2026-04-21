import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { SITE_URL } from '@/lib/utils/constants';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // BreadcrumbList für JSON-LD: `item` ist für alle nicht-letzten Einträge
  // Pflicht. Fehlt es, meldet Google "Feld 'item' fehlt (in itemListElement)"
  // und das gesamte Breadcrumb-Schema wird verworfen.
  // Der letzte Eintrag (aktuelle Seite) darf kein `item` haben (Spec).
  // Fragment-URLs (z. B. /#gehalt-steuern) akzeptiert Google als gültigen
  // Item-Wert; wir nutzen also den Hash-Link, statt den Eintrag zu skippen.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: SITE_URL,
      },
      ...items.map((item, i) => {
        const isLast = i === items.length - 1;
        // Letzter Eintrag (current page) darf ohne `item` auskommen.
        if (isLast && !item.href) {
          return {
            '@type': 'ListItem' as const,
            position: i + 2,
            name: item.label,
          };
        }
        // Alle anderen: `item` verpflichtend, auch bei Hash-URLs.
        const href = item.href || '/';
        return {
          '@type': 'ListItem' as const,
          position: i + 2,
          name: item.label,
          item: `${SITE_URL}${href}`,
        };
      }),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          <li className="flex items-center">
            <Link
              href="/"
              className="text-text-muted hover:text-primary-600 transition-colors"
              aria-label="Startseite"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
          </li>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 text-text-muted" aria-hidden="true" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-text-muted hover:text-primary-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-text-secondary font-medium"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
