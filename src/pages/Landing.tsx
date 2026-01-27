import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { CookieConsentManager } from '@/lib/cookieConsent';

// Simplified validation - only name + phone required
const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name darf maximal 100 Zeichen lang sein'),
  phone: z.string().trim().min(5, 'Bitte gib eine gültige Telefonnummer ein').max(30, 'Telefonnummer darf maximal 30 Zeichen lang sein'),
  honeyPot: z.string().max(0, 'Spam erkannt'),
});

const Landing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    honeyPot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { toast } = useToast();

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({
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
        honeyPot: formData.honeyPot,
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
          license_class: 'b',
          source: 'landingpage-fruehling'
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

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="bg-background py-4 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <img 
            src="/abf-logo.png" 
            alt="ABF Fahrschule Potsdam" 
            className="h-8 w-auto" 
            loading="eager" 
          />
          <a 
            href="tel:+4933196795854" 
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="w-4 h-4" />
            0331 / 967 958 54
          </a>
        </div>
      </header>

      {/* Hero Section - Minimalist */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Copy */}
            <div className="space-y-6">
              {/* Price Anchor */}
              <p className="text-5xl lg:text-6xl font-bold text-primary tracking-tight">
                179 €
              </p>
              
              {/* Headline */}
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Führerschein ab 179 €
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                Theorie, Lern-App, Erste Hilfe & ADAC Mitgliedschaft. Alles inklusive. Gültig bis 30. April 2026.
              </p>
            </div>

            {/* Right: Form */}
            <div id="contact-form" className="lg:pl-8">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </Label>
                  <Input 
                    id="name" 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 h-12 border border-border bg-background text-foreground rounded-md text-base px-4" 
                    placeholder="Vor- und Nachname" 
                    autoComplete="name" 
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Telefon
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    inputMode="tel" 
                    required 
                    value={formData.phone} 
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 h-12 border border-border bg-background text-foreground rounded-md text-base px-4" 
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
                  <div className="py-4 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={privacyConsent} 
                        onChange={e => setPrivacyConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary" 
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        Ich stimme der{' '}
                        <a href="/datenschutz" target="_blank" className="text-foreground underline">
                          Datenschutzerklärung
                        </a>{' '}
                        zu.
                      </span>
                    </label>
                  </div>
                )}

                {/* CTA Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold rounded-md"
                >
                  {isSubmitting ? "Wird gesendet..." : showPrivacyConsent ? "Jetzt absenden" : "Angebot sichern"}
                </Button>

                {/* Trust Text */}
                <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  Kostenlos & unverbindlich. Wir melden uns in 24h.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-12 text-center">
            Das bekommst du für 179 €
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-border rounded-lg p-6 text-center">
              <p className="font-semibold text-foreground mb-1">Theorie komplett</p>
              <p className="text-sm text-muted-foreground">12+2 Unterrichtseinheiten</p>
            </div>
            <div className="border border-border rounded-lg p-6 text-center">
              <p className="font-semibold text-foreground mb-1">Lern-App</p>
              <p className="text-sm text-muted-foreground">Vogel Verlag</p>
            </div>
            <div className="border border-border rounded-lg p-6 text-center">
              <p className="font-semibold text-foreground mb-1">Erste Hilfe Kurs</p>
              <p className="text-sm text-muted-foreground">Vollständig inklusive</p>
            </div>
            <div className="border border-border rounded-lg p-6 text-center">
              <p className="font-semibold text-foreground mb-1">ADAC Mitgliedschaft</p>
              <p className="text-sm text-muted-foreground">1 Jahr kostenlos</p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Fahrstunden (67,50 €/45 Min.) und externe Gebühren (TÜV, Behörde) kommen hinzu.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 border-t border-border bg-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-12 text-center">
            Das sagen unsere Fahrschüler
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <blockquote className="space-y-4">
              <p className="text-foreground leading-relaxed">
                „Ich dachte, Fahrstunden sind stressig. Aber die Lehrer bei ABF sind mega geduldig. Mit der App konnte ich überall lernen."
              </p>
              <footer className="text-sm text-muted-foreground">
                – Lisa, 19 Jahre
              </footer>
            </blockquote>
            
            <blockquote className="space-y-4">
              <p className="text-foreground leading-relaxed">
                „Alle Kosten waren transparent. Keine versteckten Gebühren. Das hat mir als Elternteil sehr geholfen."
              </p>
              <footer className="text-sm text-muted-foreground">
                – Michael, 45 Jahre
              </footer>
            </blockquote>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            4,9 ★ bei Google – 500+ Fahrschüler
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-12 text-center">
            So funktioniert's
          </h2>
          
          <div className="space-y-10">
            <div className="flex gap-6">
              <span className="text-2xl font-bold text-primary">1</span>
              <div>
                <p className="font-semibold text-foreground mb-1">Anmeldung</p>
                <p className="text-muted-foreground">Formular ausfüllen. Wir melden uns in 24h.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <span className="text-2xl font-bold text-primary">2</span>
              <div>
                <p className="font-semibold text-foreground mb-1">Ausbildung</p>
                <p className="text-muted-foreground">Theorie + Fahrstunden flexibel nach deinem Plan.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <span className="text-2xl font-bold text-primary">3</span>
              <div>
                <p className="font-semibold text-foreground mb-1">Prüfung</p>
                <p className="text-muted-foreground">Wir bereiten dich vor. Dann hältst du deinen Schein.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-20 border-t border-border bg-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Bereit? Sicher dir dein Angebot.
          </h2>
          
          <p className="text-muted-foreground mb-8">
            179 € für alles. Gültig bis 30. April 2026. Wir melden uns in 24h.
          </p>
          
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base font-semibold rounded-md"
          >
            Angebot sichern
          </Button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-10 border-t border-border pb-28 md:pb-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <img 
            src="/abf-logo.png" 
            alt="ABF Fahrschule Potsdam" 
            className="h-6 w-auto mx-auto mb-4 opacity-60" 
          />
          <p className="text-sm text-muted-foreground mb-4">
            ABF Fahrschule Potsdam-Babelsberg | Tuchmacherstraße 45b, 14482 Potsdam
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="/impressum" className="hover:text-foreground">Impressum</a>
            <a href="/datenschutz" className="hover:text-foreground">Datenschutz</a>
            <a href="/agb" className="hover:text-foreground">AGB</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden safe-area-inset-bottom">
        <div className="p-4">
          <Button 
            onClick={scrollToForm}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-md font-semibold text-base"
          >
            Angebot sichern
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
