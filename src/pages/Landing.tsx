import React, { useState } from 'react';
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
import type { Faq, Review, Step } from '@/components/lp/constants';
import { PRICES_B } from '@/data/prices';

const FORM_ID = 'lead-form-pkw';
const HERO_ID = 'hero-pkw';

const REVIEWS: Review[] = [
  {
    name: 'Zaplatix',
    text: 'Ich kann es hier nur empfehlen, bin hier hin gewechselt und innerhalb von 3 Monaten beim ersten Versuch bestanden, sowohl Serdar als auch Ali sind super Fahrlehrer, meine klare Empfehlung',
  },
  {
    name: 'Janne Stuer',
    text: 'Sehr nett alle und habe schnell viele Termine bekommen. Hab nur knapp 2 Monate für alle Fahrstunden gebraucht.',
  },
  {
    name: 'THS KALLE Boss',
    text: 'Ein gute Fahrschule mit kompetente Fahrlehrer und alles beim ersten Mal bestanden.( hat nur 2 Monate gedauert)',
  },
];

const STEPS: Step[] = [
  { title: 'Termin anfragen', text: 'Dauert keine 2 Minuten. Name und Telefonnummer reichen.' },
  { title: 'Wir rufen dich innerhalb von 24 Stunden an', text: 'Wir klären deine Fragen und machen deinen Anmeldetermin aus.' },
  { title: 'Anmeldetermin im Weberpark', text: 'Wir rechnen dir deinen Gesamtpreis aus, planen deinen Start, und du meldest dich an.' },
  { title: 'Theoriekurs starten', text: 'Theorie in einer Woche, danach direkt in die Praxis.' },
];

const FAQS: Faq[] = [
  {
    question: 'Bin ich nach dem Formular schon angemeldet?',
    answer:
      'Noch nicht. Anmelden kannst du dich nur persönlich bei uns im Weberpark. Nach dem Formular rufen wir dich innerhalb von 24 Stunden an und machen einen Termin aus. Der Herbstpreis von 199 € gilt, wenn du dich bis 31. Oktober vor Ort anmeldest.',
  },
  {
    question: 'Was genau ist im 199-€-Angebot enthalten?',
    answer:
      'Enthalten sind Anmeldung und Verwaltung, der komplette Theorieunterricht, die Vorstellung zur theoretischen Prüfung, die persönliche Beratung sowie 1 Jahr ADAC-Mitgliedschaft. Fahrstunden, Lern-App und amtliche Gebühren kommen wie überall zusätzlich dazu. Das Angebot gilt bei Anmeldung vor Ort bis 31. Oktober.',
  },
  {
    question: 'Wie lange dauert der Führerschein bei euch insgesamt?',
    answer:
      'Die Theorie schaffst du bei uns in einer Woche. Wie schnell es insgesamt geht, hängt vor allem davon ab, wie viele Fahrstunden du pro Woche nehmen kannst. Viele unserer Fahrschüler sind in 2 bis 3 Monaten fertig.',
  },
  {
    question: 'Kann ich auch mit 17 anfangen (BF17)?',
    answer:
      'Ja. Beim Begleiteten Fahren ab 17 kannst du dich bereits mit 16,5 Jahren anmelden und mit 17 die Prüfung machen. Danach fährst du bis 18 mit einer eingetragenen Begleitperson.',
  },
  {
    question: 'Was kostet der Führerschein am Ende ungefähr komplett?',
    answer:
      'Das hängt allein davon ab, wie viele Fahrstunden du brauchst – das ist bei jedem unterschiedlich. Bei uns kostet die Übungsstunde (45 Min.) 73,12 €, die Unterweisung 73,12 € und eine besondere Ausbildungsfahrt 80 €. Im Beratungsgespräch rechnen wir dir eine realistische Gesamtsumme aus. Amtliche Gebühren (TÜV/DEKRA, Führerscheinstelle, Sehtest, Erste Hilfe) kommen dazu.',
  },
  {
    question: 'Muss ich bei der Anmeldung schon zahlen?',
    answer:
      'Nein. Das Formular ist nur die Terminanfrage und kostet nichts. Alles Weitere besprechen wir beim Anmeldetermin vor Ort, und auch dort gibt es keine Vorkasse.',
  },
  {
    question: 'Bietet ihr auch Automatik (B197) an?',
    answer:
      'Ja. Bei B197 lernst du überwiegend auf dem Automatikfahrzeug und machst nach mindestens 10 Fahrstunden eine kurze Testfahrt im Schaltwagen. Danach darfst du beides fahren – ohne Automatik-Eintrag im Führerschein.',
  },
  {
    question: 'Wie flexibel sind die Fahrstunden-Termine?',
    answer:
      'Sehr flexibel. Wir planen die Fahrstunden gemeinsam mit dir – auch außerhalb der Bürozeiten sind Termine nach Absprache möglich.',
  },
  {
    question: 'Wo genau finde ich euch?',
    answer:
      'Im Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg. Parkplätze sind direkt vor der Tür, der Bahnhof Babelsberg sowie Tram und Bus sind in wenigen Minuten zu Fuß erreichbar.',
  },
];

