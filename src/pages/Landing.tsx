import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Shield, CheckCircle, Star, ChevronDown, Flower2, Sun, Lock, BookOpen, Smartphone, Heart, Car, ClipboardCheck, Award, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { CookieConsentManager } from '@/lib/cookieConsent';
import CountdownTimer from '@/components/CountdownTimer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Simplified validation - only name + phone required
const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name darf maximal 100 Zeichen lang sein'),
  phone: z.string().trim().min(5, 'Bitte gib eine gültige Telefonnummer ein').max(30, 'Telefonnummer darf maximal 30 Zeichen lang sein'),
  honeyPot: z.string().max(0, 'Spam erkannt'),
});

// Offer end date: April 30, 2026 (Note: April has 30 days, not 31)
const OFFER_END_DATE = new Date('2026-04-30T23:59:59');

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

  const handleWhatsApp = () => {
    window.open('https://wa.me/4915752387583?text=Hallo,%20ich%20möchte%20das%20179€%20Frühjahrs-Angebot%20sichern!', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+4933196795854';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="bg-background py-3 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <img 
            src="/abf-logo.png" 
            alt="ABF Fahrschule Potsdam" 
            className="h-10 w-auto" 
            loading="eager" 
          />
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-cta" />
            <a href="tel:+4933196795854" className="font-semibold text-foreground hover:text-cta">
              0331 / 967 958 54
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Spring Theme */}
      <section id="hero-section" className="relative overflow-hidden">
        {/* Spring gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-spring-green via-spring-green/90 to-cta/80"></div>
        
        {/* Decorative spring elements */}
        <div className="absolute top-10 left-10 text-white/20">
          <Flower2 className="w-24 h-24" />
        </div>
        <div className="absolute bottom-20 right-10 text-white/20">
          <Sun className="w-32 h-32" />
        </div>
        <div className="absolute top-1/2 left-1/4 text-white/10">
          <Flower2 className="w-16 h-16" />
        </div>
        
        <div className="relative z-10 py-8 lg:py-16">
          {/* Countdown Timer Bar */}
          <div className="bg-cta text-cta-foreground py-3 mb-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2">
              <span className="text-sm font-medium">🌸 Frühjahrs-Spezial – Nur bis 30. April 2026!</span>
              <CountdownTimer targetDate={OFFER_END_DATE} className="text-sm" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left: Headlines & Value Proposition */}
              <div className="text-white lg:pr-8">
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6">
                  <Star className="w-4 h-4 fill-current text-yellow-300" />
                  4,9 ★ bei Google – 500+ zufriedene Fahrschüler
                </div>
                
                {/* Price Anchor - BIG & BOLD */}
                <div className="mb-4">
                  <span className="inline-block bg-cta text-cta-foreground text-5xl lg:text-7xl font-black px-6 py-3 rounded-xl shadow-2xl transform -rotate-1">
                    179 €
                  </span>
                </div>
                
                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                  Führerschein Frühjahrs-Spezial
                  <span className="block text-yellow-200">Starte frei in den Frühling!</span>
                </h1>
                
                {/* Value Subheadline */}
                <p className="text-xl lg:text-2xl text-white/90 mb-6 font-medium">
                  Theorie komplett + Lern-App + Erste Hilfe + ADAC 1 Jahr.
                  <span className="block mt-1 text-yellow-200 font-bold">Alles dabei. Nur bis 30. April.</span>
                </p>
                
                {/* Key Benefits - Visual Pills */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-yellow-300" />
                    <span className="font-medium">Geduldige Fahrlehrer</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-yellow-300" />
                    <span className="font-medium">In 4 Wochen fertig</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-yellow-300" />
                    <span className="font-medium">Keine versteckten Kosten</span>
                  </div>
                </div>

                {/* Mobile CTA to scroll */}
                <div className="lg:hidden">
                  <Button 
                    size="lg" 
                    onClick={scrollToForm} 
                    className="w-full bg-cta hover:bg-cta/90 text-cta-foreground text-lg py-6 rounded-xl font-bold shadow-xl"
                  >
                    Ja, 179 € Angebot sichern!
                    <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
                  </Button>
                </div>
              </div>

              {/* Right: Conversion Form */}
              <div id="contact-form" className="bg-card rounded-2xl shadow-2xl p-6 lg:p-8 border-2 border-cta/30">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-cta/10 text-cta px-4 py-2 rounded-full text-sm font-bold mb-3">
                    <Flower2 className="w-4 h-4" />
                    Frühjahrs-Spezial 179 €
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-2">
                    Jetzt Platz sichern!
                  </h2>
                  <p className="text-muted-foreground">
                    Wir melden uns innerhalb von 24 Stunden
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-card-foreground">
                      Dein Name
                    </Label>
                    <Input 
                      id="name" 
                      type="text" 
                      required 
                      value={formData.name} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 h-14 border-2 border-input focus:border-cta rounded-xl text-lg p-4" 
                      placeholder="Vor- und Nachname" 
                      autoComplete="name" 
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-card-foreground">
                      Telefonnummer
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      inputMode="tel" 
                      required 
                      value={formData.phone} 
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 h-14 border-2 border-input focus:border-cta rounded-xl text-lg p-4" 
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
                    <div className="bg-muted/50 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={privacyConsent} 
                          onChange={e => setPrivacyConsent(e.target.checked)}
                          className="mt-1 h-5 w-5 rounded border-input text-cta focus:ring-cta" 
                        />
                        <span className="text-sm text-muted-foreground leading-tight">
                          Ich stimme der{' '}
                          <a href="/datenschutz" target="_blank" className="text-primary underline font-medium">
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
                    className="w-full bg-cta hover:bg-cta/90 text-cta-foreground h-16 text-xl font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  >
                    {isSubmitting ? "Wird gesendet..." : showPrivacyConsent ? "Jetzt absenden" : "Ja, 179 € Angebot sichern!"}
                  </Button>

                  {/* Trust Elements */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                    <Lock className="w-4 h-4 text-spring-green" />
                    <span>Kostenlos & unverbindlich. Wir melden uns in 24h.</span>
                  </div>
                </form>

                {/* Alternative Contact */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                  <Button 
                    onClick={handleWhatsApp} 
                    variant="outline" 
                    className="flex-1 border-spring-green text-spring-green hover:bg-spring-green hover:text-spring-green-foreground h-12 font-semibold rounded-xl"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                  <Button 
                    onClick={handleCall} 
                    variant="outline" 
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-12 font-semibold rounded-xl"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Anrufen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Communication Section */}
      <section className="py-16 bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Das bekommst du für 179 €
            </h2>
            <p className="text-lg text-muted-foreground">
              Komplett transparent – keine versteckten Gebühren
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-spring-green/10 to-spring-green/5 border-2 border-spring-green/20 rounded-2xl p-6 text-center hover:border-spring-green/50 transition-colors">
              <div className="bg-spring-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-spring-green" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Theorie komplett</h3>
              <p className="text-sm text-muted-foreground">12+2 Unterrichtseinheiten</p>
            </div>

            <div className="bg-gradient-to-br from-cta/10 to-cta/5 border-2 border-cta/20 rounded-2xl p-6 text-center hover:border-cta/50 transition-colors">
              <div className="bg-cta/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-cta" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Lern-App</h3>
              <p className="text-sm text-muted-foreground">Vogel Verlag – überall lernen</p>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-2 border-red-500/20 rounded-2xl p-6 text-center hover:border-red-500/50 transition-colors">
              <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Erste-Hilfe-Kurs</h3>
              <p className="text-sm text-muted-foreground">Zusätzlich inklusive</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/20 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-colors">
              <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">ADAC Mitgliedschaft</h3>
              <p className="text-sm text-muted-foreground">1 Jahr kostenlos</p>
            </div>
          </div>

          <div className="mt-8 bg-muted rounded-xl p-6">
            <p className="text-center text-sm text-muted-foreground">
              <strong className="text-foreground">Transparente Zusatzkosten:</strong> Fahrstunden 67,50 €/45 Min. | Besondere Ausbildungsfahrten 75 €/45 Min. | Prakt. Prüfung 189 €
            </p>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Externe Gebühren (TÜV, Behörde) werden separat berechnet.{' '}
              <a href="/preise" className="underline hover:text-foreground">Vollständige Preisliste ansehen</a>
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Das sagen unsere Fahrschüler
            </h2>
            <div className="inline-flex items-center gap-2 text-cta">
              <span className="text-2xl">★★★★★</span>
              <span className="font-bold">4,9 bei Google Maps</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-1 text-cta mb-3">★★★★★</div>
              <p className="text-muted-foreground mb-4 italic">
                „Ich dachte, Fahrstunden sind stressig. Aber die Fahrlehrer bei ABF sind mega geduldig. Mit der App konnte ich überall lernen. Nach 6 Wochen hatte ich meinen Schein!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-spring-green/20 flex items-center justify-center text-spring-green font-bold">
                  L
                </div>
                <div>
                  <p className="font-semibold text-foreground">Lisa M.</p>
                  <p className="text-xs text-muted-foreground">19 Jahre, Studentin</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-1 text-cta mb-3">★★★★★</div>
              <p className="text-muted-foreground mb-4 italic">
                „Super Fahrschule! Alles war von Anfang an klar – keine Überraschungen bei den Kosten. Die Theorie macht sogar Spaß und die Fahrlehrer sind top!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cta/20 flex items-center justify-center text-cta font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold text-foreground">Max K.</p>
                  <p className="text-xs text-muted-foreground">18 Jahre, Azubi</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-center gap-1 text-cta mb-3">★★★★★</div>
              <p className="text-muted-foreground mb-4 italic">
                „Als Mutter war mir wichtig, dass meine Tochter gut aufgehoben ist. Die ABF Fahrschule hat das perfekt gemacht – sichere Ausbildung und faire Preise."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sandra H.</p>
                  <p className="text-xs text-muted-foreground">Mutter von Julia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a 
              href="https://maps.google.com/?q=ABF+Fahrschule+Potsdam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Alle Bewertungen auf Google Maps lesen →
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              * Bewertungen von echten Fahrschülern auf Google Maps (§ 5b Abs. 3 UWG)
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              So einfach geht's
            </h2>
            <p className="text-lg text-muted-foreground">
              In 3 Schritten zum Führerschein
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-cta to-cta/80 text-cta-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">Anmeldung</h3>
              <p className="text-muted-foreground">
                Formular ausfüllen oder anrufen – wir melden uns und kümmern uns um alles.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-spring-green to-spring-green/80 text-spring-green-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">Ausbildung</h3>
              <p className="text-muted-foreground">
                Theorie + Fahrstunden flexibel nach deinem Zeitplan. Moderne App zum Lernen.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">Führerschein!</h3>
              <p className="text-muted-foreground">
                Optimal vorbereitet zur Prüfung – dann hältst du deinen Führerschein in der Hand!
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-cta hover:bg-cta/90 text-cta-foreground text-lg px-10 py-6 rounded-xl font-bold shadow-xl"
            >
              Jetzt 179 € Angebot sichern
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Deine Fragen – unsere Antworten
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="anmeldung" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-cta flex-shrink-0" />
                  Wie melde ich mich an?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Ganz einfach! Fülle das Formular oben aus oder ruf uns an. Wir melden uns innerhalb von 24 Stunden bei dir und kümmern uns um alles – von der Anmeldung bis zur Prüfung.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="raten" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-cta flex-shrink-0" />
                  Kann ich in Raten zahlen?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Ja, natürlich! Sprich uns einfach an – wir finden gemeinsam eine faire Lösung, die zu deinem Budget passt. Niemand soll wegen Geld auf den Führerschein verzichten müssen.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="b197" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-cta flex-shrink-0" />
                  Was ist B197 (Automatik + Schaltung)?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Mit B197 lernst du hauptsächlich auf Automatik (einfacher!), machst zusätzlich 10 Schaltstunden + eine kurze Testfahrt – und darfst danach beide Fahrzeugtypen fahren. Modern, flexibel und stressfreier!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dauer" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-cta flex-shrink-0" />
                  Wie lange dauert die Ausbildung?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Bei uns schaffst du den Führerschein in etwa 4-8 Wochen – je nachdem, wie viel Zeit du hast. Wir passen uns flexibel an deinen Zeitplan an. Schneller geht's kaum!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="start" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-cta flex-shrink-0" />
                  Wann kann ich starten?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Sofort! Unsere Theorie-Kurse starten laufend. Nach der Anmeldung kannst du direkt mit der App lernen und in den nächsten Theorieunterricht einsteigen. Je früher du anfängst, desto schneller fährst du!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-spring-green via-spring-green/90 to-cta/80"></div>
        <div className="absolute top-10 right-10 text-white/10">
          <Flower2 className="w-32 h-32" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
          <div className="mb-6">
            <span className="inline-block bg-cta text-cta-foreground text-4xl lg:text-5xl font-black px-6 py-3 rounded-xl shadow-2xl">
              179 €
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Bereit, frei in den Frühling zu starten?
          </h2>
          
          <p className="text-xl text-white/90 mb-6">
            Sicher dir jetzt deinen Platz. Angebot gültig bis 30. April 2026.
          </p>

          <CountdownTimer targetDate={OFFER_END_DATE} className="justify-center mb-8" />
          
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="bg-cta hover:bg-cta/90 text-cta-foreground text-xl px-12 py-7 rounded-xl font-bold shadow-xl"
          >
            Ja, 179 € Angebot sichern!
          </Button>

          <p className="mt-6 text-sm text-white/80">
            🔒 Kostenlos & unverbindlich • Über 500 zufriedene Fahrschüler
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-foreground text-background py-8 pb-28 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img 
            src="/abf-logo.png" 
            alt="ABF Fahrschule Potsdam" 
            className="h-10 w-auto mx-auto mb-4 invert" 
          />
          <p className="text-sm text-background/70 mb-4">
            ABF Fahrschule Potsdam-Babelsberg | Tuchmacherstraße 45b, 14482 Potsdam
          </p>
          <div className="flex justify-center gap-6 text-sm text-background/70">
            <a href="/impressum" className="hover:text-background">Impressum</a>
            <a href="/datenschutz" className="hover:text-background">Datenschutz</a>
            <a href="/agb" className="hover:text-background">AGB</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-cta shadow-2xl z-50 md:hidden safe-area-inset-bottom">
        <div className="p-3">
          <Button 
            onClick={scrollToForm}
            className="w-full bg-cta hover:bg-cta/90 text-cta-foreground py-4 rounded-xl font-bold text-lg shadow-lg"
          >
            Ja, 179 € Angebot sichern!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
