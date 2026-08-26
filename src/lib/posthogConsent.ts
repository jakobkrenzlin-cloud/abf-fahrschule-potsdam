import posthog from 'posthog-js';

export const CONSENT_KEY = 'fp_consent';
export type PhConsent = 'accepted' | 'rejected';
export const CONSENT_CHANGED_EVENT = 'fp-consent-changed';
export const CONSENT_OPEN_EVENT = 'fp-consent-open';

let initialized = false;

export function getConsent(): PhConsent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'rejected' ? v : null;
  } catch {
    return null;
  }
}

/** Global Privacy Control: gilt ohne eigene Entscheidung als Ablehnung. */
export function gpcEnabled(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

/**
 * Lädt PostHog, aber standardmäßig OHNE Erfassung (opt_out_capturing_by_default).
 * Erst nach aktiver Zustimmung wird opt_in_capturing() aufgerufen.
 */
export function initPostHog(): void {
  if (initialized) return;

  const token = import.meta.env.VITE_LOVABLE_CONNECTOR_POSTHOG_API_KEY as string | undefined;
  if (!token) return;

  const region = (import.meta.env.VITE_LOVABLE_CONNECTOR_POSTHOG_REGION as string | undefined) || 'eu';
  const apiHost = region === 'us' ? 'https://us.i.posthog.com' : 'https://eu.i.posthog.com';

  posthog.init(token, {
    api_host: apiHost,
    opt_out_capturing_by_default: true,
    persistence: 'localStorage+cookie',
    autocapture: true,
    capture_pageview: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '.ph-mask',
    },
  });

  initialized = true;

  if (getConsent() === 'accepted') {
    posthog.opt_in_capturing();
  }
  // "rejected", GPC oder keine Entscheidung -> bleibt opted out.
}

export function acceptConsent(): void {
  try {
    localStorage.setItem(CONSENT_KEY, 'accepted');
  } catch {
    /* ignore */
  }
  initPostHog();
  posthog.opt_in_capturing();
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: 'accepted' }));
}

export function rejectConsent(): void {
  try {
    localStorage.setItem(CONSENT_KEY, 'rejected');
  } catch {
    /* ignore */
  }
  try {
    posthog.stopSessionRecording();
  } catch {
    /* PostHog evtl. nicht initialisiert */
  }
  try {
    posthog.opt_out_capturing();
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: 'rejected' }));
}

/** Öffnet das Banner erneut (z. B. über den Footer-Link). */
export function openConsentBanner(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
