/**
 * GA4 Custom Events — only fires if gtag is loaded (consent given)
 */

type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(...args);
  }
}

export function trackEvent({ action, category, label, value }: GtagEvent) {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}

/** User triggers a calculation */
export function trackCalculatorUse(calculatorName: string) {
  trackEvent({
    action: 'calculator_use',
    category: 'engagement',
    label: calculatorName,
  });
}

/** User expands a FAQ item */
export function trackFaqExpand(question: string) {
  trackEvent({
    action: 'faq_expand',
    category: 'engagement',
    label: question,
  });
}

/** User clicks share/copy URL */
export function trackShareClick(calculatorName: string) {
  trackEvent({
    action: 'share_click',
    category: 'engagement',
    label: calculatorName,
  });
}

/** User clicks an affiliate link */
export function trackAffiliateClick(partner: string, product: string) {
  trackEvent({
    action: 'affiliate_click',
    category: 'monetization',
    label: `${partner}:${product}`,
  });
}
