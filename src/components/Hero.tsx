
import React from 'react';
import { ArrowRight, Shield, Users, Award } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-600">Fahrschule Potsdam</span> – 
                Sicher fahren lernen in Potsdam
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                ABF Fahrschule Potsdam: Mit ruhiger Hand, persönlicher Betreuung und moderner Fahrausbildung zum Führerschein. 
                Praktische Fahrstunden und Theorieunterricht in Potsdam - seit über 15 Jahren Ihre vertrauensvolle Fahrschule.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Über 15 Jahre Fahrschule in Potsdam</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>1000+ erfolgreiche Fahrschüler in Potsdam</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Beste Bewertungen Fahrschule Potsdam</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToContact}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <span>Kostenlose Beratung Fahrschule Potsdam</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold"
              >
                Führerschein in Potsdam
              </button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-blue-100 rounded-2xl p-4 aspect-square flex items-center justify-center overflow-hidden">
              <div className="w-full h-full relative">
                <img 
                  src="/lovable-uploads/942a3ff6-c3ad-407e-8bda-5cd7d40335d8.png"
                  alt="ABF Fahrschule Potsdam Gebäude - Moderne Fahrausbildung in Potsdam im WEBERPARK Tuchmacherstraße"
                  className="w-full h-full object-cover rounded-xl"
                  loading="eager"
                  title="ABF Fahrschule Potsdam - Ihr vertrauensvoller Partner für den Führerschein"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Moderne Fahrausbildung in Potsdam</h3>
                    <p className="text-white/90">Unser modernes Fahrschulgebäude im WEBERPARK Potsdam - Ihr Weg zum Führerschein</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Termine verfügbar in Potsdam</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Erfolgsquote Potsdam</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
