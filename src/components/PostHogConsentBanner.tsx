import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CONSENT_OPEN_EVENT,
  acceptConsent,
  getConsent,
  gpcEnabled,
  rejectConsent,
} from '@/lib/posthogConsent';

/**
 * Dezentes Analytics-Consent-Banner (PostHog).
 * Keine Cookie-Wand: die Seite bleibt ohne Entscheidung voll nutzbar.
 */
export const PostHogConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null && !gpcEnabled()) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const btnBase =
    'flex-1 min-h-[44px] rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--consent-accent))]';

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-xl bg-[hsl(var(--consent-surface))] text-white shadow-2xl ring-1 ring-white/10 p-4 md:p-5">
        <p className="text-sm leading-relaxed text-white/85">
          Wir nutzen Analyse-Tools (u.&nbsp;a. PostHog), um zu verstehen, wie unsere Seite genutzt
          wird. Das hilft uns, sie zu verbessern. Du entscheidest, ob wir das dürfen.{' '}
          <Link
            to="/datenschutz"
            className="underline underline-offset-2 text-[hsl(var(--consent-accent))] hover:text-white"
          >
            Mehr in der Datenschutzerklärung
          </Link>
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              rejectConsent();
              setOpen(false);
            }}
            className={`${btnBase} border border-white/40 text-white hover:bg-white/10`}
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={() => {
              acceptConsent();
              setOpen(false);
            }}
            className={`${btnBase} bg-[hsl(var(--consent-accent))] text-white hover:opacity-90`}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostHogConsentBanner;
