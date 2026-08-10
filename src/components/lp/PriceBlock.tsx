import React from 'react';
import { Check } from 'lucide-react';
import Reveal from './Reveal';

interface PriceBlockProps {
  badge: string;
  price: string;
  title: string;
  included: string[];
  extras?: { label: string; price: string }[];
  closing?: string;
}

const PriceBlock: React.FC<PriceBlockProps> = ({
  badge,
  price,
  title,
  included,
  extras,
  closing = 'Keine versteckten Kosten. Du bekommst vor dem Start eine vollständige Übersicht.',
}) => (
  <section className="section-y bg-surface" aria-labelledby="preis-heading">
    <div className="max-w-4xl mx-auto px-4">
      <Reveal>
        <div className="bg-card rounded-2xl shadow-sm border border-black/5 p-6 md:p-10">
          <span className="inline-block px-3 py-1 rounded-full bg-warning/15 text-warning text-sm font-bold">
            {badge}
          </span>
          <div className="mt-4 flex items-end gap-3 flex-wrap">
            <span className="text-5xl md:text-6xl font-extrabold text-brand-dark leading-none">
              {price}
            </span>
          </div>
          <h2 id="preis-heading" className="mt-4 text-2xl md:text-3xl font-bold text-ink">
            {title}
          </h2>

          <p className="mt-6 font-bold text-brand-dark">Das ist enthalten:</p>
          <ul className="mt-3 space-y-2.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-ink leading-relaxed">
                <Check className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {extras && extras.length > 0 && (
            <div className="mt-8">
              <p className="font-bold text-brand-dark">Kommt dazu (echte Preise):</p>
              <ul className="mt-3 divide-y divide-black/5 border-y border-black/5">
                {extras.map((e) => (
                  <li key={e.label} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-ink">{e.label}</span>
                    <span className="font-bold text-brand-dark whitespace-nowrap">{e.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 text-sm text-ink/70 leading-relaxed">{closing}</p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PriceBlock;
