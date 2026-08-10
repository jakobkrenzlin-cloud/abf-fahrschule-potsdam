import React from 'react';
import { ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { Stars } from '@/components/lp/SocialProof';
import { RATING_VALUE, REVIEW_COUNT, OFFER_DEADLINE_LABEL } from '@/components/lp/constants';

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="section-y bg-brand-dark">
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 border border-brand/40 px-3.5 py-2 text-small font-medium text-white">
            <Clock className="w-4 h-4" aria-hidden="true" />
            Herbst-Angebot – nur noch bis {OFFER_DEADLINE_LABEL}
          </span>

          <h1 className="text-h1 md:text-h1-lg text-white">
            Führerschein in Potsdam – <span className="text-brand">entspannt und schnell</span>
          </h1>

          <p className="text-body text-white/75 leading-relaxed max-w-xl">
            Theorie in einer Woche, erfahrene Fahrlehrer und faire Preise. Grundbetrag Klasse B
            aktuell 199 € – Fahrstunden und amtliche Gebühren kommen zusätzlich dazu.
          </p>

          <div className="flex items-center gap-3">
            <Stars />
            <span className="text-small text-white/80">
              {RATING_VALUE} bei Google · {REVIEW_COUNT} Rezensionen
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center justify-center gap-2 min-h-[56px] px-8 rounded-xl bg-brand-strong hover:bg-brand-strong/90 text-white text-lg font-bold transition-colors"
            >
              Kostenlos beraten lassen
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('ablauf-heading')}
              className="inline-flex items-center justify-center min-h-[56px] px-8 rounded-xl border-2 border-white/25 text-white text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              So läuft's ab
            </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-small text-white/70">
            <span className="inline-flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand" aria-hidden="true" /> Über 15 Jahre Erfahrung
            </span>
            <span className="inline-flex items-center gap-2">
              <Award className="w-5 h-5 text-brand" aria-hidden="true" /> Hohe Erfolgsquote
            </span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-elevated">
          <img
            src="/lovable-uploads/942a3ff6-c3ad-407e-8bda-5cd7d40335d8.png"
            alt="Gebäude der ABF Fahrschule Potsdam im Weberpark"
            width={960}
            height={720}
            className="w-full h-full object-cover aspect-[4/3]"
            loading="eager"

            decoding="sync"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
