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

  // Apply consent by loading/blocking scripts
  static applyConsent(consent: ConsentStatus): void {
    // Load Google Ads if marketing consent given
    if (consent.marketing) {
      this.loadGoogleAds();
    }

    // Load Google Analytics if statistics consent given
    if (consent.statistics) {
      this.loadGoogleAnalytics();
    }
  }

  // Load Google Ads tracking
  private static loadGoogleAds(): void {
    if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
      return; // Already loaded
    }

    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17551238202';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17551238202', { 'anonymize_ip': true });
    `;
    document.head.appendChild(script2);
  }

  // Load Google Analytics (optional)
  private static loadGoogleAnalytics(): void {
    // Implement if needed
    // Similar to loadGoogleAds but with Analytics ID
  }

  // Trigger conversion event (only if consent given)
  static triggerConversion(conversionId: string = 'AW-17551238202/UhzpCN_gq6YbELrIirFB'): void {
    if (!this.hasConsentFor('marketing')) {
      console.log('Conversion tracking blocked - no marketing consent');
      return;
    }

    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'conversion', {
        'send_to': conversionId
      });
    }
  }

  // Reset consent (for testing or user request)
  static resetConsent(): void {
    localStorage.removeItem(CONSENT_COOKIE_NAME);
  }
}
