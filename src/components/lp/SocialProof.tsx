import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';
import { GOOGLE_REVIEWS_URL, RATING_VALUE, REVIEW_COUNT, type Review } from './constants';

export const Stars: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <div className="flex gap-0.5" aria-label={`${RATING_VALUE} von 5 Sternen`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${className} fill-[#FFC40B] text-[#FFC40B]`} aria-hidden="true" />
    ))}
  </div>
);

const SocialProof: React.FC<{ reviews: Review[] }> = ({ reviews }) => (
  <section className="py-12 md:py-16 bg-white" aria-labelledby="reviews-heading">
    <div className="max-w-6xl mx-auto px-4">
      <Reveal>
        <h2
          id="reviews-heading"
          className="text-2xl md:text-4xl font-bold text-[#13243A] text-center"
        >
          Das sagen unsere Fahrschüler
        </h2>
        <p className="mt-3 text-center text-[#1C1C1C]/70">
          {RATING_VALUE} bei Google · {REVIEW_COUNT} Rezensionen
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 80}>
            <figure className="h-full bg-[#F4F7FA] rounded-2xl p-6 border border-black/5 flex flex-col">
              <Stars />
              <blockquote className="mt-4 text-[#1C1C1C] leading-relaxed flex-1">
                „{r.text}“
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-3">
                <span className="font-semibold text-[#13243A]">{r.name}</span>
                <span className="text-xs px-2 py-1 rounded bg-white border border-black/10 text-[#1C1C1C]/70">
                  Google
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 min-h-[56px] px-6 rounded-xl border-2 border-[#13243A]/15 text-[#13243A] font-semibold hover:bg-[#F4F7FA] transition-colors"
        >
          Alle Bewertungen auf Google ansehen
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);

export default SocialProof;
