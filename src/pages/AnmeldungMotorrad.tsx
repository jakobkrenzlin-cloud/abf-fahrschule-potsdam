import React, { useState } from 'react';
import { Bike, ArrowRight } from 'lucide-react';
import LpSeo from '@/components/lp/LpSeo';
import LpHeader from '@/components/lp/LpHeader';
import UrgencyBar from '@/components/lp/UrgencyBar';
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
import { PRICES_A } from '@/data/prices';

const FORM_ID = 'lead-form-motorrad';
const HERO_ID = 'hero-motorrad';

const CLASS_OPTIONS = [
  { value: 'a1', label: 'A1 – ab 16 Jahren (125 ccm)' },
  { value: 'a2', label: 'A2 – ab 18 Jahren (bis 35 kW)' },
  { value: 'a', label: 'A – unbegrenzt' },
  { value: 'a_unklar', label: 'Weiß noch nicht – bitte beraten' },
];

const CLASS_CARDS = [
  {
    value: 'a1',
    title: 'A1',
    age: 'ab 16 Jahren',
    power: 'bis 125 ccm / 11 kW',
    tag: 'Der Einstieg',
  },
  {
    value: 'a2',
    title: 'A2',
    age: 'ab 18 Jahren',
    power: 'bis 35 kW',
    tag: 'Der Stufenweg, Aufstieg nach 2 Jahren',
  },
  {
    value: 'a',
    title: 'A',
    age: 'ab 24 Jahren (bzw. Aufstieg)',
    power: 'unbegrenzt',
    tag: 'Der Direkteinstieg',
  },
];

const REVIEWS: Review[] = [
  {
    name: 'Bogdan Kotenko',
    text: 'Fahrlehrer Mohamed - ist der beste Fahrlehrer!!! 100% Weiterempfehlung! Motorrad Führerschein beim ersten Versuch bekommen!! ABF Fahrschule - weiter so!',
  },
  {
    name: 'Leander Fischer',
    text: 'Ich habe bei der ABF Fahrschule meinen A1 Schein gemacht und beim ersten Mal bestanden. Mit meinem Fahrlehrer Mohamed bin ich auch super zufrieden gewesen und er hat mich sehr gut auf die Prüfung vorbereitet :)',
  },
  {
    name: 'Yasin Dinc',
    text: 'Top Fahrschule , Motorrad Führerschein da gemacht , lief alles reibungslos . Preis leistungs Verhältnis super . Sehr empfehlenswert',
  },
];

const STEPS: Step[] = [
  { title: 'Klasse wählen und Termin anfragen', text: 'A1, A2 oder A. Wenn du unsicher bist, beraten wir dich.' },
  { title: 'Rückruf in 24 Stunden', text: 'Wir klären deine Fragen und machen deinen Anmeldetermin aus.' },
  { title: 'Anmeldetermin im Weberpark', text: 'Wir schauen zusammen, welche Klasse zu dir passt, und du meldest dich direkt an.' },
  { title: 'Theorie starten, im Frühjahr fahren', text: 'Den Winter für die Theorie nutzen. Zur Saison bist du startklar.' },
];

const STEPS_BOOKING: Step[] = [
  { title: 'Klasse und Termin wählen', text: 'A1, A2 oder A. Wenn du unsicher bist, beraten wir dich beim Termin.' },
  { title: 'Bestätigung per WhatsApp', text: 'Wir bestätigen dir deinen Termin.' },
  STEPS[2],
  STEPS[3],
];

