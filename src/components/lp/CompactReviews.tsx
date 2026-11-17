import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Stars } from './SocialProof';
import { GOOGLE_REVIEWS_URL, RATING_VALUE, REVIEW_COUNT, type Review } from './constants';

/** Kleine Bewertungs-Zeile direkt unter dem Formular (dunkler Hero-Hintergrund). */
const CompactReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const shown = reviews.slice(0, 2);
  if (!shown.length) return null;

  return (
    <section
      className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3.5"
      aria-label="Echte Google-Bewertungen"
    >
      <div className="flex items-center gap-2">
        <Stars className="w-3.5 h-3.5" />
        <span className="text-[11px] font-semibold text-white/80">
          {RATING_VALUE} bei Google · {REVIEW_COUNT} Rezensionen
        </span>
      </div>

      <ul className="mt-2.5 space-y-2.5">
        {shown.map((r) => (
          <li key={r.name} className="border-l-2 border-brand/60 pl-2.5">
            <p className="line-clamp-2 text-xs leading-snug text-white/75">„{r.text}“</p>
            <p className="mt-0.5 text-[11px] font-semibold text-white/55">{r.name}</p>
          </li>
        ))}
      </ul>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium text-brand transition-colors hover:text-white"
      >
        Alle Bewertungen auf Google
        <ExternalLink className="w-3 h-3" aria-hidden="true" />
      </a>
    </section>
  );
};

export default CompactReviews;
