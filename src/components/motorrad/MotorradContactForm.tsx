import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Lock, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { CookieConsentManager } from '@/lib/cookieConsent';

// Validation schema
const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name darf maximal 100 Zeichen lang sein'),
  email: z.string().trim().email('Bitte gib eine gültige E-Mail-Adresse ein').max(255, 'E-Mail darf maximal 255 Zeichen lang sein'),
  phone: z.string().trim().min(5, 'Bitte gib eine gültige Telefonnummer ein').max(30, 'Telefonnummer darf maximal 30 Zeichen lang sein'),
  honeyPot: z.string().max(0, 'Spam erkannt')
});

const MotorradContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    honeyPot: '',
    license_class: 'a2'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // First click: Show privacy consent
    if (!showPrivacyConsent) {
      const result = leadSchema.safeParse({
        name: formData.name,
        email: formData.email,
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
          email: formData.email,
          phone: formData.phone,
          license_class: formData.license_class,
          source: 'landingpage-motorrad'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Submission failed');
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'lead_submitted', form_type: 'contact' });
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
    window.open('https://wa.me/4915752387583?text=Hallo,%20ich%20möchte%20das%20599€%20Motorrad-Angebot%20sichern!', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+4933196795854';
  };

  return (
    <section id="motorrad-form" className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-[#1a2d4a]">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
            Sichere dir jetzt deinen Platz für die Saison 2026!
          </h2>
          <div className="flex items-center justify-center gap-2 text-[#6d8fd4] mb-2">
            <Clock className="w-4 sm:w-5 h-4 sm:h-5" />
            <p className="font-semibold text-sm sm:text-base">Angebot nur gültig bis zum 31. August</p>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base">
            Die Plätze sind begrenzt – wir melden uns innerhalb von 24 Stunden
          </p>
        </div>

        <div className="bg-neutral-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-[#3b5998]/20">
          <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-neutral-200">
                Dein Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5 h-12 sm:h-14 border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-base sm:text-lg p-3 sm:p-4"
                placeholder="Vor- und Nachname"
                autoComplete="name"
              />
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-neutral-200">
                E-Mail-Adresse *
              </Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="mt-1.5 h-12 sm:h-14 border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-base sm:text-lg p-3 sm:p-4"
                placeholder="deine@email.de"
                autoComplete="email"
              />
            </div>

            {/* Phone Field */}
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-neutral-200">
                Telefonnummer *
              </Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5 h-12 sm:h-14 border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-base sm:text-lg p-3 sm:p-4"
                placeholder="0151 12345678"
                autoComplete="tel"
              />
            </div>

            {/* License Class Field */}
            <div>
              <Label htmlFor="license_class" className="text-sm font-semibold text-neutral-200">
                Führerscheinklasse
              </Label>
              <select
                id="license_class"
                value={formData.license_class}
                onChange={e => setFormData({ ...formData, license_class: e.target.value })}
                className="mt-1.5 w-full h-12 sm:h-14 border border-neutral-700 bg-neutral-800 text-white focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-base sm:text-lg px-4 appearance-none cursor-pointer"
              >
                <option value="a2">Motorradführerschein A2 (vorausgewählt)</option>
                <option value="a">Motorradführerschein A – unbeschränkt</option>
                <option value="a1">Motorradführerschein A1 – Leichtkraftrad</option>
                <option value="b">Klasse B – PKW</option>
              </select>
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
              <div className="bg-neutral-800 rounded-xl p-3 sm:p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={e => setPrivacyConsent(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-neutral-600 bg-neutral-700 text-[#3b5998] focus:ring-[#3b5998] flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-neutral-300 leading-tight">
                    Ich stimme der{' '}
                    <a href="/datenschutz" target="_blank" className="text-[#6d8fd4] underline font-medium hover:text-[#8aa8e0]">
                      Datenschutzerklärung
                    </a>{' '}
                    zu und bin damit einverstanden, dass mich ABF Fahrschule kontaktiert.
                  </span>
                </label>
              </div>
            )}

            {/* CTA Button - Blue theme */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-[#3b5998] hover:bg-[#4a6cb3] text-white h-14 sm:h-16 text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? "Wird gesendet..." : "Jetzt anfragen & Platz sichern"}
            </Button>

            {/* Trust Elements */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-400 pt-2 text-center">
              <Lock className="w-4 h-4 text-[#3b5998] flex-shrink-0" />
              <span>Deine Daten sind sicher. Wir rufen dich zurück.</span>
            </div>
          </form>

          {/* Alternative Contact - Blue theme */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-800">
            <p className="text-center text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4">Oder kontaktiere uns direkt:</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={handleWhatsApp}
                variant="outline"
                className="flex-1 border-[#3b5998] text-[#6d8fd4] hover:bg-[#3b5998] hover:text-white h-11 sm:h-12 font-semibold rounded-xl bg-transparent text-sm sm:text-base"
              >
                <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={handleCall}
                variant="outline"
                className="flex-1 border-[#3b5998] text-[#6d8fd4] hover:bg-[#3b5998] hover:text-white h-11 sm:h-12 font-semibold rounded-xl bg-transparent text-sm sm:text-base"
              >
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Anrufen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotorradContactForm;
