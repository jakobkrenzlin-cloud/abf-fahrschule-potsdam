
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Hero from '../components/Hero';

import QuickContact from '../components/QuickContact';
import WhyABF from '../components/WhyABF';
import ProcessSection from '../components/ProcessSection';
import OffersSection from '../components/OffersSection';
import AboutSection from '../components/AboutSection';
import JobSection from '../components/JobSection';
import SuccessfulStudentsSection from '../components/SuccessfulStudentsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import MobileStickyFooter from '../components/MobileStickyFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Helmet>
        <title>ABF Fahrschule Potsdam | Führerschein in 4 Wochen</title>
        <meta name="description" content="Führerschein Klasse B & Motorrad in Potsdam. Schnelle Theorie, moderne Ausbildung, faire Preise. Jetzt kostenlose Beratung sichern!" />
        <link rel="canonical" href="https://abf-fahrschule-potsdam.lovable.app/" />
      </Helmet>
      <Header />
      <Hero />
      
      <OffersSection />
      <QuickContact />
      <WhyABF />
      <ProcessSection />
      <AboutSection />
      <JobSection />
      <SuccessfulStudentsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default Index;
