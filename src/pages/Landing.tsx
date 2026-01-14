import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Shield, Clock, Users, CheckCircle, Star, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { CookieConsentManager } from '@/lib/cookieConsent';
const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name darf maximal 100 Zeichen lang sein'),
  contact: z.string().trim().min(5, 'Bitte gib eine gültige Telefonnummer ein').max(30, 'Telefonnummer darf maximal 30 Zeichen lang sein'),
  licenseClass: z.enum(['b', 'a1', 'a2', 'a', 'be'], {
    errorMap: () => ({
      message: 'Ungültige Führerscheinklasse'
    })
  }),
  honeyPot: z.string().max(0, 'Spam erkannt'),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'Bitte stimme der Datenschutzerklärung zu'
  }),
  agbConsent: z.boolean().refine(val => val === true, {
    message: 'Bitte stimme den AGB zu'
  })
});
const Landing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    licenseClass: 'b',
    honeyPot: '',
    privacyConsent: false,
    agbConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setShowStickyButton(heroBottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = leadSchema.safeParse({
        name: formData.name,
        contact: formData.contact,
        licenseClass: formData.licenseClass,
        honeyPot: formData.honeyPot,
        privacyConsent: formData.privacyConsent,
        agbConsent: formData.agbConsent
      });
      if (!result.success) {
        toast({
          title: "Ungültige Eingabe",
          description: result.error.errors[0].message,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Submit via edge function with rate limiting
      const response = await fetch('https://jxxhrldcmwjnjqfpfeti.supabase.co/functions/v1/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.contact,
          license_class: formData.licenseClass,
          source: 'landingpage'
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
    window.open('https://wa.me/4915752387583', '_blank');
  };
  const handleCall = () => {
    window.location.href = 'tel:+4933196795854';
  };
  return <div className="min-h-screen bg-background">
      {/* Minimal Header - Logo Only */}
      <header className="bg-background py-3 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <img src="/abf-logo.png" alt="Fahrschule ABF Potsdam-Babelsberg" className="h-10 w-auto" loading="eager" />
        </div>
      </header>

      {/* Hero Section with Form */}
      <section id="hero-section" className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-10 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full -translate-y-36 translate-x-36"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Headlines & Pain/Pleasure Copy */}
            <div className="lg:pr-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Star className="w-4 h-4 fill-current" />
                4,9 ★ bei Google – 500+ Fahrschüler
              </div>
              
              {/* Main Headline - Emotional & Result-Oriented */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                In 4 Wochen zum Führerschein –{' '}
                <span className="text-accent">stressfrei, günstig & persönlich.</span>
              </h1>
              
              {/* Subheadline for Parents */}
              
              
              {/* Pain Points (Hormozi Style) */}
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-primary-foreground/20">
                <p className="text-primary-foreground/90 italic mb-3">
                  „Wartelisten, teure Überraschungen und gestresste Fahrlehrer?"
                </p>
                <p className="text-accent font-bold text-lg">
                  Nicht bei uns. Bestehe beim ersten Versuch – ohne Prüfungsangst oder Chaosplanung.
                </p>
              </div>
              
              {/* Key Benefits - Quick Scan */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                
                
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">Theorie + Erste Hilfe inkl.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">Geduldige Fahrlehrer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">B197 Automatik + Schaltung</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">Ratenzahlung möglich</span>
                </div>
              </div>

              {/* Mobile: CTA Button to scroll to form */}
              <div className="lg:hidden">
                <Button size="lg" onClick={scrollToForm} className="w-full bg-cta hover:bg-cta/90 text-cta-foreground text-lg py-6 rounded-xl font-bold shadow-xl">
                  Jetzt unverbindlich anmelden
                  <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
                </Button>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div id="contact-form" className="bg-card rounded-2xl shadow-2xl p-6 lg:p-8 border border-border">
              <div className="text-center mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-card-foreground mb-2">
                  Kostenlose Beratung anfragen
                </h2>
                <p className="text-muted-foreground text-sm">
                  Wir melden uns innerhalb von 24 Stunden
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-card-foreground">
                    Dein Name *
                  </Label>
                  <Input id="name" type="text" required value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="mt-1.5 h-12 border-2 border-input focus:border-primary rounded-lg text-base" placeholder="Vor- und Nachname" />
                </div>

                {/* Phone Field */}
                <div>
                  <Label htmlFor="contact" className="text-sm font-semibold text-card-foreground">
                    Telefonnummer *
                  </Label>
                  <Input id="contact" type="tel" required value={formData.contact} onChange={e => setFormData({
                  ...formData,
                  contact: e.target.value
                })} className="mt-1.5 h-12 border-2 border-input focus:border-primary rounded-lg text-base" placeholder="0151 12345678" />
                </div>

                {/* License Class Dropdown - Preselected B */}
                <div>
                  <Label htmlFor="license" className="text-sm font-semibold text-card-foreground">
                    Führerscheinklasse
                  </Label>
                  <Select value={formData.licenseClass} onValueChange={value => setFormData({
                  ...formData,
                  licenseClass: value
                })}>
                    <SelectTrigger className="mt-1.5 h-12 border-2 border-input focus:border-primary rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="b">Klasse B (PKW)</SelectItem>
                      <SelectItem value="a1">Klasse A1 (Motorrad 125ccm)</SelectItem>
                      <SelectItem value="a2">Klasse A2 (Motorrad 35kW)</SelectItem>
                      <SelectItem value="a">Klasse A (Motorrad)</SelectItem>
                      <SelectItem value="be">Klasse BE (PKW + Anhänger)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <Input type="text" tabIndex={-1} autoComplete="off" value={formData.honeyPot} onChange={e => setFormData({
                  ...formData,
                  honeyPot: e.target.value
                })} />
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.privacyConsent} onChange={e => setFormData({
                    ...formData,
                    privacyConsent: e.target.checked
                  })} className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary" required />
                    <span className="text-xs text-muted-foreground leading-tight">
                      Ich stimme der{' '}
                      <a href="/datenschutz" target="_blank" className="text-primary underline">Datenschutzerklärung</a> zu. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.agbConsent} onChange={e => setFormData({
                    ...formData,
                    agbConsent: e.target.checked
                  })} className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary" required />
                    <span className="text-xs text-muted-foreground leading-tight">
                      Ich habe die <a href="/agb" target="_blank" className="text-primary underline">AGB</a> gelesen und stimme zu. *
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-cta hover:bg-cta/90 text-cta-foreground h-14 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50">
                  {isSubmitting ? "Wird gesendet..." : "Jetzt unverbindlich anmelden"}
                </Button>

                {/* Trust Text */}
                <div className="text-center space-y-1 pt-2">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-accent" />
                    Deine Daten sind sicher & werden niemals weitergegeben.
                  </div>
                  <p className="text-xs text-muted-foreground">Unverbindlich & kostenlos.</p>
                </div>
              </form>

              {/* Alternative Contact */}
              <div className="flex gap-3 mt-4">
                <Button onClick={handleWhatsApp} variant="outline" className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground h-11 font-semibold rounded-lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button onClick={handleCall} variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11 font-semibold rounded-lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Anrufen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-foreground">
            Das sagen unsere Fahrschüler
          </h2>
          <p className="text-center text-xs text-muted-foreground mb-8">
            <a href="https://maps.google.com/?q=ABF+Fahrschule+Potsdam" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              Verifizierte Bewertungen über Google Maps
            </a>
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-5 shadow-lg border border-border">
              <div className="flex text-cta text-lg mb-3">★★★★★</div>
              <p className="text-card-foreground mb-4 text-sm italic">
                "Ich hab meinen Führerschein beim ersten Anlauf geschafft! Die Fahrlehrer bei ABF sind super geduldig und erklären alles perfekt."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">M</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Max, 19</p>
                  <p className="text-xs text-muted-foreground">Klasse B</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-5 shadow-lg border border-border">
              <div className="flex text-cta text-lg mb-3">★★★★★</div>
              <p className="text-card-foreground mb-4 text-sm italic">
                "Die Lern-App ist mega praktisch! Nach nur 6 Wochen hatte ich meinen Schein – schneller als gedacht!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">L</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Lisa, 20</p>
                  <p className="text-xs text-muted-foreground">Klasse B197</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-5 shadow-lg border border-border">
              <div className="flex text-cta text-lg mb-3">★★★★★</div>
              <p className="text-card-foreground mb-4 text-sm italic">
                "Als Mutter war mir wichtig, dass mein Sohn gut aufgehoben ist. ABF hat alles super organisiert – volle Empfehlung!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">S</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Sandra, 48</p>
                  <p className="text-xs text-muted-foreground">Mutter von Tim</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="https://maps.google.com/?q=ABF+Fahrschule+Potsdam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow hover:shadow-md transition-shadow">
              <div className="flex text-cta">★★★★★</div>
              <span className="font-semibold text-card-foreground">4,9 / 5</span>
              <span className="text-muted-foreground text-sm">bei Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-3 text-foreground">
            Das bekommst du für 479 € Grundbetrag
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Alles für deinen Führerschein-Start – transparent nach § 32 FahrlG
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary transition-colors">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-card-foreground mb-1">Theorie komplett</h3>
              <p className="text-xs text-muted-foreground">12+2 Unterrichtseinheiten</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary transition-colors">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-bold text-card-foreground mb-1">Lern-App</h3>
              <p className="text-xs text-muted-foreground">Vogel Verlag</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary transition-colors">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚑</span>
              </div>
              <h3 className="font-bold text-card-foreground mb-1">Erste-Hilfe-Kurs</h3>
              <p className="text-xs text-muted-foreground">Inklusive</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary transition-colors">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="font-bold text-card-foreground mb-1">ADAC Mitgliedschaft</h3>
              <p className="text-xs text-muted-foreground">1 Jahr kostenlos</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary transition-colors col-span-2 lg:col-span-1">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-bold text-card-foreground mb-1">Theorieprüfung</h3>
              <p className="text-xs text-muted-foreground">Vorstellung inkl.</p>
            </div>
          </div>

          <div className="mt-6 bg-muted/50 rounded-lg p-4">
            <p className="text-center text-sm text-muted-foreground">
              <strong>Zusätzliche Kosten:</strong> Fahrstunden ab 69 €/45 Min. | Sonderfahrten 79 €/45 Min. | Prakt. Prüfung 189 €
            </p>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Externe Gebühren (TÜV, Behörde) werden separat berechnet. <a href="/preise" className="underline hover:text-foreground">Vollständige Preisliste</a>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-foreground">
            So einfach geht's
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-cta text-cta-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Anmeldung</h3>
              <p className="text-sm text-muted-foreground">
                Formular ausfüllen – wir melden uns bei dir und kümmern uns um alles.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-cta text-cta-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Ausbildung</h3>
              <p className="text-sm text-muted-foreground">
                Theorie + Fahrstunden flexibel nach deinem Zeitplan.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-cta text-cta-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Prüfung bestehen</h3>
              <p className="text-sm text-muted-foreground">
                Wir bereiten dich optimal vor – dann hältst du deinen Führerschein!
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" onClick={scrollToForm} className="bg-cta hover:bg-cta/90 text-cta-foreground text-lg px-10 py-6 rounded-xl font-bold shadow-xl">
              Jetzt starten – unverbindlich anfragen
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-foreground">
            Häufige Fragen
          </h2>
          
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-bold text-card-foreground mb-2">Wie melde ich mich an?</h3>
              <p className="text-sm text-muted-foreground">
                Einfach Formular ausfüllen oder anrufen – wir kümmern uns um alles Weitere.
              </p>
            </div>

            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-bold text-card-foreground mb-2">Kann ich in Raten zahlen?</h3>
              <p className="text-sm text-muted-foreground">
                Ja! Sprich uns an – wir finden eine faire Lösung, die zu dir passt.
              </p>
            </div>

            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-bold text-card-foreground mb-2">Was ist B197 (Automatik + Schaltung)?</h3>
              <p className="text-sm text-muted-foreground">
                Du lernst auf Automatik, machst 10 Schaltstunden + Testfahrt und darfst beide fahren. Modern & flexibel!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Bereit, in 4 Wochen mobil zu sein?
          </h2>
          <p className="text-lg mb-6 text-primary-foreground/90">
            Jetzt Platz sichern – Ausbildung startet laufend!
          </p>
          
          <Button size="lg" onClick={scrollToForm} className="bg-cta hover:bg-cta/90 text-cta-foreground text-xl px-12 py-6 rounded-xl font-bold shadow-xl">
            Jetzt unverbindlich anmelden
          </Button>

          <p className="mt-4 text-sm text-primary-foreground/80">
            Über 500 zufriedene Fahrschüler vertrauen uns bereits
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-muted py-6 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-2">
            ABF Fahrschule Potsdam-Babelsberg | Tuchmacherstraße 45b, 14482 Potsdam
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <a href="/impressum" className="hover:text-foreground">Impressum</a>
            <a href="/datenschutz" className="hover:text-foreground">Datenschutz</a>
            <a href="/agb" className="hover:text-foreground">AGB</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      {showStickyButton && <div className="fixed bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur border-t border-border lg:hidden z-50 shadow-2xl">
          <Button size="lg" onClick={scrollToForm} className="w-full bg-cta hover:bg-cta/90 text-cta-foreground text-lg py-5 rounded-xl font-bold shadow-lg">
            Jetzt unverbindlich anmelden
          </Button>
        </div>}
    </div>;
};
export default Landing;