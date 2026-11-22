import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CalendarClock, Check, Clock, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileStickyFooter from '../components/MobileStickyFooter';
import FaqBlock from '@/components/lp/FaqBlock';
import { PHONE_RAW, SITE_URL, WHATSAPP_BASE, type Faq } from '@/components/lp/constants';
import { callPhone, openWhatsApp } from '@/lib/tracking';
import { OFFER, formatOfferPrice } from '@/config/offer';
import {
  REFORM_CHANGES,
  REFORM_FACTS,
  REFORM_SOURCES,
  REFORM_STAND,
  REFORM_STAND_ISO,
  REFORM_TIMELINE,
} from '@/config/reform';

const PAGE_URL = `${SITE_URL}/reform`;
const PAGE_TITLE = 'Führerscheinreform 2027: Was jetzt gilt | ABF Fahrschule';
const PAGE_DESCRIPTION =
  'Was ist bei der Führerscheinreform beschlossen und was nur geplant? Ehrlicher Überblick mit Zeitplan, Quellen und Antworten für alle, die noch warten.';
const PAGE_H1 = 'Führerscheinreform: Was sich ändert und ob sich Warten lohnt';


const FAQS: Faq[] = [
  {
    question: 'Gilt die Reform schon?',
    answer:
      'Nein. Bundestag und Bundesrat haben das Gesetz beschlossen, am 5. und am 20. November 2026. Es tritt zum größten Teil am 1. Juli 2027 in Kraft. Die Details zu Theorie, Sonderfahrten und Prüfung regelt eine Verordnung, über die der Bundesrat noch entscheidet. Bis dahin gelten die bisherigen Regeln.',
  },
  {
    question: 'Wann kommt die Online-Theorie?',
    answer:
      'Das Gesetz schafft die Pflicht ab, vor Ort am Theorieunterricht teilzunehmen. Du kannst dann auch digital oder per App lernen, Fahrschulen entscheiden selbst, ob und wie sie Theoriestunden anbieten. Das Gesetz tritt zum größten Teil am 1. Juli 2027 in Kraft, die Details regelt eine Verordnung, über die der Bundesrat noch entscheidet.',
  },
  {
    question: 'Fallen die Sonderfahrten weg?',
    answer:
      'Nein. Überland-, Autobahn- und Nachtfahrten bleiben Pflicht. Die feste Zahl von 12 fällt weg, den Umfang legt künftig dein Fahrlehrer im Einzelfall fest. Bis die neuen Regeln gelten, bleibt es bei 12 Sonderfahrten.',
  },
  {
    question: 'Darf ich bald mit meinen Eltern üben?',
    answer:
      'Das Gesetz erlaubt das als Erprobung: nach bestandener Theorieprüfung und mindestens 6 Fahrstunden, nach einer Einweisung durch eine Fahrlehrkraft. Die Details regelt eine Verordnung, die Länder entscheiden, ob sie das zulassen. Ob Brandenburg mitmacht, ist offen.',
  },
  {
    question: 'Wird der Führerschein billiger?',
    answer:
      'Das ist offen. Das Gesetz macht die Preise aller Fahrschulen vergleichbar und soll den Führerschein so günstiger machen. Eine Ersparnis nennt es nicht. Der Verordnungsentwurf rechnet nur für das Üben mit Angehörigen ein Beispiel vor, mit Annahmen zu Auto, Versicherung und Fahrleistung.',
  },
  {
    question: 'Was passiert, wenn ich jetzt anfange?',
    answer:
      'Du lernst nach den heute geltenden Regeln. Laut Verordnungsentwurf dürfen alle, die vor dem 1. Januar 2027 begonnen haben, nach dem bisherigen Recht abschließen. Ob dieser Stichtag mitwandert und was für die Prüfung gilt, ist noch offen. Viele unserer Fahrschüler sind in 2 bis 3 Monaten fertig.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_H1,
    description: PAGE_DESCRIPTION,
    datePublished: REFORM_STAND_ISO,
    dateModified: REFORM_STAND_ISO,
    inLanguage: 'de-DE',
    url: PAGE_URL,
    mainEntityOfPage: PAGE_URL,
    author: { '@type': 'Organization', name: 'ABF Fahrschule Potsdam', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'ABF Fahrschule Potsdam', url: SITE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
];

const basisClass = (basis: string) =>
  basis.startsWith('Beschlossen') ? 'bg-success/10 text-success' : 'bg-brand/10 text-brand-strong';

const prose = 'text-[17px] leading-relaxed text-ink/80';
const btnBase =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold transition-colors sm:w-auto';

const Reform = () => {
  const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    'Hallo, ich habe eine Frage zur Führerscheinreform und zum Winter-Angebot.',
  )}`;

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        {jsonLd.map((block) => (
          <script key={block['@type']} type="application/ld+json">
            {JSON.stringify(block)}
          </script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-surface">
        <Header />
        <main>
          {/* Hero */}
          <section className="section-y bg-surface">
            <div className="container-narrow">
              <p className="text-small font-semibold uppercase tracking-wide text-brand-strong">
                Ratgeber · Stand {REFORM_STAND}
              </p>
              <h1 className="mt-3 text-[30px] font-bold leading-tight text-brand-dark md:text-[42px]">{PAGE_H1}</h1>
              <p className={`mt-5 ${prose}`}>
                Viele fragen sich gerade, ob sie mit dem Führerschein lieber warten sollen. Hier steht, was
                beschlossen ist, was nur geplant ist und was das für deinen Start bedeutet.
              </p>

              <div className="mt-8 rounded-2xl border border-black/5 bg-card p-5 shadow-card md:p-6">
                <h2 className="text-h3 text-brand-dark">Das Wichtigste in 30 Sekunden</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    'Heute gelten noch die bisherigen Regeln.',
                    'Bundestag und Bundesrat haben das Gesetz beschlossen. Es tritt zum größten Teil am 1. Juli 2027 in Kraft, die Verordnung mit den Details steht noch aus.',
                    'Ob der Führerschein billiger wird, ist offen.',
                    'Wer vorher anfängt, darf laut Entwurf nach bisherigem Recht abschließen.',
                  ].map((point) => (
                    <li key={point} className="flex gap-3 text-[17px] leading-relaxed text-ink/80">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Zeitstrahl */}
          <section className="section-y bg-card" aria-labelledby="reform-stand-heading">
            <div className="container-narrow">
              <h2 id="reform-stand-heading" className="text-h2 md:text-h2-lg text-brand-dark">
                Wo steht die Reform?
              </h2>
              <p className={`mt-4 ${prose}`}>{REFORM_FACTS.heute.text}</p>
              <ol className="mt-8 space-y-0">
                {REFORM_TIMELINE.map((item, i) => {
                  const done = item.done;
                  const isLast = i === REFORM_TIMELINE.length - 1;
                  return (
                    <li key={`${item.date}-${i}`} className="relative flex gap-4 pb-6 last:pb-0">
                      {!isLast && (
                        <span
                          className={`absolute left-[11px] top-6 h-[calc(100%-1.5rem)] w-0.5 ${
                            done ? 'bg-success/40' : 'bg-black/10'
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          done ? 'bg-success text-white' : 'border-2 border-dashed border-ink/30 bg-card text-ink/50'
                        }`}
                        aria-hidden="true"
                      >
                        {done ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                      </span>
                      <div className={done ? '' : 'opacity-90'}>
                        <p className={`text-small font-semibold ${done ? 'text-success' : 'text-ink/60'}`}>
                          {item.date}
                          <span className="sr-only">{done ? ' (erledigt)' : ' (noch offen)'}</span>
                        </p>
                        <p className="text-[17px] leading-relaxed text-ink/80">{item.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* Was sich ändern soll */}
          <section className="section-y bg-surface" aria-labelledby="reform-aenderungen-heading">
            <div className="container-narrow">
              <h2 id="reform-aenderungen-heading" className="text-h2 md:text-h2-lg text-brand-dark">
                Was sich ändert
              </h2>
              <p className={`mt-4 ${prose}`}>
                Beschlossen heißt: steht im Gesetz, dem Bundestag und Bundesrat zugestimmt haben. Verordnungsentwurf heißt:
                ein Vorschlag der Regierung, über den der Bundesrat noch entscheidet. Das Badge an jeder Karte zeigt, worauf
                die Aussage beruht.
              </p>
              <div className="mt-8 space-y-4">
                {REFORM_CHANGES.map((c) => (
                  <article key={c.topic} className="rounded-2xl border border-black/5 bg-card p-5 shadow-card">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="text-h3 text-brand-dark">{c.topic}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${basisClass(c.basis)}`}>
                        {c.basis}
                      </span>
                    </div>
                    <p className="mt-2 text-[17px] leading-relaxed text-ink/80">{c.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Was gleich bleibt */}
          <section className="section-y bg-card" aria-labelledby="reform-bleibt-heading">
            <div className="container-narrow">
              <h2 id="reform-bleibt-heading" className="text-h2 md:text-h2-lg text-brand-dark">
                Was gleich bleibt
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  'Sonderfahrten (Überland, Autobahn, Dunkelheit) bleiben Pflicht. Nur die feste Anzahl fällt weg.',
                  'Theorieprüfung und praktische Prüfung gibt es weiter. Bewertung und Fragenkatalog der Theorieprüfung ändern sich, laut Verordnungsentwurf auch die Dauer der Praxisprüfung.',
                  'Auch wer mit Angehörigen üben will, braucht vorher die bestandene Theorieprüfung und mindestens 6 Fahrstunden in der Fahrschule.',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[17px] leading-relaxed text-ink/80">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Billiger? */}
          <section className="section-y bg-surface" aria-labelledby="reform-preis-heading">
            <div className="container-narrow">
              <h2 id="reform-preis-heading" className="text-h2 md:text-h2-lg text-brand-dark">
                Wird der Führerschein dadurch billiger?
              </h2>
              <div className="mt-4 space-y-4">
                <p className={prose}>{REFORM_FACTS.preis.text}</p>
                <p className={prose}>
                  Dieses Üben setzt ein eigenes Auto, eine geeignete Begleitperson und eine Genehmigung voraus. Ob Brandenburg bei dem Versuch
                  mitmacht, ist offen.
                </p>
              </div>
            </div>
          </section>

          {/* Warten oder starten */}
          <section className="section-y bg-card" aria-labelledby="reform-warten-heading">
            <div className="container-narrow">
              <h2 id="reform-warten-heading" className="text-h2 md:text-h2-lg text-brand-dark">
                Lohnt es sich zu warten?
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-black/5 bg-surface p-5">
                  <h3 className="text-h3 text-brand-dark">Wenn du wartest</h3>
                  <ul className="mt-3 space-y-3 text-[17px] leading-relaxed text-ink/80">
                    <li>Die neuen Regeln gelten zum größten Teil erst ab 1. Juli 2027, die Details stehen noch aus.</li>
                    <li>Ob es billiger wird, ist offen.</li>
                    <li>
                      Der Verordnungsentwurf rechnet mit einer „Bugwelle“ an Fahrschülern und längeren Wartezeiten auf
                      Prüfungstermine.
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-brand-strong/20 bg-surface p-5">
                  <h3 className="text-h3 text-brand-dark">Wenn du jetzt startest</h3>
                  <ul className="mt-3 space-y-3 text-[17px] leading-relaxed text-ink/80">
                    <li>Du lernst nach den heute geltenden Regeln.</li>
                    <li>
                      Das {OFFER.label} für Klasse B gilt bei Anmeldung bis {OFFER.pkwValidUntilLabel}.
                    </li>
                    <li>Viele unserer Fahrschüler sind in 2 bis 3 Monaten fertig.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-black/5 bg-surface p-5">
                <p className="text-[17px] leading-relaxed text-ink/80">
                  <strong className="text-brand-dark">{OFFER.label} Klasse B</strong> (gilt auch für B197 und BF17):
                  Grundbetrag {formatOfferPrice(OFFER.pkwGrundbetrag)}, Erste-Hilfe-Kurs inklusive, bei B197{' '}
                  {OFFER.b197Schaltstunden} Schaltstunden à {OFFER.b197SchaltstundenMinuten} Min. für{' '}
                  {formatOfferPrice(OFFER.b197SchaltstundenPreis)}.
                </p>
                <p className="mt-3 text-small text-ink/75">
                  Weitere Fahrstunden, die Vorstellung zur praktischen Prüfung, Lern-App und amtliche Gebühren kommen hinzu. Alle Preise findest du auf der{' '}
                  <Link to="/preise" className="font-semibold text-brand-strong underline underline-offset-2">
                    Preisseite
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Mitten in der Ausbildung */}
          <section className="section-y bg-surface" aria-labelledby="reform-mitten-heading">
            <div className="container-narrow">
              <h2 id="reform-mitten-heading" className="text-h2 md:text-h2-lg text-brand-dark">
                Und wenn die Reform mitten in meiner Ausbildung kommt?
              </h2>
              <div className="mt-4 space-y-4">
                <p className={prose}>
                  <strong className="text-brand-dark">{REFORM_FACTS.altesRecht.title}.</strong>{' '}
                  {REFORM_FACTS.altesRecht.text}
                </p>
                <p className={prose}>
                  Im Beratungsgespräch sagen wir dir, was das für deinen Zeitplan heißt.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section-y bg-surface pt-0 md:pt-0" aria-labelledby="reform-cta-heading">
            <div className="container-narrow">
              <div className="rounded-2xl bg-brand-dark p-6 text-white shadow-card md:p-10">
                <h2 id="reform-cta-heading" className="text-h2 md:text-h2-lg">
                  Lieber erst einmal reden?
                </h2>
                <p className="mt-3 text-[17px] leading-relaxed text-white/85">
                  Lass dich kostenlos und unverbindlich beraten. Vorkasse gibt es nicht. Du findest uns im Weberpark,
                  Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link to="/anmeldung#beratung" className={`${btnBase} bg-brand-strong text-white hover:bg-brand-strong/90`}>
                    <CalendarClock className="h-5 w-5" aria-hidden="true" />
                    Kostenlos beraten lassen
                  </Link>
                  <button
                    type="button"
                    onClick={() => openWhatsApp(whatsappUrl, 'reform')}
                    className={`${btnBase} border border-white/40 text-white hover:bg-white/10`}
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    WhatsApp schreiben
                  </button>
                  <button
                    type="button"
                    onClick={() => callPhone(PHONE_RAW, 'reform')}
                    className={`${btnBase} border border-white/40 text-white hover:bg-white/10`}
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    Anrufen
                  </button>
                </div>
              </div>
            </div>
          </section>

          <FaqBlock faqs={FAQS} />

          {/* Quellen */}
          <section className="section-y bg-surface" aria-labelledby="reform-quellen-heading">
            <div className="container-narrow">
              <h2 id="reform-quellen-heading" className="text-h2 md:text-h2-lg text-brand-dark">
                Quellen
              </h2>
              <ul className="mt-6 space-y-3">
                {REFORM_SOURCES.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-2 text-[17px] leading-snug text-brand-strong underline underline-offset-2 break-words"
                    >
                      <span>{s.label}</span>
                      <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-small text-ink/75">
                Stand {REFORM_STAND}. Wir aktualisieren diese Seite, sobald Bundesrat oder Ministerium entscheiden.
                Keine Rechtsberatung.
              </p>
            </div>
          </section>
        </main>
        <Footer />
        <MobileStickyFooter />
      </div>
    </>
  );
};

export default Reform;
