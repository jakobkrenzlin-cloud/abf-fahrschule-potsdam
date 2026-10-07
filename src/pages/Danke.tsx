import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, Phone, Mail, MapPin, MessageCircle, Navigation, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { fireConversion, CONVERSION_LABELS, callPhone, openWhatsApp } from '@/lib/tracking';
import AppointmentThanks from '@/components/AppointmentThanks';
import { MAPS_URL, OFFER_END, PHONE_RAW, WHATSAPP_BASE } from '@/components/lp/constants';

const WHATSAPP_TEXT =
  'Hallo, ich habe gerade das Formular auf eurer Website ausgefüllt und möchte meinen Anmeldetermin ausmachen. Ich kann am ';

const Danke = () => {
  const location = useLocation();
  const offerActive = Date.now() <= OFFER_END.getTime();
  const [appointment] = useState<Date | null>(() => {
    const st = location.state as { lead?: boolean; appointment?: string } | null;
    if (st?.lead !== true || typeof st.appointment !== 'string') return null;
    const d = new Date(st.appointment);
    return isNaN(d.getTime()) ? null : d;
  });

  useEffect(() => {
    const state = location.state as { lead?: boolean } | null;
    if (state?.lead === true) {
      fireConversion(CONVERSION_LABELS.LEAD);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  if (appointment) return <AppointmentThanks appointment={appointment} />;

  const steps = [
    { title: 'Terminanfrage geschickt', state: 'done' as const },
    {
      title: 'Wir rufen dich innerhalb von 24 Stunden an',
      text: 'Von 0162 2191290 oder 0331 96795854. Geh bitte ran, auch wenn du die Nummer nicht kennst.',
      state: 'current' as const,
    },
    {
      title: 'Du kommst zum Anmeldetermin',
      text: 'Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg. Montag bis Freitag, 12 bis 18 Uhr. Dort meldest du dich an.',
      state: 'open' as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Helmet>
        <title>Danke für deine Terminanfrage | ABF Fahrschule Potsdam</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />

      <main className="flex-grow px-4 py-10 md:py-16">
        <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-xl p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-bold text-brand-dark leading-tight">
            Fast geschafft: Deine Terminanfrage ist bei uns
          </h1>
          <p className="mt-3 text-lg text-ink/75">
            Angemeldet bist du damit noch nicht. Das machen wir zusammen bei uns im Weberpark.
          </p>

          <ol className="mt-8">
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
                {i < steps.length - 1 && (
                  <span className="absolute left-[17px] top-10 bottom-0 w-0.5 bg-black/10" aria-hidden="true" />
                )}
                <span
                  className={`relative z-10 w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold ${
                    s.state === 'done'
                      ? 'bg-success text-white'
                      : s.state === 'current'
                        ? 'bg-brand-strong text-white ring-4 ring-brand/25'
                        : 'bg-black/5 text-ink/50'
                  }`}
                  aria-hidden="true"
                >
                  {s.state === 'done' ? <Check className="w-5 h-5" /> : i + 1}
                </span>
                <div className={s.state === 'open' ? 'opacity-70' : ''}>
                  <p className={`font-bold ${s.state === 'current' ? 'text-brand-dark text-lg' : 'text-brand-dark'}`}>
                    {s.title}
                  </p>
                  {s.text && <p className="mt-1 text-sm text-ink/75 leading-relaxed">{s.text}</p>}
                </div>
              </li>
            ))}
          </ol>

          {offerActive && (
            <div className="mt-8 rounded-xl bg-warning/10 border border-warning/40 p-4 flex gap-3" role="note">
              <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-ink leading-relaxed">
                <strong>Wichtig:</strong> Der Herbstpreis gilt nur bei Anmeldung vor Ort bis 31. Oktober. Plan deinen
                Termin also rechtzeitig vor dem 31. Oktober ein.
              </p>
            </div>
          )}

          <div className="mt-6 rounded-xl bg-success/10 border border-success/30 p-5">
            <h2 className="text-lg font-bold text-brand-dark">Schneller per WhatsApp</h2>
            <p className="mt-1 text-sm text-ink/80">
              Schreib uns, wann du vorbeikommen kannst. Dann steht dein Termin noch schneller.
            </p>
            <button
              type="button"
              onClick={() =>
                openWhatsApp(`${WHATSAPP_BASE}?text=${encodeURIComponent(WHATSAPP_TEXT)}`, 'danke-page')
              }
              className="mt-4 w-full min-h-[52px] rounded-xl bg-success text-white font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Termin per WhatsApp ausmachen
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[52px] rounded-xl border-2 border-brand text-brand-dark font-semibold flex items-center justify-center gap-2 text-sm sm:text-base text-center px-2"
            >
              <Navigation className="w-5 h-5 shrink-0" aria-hidden="true" />
              Route in Google Maps
            </a>
            <a
              href="tel:+491622191290"
              onClick={(e) => {
                e.preventDefault();
                callPhone(PHONE_RAW, 'danke-page');
              }}
              className="min-h-[52px] rounded-xl bg-brand-strong text-white font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Anrufen
            </a>
          </div>

          <div className="mt-8 border-t pt-6 text-sm text-ink/70">
            <h3 className="font-semibold text-brand-dark mb-3">Du hast dringliche Fragen?</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                Festnetz:{' '}
                <a href="tel:+4933196795854" className="hover:text-primary">+49 331 96795854</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                Mobil:{' '}
                <a href="tel:+491622191290" className="hover:text-primary">+49 162 2191290</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <a href="mailto:potsdam@fahrschuleabf.de" className="hover:text-primary break-all">
                  potsdam@fahrschuleabf.de
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                Tuchmacherstraße 45b, 14482 Potsdam
              </p>
            </div>
          </div>

          <p className="mt-8 text-center">
            <Link to="/" className="text-sm text-brand-dark underline underline-offset-2">
              Zurück zur Startseite
            </Link>
          </p>
        </div>
      </main>

      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default Danke;
