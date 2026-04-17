import { Accordion, AccordionItem } from '@/components/ui/accordion';
import type { FAQ } from '@/types/content';
import { cn } from '@/lib/utils/cn';
import { sanitizeArticleHtml } from '@/lib/content/sanitize';

interface FAQSectionProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQSection({ faqs, className }: FAQSectionProps) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={cn('space-y-4', className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-bold text-text">
        Häufig gestellte Fragen
      </h2>
      <Accordion>
        {faqs.map((faq, i) => (
          <AccordionItem key={i} title={faq.question}>
            {/* sanitize gegen XSS aus AI- oder Redaktions-Content. Whitelist: strong/em/u/br. */}
            <div dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(faq.answer) }} />
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
