import React from 'react';
import { Shield, Bike, Trophy } from 'lucide-react';

const MotorradAdvantages: React.FC = () => {
  const advantages = [
    {
      icon: Shield,
      title: "Erfahrene & geduldige Fahrlehrer",
      description: "Unsere Motorrad-Fahrlehrer sind selbst leidenschaftliche Biker und bringen dir das sichere Fahren mit viel Geduld bei."
    },
    {
      icon: Bike,
      title: "Moderne & sichere Ausbildungs-Motorräder",
      description: "Lerne auf top-gewarteten, modernen Maschinen mit aktueller Sicherheitstechnik."
    },
    {
      icon: Trophy,
      title: "Hohe Erfolgsquote bei der Prüfung",
      description: "Unsere strukturierte Ausbildung bereitet dich optimal auf die theoretische und praktische Prüfung vor."
    }
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
            Mehr als nur Fahren lernen: Deine Vorteile bei ABF
          </h2>
          <p className="text-neutral-600 mt-3 sm:mt-4 text-base sm:text-lg">
            Als Motorrad Fahrschule in Potsdam setzen wir auf Qualität und persönliche Betreuung
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div key={index} className="text-center p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-50 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-orange-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Icon className="w-8 sm:w-10 h-8 sm:h-10 text-orange-500" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-neutral-900 mb-2 sm:mb-3">{advantage.title}</h3>
                <p className="text-neutral-600 text-sm sm:text-base">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MotorradAdvantages;
