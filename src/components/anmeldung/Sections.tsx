import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  PhoneCall,
  Scale,
} from 'lucide-react';
import Reveal from '@/components/lp/Reveal';
import { Stars } from '@/components/lp/SocialProof';
import {
  ADDRESS_LINE,
  GOOGLE_REVIEWS_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_RAW,
  RATING_VALUE,
  REVIEW_COUNT,
  WHATSAPP_BASE,
} from '@/components/lp/constants';
import { callPhone, openWhatsApp } from '@/lib/tracking';
import { OFFER, OFFER_COPY, PKW_SAVINGS_NOTE } from '@/config/offer';
import { PRICES_B, priceOf } from '@/data/prices';
import { REFORM_FACTS, REFORM_STAND } from '@/config/reform';
import flyerAsset from '@/assets/pkw-winter-angebot.jpg.asset.json';
import {
  B197_VORTEIL,
  FORM_ID,
  GRUNDBETRAG,
  GRUNDBETRAG_VORHER,
  GUELTIG_BIS,
  HERO_ID,
  REVIEWS,
  scrollToForm,
  SCHALTSTUNDEN_VORHER,
  SONDERFAHRTEN,
  SONDERFAHRTEN_ANZAHL,
  STEPS,
  TRACKING_SOURCE,
  WHATSAPP_TEXT,
} from './content';

const flyerUrl = import.meta.env.DEV ? `https://abf-fahrschule.de${flyerAsset.url}` : flyerAsset.url;

const euroToNumber = (s: string) => Number.parseFloat(s.replace(/[^\d,]/g, '').replace(',', '.'));
const formatEuro = (n: number) =>
  `${n.toLocaleString('de-DE', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })} €`;

const PREIS_FAHRSTUNDE = priceOf(PRICES_B, 'Übungsstunde');
const PREIS_SONDERFAHRT = priceOf(PRICES_B, 'Besondere Ausbildungsfahrt Überland');
const PREIS_PRAXISPRUEFUNG = priceOf(PRICES_B, 'Vorstellung zur praktischen Prüfung');
const SONDERFAHRTEN_SUMME = formatEuro(SONDERFAHRTEN_ANZAHL * euroToNumber(PREIS_SONDERFAHRT));

const whatsappHref = `${WHATSAPP_BASE}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

const SectionHead: React.FC<{ eyebrow?: string; title: string; intro?: React.ReactNode; id?: string; dark?: boolean }> = ({
  eyebrow,
  title,
  intro,
  id,
  dark,
}) => (
  <Reveal>
    <div className="max-w-2xl">
      {eyebrow && (
        <p className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-brand' : 'text-brand-strong'}`}>{eyebrow}</p>
      )}
      <h2
        id={id}
        className={`mt-2 text-h2 font-extrabold leading-tight md:text-h2-lg ${dark ? 'text-white' : 'text-brand-dark'}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-3 text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-ink/75'}`}>{intro}</p>}
    </div>
  </Reveal>
);

/* ---------- Kosten ---------- */

