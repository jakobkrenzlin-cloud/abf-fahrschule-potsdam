import React from 'react';
import { ArrowRight, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Stars } from '@/components/lp/SocialProof';
import { GOOGLE_REVIEWS_URL, RATING_VALUE, REVIEW_COUNT } from '@/components/lp/constants';
import { OFFER } from '@/config/offer';
import { HOME_FORM_ID, PKW_GRUNDBETRAG, PKW_GRUNDBETRAG_VORHER } from './homeContent';

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const FACTS = [
  { icon: BookOpen, text: 'Theorie in einer Woche' },
  { icon: ShieldCheck, text: 'Keine Vorkasse' },
  { icon: Clock, text: 'Büro Mo–Fr 12–18 Uhr' },
];

const HomeHero: React.FC = () => (
  <section id="home" className="relative overflow-hidden bg-gradient-to-b from-surface to-white">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
    />
    <div className="container-page relative grid grid-cols-1 items-center gap-8 pb-12 pt-6 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20">
      <div className="min-w-0">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 shadow-card"
        >
          <Stars className="h-4 w-4" />
          <span className="text-sm font-semibold text-brand-dark">
            {RATING_VALUE} · {REVIEW_COUNT} Google-Bewertungen
          </span>
        </a>

        <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-strong">
          Fahrschule ABF · Weberpark Babelsberg
        </p>
        <h1 className="mt-2 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-brand-dark md:text-5xl lg:text-[3.4rem]">
          Deine Fahrschule in Potsdam-Babelsberg
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
          Auto, Automatik, Motorrad und B196 bei Fahrlehrern, die ruhig erklären. Theorie in einer Woche, die
          Fahrstunden planen wir gemeinsam mit dir.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollToId(HOME_FORM_ID)}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-brand-strong px-7 text-lg font-bold text-white transition-colors hover:bg-brand-strong/90"
          >
            Kostenlos beraten lassen
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToId('preise')}
            className="inline-flex min-h-[56px] items-center justify-center rounded-xl border-2 border-brand-dark/15 bg-white px-7 text-lg font-semibold text-brand-dark transition-colors hover:bg-surface"
          >
            Preise ansehen
          </button>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {FACTS.map((f) => (
            <li key={f.text} className="inline-flex items-center gap-2 text-[15px] text-ink/75">
              <f.icon className="h-4 w-4 text-brand-strong" aria-hidden="true" />
              {f.text}
            </li>
          ))}
        </ul>

        <Link
          to="/anmeldung"
          className="group mt-6 flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-black/[0.07] bg-white p-4 shadow-card transition-shadow hover:shadow-elevated"
        >
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-wide text-brand-strong">
              {OFFER.label} Klasse B
              {OFFER.pkwValidUntilLabel ? ` · bis ${OFFER.pkwValidUntilLabel}` : ''}
            </span>
            <span className="mt-1 block text-[15px] leading-snug text-ink">
              Grundbetrag <strong className="text-brand-dark">{PKW_GRUNDBETRAG}</strong> statt{' '}
              <s className="text-ink/55">{PKW_GRUNDBETRAG_VORHER}</s>, Erste-Hilfe-Kurs inklusive, bei B197 10
              Schaltstunden für 0 €
            </span>
          </span>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-brand-strong transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="min-w-0">
        <img
          src="/lovable-uploads/942a3ff6-c3ad-407e-8bda-5cd7d40335d8-960.webp"
          srcSet="/lovable-uploads/942a3ff6-c3ad-407e-8bda-5cd7d40335d8-480.webp 480w, /lovable-uploads/942a3ff6-c3ad-407e-8bda-5cd7d40335d8-960.webp 960w"
          sizes="(min-width: 1024px) 45vw, 100vw"
          alt="Die ABF Fahrschule im Weberpark in Potsdam-Babelsberg"
          width={960}
          height={720}
          className="aspect-[16/10] w-full rounded-2xl object-cover shadow-elevated lg:aspect-[4/3]"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  </section>
);

export default HomeHero;