const FAQS: Faq[] = [
  {
    question: 'Bin ich nach dem Formular schon angemeldet?',
    answer:
      'Noch nicht. Anmelden kannst du dich nur persönlich bei uns im Weberpark. Nach dem Formular rufen wir dich innerhalb von 24 Stunden an und machen einen Termin aus. Der Herbstpreis von 399 € gilt, wenn du dich bis 31. Oktober vor Ort anmeldest.',
  },
  {
    question: 'Welche Klasse ist die richtige für mich?',
    answer:
      'Mit 16 kommt nur A1 in Frage (bis 125 ccm / 11 kW). Ab 18 ist A2 der übliche Weg (bis 35 kW), nach 2 Jahren A2 kannst du unkompliziert auf A aufsteigen. Den Direkteinstieg in Klasse A gibt es ab 24 Jahren. Wir schauen im Beratungsgespräch gemeinsam, was für dich am sinnvollsten ist.',
  },
  {
    question: 'Lohnt es sich, im Herbst anzufangen?',
    answer:
      'Ja – genau deshalb gibt es das Herbst-Angebot. Du machst Theorie und Vorbereitung in der ruhigen Jahreszeit, wenn Termine gut verfügbar sind. Wenn im Frühjahr die Saison losgeht, fährst du bereits, statt auf einen Platz zu warten.',
  },
  {
    question: 'Habt ihr eigene Motorräder zum Üben?',
    answer:
      'Ja, wir bilden auf unseren eigenen, gepflegten Schulungsmotorrädern aus. Du brauchst kein eigenes Motorrad.',
  },
  {
    question: 'Brauche ich eigene Schutzkleidung?',
    answer:
      'Für die Fahrstunden brauchst du Motorradbekleidung (Helm, Handschuhe, Jacke, Hose, feste Stiefel). Sprich uns an – wir sagen dir genau, was nötig ist, und mit dem Louis- und Polo-Gutschein aus dem Angebot wird die Erstausstattung günstiger.',
  },
  {
    question: 'Was kostet der Motorradführerschein insgesamt?',
    answer:
      'Der Grundbetrag beträgt im Herbst-Angebot 399 €. Dazu kommen die Fahrstunden: Übungsstunde (45 Min.) 80 €, Unterweisung (45 Min.) 80 €, besondere Ausbildungsfahrt (45 Min.) 85 €. Wie viele Stunden du brauchst, hängt von deiner Vorerfahrung ab – amtliche Gebühren kommen zusätzlich dazu.',
  },
  {
    question: 'Kann ich später von A2 auf A aufsteigen?',
    answer:
      'Ja. Nach 2 Jahren Besitz der Klasse A2 ist der Aufstieg auf A über eine Aufstiegsschulung mit praktischer Prüfung möglich – ohne erneute Theorieprüfung.',
  },
  {
    question: 'Ich habe schon Klasse B – bringt mir das etwas?',
    answer:
      'Ja. Wenn du mindestens 25 bist und deinen Autoführerschein seit mindestens 5 Jahren hast, kannst du mit der Schlüsselzahl B196 ohne Prüfung 125er fahren. Alle Infos dazu findest du auf unserer B196-Seite unter /b196.',
  },
];

const FAQS_BOOKING: Faq[] = FAQS.map((f) =>
  f.question === 'Bin ich nach dem Formular schon angemeldet?'
    ? { ...f, answer: 'Noch nicht. Mit dem Formular buchst du deinen Termin, angemeldet wirst du bei diesem Termin persönlich bei uns im Weberpark. Der Herbstpreis von 399 € gilt bei Anmeldung vor Ort bis 31. Oktober, unser letzter Öffnungstag davor ist Freitag, 30. Oktober.' }
    : f,
);

