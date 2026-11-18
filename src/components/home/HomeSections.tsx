import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bike,
  Car,
  ChevronDown,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Scale,
  Truck,
  Zap,
} from 'lucide-react';
import Reveal from '@/components/lp/Reveal';
import { ADDRESS_LINE, MAPS_URL, PHONE_DISPLAY, PHONE_RAW, WHATSAPP_BASE } from '@/components/lp/constants';
import { callPhone, openWhatsApp } from '@/lib/tracking';
import { PRICES_A, PRICES_B, type ClassPrices } from '@/data/prices';
import { REFORM_FACTS, REFORM_STAND } from '@/config/reform';
import BeratungForm from '@/components/anmeldung/BeratungForm';
import {
  CLASS_CARDS,
  HOME_CLASS_OPTIONS,
  HOME_FORM_ID,
  HOME_LP_VERSION,
  HOME_SOURCE,
  HOME_TRACKING_SOURCE,
  HOME_WHATSAPP_TEXT,
  PKW_FAHRSTUNDE,
  PKW_GRUNDBETRAG,
  PKW_PRAXISPRUEFUNG,
  PKW_SONDERFAHRT,
} from './homeContent';

const OFFICE_PHONE_DISPLAY = '+49 331 96795854';
const OFFICE_PHONE_RAW = '+4933196795854';
const EMAIL = 'potsdam@fahrschuleabf.de';

const scrollToForm = () =>
  document.getElementById(HOME_FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const whatsappHref = `${WHATSAPP_BASE}?text=${encodeURIComponent(HOME_WHATSAPP_TEXT)}`;

const SectionHead: React.FC<{ id: string; eyebrow: string; title: string; intro?: string; dark?: boolean }> = ({
  id,
  eyebrow,
  title,
  intro,
  dark,
}) => (
  <Reveal>
    <div className="max-w-2xl">
      <p className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-brand' : 'text-brand-strong'}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-2 text-h2 font-extrabold leading-tight md:text-h2-lg ${dark ? 'text-white' : 'text-brand-dark'}`}>
        {title}
      </h2>
      {intro && <p className={`mt-3 text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-ink/75'}`}>{intro}</p>}
    </div>
  </Reveal>
);

/* ---------- Führerscheinklassen ---------- */

const CLASS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  b: Car,
  a: Bike,
  b196: Zap,
  be: Truck,
};

