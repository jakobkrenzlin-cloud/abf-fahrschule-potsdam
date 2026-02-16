import React from 'react';
import { CalendarDays, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface CrashCourseBannerProps {
  /** If true, scrolls to form instead of linking to /anmeldung */
  scrollToForm?: () => void;
}

const CrashCourseBanner = ({ scrollToForm }: CrashCourseBannerProps) => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full border border-white/30">
            <AlertTriangle className="w-4 h-4" />
            Begrenzte Plätze verfügbar
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center mb-3 leading-tight">
          Nächster Theorie-Crashkurs: In nur 7 Tagen zum Erfolg!
        </h2>

        {/* Date & Time Details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-5">
          <div className="flex items-center gap-2 text-white">
            <CalendarDays className="w-5 h-5 text-yellow-300 flex-shrink-0" />
            <span className="text-lg sm:text-xl font-bold text-yellow-300">
              04. März bis 11. März 2026
            </span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-yellow-300 flex-shrink-0" />
            <span className="text-base sm:text-lg font-semibold">
              Täglich 2 Themen, 16:30 – 19:30 Uhr
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-5">
          {scrollToForm ? (
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-white text-red-600 hover:bg-yellow-50 text-lg font-bold px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              Jetzt Platz für März sichern
            </Button>
          ) : (
            <Link to="/Anmeldung">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-yellow-50 text-lg font-bold px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-105"
              >
                Jetzt Platz für März sichern
              </Button>
            </Link>
          )}
        </div>

        {/* Legal pricing line */}
        <p className="text-center text-xs sm:text-sm text-white/80 max-w-3xl mx-auto leading-relaxed">
          Preise gemäß § 32 Fahrlehrergesetz: Unterweisungsstunde 67,50 €/45 Min., Übungsstunde 67,50 €/45 Min. und Besondere Ausbildungsfahrten 75 €/45 Min.
        </p>
      </div>
    </section>
  );
};

export default CrashCourseBanner;
