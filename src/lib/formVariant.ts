import { useState } from 'react';
import { BOOKING_MODE } from '@/config/booking';

export type FormVariant = 'booking' | 'classic';
export type SubmitVariant = FormVariant | 'booking_fallback';

const STORAGE_KEY = 'abf_form_variant';

function readUrlOverride(): FormVariant | null {
  try {
    const v = new URLSearchParams(window.location.search).get('formvariant');
    return v === 'booking' || v === 'classic' ? v : null;
  } catch {
    return null;
  }
}

export function resolveFormVariant(): FormVariant {
  const override = readUrlOverride();
  if (override) return override;
  if (BOOKING_MODE === 'booking' || BOOKING_MODE === 'classic') return BOOKING_MODE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'booking' || stored === 'classic') return stored;
    const picked: FormVariant = Math.random() < 0.5 ? 'booking' : 'classic';
    window.localStorage.setItem(STORAGE_KEY, picked);
    return picked;
  } catch {
    return Math.random() < 0.5 ? 'booking' : 'classic';
  }
}

/** Variante einmal pro Seitenaufruf festlegen */
export function useFormVariant(): FormVariant {
  const [variant] = useState<FormVariant>(() => resolveFormVariant());
  return variant;
}

/** PostHog-Event, nur wenn window.posthog vorhanden ist. Wirft nie. */
export function phCapture(event: string, props: Record<string, unknown>) {
  try {
    const ph = (window as unknown as { posthog?: { capture?: (e: string, p: Record<string, unknown>) => void } })
      .posthog;
    if (ph && typeof ph.capture === 'function') ph.capture(event, { page: window.location.pathname, ...props });
  } catch {
    /* ignore */
  }
}
