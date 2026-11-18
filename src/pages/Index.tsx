// Startseite. Neu aufgebaut am 18.11.2026 nach derselben Methode wie /anmeldung:
// orientieren (Klasse wählen), Kosten offen erklären, Reform-Einwand kurz beantworten, Vertrauen, kostenlose Beratung.
// Analyse: analysen/2026-11-18-startseite-neu/bericht.md im ABF-Ordner.

import React from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import LpSeo from '../components/lp/LpSeo';
import FaqBlock from '../components/lp/FaqBlock';
import type { Faq } from '../components/lp/constants';
import { OFFER_COPY } from '@/config/offer';
import HomeHero from '../components/home/HomeHero';
import {
  ClassChooser,
  HomeKontaktSection,
  PreiseSection,
  ReformBand,
  WeberparkSection,
} from '../components/home/HomeSections';
import { AblaufSection, StimmenSection } from '../components/anmeldung/Sections';
import { HOME_FAQS, REFORM_FAQ_QUESTION } from '../components/home/homeContent';

const REFORM_LINK_SENTENCE = ' Alle Details findest du auf unserer Seite zur Führerscheinreform.';

const faqsWithLinks: Faq[] = HOME_FAQS.map((f) =>
  f.question === REFORM_FAQ_QUESTION
    ? {
        ...f,
        answerNode: (
          <>
            {f.answer.replace(REFORM_LINK_SENTENCE, '')} Alle Details findest du auf unserer{' '}
            <Link to="/reform" className="font-semibold text-brand-strong underline underline-offset-2">
              Seite zur Führerscheinreform
            </Link>
            .
          </>
        ),
      }
    : f,
);

const Index = () => (
  <SiteLayout stickyMode="form" formAnchor="contact">
    <LpSeo title={OFFER_COPY.homeTitle} description={OFFER_COPY.homeDescription} path="/" faqs={HOME_FAQS} />
    <div className="[&_h1]:[hyphens:manual] [&_h2]:[hyphens:manual] [&_h3]:[hyphens:manual]">
      <HomeHero />
      <ClassChooser />
      <PreiseSection />
      <ReformBand />
      <AblaufSection />
      <StimmenSection />
      <WeberparkSection />
      <FaqBlock faqs={faqsWithLinks} />
      <HomeKontaktSection />
    </div>
  </SiteLayout>
);

export default Index;
