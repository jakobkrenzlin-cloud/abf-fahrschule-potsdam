import React from 'react';
import motorradFlyer from '@/assets/motorrad-flyer.webp';

const MotorradFlyerSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-black">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Unser Angebot im Überblick
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base">
            Alle Details auf einen Blick
          </p>
        </div>
        
        {/* Flyer Image */}
        <div className="relative mx-auto max-w-md">
          <img 
            src={motorradFlyer} 
            alt="ABF Motorrad Führerschein Angebot Flyer - 599€ Grundbetrag inkl. Erste Hilfe, LernApp und Louis und Polo Gutschein"
            className="w-full rounded-xl border-2 border-[#3b5998]/30 shadow-2xl hover:border-[#3b5998] transition-all duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default MotorradFlyerSection;
