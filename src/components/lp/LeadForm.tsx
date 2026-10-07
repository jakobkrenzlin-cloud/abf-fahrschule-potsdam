import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { getAttribution, callPhone, openWhatsApp } from '@/lib/tracking';
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

const FLOW_STEPS = ['Termin anfragen', 'Rückruf in 24 h', 'Anmeldung vor Ort'];

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
}

const LeadForm: React.FC<LeadFormProps> = ({
  id = 'lead-form',
  title = 'Dein Anmeldetermin im Weberpark',
  ctaLabel,
  source,
  classOptions,
  licenseClass,
  onLicenseClassChange,
  whatsappText,
  trackingSource,
  onsiteNote,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [honeyPot, setHoneyPot] = useState('');
  const [start, setStart] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse({ name, phone, email, honeyPot });
    if (!result.success) {
      const fieldErrors: { name?: string; phone?: string; email?: string } = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as 'name' | 'phone' | 'email';
        if (key === 'name' || key === 'phone' || key === 'email') fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    if (!consent) {
      toast({
        title: 'Bitte zustimmen',
        description: 'Bitte stimme kurz der Datenschutzerklärung zu.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        'https://jxxhrldcmwjnjqfpfeti.supabase.co/functions/v1/submit-lead',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            ...(email.trim() ? { email: email.trim() } : {}),
            license_class: licenseClass,
            source,
            message: start ? `Besuchszeit: ${start}` : undefined,
            ...getAttribution(),
          }),

        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Submission failed');
      }
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'lead_submitted', form_type: source });
      navigate('/danke', { state: { lead: true } });
    } catch {
      toast({
        title: 'Fehler beim Senden',
        description: 'Bitte versuche es nochmal oder ruf uns direkt an.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full h-14 rounded-xl bg-white/95 text-ink px-4 text-base border-2 border-transparent focus:border-brand focus:outline-none placeholder:text-ink/60';

  return (
    <div
      id={id}
      className="bg-brand-dark rounded-2xl p-5 sm:p-7 shadow-[0_0_40px_rgba(26,156,255,0.25)] ring-1 ring-brand/30 scroll-mt-24"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>

      <ol className="mt-4 grid grid-cols-3 gap-2" aria-label="Ablauf">
        {FLOW_STEPS.map((step, i) => {
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
              {active && (
                <span className="text-[10px] uppercase tracking-wide font-bold text-brand">Du bist hier</span>
              )}
            </li>
          );
        })}
      </ol>
      {onsiteNote && <p className="mt-3 text-xs text-white/75 leading-relaxed">{onsiteNote}</p>}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <div>
          <label htmlFor={`${id}-name`} className="block text-sm font-medium text-white mb-1.5">
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Dein Name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
          />
          {errors.name && (
            <p id={`${id}-name-error`} className="mt-1 text-sm text-warning">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className="block text-sm font-medium text-white mb-1.5">
            Telefonnummer
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="z. B. 0162 2191290"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
          />
          {errors.phone && (
            <p id={`${id}-phone-error`} className="mt-1 text-sm text-warning">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className="block text-sm font-medium text-white mb-1.5">
            E-Mail <span className="text-white/60">(optional)</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="deine@email.de"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
          />
          {errors.email && (
            <p id={`${id}-email-error`} className="mt-1 text-sm text-warning">
              {errors.email}
            </p>
          )}
        </div>



        <div>
          <label htmlFor={`${id}-class`} className="block text-sm font-medium text-white mb-1.5">
            Führerscheinklasse
          </label>
          <select
            id={`${id}-class`}
            name="license_class"
            value={licenseClass}
            onChange={(e) => onLicenseClassChange(e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            {classOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-white mb-2">
            Wann kannst du am besten vorbeikommen? <span className="text-white/60">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {START_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setStart(start === opt ? '' : opt)}
                aria-pressed={start === opt}
                className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                  start === opt
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

        <div className="flex items-start gap-2.5">
          <input
            id={`${id}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-5 h-5 rounded accent-brand"
          />
          <label htmlFor={`${id}-consent`} className="text-xs text-white/80 leading-relaxed">
            Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden.{' '}
            <a href="/datenschutz" className="underline hover:text-white">
              Datenschutzerklärung
            </a>
          </label>
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
          disabled={isSubmitting}
          className="w-full min-h-[56px] rounded-xl bg-brand-strong hover:bg-brand-strong/90 disabled:opacity-70 text-white text-lg font-bold transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Wird gesendet…
            </>
          ) : (
            ctaLabel
          )}
        </button>
        <p className="text-center text-xs text-white/70">
          Kostenlos und unverbindlich, keine Vorkasse. Wir rufen dich innerhalb von 24 Stunden an.
        </p>

        <p className="pt-1 text-center text-sm font-medium text-white/85">Lieber direkt einen Termin ausmachen?</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              openWhatsApp(`${WHATSAPP_BASE}?text=${encodeURIComponent(whatsappText)}`, trackingSource)
            }
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
      </form>
    </div>
  );
};

export default LeadForm;
