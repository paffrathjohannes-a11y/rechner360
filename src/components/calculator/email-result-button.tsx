'use client';

import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/utils/analytics-events';

interface EmailResultButtonProps {
  subject: string;
  body: string;
  calculatorName: string;
}

export function EmailResultButton({ subject, body, calculatorName }: EmailResultButtonProps) {
  function handleClick() {
    trackEvent({ action: 'email_result', category: 'engagement', label: calculatorName });
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleClick} className="gap-2">
      <Mail className="w-4 h-4" />
      Ergebnis per E-Mail senden
    </Button>
  );
}
