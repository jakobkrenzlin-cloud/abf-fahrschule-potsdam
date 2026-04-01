import React from 'react';
import { UserPlus, BookOpen, Car, FileText, Trophy, PartyPopper } from 'lucide-react';

const ProcessSteps = () => {
  const steps = [
    { 
      number: 1, 
      title: 'Anmeldung', 
      description: 'Einfache Anmeldung vor Ort oder online mit dem 179€ Sommer Angebot',
      icon: UserPlus,
      color: 'bg-blue-500'
    },
    { 
      number: 2, 
      title: 'Theorie', 
      description: 'Gesamter theoretischer Unterricht in kleinen Gruppen – in einer Woche fertig',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    { 
      number: 3, 
      title: 'Fahrstunden', 
      description: 'Praktische Ausbildung mit erfahrenen Fahrlehrern',
      icon: Car,
      color: 'bg-purple-500'
    },
    { 
      number: 4, 
      title: 'Theorieprüfung', 
      description: 'Prüfung beim TÜV mit optimaler Vorbereitung',
      icon: FileText,
      color: 'bg-orange-500'
    },
    { 
      number: 5, 
      title: 'Praxisprüfung', 
      description: 'Praktische Prüfung und dann...',
      icon: Trophy,
      color: 'bg-red-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            So läuft deine Fahrausbildung ab
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            In nur 5 einfachen Schritten zu deinem Führerschein – transparent und ohne Überraschungen
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="text-center relative">
                  {/* Step Circle */}
                  <div className={`w-20 h-20 ${step.color} text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-20">
                    {step.number}
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>

          {/* Final Celebration */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PartyPopper className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-gray-900">Und dann: Führerschein in der Hand!</h3>
              <PartyPopper className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg text-gray-600">
              Herzlichen Glückwunsch – ab jetzt fährst du selbstständig!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;