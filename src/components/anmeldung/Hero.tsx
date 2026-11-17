import React from 'react';
import { ArrowDown, Check, Info, MapPin } from 'lucide-react';
import { Stars } from '@/components/lp/SocialProof';
import { ADDRESS_LINE, RATING_VALUE, REVIEW_COUNT } from '@/components/lp/constants';
import { OFFER } from '@/config/offer';
import BeratungForm from './BeratungForm';
import { GRUNDBETRAG, GRUNDBETRAG_VORHER, GUELTIG_BIS, HERO_ID } from './content';

const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Hero: React.FC = () => (
  <section id={HERO_ID} className="relative overflow-hidden bg-gradient-to-b from-surface to-white">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
    />
    <div className="container-page relative grid grid-cols-1 items-start gap-8 pb-12 pt-6 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20">
      <div className="min-w-0">
        <a
          href="https://maps.google.com/?q=ABF+Fahrschule+Potsdam"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 shadow-card"
        >
          <Stars className="h-4 w-4" />
          <span className="text-sm font-semibold text-brand-dark">
            {RATING_VALUE} · {REVIEW_COUNT} Google-Bewertungen
          </span>
        </a>

        <h1 className="mt-5 text-[1.9rem] font-extrabold leading-[1.12] tracking-tight text-brand-dark [hyphens:manual] [overflow-wrap:normal] md:text-5xl lg:text-[3.25rem]">
          Führerschein in Potsdam – mit Fahrlehrern, die ruhig erklären
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
          Klasse B, Automatik und BF17 in Babelsberg. Lass dich erst kostenlos beraten und entscheide dann in Ruhe.
        </p>

        <div className="mt-6 max-w-xl rounded-2xl border border-black/[0.07] bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-strong">
              {OFFER.label}
            </span>
            {GUELTIG_BIS && <span className="text-sm text-ink/65">bei Anmeldung bis {GUELTIG_BIS}</span>}
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
            <span className="text-sm font-semibold text-ink/70">Grundbetrag</span>
            <span className="text-4xl font-extrabold leading-none text-brand-dark">{GRUNDBETRAG}</span>
            <span className="text-base text-ink/55">
              statt <s>{GRUNDBETRAG_VORHER}</s>
            </span>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {['Erste-Hilfe-Kurs inklusive', 'B197: 10 Schaltstunden für 0 €', 'Theorie in einer Woche', 'Keine Vorkasse'].map(
              (item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] leading-snug text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <a
            href="#kosten"
            onClick={scrollTo('kosten')}
            className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand-strong underline-offset-4 hover:underline"
          >
            Was sonst noch dazukommt <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <a
          href="#reform"
          onClick={scrollTo('reform')}
          className="mt-4 flex max-w-xl items-start gap-3 rounded-xl border border-brand/25 bg-brand/[0.06] px-4 py-3 text-[15px] leading-snug text-brand-dark transition-colors hover:bg-brand/10"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Du überlegst, auf die Führerscheinreform zu warten?</strong>{' '}
            <span className="text-ink/75">Hier ist der aktuelle Stand.</span>
          </span>
        </a>

        <p className="mt-5 hidden items-start gap-2 text-sm text-ink/60 lg:flex">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          {ADDRESS_LINE}
        </p>
      </div>

      <div className="min-w-0">
        <BeratungForm />
      </div>
    </div>
  </section>
);

export default Hero;
