/**
 * Brutto-Netto Orchestrator
 *
 * Kombiniert den echten BMF PAP 2026 (Lohnsteuer + Soli + KiSt-Bemessung)
 * mit der Sozialversicherungsberechnung zu einem vollständigen Ergebnis.
 */

import { calculateMonthlyLst } from './tax/pap2026';
import { SV_2026 } from './social/sv-constants-2026';
import { BUNDESLAENDER } from '@/lib/utils/constants';
import type { BruttoNettoInput, BruttoNettoResult } from '@/types/calculator';

export function calculateBruttoNetto(input: BruttoNettoInput): BruttoNettoResult {
  const brutto = input.brutto;

  // === STEUERN (über echten PAP 2026) ===
  const pvKinderAnzahl = input.pflegeversicherung_kinder;
  const pvKinderlos = pvKinderAnzahl === 0 && input.alter_ueber_23;

  const lstResult = calculateMonthlyLst(brutto, input.steuerklasse, {
    kirchensteuer: input.kirchensteuer,
    kinderfreibetraege: input.kinderfreibetraege,
    kvZusatzbeitrag: input.kv_zusatzbeitrag,
    pvKinderlos,
    pvKinderAnzahl: pvKinderlos ? 0 : pvKinderAnzahl,
    isSachsen: input.bundesland === 'sn',
  });

  const lohnsteuer = lstResult.lohnsteuer;
  const solidaritaetszuschlag = lstResult.solidaritaetszuschlag;

  // Kirchensteuer = KiSt-Satz × Bemessungsgrundlage (= LSt ohne Kinder-Freibetrag)
  let kirchensteuer = 0;
  if (input.kirchensteuer) {
    const bl = BUNDESLAENDER.find((b) => b.id === input.bundesland);
    const kiStSatz = bl?.kirchensteuer ?? 0.09;
    kirchensteuer = round2(lstResult.kirchensteuerBemessung * kiStSatz);
  }

  const steuern_gesamt = round2(lohnsteuer + solidaritaetszuschlag + kirchensteuer);

  // === SOZIALVERSICHERUNG (AN-Anteil) ===
  const kvBemessung = Math.min(brutto, SV_2026.kv.bbg_monthly);
  const rvBemessung = Math.min(brutto, SV_2026.rv.bbg_monthly);
  const alvBemessung = Math.min(brutto, SV_2026.alv.bbg_monthly);
  const pvBemessung = Math.min(brutto, SV_2026.pv.bbg_monthly);

  // KV: halber allg. Satz + halber Zusatzbeitrag
  const kvZusatz = input.kv_zusatzbeitrag / 100;
  const krankenversicherung = round2(kvBemessung * (SV_2026.kv.rate / 2 + kvZusatz / 2));

  // RV
  const rentenversicherung = input.rentenversicherung
    ? round2(rvBemessung * SV_2026.rv.an_share)
    : 0;

  // ALV
  const arbeitslosenversicherung = input.arbeitslosenversicherung
    ? round2(alvBemessung * SV_2026.alv.an_share)
    : 0;

  // PV
  let pvSatz = SV_2026.pv.rate / 2;
  if (pvKinderlos) {
    pvSatz += SV_2026.pv.kinderlos_zuschlag;
  } else if (pvKinderAnzahl >= 2) {
    const abschlag = Math.min(
      (pvKinderAnzahl - 1) * SV_2026.pv.kind_abschlag,
      SV_2026.pv.max_abschlag,
    );
    pvSatz -= abschlag;
  }
  if (input.bundesland === 'sn') {
    pvSatz += SV_2026.pv.sachsen_extra_an;
  }
  const pflegeversicherung = round2(pvBemessung * pvSatz);

  const sozialversicherung_gesamt = round2(
    krankenversicherung + rentenversicherung + arbeitslosenversicherung + pflegeversicherung,
  );

  // === NETTO ===
  const abzuege_gesamt = round2(steuern_gesamt + sozialversicherung_gesamt);
  const netto = round2(brutto - abzuege_gesamt);

  // === AG-KOSTEN ===
  const ag_kv = round2(kvBemessung * (SV_2026.kv.rate / 2 + kvZusatz / 2));
  const ag_rv = round2(rvBemessung * SV_2026.rv.ag_share);
  const ag_alv = round2(alvBemessung * SV_2026.alv.ag_share);
  const ag_pv_satz = SV_2026.pv.rate / 2 - (input.bundesland === 'sn' ? SV_2026.pv.sachsen_extra_an : 0);
  const ag_pv = round2(pvBemessung * ag_pv_satz);
  const ag_umlage = round2(brutto * (SV_2026.umlagen.u1 + SV_2026.umlagen.u2 + SV_2026.umlagen.insolvenz));
  const ag_kosten_gesamt = round2(brutto + ag_kv + ag_rv + ag_alv + ag_pv + ag_umlage);

  return {
    brutto,
    netto,
    lohnsteuer,
    solidaritaetszuschlag,
    kirchensteuer,
    steuern_gesamt,
    krankenversicherung,
    rentenversicherung,
    arbeitslosenversicherung,
    pflegeversicherung,
    sozialversicherung_gesamt,
    abzuege_gesamt,
    ag_krankenversicherung: ag_kv,
    ag_rentenversicherung: ag_rv,
    ag_arbeitslosenversicherung: ag_alv,
    ag_pflegeversicherung: ag_pv,
    ag_umlage,
    ag_kosten_gesamt,
    steuersatz_effektiv: brutto > 0 ? steuern_gesamt / brutto : 0,
    sv_satz_effektiv: brutto > 0 ? sozialversicherung_gesamt / brutto : 0,
    abgabenquote: brutto > 0 ? abzuege_gesamt / brutto : 0,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
