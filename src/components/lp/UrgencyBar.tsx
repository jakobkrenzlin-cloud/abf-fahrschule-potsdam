import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { OFFER_END, OFFER_DEADLINE_LABEL } from './constants';

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

const UrgencyBar: React.FC<{ label?: string }> = ({
  label = `Herbst-Angebot – nur bis ${OFFER_DEADLINE_LABEL}`,
}) => {
  const [left, setLeft] = useState(() => diff(OFFER_END));

  useEffect(() => {
    const t = setInterval(() => setLeft(diff(OFFER_END)), 1000);
    return () => clearInterval(t);
  }, []);

  if (!left) return null;

  return (
    <div className="bg-warning text-ink" role="region" aria-label="Angebotsfrist">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm md:text-base font-semibold text-center">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4" aria-hidden="true" />
          {label}
        </span>
        <span
          className="inline-flex items-center gap-1 font-mono tabular-nums font-bold"
          aria-live="off"
          aria-label={`Noch ${left.days} Tage, ${left.hours} Stunden, ${left.minutes} Minuten`}
        >
          {left.days} T : {pad(left.hours)} : {pad(left.minutes)} : {pad(left.seconds)}
        </span>
      </div>
    </div>
  );
};

export default UrgencyBar;
