import React from 'react';
import { CheckCircle } from 'lucide-react';
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
          alt="Motorradfahren auf einer Landstraße in Brandenburg" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-[#1a2d4a]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* H1 Headline with SEO keyword */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-3 sm:mb-4 leading-tight">
            Dein Weg in die Freiheit:
            <span className="block text-[#6d8fd4]">Motorradführerschein in Potsdam</span>
          </h1>
          
          {/* Sub-Headline with offer - Price highlight in lighter blue */}
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-200 mb-6 sm:mb-8">
            Sichere dir jetzt das Saison-Angebot: <span className="line-through text-neutral-400">Statt 650€</span>{' '}
            <span className="text-[#6d8fd4] font-bold">nur 599€</span> Grundbetrag!
          </p>

          {/* USP Bar */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 bg-[#3b5998]/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-[#3b5998]/30">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#6d8fd4] flex-shrink-0" />
              <span className="text-white text-sm font-medium">Inkl. Erste-Hilfe-Kurs</span>
            </div>
            <div className="flex items-center gap-2 bg-[#3b5998]/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-[#3b5998]/30">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#6d8fd4] flex-shrink-0" />
              <span className="text-white text-sm font-medium">Inkl. 100€ Louis-Gutschein</span>
            </div>
            <div className="flex items-center gap-2 bg-[#3b5998]/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-[#3b5998]/30">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#6d8fd4] flex-shrink-0" />
              <span className="text-white text-sm font-medium">Inkl. 1 Jahr ADAC</span>
            </div>
          </div>
          
          {/* CTA Button - Blue theme */}
          <Button 
            size="lg" 
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-[#3b5998] hover:bg-[#4a6cb3] text-white text-base sm:text-lg py-5 sm:py-6 px-6 sm:px-8 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Jetzt Platz sichern & 50€ sparen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MotorradHero;
