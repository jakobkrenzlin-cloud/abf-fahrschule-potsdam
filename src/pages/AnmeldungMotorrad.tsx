import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle, Lock, Shield, Bike, Wrench, Banknote } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { CookieConsentManager } from '@/lib/cookieConsent';
import heroImage from '@/assets/motorrad-hero.jpg';

// Validation schema
const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name darf maximal 100 Zeichen lang sein'),
  phone: z.string().trim().min(5, 'Bitte gib eine gültige Telefonnummer ein').max(30, 'Telefonnummer darf maximal 30 Zeichen lang sein'),
  honeyPot: z.string().max(0, 'Spam erkannt')
});

const AnmeldungMotorrad = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    honeyPot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { toast } = useToast();

  const scrollToForm = () => {
    document.getElementById('motorrad-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // First click: Show privacy consent
    if (!showPrivacyConsent) {
      const result = leadSchema.safeParse({
        name: formData.name,
        phone: formData.phone,
        honeyPot: formData.honeyPot
      });
      if (!result.success) {
        toast({
          title: "Ungültige Eingabe",
          description: result.error.errors[0].message,
          variant: "destructive"
        });
        return;
      }
      setShowPrivacyConsent(true);
      return;
    }

    // Second click: Submit with privacy consent
    if (!privacyConsent) {
      toast({
        title: "Bitte zustimmen",
        description: "Bitte stimme der Datenschutzerklärung zu.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://jxxhrldcmwjnjqfpfeti.supabase.co/functions/v1/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          license_class: 'a',
          source: 'landingpage-motorrad'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Submission failed');
      }

      CookieConsentManager.triggerConversion();
      navigate('/danke');
    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuche es nochmal oder rufe uns direkt an.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/4915752387583?text=Hallo,%20ich%20möchte%20das%20550€%20Motorrad-Angebot%20sichern!', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+4933196795854';
  };

  return (
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
      <section className="relative min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Motorradfahren auf einer Landstraße" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Dein Weg zur Freiheit:
              <span className="block text-orange-500">Nur 550 €</span>
            </h1>
            
            {/* Sub-Headline */}
            <p className="text-xl lg:text-2xl text-neutral-200 mb-8">
              Das All-Inclusive Startpaket für deinen Motorradführerschein (A+A2) in Potsdam.
            </p>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 px-8 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
            >
              Jetzt Deinen Platz sichern
            </Button>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Dein Startpaket für nur <span className="text-orange-500">550 €</span>
              <span className="text-xl lg:text-2xl text-neutral-400 line-through ml-3">650 €</span>
            </h2>
          </div>

          {/* Price Box */}
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 p-8 lg:p-12 mb-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Price Display */}
              <div className="text-center lg:text-left">
                <div className="flex items-baseline gap-3 justify-center lg:justify-start">
                  <span className="text-7xl lg:text-8xl font-black text-orange-500">550 €</span>
                </div>
                <p className="text-lg text-neutral-500 mt-2">
                  <span className="line-through">650 €</span> – Du sparst 100 €!
                </p>
              </div>

              {/* Value Stack */}
              <div className="flex-1 max-w-md">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-lg">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-neutral-800 font-medium">Kompletter Theorieunterricht</span>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-neutral-800 font-medium">100 € Louis Gutschein</span>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-neutral-800 font-medium">1 Jahr ADAC Mitgliedschaft</span>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-neutral-800 font-medium">Erste-Hilfe-Kurs inklusive</span>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-neutral-800 font-medium">Top Lern-App vom Vogel Verlag</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="motorrad-form" className="py-16 lg:py-20 bg-black">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Sichere dir jetzt deinen Platz!
            </h2>
            <p className="text-neutral-400">
              Wir melden uns innerhalb von 24 Stunden
            </p>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-6 lg:p-8 border border-neutral-800">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-neutral-200">
                  Dein Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1.5 h-14 border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-orange-500 focus:ring-orange-500 rounded-xl text-lg p-4"
                  placeholder="Vor- und Nachname"
                  autoComplete="name"
                />
              </div>

              {/* Phone Field */}
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-neutral-200">
                  Telefonnummer
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1.5 h-14 border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-orange-500 focus:ring-orange-500 rounded-xl text-lg p-4"
                  placeholder="0151 12345678"
                  autoComplete="tel"
                />
              </div>

              {/* Honeypot - Hidden */}
              <div className="hidden" aria-hidden="true">
                <Input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeyPot}
                  onChange={e => setFormData({ ...formData, honeyPot: e.target.value })}
                />
              </div>

              {/* Privacy Consent - Shows after first click */}
              {showPrivacyConsent && (
                <div className="bg-neutral-800 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={e => setPrivacyConsent(e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-neutral-600 bg-neutral-700 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-neutral-300 leading-tight">
                      Ich stimme der{' '}
                      <a href="/datenschutz" target="_blank" className="text-orange-500 underline font-medium hover:text-orange-400">
                        Datenschutzerklärung
                      </a>{' '}
                      zu und bin damit einverstanden, dass mich ABF Fahrschule kontaktiert.
                    </span>
                  </label>
                </div>
              )}

              {/* CTA Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-16 text-xl font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {isSubmitting ? "Wird gesendet..." : showPrivacyConsent ? "Absenden & Platz sichern" : "Absenden & Platz sichern"}
              </Button>

              {/* Trust Elements */}
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-400 pt-2">
                <Lock className="w-4 h-4 text-orange-500" />
                <span>Wir rufen dich zur Terminabstimmung zurück. Deine Daten sind sicher.</span>
              </div>
            </form>

            {/* Alternative Contact */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-neutral-800">
              <Button
                onClick={handleWhatsApp}
                variant="outline"
                className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white h-12 font-semibold rounded-xl bg-transparent"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={handleCall}
                variant="outline"
                className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white h-12 font-semibold rounded-xl bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                Anrufen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Builder Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
              Deine Vorteile bei uns
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bike className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="font-bold text-xl text-neutral-900 mb-3">Erfahrene Biker-Profis</h3>
              <p className="text-neutral-600">
                Wir lieben Motorradfahren und bringen es dir sicher bei.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="font-bold text-xl text-neutral-900 mb-3">Moderne Motorräder</h3>
              <p className="text-neutral-600">
                Lerne auf top-gewarteten und sicheren Maschinen.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Banknote className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="font-bold text-xl text-neutral-900 mb-3">Transparente Kosten</h3>
              <p className="text-neutral-600">
                Der Grundbetrag deckt die komplette Theorie. Keine versteckten Kosten.
              </p>
            </div>
          </div>
        </div>
      </section>

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
          Jetzt Deinen Platz sichern
        </Button>
      </div>
    </div>
  );
};

export default AnmeldungMotorrad;
