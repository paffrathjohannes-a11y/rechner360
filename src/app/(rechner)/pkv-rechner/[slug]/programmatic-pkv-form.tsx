'use client';

import { PkvForm } from '../pkv-form';
import type { Berufsgruppe } from '@/lib/calculator/insurance/pkv';

interface ProgrammaticPkvFormProps {
  alter: number;
  brutto: number;
  berufsgruppe: Berufsgruppe;
}

export function ProgrammaticPkvForm({ alter, brutto, berufsgruppe }: ProgrammaticPkvFormProps) {
  return <PkvForm initialAlter={alter} initialBrutto={brutto} initialBerufsgruppe={berufsgruppe} />;
}
