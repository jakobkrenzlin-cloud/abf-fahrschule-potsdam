import React from 'react';
import { Helmet } from 'react-helmet-async';
import SiteLayout from '../components/SiteLayout';
import Hero from '../components/Hero';
import OffersSection from '../components/OffersSection';
import SocialProof from '../components/lp/SocialProof';
import Steps from '../components/lp/Steps';
import WhyAbfCards from '../components/lp/WhyAbfCards';
import AboutSection from '../components/AboutSection';
import FaqBlock from '../components/lp/FaqBlock';
import LocationSection from '../components/lp/LocationSection';
import ContactSection from '../components/ContactSection';
import JobSection from '../components/JobSection';
import { HOME_FAQS, HOME_REVIEWS, HOME_STEPS } from '../components/home/homeContent';
import { SITE_URL } from '../components/lp/constants';

const Index = () => (
  <SiteLayout stickyMode="form" formAnchor="contact">
    <Helmet>
      <title>Fahrschule Potsdam – Führerschein ab 199 € | ABF Fahrschule</title>
      <meta
        name="description"
        content="Führerschein in Potsdam-Babelsberg: Theorie in einer Woche, erfahrene Fahrlehrer, 5,0★ bei Google. Grundbetrag Klasse B 199 €. Jetzt kostenlos beraten lassen."
      />
      <link rel="canonical" href={`${SITE_URL}/`} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: HOME_FAQS.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}
      </script>
    </Helmet>

    <Hero />
    <OffersSection />
    <SocialProof reviews={HOME_REVIEWS} />
    <Steps steps={HOME_STEPS} />
    <WhyAbfCards />
    <AboutSection />
    <FaqBlock faqs={HOME_FAQS} />
    <LocationSection />
    <ContactSection />
    <JobSection />
  </SiteLayout>
);

export default Index;
