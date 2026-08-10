import React from 'react';
import { Users, Clock, Award, Heart } from 'lucide-react';
import TeamSlideshow from './TeamSlideshow';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Über ABF Fahrschule Potsdam - Ihre vertrauensvolle Fahrschule
            </h2>
            
            <div className="space-y-4 text-ink/75 leading-relaxed">
              <p>
                Seit über 15 Jahren bilden wir in Potsdam erfolgreich Fahrschüler aus. Unser erfahrenes Team der ABF Fahrschule Potsdam 
                besteht aus geduldigen, lokalen Fahrlehrern, die mit Leidenschaft und Kompetenz jeden Fahrschüler individuell betreuen. 
                Wir kennen die Straßen Potsdams perfekt und bereiten Sie optimal auf die Prüfung vor.
              </p>
              
              <p>
                Wir glauben, dass eine gute Fahrschule in Potsdam mehr ist als nur das Bestehen einer Prüfung. Bei der ABF Fahrschule 
                lernen Sie verantwortungsvolles Fahren für das ganze Leben. Mit ruhiger Hand und modernen Ausbildungsmethoden 
                begleiten wir Sie sicher durch Ihre Führerscheinausbildung in Potsdam.
              </p>
              
              <p>
                Unsere Mission als Fahrschule in Potsdam ist es, jeden Fahrschüler mit Vertrauen, Geduld und Fachkompetenz zum Erfolg zu führen. 
                Dabei setzen wir auf eine entspannte Lernatmosphäre, in der Sie ohne Stress und Druck Ihre Fahrkünste in Potsdam entwickeln können.
              </p>
            </div>

            {/* Team Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-brand-strong" />
                <span className="font-medium text-brand-dark">Erfahrenes Fahrlehrer-Team Potsdam</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-brand-strong" />
                <span className="font-medium text-brand-dark">Flexible Fahrstunden in Potsdam</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-brand-strong" />
                <span className="font-medium text-brand-dark">Top Fahrausbildung Potsdam</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-brand-strong" />
                <span className="font-medium text-brand-dark">Mit Herzblut in Potsdam</span>
              </div>
            </div>
          </div>

          {/* Right Content - Team Slideshow */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl p-8 text-center">
              <TeamSlideshow />
              <h3 className="text-2xl font-bold text-brand-dark mb-2 mt-6">Unser Fahrlehrer-Team Potsdam</h3>
              <p className="text-ink/75">
                Erfahren, geduldig und immer für Sie da - lokale Fahrlehrer mit Potsdam-Expertise
              </p>
            </div>

            {/* Certifications */}
            <div className="bg-surface rounded-xl p-6">
              <h4 className="font-semibold text-brand-dark mb-4">Unsere Qualifikationen als Fahrschule Potsdam</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-strong rounded-full"></div>
                  <span className="text-ink">Staatlich anerkannte Fahrschule in Potsdam</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-strong rounded-full"></div>
                  <span className="text-ink">Zertifizierte Fahrlehrer für Potsdam</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-strong rounded-full"></div>
                  <span className="text-ink">Regelmäßige Weiterbildungen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-strong rounded-full"></div>
                  <span className="text-ink">Moderne Fahrzeugflotte für Potsdam</span>
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
