import React from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import heroImage from '@/assets/motorrad-hero.jpg';

interface MotorradHeroProps {
  onCtaClick: () => void;
}

const MotorradHero: React.FC<MotorradHeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="125ccm Motorrad – B196 Erweiterung mit Autoführerschein, Brandenburg"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-[#1a2d4a]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 text-white">
            <Star className="w-4 h-4 fill-current text-[#6d8fd4]" />
            4,9 ★ aus 120 Google-Bewertungen
          </div>

          {/* H1 – B196 first */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-3 sm:mb-4 leading-tight">
            B196 Führerschein Potsdam –
            <span className="block text-[#6d8fd4]">125ccm mit dem Autoführerschein</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-200 mb-6 sm:mb-8">
            Ohne erneute praktische Prüfung, in wenigen Tagen startklar.{' '}
            <span className="text-[#6d8fd4] font-bold">Komplettpreis 750 €</span>{' '}
            – ohne versteckte Kosten. Motorradführerschein A/A2/A1 ebenfalls möglich.
          </p>

          {/* USP Bar */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 bg-[#3b5998]/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-[#3b5998]/30">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#6d8fd4] flex-shrink-0" />
              <span className="text-white text-sm font-medium">Keine praktische Prüfung</span>
            </div>
            <div className="flex items-center gap-2 bg-[#3b5998]/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-[#3b5998]/30">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#6d8fd4] flex-shrink-0" />
              <span className="text-white text-sm font-medium">In wenigen Tagen fertig</span>
            </div>
            <div className="flex items-center gap-2 bg-[#3b5998]/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-[#3b5998]/30">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#6d8fd4] flex-shrink-0" />
              <span className="text-white text-sm font-medium">Komplettpreis 750 €</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-[#3b5998] hover:bg-[#4a6cb3] text-white text-base sm:text-lg py-5 sm:py-6 px-6 sm:px-8 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Jetzt B196-Platz sichern
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MotorradHero;
