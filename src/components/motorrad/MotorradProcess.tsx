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
    <section className="py-16 lg:py-20 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
            In 4 Schritten zu deinem Motorradführerschein
          </h2>
          <p className="text-neutral-600 mt-4 text-lg">
            Dein Weg zum A2 Führerschein in Potsdam – einfach und strukturiert
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-orange-200" />
                )}
                
                <div className="relative bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  
                  <h3 className="font-bold text-lg text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm">{step.description}</p>
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
