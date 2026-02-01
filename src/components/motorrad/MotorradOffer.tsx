import React from 'react';
import { CheckCircle, Gift } from 'lucide-react';
import storefrontImage from '@/assets/abf-motorrad-storefront.jpg';

const MotorradOffer: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
            Dein All-Inclusive Startpaket für nur <span className="text-orange-500">599€</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={storefrontImage} 
              alt="ABF Fahrschule Potsdam mit Ausbildungs-Motorrädern vor dem Standort"
              className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
              <p className="text-white font-semibold text-base sm:text-lg">
                Moderne Ausbildungs-Motorräder für sicheres Lernen
              </p>
            </div>
          </div>

          {/* Right Column - Value Stack */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-neutral-200 p-5 sm:p-8">
            {/* Price Display */}
            <div className="text-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-neutral-200">
              <div className="flex items-baseline justify-center gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-orange-500">599€</span>
                <span className="text-xl sm:text-2xl text-neutral-400 line-through">650€</span>
              </div>
              <p className="text-neutral-600 mt-2 text-sm sm:text-base">Grundbetrag für Klasse A / A2</p>
            </div>

            {/* Value Items */}
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-neutral-800 font-medium text-sm sm:text-base">Kompletter Theorieunterricht</span>
                </div>
                <span className="text-neutral-500 text-xs sm:text-sm whitespace-nowrap">Inklusive</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-neutral-800 font-medium text-sm sm:text-base">Erste-Hilfe-Kurs</span>
                </div>
                <span className="text-orange-500 text-xs sm:text-sm font-medium whitespace-nowrap">Wert: 50€</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-neutral-800 font-medium text-sm sm:text-base">LernApp vom Vogelverlag</span>
                </div>
                <span className="text-orange-500 text-xs sm:text-sm font-medium whitespace-nowrap">Wert: 30€</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Gift className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-neutral-800 font-medium text-sm sm:text-base">100€ Louis-Gutschein</span>
                </div>
                <span className="text-orange-500 text-xs sm:text-sm font-medium whitespace-nowrap">Geschenkt!</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Gift className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-neutral-800 font-medium text-sm sm:text-base">1 Jahr ADAC</span>
                </div>
                <span className="text-orange-500 text-xs sm:text-sm font-medium whitespace-nowrap">Wert: 54€</span>
              </li>
            </ul>

            {/* Total Value */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-200 bg-orange-50 -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 p-4 sm:p-6 rounded-b-xl sm:rounded-b-2xl">
              <div className="flex justify-between items-center">
                <span className="text-neutral-700 font-medium text-sm sm:text-base">Gesamtwert:</span>
                <span className="text-lg sm:text-xl font-bold text-neutral-800">Über 880€</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-orange-600 font-bold text-base sm:text-lg">Du sparst:</span>
                <span className="text-xl sm:text-2xl font-black text-orange-500">Über 280€!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotorradOffer;
