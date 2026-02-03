import React from 'react';
import { Helmet } from 'react-helmet';
import { Phone, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MotorradHero from '@/components/motorrad/MotorradHero';
import MotorradOffer from '@/components/motorrad/MotorradOffer';
import MotorradAdvantages from '@/components/motorrad/MotorradAdvantages';
import MotorradTestimonials from '@/components/motorrad/MotorradTestimonials';
import MotorradProcess from '@/components/motorrad/MotorradProcess';
import MotorradContactForm from '@/components/motorrad/MotorradContactForm';
import MotorradFlyerSection from '@/components/motorrad/MotorradFlyerSection';

const AnmeldungMotorrad = () => {
  const scrollToForm = () => {
    document.getElementById('motorrad-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // Inline CTA Component - Updated to blue theme
  const InlineCTA = ({ text, variant = "default" }: { text: string; variant?: "default" | "dark" }) => (
    <div className={`py-6 sm:py-10 ${variant === "dark" ? "bg-gradient-to-r from-[#2a4a7f] to-black" : "bg-[#3b5998]"}`}>
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-white text-base sm:text-lg lg:text-xl font-semibold text-center sm:text-left">
          {text}
        </p>
        <Button
          onClick={scrollToForm}
          size="lg"
          className={`${variant === "dark" 
            ? "bg-[#3b5998] hover:bg-[#4a6cb3]" 
            : "bg-white text-[#3b5998] hover:bg-neutral-100"
          } font-bold rounded-xl px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg whitespace-nowrap transition-all hover:scale-105 w-full sm:w-auto`}
        >
          Jetzt Platz sichern
          <ArrowDown className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

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

      <div className="min-h-screen bg-black">
        {/* Minimal Header - Blue gradient theme */}
        <header className="bg-gradient-to-r from-[#1a2d4a] to-black py-3 border-b border-[#3b5998]/30">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <img src="/abf-logo.png" alt="ABF Fahrschule Potsdam" className="h-10 w-auto brightness-0 invert" loading="eager" />
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+4933196795854" className="flex items-center gap-2 text-white hover:text-[#6d8fd4] transition-colors">
                <Phone className="w-4 h-4 text-[#3b5998]" />
                <span className="font-semibold">0331 / 967 958 54</span>
              </a>
              <Button
                onClick={scrollToForm}
                size="sm"
                className="bg-[#3b5998] hover:bg-[#4a6cb3] text-white font-semibold rounded-lg"
              >
                Jetzt anmelden
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <MotorradHero onCtaClick={scrollToForm} />

        {/* CTA after Hero */}
        <InlineCTA text="Nur noch wenige Plätze für die Saison 2026 verfügbar!" />

        {/* Offer Section with Value Stacking */}
        <MotorradOffer />

        {/* Flyer Section */}
        <MotorradFlyerSection />

        {/* CTA after Offer */}
        <InlineCTA text="Spare jetzt über 280€ – Angebot gilt nur bis 31. August!" variant="dark" />

        {/* Trust & Authority Section */}
        <MotorradAdvantages />

        {/* Social Proof / Testimonials */}
        <MotorradTestimonials />

        {/* CTA after Testimonials */}
        <InlineCTA text="Werde auch du Teil unserer Biker-Community!" />

        {/* Process Steps */}
        <MotorradProcess />

        {/* Contact Form Section */}
        <MotorradContactForm />

        {/* Footer - Blue gradient */}
        <footer className="bg-gradient-to-r from-[#1a2d4a] to-black text-neutral-400 py-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} ABF Fahrschule Potsdam |{' '}
              <a href="/impressum" className="hover:text-[#6d8fd4] underline">Impressum</a> |{' '}
              <a href="/datenschutz" className="hover:text-[#6d8fd4] underline">Datenschutz</a> |{' '}
              <a href="/agb" className="hover:text-[#6d8fd4] underline">AGB</a>
            </p>
          </div>
        </footer>

        {/* Mobile Sticky CTA - Blue theme */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-sm border-t border-[#3b5998]/30 md:hidden z-50 safe-area-inset-bottom">
          <Button
            onClick={scrollToForm}
            className="w-full bg-[#3b5998] hover:bg-[#4a6cb3] text-white h-14 text-lg font-bold rounded-xl shadow-lg"
          >
            Jetzt Platz sichern & 50€ sparen
          </Button>
        </div>
      </div>
    </>
  );
};

export default AnmeldungMotorrad;
