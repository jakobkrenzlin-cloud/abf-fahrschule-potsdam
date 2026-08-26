// Cookie Consent Management System - DSGVO-konform
import posthog from 'posthog-js';

export type ConsentStatus = {
  essential: boolean;
  statistics: boolean;
  marketing: boolean;
  timestamp?: number;
};

const CONSENT_COOKIE_NAME = 'abf-cookie-consent';
const CONSENT_VERSION = '1.0';

/** Event, um das Consent-Banner erneut zu öffnen (z. B. Footer-Link). */
export const CONSENT_OPEN_EVENT = 'abf-consent-open';
export function openConsentBanner(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

let posthogInitialized = false;

/**
 * Einzige PostHog-Initialisierung: lädt PostHog, erfasst aber standardmäßig nichts.
 * Erfassung startet erst über applyConsent() bei Statistik-Zustimmung.
 */
export function initPostHog(): void {
  if (posthogInitialized) return;

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

  posthogInitialized = true;
}


export class CookieConsentManager {
  // Get current consent status from localStorage
  static getConsent(): ConsentStatus | null {
    try {
      const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
      if (!stored) return null;
      const data = JSON.parse(stored);
      if (data.version !== CONSENT_VERSION) return null;
      return data.consent;
    } catch {
      return null;
    }
  }

  // Save consent status to localStorage
  static saveConsent(consent: ConsentStatus): void {
    const data = {
      version: CONSENT_VERSION,
      consent: {
        ...consent,
        timestamp: Date.now()
      }
    };
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(data));

    // Apply consent immediately
    this.applyConsent(consent);
  }

  // Check if consent exists
  static hasConsent(): boolean {
    return this.getConsent() !== null;
  }

  // Check if specific category is consented
  static hasConsentFor(category: keyof ConsentStatus): boolean {
    const consent = this.getConsent();
    return consent ? consent[category] === true : false;
  }

  // Apply consent by updating Google Consent Mode v2
  static applyConsent(consent: ConsentStatus): void {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: consent.marketing ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
        analytics_storage: consent.statistics ? 'granted' : 'denied',
      });
    }

    // PostHog folgt der Statistik-Entscheidung
    initPostHog();
    try {
      if (consent.statistics) {
        posthog.opt_in_capturing();
      } else {
        posthog.stopSessionRecording();
        posthog.opt_out_capturing();
      }
    } catch {
      /* PostHog evtl. nicht initialisiert */
    }
  }


  // Reset consent (for testing or user request)
  static resetConsent(): void {
    localStorage.removeItem(CONSENT_COOKIE_NAME);
  }
}
