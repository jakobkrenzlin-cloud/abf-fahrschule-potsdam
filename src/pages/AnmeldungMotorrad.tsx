import React from 'react';
import { Helmet } from 'react-helmet';
import { Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MotorradHero from '@/components/motorrad/MotorradHero';
import MotorradOffer from '@/components/motorrad/MotorradOffer';
import MotorradAdvantages from '@/components/motorrad/MotorradAdvantages';
import MotorradTestimonials from '@/components/motorrad/MotorradTestimonials';
import MotorradProcess from '@/components/motorrad/MotorradProcess';
import MotorradContactForm from '@/components/motorrad/MotorradContactForm';

const AnmeldungMotorrad = () => {
  const scrollToForm = () => {
    document.getElementById('motorrad-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Helmet>
        <title>Motorradführerschein Potsdam | Klasse A/A2 für 599€ | ABF Fahrschule</title>
        <meta 
          name="description" 
          content="Sichere dir jetzt deinen Motorradführerschein (A/A2) in Potsdam! Grundbetrag nur 599€ inkl. Erste Hilfe, LernApp & 100€ Louis-Gutschein. Jetzt Platz sichern!" 
        />
        <meta name="keywords" content="Motorradführerschein Potsdam, Motorrad Fahrschule Potsdam, A2 Führerschein Potsdam, Motorradführerschein machen, Motorradführerschein Kosten" />
        <link rel="canonical" href="https://abf-fahrschule-potsdam.lovable.app/anmeldungmotorrad" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Minimal Header */}
        <header className="bg-black py-3 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <img src="/abf-logo.png" alt="ABF Fahrschule Potsdam" className="h-10 w-auto brightness-0 invert" loading="eager" />
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-orange-500" />
              <a href="tel:+4933196795854" className="font-semibold text-white hover:text-orange-500">
                0331 / 967 958 54
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <MotorradHero onCtaClick={scrollToForm} />

        {/* Offer Section with Value Stacking */}
        <MotorradOffer />

        {/* Trust & Authority Section */}
        <MotorradAdvantages />

        {/* Social Proof / Testimonials */}
        <MotorradTestimonials />

        {/* Process Steps */}
        <MotorradProcess />

        {/* Contact Form Section */}
        <MotorradContactForm />

        {/* Footer */}
        <footer className="bg-black text-neutral-400 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} ABF Fahrschule Potsdam |{' '}
              <a href="/impressum" className="hover:text-orange-500 underline">Impressum</a> |{' '}
              <a href="/datenschutz" className="hover:text-orange-500 underline">Datenschutz</a> |{' '}
              <a href="/agb" className="hover:text-orange-500 underline">AGB</a>
            </p>
          </div>
        </footer>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-sm border-t border-neutral-800 md:hidden z-50 safe-area-inset-bottom">
          <Button
            onClick={scrollToForm}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white h-14 text-lg font-bold rounded-xl shadow-lg"
          >
            Jetzt Platz sichern & 50€ sparen
          </Button>
        </div>
      </div>
    </>
  );
};

export default AnmeldungMotorrad;
