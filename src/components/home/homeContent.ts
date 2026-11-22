// Texte der Startseite. Neu aufgebaut am 18.11.2026 (Analyse: PostHog, 65 Sitzungsaufnahmen, Lead-Datenbank).
// Preise kommen aus src/config/offer.ts und src/data/prices.ts, Reform-Fakten aus src/config/reform.ts.
// Bewertungen kommen aus src/components/anmeldung/content.ts (REVIEWS, wörtlich übernommen).

import { OFFER, formatOfferPrice } from '@/config/offer';
import { PRICES_A, PRICES_B, priceOf } from '@/data/prices';
import type { Faq } from '@/components/lp/constants';

/** Versionskennung für PostHog, um alte und neue Startseite vergleichen zu können. */
export const HOME_LP_VERSION = 'home-2026-11';
export const HOME_FORM_ID = 'contact';
export const HOME_SOURCE = 'homepage';
export const HOME_TRACKING_SOURCE = 'homepage-kontakt';

export const HOME_WHATSAPP_TEXT =
  'Hallo, ich interessiere mich für einen Führerschein bei der ABF Fahrschule. Könnt ihr mich beraten?';

export const HOME_CLASS_OPTIONS = [
  { value: 'b', label: 'Klasse B – Auto, Schaltwagen' },
  { value: 'b197', label: 'Klasse B197 – Automatik, Schalten erlaubt' },
  { value: 'bf17', label: 'BF17 – Begleitetes Fahren ab 17' },
  { value: 'be', label: 'Klasse BE – mit Anhänger' },
  { value: 'a1', label: 'Klasse A1 – Motorrad ab 16' },
  { value: 'a2', label: 'Klasse A2 – Motorrad ab 18' },
  { value: 'a', label: 'Klasse A – Motorrad' },
  { value: 'b196', label: 'B196 – 125er mit Autoführerschein' },
];

export const PKW_GRUNDBETRAG = formatOfferPrice(OFFER.pkwGrundbetrag);
export const PKW_GRUNDBETRAG_VORHER = formatOfferPrice(OFFER.pkwPreviousGrundbetrag);
export const MOTORRAD_GRUNDBETRAG = formatOfferPrice(OFFER.motorradGrundbetrag);
export const B196_FESTPREIS = formatOfferPrice(OFFER.b196Festpreis);
export const PKW_FAHRSTUNDE = priceOf(PRICES_B, 'Übungsstunde');
export const PKW_SONDERFAHRT = priceOf(PRICES_B, 'Besondere Ausbildungsfahrt Überland');
export const PKW_PRAXISPRUEFUNG = priceOf(PRICES_B, 'Vorstellung zur praktischen Prüfung');
export const MOTORRAD_FAHRSTUNDE = priceOf(PRICES_A, 'Übungsstunde');

export type ClassCard = {
  key: string;
  kicker: string;
  title: string;
  text: string;
  price?: string;
  to?: string;
  cta: string;
};

export const CLASS_CARDS: ClassCard[] = [
  {
    key: 'b',
    kicker: 'Auto',
    title: 'Klasse B, B197 und BF17',
    text: 'Ab 17 mit Begleitung oder ab 18. Im Schaltwagen oder auf Automatik mit Erlaubnis zum Schalten (B197).',
    price: `${OFFER.label}: Grundbetrag ${PKW_GRUNDBETRAG}`,
    to: '/anmeldung',
    cta: 'Zum Auto-Führerschein',
  },
  {
    key: 'a',
    kicker: 'Motorrad',
    title: 'Klasse A1, A2 und A',
    text: 'A1 ab 16, A2 ab 18, Klasse A direkt ab 24 oder nach zwei Jahren A2. Theorie im Winter, im Frühjahr aufs Motorrad.',
    price: `${OFFER.label}: Grundbetrag ${MOTORRAD_GRUNDBETRAG}`,
    to: '/anmeldungmotorrad',
    cta: 'Zum Motorrad-Führerschein',
  },
  {
    key: 'b196',
    kicker: '125er',
    title: 'B196 mit Autoführerschein',
    text: 'Mit dem Autoführerschein Leichtkrafträder bis 125 cm³ fahren, ohne Prüfung. In der Regel in zwei bis drei Wochen.',
    price: `Festpreis ${B196_FESTPREIS}`,
    to: '/b196',
    cta: 'Zu B196',
  },
  {
    key: 'be',
    kicker: 'Anhänger',
    title: 'Klasse BE',
    text: 'Für das Fahren mit größerem Anhänger. Wir sagen dir, ob du BE brauchst.',
    cta: 'Beratung anfragen',
  },
];

