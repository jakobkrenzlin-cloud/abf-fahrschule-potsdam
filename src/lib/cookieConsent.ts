// Cookie Consent Management System - DSGVO-konform

export type ConsentStatus = {
  essential: boolean;
  statistics: boolean;
  marketing: boolean;
  timestamp?: number;
};

const CONSENT_COOKIE_NAME = 'abf-cookie-consent';
const CONSENT_VERSION = '1.0';

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
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: consent.marketing ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
        analytics_storage: consent.statistics ? 'granted' : 'denied',
      });
    }
  }

  // Trigger Google Ads conversion event. Consent Mode v2 ensures the event is
  // only recorded by Google when marketing consent is granted.
  static triggerConversion(conversionId: string = 'AW-17551238202/UhzpCN_gq6YbELrIirFB'): void {
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: conversionId });
    }
  }

  // Reset consent (for testing or user request)
  static resetConsent(): void {
    localStorage.removeItem(CONSENT_COOKIE_NAME);
  }
}
