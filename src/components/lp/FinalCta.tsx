import React from 'react';
import { ArrowDown } from 'lucide-react';
import Reveal from './Reveal';

interface FinalCtaProps {
  headline: string;
  subline?: string;
  buttonLabel: string;
  onClick: () => void;
}

const FinalCta: React.FC<FinalCtaProps> = ({ headline, subline, buttonLabel, onClick }) => (
  <section className="section-y bg-brand-dark">
    <div className="container-narrow text-center">
      <Reveal>
        <h2 className="text-h1 md:text-h1-lg text-white leading-tight">{headline}</h2>
        {subline && <p className="mt-4 text-lg text-white/75 leading-relaxed">{subline}</p>}
        <button
          type="button"
          onClick={onClick}
          className="mt-8 inline-flex items-center justify-center gap-2 min-h-[56px] px-8 rounded-xl bg-brand-strong hover:bg-brand-strong/90 text-white text-lg font-bold transition-colors"
        >
          {buttonLabel}
          <ArrowDown className="w-5 h-5" aria-hidden="true" />
        </button>
      </Reveal>
    </div>
  </section>
);

export default FinalCta;
