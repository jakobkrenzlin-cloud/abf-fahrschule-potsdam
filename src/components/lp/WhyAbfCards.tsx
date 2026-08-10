import React from 'react';
import { GraduationCap, Car, CalendarClock, Euro, MapPin, HeartHandshake } from 'lucide-react';
import Reveal from './Reveal';

const CARDS = [
  { icon: GraduationCap, title: 'Erfahrene Fahrlehrer', text: 'Geduldig, ruhig und mit jahrelanger Praxis in Potsdam.' },
  { icon: Car, title: 'Moderne Fahrzeuge', text: 'Top gepflegte Schulungsfahrzeuge und Motorräder.' },
  { icon: CalendarClock, title: 'Theorie in einer Woche', text: 'Kompakte Kurse – du verlierst keine Zeit.' },
  { icon: Euro, title: 'Faire, transparente Preise', text: 'Du weißt vorher, was auf dich zukommt.' },
  { icon: MapPin, title: 'Zentral im Weberpark', text: 'Babelsberg, gut erreichbar mit Bahn, Bus und Auto.' },
  { icon: HeartHandshake, title: 'Persönliche Betreuung', text: 'Kein Massenbetrieb – wir kennen dich beim Namen.' },
];

const WhyAbfCards: React.FC = () => (
  <section className="section-y bg-brand-dark" aria-labelledby="warum-heading">
    <div className="container-page">
      <Reveal>
        <h2 id="warum-heading" className="text-h2 md:text-h2-lg text-white text-center">
          Warum ABF
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 60}>
            <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6">
              <c.icon className="w-8 h-8 text-brand" aria-hidden="true" />
              <h3 className="mt-4 font-bold text-white text-lg">{c.title}</h3>
              <p className="mt-1.5 text-white/70 leading-relaxed">{c.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyAbfCards;
