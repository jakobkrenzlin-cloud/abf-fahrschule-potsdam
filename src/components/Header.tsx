import React, { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PHONE_DISPLAY, PHONE_RAW, LOGO_URL } from '@/components/lp/constants';
import { callPhone } from '@/lib/tracking';

interface HeaderProps {
  /** 'lp' = schlanker Modus für die Anzeigen-Landingpages (ohne Navigation) */
  variant?: 'full' | 'lp';
  onCtaClick?: () => void;
  ctaLabel?: string;
}

const NAV = [
  { label: 'Start', to: '/' },
  { label: 'Preise', to: '/preise' },
  { label: 'Theorie', to: '/theorie' },
  { label: 'Kontakt', to: '/kontakt' },
  { label: 'Karriere', to: '/karriere' },
];

const Header: React.FC<HeaderProps> = ({ variant = 'full', onCtaClick, ctaLabel }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLp = variant === 'lp';

  const handleCta = () => {
    setIsMenuOpen(false);
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/anmeldung');
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background ${
        scrolled ? 'shadow-card' : ''
      } border-b border-black/[0.08] transition-shadow`}
    >
      <div className="container-page h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center shrink-0" aria-label="ABF Fahrschule Potsdam – Startseite">
          <img
            src={LOGO_URL}
            alt="ABF Fahrschule Potsdam"
            width={160}
            height={48}
            className="h-10 md:h-12 w-auto"
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        {!isLp && (
          <nav className="hidden md:flex items-center gap-6" aria-label="Hauptnavigation">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-small font-semibold text-brand-dark hover:text-brand-strong transition-colors py-3"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={`tel:${PHONE_RAW}`}
            onClick={() => callPhone(PHONE_RAW, 'header')}
            className="hidden sm:flex items-center gap-2 min-h-[44px] px-2 text-small font-semibold text-brand-dark hover:text-brand-strong transition-colors"
            aria-label={`Anrufen unter ${PHONE_DISPLAY}`}
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
          </a>

          <Button type="button" onClick={handleCta} size="sm">
            {ctaLabel ?? 'Jetzt anmelden'}
          </Button>

          {!isLp && (
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden touch-target inline-flex items-center justify-center text-brand-dark"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {!isLp && isMenuOpen && (
        <nav className="md:hidden bg-background border-t border-black/[0.08]" aria-label="Mobile Navigation">
          <div className="container-page py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center min-h-[48px] text-brand-dark font-semibold hover:text-brand-strong transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${PHONE_RAW}`}
              className="flex items-center gap-2 min-h-[48px] text-brand-dark font-semibold"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
