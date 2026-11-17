// /anmeldung – Haupt-Landingpage für Google Ads (PKW Klasse B, B197, BF17).
// Neu aufgebaut im November 2026 (Analyse: PostHog, Lead-Datenbank, Sitzungsaufnahmen).
// Grundidee: erst kostenlos beraten lassen, dann entscheiden. Kosten offen erklären, Reform-Einwand ehrlich beantworten.
// Alte Fassung: git-Historie von src/pages/Landing.tsx (Stand origin/main f80f4a8).

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LpSeo from '@/components/lp/LpSeo';
import LpHeader from '@/components/lp/LpHeader';
import FaqBlock from '@/components/lp/FaqBlock';
import LpLegalBar from '@/components/lp/LpLegalBar';
import type { Faq } from '@/components/lp/constants';
import { OFFER_COPY } from '@/config/offer';
import Hero from '@/components/anmeldung/Hero';
import {
  AblaufSection,
  KontaktSection,
  KostenSection,
  ReformSection,
  StickyBar,
  StimmenSection,
} from '@/components/anmeldung/Sections';
import { FAQS, scrollToForm } from '@/components/anmeldung/content';

const REFORM_QUESTION = 'Soll ich mit dem Führerschein auf die Reform warten?';

const faqsWithLinks: Faq[] = FAQS.map((f) =>
  f.question === REFORM_QUESTION
    ? {
        ...f,
        answerNode: (
          <>
            {f.answer.replace(' Alle Details findest du auf unserer Seite zur Führerscheinreform.', '')}{' '}
            Alle Details findest du auf unserer{' '}
            <Link to="/reform" className="font-semibold text-brand-strong underline underline-offset-2">
              Seite zur Führerscheinreform
            </Link>
            .
          </>
        ),
      }
    : f,
);

const Landing = () => {
  const location = useLocation();

  // Sprungmarken wie /anmeldung#beratung (z. B. von /reform) nach dem Laden anspringen
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <LpSeo title={OFFER_COPY.pkwTitle} description={OFFER_COPY.pkwDescription} path="/anmeldung" faqs={FAQS} />

      <div className="min-h-screen bg-white font-sans [&_h1]:[hyphens:manual] [&_h2]:[hyphens:manual] [&_h3]:[hyphens:manual]">
        <LpHeader onCtaClick={scrollToForm} ctaLabel="Beratung anfragen" />

        <main>
          <Hero />
          <KostenSection />
          <ReformSection />
          <AblaufSection />
          <StimmenSection />
          <FaqBlock faqs={faqsWithLinks} />
          <KontaktSection />
        </main>

        <LpLegalBar />
        <StickyBar />
      </div>
    </>
  );
};

export default Landing;
