import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { LOGO_URL, PHONE_DISPLAY, PHONE_RAW } from './constants';

interface LpHeaderProps {
  onCtaClick: () => void;
  ctaLabel?: string;
}

const LpHeader: React.FC<LpHeaderProps> = ({ onCtaClick, ctaLabel = 'Jetzt anmelden' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white ${
        scrolled ? 'shadow-md' : 'shadow-none'
      } transition-shadow`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <a href="/" className="flex items-center shrink-0" aria-label="ABF Fahrschule Potsdam Startseite">
          <img
            src={LOGO_URL}
            alt="ABF Fahrschule Potsdam"
            width={160}
            height={48}
            className="h-10 md:h-12 w-auto"
            loading="eager"
          />
        </a>

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={`tel:${PHONE_RAW}`}
            className="flex items-center gap-2 text-[#13243A] font-semibold rounded-lg px-2 py-2 hover:text-[#1A9CFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1A9CFF]"
            aria-label={`Anrufen unter ${PHONE_DISPLAY}`}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </a>
          <button
            type="button"
            onClick={onCtaClick}
            className="bg-[#1A9CFF] hover:bg-[#0f86e0] active:bg-[#0d76c7] text-white font-bold rounded-xl px-4 md:px-6 h-11 text-sm md:text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13243A]"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </header>
  );
};

export default LpHeader;
