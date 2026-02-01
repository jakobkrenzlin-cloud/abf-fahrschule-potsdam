import React from 'react';
import { CheckCircle, Gift } from 'lucide-react';

const MotorradOffer: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
            Dein All-Inclusive Startpaket für nur <span className="text-orange-500">599€</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/fahrlehrer-portrait.jpg" 
              alt="Glücklicher Fahrschüler auf modernem Motorrad"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white font-semibold text-lg">
                Moderne Ausbildungs-Motorräder für sicheres Lernen
              </p>
            </div>
          </div>

          {/* Right Column - Value Stack */}
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
            {/* Price Display */}
            <div className="text-center mb-8 pb-6 border-b border-neutral-200">
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-5xl lg:text-6xl font-black text-orange-500">599€</span>
                <span className="text-2xl text-neutral-400 line-through">650€</span>
              </div>
              <p className="text-neutral-600 mt-2">Grundbetrag für Klasse A / A2</p>
            </div>

            {/* Value Items */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-neutral-800 font-medium">Kompletter Theorieunterricht</span>
                </div>
                <span className="text-neutral-500 text-sm">Inklusive</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-neutral-800 font-medium">Erste-Hilfe-Kurs</span>
                </div>
                <span className="text-orange-500 text-sm font-medium">Wert: 50€</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-neutral-800 font-medium">LernApp vom Vogelverlag</span>
                </div>
                <span className="text-orange-500 text-sm font-medium">Wert: 30€</span>
              </li>
              <li className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-neutral-800 font-medium">100€ Louis-Gutschein</span>
                </div>
                <span className="text-orange-500 text-sm font-medium">Geschenkt!</span>
              </li>
              <li className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-neutral-800 font-medium">1 Jahr ADAC Mitgliedschaft</span>
                </div>
                <span className="text-orange-500 text-sm font-medium">Wert: 54€</span>
              </li>
            </ul>

            {/* Total Value */}
            <div className="mt-8 pt-6 border-t border-neutral-200 bg-orange-50 -mx-8 -mb-8 p-6 rounded-b-2xl">
              <div className="flex justify-between items-center">
                <span className="text-neutral-700 font-medium">Gesamtwert:</span>
                <span className="text-xl font-bold text-neutral-800">Über 880€</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-orange-600 font-bold text-lg">Du sparst:</span>
                <span className="text-2xl font-black text-orange-500">Über 280€!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotorradOffer;
