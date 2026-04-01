import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const ConversionFAQ = () => {
  const faqs = [
    {
      question: "Wie schnell kann ich mit dem 179€ Sommer Angebot starten?",
      answer: "Du kannst sofort nach der Anmeldung beginnen! Der Theorieunterricht startet wöchentlich neu, und deine erste Fahrstunde kann bereits in der ersten Woche stattfinden. Die LernApp erhältst du direkt nach der Anmeldung."
    },
    {
      question: "Was ist mit BF17 / Begleitetes Fahren ab 17?",
      answer: "Selbstverständlich bieten wir auch BF17 (Begleitetes Fahren ab 17) an! Bei Minderjährigen benötigen wir die schriftliche Einwilligung der Erziehungsberechtigten. Die entsprechenden Formulare erhältst du nach der Anmeldung automatisch von uns zugeschickt."
    },
    {
      question: "Kann ich das 179€ Sommer Angebot in Raten zahlen?", 
      answer: "Ja, das ist möglich! Du kannst das Paket in 2-3 bequemen Raten aufteilen. Weitere Fahrstunden können einzeln oder in Paketen dazu gebucht werden. Sprich uns einfach auf flexible Zahlungsmöglichkeiten an."
    },
    {
      question: "Gibt es auch Automatik-Fahrzeuge?",
      answer: "Selbstverständlich! Wir haben sowohl Schaltgetriebe- als auch Automatik-Fahrzeuge in unserer Flotte. Bei der Anmeldung kannst du einfach angeben, welche Art von Fahrzeug du bevorzugst."
    },
    {
      question: "Was passiert, wenn ich länger brauche als geplant?",
      answer: "Kein Problem! Jeder lernt in seinem eigenen Tempo. Das 179€ Sommer Angebot bleibt gültig und weitere Fahrstunden buchst du einfach dazu. Wir begleiten dich, bis du sicher fährst und die Prüfung bestehst."
    },
    {
      question: "Was ist im 179€ Grundbetrag enthalten?",
      answer: "Der Grundbetrag von 179€ enthält den kompletten Theorieunterricht, die LernApp, Erste-Hilfe-Kurs und ADAC 1 Jahr kostenlos. Zusätzlich: Fahrstunden 67,50€/45 Min., Übungsstunden 67,50€/45 Min., Besondere Ausbildungsfahrten 75€/45 Min. Alle Preise gemäß § 32 FahrlG transparent aufgelistet."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Häufig gestellte Fragen
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Hier findest du Antworten auf die wichtigsten Fragen zu unserem 179€ Frühjahrs Angebot
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border border-gray-200 rounded-xl px-6 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <AccordionTrigger className="text-left py-6 hover:no-underline">
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <div className="bg-primary/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Weitere Fragen?
            </h3>
            <p className="text-gray-600 mb-4">
              Ruf uns an oder schreib uns – wir helfen gerne weiter!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+4933196795854" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                0331 / 967 958 54
              </a>
              <a 
                href="https://wa.me/4915752387583" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionFAQ;