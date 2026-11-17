// Texte der Landingpage /anmeldung (PKW Klasse B, B197, BF17).
// Preise kommen aus src/config/offer.ts und src/data/prices.ts, Reform-Fakten aus src/config/reform.ts.
// Bewertungen sind wörtlich übernommen (inkl. Tipp- und Grammatikfehler) und dürfen nicht verändert werden.

import { OFFER, PKW_OFFER_SAVINGS, formatOfferPrice } from '@/config/offer';
import type { Faq, Review } from '@/components/lp/constants';
import { PRICES_B, priceOf } from '@/data/prices';

/** Versionskennung für PostHog, um alte und neue Seite vergleichen zu können. */
export const LP_VERSION = 'beratung-2026-11';

export const FORM_ID = 'beratung';
export const HERO_ID = 'hero-pkw';
export const SOURCE = 'landingpage-pkw';
export const TRACKING_SOURCE = 'landing-pkw';

export const scrollToForm = () => {
  document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const GRUNDBETRAG = formatOfferPrice(OFFER.pkwGrundbetrag);
export const GRUNDBETRAG_VORHER = formatOfferPrice(OFFER.pkwPreviousGrundbetrag);
export const GUELTIG_BIS = OFFER.pkwValidUntilLabel;
export const B197_VORTEIL = formatOfferPrice(PKW_OFFER_SAVINGS);
export const SCHALTSTUNDEN_VORHER = formatOfferPrice(OFFER.b197PreviousSchaltstundenPreis);

/** Pflicht-Sonderfahrten Klasse B nach heutigem Recht (Anlage 4 FahrschAusbO), je 45 Min. */
export const SONDERFAHRTEN = [
  { label: 'Überland', count: 5 },
  { label: 'Autobahn', count: 4 },
  { label: 'Dämmerung/Dunkelheit', count: 3 },
] as const;
export const SONDERFAHRTEN_ANZAHL = SONDERFAHRTEN.reduce((s, f) => s + f.count, 0);

export const WHATSAPP_TEXT =
  'Hallo, ich interessiere mich für den Führerschein Klasse B und das Winter-Angebot. Könnt ihr mich beraten?';

export const CLASS_OPTIONS = [
  { value: 'b', label: 'Klasse B – Schaltwagen' },
  { value: 'b197', label: 'Klasse B197 – Automatik, Schalten erlaubt' },
  { value: 'bf17', label: 'BF17 – Begleitetes Fahren ab 17' },
  { value: 'be', label: 'Klasse BE – mit Anhänger' },
];

/** Gleiche Werte wie im Formular bis Oktober 2026, damit die Startwunsch-Daten vergleichbar bleiben. */
export const START_OPTIONS = ['Sofort', 'In 1–2 Monaten', 'Weiß noch nicht'] as const;

export const REVIEWS: Review[] = [
  {
    name: 'Zaplatix',
    text: 'Ich kann es hier nur empfehlen, bin hier hin gewechselt und innerhalb von 3 Monaten beim ersten Versuch bestanden, sowohl Serdar als auch Ali sind super Fahrlehrer, meine klare Empfehlung',
  },
  {
    name: 'Janne Stuer',
    text: 'Sehr nett alle und habe schnell viele Termine bekommen. Hab nur knapp 2 Monate für alle Fahrstunden gebraucht.',
  },
  {
    name: 'THS KALLE Boss',
    text: 'Ein gute Fahrschule mit kompetente Fahrlehrer und alles beim ersten Mal bestanden.( hat nur 2 Monate gedauert)',
  },
];

export const STEPS = [
  {
    title: 'Beratung anfragen',
    text: 'Name und Telefonnummer reichen. Kostenlos und unverbindlich.',
  },
  {
    title: 'Wir rufen dich an',
    text: 'Werktags innerhalb von 24 Stunden. Wir beantworten deine Fragen und rechnen dir deinen Preis aus.',
  },
  {
    title: 'Anmelden, wenn es für dich passt',
    text: 'Bei uns im Weberpark in Babelsberg. Danach startet dein Theoriekurs, die Theorie schaffst du in einer Woche.',
  },
];

const bis = GUELTIG_BIS ? ` bis ${GUELTIG_BIS}` : '';

export const FAQS: Faq[] = [
  {
    question: 'Bin ich mit der Anfrage schon angemeldet?',
    answer: `Nein. Die Anfrage ist kostenlos und unverbindlich. Wir rufen dich an, beraten dich und rechnen dir deinen Preis aus. Anmelden kannst du dich danach persönlich bei uns im Weberpark, wenn es für dich passt. Das ${OFFER.label} gilt bei Anmeldung${bis}.`,
  },
  {
    question: 'Was kostet der Führerschein am Ende komplett?',
    answer: `Fest stehen der Grundbetrag von ${GRUNDBETRAG} und die ${SONDERFAHRTEN_ANZAHL} vorgeschriebenen Sonderfahrten zu je 80 €. Dazu kommen deine Übungsstunden zu je 73,12 € (45 Min.), die Vorstellung zur praktischen Prüfung (${priceOf(PRICES_B, 'Vorstellung zur praktischen Prüfung')}), die Lern-App und die amtlichen Gebühren. Wie viele Übungsstunden du brauchst, ist sehr unterschiedlich. Im Beratungsgespräch schätzen wir das mit dir ab und rechnen dir eine realistische Gesamtsumme aus.`,
  },
  {
    question: 'Soll ich mit dem Führerschein auf die Reform warten?',
    answer:
      'Nach heutigem Stand bringt Warten keinen belegten Vorteil. Die Reform gilt noch nicht, das Gesetz soll frühestens am 1. Juli 2027 in Kraft treten, und eine Ersparnis für den Führerschein über die Fahrschule nennt das Gesetz nicht. Viele unserer Fahrschüler sind in 2 bis 3 Monaten fertig. Alle Details findest du auf unserer Seite zur Führerscheinreform.',
  },
  {
    question: 'Wie lange dauert der Führerschein bei euch?',
    answer:
      'Die Theorie schaffst du bei uns in einer Woche. Wie schnell es danach geht, hängt vor allem davon ab, wie viele Fahrstunden du pro Woche nehmen kannst. Viele unserer Fahrschüler sind in 2 bis 3 Monaten fertig.',
  },
  {
    question: 'Wie flexibel sind die Fahrstunden?',
    answer:
      'Wir planen die Fahrstunden gemeinsam mit dir, auch neben Schule, Ausbildung oder Job. Termine außerhalb der Bürozeiten sind nach Absprache möglich.',
  },
  {
    question: 'Was ist B197 und warum lohnt sich das gerade?',
    answer: `Bei B197 lernst du überwiegend auf einem Automatikauto. Dazu kommen 10 Schaltstunden und eine kurze Testfahrt im Schaltwagen. Danach darfst du beides fahren, ohne Automatik-Eintrag im Führerschein. Im ${OFFER.label} kosten dich die 10 Schaltstunden à 45 Min. 0 € statt ${SCHALTSTUNDEN_VORHER}.`,
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
    answer:
      'Nein. Die Beratung kostet nichts, und auch bei der Anmeldung gibt es keine Vorkasse.',
  },
];
