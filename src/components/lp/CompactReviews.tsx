import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Stars } from './SocialProof';
import { GOOGLE_REVIEWS_URL, RATING_VALUE, REVIEW_COUNT, type Review } from './constants';

type Tone = 'dark' | 'light';

const TONES: Record<Tone, { shell: string; rating: string; quote: string; name: string; link: string }> = {
  dark: {
    shell: 'border-white/10 bg-white/[0.04]',
    rating: 'text-white/80',
    quote: 'text-white/75',
    name: 'text-white/55',
    link: 'text-brand hover:text-white',
  },
  light: {
    shell: 'border-black/[0.08] bg-surface',
    rating: 'text-brand-dark',
    quote: 'text-ink/75',
    name: 'text-ink/55',
    link: 'text-brand-strong hover:text-brand-dark',
  },
};

/** Kleine Bewertungs-Zeile direkt unter dem Formular. */
const CompactReviews: React.FC<{ reviews: Review[]; tone?: Tone }> = ({ reviews, tone = 'dark' }) => {
  const shown = reviews.slice(0, 2);
  if (!shown.length) return null;
  const t = TONES[tone];

  return (
    <section
      className={`mt-4 rounded-xl border p-3.5 ${t.shell}`}
      aria-label="Echte Google-Bewertungen"
    >
      <div className="flex items-center gap-2">
        <Stars className="w-3.5 h-3.5" />
        <span className={`text-[11px] font-semibold ${t.rating}`}>
          {RATING_VALUE} bei Google · {REVIEW_COUNT} Rezensionen
        </span>
      </div>

      <ul className="mt-2.5 space-y-2.5">
        {shown.map((r) => (
          <li key={r.name} className="border-l-2 border-brand/60 pl-2.5">
            <p className={`line-clamp-2 text-xs leading-snug ${t.quote}`}>„{r.text}“</p>
            <p className={`mt-0.5 text-[11px] font-semibold ${t.name}`}>{r.name}</p>
          </li>
        ))}
      </ul>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium transition-colors ${t.link}`}
      >
        Alle Bewertungen auf Google
        <ExternalLink className="w-3 h-3" aria-hidden="true" />
      </a>
    </section>
  );
};

export default CompactReviews;
