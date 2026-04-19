import { Quote, ShieldCheck, Award, Database } from 'lucide-react';

/**
 * Trust-Strip mit echten Vertrauens-Signalen: Quellen-Basis + "Was andere
 * sagen". Bewusst KEINE erfundenen Fake-Testimonials (ethisch + rechtlich
 * heikel), sondern konkrete Qualitäts-Merkmale der Seite.
 *
 * Kann später um echte Nutzer-Testimonials erweitert werden, sobald
 * authentische Zitate vorliegen (Google-Reviews, echte Kundenfeedback-Mails).
 */

const SIGNALS = [
  {
    icon: Database,
    title: 'Offizielle Formeln',
    text: 'Alle Berechnungen basieren auf BMF-Daten, GKV-Spitzenverband und Bundesstatistik.',
  },
  {
    icon: ShieldCheck,
    title: 'DSGVO-konform',
    text: 'Alles läuft lokal in Ihrem Browser. Keine Daten verlassen Ihr Gerät.',
  },
  {
    icon: Award,
    title: 'Monatlich aktualisiert',
    text: 'Steuer- und Sozialversicherungs­parameter werden laufend an aktuelle Werte angepasst.',
  },
  {
    icon: Quote,
    title: 'Transparente Quellen',
    text: 'Auf jedem Rechner sehen Sie, woher die Daten kommen und wann sie zuletzt geprüft wurden.',
  },
];

export function TestimonialsStrip() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border bg-surface-raised/30 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-text text-center mb-6">
          Warum Nutzer rechner360.de vertrauen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SIGNALS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex gap-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-500/10 text-accent-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">{s.title}</h3>
                  <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
