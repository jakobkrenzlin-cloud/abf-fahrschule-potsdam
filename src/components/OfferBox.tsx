import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const OfferBox = () => {
  // Calculate deadline (30 days from now)
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 30);
  const deadlineStr = deadline.toLocaleDateString('de-DE');

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border-4 border-primary relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Clock className="w-4 h-4" />
              Limitiertes Angebot
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Sonderangebot: Anmeldung nur 
                <span className="text-primary text-5xl lg:text-6xl block mt-2">479 €</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Komplettpaket mit allem was du brauchst
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                '14 Theoriestunden inklusive',
                'LernApp vom Vogel Verlag inklusive', 
                'Erste Hilfe inklusive',
                'Alles drin – keine versteckten Kosten'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <p className="text-lg font-semibold text-red-600 mb-4">
                Nur bis {deadlineStr} gültig – jetzt handeln!
              </p>
              <Button 
                size="lg"
                onClick={scrollToForm}
                className="bg-primary hover:bg-primary/90 text-white px-12 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Jetzt anmelden & Platz sichern
              </Button>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">
                <strong>Wichtig:</strong> Dieses Angebot gilt nur für Neukunden und ist limitiert auf die ersten 50 Anmeldungen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferBox;