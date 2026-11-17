import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CookieConsentManager, ConsentStatus, CONSENT_OPEN_EVENT } from '@/lib/cookieConsent';
import { Link } from 'react-router-dom';

/**
 * Einwilligungs-Banner.
 * Erste Ebene: schmale Leiste unten, ohne die Seite zu sperren. „Nur notwendige“ und „Akzeptieren“
 * sind gleich groß und gleich leicht erreichbar. Zweite Ebene: Einstellungen je Kategorie als Dialog.
 * Gespeichert wird unverändert über CookieConsentManager (Google Consent Mode v2, PostHog).
 */
export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentStatus>({
    essential: true, // Always true, not changeable
    statistics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already given consent
    const existingConsent = CookieConsentManager.getConsent();

    if (!existingConsent) {
      // Show banner after short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Apply existing consent
      CookieConsentManager.applyConsent(existingConsent);
    }
  }, []);

  useEffect(() => {
    // Über „Cookie-Einstellungen“ geöffnet: direkt die Einstellungen mit der gespeicherten Wahl zeigen
    const reopen = () => {
      const saved = CookieConsentManager.getConsent();
      if (saved) setConsent({ essential: true, statistics: saved.statistics, marketing: saved.marketing });
      setShowDetails(true);
      setIsVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: ConsentStatus = {
      essential: true,
      statistics: true,
      marketing: true
    };
    CookieConsentManager.saveConsent(fullConsent);
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    CookieConsentManager.saveConsent(consent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsent: ConsentStatus = {
      essential: true,
      statistics: false,
      marketing: false
    };
    CookieConsentManager.saveConsent(minimalConsent);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  /* ---------- Erste Ebene: schmale Leiste ---------- */
  if (!showDetails) {
    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-2 sm:p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          className="pointer-events-auto mx-auto max-w-3xl rounded-2xl bg-white p-3.5 shadow-[0_8px_40px_rgba(19,36,58,0.22)] ring-1 ring-black/10 sm:flex sm:items-center sm:gap-5 sm:p-4"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="min-w-0 flex-1">
            <h2 id="cookie-title" className="sr-only">
              Cookie-Einstellungen
            </h2>
            <p id="cookie-text" className="text-[13px] leading-snug text-ink/80">
              <Cookie className="mr-1.5 inline h-4 w-4 -translate-y-px text-brand-strong" aria-hidden="true" />
              Wir nutzen Cookies für Statistik und zur Messung unserer Werbung, aber nur mit deiner Zustimmung.{' '}
              <Link to="/datenschutz" className="font-medium text-brand-strong underline underline-offset-2">
                Datenschutz
              </Link>
              {' · '}
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="font-medium text-brand-strong underline underline-offset-2"
              >
                Einstellungen
              </button>
            </p>
          </div>
          <div className="mt-3 grid shrink-0 grid-cols-2 gap-2 sm:mt-0 sm:flex">
            <Button onClick={handleRejectAll} variant="outline" className="h-11 border-2 sm:min-w-[9.5rem]">
              Nur notwendige
            </Button>
            <Button onClick={handleAcceptAll} className="h-11 sm:min-w-[9.5rem]">
              Akzeptieren
            </Button>
          </div>
        </section>
      </div>
    );
  }

  /* ---------- Zweite Ebene: Einstellungen ---------- */
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full m-0 sm:m-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/[0.08] p-5 pb-4 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 id="cookie-settings-title" className="text-xl font-bold text-brand-dark">
                  Cookie-Einstellungen
                </h2>
                <p className="text-sm text-ink/75 mt-1">Du entscheidest, was wir verwenden dürfen.</p>
              </div>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="text-ink/50 hover:text-ink/75 transition-colors"
              aria-label="Einstellungen schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Essential Cookies */}
          <div className="bg-surface rounded-lg p-4 border border-black/[0.08]">
            <div className="flex items-start gap-3">
              <div className="bg-success/10 p-2 rounded-lg">
                <Shield className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-brand-dark text-sm">Notwendig</h3>
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium">
                    Immer aktiv
                  </span>
                </div>
                <p className="text-xs text-ink/75 leading-relaxed">
                  Diese Cookies braucht die Website für ihre Grundfunktionen. Sie speichern zum Beispiel deine
                  Cookie-Einstellungen und lassen sich nicht abschalten.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Cookies */}
          <div className="bg-surface rounded-lg p-4 border border-black/[0.08]">
            <div className="flex items-start gap-3">
              <div className="bg-surface p-2 rounded-lg">
                <BarChart3 className="h-4 w-4 text-brand-strong" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="statistics" className="font-semibold text-brand-dark text-sm">
                    Statistik
                  </label>
                  <Checkbox
                    checked={consent.statistics}
                    onCheckedChange={(checked) => setConsent({ ...consent, statistics: checked === true })}
                    id="statistics"
                  />
                </div>
                <p className="text-xs text-ink/75 leading-relaxed">
                  Statistik-Cookies helfen uns zu verstehen, wie Besucher die Website nutzen. Die Informationen werden
                  anonym gesammelt (z. B. Google Analytics).
                </p>
              </div>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="bg-surface rounded-lg p-4 border border-black/[0.08]">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Target className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="marketing" className="font-semibold text-brand-dark text-sm">
                    Marketing
                  </label>
                  <Checkbox
                    checked={consent.marketing}
                    onCheckedChange={(checked) => setConsent({ ...consent, marketing: checked === true })}
                    id="marketing"
                  />
                </div>
                <p className="text-xs text-ink/75 leading-relaxed">
                  Marketing-Cookies zeigen Besuchern passende Anzeigen und messen, wie gut unsere Werbung wirkt
                  (z. B. Google Ads Conversion-Tracking).
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-ink/75">
            Mehr dazu in unserer{' '}
            <Link to="/datenschutz" className="text-primary hover:underline font-medium">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-black/[0.08] p-5 pt-4 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleRejectAll} variant="outline" className="flex-1 order-2 sm:order-1">
              Nur notwendige
            </Button>
            <Button onClick={handleAcceptSelected} variant="secondary" className="flex-1 order-1 sm:order-2">
              Auswahl speichern
            </Button>
            <Button onClick={handleAcceptAll} className="flex-1 order-1 sm:order-3">
              Alle akzeptieren
            </Button>
          </div>
          <p className="text-xs text-ink/60 text-center mt-3">
            Du kannst deine Einwilligung jederzeit widerrufen.
          </p>
        </div>
      </div>
    </div>
  );
};
