
import React from 'react';
import { Phone, BookOpen, Car, CheckCircle, Trophy } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: Phone,
      title: "Kontaktaufnahme & Beratung",
      description: "Kostenlose Erstberatung und alle Informationen zu Ihrem Führerschein"
    },
    {
      icon: BookOpen,
      title: "Anmeldung & Start der Theorie",
      description: "Theorieunterricht in kleinen Gruppen mit modernen Lernmethoden"
    },
    {
      icon: Car,
      title: "Erste Fahrstunden",
      description: "Individueller Fahrplan nach Ihrem Tempo und Ihren Bedürfnissen"
    },
    {
      icon: CheckCircle,
      title: "Vorbereitung auf Prüfungen",
      description: "Gezielte Vorbereitung auf Theorie- und Praxisprüfung"
    },
    {
      icon: Trophy,
      title: "Erfolgreicher Abschluss",
      description: "Ihr Führerschein und lebenslange Fahrsicherheit"
    }
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Der Weg zum Führerschein
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In fünf klaren Schritten begleiten wir Sie sicher und entspannt zu Ihrem Führerschein.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center ${index % 2 === 0 ? 'lg:order-2' : ''}`}>
                        <step.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className={`${index % 2 === 0 ? 'lg:order-1' : ''}`}>
                        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Step number */}
                <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Jetzt mit dem ersten Schritt beginnen
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
