import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Loader2, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { leadSchema, postLead } from '@/components/lp/LeadForm';
import { getAttribution, callPhone, openWhatsApp } from '@/lib/tracking';
import { phCapture } from '@/lib/formVariant';
import { PHONE_RAW, WHATSAPP_BASE } from '@/components/lp/constants';
import { CLASS_OPTIONS, FORM_ID, LP_VERSION, SOURCE, START_OPTIONS, TRACKING_SOURCE, WHATSAPP_TEXT } from './content';

type Errors = { name?: string; phone?: string; consent?: string };

const FORM_VARIANT = 'classic';
const PHONE_PATTERN = /^[+]?[0-9\s()-]{6,30}$/;

const inputClass =
  'w-full h-14 rounded-xl bg-white text-ink px-4 text-base border-2 border-black/10 focus:border-brand focus:outline-none placeholder:text-ink/45 transition-colors';

/**
 * Beratungsformular für /anmeldung.
 * Schickt dasselbe Format an `submit-lead` wie das bisherige Formular (Quelle landingpage-pkw,
 * form_variant classic, Startwunsch im Feld message) und leitet wie gehabt auf /danke weiter,
 * wo die Google-Ads-Conversion feuert.
 */
const BeratungForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef(false);

  const [licenseClass, setLicenseClass] = useState('b');
  const [start, setStart] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeyPot, setHoneyPot] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  // Sichtbarkeit messen (gleiches Event wie bisher, damit Vorher/Nachher vergleichbar bleibt)
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          phCapture('lead_form_viewed', { form_variant: FORM_VARIANT, lp_version: LP_VERSION });
          o.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  const markStarted = (field: string) => {
    if (startedRef.current) return;
    startedRef.current = true;
    phCapture('lead_form_started', { form_variant: FORM_VARIANT, lp_version: LP_VERSION, first_field: field });
  };

  const validate = (): boolean => {
    const next: Errors = {};
    const result = leadSchema.safeParse({ name, phone, email: '', honeyPot });
    if (!result.success) {
      result.error.errors.forEach((err) => {
        const key = err.path[0];
        if (key === 'name' || key === 'phone') next[key] = err.message;
      });
    }
    // Gleiche Regel wie in supabase/functions/submit-lead (sonst lehnt der Server ab)
    if (!next.phone && !PHONE_PATTERN.test(phone.trim())) {
      next.phone = 'Bitte nur Ziffern, Leerzeichen, + oder Klammern eingeben.';
    }
    if (!consent) next.consent = 'Bitte stimme kurz der Datenschutzerklärung zu.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      phCapture('lead_form_invalid', { form_variant: FORM_VARIANT, lp_version: LP_VERSION });
      return;
    }
    setBusy(true);
    try {
      const res = await postLead({
        name,
        phone,
        license_class: licenseClass,
        source: SOURCE,
        message: start ? `Startwunsch: ${start}` : undefined,
        form_variant: FORM_VARIANT,
        ...getAttribution(),
      });
      if (!res.ok) throw new Error(res.error || 'Submission failed');

      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'lead_submitted', form_type: SOURCE, form_variant: FORM_VARIANT, has_appointment: false });
      phCapture('lead_form_submitted', {
        form_variant: FORM_VARIANT,
        has_appointment: false,
        lp_version: LP_VERSION,
        start_wish: start || 'keine Angabe',
        license_class: licenseClass,
      });
      navigate('/danke', { state: { lead: true } });
    } catch {
      toast({
        title: 'Das hat leider nicht geklappt',
        description: 'Bitte versuch es noch einmal oder ruf uns direkt an.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      id={FORM_ID}
      ref={rootRef}
      className="scroll-mt-24 rounded-2xl bg-white p-5 sm:p-7 shadow-[0_12px_40px_rgba(19,36,58,0.12)] ring-1 ring-black/[0.06] min-w-0"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-brand-strong">Kostenlos und unverbindlich</p>
      <h2 className="mt-1.5 text-[1.6rem] md:text-3xl font-extrabold leading-tight text-brand-dark">
        Lass dich beraten
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
        Wir rufen dich an, beantworten deine Fragen und rechnen dir deinen Preis aus. Ob du dich anmeldest,
        entscheidest du danach.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <div>
          <label htmlFor={`${FORM_ID}-class`} className="mb-1.5 block text-sm font-semibold text-brand-dark">
            Welcher Führerschein?
          </label>
          <div className="relative">
            <select
              id={`${FORM_ID}-class`}
              name="license_class"
              value={licenseClass}
              onChange={(e) => {
                markStarted('license_class');
                setLicenseClass(e.target.value);
              }}
              className={`${inputClass} appearance-none pr-11`}
            >
              {CLASS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-dark/70"
              aria-hidden="true"
            />
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-semibold text-brand-dark">
            Wann möchtest du starten? <span className="font-normal text-ink/55">(optional)</span>
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {START_OPTIONS.map((opt) => {
              const active = start === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    markStarted('start_wish');
                    setStart(active ? '' : opt);
                  }}
                  className={`min-h-[48px] rounded-xl border-2 px-2 text-sm font-semibold leading-tight transition-colors ${
                    active
                      ? 'border-brand-strong bg-brand-strong text-white'
                      : 'border-black/10 bg-white text-brand-dark hover:border-brand/60'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${FORM_ID}-name`} className="mb-1.5 block text-sm font-semibold text-brand-dark">
            Dein Name
          </label>
          <input
            id={`${FORM_ID}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onFocus={() => markStarted('name')}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Vorname reicht"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${FORM_ID}-name-error` : undefined}
          />
          {errors.name && (
            <p id={`${FORM_ID}-name-error`} className="mt-1 text-sm font-medium text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${FORM_ID}-phone`} className="mb-1.5 block text-sm font-semibold text-brand-dark">
            Telefonnummer für den Rückruf
          </label>
          <input
            id={`${FORM_ID}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onFocus={() => markStarted('phone')}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="z. B. 0151 23456789"
            aria-invalid={!!errors.phone}
            aria-describedby={`${FORM_ID}-phone-hint${errors.phone ? ` ${FORM_ID}-phone-error` : ''}`}
          />
          <p id={`${FORM_ID}-phone-hint`} className="mt-1.5 text-xs text-ink/60">
            Nur für unseren Rückruf.
          </p>
          {errors.phone && (
            <p id={`${FORM_ID}-phone-error`} className="mt-1 text-sm font-medium text-destructive">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <div className="flex min-h-[44px] items-start gap-3">
            <input
              id={`${FORM_ID}-consent`}
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                markStarted('consent');
                setConsent(e.target.checked);
                if (e.target.checked) setErrors((prev) => ({ ...prev, consent: undefined }));
              }}
              className="mt-0.5 h-6 w-6 shrink-0 rounded accent-brand-strong"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? `${FORM_ID}-consent-error` : undefined}
            />
            <label htmlFor={`${FORM_ID}-consent`} className="text-xs leading-relaxed text-ink/70">
              Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden.{' '}
              <a href="/datenschutz" className="underline underline-offset-2 hover:text-brand-dark">
                Datenschutzerklärung
              </a>
            </label>
          </div>
          {errors.consent && (
            <p id={`${FORM_ID}-consent-error`} className="mt-1 text-sm font-medium text-destructive">
              {errors.consent}
            </p>
          )}
        </div>

        <input
          type="text"
          value={honeyPot}
          onChange={(e) => setHoneyPot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={busy}
          className="flex min-h-[58px] w-full items-center justify-center gap-2 rounded-xl bg-brand-strong text-lg font-bold text-white transition-colors hover:bg-brand-strong/90 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-strong"
        >
          {busy ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Wird gesendet …
            </>
          ) : (
            'Kostenlos beraten lassen'
          )}
        </button>

        <p className="flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-ink/60">
          <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-success" aria-hidden="true" />
          <span>Keine Anmeldung, keine Vorkasse. Wir melden uns werktags innerhalb von 24 Stunden.</span>
        </p>
      </form>

      <div className="mt-5 border-t border-black/[0.07] pt-4">
        <p className="text-center text-sm font-medium text-ink/70">Lieber direkt schreiben oder anrufen?</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => openWhatsApp(`${WHATSAPP_BASE}?text=${encodeURIComponent(WHATSAPP_TEXT)}`, TRACKING_SOURCE)}
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-success font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
          </button>
          <button
            type="button"
            onClick={() => callPhone(PHONE_RAW, TRACKING_SOURCE)}
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-brand-dark/15 font-semibold text-brand-dark transition-colors hover:bg-surface"
          >
            <Phone className="h-5 w-5" aria-hidden="true" /> Anrufen
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeratungForm;
