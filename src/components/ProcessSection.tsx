
import React, { useState } from 'react';
import { Phone, BookOpen, Trophy, Info, X } from 'lucide-react';

const ProcessSection = () => {
  const [showB197Info, setShowB197Info] = useState(false);

  const steps = [
    {
      icon: Phone,
      title: "Anmeldung Fahrschule Potsdam",
      description: "Starte mit einer unverbindlichen Beratung in unserer Fahrschule in Potsdam. Wir erklären dir alles zum Ablauf, zu Terminen und zur passenden Führerscheinausbildung in Potsdam – inklusive B197 Option."
    },
    {
      icon: BookOpen,
      title: "Theorieunterricht & Praktische Fahrstunden Potsdam",
      description: "Besuche modernen, interaktiven Theorieunterricht in Potsdam in kleinen Gruppen und starte zeitnah mit deinen praktischen Fahrstunden. Bei unserer Fahrschule in Potsdam fährst du stressfrei mit lokalen, erfahrenen Fahrlehrern.",
      hasB197: true
    },
    {
      icon: Trophy,
      title: "Führerscheinprüfung Potsdam",
      description: "Wir bereiten dich gezielt auf Theorie- und Praxisprüfung in Potsdam vor. Sobald du bereit bist, begleiten wir dich bis zum erfolgreichen Bestehen deines Führerscheins."
    }
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Dein Führerschein in Potsdam in nur drei Schritten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Schnell, entspannt und modern zu deinem Führerschein in Potsdam – 
            mit der innovativen B197 Ausbildung bei der ABF Fahrschule für mehr Flexibilität in Potsdam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step Number */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center mb-4">
                  {step.description}
                </p>

                {/* B197 Info for Step 2 */}
                {step.hasB197 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-sm font-semibold text-blue-600">B197 Ausbildung Potsdam</span>
                      <button
                        onClick={() => setShowB197Info(true)}
                        className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                      >
                        <Info className="w-3 h-3 text-blue-600" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      Automatik lernen, Schaltwagen fahren - in Potsdam
                    </p>
                  </div>
                )}
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-12 h-0.5 bg-blue-200 transform -translate-y-1/2 z-0"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Jetzt kostenlose Beratung Fahrschule Potsdam anfragen
          </button>
        </div>
      </div>

      {/* B197 Info Modal */}
      {showB197Info && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative animate-scale-in">
            <button
              onClick={() => setShowB197Info(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900">B197 Ausbildung in Potsdam</h3>
              
              <div className="text-left space-y-3 text-gray-600">
                <p>
                  <strong className="text-gray-900">Mehr Freiheit in Potsdam:</strong> 
                  Du kannst den Großteil deiner Fahrausbildung mit einem Automatikfahrzeug in Potsdam machen und trotzdem einen Schaltwagen fahren.
                </p>
                <p>
                  <strong className="text-gray-900">So funktioniert's in Potsdam:</strong> 
                  Nach mindestens 10 Fahrstunden im Automatik machst du eine kurze Testfahrt im Schaltwagen – fertig!
                </p>
                <p>
                  <strong className="text-gray-900">Ihr Vorteil bei ABF Potsdam:</strong> 
                  Entspannter lernen in Potsdam, trotzdem alle Fahrzeugtypen fahren können.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProcessSection;
