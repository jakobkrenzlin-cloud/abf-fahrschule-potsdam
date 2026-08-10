import React from 'react';
import { Link } from 'react-router-dom';
import { Euro, BookOpen, MapPin, ArrowRight } from 'lucide-react';

const CARDS = [
  {
    to: '/preise',
    icon: Euro,
    title: 'Alle Preise im Überblick',
    text: 'Grundbetrag, Fahrstunden und externe Gebühren – transparent aufgelistet.',
  },
  {
    to: '/theorie',
    icon: BookOpen,
    title: 'Theorieunterricht',
    text: '14 Stunden kompakt – bei uns schaffst du die Theorie in einer Woche.',
  },
  {
    to: '/kontakt',
    icon: MapPin,
    title: 'Standort & Öffnungszeiten',
    text: 'Weberpark, Tuchmacherstraße 45b – Montag bis Freitag 12:00 – 18:00 Uhr.',
  },
];

/** Schlanker Ausblick auf die Hauptseite – steht bewusst UNTER dem Abschluss-CTA. */
const LpFooterLinks: React.FC = () => (
  <section className="section-y bg-surface" aria-labelledby="mehr-heading">
    <div className="container-page">
      <h2 id="mehr-heading" className="text-h2 md:text-h2-lg text-brand-dark text-center">
        Mehr über die ABF Fahrschule
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="bg-card border border-black/[0.08] rounded-xl p-5 md:p-6 shadow-card hover:shadow-elevated transition-shadow"
          >
            <c.icon className="w-6 h-6 text-brand" aria-hidden="true" />
            <h3 className="mt-3 text-h3 text-brand-dark">{c.title}</h3>
            <p className="mt-2 text-small text-ink/75">{c.text}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-small font-semibold text-brand-strong">
              Ansehen <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center min-h-[44px] text-small font-semibold text-brand-strong underline underline-offset-4"
        >
          Zur Startseite der ABF Fahrschule Potsdam
        </Link>
      </p>
    </div>
  </section>
);

export default LpFooterLinks;
