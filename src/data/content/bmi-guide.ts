import type { FAQ } from '@/types/content';

export const BMI_FAQS: FAQ[] = [
  {
    question: 'Was ist ein gesunder BMI?',
    answer: 'Ein BMI zwischen 18,5 und 24,9 gilt laut WHO als Normalgewicht. Dieser Bereich ist mit dem geringsten Gesundheitsrisiko verbunden. Allerdings ist der BMI nur ein grober Richtwert und berücksichtigt nicht Faktoren wie Muskelmasse, Körperbau oder Alter.',
  },
  {
    question: 'Wie berechnet man den BMI?',
    answer: 'Der BMI wird berechnet, indem das Körpergewicht in Kilogramm durch die Körpergröße in Metern zum Quadrat geteilt wird: BMI = Gewicht (kg) ÷ Größe (m)². Beispiel: 75 kg bei 1,75 m → BMI = 75 ÷ (1,75 × 1,75) = 24,5.',
  },
  {
    question: 'Gilt der BMI für alle Menschen gleich?',
    answer: 'Nein. Der BMI ist für Erwachsene zwischen 18 und 65 Jahren ausgelegt. Für Kinder, Jugendliche, Schwangere, ältere Menschen und Sportler mit hohem Muskelanteil gelten andere Maßstäbe. Der BMI berücksichtigt nicht die Körperzusammensetzung.',
  },
  {
    question: 'Was ist besser: BMI oder Bauchumfang?',
    answer: 'Der Bauchumfang ist ein besserer Indikator für gesundheitliche Risiken als der BMI, da er speziell das viszerale Fett (Bauchfett) erfasst. Als Richtwert gilt: Frauen sollten einen Bauchumfang unter 80 cm, Männer unter 94 cm anstreben.',
  },
  {
    question: 'Kann Muskelmasse den BMI verfälschen?',
    answer: 'Ja, definitiv. Muskeln sind schwerer als Fettgewebe. Sportler und Menschen mit hohem Muskelanteil können einen BMI über 25 haben, ohne übergewichtig zu sein. In solchen Fällen sind andere Methoden wie die Körperfettmessung aussagekräftiger.',
  },
  {
    question: 'Was ist das Idealgewicht?',
    answer: 'Das Idealgewicht ist der Gewichtsbereich, der einem BMI zwischen 18,5 und 24,9 entspricht. Bei einer Größe von 1,75 m liegt das Idealgewicht zwischen 56,7 kg und 76,3 kg. Das optimale Gewicht hängt aber von vielen individuellen Faktoren ab.',
  },
];
