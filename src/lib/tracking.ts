// Zentrales Conversion- & Attribution-Tracking (Google Ads / GA4)

export const CONVERSION_LABELS = {
  LEAD: 'AW-17551238202/UhzpCN_gq6YbELrIirFB', // "Submit lead form" (primär)
  BEWERBUNG: 'AW-17551238202/VR5XCLv-kcocELrIirFB', // "Bewerbung Karriere (Website)" (primär)
  ANRUF_KLICK: 'AW-17551238202/sRjcCJaAksocELrIirFB', // "Anruf-Klick (Website)" (sekundär)
} as const;

const STORAGE_KEY = 'abf-attribution';
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 Tage = Click-Lookback-Fenster

export type Attribution = {
  gclid?: string;
  wbraid?: string;
  gbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page?: string;
  referrer?: string;
  ts?: number;
};

const CLICK_ID_KEYS = ['gclid', 'wbraid', 'gbraid'] as const;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

function readStored(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Attribution;
    if (!data.ts || Date.now() - data.ts > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: Attribution = {};
    for (const key of [...CLICK_ID_KEYS, ...UTM_KEYS]) {
      const value = params.get(key);
      if (value) incoming[key] = value.slice(0, 200);
    }

    const existing = readStored();
    const hasNewSignal = Object.keys(incoming).length > 0;
    if (!hasNewSignal && existing) return;

    const record: Attribution = {
      ...(hasNewSignal ? incoming : {}),
      landing_page: (window.location.pathname + window.location.search).slice(0, 500),
      referrer: document.referrer ? document.referrer.slice(0, 500) : undefined,
      ts: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage nicht verfügbar – Tracking ist optional
  }
}

export function getAttribution(): Omit<Attribution, 'ts'> {
  const stored = readStored();
  if (!stored) return {};
  const { ts: _ts, ...fields } = stored;
  return Object.fromEntries(
    Object.entries(fields).filter(([, v]) => typeof v === 'string' && v.length > 0)
  );
}

function gtagEvent(params: Record<string, unknown>): void {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', params);
  }
}

export function fireConversion(sendTo: string): void {
  gtagEvent({ send_to: sendTo });
}

export function trackPhoneClick(source: string): void {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'phone_click', phone_source: source });
  fireConversion(CONVERSION_LABELS.ANRUF_KLICK);
}

export function callPhone(number: string, source: string): void {
  trackPhoneClick(source);
  window.location.href = `tel:${number}`;
}

function initTelClickTracking(): void {
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="tel:"]');
      if (anchor) {
        trackPhoneClick(window.location.pathname);
      }
    },
    { capture: true }
  );
}

let initialized = false;

export function initTracking(): void {
  if (initialized) return;
  initialized = true;
  captureAttribution();
  initTelClickTracking();
}
