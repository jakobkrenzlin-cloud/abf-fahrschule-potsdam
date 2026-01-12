
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import QuickContact from '../components/QuickContact';
import WhyABF from '../components/WhyABF';
import ProcessSection from '../components/ProcessSection';
import OffersSection from '../components/OffersSection';
import AboutSection from '../components/AboutSection';
import SuccessfulStudentsSection from '../components/SuccessfulStudentsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <QuickContact />
      <WhyABF />
      <ProcessSection />
      <OffersSection />
      <AboutSection />
      <SuccessfulStudentsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