const AnmeldungMotorrad = () => {
  const variant = useFormVariant();
  const isBooking = variant === 'booking';
  const steps = isBooking ? STEPS_BOOKING : STEPS;
  const faqs = isBooking ? FAQS_BOOKING : FAQS;
  const ctaLabel = isBooking ? 'Termin wählen' : 'Termin anfragen';
  const [licenseClass, setLicenseClass] = useState('a2');

  const scrollToForm = () => {
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const chooseClass = (value: string) => {
    setLicenseClass(value);
    scrollToForm();
  };

  return (
    <>
      <LpSeo
        title="Motorradführerschein A1, A2, A in Potsdam | ABF Fahrschule"
        description="Motorradführerschein in Potsdam: A1 ab 16, A2 ab 18, Klasse A. Herbst-Angebot bis 31. Oktober – jetzt Theorie machen, im Frühjahr fahren."
        path="/anmeldungmotorrad"
        faqs={faqs}
      />

      <div className="min-h-screen bg-white font-sans">
        <LpHeader onCtaClick={scrollToForm} ctaLabel={ctaLabel} />
        <UrgencyBar label="Herbstpreis 399 €: Anmeldung vor Ort bis 31. Oktober" />

        <main>
          <LpHero
            id={HERO_ID}
            headline="Motorradführerschein Potsdam – jetzt starten, im Frühjahr fahren"
            subline="A1 ab 16, A2 ab 18 oder Klasse A. Herbstpreis: Grundbetrag 399 € bei Anmeldung vor Ort bis 31. Oktober. Theorie im Winter, und wenn die Saison beginnt, bist du startklar."
            chips={[
              'Eigene Schulungsmotorräder',
              '5,0★ bei Google',
              'Im Frühjahr sofort auf die Straße',
            ]}
          >
            <LeadForm
              id={FORM_ID}
              variant={variant}
              ctaLabel="Anmeldetermin anfragen"
              source="landingpage-motorrad"
              classOptions={CLASS_OPTIONS}
              licenseClass={licenseClass}
              onLicenseClassChange={setLicenseClass}
              whatsappText="Hallo, ich möchte einen Anmeldetermin für den Motorradführerschein ausmachen (Herbstpreis 399 €). Wann kann ich vorbeikommen?"
              onsiteNote="Angemeldet wirst du beim Termin vor Ort. Der Herbstpreis von 399 € gilt bei Anmeldung bis 31. Oktober."
              trackingSource="landing-motorrad"
            />
          </LpHero>

          <Steps steps={steps} />

          {/* Klassen-Vergleich */}
          <section className="py-12 md:py-16 bg-white" aria-labelledby="klassen-heading">
            <div className="max-w-6xl mx-auto px-4">
              <Reveal>
                <h2
                  id="klassen-heading"
                  className="text-2xl md:text-4xl font-bold text-brand-dark text-center"
                >
                  Welche Klasse passt zu dir?
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {CLASS_CARDS.map((c, i) => (
                  <Reveal key={c.value} delay={i * 80}>
                    <div className="h-full flex flex-col bg-surface rounded-2xl p-6 border border-black/5">
                      <Bike className="w-8 h-8 text-brand" aria-hidden="true" />
                      <h3 className="mt-3 text-3xl font-extrabold text-brand-dark">{c.title}</h3>
                      <p className="mt-2 text-ink">{c.age}</p>
                      <p className="text-ink">{c.power}</p>
                      <p className="mt-3 text-sm font-semibold text-brand">{c.tag}</p>
                      <button
                        type="button"
                        onClick={() => chooseClass(c.value)}
                        className="mt-6 min-h-[56px] w-full rounded-xl bg-brand-dark hover:bg-brand-dark text-white font-bold inline-flex items-center justify-center gap-2 transition-colors"
                      >
                        Diese Klasse wählen
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <PriceBlock
            badge="Herbst-Angebot"
            price={PRICES_A.basePrice}
            title={`Grundbetrag ${PRICES_A.basePrice} (Herbst-Angebot) – das ist drin`}
            subtitle="Einmalige Gebühr für Verwaltung und vollständige Theorieausbildung"
            includedBase={[
              'Kompletter Theorieunterricht',
              'Motorrad-spezifische Theorie',
            ]}
            includedAdditional={[
              'Anmeldung & Verwaltung',
              '100 € Louis und Polo Gutschein',
              'Prüfungsvorbereitung',
              '1 Jahr ADAC-Mitgliedschaft',
            ]}
            extras={PRICES_A.items}
            footnote="Das Herbst-Angebot gilt bei Anmeldung vor Ort bis 31. Oktober."
          />

          <SocialProof reviews={REVIEWS} />
          <WhyAbfCards />
          <FaqBlock faqs={faqs} />
          <LocationSection />

          <FinalCta
            headline="Herbstpreis 399 €: Anmeldung vor Ort bis 31. Oktober"
            subline="Theorie jetzt, Fahrspaß im Frühjahr. Frag deinen Anmeldetermin an, wir rufen dich innerhalb von 24 Stunden an."
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
          trackingSource="landing-motorrad-sticky"
        />
      </div>
    </>
  );
};

export default AnmeldungMotorrad;
