import { Accordion, AccordionItem } from '@/components/ui/accordion';
import type { FAQ } from '@/types/content';
import { cn } from '@/lib/utils/cn';

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
        H&auml;ufig gestellte Fragen
      </h2>
      <Accordion>
        {faqs.map((faq, i) => (
          <AccordionItem key={i} title={faq.question}>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
