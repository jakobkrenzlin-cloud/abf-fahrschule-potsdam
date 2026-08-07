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
  <section className="py-14 md:py-20 bg-[#13243A]">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <Reveal>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{headline}</h2>
        {subline && <p className="mt-4 text-lg text-white/75 leading-relaxed">{subline}</p>}
        <button
          type="button"
          onClick={onClick}
          className="mt-8 inline-flex items-center justify-center gap-2 min-h-[56px] px-8 rounded-xl bg-[#1A9CFF] hover:bg-[#0f86e0] text-white text-lg font-bold transition-colors"
        >
          {buttonLabel}
          <ArrowDown className="w-5 h-5" aria-hidden="true" />
        </button>
      </Reveal>
    </div>
  </section>
);

export default FinalCta;