export const ClassChooser: React.FC = () => (
  <section id="fuehrerscheine" className="section-y scroll-mt-20 bg-white" aria-labelledby="klassen-heading">
    <div className="container-page">
      <SectionHead id="klassen-heading" eyebrow="Führerscheine" title="Welchen Führerschein möchtest du machen?" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CLASS_CARDS.map((c, i) => {
          const Icon = CLASS_ICONS[c.key] ?? Car;
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                  <Icon className="h-6 w-6 text-brand-strong" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-ink/50">{c.kicker}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug text-brand-dark">{c.title}</h3>
              <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-ink/75">{c.text}</p>
              {c.price && (
                <p className="mt-4 rounded-lg bg-surface px-3 py-2 text-sm font-semibold text-brand-dark">{c.price}</p>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-strong">
                {c.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </>
          );
          const cls =
            'group flex h-full w-full flex-col rounded-2xl border border-black/[0.07] bg-white p-5 text-left shadow-card transition-shadow hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand';
          return (
            <Reveal key={c.key} delay={i * 60}>
              {c.to ? (
                <Link to={c.to} className={cls}>
                  {inner}
                </Link>
              ) : (
                <button type="button" onClick={scrollToForm} className={cls}>
                  {inner}
                </button>
              )}
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------- Preise ---------- */

const PriceTable: React.FC<{ prices: ClassPrices; defaultOpen?: boolean }> = ({ prices, defaultOpen }) => (
  <details className="group border-b border-black/[0.07]" open={defaultOpen}>
    <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
      <span className="min-w-0">{prices.name}</span>
      <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div className="pb-4">
      <table className="w-full table-fixed border-collapse text-left text-[15px]">
        <thead className="sr-only">
          <tr>
            <th scope="col">Leistung</th>
            <th scope="col">Preis</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 border-t border-black/5">
          <tr>
            <th scope="row" className="w-[60%] py-3 pr-3 align-top font-normal leading-relaxed text-ink">
              {prices.baseLabel}
            </th>
            <td className="py-3 text-right align-top font-bold text-brand-dark">{prices.basePrice}</td>
          </tr>
          {prices.items.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="w-[60%] py-3 pr-3 align-top font-normal leading-relaxed text-ink">
                {row.label}
              </th>
              <td className="break-words py-3 text-right align-top font-bold text-brand-dark">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </details>
);

export const PreiseSection: React.FC = () => (
  <section id="preise" className="section-y scroll-mt-20 bg-surface" aria-labelledby="preise-heading">
    <div className="container-page">
      <SectionHead
        id="preise-heading"
        eyebrow="Preise"
        title="Was dein Führerschein kostet"
        intro="Das fragt sich jeder zuerst. Bei uns stehen alle Entgelte offen auf der Seite, hier am Beispiel Klasse B."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { label: 'Fest', tone: 'text-success', title: 'Grundbetrag', value: PKW_GRUNDBETRAG, note: 'Im Winter-Angebot, inklusive Theorie und Erste-Hilfe-Kurs' },
          { label: 'Vorgeschrieben', tone: 'text-brand-strong', title: '12 Sonderfahrten', value: `je ${PKW_SONDERFAHRT}`, note: 'Überland, Autobahn, Dunkelheit, bei jeder Fahrschule Pflicht' },
          { label: 'Hängt von dir ab', tone: 'text-warning', title: 'Übungsstunden', value: `je ${PKW_FAHRSTUNDE}`, note: 'Wie viele du brauchst, schätzen wir im Gespräch ehrlich ab' },
        ].map((t, i) => (
          <Reveal key={t.title} delay={i * 60}>
            <div className="h-full rounded-2xl border border-black/[0.06] bg-white p-5">
              <p className={`text-xs font-bold uppercase tracking-wider ${t.tone}`}>{t.label}</p>
              <p className="mt-1 font-semibold text-brand-dark">{t.title}</p>
              <p className="mt-1 text-3xl font-extrabold text-brand-dark">{t.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{t.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-ink/75">
        Außerdem kommen die Vorstellung zur praktischen Prüfung ({PKW_PRAXISPRUEFUNG}), die Lern-App und die amtlichen
        Gebühren hinzu (TÜV/DEKRA, Führerscheinstelle, Sehtest, Passfoto). Die amtlichen Gebühren zahlst du nicht an uns.
      </p>

      <div className="mt-6 rounded-2xl border border-black/[0.07] bg-white px-5">
        <p className="pt-5 text-sm font-semibold uppercase tracking-wider text-ink/50">Alle Entgelte nach § 32 Fahrlehrergesetz</p>
        <PriceTable prices={PRICES_B} />
        <PriceTable prices={PRICES_A} />
        <div className="h-2" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={scrollToForm}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand-strong px-6 font-bold text-white transition-colors hover:bg-brand-strong/90"
        >
          Gesamtpreis ausrechnen lassen
        </button>
        <Link
          to="/preise"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-brand-dark/15 bg-white px-6 font-semibold text-brand-dark transition-colors hover:bg-surface"
        >
          Zur Preisseite <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

/* ---------- Reform ---------- */

export const ReformBand: React.FC = () => (
  <section className="bg-brand-dark py-10 md:py-14" aria-labelledby="reform-band-heading">
    <div className="container-page">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Führerscheinreform · Stand {REFORM_STAND}</p>
            <h2 id="reform-band-heading" className="mt-2 text-2xl font-extrabold leading-tight text-white md:text-3xl">
              Lohnt es sich, auf die Reform zu warten?
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75">{REFORM_FACTS.heute.text}</p>
          </div>
          <Link
            to="/reform"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-brand-dark transition-colors hover:bg-surface"
          >
            <Scale className="h-5 w-5" aria-hidden="true" /> Alles zur Reform
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------- Weberpark, Team und Räume ---------- */

const PHOTOS = [
  {
    src: '/images/abf-buero.jpg',
    alt: 'Büro der ABF Fahrschule im Weberpark mit Beratungsplätzen',
    caption: 'Beratung und Anmeldung im Büro',
  },
  {
    src: '/images/abf-theorieraum.jpg',
    alt: 'Theorieraum der ABF Fahrschule im Weberpark',
    caption: 'Unser Theorieraum',
  },
];

export const WeberparkSection: React.FC = () => (
  <section className="section-y bg-white" aria-labelledby="weberpark-heading">
    <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
      <div>
        <SectionHead
          id="weberpark-heading"
          eyebrow="Über uns"
          title="Bei uns im Weberpark"
          intro="Die ABF Fahrschule sitzt im Weberpark in Babelsberg. Die Theorie lernst du bei uns im eigenen Unterrichtsraum, Anmeldung und alle Fragen klären wir persönlich im Büro."
        />
        <Reveal>
          <ul className="mt-6 space-y-3">
            {[
              'Seit über 15 Jahren bilden wir in Potsdam aus.',
              'Parkplätze vor der Tür. Bahnhof Babelsberg, Tram und Bus sind in wenigen Minuten zu Fuß erreichbar.',
              'Fahrstunden planen wir gemeinsam mit dir, auch neben Schule, Ausbildung oder Job.',
            ].map((t) => (
              <li key={t} className="border-l-2 border-brand pl-4 text-[15px] leading-relaxed text-ink">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PHOTOS.map((p) => (
          <figure key={p.src} className="overflow-hidden rounded-2xl border border-black/[0.06] bg-surface">
            <img
              src={p.src}
              alt={p.alt}
              width={720}
              height={540}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="px-3 py-2.5 text-sm font-medium text-brand-dark">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Kontakt ---------- */

export const HomeKontaktSection: React.FC = () => (
  <section className="section-y bg-surface" aria-labelledby="kontakt-home-heading">
    <div className="container-page">
      <SectionHead
        id="kontakt-home-heading"
        eyebrow="Kontakt"
        title="Lass uns über deinen Führerschein sprechen"
        intro="Ruf an, schreib uns auf WhatsApp oder lass dich zurückrufen. Was am besten zu dir passt."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <BeratungForm
          formId={HOME_FORM_ID}
          source={HOME_SOURCE}
          lpVersion={HOME_LP_VERSION}
          trackingSource={HOME_TRACKING_SOURCE}
          whatsappText={HOME_WHATSAPP_TEXT}
          classOptions={HOME_CLASS_OPTIONS}
          title="Rückruf anfordern"
        />

        <div className="space-y-4">
          <div className="rounded-2xl border border-black/[0.07] bg-white p-6">
            <h3 className="text-lg font-bold text-brand-dark">So erreichst du uns</h3>
            <ul className="mt-4 space-y-4 text-[15px] text-ink">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-ink/60">Büro</span>
                  <button
                    type="button"
                    onClick={() => callPhone(OFFICE_PHONE_RAW, HOME_TRACKING_SOURCE)}
                    className="font-semibold text-brand-strong hover:underline"
                  >
                    {OFFICE_PHONE_DISPLAY}
                  </button>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-ink/60">Mobil und WhatsApp</span>
                  <button
                    type="button"
                    onClick={() => callPhone(PHONE_RAW, HOME_TRACKING_SOURCE)}
                    className="font-semibold text-brand-strong hover:underline"
                  >
                    {PHONE_DISPLAY}
                  </button>
                  <button
                    type="button"
                    onClick={() => openWhatsApp(whatsappHref, HOME_TRACKING_SOURCE)}
                    className="ml-3 inline-flex items-center gap-1 text-sm font-semibold text-success hover:underline"
                  >
                    WhatsApp öffnen <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-ink/60">E-Mail</span>
                  <a href={`mailto:${EMAIL}`} className="break-all font-semibold text-brand-strong hover:underline">
                    {EMAIL}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" aria-hidden="true" />
                <span>{ADDRESS_LINE}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" aria-hidden="true" />
                <span>
                  Büro Montag bis Freitag, 12 bis 18 Uhr.
                  <span className="block text-sm text-ink/60">Fahrstunden auch außerhalb nach Absprache.</span>
                </span>
              </li>
            </ul>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Navigation className="h-5 w-5" aria-hidden="true" /> Route planen
            </a>
          </div>
          <p className="px-1 text-sm leading-relaxed text-ink/60">
            Du suchst einen Job als Fahrlehrer oder im Büro?{' '}
            <Link to="/karriere" className="font-semibold text-brand-strong underline underline-offset-2">
              Zu den offenen Stellen
            </Link>
          </p>
        </div>
      </div>
    </div>
  </section>
);
