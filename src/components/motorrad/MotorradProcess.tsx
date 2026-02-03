import React from 'react';
import { ClipboardCheck, BookOpen, Bike, Trophy } from 'lucide-react';

const MotorradProcess: React.FC = () => {
  const steps = [
    {
      icon: ClipboardCheck,
      number: 1,
      title: "Anmelden",
      description: "Formular ausfüllen und Platz sichern"
    },
    {
      icon: BookOpen,
      number: 2,
      title: "Theorie",
      description: "Intensivkurs besuchen und lernen"
    },
    {
      icon: Bike,
      number: 3,
      title: "Praxis",
      description: "Fahrstunden nehmen und üben"
    },
    {
      icon: Trophy,
      number: 4,
      title: "Prüfung",
      description: "Erfolgreich bestehen & losfahren!"
    }
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            In 4 Schritten zu deinem Motorradführerschein
          </h2>
          <p className="text-neutral-400 mt-3 sm:mt-4 text-base sm:text-lg">
            Dein Weg zum A2 Führerschein in Potsdam – einfach und strukturiert
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line - only on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 sm:top-10 left-1/2 w-full h-0.5 bg-[#3b5998]/30" />
                )}
                
                <div className="relative bg-neutral-900 border border-[#3b5998]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-md hover:border-[#3b5998]/40 hover:shadow-lg hover:shadow-[#3b5998]/10 transition-all duration-300 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-[#3b5998] text-white w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="bg-[#3b5998]/20 w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 mt-2">
                    <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-[#6d8fd4]" />
                  </div>
                  
                  <h3 className="font-bold text-base sm:text-lg text-white mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MotorradProcess;
