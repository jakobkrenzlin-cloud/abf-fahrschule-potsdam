import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'Was kostet der Führerschein bei der ABF Fahrschule in Potsdam?',
    answer:
      'Der Grundbetrag für die Führerschein-Ausbildung Klasse B beträgt aktuell nur 179 € im Sommer Angebot. Darin enthalten sind der komplette Theorieunterricht, die LernApp, ein Erste-Hilfe-Kurs und 1 Jahr ADAC-Mitgliedschaft. Die Fahrstunden kosten ab 67,50 €/45 Min.',
  },
  {
    question: 'Wie lange dauert die Führerschein-Ausbildung in Potsdam?',
    answer:
      'Bei regelmäßiger Teilnahme kannst du deinen Führerschein in ca. 4–8 Wochen machen. Die genaue Dauer hängt von deiner Verfügbarkeit für Theorie und Praxis ab. Wir bieten flexible Terminoptionen, damit es schnell geht.',
  },
  {
    question: 'Was ist die B197 Ausbildung?',
    answer:
      'Mit der B197-Ausbildung lernst du den Großteil auf einem Automatikfahrzeug – bequemer und stressfreier. Nach mindestens 10 Fahrstunden im Automatik machst du eine kurze Testfahrt im Schaltwagen und darfst danach beides fahren.',
  },
  {
    question: 'Wo befindet sich die ABF Fahrschule in Potsdam?',
    answer:
      'Unsere Fahrschule befindet sich im WEBERPARK, Tuchmacherstraße 45b, 14482 Potsdam. Wir sind gut mit öffentlichen Verkehrsmitteln und dem Auto erreichbar.',
  },
  {
    question: 'Bietet die ABF Fahrschule auch Motorrad-Führerschein in Potsdam an?',
    answer:
      'Ja! Wir bieten Motorrad-Führerschein der Klassen A, A1 und A2 an. Aktuell gibt es den Motorrad-Grundbetrag ab 599 € inklusive Erste-Hilfe-Kurs, LernApp und einem 100 € Louis-Gutschein.',
  },
  {
    question: 'Welche Öffnungszeiten hat die Fahrschule in Potsdam?',
    answer:
      'Unsere Fahrschule ist von Montag bis Freitag von 12:00 bis 18:00 Uhr geöffnet. Fahrstunden können auch außerhalb dieser Zeiten nach Absprache vereinbart werden.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-10 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Häufige Fragen zur Fahrschule Potsdam
          </h2>
          <p className="text-base md:text-xl text-gray-600">
            Alles, was du über deine Führerschein-Ausbildung bei ABF in Potsdam wissen musst.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-gray-50 rounded-xl border border-gray-100 px-5 md:px-6"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-gray-900 hover:no-underline py-4 md:py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed pb-4 md:pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* FAQ Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
};

export default FAQSection;
