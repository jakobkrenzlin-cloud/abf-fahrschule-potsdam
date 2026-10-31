import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { OFFER, OFFER_COPY, getOfferCountdown, withOfferDate } from '@/config/offer';

const pad = (n: number) => String(n).padStart(2, '0');

const UrgencyBar: React.FC<{ label?: string }> = ({
  label = OFFER_COPY.pkwBanner,
}) => {
  const [left, setLeft] = useState(() => getOfferCountdown());

  useEffect(() => {
    if (!OFFER.endDate) return;
    const t = setInterval(() => setLeft(getOfferCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  if (OFFER.endDate && !left) return null;

  return (
    <div className="bg-brand text-white" role="region" aria-label="Aktuelles Angebot">
      <div className="container-page py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm md:text-base font-semibold text-center">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4" aria-hidden="true" />
          {withOfferDate(label)}
        </span>
        {left && <span
          className="inline-flex items-center gap-1 font-mono tabular-nums font-bold"
          aria-live="off"
          aria-label={`Noch ${left.days} Tage, ${left.hours} Stunden, ${left.minutes} Minuten`}
        >
          {left.days} T : {pad(left.hours)} : {pad(left.minutes)} : {pad(left.seconds)}
        </span>}
      </div>
    </div>
  );
};

export default UrgencyBar;
