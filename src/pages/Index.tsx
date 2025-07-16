
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhyABF from '../components/WhyABF';
import ProcessSection from '../components/ProcessSection';
import OffersSection from '../components/OffersSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WhyABF />
      <ProcessSection />
      <OffersSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