const bis = OFFER.pkwValidUntilLabel ? ` bis ${OFFER.pkwValidUntilLabel}` : '';

export const REFORM_FAQ_QUESTION = 'Soll ich mit dem Führerschein auf die Reform warten?';

export const HOME_FAQS: Faq[] = [
  {
    question: 'Was kostet der Führerschein bei euch?',
    answer: `Für Klasse B liegt der Grundbetrag im ${OFFER.label} bei ${PKW_GRUNDBETRAG} (gilt bei Anmeldung${bis}), inklusive Theorie und Erste-Hilfe-Kurs. Dazu kommen die 12 vorgeschriebenen Sonderfahrten zu je ${PKW_SONDERFAHRT}, deine Übungsstunden zu je ${PKW_FAHRSTUNDE} (45 Min.), die Vorstellung zur praktischen Prüfung (${PKW_PRAXISPRUEFUNG}), die Lern-App und die amtlichen Gebühren. Wie viele Übungsstunden du brauchst, ist sehr unterschiedlich. Im Beratungsgespräch rechnen wir dir eine realistische Gesamtsumme aus.`,
  },
  {
    question: REFORM_FAQ_QUESTION,
    answer:
      'Nach heutigem Stand ist nicht belegt, dass Warten günstiger wird. Die Reform gilt noch nicht: Bundestag und Bundesrat haben das Gesetz beschlossen, es tritt zum größten Teil am 1. Juli 2027 in Kraft. Eine Ersparnis für den Führerschein nennt das Gesetz nicht. Alle Details findest du auf unserer Seite zur Führerscheinreform.',
  },
  {
    question: 'Wie lange dauert der Führerschein bei euch?',
    answer:
      'Die Theorie schaffst du bei uns in einer Woche. Wie schnell es danach geht, hängt vor allem davon ab, wie viele Fahrstunden du pro Woche nehmen kannst. Viele unserer Fahrschüler sind in 2 bis 3 Monaten fertig.',
  },
  {
    question: 'Was ist B197?',
    answer: `Bei B197 lernst du überwiegend auf einem Automatikauto. Dazu kommen 10 Schaltstunden und eine kurze Testfahrt im Schaltwagen. Danach darfst du beides fahren, ohne Automatik-Eintrag im Führerschein. Im ${OFFER.label} kosten dich die 10 Schaltstunden à 45 Min. 0 €.`,
  },
  {
    question: 'Bietet ihr Motorrad und B196 an?',
    answer: `Ja. Wir bilden in den Klassen A1, A2 und A aus, der Grundbetrag liegt im ${OFFER.label} bei ${MOTORRAD_GRUNDBETRAG}. Die Schlüsselzahl B196 für 125er mit dem Autoführerschein kostet ${B196_FESTPREIS} Festpreis.`,
  },
  {
    question: 'Kann ich mit 17 anfangen (BF17)?',
    answer:
      'Ja. Anmelden kannst du dich schon mit 16,5 Jahren, die Prüfung machst du mit 17. Bis 18 fährst du dann mit einer eingetragenen Begleitperson.',
  },
  {
    question: 'Ich war schon bei einer anderen Fahrschule. Kann ich wechseln?',
    answer:
      'Ja. Im Beratungsgespräch schauen wir gemeinsam, was du schon geschafft hast und wie es bei uns für dich weitergeht.',
  },
  {
    question: 'Muss ich vorab etwas zahlen?',
    answer: 'Nein. Die Beratung kostet nichts, und auch bei der Anmeldung gibt es keine Vorkasse.',
  },
  {
    question: 'Wann habt ihr geöffnet und wo finde ich euch?',
    answer:
      'Im Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg. Das Büro ist Montag bis Freitag von 12 bis 18 Uhr besetzt. Fahrstunden sind nach Absprache auch außerhalb dieser Zeiten möglich.',
  },
];
