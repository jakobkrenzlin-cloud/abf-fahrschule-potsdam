import type { Faq, Review, Step } from '@/components/lp/constants';

export const HOME_REVIEWS: Review[] = [
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

export const HOME_STEPS: Step[] = [
  { title: 'Anfrage stellen', text: 'Formular ausfüllen – Name und Telefonnummer reichen aus.' },
  { title: 'Beratung im Weberpark', text: 'Wir klären alle Fragen und planen deinen Start.' },
  { title: 'Theorie in einer Woche', text: 'Kompakter Unterricht, danach die theoretische Prüfung.' },
  { title: 'Praxis und Prüfung', text: 'Flexible Fahrstunden bis zur bestandenen Prüfung.' },
];

export const HOME_FAQS: Faq[] = [
  {
    question: 'Was kostet der Führerschein bei der ABF Fahrschule in Potsdam?',
    answer:
      'Der Grundbetrag für die Klasse B beträgt im Herbst-Angebot 199 €. Darin enthalten sind Anmeldung, kompletter Theorieunterricht, Lern-App und 1 Jahr ADAC-Mitgliedschaft. Fahrstunden (ab 73,12 € je 45 Min.) und amtliche Gebühren kommen zusätzlich dazu.',
  },
  {
    question: 'Wie lange dauert die Ausbildung?',
    answer:
      'Die Theorie schaffst du bei uns in einer Woche. Wie schnell es insgesamt geht, hängt davon ab, wie viele Fahrstunden du pro Woche nehmen kannst. Viele Fahrschüler sind in 2 bis 3 Monaten fertig.',
  },
  {
    question: 'Was ist die B197-Ausbildung?',
    answer:
      'Bei B197 lernst du überwiegend auf dem Automatikfahrzeug. Nach mindestens 10 Fahrstunden machst du eine kurze Testfahrt im Schaltwagen und darfst danach beides fahren – ohne Automatik-Eintrag.',
  },
  {
    question: 'Bietet ihr auch den Motorradführerschein an?',
    answer:
      'Ja. Wir bilden in den Klassen A, A1 und A2 aus. Der Grundbetrag liegt im Herbst-Angebot bei 399 €. Zusätzlich bieten wir die Schlüsselzahl B196 für 750 € Festpreis an.',
  },
  {
    question: 'Muss ich bei der Anmeldung schon etwas bezahlen?',
    answer:
      'Nein. Deine Anfrage über das Formular ist kostenlos und unverbindlich. Es gibt keine Vorkasse – wir sprechen erst persönlich miteinander.',
  },
  {
    question: 'Wo genau finde ich euch und wann habt ihr geöffnet?',
    answer:
      'Im Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg. Das Büro ist Montag bis Freitag von 12:00 bis 18:00 Uhr geöffnet. Fahrstunden sind nach Absprache auch außerhalb dieser Zeiten möglich.',
  },
];
