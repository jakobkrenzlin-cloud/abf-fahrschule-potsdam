import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { getAttribution, callPhone, openWhatsApp } from '@/lib/tracking';
import { supabase } from '@/integrations/supabase/client';
import { AUTUMN_OFFER_LAST_DAY, getAvailableSlots } from '@/config/booking';
import { phCapture, type FormVariant, type SubmitVariant } from '@/lib/formVariant';
import { dayShortDate, dayShortWeekday, formatLong, formatShort, localDay, localTime } from '@/lib/appointmentFormat';
import { PHONE_RAW, WHATSAPP_BASE } from './constants';

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Bitte gib deinen Namen ein (mind. 2 Zeichen).').max(100),
  phone: z
    .string()
    .trim()
    .min(6, 'Bitte gib eine gültige Telefonnummer ein.')
    .max(30, 'Die Telefonnummer ist zu lang.'),
  email: z
    .string()
    .trim()
    .email('Bitte gib eine gültige E-Mail-Adresse ein.')
    .max(255)
    .optional()
    .or(z.literal('')),
  honeyPot: z.string().max(0),
});

export type ClassOption = { value: string; label: string };

const START_OPTIONS = ['12 bis 15 Uhr', '15 bis 18 Uhr', 'Ist mir egal'];
const FLOW_CLASSIC = ['Termin anfragen', 'Rückruf in 24 h', 'Anmeldung vor Ort'];
const FLOW_BOOKING = ['Termin wählen', 'Bestätigung per WhatsApp', 'Anmeldung vor Ort'];
const ADDRESS_SHORT = 'Weberpark, Tuchmacherstraße 45b, Potsdam-Babelsberg';

interface LeadFormProps {
  id?: string;
  title?: string;
  ctaLabel: string;
  source: string;
  classOptions: ClassOption[];
  licenseClass: string;
  onLicenseClassChange: (value: string) => void;
  whatsappText: string;
  trackingSource: string;
  onsiteNote?: string;
  /** Formular-Variante (A/B-Test). Standard: classic */
  variant?: FormVariant;
  /** Hinweis in Schritt 1 bis AUTUMN_OFFER_LAST_DAY */
  offerLine?: string;
  /** Label auf Tages-Chips bis AUTUMN_OFFER_LAST_DAY */
  offerTag?: string;
}

type Errors = { name?: string; phone?: string; email?: string };

/* ---------- Gemeinsame Felder ---------- */

function useLeadFields() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [honeyPot, setHoneyPot] = useState('');
  const [start, setStart] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  return { name, setName, phone, setPhone, email, setEmail, honeyPot, setHoneyPot, start, setStart, consent, setConsent, errors, setErrors };
}
type Fields = ReturnType<typeof useLeadFields>;

const inputClass =
  'w-full h-14 rounded-xl bg-white/95 text-ink px-4 text-base border-2 border-transparent focus:border-brand focus:outline-none placeholder:text-ink/60';

/** Prüft Felder + Einwilligung. true = ok */
function useValidate() {
  const { toast } = useToast();
  return (f: Fields) => {
    const result = leadSchema.safeParse({ name: f.name, phone: f.phone, email: f.email, honeyPot: f.honeyPot });
    if (!result.success) {
      const fieldErrors: Errors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0];
        if (key === 'name' || key === 'phone' || key === 'email') fieldErrors[key] = err.message;
      });
      f.setErrors(fieldErrors);
      return false;
    }
    f.setErrors({});
    if (!f.consent) {
      toast({
        title: 'Bitte zustimmen',
        description: 'Bitte stimme kurz der Datenschutzerklärung zu.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };
}

async function postLead(payload: Record<string, unknown>): Promise<{ ok: boolean; status: number; error?: string }> {
  const response = await fetch('https://jxxhrldcmwjnjqfpfeti.supabase.co/functions/v1/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) return { ok: true, status: response.status };
  const data = await response.json().catch(() => ({}));
  return { ok: false, status: response.status, error: data?.error };
}

function trackSubmitted(source: string, formVariant: SubmitVariant, hasAppointment: boolean) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'lead_submitted', form_type: source, form_variant: formVariant, has_appointment: hasAppointment });
  phCapture('lead_form_submitted', { form_variant: formVariant, has_appointment: hasAppointment });
}

