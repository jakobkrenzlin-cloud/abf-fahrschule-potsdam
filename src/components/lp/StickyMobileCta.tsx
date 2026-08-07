import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { callPhone } from '@/lib/tracking';
import { PHONE_RAW } from './constants';

interface StickyMobileCtaProps {
  heroId: string;
  formId: string;
  onCtaClick: () => void;
  label?: string;
  trackingSource: string;
}

const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({
  heroId,
  formId,
  onCtaClick,
  label = 'Jetzt anmelden',
  trackingSource,
}) => {
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const hero = document.getElementById(heroId);
    const form = document.getElementById(formId);
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), {
        threshold: 0,
      });
      o.observe(hero);
      observers.push(o);
    }
    if (form) {
      const o = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), {
        threshold: 0.15,
      });
      o.observe(form);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [heroId, formId]);

  const show = !heroVisible && !formVisible;

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/10 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-hidden={!show}
    >
      <div className="flex gap-2 p-2">
        <button
          type="button"
          onClick={onCtaClick}
          tabIndex={show ? 0 : -1}
          className="flex-[2] h-[60px] rounded-xl bg-[#1A9CFF] text-white font-bold text-base active:scale-[0.98] transition-transform"
        >
          {label}
        </button>
        <button
          type="button"
          onClick={() => callPhone(PHONE_RAW, trackingSource)}
          tabIndex={show ? 0 : -1}
          className="flex-1 h-[60px] rounded-xl border-2 border-[#13243A]/20 text-[#13243A] font-bold flex items-center justify-center gap-2"
          aria-label="Jetzt anrufen"
        >
          <Phone className="w-5 h-5" aria-hidden="true" /> Anrufen
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCta;
