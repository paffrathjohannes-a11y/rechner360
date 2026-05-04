'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import {
  calculateEinkommensteuer,
  type EinkommensteuerResult,
  type EinkommensArt,
} from '@/lib/calculator/tax/einkommensteuer';
import { formatCurrency } from '@/lib/utils/format';
import { BUNDESLAENDER, STEUERKLASSEN } from '@/lib/utils/constants';
import { useUrlStateRead, useUrlStateSync, parsers } from '@/hooks/use-url-state';

const CURRENT_YEAR = new Date().getFullYear();

export function EinkommensteuerForm() {
  const [einkommensArt, setEinkommensArt] = useState<EinkommensArt>('zve');
  const [einkommen, setEinkommen] = useState(50000);
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [zusammenveranlagung, setZusammenveranlagung] = useState(false);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [bundesland, setBundesland] = useState('nw');

  // URL-State: ?e=50000&sk=1&zv=1&ks=1&bl=nw
  const urlOverrides = useUrlStateRead<{ e: number; sk: number; zv: boolean; ks: boolean; bl: string }>({
    e: parsers.int, sk: parsers.int, zv: parsers.bool, ks: parsers.bool, bl: parsers.str,
  });
  useEffect(() => {
    // Externer Input (URL) → React-State, einmalige Synchronisierung nach Mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlOverrides.e !== undefined && urlOverrides.e > 0) setEinkommen(urlOverrides.e);
    if (urlOverrides.sk !== undefined && [1, 2, 3, 4, 5, 6].includes(urlOverrides.sk)) {
      setSteuerklasse(urlOverrides.sk as 1|2|3|4|5|6);
    }
    if (urlOverrides.zv !== undefined) setZusammenveranlagung(urlOverrides.zv);
    if (urlOverrides.ks !== undefined) setKirchensteuer(urlOverrides.ks);
    if (urlOverrides.bl) setBundesland(urlOverrides.bl);
  }, [urlOverrides]);
  useUrlStateSync({
    e: einkommen !== 50000 ? einkommen : null,
    sk: steuerklasse !== 1 ? steuerklasse : null,
    zv: zusammenveranlagung ? 1 : null,
    ks: kirchensteuer ? 1 : null,
    bl: bundesland !== 'nw' ? bundesland : null,
  });
  const [kinderfreibetraege, setKinderfreibetraege] = useState(0);
  const [geburtsjahr, setGeburtsjahr] = useState<number | ''>('');

  const result = useMemo<EinkommensteuerResult>(() => calculateEinkommensteuer({
    einkommen,
    einkommensArt,
    steuerklasse,
    zusammenveranlagung,
    kirchensteuer,
    bundesland,
    kinderfreibetraege,
    geburtsjahr: geburtsjahr === '' ? undefined : geburtsjahr,
  }), [einkommen, einkommensArt, steuerklasse, zusammenveranlagung, kirchensteuer, bundesland, kinderfreibetraege, geburtsjahr]);

  // Splitting ist impliziert, wenn SK III ODER Toggle "Zusammenveranlagung" an
  const splittingAktiv = zusammenveranlagung || steuerklasse === 3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          {/* Einkommensart: zvE oder Brutto */}
          <InputGroup label="Einkommensart" htmlFor="art" tooltip="zvE = zu versteuerndes Einkommen (nach allen Abzügen). Brutto = Jahresgehalt vor Pauschalen — Rechner zieht Werbungskosten- und Sonderausgabenpauschale automatisch ab.">
            <Select
              id="art"
              value={einkommensArt}
              onChange={(e) => setEinkommensArt(e.target.value as EinkommensArt)}
            >
              <option value="zve">Zu versteuerndes Einkommen (zvE)</option>
              <option value="brutto">Bruttojahreseinkommen</option>
            </Select>
          </InputGroup>

          <InputGroup
            label={einkommensArt === 'brutto' ? 'Bruttojahreseinkommen' : 'Zu versteuerndes Einkommen (jährlich)'}
            htmlFor="einkommen"
            tooltip={einkommensArt === 'brutto'
              ? 'Ihr Bruttojahresgehalt vor Steuern und Sozialabgaben. Werbungskostenpauschale (1.230 €) und Sonderausgaben-Pauschbetrag werden automatisch abgezogen.'
              : 'Ihr Jahreseinkommen nach Abzug aller Werbungskosten, Sonderausgaben und außergewöhnlichen Belastungen.'}
          >
            <CurrencyInput id="einkommen" value={einkommen} onChange={setEinkommen} />
          </InputGroup>

          <InputGroup label="Steuerklasse" htmlFor="sk">
            <Select id="sk" value={steuerklasse} onChange={(e) => setSteuerklasse(Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}>
              {STEUERKLASSEN.map((sk) => (
                <option key={sk.id} value={sk.id}>{sk.name} — {sk.description}</option>
              ))}
            </Select>
          </InputGroup>

          <div className="space-y-1">
            <Toggle
              label="Zusammenveranlagung (Ehegattensplitting)"
              checked={splittingAktiv}
              onChange={setZusammenveranlagung}
              disabled={steuerklasse === 3}
            />
            <p className="text-xs text-text-muted pl-11">
              {steuerklasse === 3
                ? 'Bei Steuerklasse III automatisch aktiv.'
                : 'Für verheiratete Paare — Einkommen wird geteilt, Tarif angewendet, Steuer verdoppelt.'}
            </p>
          </div>

          <InputGroup label="Bundesland" htmlFor="bl" tooltip="Relevant für den Kirchensteuersatz (8% in Bayern/BaWü, 9% sonst).">
            <Select id="bl" value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
              {BUNDESLAENDER.map((bl) => (
                <option key={bl.id} value={bl.id}>{bl.name}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Kinderfreibeträge" htmlFor="kfb" tooltip="Halbe Kinderfreibeträge (z. B. 1,0 = 1 Kind bei Einzelveranlagung, 0,5 = geteilt). Bei Zusammenveranlagung: volle Kinderfreibeträge.">
            <Select id="kfb" value={kinderfreibetraege} onChange={(e) => setKinderfreibetraege(Number(e.target.value))}>
              <option value={0}>Keine</option>
              <option value={0.5}>0,5</option>
              <option value={1}>1,0</option>
              <option value={1.5}>1,5</option>
              <option value={2}>2,0</option>
              <option value={2.5}>2,5</option>
              <option value={3}>3,0</option>
              <option value={4}>4,0</option>
              <option value={5}>5,0</option>
            </Select>
          </InputGroup>

          {einkommensArt === 'brutto' && (
            <InputGroup
              label="Geburtsjahr (für Altersentlastungsbetrag)"
              htmlFor="gj"
              tooltip="Optional. Ab dem Folgejahr der Vollendung des 64. Lebensjahres greift der Altersentlastungsbetrag nach §24a EStG (jahrgangsabhängige Staffelung)."
            >
              <Select
                id="gj"
                value={geburtsjahr === '' ? '' : String(geburtsjahr)}
                onChange={(e) => setGeburtsjahr(e.target.value === '' ? '' : Number(e.target.value))}
              >
                <option value="">— nicht anwendbar —</option>
                {Array.from({ length: 60 }, (_, i) => CURRENT_YEAR - 64 - i).map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </Select>
            </InputGroup>
          )}

          <Toggle label="Kirchensteuer" checked={kirchensteuer} onChange={setKirchensteuer} />

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">
                  Einkommensteuer 2026{splittingAktiv ? ' · Splittingtarif' : ''}
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">
                  {formatCurrency(result.einkommensteuer)}
                </p>
                <p className="text-sm text-text-muted">pro Jahr ({formatCurrency(result.einkommensteuer / 12)} / Monat)</p>
              </div>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Grenzsteuersatz</p>
                <p className="text-lg font-bold text-text">{result.grenzsteuersatz} %</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Durchschnittssatz</p>
                <p className="text-lg font-bold text-text">{result.durchschnittssteuersatz} %</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Solidaritätszuschlag</p>
                <p className="text-lg font-bold font-currency text-text">{formatCurrency(result.solidaritaetszuschlag)}</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Gesamtbelastung</p>
                <p className="text-lg font-bold font-currency text-text">{formatCurrency(result.gesamtbelastung)}</p>
              </Card>
            </div>

            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  {result.aufschluesselung.map((item, i) => {
                    const isTotal = item.label === 'Steuerbelastung gesamt';
                    const isNetto = item.label === 'Verbleibendes Einkommen';
                    const isZvE = item.label === 'Zu versteuerndes Einkommen';
                    const isDeduction = [
                      'Werbungskostenpauschale',
                      'Altersentlastungsbetrag (§24a EStG)',
                      'Kinderfreibetrag',
                    ].includes(item.label) || item.label.startsWith('Sonderausgaben-Pauschbetrag');
                    return (
                      <tr
                        key={i}
                        className={`border-b border-border last:border-b-0 ${
                          isTotal || isNetto || isZvE ? 'bg-surface-sunken font-semibold' : 'hover:bg-surface-raised'
                        } transition-colors`}
                      >
                        <td
                          className={`px-4 py-3 ${
                            isNetto
                              ? 'text-accent-600 dark:text-accent-400'
                              : isTotal
                                ? 'text-negative-500'
                                : isDeduction
                                  ? 'text-text-secondary'
                                  : 'text-text-secondary'
                          }`}
                        >
                          {item.label}
                        </td>
                        <td
                          className={`px-4 py-3 text-right font-currency font-medium ${
                            isNetto
                              ? 'text-accent-600 dark:text-accent-400'
                              : isTotal
                                ? 'text-negative-500'
                                : isDeduction
                                  ? 'text-positive-500'
                                  : 'text-text'
                          }`}
                        >
                          {isTotal
                            ? `-${formatCurrency(item.betrag)}`
                            : isDeduction
                              ? `-${formatCurrency(item.betrag)}`
                              : formatCurrency(item.betrag)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