export const KostenSection: React.FC = () => (
  <section id="kosten" className="section-y scroll-mt-20 bg-white" aria-labelledby="kosten-heading">
    <div className="container-page">
      <SectionHead
        id="kosten-heading"
        eyebrow="Preise"
        title="Was dein Führerschein kostet"
        intro="Das fragt sich jeder zuerst. Hier steht offen, was fest ist, was der Gesetzgeber vorschreibt und was von dir abhängt."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Reveal>
          <article className="flex h-full flex-col rounded-2xl border border-black/[0.07] bg-surface p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-success">Fest</p>
            <h3 className="mt-1 text-h3 text-brand-dark">Dein Grundbetrag</h3>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-extrabold text-brand-dark">{GRUNDBETRAG}</span>
              <span className="text-ink/55">
                statt <s>{GRUNDBETRAG_VORHER}</s>
              </span>
            </p>
            <ul className="mt-4 space-y-2">
              {OFFER_COPY.pkwIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] leading-snug text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  {item === 'Erste-Hilfe-Kurs' ? 'Erste-Hilfe-Kurs (im Winter-Angebot)' : item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Fällst du durch die Theorieprüfung, zahlst du keinen zweiten Grundbetrag.
            </p>
          </article>
        </Reveal>

        <Reveal delay={80}>
          <article className="flex h-full flex-col rounded-2xl border border-black/[0.07] bg-surface p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-strong">Vorgeschrieben</p>
            <h3 className="mt-1 text-h3 text-brand-dark">{SONDERFAHRTEN_ANZAHL} Sonderfahrten</h3>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-extrabold text-brand-dark">{PREIS_SONDERFAHRT}</span>
              <span className="text-ink/55">je 45 Min.</span>
            </p>
            <ul className="mt-4 space-y-2">
              {SONDERFAHRTEN.map((f) => (
                <li key={f.label} className="flex items-center justify-between gap-3 text-[15px] text-ink">
                  <span>{f.label}</span>
                  <span className="font-semibold text-brand-dark">{f.count} ×</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Zusammen {SONDERFAHRTEN_SUMME}. Diese Fahrten schreibt der Gesetzgeber für Klasse B vor, bei jeder Fahrschule.
            </p>
          </article>
        </Reveal>

        <Reveal delay={160}>
          <article className="flex h-full flex-col rounded-2xl border border-black/[0.07] bg-surface p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-warning">Hängt von dir ab</p>
            <h3 className="mt-1 text-h3 text-brand-dark">Deine Übungsstunden</h3>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-extrabold text-brand-dark">{PREIS_FAHRSTUNDE}</span>
              <span className="text-ink/55">je 45 Min.</span>
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">
              Wie viele du brauchst, ist sehr unterschiedlich. Im Beratungsgespräch schätzen wir das ehrlich mit dir ab und
              rechnen dir deinen Gesamtpreis aus.
            </p>
            <button
              type="button"
              onClick={scrollToForm}
              className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-4 text-sm font-semibold text-brand-strong hover:underline"
            >
              Gesamtpreis ausrechnen lassen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </article>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-brand-dark p-6 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand">B197 im {OFFER.label}</p>
            <p className="mt-1 text-xl font-bold leading-snug">Automatik lernen, Schalten dürfen</p>
            <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-white/75">
              Die 10 vorgeschriebenen Schaltstunden à 45 Min. kosten dich 0 € statt {SCHALTSTUNDEN_VORHER}. Mit dem
              Grundbetrag zusammen sind das {B197_VORTEIL} Vorteil.*
            </p>
          </div>
          <span className="shrink-0 text-4xl font-extrabold text-brand">0 €</span>
        </div>
      </Reveal>

      <p className="mt-5 text-[15px] leading-relaxed text-ink/75">
        Außerdem kommen die Vorstellung zur praktischen Prüfung ({PREIS_PRAXISPRUEFUNG}), die Lern-App und die amtlichen
        Gebühren hinzu (TÜV/DEKRA, Führerscheinstelle, Sehtest, Passfoto).
      </p>

      <details className="group mt-5 rounded-2xl border border-black/[0.08]">
        <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-strong" aria-hidden="true" />
            Alle Entgelte nach § 32 Fahrlehrergesetz
          </span>
          <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="px-5 pb-5">
          <p className="text-sm text-ink/65">{PRICES_B.name}</p>
          <table className="mt-3 w-full table-fixed border-collapse text-left text-[15px]">
            <thead className="sr-only">
              <tr>
                <th scope="col">Leistung</th>
                <th scope="col">Preis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 border-t border-black/5">
              <tr>
                <th scope="row" className="w-[60%] py-3 pr-3 align-top font-normal leading-relaxed text-ink">
                  {PRICES_B.baseLabel}
                </th>
                <td className="py-3 text-right align-top font-bold text-brand-dark">{PRICES_B.basePrice}</td>
              </tr>
              {PRICES_B.items.map((row) => (
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

      <div className="mt-4 flex flex-col gap-2 text-xs leading-relaxed text-ink/55 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-3xl">{PKW_SAVINGS_NOTE}</p>
        <a
          href={flyerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand-strong hover:underline"
        >
          Angebots-Flyer ansehen <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);

/* ---------- Reform ---------- */

const REFORM_CARDS = [REFORM_FACTS.heute, REFORM_FACTS.preis, REFORM_FACTS.warteschlange, REFORM_FACTS.altesRecht];

export const ReformSection: React.FC = () => (
  <section id="reform" className="section-y scroll-mt-20 bg-brand-dark" aria-labelledby="reform-heading">
    <div className="container-page">
      <SectionHead
        dark
        id="reform-heading"
        eyebrow={`Führerscheinreform · Stand ${REFORM_STAND}`}
        title="Lohnt es sich, auf die Reform zu warten?"
        intro="Das Gesetz ist beschlossen, die Details noch nicht. Unsere Einschätzung: Dass sich Warten finanziell lohnt, ist nicht belegt. Das sind die Fakten."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {REFORM_CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 60}>
            <article className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <p className="text-sm font-bold text-brand">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-white">{card.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/75">{card.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-6 rounded-2xl bg-white p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-success">Was dagegen schon feststeht</p>
              <h3 className="mt-1 text-h3 text-brand-dark">Unser {OFFER.label}</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  `Grundbetrag ${GRUNDBETRAG} statt ${GRUNDBETRAG_VORHER}`,
                  'Erste-Hilfe-Kurs inklusive',
                  'B197: 10 Schaltstunden für 0 €',
                  GUELTIG_BIS ? `Gilt bei Anmeldung bis ${GUELTIG_BIS}` : 'Gilt bei Anmeldung vor Ort',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] leading-snug text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/75">
                Viele unserer Fahrschüler sind in 2 bis 3 Monaten fertig.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <button
                type="button"
                onClick={scrollToForm}
                className="min-h-[52px] rounded-xl bg-brand-strong px-6 font-bold text-white transition-colors hover:bg-brand-strong/90"
              >
                Kostenlos beraten lassen
              </button>
              <Link
                to="/reform"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-brand-dark/15 px-6 font-semibold text-brand-dark transition-colors hover:bg-surface"
              >
                <Scale className="h-5 w-5" aria-hidden="true" /> Alles zur Reform
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------- Ablauf ---------- */

const STEP_ICONS = [CalendarCheck, PhoneCall, MapPin];

export const AblaufSection: React.FC = () => (
  <section className="section-y bg-surface" aria-labelledby="ablauf-heading">
    <div className="container-page">
      <SectionHead
        id="ablauf-heading"
        eyebrow="Ablauf"
        title="So läuft es ab"
        intro="Ohne Verpflichtung. Du entscheidest erst, wenn alle Fragen geklärt sind."
      />
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <Reveal key={step.title} delay={i * 80}>
              <li className="relative h-full list-none rounded-2xl border border-black/[0.06] bg-white p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-strong text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug text-brand-dark">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink/75">{step.text}</p>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  </section>
);

/* ---------- Bewertungen ---------- */

export const StimmenSection: React.FC = () => (
  <section className="section-y bg-white" aria-labelledby="stimmen-heading">
    <div className="container-page">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <SectionHead id="stimmen-heading" eyebrow="Bewertungen" title="Was unsere Fahrschüler sagen" />
          <Reveal>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-5xl font-extrabold text-brand-dark">{RATING_VALUE}</span>
              <div>
                <Stars className="h-5 w-5" />
                <p className="mt-1 text-sm text-ink/65">{REVIEW_COUNT} Bewertungen bei Google</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                'Geduld ist eines der Worte, die in unseren Bewertungen am häufigsten fallen.',
                'Viele unserer Schüler schreiben, dass sie beim ersten Anlauf bestanden haben.',
              ].map((t) => (
                <li key={t} className="border-l-2 border-brand pl-4 text-[15px] leading-relaxed text-ink">
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-brand-dark/15 px-5 font-semibold text-brand-dark transition-colors hover:bg-surface"
            >
              Alle Bewertungen auf Google <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <figure className="rounded-2xl border border-black/[0.06] bg-surface p-6">
                <Stars className="h-4 w-4" />
                <blockquote className="mt-3 text-[16px] leading-relaxed text-ink">„{r.text}“</blockquote>
                <figcaption className="mt-3 flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-brand-dark">{r.name}</span>
                  <span className="rounded border border-black/10 bg-white px-2 py-0.5 text-xs text-ink/60">Google</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Kontakt ---------- */

export const KontaktSection: React.FC = () => (
  <section className="section-y bg-brand-dark" aria-labelledby="kontakt-heading">
    <div className="container-page">
      <SectionHead
        dark
        id="kontakt-heading"
        eyebrow="Kontakt"
        title="Noch Fragen? Frag uns einfach."
        intro="Ruf an, schreib uns auf WhatsApp oder lass dich zurückrufen. Was am besten zu dir passt."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={scrollToForm}
          className="flex min-h-[60px] items-center justify-center gap-2 rounded-xl bg-brand-strong px-5 text-lg font-bold text-white transition-colors hover:bg-brand-strong/90"
        >
          <PhoneCall className="h-5 w-5" aria-hidden="true" /> Rückruf anfragen
        </button>
        <button
          type="button"
          onClick={() => openWhatsApp(whatsappHref, `${TRACKING_SOURCE}-kontakt`)}
          className="flex min-h-[60px] items-center justify-center gap-2 rounded-xl bg-success px-5 text-lg font-bold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
        </button>
        <button
          type="button"
          onClick={() => callPhone(PHONE_RAW, `${TRACKING_SOURCE}-kontakt`)}
          className="flex min-h-[60px] items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-5 text-lg font-semibold text-white transition-colors hover:bg-white/10"
        >
          <Phone className="h-5 w-5" aria-hidden="true" /> {PHONE_DISPLAY}
        </button>
      </div>

      <div className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-3 text-white/80">
          <p className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <span>{ADDRESS_LINE}</span>
          </p>
          <p className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <span>Büro Montag bis Freitag, 12 bis 18 Uhr. Fahrstunden auch außerhalb nach Absprache.</span>
          </p>
          <p className="pl-8 text-sm text-white/60">
            Parkplätze vor der Tür. Bahnhof Babelsberg, Tram und Bus sind in wenigen Minuten zu Fuß erreichbar.
          </p>
        </div>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-5 font-semibold text-brand-dark transition-colors hover:bg-surface"
        >
          <Navigation className="h-5 w-5" aria-hidden="true" /> Route planen
        </a>
      </div>

      <nav aria-label="Mehr über die ABF Fahrschule" className="mt-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[
            { to: '/preise', label: 'Alle Preise' },
            { to: '/theorie', label: 'Theorieunterricht' },
            { to: '/reform', label: 'Führerscheinreform' },
            { to: '/', label: 'Startseite' },
          ].map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="inline-flex min-h-[44px] items-center gap-1 font-semibold text-white/75 underline-offset-4 hover:text-white hover:underline"
              >
                {l.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </section>
);

/* ---------- Mobile Leiste ---------- */

export const StickyBar: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const hero = document.getElementById(HERO_ID);
    const form = document.getElementById(FORM_ID);
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0.05 });
      o.observe(hero);
      observers.push(o);
    }
    if (form) {
      const o = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 });
      o.observe(form);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = !heroVisible && !formVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-hidden={!show}
    >
      <div className="flex gap-2 p-2">
        <button
          type="button"
          onClick={scrollToForm}
          tabIndex={show ? 0 : -1}
          className="h-14 flex-1 rounded-xl bg-brand-strong text-base font-bold text-white active:scale-[0.98]"
        >
          Kostenlos beraten lassen
        </button>
        <button
          type="button"
          onClick={() => openWhatsApp(whatsappHref, `${TRACKING_SOURCE}-sticky`)}
          tabIndex={show ? 0 : -1}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-success text-white"
          aria-label="Per WhatsApp schreiben"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => callPhone(PHONE_RAW, `${TRACKING_SOURCE}-sticky`)}
          tabIndex={show ? 0 : -1}
          className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-brand-dark/15 text-brand-dark"
          aria-label="Jetzt anrufen"
        >
          <Phone className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