const ContactFields: React.FC<{
  id: string;
  f: Fields;
  classOptions: ClassOption[];
  licenseClass: string;
  onLicenseClassChange: (v: string) => void;
  withStart: boolean;
  consentText: string;
}> = ({ id, f, classOptions, licenseClass, onLicenseClassChange, withStart, consentText }) => (
  <>
    <div>
      <label htmlFor={`${id}-name`} className="block text-sm font-medium text-white mb-1.5">Name</label>
      <input
        id={`${id}-name`} name="name" type="text" autoComplete="name" required
        value={f.name} onChange={(e) => f.setName(e.target.value)} className={inputClass}
        placeholder="Dein Name" aria-invalid={!!f.errors.name}
        aria-describedby={f.errors.name ? `${id}-name-error` : undefined}
      />
      {f.errors.name && <p id={`${id}-name-error`} className="mt-1 text-sm text-warning">{f.errors.name}</p>}
    </div>

    <div>
      <label htmlFor={`${id}-phone`} className="block text-sm font-medium text-white mb-1.5">Telefonnummer</label>
      <input
        id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required
        value={f.phone} onChange={(e) => f.setPhone(e.target.value)} className={inputClass}
        placeholder="z. B. 0162 2191290" aria-invalid={!!f.errors.phone}
        aria-describedby={f.errors.phone ? `${id}-phone-error` : undefined}
      />
      {f.errors.phone && <p id={`${id}-phone-error`} className="mt-1 text-sm text-warning">{f.errors.phone}</p>}
    </div>

    <div>
      <label htmlFor={`${id}-email`} className="block text-sm font-medium text-white mb-1.5">
        E-Mail <span className="text-white/60">(optional)</span>
      </label>
      <input
        id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email"
        value={f.email} onChange={(e) => f.setEmail(e.target.value)} className={inputClass}
        placeholder="deine@email.de" aria-invalid={!!f.errors.email}
        aria-describedby={f.errors.email ? `${id}-email-error` : undefined}
      />
      {f.errors.email && <p id={`${id}-email-error`} className="mt-1 text-sm text-warning">{f.errors.email}</p>}
    </div>

    <div>
      <label htmlFor={`${id}-class`} className="block text-sm font-medium text-white mb-1.5">Führerscheinklasse</label>
      <select
        id={`${id}-class`} name="license_class" value={licenseClass}
        onChange={(e) => onLicenseClassChange(e.target.value)} className={`${inputClass} appearance-none`}
      >
        {classOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>

    {withStart && (
      <fieldset>
        <legend className="block text-sm font-medium text-white mb-2">
          Wann kannst du am besten vorbeikommen? <span className="text-white/60">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {START_OPTIONS.map((opt) => (
            <button
              key={opt} type="button" onClick={() => f.setStart(f.start === opt ? '' : opt)}
              aria-pressed={f.start === opt}
              className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                f.start === opt
                  ? 'bg-brand-strong text-white border-brand'
                  : 'bg-white/10 text-white border-white/25 hover:bg-white/20'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/70">Wir sind Montag bis Freitag für dich da.</p>
      </fieldset>
    )}

    <div className="flex items-start gap-2.5">
      <input
        id={`${id}-consent`} type="checkbox" checked={f.consent}
        onChange={(e) => f.setConsent(e.target.checked)} className="mt-1 w-5 h-5 rounded accent-brand"
      />
      <label htmlFor={`${id}-consent`} className="text-xs text-white/80 leading-relaxed">
        {consentText}{' '}
        <a href="/datenschutz" className="underline hover:text-white">Datenschutzerklärung</a>
      </label>
    </div>

    <input
      type="text" value={f.honeyPot} onChange={(e) => f.setHoneyPot(e.target.value)}
      className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true"
    />
  </>
);

const CONSENT_DEFAULT = 'Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden.';
const CONSENT_BOOKING =
  'Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Terminvereinbarung gespeichert werden.';

const SubmitButton: React.FC<{ busy: boolean; label: string; disabled?: boolean }> = ({ busy, label, disabled }) => (
  <button
    type="submit"
    disabled={busy || disabled}
    className="w-full min-h-[56px] rounded-xl bg-brand-strong hover:bg-brand-strong/90 disabled:opacity-60 text-white text-lg font-bold transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
  >
    {busy ? (<><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Wird gesendet…</>) : label}
  </button>
);

const DirectContact: React.FC<{ whatsappText: string; trackingSource: string }> = ({ whatsappText, trackingSource }) => (
  <>
    <p className="pt-1 text-center text-sm font-medium text-white/85">Lieber direkt einen Termin ausmachen?</p>
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => openWhatsApp(`${WHATSAPP_BASE}?text=${encodeURIComponent(whatsappText)}`, trackingSource)}
        className="min-h-[56px] rounded-xl bg-success hover:bg-success text-white font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp
      </button>
      <button
        type="button"
        onClick={() => callPhone(PHONE_RAW, trackingSource)}
        className="min-h-[56px] rounded-xl border-2 border-white/40 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
      >
        <Phone className="w-5 h-5" aria-hidden="true" /> Anrufen
      </button>
    </div>
  </>
);

const TextLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="block mx-auto min-h-[44px] px-2 text-sm font-medium text-white underline underline-offset-2 hover:text-white/80"
  >
    {children}
  </button>
);

/* ---------- Rahmen ---------- */

const Shell = React.forwardRef<
  HTMLDivElement,
  { id: string; title: string; flow: string[]; onsiteNote?: string; formVariant: SubmitVariant; children: React.ReactNode }
>(({ id, title, flow, onsiteNote, formVariant, children }, ref) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const setRefs = (el: HTMLDivElement | null) => {
    innerRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  useEffect(() => {
    const el = innerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          phCapture('lead_form_viewed', { form_variant: formVariant });
          o.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    o.observe(el);
    return () => o.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id={id}
      ref={setRefs}
      className="bg-brand-dark rounded-2xl p-5 sm:p-7 shadow-[0_0_40px_rgba(26,156,255,0.25)] ring-1 ring-brand/30 scroll-mt-24 min-w-0"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      <ol className="mt-4 grid grid-cols-3 gap-2" aria-label="Ablauf">
        {flow.map((step, i) => {
          const active = i === 0;
          return (
            <li
              key={step}
              className={`flex flex-col items-center text-center gap-1.5 ${active ? '' : 'opacity-55'}`}
              aria-current={active ? 'step' : undefined}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  active ? 'bg-brand text-white ring-4 ring-brand/30' : 'bg-white/15 text-white'
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-xs leading-tight font-semibold ${active ? 'text-white' : 'text-white/80'}`}>
                {step}
              </span>
              {active && <span className="text-[10px] uppercase tracking-wide font-bold text-brand">Du bist hier</span>}
            </li>
          );
        })}
      </ol>
      {onsiteNote && <p className="mt-3 text-xs text-white/75 leading-relaxed">{onsiteNote}</p>}
      {children}
    </div>
  );
});
Shell.displayName = 'Shell';

/* ---------- Klassisches Formular (unverändert) ---------- */

const ClassicLeadForm: React.FC<LeadFormProps & { formVariant: SubmitVariant }> = (props) => {
  const { id = 'lead-form', title = 'Dein Anmeldetermin im Weberpark', ctaLabel, source, classOptions, licenseClass,
    onLicenseClassChange, whatsappText, trackingSource, onsiteNote, formVariant } = props;
  const navigate = useNavigate();
  const { toast } = useToast();
  const f = useLeadFields();
  const validate = useValidate();
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(f)) return;
    setBusy(true);
    try {
      const res = await postLead({
        name: f.name,
        phone: f.phone,
        ...(f.email.trim() ? { email: f.email.trim() } : {}),
        license_class: licenseClass,
        source,
        message: f.start ? `Besuchszeit: ${f.start}` : undefined,
        form_variant: formVariant,
        ...getAttribution(),
      });
      if (!res.ok) throw new Error(res.error || 'Submission failed');
      trackSubmitted(source, formVariant, false);
      navigate('/danke', { state: { lead: true } });
    } catch {
      toast({ title: 'Fehler beim Senden', description: 'Bitte versuche es nochmal oder ruf uns direkt an.', variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell id={id} title={title} flow={FLOW_CLASSIC} onsiteNote={onsiteNote} formVariant={formVariant}>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <ContactFields id={id} f={f} classOptions={classOptions} licenseClass={licenseClass}
          onLicenseClassChange={onLicenseClassChange} withStart consentText={CONSENT_DEFAULT} />
        <SubmitButton busy={busy} label={ctaLabel} />
        <p className="text-center text-xs text-white/70">
          Kostenlos und unverbindlich, keine Vorkasse. Wir rufen dich innerhalb von 24 Stunden an.
        </p>
        <DirectContact whatsappText={whatsappText} trackingSource={trackingSource} />
      </form>
    </Shell>
  );
};

/* ---------- Terminbuchung ---------- */

async function fetchBlockedDays(): Promise<string[]> {
  const timeout = new Promise<string[]>((_, rej) => setTimeout(() => rej(new Error('timeout')), 3000));
  const req = (async () => {
    const { data, error } = await supabase.rpc('get_blocked_days');
    if (error) throw error;
    return ((data as unknown[]) || []).map((r) => String(r));
  })();
  return Promise.race([req, timeout]);
}

type Step = 'pick' | 'details' | 'callback';

const BookingLeadForm: React.FC<LeadFormProps> = (props) => {
  const { id = 'lead-form', title = 'Dein Anmeldetermin im Weberpark', source, classOptions, licenseClass,
    onLicenseClassChange, whatsappText, trackingSource, onsiteNote,
    offerLine = 'Für den Herbstpreis: Termin bis Freitag, 30. Oktober wählen.', offerTag = 'Herbstpreis' } = props;
  const navigate = useNavigate();
  const { toast } = useToast();
  const f = useLeadFields();
  const validate = useValidate();
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<Step>('pick');
  const [now, setNow] = useState(() => new Date());
  const [blocked, setBlocked] = useState<string[]>([]);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Date | null>(null);
  const [invalidMsg, setInvalidMsg] = useState(false);
  const firstRender = useRef(true);

  const loadBlocked = useCallback(() => {
    fetchBlockedDays().then(setBlocked).catch(() => { /* Server prüft zusätzlich */ });
  }, []);
  useEffect(() => { loadBlocked(); }, [loadBlocked]);

  const days = useMemo(() => getAvailableSlots(now, blocked), [now, blocked]);
  const todayLocal = localDay(now);
  const tomorrowLocal = localDay(new Date(now.getTime() + 86400_000));
  const offerOpen = todayLocal <= AUTUMN_OFFER_LAST_DAY;

  // Ersten Tag vorauswählen bzw. Auswahl korrigieren, wenn der Tag wegfällt
  useEffect(() => {
    if (!days.length) { setDay(null); setSlot(null); return; }
    if (!day || !days.some((d) => d.day === day)) { setDay(days[0].day); setSlot(null); return; }
    if (slot && !days.find((d) => d.day === day)?.slots.some((s) => s.getTime() === slot.getTime())) setSlot(null);
  }, [days, day, slot]);

  // Beim Schrittwechsel Formular-Oberkante zeigen
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    shellRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (step === 'details') phCapture('booking_step2_viewed', { form_variant: 'booking' });
  }, [step]);

  const currentSlots = days.find((d) => d.day === day)?.slots ?? [];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(f)) return;
    const withAppointment = step === 'details' && slot;
    setBusy(true);
    try {
      const res = await postLead({
        name: f.name,
        phone: f.phone,
        ...(f.email.trim() ? { email: f.email.trim() } : {}),
        license_class: licenseClass,
        source,
        message: !withAppointment && f.start ? `Besuchszeit: ${f.start}` : undefined,
        form_variant: 'booking',
        ...(withAppointment ? { appointment_start: slot!.toISOString() } : {}),
        ...getAttribution(),
      });
      if (!res.ok) {
        if (res.status === 422 && res.error === 'APPOINTMENT_INVALID') {
          phCapture('booking_invalid', { form_variant: 'booking' });
          setSlot(null);
          setInvalidMsg(true);
          setNow(new Date());
          loadBlocked();
          setStep('pick');
          return;
        }
        throw new Error(res.error || 'Submission failed');
      }
      trackSubmitted(source, 'booking', !!withAppointment);
      if (withAppointment) {
        navigate('/danke', { state: { lead: true, appointment: slot!.toISOString(), page: window.location.pathname } });
      } else {
        navigate('/danke', { state: { lead: true } });
      }
    } catch {
      toast({ title: 'Fehler beim Senden', description: 'Bitte versuche es nochmal oder ruf uns direkt an.', variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  const chipBase =
    'min-h-[44px] rounded-xl border-2 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  return (
    <Shell ref={shellRef} id={id} title={title} flow={FLOW_BOOKING} onsiteNote={onsiteNote} formVariant="booking">
      {step === 'pick' && (
        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Schritt 1 von 2</p>
            <h3 className="mt-1 text-xl font-bold text-white">Wann kommst du vorbei?</h3>
            <p className="mt-1 text-sm text-white/80">Wähl einen Tag und eine Uhrzeit.</p>
            {offerOpen && offerLine && <p className="mt-2 text-sm font-semibold text-white">{offerLine}</p>}
          </div>

          {days.length === 0 ? (
            <p className="text-sm text-white/85">Gerade ist kein Termin frei. Fordere einfach einen Rückruf an.</p>
          ) : (
            <>
              <div className="-mx-1 overflow-x-auto overscroll-x-contain pb-1" role="group" aria-label="Tag wählen">
                <div className="flex gap-2 px-1 w-max">
                  {days.map((d) => {
                    const selected = d.day === day;
                    return (
                      <button
                        key={d.day}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => { setDay(d.day); setSlot(null); setInvalidMsg(false); }}
                        className={`${chipBase} shrink-0 w-[76px] py-2 flex flex-col items-center justify-center leading-tight ${
                          selected ? 'bg-brand-strong border-brand text-white' : 'bg-white/10 border-white/25 text-white hover:bg-white/20'
                        }`}
                      >
                        <span className="text-xs">{d.day === tomorrowLocal ? 'Morgen' : dayShortWeekday(d.day)}</span>
                        <span className="text-sm font-bold">{dayShortDate(d.day)}</span>
                        {d.day <= AUTUMN_OFFER_LAST_DAY && offerTag && (
                          <span className="mt-1 text-[10px] font-bold uppercase tracking-wide text-brand bg-white rounded px-1">
                            {offerTag}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {invalidMsg && (
                <p className="text-sm font-semibold text-warning" role="alert">
                  Dieser Termin ist leider nicht mehr möglich. Bitte wähl einen anderen.
                </p>
              )}

              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Uhrzeit wählen">
                {currentSlots.map((s) => {
                  const selected = slot?.getTime() === s.getTime();
                  return (
                    <button
                      key={s.toISOString()}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setSlot(s);
                        setInvalidMsg(false);
                        phCapture('booking_time_selected', { form_variant: 'booking' });
                      }}
                      className={`${chipBase} ${
                        selected ? 'bg-brand-strong border-brand text-white' : 'bg-white/10 border-white/25 text-white hover:bg-white/20'
                      }`}
                    >
                      {localTime(s)}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button
            type="button"
            disabled={!slot}
            onClick={() => setStep('details')}
            className="w-full min-h-[56px] rounded-xl bg-brand-strong hover:bg-brand-strong/90 disabled:opacity-60 disabled:cursor-not-allowed text-white text-base sm:text-lg font-bold px-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {slot ? `Weiter mit ${formatShort(slot)}` : 'Uhrzeit wählen'}
          </button>

          <TextLink
            onClick={() => {
              phCapture('booking_callback_chosen', { form_variant: 'booking' });
              setStep('callback');
            }}
          >
            Noch unsicher, wann es passt? Lieber Rückruf anfordern
          </TextLink>

          <DirectContact whatsappText={whatsappText} trackingSource={trackingSource} />
        </div>
      )}

      {step !== 'pick' && (
        <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Schritt 2 von 2</p>
            <h3 className="mt-1 text-xl font-bold text-white">Wie erreichen wir dich?</h3>
            {step === 'callback' && (
              <p className="mt-1 text-sm text-white/80">
                Wir rufen dich innerhalb von 24 Stunden an und machen den Termin mit dir aus.
              </p>
            )}
          </div>

          {step === 'details' && slot && (
            <div className="rounded-xl bg-white/10 border border-white/20 p-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-white">Dein Termin: {formatLong(slot)}</p>
                <p className="mt-1 text-sm text-white/80">{ADDRESS_SHORT}</p>
              </div>
              <button
                type="button"
                onClick={() => setStep('pick')}
                className="shrink-0 min-h-[44px] px-2 text-sm font-semibold text-white underline underline-offset-2"
              >
                Ändern
              </button>
            </div>
          )}

          <ContactFields
            id={id}
            f={f}
            classOptions={classOptions}
            licenseClass={licenseClass}
            onLicenseClassChange={onLicenseClassChange}
            withStart={step === 'callback'}
            consentText={step === 'details' ? CONSENT_BOOKING : CONSENT_DEFAULT}
          />

          <SubmitButton busy={busy} label={step === 'details' ? 'Termin buchen' : 'Rückruf anfordern'} />
          <p className="text-center text-xs text-white/70">
            {step === 'details'
              ? 'Kostenlos und unverbindlich. Verschieben oder absagen geht jederzeit per WhatsApp.'
              : 'Kostenlos und unverbindlich, keine Vorkasse.'}
          </p>

          <TextLink onClick={() => setStep('pick')}>
            {step === 'details' ? 'Zurück' : 'Doch lieber selbst einen Termin wählen'}
          </TextLink>

          <DirectContact whatsappText={whatsappText} trackingSource={trackingSource} />
        </form>
      )}
    </Shell>
  );
};

/* ---------- Fehlerschutz ---------- */

class BookingBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err: unknown) { console.error('Terminwahl-Fehler, zeige klassisches Formular:', err); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const LeadForm: React.FC<LeadFormProps> = ({ variant = 'classic', ...props }) => {
  if (variant === 'booking') {
    return (
      <BookingBoundary fallback={<ClassicLeadForm {...props} formVariant="booking_fallback" />}>
        <BookingLeadForm {...props} />
      </BookingBoundary>
    );
  }
  return <ClassicLeadForm {...props} formVariant="classic" />;
};

export default LeadForm;
