import React from 'react';
import { Check, MapPin } from 'lucide-react';
import { Stars } from './SocialProof';
import { ADDRESS_LINE, RATING_VALUE, REVIEW_COUNT } from './constants';

interface LpHeroProps {
  id: string;
  headline: string;
  subline: string;
  chips: string[];
  children: React.ReactNode; // Formular
}

const LpHero: React.FC<LpHeroProps> = ({ id, headline, subline, chips, children }) => (
  <section id={id} className="bg-ink py-10 md:py-16">
    <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
          <Stars className="w-4 h-4" />
          <span className="text-white text-sm font-semibold">
            {RATING_VALUE} bei Google · {REVIEW_COUNT} Rezensionen
          </span>
        </div>

        <h1 className="mt-5 text-[2rem] leading-[1.15] md:text-5xl lg:text-[3.4rem] font-extrabold text-white">
          {headline}
        </h1>
        <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-xl">{subline}</p>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {chips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand/15 border border-brand/40 text-white text-sm font-medium"
            >
              <Check className="w-4 h-4 text-brand" aria-hidden="true" />
              {chip}
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-start gap-2 text-white/70">
          <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" aria-hidden="true" />
          <span>{ADDRESS_LINE}</span>
        </p>
      </div>

      <div className="lg:pt-2">{children}</div>
    </div>
  </section>
);

export default LpHero;
