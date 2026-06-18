import React from 'react';
import { CheckCircle, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface B196OfferProps {
  onCtaClick: () => void;
}

const B196Offer: React.FC<B196OfferProps> = ({ onCtaClick }) => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-[#0a1628]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block bg-[#3b5998]/20 text-[#6d8fd4] text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#3b5998]/40 mb-3">
            Beliebteste Erweiterung
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            B196 in Potsdam: <span className="text-[#6d8fd4]">125ccm fahren mit deinem Autoführerschein</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Mit B196 darfst du mit deinem Autoführerschein (Klasse B) 125ccm-Motorräder fahren –
            <strong className="text-white"> ohne separate praktische Prüfung</strong>. In wenigen Tagen startklar.
          </p>
        </div>

        <div className="bg-neutral-900 rounded-2xl border border-[#3b5998]/30 shadow-xl p-5 sm:p-8 lg:p-10 max-w-3xl mx-auto">
          {/* Price */}
          <div className="text-center mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-neutral-700">
            <p className="text-neutral-400 text-sm sm:text-base mb-1">Komplettpreis B196</p>
            <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#6d8fd4]">750 €</div>
            <p className="text-neutral-400 mt-2 text-sm sm:text-base">Alles drin – keine versteckten Kosten</p>
          </div>

          {/* Value Stack */}
          <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-[#6d8fd4] flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm sm:text-base">Kompletter Theorieunterricht inklusive</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-[#6d8fd4] flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm sm:text-base">Keine praktische und keine theoretische Prüfung nötig</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-[#6d8fd4] flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm sm:text-base">In wenigen Tagen startklar – auch am Wochenende möglich</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-[#6d8fd4] flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm sm:text-base">Sofort 125ccm-Motorräder fahren (A1-Leichtkrafträder)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-[#6d8fd4] flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm sm:text-base">Komplettpreis 750 € – keine versteckten Kosten</span>
            </li>
          </ul>

          {/* CTA */}
          <Button
            onClick={onCtaClick}
            size="lg"
            className="w-full bg-[#3b5998] hover:bg-[#4a6cb3] text-white h-14 sm:h-16 text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02]"
          >
            Jetzt B196-Platz sichern
            <ArrowDown className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-center text-xs sm:text-sm text-neutral-400 mt-3">
            Motorradführerschein A/A2/A1 ebenfalls möglich – siehe unten.
          </p>
        </div>
      </div>
    </section>
  );
};

export default B196Offer;
