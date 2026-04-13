'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateBuergergeld, type BuergergeldResult } from '@/lib/calculator/social/buergergeld';
import { formatCurrency } from '@/lib/utils/format';

export function BuergergeldForm() {
  const [antragsteller, setAntragsteller] = useState<'single' | 'paar'>('single');
  const [kinder, setKinder] = useState<{ alter: number }[]>([]);
  const [warmmiete, setWarmmiete] = useState(500);
  const [einkommen, setEinkommen] = useState(0);
  const [einkommenPartner, setEinkommenPartner] = useState(0);
  const [kindergeld, setKindergeld] = useState(255);
  const [result, setResult] = useState<BuergergeldResult | null>(null);

  useEffect(() => {
    setResult(calculateBuergergeld({ antragsteller, kinder, warmmiete, einkommen, einkommenPartner, kindergeld }));
  }, [antragsteller, kinder, warmmiete, einkommen, einkommenPartner, kindergeld]);

  function addKind() {
    setKinder([...kinder, { alter: 3 }]);
  }
  function removeKind(index: number) {
    setKinder(kinder.filter((_, i) => i !== index));
  }
  function updateKindAlter(index: number, alter: number) {
    const updated = [...kinder];
    updated[index] = { alter };
    setKinder(updated);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Haushalt" htmlFor="haushalt">
            <Select id="haushalt" value={antragsteller} onChange={(e) => setAntragsteller(e.target.value as 'single' | 'paar')}>
              <option value="single">Alleinstehend / Alleinerziehend</option>
              <option value="paar">Paar / Bedarfsgemeinschaft</option>
            </Select>
          </InputGroup>

          {/* Kinder */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text">Kinder ({kinder.length})</span>
              <Button variant="ghost" size="sm" onClick={addKind}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Kind
              </Button>
            </div>
            {kinder.map((kind, i) => (
              <div key={i} className="flex items-center gap-2">
                <Select value={kind.alter} onChange={(e) => updateKindAlter(i, Number(e.target.value))} className="flex-1">
                  <option value={2}>0-5 Jahre</option>
                  <option value={8}>6-13 Jahre</option>
                  <option value={15}>14-17 Jahre</option>
                </Select>
                <button type="button" onClick={() => removeKind(i)} className="p-2 text-text-muted hover:text-negative-500 cursor-pointer">
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <InputGroup label="Warmmiete (inkl. Heizung)" htmlFor="miete" tooltip="Gesamtkosten für Unterkunft inkl. Nebenkosten und Heizung.">
            <CurrencyInput id="miete" value={warmmiete} onChange={setWarmmiete} />
          </InputGroup>

          <InputGroup label={antragsteller === 'paar' ? 'Bruttoeinkommen Person 1' : 'Bruttoeinkommen (monatlich)'} htmlFor="einkommen" tooltip="Bruttoeinkommen aus Erwerbstätigkeit. Freibeträge werden automatisch berechnet.">
            <CurrencyInput id="einkommen" value={einkommen} onChange={setEinkommen} />
          </InputGroup>

          {antragsteller === 'paar' && (
            <InputGroup label="Bruttoeinkommen Person 2" htmlFor="einkommen2" tooltip="Bruttoeinkommen des Partners. Eigener Freibetrag wird berechnet.">
              <CurrencyInput id="einkommen2" value={einkommenPartner} onChange={setEinkommenPartner} />
            </InputGroup>
          )}

          {kinder.length > 0 && (
            <InputGroup label="Kindergeld pro Kind" htmlFor="kg" tooltip="Kindergeld 2026: 255 €/Kind. Wird als Einkommen auf den Bedarf des Kindes angerechnet.">
              <CurrencyInput id="kg" value={kindergeld} onChange={setKindergeld} />
            </InputGroup>
          )}

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Ihr Grundsicherungs-Anspruch</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">
                  {formatCurrency(result.buergergeld)}
                </p>
                <p className="text-sm text-text-muted">monatlich</p>
              </div>
            </Card>

            {/* Aufschlüsselung */}
            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  {result.aufschluesselung.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors">
                      <td className="px-4 py-3 text-text-secondary">{item.label}</td>
                      <td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(item.betrag)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-surface-sunken border-t border-border">
                    <td className="px-4 py-3 font-semibold text-text">Gesamtbedarf</td>
                    <td className="px-4 py-3 text-right font-currency font-bold text-text">{formatCurrency(result.gesamtbedarf)}</td>
                  </tr>
                  {result.anrechenbares_einkommen > 0 && (
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 text-text-secondary">Anrechenbares Einkommen</td>
                      <td className="px-4 py-3 text-right font-currency text-negative-500">-{formatCurrency(result.anrechenbares_einkommen)}</td>
                    </tr>
                  )}
                  {result.freibetrag > 0 && (
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 text-sm text-text-muted pl-8">davon Freibetrag</td>
                      <td className="px-4 py-3 text-right font-currency text-sm text-text-muted">{formatCurrency(result.freibetrag)}</td>
                    </tr>
                  )}
                  <tr className="bg-accent-50/30 dark:bg-accent-900/10 border-t border-border">
                    <td className="px-4 py-3 font-bold text-accent-600 dark:text-accent-400">Grundsicherungs-Anspruch</td>
                    <td className="px-4 py-3 text-right font-currency font-bold text-accent-600 dark:text-accent-400">{formatCurrency(result.buergergeld)}</td>
                  </tr>
                </tfoot>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
