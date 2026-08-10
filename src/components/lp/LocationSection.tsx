import React from 'react';
import { MapPin, Clock, Navigation } from 'lucide-react';
import Reveal from './Reveal';
import { ADDRESS_LINE, MAPS_URL } from './constants';

const LocationSection: React.FC = () => (
  <section className="section-y bg-card" aria-labelledby="standort-heading">
    <div className="max-w-4xl mx-auto px-4">
      <Reveal>
        <h2 id="standort-heading" className="text-h2 md:text-h2-lg text-brand-dark text-center">
          So findest du uns
        </h2>
        <div className="mt-8 bg-surface rounded-2xl p-6 md:p-8 border border-black/5 space-y-4">
          <p className="flex items-start gap-3 text-ink">
            <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" aria-hidden="true" />
            <span>{ADDRESS_LINE}</span>
          </p>
          <p className="flex items-start gap-3 text-ink">
            <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" aria-hidden="true" />
            <span>Montag bis Freitag, 12:00 – 18:00 Uhr. Fahrstunden auch außerhalb nach Absprache.</span>
          </p>
          <p className="text-ink/75 leading-relaxed">
            Wir sitzen direkt im Weberpark in Babelsberg – Parkplätze vor der Tür, Tram- und
            Bushaltestellen sowie der Bahnhof Babelsberg sind in wenigen Minuten zu Fuß erreichbar.
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[56px] px-6 rounded-xl bg-brand-strong hover:bg-brand-strong/90 text-white font-bold transition-colors"
          >
            <Navigation className="w-5 h-5" aria-hidden="true" />
            Route in Google Maps öffnen
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default LocationSection;
