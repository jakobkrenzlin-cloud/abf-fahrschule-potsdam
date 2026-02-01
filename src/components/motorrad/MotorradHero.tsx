import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import heroImage from '@/assets/motorrad-hero.jpg';

interface MotorradHeroProps {
  onCtaClick: () => void;
}

const MotorradHero: React.FC<MotorradHeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Motorradfahren auf einer Landstraße in Brandenburg" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* H1 Headline with SEO keyword */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Dein Weg in die Freiheit:
            <span className="block text-orange-500">Motorradführerschein in Potsdam</span>
          </h1>
          
          {/* Sub-Headline with offer */}
          <p className="text-xl lg:text-2xl text-neutral-200 mb-8">
            Sichere dir jetzt das Saison-Angebot: <span className="line-through text-neutral-400">Statt 650€</span>{' '}
            <span className="text-orange-500 font-bold">nur 599€</span> Grundbetrag!
          </p>

          {/* USP Bar */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="w-5 h-5 text-orange-500" />
              <span className="text-white text-sm font-medium">Inkl. Erste-Hilfe-Kurs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="w-5 h-5 text-orange-500" />
              <span className="text-white text-sm font-medium">Inkl. 100€ Louis-Gutschein</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="w-5 h-5 text-orange-500" />
              <span className="text-white text-sm font-medium">Inkl. 1 Jahr ADAC</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            onClick={onCtaClick}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 px-8 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Jetzt Platz sichern & 50€ sparen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MotorradHero;
