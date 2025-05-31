
import React from 'react';
import { Users, Clock, Award, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Über ABF Fahrschule Potsdam
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Seit über 15 Jahren bilden wir in Potsdam erfolgreich Fahrschüler aus. Unser Team besteht aus erfahrenen, 
                geduldigen Fahrlehrern, die mit Leidenschaft und Kompetenz jeden Schüler individuell betreuen.
              </p>
              
              <p>
                Wir glauben, dass Fahrschule mehr ist als nur das Bestehen einer Prüfung. Bei uns lernen Sie 
                verantwortungsvolles Fahren für das ganze Leben. Mit ruhiger Hand und modernen Ausbildungsmethoden 
                begleiten wir Sie sicher durch Ihre Fahrausbildung.
              </p>
              
              <p>
                Unsere Mission ist es, jeden Fahrschüler mit Vertrauen, Geduld und Fachkompetenz zum Erfolg zu führen. 
                Dabei setzen wir auf eine entspannte Lernatmosphäre, in der Sie ohne Stress und Druck Ihre Fähigkeiten entwickeln können.
              </p>
            </div>

            {/* Team Values */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-900">Erfahrenes Team</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-900">Flexible Zeiten</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-900">Top Ausbildung</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-900">Mit Herzblut</span>
              </div>
            </div>
          </div>

          {/* Right Content - Team Image */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">👨‍🏫</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Unser Fahrlehrer-Team</h3>
              <p className="text-gray-600">
                Erfahren, geduldig und immer für Sie da
              </p>
            </div>

            {/* Certifications */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Unsere Qualifikationen</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Staatlich anerkannte Fahrschule</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Zertifizierte Fahrlehrer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Regelmäßige Weiterbildungen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Moderne Fahrzeugflotte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
