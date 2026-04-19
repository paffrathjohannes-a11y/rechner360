'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateKfz, type KfzResult, type Fahrzeugtyp } from '@/lib/calculator/insurance/kfz';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { Car, Shield, ShieldCheck, ShieldAlert, Lightbulb } from 'lucide-react';
import { useUrlStateRead, useUrlStateSync, parsers } from '@/hooks/use-url-state';

const versicherungStyles = {
  haftpflicht: { text: 'text-primary-500', icon: Shield },
  teilkasko: { text: 'text-accent-500', icon: ShieldCheck },
  vollkasko: { text: 'text-warning-500', icon: ShieldAlert },
};

interface KfzFormProps {
  initialFahrzeugtyp?: Fahrzeugtyp;
  initialAlter?: number;
}

export function KfzForm({ initialFahrzeugtyp = 'kompakt', initialAlter = 35 }: KfzFormProps) {
  const [fahrzeugtyp, setFahrzeugtyp] = useState<Fahrzeugtyp>(initialFahrzeugtyp);
  const [erstzulassung, setErstzulassung] = useState(2022);
  const [sfKlasse, setSfKlasse] = useState(10);
  const [jahreslaufleistung, setJahreslaufleistung] = useState(12000);
  const [garagenstellplatz, setGaragenstellplatz] = useState(false);
  const [alter, setAlter] = useState(initialAlter);

  // URL-State: ?ft=kompakt&a=35&sf=10&km=12000
  const urlOverrides = useUrlStateRead<{ ft: string; a: number; sf: number; km: number }>({
    ft: parsers.str, a: parsers.int, sf: parsers.int, km: parsers.int,
  });
  useEffect(() => {
    if (urlOverrides.ft) setFahrzeugtyp(urlOverrides.ft as Fahrzeugtyp);
    if (urlOverrides.a !== undefined && urlOverrides.a > 0) setAlter(urlOverrides.a);
    if (urlOverrides.sf !== undefined && urlOverrides.sf >= 0) setSfKlasse(urlOverrides.sf);
    if (urlOverrides.km !== undefined && urlOverrides.km > 0) setJahreslaufleistung(urlOverrides.km);
  }, [urlOverrides]);
  useUrlStateSync({
    ft: fahrzeugtyp !== initialFahrzeugtyp ? fahrzeugtyp : null,
    a: alter !== initialAlter ? alter : null,
    sf: sfKlasse !== 10 ? sfKlasse : null,
    km: jahreslaufleistung !== 12000 ? jahreslaufleistung : null,
  });
  const [selbstbeteiligung, setSelbstbeteiligung] = useState(300);
  const [result, setResult] = useState<KfzResult | null>(null);

  useEffect(() => {
    if (alter > 0 && erstzulassung > 1990) {
      setResult(calculateKfz({ fahrzeugtyp, erstzulassung, sfKlasse, jahreslaufleistung, garagenstellplatz, alter, selbstbeteiligung }));
    }
  }, [fahrzeugtyp, erstzulassung, sfKlasse, jahreslaufleistung, garagenstellplatz, alter, selbstbeteiligung]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Fahrzeugtyp" htmlFor="typ">
            <Select id="typ" value={fahrzeugtyp} onChange={(e) => setFahrzeugtyp(e.target.value as Fahrzeugtyp)}>
              <option value="kleinwagen">Kleinwagen (z.B. VW Polo)</option>
              <option value="kompakt">Kompaktklasse (z.B. VW Golf)</option>
              <option value="mittelklasse">Mittelklasse (z.B. BMW 3er)</option>
              <option value="oberklasse">Oberklasse (z.B. Mercedes E)</option>
              <option value="suv">SUV (z.B. VW Tiguan)</option>
              <option value="elektro">Elektro (z.B. Tesla Model 3)</option>
            </Select>
          </InputGroup>

          <InputGroup label="Erstzulassung" htmlFor="ez">
            <Select id="ez" value={erstzulassung} onChange={(e) => setErstzulassung(Number(e.target.value))}>
              {Array.from({ length: 20 }, (_, i) => 2026 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Schadenfreiheitsklasse" htmlFor="sf" tooltip="SF0 = Anfänger (teuer), SF10 = 10 schadenfr. Jahre, SF35 = Maximum.">
            <Select id="sf" value={sfKlasse} onChange={(e) => setSfKlasse(Number(e.target.value))}>
              {[0, 1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30, 35].map((sf) => (
                <option key={sf} value={sf}>SF {sf}{sf === 0 ? ' (Anfänger)' : sf >= 20 ? ' (sehr günstig)' : ''}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Alter des Fahrers" htmlFor="alter">
            <NumberInput id="alter" min={18} max={80} value={alter} onChange={setAlter} suffix="Jahre" />
          </InputGroup>

          <InputGroup label="Jährliche Fahrleistung" htmlFor="km">
            <Select id="km" value={jahreslaufleistung} onChange={(e) => setJahreslaufleistung(Number(e.target.value))}>
              {[5000, 8000, 10000, 12000, 15000, 20000, 25000, 30000].map((km) => (
                <option key={km} value={km}>{km.toLocaleString('de-DE')} km</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Selbstbeteiligung (Kasko)" htmlFor="sb">
            <Select id="sb" value={selbstbeteiligung} onChange={(e) => setSelbstbeteiligung(Number(e.target.value))}>
              {[0, 150, 300, 500, 1000].map((sb) => (
                <option key={sb} value={sb}>{sb === 0 ? 'Keine' : `${sb} €`}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Garagenstellplatz" htmlFor="garage">
            <Select id="garage" value={garagenstellplatz ? 'ja' : 'nein'} onChange={(e) => setGaragenstellplatz(e.target.value === 'ja')}>
              <option value="nein">Nein</option>
              <option value="ja">Ja (Garage/Carport)</option>
            </Select>
          </InputGroup>

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result ? (
          <div className="animate-result-in space-y-6">
            {/* Drei Versicherungsoptionen */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['haftpflicht', 'teilkasko', 'vollkasko'] as const).map((typ) => {
                const style = versicherungStyles[typ];
                const Icon = style.icon;
                const isEmpfehlung = result.empfehlung === typ;
                const wert = result[typ];
                return (
                  <Card key={typ} padding="md" className={cn('text-center relative', isEmpfehlung && 'ring-2 ring-accent-500/30 border-accent-500/50')}>
                    {isEmpfehlung && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">Empfohlen</span>
                    )}
                    <Icon className={cn('w-5 h-5 mx-auto mb-2', style.text)} />
                    <p className="text-sm text-text-muted">{typ === 'haftpflicht' ? 'Haftpflicht' : typ === 'teilkasko' ? 'Haftpflicht + Teilkasko' : 'Haftpflicht + Vollkasko'}</p>
                    <p className={cn('text-2xl font-bold font-currency mt-1', style.text)}>
                      {formatCurrency(wert)}
                    </p>
                    <p className="text-sm text-text-muted mt-1">pro Jahr</p>
                  </Card>
                );
              })}
            </div>

            {/* Empfehlung */}
            <Card padding="md" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text">Unsere Empfehlung: <span className="capitalize">{result.empfehlung}</span></p>
                  <p className="text-sm text-text-secondary mt-1">{result.empfehlung_text}</p>
                </div>
              </div>
            </Card>


            {/* Spartipp */}
            <Card padding="md" className="bg-warning-50/30 dark:bg-warning-500/5 border-warning-200 dark:border-warning-800">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-warning-500 shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">{result.spartipp}</p>
              </div>
            </Card>

            {/* Vergleichstabelle */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text">Leistungsvergleich</h3>
              <Card padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-sunken">
                        <th className="px-4 py-2 text-left text-text-secondary font-medium">Schutz</th>
                        <th className="px-4 py-2 text-center text-text-secondary font-medium">Haftpflicht</th>
                        <th className="px-4 py-2 text-center text-text-secondary font-medium">Teilkasko</th>
                        <th className="px-4 py-2 text-center text-text-secondary font-medium">Vollkasko</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Fremdschäden', true, true, true],
                        ['Diebstahl', false, true, true],
                        ['Glasbruch', false, true, true],
                        ['Hagel & Sturm', false, true, true],
                        ['Wildunfall', false, true, true],
                        ['Eigenverschulden', false, false, true],
                        ['Vandalismus', false, false, true],
                      ].map(([label, hp, tk, vk]) => (
                        <tr key={label as string} className="border-b border-border last:border-b-0">
                          <td className="px-4 py-2 text-text">{label as string}</td>
                          <td className="px-4 py-2 text-center">{hp ? '✓' : '—'}</td>
                          <td className="px-4 py-2 text-center">{tk ? '✓' : '—'}</td>
                          <td className="px-4 py-2 text-center">{vk ? '✓' : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <Card padding="lg" className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <Car className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">Geben Sie Ihre Fahrzeugdaten ein.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