const CLASS_OPTIONS = [
  { value: 'b', label: 'Klasse B – PKW' },
  { value: 'b197', label: 'Klasse B197 – Automatik & Schalter' },
  { value: 'bf17', label: 'BF17 – Begleitetes Fahren ab 17' },
  { value: 'be', label: 'Klasse BE – PKW mit Anhänger' },
];

const Landing = () => {
  const [licenseClass, setLicenseClass] = useState('b');

  const scrollToForm = () => {
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <LpSeo
        title="Führerschein Klasse B Potsdam – Herbst-Angebot | ABF Fahrschule"
        description="PKW-Führerschein in Potsdam-Babelsberg. Theorie in 1 Woche, faire Preise, 5,0★ bei Google. Herbst-Angebot nur bis 31. Oktober. Jetzt sichern!"
        path="/anmeldung"
        faqs={FAQS}
      />

      <div className="min-h-screen bg-white font-sans">
        <LpHeader onCtaClick={scrollToForm} ctaLabel="Termin anfragen" />
        <UrgencyBar label="Herbstpreis 199 €: Anmeldung vor Ort bis 31. Oktober" />

        <main>
          <LpHero
            id={HERO_ID}
            headline="Führerschein Klasse B in Potsdam – Herbst-Angebot: Grundbetrag 199 €"
            headlineNote={<a href="#preisblock" className="underline underline-offset-2 hover:text-white">Fahrstunden, Prüfungsvorstellung und amtliche Gebühren kommen hinzu – alle Preise weiter unten.</a>}
            subline="Klasse B bei der ABF Fahrschule in Babelsberg: Theorie in einer Woche, erfahrene Fahrlehrer, faire Preise. Termin anfragen, im Weberpark vorbeikommen und bis 31. Oktober vor Ort anmelden."
            chips={['Theorie in 1 Woche', '5,0★ bei Google', 'Keine versteckten Kosten']}
          >
            <LeadForm
              id={FORM_ID}
              ctaLabel="Anmeldetermin anfragen"
              source="landingpage-pkw"
              classOptions={CLASS_OPTIONS}
              licenseClass={licenseClass}
              onLicenseClassChange={setLicenseClass}
              whatsappText="Hallo, ich möchte einen Anmeldetermin für den Führerschein Klasse B ausmachen (Herbstpreis 199 €). Wann kann ich vorbeikommen?"
              onsiteNote="Angemeldet wirst du beim Termin vor Ort. Der Herbstpreis von 199 € gilt bei Anmeldung bis 31. Oktober."
              trackingSource="landing-pkw"
            />
          </LpHero>

          <Steps steps={STEPS} />

          <PriceBlock
            badge="Herbst-Angebot"
            price={PRICES_B.basePrice}
            title={`Grundbetrag ${PRICES_B.basePrice} (Herbst-Angebot) – das ist drin`}
            included={[
              'Anmeldung & Verwaltung',
              'Kompletter Theorieunterricht',
              
              'Vorstellung zur theoretischen Prüfung',
              'Persönliche Beratung',
              '1 Jahr ADAC-Mitgliedschaft',
            ]}
            extras={PRICES_B.items}
            footnote="Das Herbst-Angebot gilt bei Anmeldung vor Ort bis 31. Oktober."
          />

          <SocialProof reviews={REVIEWS} />
          <WhyAbfCards />
          <FaqBlock faqs={FAQS} />
          <LocationSection />

          <FinalCta
            headline="Herbstpreis 199 €: Anmeldung vor Ort bis 31. Oktober"
            subline="Frag jetzt deinen Anmeldetermin an. Wir rufen dich innerhalb von 24 Stunden an."
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
          label="Termin anfragen"
          trackingSource="landing-pkw-sticky"
        />
      </div>
    </>
  );
};

export default Landing;
