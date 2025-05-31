
import React from 'react';
import { MapPin, User, Heart, Laptop } from 'lucide-react';

const WhyABF = () => {
  const features = [
    {
      icon: MapPin,
      title: "Lokale Expertise",
      description: "Unsere Fahrlehrer kennen Potsdam wie ihre Westentasche."
    },
    {
      icon: User,
      title: "Individuelle Betreuung",
      description: "Jeder Schüler ist anders, wir passen uns an."
    },
    {
      icon: Heart,
      title: "Ruhiges Lernklima",
      description: "Kein Stress, kein Druck – Lernen mit Vertrauen."
    },
    {
      icon: Laptop,
      title: "Moderne Ausbildung",
      description: "Theorie & Praxis mit zeitgemäßen Methoden."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Warum ABF Fahrschule?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mit über 15 Jahren Erfahrung in Potsdam bieten wir Ihnen die beste Grundlage für eine erfolgreiche Fahrausbildung.
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
              <div className="text-gray-700 font-medium">Erfolgreiche Schüler</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">15+</div>
              <div className="text-gray-700 font-medium">Jahre Erfahrung</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <div className="text-gray-700 font-medium">Prüfungserfolg</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyABF;
