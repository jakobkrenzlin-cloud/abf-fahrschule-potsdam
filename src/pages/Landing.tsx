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
  { title: 'Formular ausfüllen', text: 'Dauert keine 2 Minuten – Name und Telefonnummer reichen.' },
  { title: 'Wir melden uns innerhalb von 24 Stunden', text: 'Kurzer Anruf, alle offenen Fragen geklärt.' },
  { title: 'Persönliches Beratungsgespräch im Weberpark', text: 'Wir zeigen dir alles und planen deinen Start.' },
  { title: 'Theoriekurs starten', text: 'Theorie in einer Woche – danach direkt in die Praxis.' },
];

const FAQS: Faq[] = [
  {
    question: 'Was genau ist im 199-€-Angebot enthalten?',
    answer:
      'Enthalten sind Anmeldung und Verwaltung, der komplette Theorieunterricht, Lern-App und Unterlagen, die Vorstellung zur theoretischen Prüfung, die persönliche Beratung sowie 1 Jahr ADAC-Mitgliedschaft. Fahrstunden und amtliche Gebühren kommen wie überall zusätzlich dazu.',
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
      'Nein. Deine Anfrage über das Formular ist kostenlos und unverbindlich. Es gibt keine Vorkasse – wir sprechen erst persönlich miteinander.',
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
        title="Führerschein Klasse B Potsdam – Herbst-Angebot 199 € | ABF Fahrschule"
        description="PKW-Führerschein in Potsdam-Babelsberg. Theorie in 1 Woche, faire Preise, 5,0★ bei Google. Herbst-Angebot 199 € – nur bis 31. Oktober. Jetzt sichern!"
        path="/anmeldung"
        faqs={FAQS}
      />

      <div className="min-h-screen bg-white font-sans">
        <LpHeader onCtaClick={scrollToForm} />
        <UrgencyBar />

        <main>
          <LpHero
            id={HERO_ID}
            headline="Dein Führerschein in Potsdam – Herbst-Angebot für 199 €"
            subline="Klasse B bei der ABF Fahrschule in Babelsberg. Theorie in nur einer Woche, erfahrene Fahrlehrer, faire Preise. Nur bis 31. Oktober."
            chips={['Theorie in 1 Woche', '5,0★ bei Google', 'Keine versteckten Kosten']}
          >
            <LeadForm
              id={FORM_ID}
              ctaLabel="Herbst-Angebot sichern"
              source="landingpage-pkw"
              classOptions={CLASS_OPTIONS}
              licenseClass={licenseClass}
              onLicenseClassChange={setLicenseClass}
              whatsappText="Hallo, ich möchte das Herbst-Angebot (199 €) für den Führerschein Klasse B sichern."
              trackingSource="landing-pkw"
            />
          </LpHero>

          <PriceBlock
            badge="Herbst-Angebot"
            price="199 €"
            title="199 € Herbst-Angebot – das ist drin"
            included={[
              'Anmeldung & Verwaltung',
              'Kompletter Theorieunterricht',
              'Lern-App & Unterlagen',
              'Vorstellung zur theoretischen Prüfung',
              'Persönliche Beratung',
              '1 Jahr ADAC-Mitgliedschaft',
            ]}
            extras={[
              { label: 'Übungsstunde (45 Min.)', price: '73,12 €' },
              { label: 'Unterweisung (45 Min.)', price: '73,12 €' },
              { label: 'Besondere Ausbildungsfahrten (45 Min.)', price: '80 €' },
            ]}
          />

          <SocialProof reviews={REVIEWS} />
          <Steps steps={STEPS} />
          <WhyAbfCards />
          <FaqBlock faqs={FAQS} />
          <LocationSection />

          <FinalCta
            headline="Herbst-Angebot: 199 € – nur noch bis 31. Oktober"
            subline="Sichere dir deinen Platz im nächsten Theoriekurs. Kostenlos & unverbindlich anfragen."
            buttonLabel="Herbst-Angebot sichern"
            onClick={scrollToForm}
          />
        </main>

        <LpFooterLinks />
        <LpLegalBar />

        <StickyMobileCta
          heroId={HERO_ID}
          formId={FORM_ID}
          onCtaClick={scrollToForm}
          trackingSource="landing-pkw-sticky"
        />
      </div>
    </>
  );
};

export default Landing;
