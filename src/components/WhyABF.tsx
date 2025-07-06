
import React from 'react';
import { MapPin, User, Heart, Laptop } from 'lucide-react';

const WhyABF = () => {
  const features = [
    {
      icon: MapPin,
      title: "Lokale Expertise Potsdam",
      description: "Unsere Fahrlehrer kennen alle Straßen, Verkehrsregeln und Prüfungsrouten in Potsdam perfekt."
    },
    {
      icon: User,
      title: "Individuelle Fahrausbildung",
      description: "Jeder Fahrschüler in Potsdam ist anders - wir passen unsere Ausbildung an Ihre Bedürfnisse an."
    },
    {
      icon: Heart,
      title: "Stressfreies Lernen in Potsdam",
      description: "Kein Stress, kein Druck – entspannte Fahrausbildung mit Vertrauen in Potsdam."
    },
    {
      icon: Laptop,
      title: "Moderne Fahrschule Potsdam",
      description: "Zeitgemäße Theorieausbildung und praktische Fahrstunden mit neuesten Methoden."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Warum ABF Fahrschule Potsdam wählen?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mit über 15 Jahren Erfahrung als Fahrschule in Potsdam bieten wir Ihnen die beste Grundlage 
            für eine erfolgreiche Führerscheinausbildung in Potsdam und Umgebung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4 p-6 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-700 font-medium">Erfolgreiche Fahrschüler in Potsdam</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">15+</div>
              <div className="text-gray-700 font-medium">Jahre Fahrschule in Potsdam</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <div className="text-gray-700 font-medium">Prüfungserfolg Potsdam</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyABF;
