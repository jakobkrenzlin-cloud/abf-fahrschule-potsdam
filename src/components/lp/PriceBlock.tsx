import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

interface PriceBlockProps {
  badge: string;
  price: string;
  title: string;
  subtitle?: string;
  included?: string[];
  includedBase?: string[];
  includedAdditional?: string[];
  extras?: { label: string; price: string }[];
  note?: string;
  closing?: string;
}

const PriceBlock: React.FC<PriceBlockProps> = ({
  badge,
  price,
  title,
  subtitle,
  included,
  includedBase,
  includedAdditional,
  extras,
  note,
  closing = 'Amtliche Gebühren (TÜV/DEKRA, Führerscheinstelle) kommen hinzu.',
}) => (
  <section id="preisblock" className="section-y bg-surface scroll-mt-24" aria-labelledby="preis-heading">
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
          {subtitle && <p className="mt-2 text-ink/70">{subtitle}</p>}

          {included && included.length > 0 && (
            <>
              <p className="mt-6 font-bold text-brand-dark">Das ist enthalten:</p>
              <ul className="mt-3 space-y-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-ink leading-relaxed">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {note && <p className="mt-3 text-sm text-ink/70">{note}</p>}
            </>
          )}

          {includedBase && includedBase.length > 0 && (
            <div className="mt-6">
              <p className="font-bold text-brand-dark">Im Grundbetrag enthalten:</p>
              <ul className="mt-3 space-y-2.5">
                {includedBase.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-ink leading-relaxed">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {includedAdditional && includedAdditional.length > 0 && (
            <div className="mt-6 pt-6 border-t border-black/5">
              <p className="font-bold text-brand-dark">Im Grundbetrag zusätzlich:</p>
              <ul className="mt-3 space-y-2.5">
                {includedAdditional.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-ink leading-relaxed">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {extras && extras.length > 0 && (
            <details className="group mt-8 border-y border-black/5">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
                <span>Kommt dazu</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="overflow-x-auto pb-4">
                <table className="w-full border-collapse text-left">
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Leistung</th>
                      <th scope="col">Preis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 border-t border-black/5">
                    {extras.map((extra) => (
                      <tr key={extra.label}>
                        <th scope="row" className="py-3 pr-4 font-normal leading-relaxed text-ink">
                          {extra.label}
                        </th>
                        <td className="py-3 text-right font-bold text-brand-dark whitespace-nowrap">
                          {extra.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          )}

          <p className="mt-6 text-sm text-ink/70 leading-relaxed">{closing}</p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PriceBlock;
