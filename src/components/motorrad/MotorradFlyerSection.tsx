import React from 'react';
import { FileText } from 'lucide-react';

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
        
        {/* Flyer Placeholder */}
        <div className="relative mx-auto max-w-md">
          <div 
            className="aspect-[3/4] border-2 border-dashed border-[#3b5998]/50 rounded-xl flex flex-col items-center justify-center bg-neutral-900/50 hover:border-[#3b5998] hover:bg-neutral-900/70 transition-all duration-300 cursor-pointer"
          >
            <FileText className="w-16 h-16 text-[#3b5998]/60 mb-4" />
            <p className="text-[#6d8fd4] font-semibold text-lg">Hier Flyer ansehen</p>
            <p className="text-neutral-500 text-sm mt-2">Flyerabf2.pdf</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotorradFlyerSection;
