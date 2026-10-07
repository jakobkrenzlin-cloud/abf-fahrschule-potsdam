import React, { useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import LpSeo from '@/components/lp/LpSeo';
import LpHeader from '@/components/lp/LpHeader';
import LpHero from '@/components/lp/LpHero';
import LeadForm from '@/components/lp/LeadForm';
import PriceBlock from '@/components/lp/PriceBlock';
import SocialProof from '@/components/lp/SocialProof';
import Steps from '@/components/lp/Steps';
import WhyAbfCards from '@/components/lp/WhyAbfCards';
import FaqBlock from '@/components/lp/FaqBlock';
import LocationSection from '@/components/lp/LocationSection';
import FinalCta from '@/components/lp/FinalCta';
import StickyMobileCta from '@/components/lp/StickyMobileCta';
import LpFooterLinks from '@/components/lp/LpFooterLinks';
import LpLegalBar from '@/components/lp/LpLegalBar';
import Reveal from '@/components/lp/Reveal';
import type { Faq, Review, Step } from '@/components/lp/constants';
import { useFormVariant } from '@/lib/formVariant';

const FORM_ID = 'lead-form-b196';
const HERO_ID = 'hero-b196';

const CLASS_OPTIONS = [{ value: 'b196', label: 'B196 – 125er Erweiterung' }];

const CHECK_QUESTIONS = [
  { id: 'alter', text: 'Bist du mindestens 25 Jahre alt?' },
  { id: 'besitz', text: 'Hast du deinen Führerschein Klasse B seit mindestens 5 Jahren?' },
  { id: 'ort', text: 'Wohnst du im Raum Potsdam?' },
];

const REVIEWS: Review[] = [
  {
    name: 'Max Katzmann',
    text: 'Ich hab meine Erweiterung auf A bei Mohamed gemacht und das war eine großartige Erfahrung.',
  },
  {
    name: 'Yasin Dinc',
    text: 'Top Fahrschule , Motorrad Führerschein da gemacht , lief alles reibungslos . Preis leistungs Verhältnis super . Sehr empfehlenswert',
  },
  { name: 'Simone', text: 'Freundliche Beratung, tolle Fahrlehrer' },
];

const STEPS: Step[] = [
  { title: 'Voraussetzungen prüfen', text: 'Dauert 30 Sekunden, direkt hier auf der Seite.' },
  { title: 'Termin anfragen', text: 'Name und Telefonnummer reichen uns.' },
  { title: 'Rückruf in 24 Stunden', text: 'Wir machen deinen Anmeldetermin im Weberpark aus.' },
  { title: 'Anmeldung vor Ort, dann Schulung', text: 'Nach der Anmeldung schulen wir dich an 2 bis 3 Terminen. Danach holst du dir den Eintrag und fährst los.' },
];

const STEPS_BOOKING: Step[] = [
  STEPS[0],
  { title: 'Termin wählen', text: 'Tag und Uhrzeit aussuchen, dazu Name und Telefonnummer.' },
  { title: 'Bestätigung per WhatsApp', text: 'Wir bestätigen dir deinen Termin im Weberpark.' },
  STEPS[3],
];

const FAQS: Faq[] = [
  {
    question: 'Bin ich nach dem Formular schon angemeldet?',
    answer:
      'Noch nicht. Anmelden kannst du dich nur persönlich bei uns im Weberpark. Nach dem Formular rufen wir dich innerhalb von 24 Stunden an und machen einen Termin aus. 1 Jahr ADAC-Mitgliedschaft gibt es, wenn du dich bis 31. Oktober vor Ort anmeldest.',
  },
  {
    question: 'Was genau ist B196?',
    answer:
      'B196 ist eine Schlüsselzahl, die in deinen bestehenden Autoführerschein (Klasse B) eingetragen wird. Damit darfst du Leichtkrafträder bis 125 ccm und 11 kW fahren – also klassische 125er-Roller und -Motorräder. Du brauchst dafür keinen neuen Führerschein und keine Prüfung, nur eine vorgeschriebene Schulung.',
  },
  {
    question: 'Muss ich wirklich keine Prüfung machen?',
    answer:
      'Richtig – weder eine theoretische noch eine praktische Prüfung. Du absolvierst die vorgeschriebene Schulung (4 Einheiten Theorie, 5 Einheiten Praxis) und bekommst danach eine Bescheinigung, mit der die Führerscheinstelle die Schlüsselzahl einträgt.',
  },
  {
    question: 'Welche Voraussetzungen brauche ich genau?',
    answer:
      'Du musst mindestens 25 Jahre alt sein und den Führerschein der Klasse B seit mindestens 5 Jahren besitzen. Beide Bedingungen müssen gleichzeitig erfüllt sein.',
  },
  {
    question: 'Wie lange dauert die Schulung?',
    answer:
      'In der Regel 2 bis 3 Termine, verteilt auf etwa 2 bis 3 Wochen – je nachdem, wie schnell du Termine wahrnehmen kannst.',
  },
  {
    question: 'Welche Motorräder darf ich danach fahren?',
    answer:
      'Leichtkrafträder bis 125 ccm Hubraum, maximal 11 kW Leistung und einem Leistungsgewicht bis 0,1 kW/kg – also alle üblichen 125er-Roller und -Motorräder.',
  },
  {
    question: 'Gilt das auch im Ausland?',
    answer:
      'Ehrliche Antwort: nein. Die Schlüsselzahl B196 gilt ausschließlich in Deutschland. Im Ausland darfst du damit keine 125er fahren – dafür bräuchtest du die Klasse A1.',
  },
  {
    question: 'Brauche ich eigene Ausrüstung?',
    answer:
      'Für die Praxiseinheiten brauchst du Motorradbekleidung: Helm, Handschuhe, Jacke, Hose und feste Stiefel. Das Motorrad stellen wir.',
  },
  {
    question: 'Was ist der Unterschied zu A1?',
    answer:
      'A1 ist eine eigene Führerscheinklasse mit Theorie- und Praxisprüfung, gilt EU-weit und ist ab 16 Jahren möglich. B196 ist nur eine Erweiterung deines B-Führerscheins ohne Prüfung – schneller und günstiger, aber nur in Deutschland gültig.',
  },
];

const FAQS_BOOKING: Faq[] = FAQS.map((f) =>
  f.question === 'Bin ich nach dem Formular schon angemeldet?'
    ? { ...f, answer: 'Noch nicht. Mit dem Formular buchst du deinen Termin, angemeldet wirst du bei diesem Termin persönlich bei uns im Weberpark. Die ADAC-Mitgliedschaft gibt es bei Anmeldung vor Ort bis 31. Oktober, unser letzter Öffnungstag davor ist Freitag, 30. Oktober.' }
    : f,
);

const B196 = () => {
  const variant = useFormVariant();
  const isBooking = variant === 'booking';
  const steps = isBooking ? STEPS_BOOKING : STEPS;
  const faqs = isBooking ? FAQS_BOOKING : FAQS;
  const ctaLabel = isBooking ? 'Termin wählen' : 'Termin anfragen';
  const [licenseClass, setLicenseClass] = useState('b196');
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    alter: null,
    besitz: null,
    ort: null,
  });

  const scrollToForm = () => {
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const allAnswered = CHECK_QUESTIONS.every((q) => answers[q.id] !== null);
  const allYes = CHECK_QUESTIONS.every((q) => answers[q.id] === true);

  return (
    <>
      <LpSeo
        title="B196 Potsdam – 125er fahren mit Autoführerschein | ABF Fahrschule"
        description="Mit dem B-Führerschein 125er fahren – ohne zusätzliche Prüfung. B196 in Potsdam-Babelsberg für 750 €. 5,0★ bei Google. Jetzt Platz sichern."
        path="/b196"
        faqs={faqs}
      />

      <div className="min-h-screen bg-white font-sans">
        <LpHeader onCtaClick={scrollToForm} ctaLabel={ctaLabel} />

        <main>
          <LpHero
            id={HERO_ID}
            headline="125er fahren – mit deinem Autoführerschein, ohne neue Prüfung"
            subline="Die Schlüsselzahl B196 erweitert deinen bestehenden Führerschein Klasse B. Keine Theorie- und keine Praxisprüfung, nur eine kompakte Schulung. Bei ABF in Potsdam für 750 € Festpreis."
            chips={['Keine Prüfung nötig', 'In 2–3 Wochen fertig', 'Fester Komplettpreis']}
          >
            <LeadForm
              id={FORM_ID}
              variant={variant}
              offerLine="Für die ADAC-Mitgliedschaft: Termin bis Freitag, 30. Oktober wählen."
              offerTag="Bonus"
              ctaLabel="Anmeldetermin anfragen"
              source="landingpage-b196"
              classOptions={CLASS_OPTIONS}
              licenseClass={licenseClass}
              onLicenseClassChange={setLicenseClass}
              whatsappText="Hallo, ich möchte einen Anmeldetermin für die B196-Schulung ausmachen (750 € Festpreis). Wann kann ich vorbeikommen?"
              onsiteNote="Angemeldet wirst du beim Termin vor Ort. 1 Jahr ADAC-Mitgliedschaft gibt es bei Anmeldung bis 31. Oktober."
              trackingSource="landing-b196"
            />
          </LpHero>

          {/* Voraussetzungs-Check */}
          <section className="py-12 md:py-16 bg-surface" aria-labelledby="check-heading">
            <div className="max-w-3xl mx-auto px-4">
              <Reveal>
                <h2
                  id="check-heading"
                  className="text-2xl md:text-4xl font-bold text-brand-dark text-center"
                >
                  Erfüllst du die Voraussetzungen?
                </h2>
                <p className="mt-3 text-center text-ink/70">
                  Drei kurze Fragen – du weißt es in 30 Sekunden.
                </p>

                <div className="mt-8 space-y-4">
                  {CHECK_QUESTIONS.map((q) => (
                    <div
                      key={q.id}
                      className="bg-white rounded-2xl border border-black/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                    >
                      <p className="font-semibold text-brand-dark">{q.text}</p>
                      <div className="flex gap-2 shrink-0" role="group" aria-label={q.text}>
                        {[true, false].map((val) => (
                          <button
                            key={String(val)}
                            type="button"
                            aria-pressed={answers[q.id] === val}
                            onClick={() => setAnswers((a) => ({ ...a, [q.id]: val }))}
                            className={`min-w-[84px] h-12 rounded-xl font-bold border-2 transition-colors ${
                              answers[q.id] === val
                                ? val
                                  ? 'bg-success border-success text-white'
                                  : 'bg-brand-dark border-brand-dark text-white'
                                : 'bg-white border-black/10 text-brand-dark hover:bg-surface'
                            }`}
                          >
                            {val ? 'Ja' : 'Nein'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {allAnswered && allYes && (
                  <div
                    className="mt-6 rounded-2xl bg-success/10 border border-success/30 p-6 text-center"
                    role="status"
                  >
                    <CheckCircle2 className="w-8 h-8 text-success mx-auto" aria-hidden="true" />
                    <p className="mt-3 font-bold text-brand-dark text-lg">
                      Du erfüllst alle Voraussetzungen – du kannst sofort starten
                    </p>
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="mt-5 min-h-[56px] px-8 rounded-xl bg-brand-strong hover:bg-brand-strong/90 text-white font-bold transition-colors"
                    >
                      Anmeldetermin anfragen
                    </button>
                  </div>
                )}

                {allAnswered && !allYes && (
                  <div
                    className="mt-6 rounded-2xl bg-warning/10 border border-warning/40 p-6"
                    role="status"
                  >
                    <p className="flex items-start gap-2.5 text-ink">
                      <Info className="w-5 h-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        Für B196 fehlt dir aktuell noch eine Voraussetzung – kein Problem. Dann ist
                        vielleicht A1 oder A2 das Richtige für dich.{' '}
                        <a
                          href="/anmeldungmotorrad"
                          className="font-semibold text-brand underline"
                        >
                          Zur Motorrad-Seite
                        </a>
                        . Wenn du unsicher bist, ruf uns einfach an – wir beraten dich ehrlich.
                      </span>
                    </p>
                  </div>
                )}
              </Reveal>
            </div>
          </section>

          <Steps steps={steps} />

          <PriceBlock
            badge="Festpreis"
            price="750 €"
            title="750 € Festpreis – alles drin"
            included={[
              '4 Einheiten Theorie',
              '5 Einheiten Praxis auf 125er',
              'Nutzung unserer Schulungsmotorräder',
              'Bescheinigung für die Führerscheinstelle',
              'Keine Prüfungsgebühren (weil keine Prüfung nötig)',
              '1 Jahr ADAC-Mitgliedschaft',
            ]}
            note="1 Jahr ADAC-Mitgliedschaft gibt es bei Anmeldung vor Ort bis 31. Oktober 2026 dazu."
            closing="Fester Komplettpreis. Keine Nachberechnung, keine Überraschungen."
          />

          <SocialProof reviews={REVIEWS} />
          <WhyAbfCards />
          <FaqBlock faqs={faqs} />
          <LocationSection />

          <FinalCta
            headline="B196 bei ABF: 750 € Festpreis. Jetzt Termin anfragen."
            subline="Kompakte Schulung, keine Prüfung, danach direkt auf die 125er."
            buttonLabel="Anmeldetermin anfragen"
            onClick={scrollToForm}
          />
        </main>

        <LpFooterLinks />
        <LpLegalBar />

        <StickyMobileCta
          heroId={HERO_ID}
          formId={FORM_ID}
          onCtaClick={scrollToForm}
          label={ctaLabel}
          trackingSource="landing-b196-sticky"
        />
      </div>
    </>
  );
};

export default B196;
