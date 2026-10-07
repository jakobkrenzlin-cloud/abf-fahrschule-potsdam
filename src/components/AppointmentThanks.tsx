import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, Phone, Mail, MapPin, MessageCircle, Navigation, CalendarPlus, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { openWhatsApp } from '@/lib/tracking';
import { AUTUMN_OFFER_LAST_DAY } from '@/config/booking';
import { formatLong, formatLongDate, localDay, localTime } from '@/lib/appointmentFormat';
import { MAPS_URL, WHATSAPP_BASE } from '@/components/lp/constants';

const EVENT_TITLE = 'Anmeldetermin ABF Fahrschule';
const EVENT_LOCATION = 'Weberpark, Tuchmacherstraße 45b, 14482 Potsdam';
const DURATION_MS = 30 * 60_000;

const utcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function googleCalendarUrl(start: Date) {
  const end = new Date(start.getTime() + DURATION_MS);
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT_TITLE,
    dates: `${utcStamp(start)}/${utcStamp(end)}`,
    location: EVENT_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function downloadIcs(start: Date) {
  const end = new Date(start.getTime() + DURATION_MS);
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ABF Fahrschule//Termin//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${utcStamp(start)}-${Math.random().toString(36).slice(2)}@abf-fahrschule.de`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(start)}`,
    `DTEND:${utcStamp(end)}`,
    `SUMMARY:${esc(EVENT_TITLE)}`,
    `LOCATION:${esc(EVENT_LOCATION)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'anmeldetermin-abf-fahrschule.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const AppointmentThanks = ({ appointment }: { appointment: Date }) => {
  const [calOpen, setCalOpen] = useState(false);
  const beforeOfferEnd = localDay(appointment) <= AUTUMN_OFFER_LAST_DAY;
  const rescheduleText = `Hallo, ich habe für ${formatLongDate(appointment)} um ${localTime(appointment)} Uhr einen Anmeldetermin gebucht und möchte ihn verschieben.`;

  const steps = [
    { title: 'Termin gebucht', state: 'done' as const },
    {
      title: 'Wir bestätigen dir den Termin per WhatsApp',
      text: 'An die Nummer, die du angegeben hast. Absender ist 0162 2191290.',
      state: 'current' as const,
    },
    {
      title: 'Du kommst vorbei und meldest dich an',
      text: 'Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg. Parkplätze direkt vor der Tür.',
      state: 'open' as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Helmet>
        <title>Termin gebucht | ABF Fahrschule Potsdam</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />

      <main className="flex-grow px-4 py-10 md:py-16">
        <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-xl p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-bold text-brand-dark leading-tight">
            Dein Termin steht: {formatLong(appointment)}
          </h1>
          <p className="mt-3 text-lg text-ink/75">
            Angemeldet bist du damit noch nicht. Das machst du bei diesem Termin bei uns im Weberpark.
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
                  <p className={`font-bold text-brand-dark ${s.state === 'current' ? 'text-lg' : ''}`}>{s.title}</p>
                  {s.text && <p className="mt-1 text-sm text-ink/75 leading-relaxed">{s.text}</p>}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <button
                type="button"
                onClick={() => setCalOpen((v) => !v)}
                aria-expanded={calOpen}
                className="w-full min-h-[52px] rounded-xl bg-brand-strong text-white font-semibold flex items-center justify-center gap-2 px-3"
              >
                <CalendarPlus className="w-5 h-5 shrink-0" aria-hidden="true" />
                In meinen Kalender eintragen
              </button>
              {calOpen && (
                <div className="mt-2 grid gap-2">
                  <a
                    href={googleCalendarUrl(appointment)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] rounded-xl border-2 border-brand/40 text-brand-dark font-semibold flex items-center justify-center"
                  >
                    Google Kalender
                  </a>
                  <button
                    type="button"
                    onClick={() => downloadIcs(appointment)}
                    className="min-h-[44px] rounded-xl border-2 border-brand/40 text-brand-dark font-semibold flex items-center justify-center"
                  >
                    Apple / Outlook (.ics)
                  </button>
                </div>
              )}
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[52px] rounded-xl border-2 border-brand text-brand-dark font-semibold flex items-center justify-center gap-2 px-3 self-start"
            >
              <Navigation className="w-5 h-5 shrink-0" aria-hidden="true" />
              Route in Google Maps
            </a>
          </div>

          {beforeOfferEnd && (
            <div className="mt-6 rounded-xl bg-brand/10 border border-brand/30 p-4 flex gap-3" role="note">
              <Info className="w-5 h-5 text-brand-strong shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-ink leading-relaxed">
                Dein Termin liegt vor dem 31. Oktober. Meldest du dich dabei an, gilt für dich das Herbst-Angebot.
              </p>
            </div>
          )}

          <div className="mt-6 rounded-xl bg-success/10 border border-success/30 p-5">
            <h2 className="text-lg font-bold text-brand-dark">Doch keine Zeit?</h2>
            <p className="mt-1 text-sm text-ink/80">Schreib uns kurz per WhatsApp, dann verschieben wir den Termin.</p>
            <button
              type="button"
              onClick={() => openWhatsApp(`${WHATSAPP_BASE}?text=${encodeURIComponent(rescheduleText)}`, 'danke-termin')}
              className="mt-4 w-full min-h-[52px] rounded-xl bg-success text-white font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Termin verschieben
            </button>
          </div>

          <div className="mt-8 border-t pt-6 text-sm text-ink/70">
            <h3 className="font-semibold text-brand-dark mb-3">Du hast dringliche Fragen?</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                Festnetz: <a href="tel:+4933196795854" className="hover:text-primary">+49 331 96795854</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                Mobil: <a href="tel:+491622191290" className="hover:text-primary">+49 162 2191290</a>
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

export default AppointmentThanks;
