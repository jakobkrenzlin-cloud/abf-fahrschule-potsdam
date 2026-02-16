import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Phone, MessageCircle, CheckCircle, Star, ChevronDown, Flower2, Sun, Lock, BookOpen, Smartphone, Heart, Car, HelpCircle, ArrowDown, CalendarDays, Clock, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { CookieConsentManager } from '@/lib/cookieConsent';
import CountdownTimer from '@/components/CountdownTimer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Simplified validation - only name + phone required
const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name darf maximal 100 Zeichen lang sein'),
  phone: z.string().trim().min(5, 'Bitte gib eine gültige Telefonnummer ein').max(30, 'Telefonnummer darf maximal 30 Zeichen lang sein'),
  honeyPot: z.string().max(0, 'Spam erkannt')
});

// Offer end date: April 30, 2026
const OFFER_END_DATE = new Date('2026-04-30T23:59:59');

const Landing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    honeyPot: '',
    crashkurs: false
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
          license_class: 'b',
          source: 'landingpage-fruehling',
          message: formData.crashkurs ? 'Interesse am Crashkurs März 2026' : undefined
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
    window.open('https://wa.me/4915752387583?text=Hallo,%20ich%20möchte%20das%20279€%20Frühjahrs-Angebot%20sichern!', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+4933196795854';
  };

  // Inline CTA Component - Blue theme matching motorrad page
  const InlineCTA = ({ text }: {text: string;}) =>
  <div className="py-6 sm:py-10 bg-gradient-to-r from-[#2a4a7f] to-black">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-white text-base sm:text-lg lg:text-xl font-semibold text-center sm:text-left">
          {text}
        </p>
        <Button onClick={scrollToForm} size="lg" className="bg-[#3b5998] hover:bg-[#4a6cb3] text-white font-bold rounded-xl px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg whitespace-nowrap transition-all hover:scale-105 w-full sm:w-auto">
          Jetzt Platz sichern
          <ArrowDown className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
        </Button>
      </div>
    </div>;


  return (
    <>
      <Helmet>
        <title>Fahrschule Potsdam | Führerschein Klasse B ab 279€ | ABF</title>
        <meta name="description" content="Führerschein machen in Potsdam? ABF Fahrschule bietet Klasse B ab 279€ inkl. Theorie, Erste Hilfe & Lern-App. Jetzt Platz sichern!" />
      </Helmet>
      
      <div className="min-h-screen bg-black">
        {/* Minimal Header - Blue gradient theme */}
        <header className="bg-gradient-to-r from-[#1a2d4a] to-black py-3 border-b border-[#3b5998]/30">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <img src="/abf-logo.png" alt="ABF Fahrschule Potsdam" className="h-12 w-auto" loading="eager" />
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+4933196795854" className="flex items-center gap-2 text-white hover:text-[#6d8fd4] transition-colors">
                <Phone className="w-4 h-4 text-[#3b5998]" />
                <span className="font-semibold">0331 / 967 958 54</span>
              </a>
              <Button onClick={scrollToForm} size="sm" className="bg-[#3b5998] hover:bg-[#4a6cb3] text-white font-semibold rounded-lg">
                Jetzt anmelden
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section - Dark Blue Theme */}
        <section id="hero-section" className="relative overflow-hidden bg-gradient-to-br from-black via-[#0a1628] to-black">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 text-[#3b5998]/10">
            <Flower2 className="w-24 h-24" />
          </div>
          <div className="absolute bottom-20 right-10 text-[#3b5998]/10">
            <Sun className="w-32 h-32" />
          </div>
          
          <div className="relative z-10 py-8 lg:py-16">
            {/* Countdown Timer Bar */}
            <div className="bg-[#3b5998] text-white py-3 mb-6">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2">
                <span className="text-sm font-medium"> Frühjahrs-Spezial – Nur bis 30. April 2026!</span>
                <CountdownTimer targetDate={OFFER_END_DATE} className="text-sm" />
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left: Headlines & Value Proposition */}
                <div className="lg:pr-8">
                  {/* Trust Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 px-4 py-2 rounded-full text-sm font-bold mb-6 text-white">
                    <Star className="w-4 h-4 fill-current text-[#6d8fd4]" />
                    4,9 ★ bei Google – 500+ zufriedene Fahrschüler
                  </div>
                  
                  {/* Price Anchor - BIG & BOLD */}
                  <div className="mb-4">
                    <span className="inline-block text-[#6d8fd4] text-5xl lg:text-7xl font-black">179 €</span>
                  </div>
                  
                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white">
                    Deine Fahrschule in Potsdam
                    <span className="block text-[#6d8fd4]">Führerschein Klasse B in 4 Wochen</span>
                  </h1>
                  
                  {/* SEO-optimized intro paragraph */}
                  <p className="text-xl lg:text-2xl text-neutral-300 mb-6 font-medium">
                    Willkommen bei der ABF Fahrschule in Potsdam! Mache jetzt deinen Führerschein Klasse B in nur 4 Wochen – mit Theorie, Lern-App, Erste Hilfe & ADAC.
                    <span className="block mt-1 text-[#6d8fd4] font-bold">Frühjahrs-Spezial nur bis 30. April!</span>
                  </p>
                  
                  {/* Key Benefits - Visual Pills */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 rounded-full px-4 py-2 text-white">
                      <CheckCircle className="w-5 h-5 text-[#6d8fd4]" />
                      <span className="font-medium">Geduldige Fahrlehrer</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 rounded-full px-4 py-2 text-white">
                      <CheckCircle className="w-5 h-5 text-[#6d8fd4]" />
                      <span className="font-medium">In 4 Wochen fertig</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 rounded-full px-4 py-2 text-white">
                      <CheckCircle className="w-5 h-5 text-[#6d8fd4]" />
                      <span className="font-medium">Keine versteckten Kosten</span>
                    </div>
                  </div>

                  {/* Social Proof - Successful Students Avatars */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex -space-x-2">
                      <img src="/lovable-uploads/3bdfd6a0-7166-40d9-8196-2bbd6a98655d.png" alt="Erfolgreiche Fahrschülerin" className="w-8 h-8 rounded-full border-2 border-[#3b5998] object-cover" loading="eager" decoding="async" />
                      <img src="/lovable-uploads/753c5aba-03ff-465a-aa50-7ea8dc8b796b.png" alt="Erfolgreiche Fahrschülerinnen" className="w-8 h-8 rounded-full border-2 border-[#3b5998] object-cover" loading="eager" decoding="async" />
                      <img src="/lovable-uploads/eca56e27-4a5a-47dc-925b-7e8a54a01629.png" alt="Bestandene Prüfung" className="w-8 h-8 rounded-full border-2 border-[#3b5998] object-cover" loading="eager" decoding="async" />
                      <img src="/lovable-uploads/8c2d1108-a7d1-4072-b602-eb0f992cd15d.png" alt="Motorradschüler" className="w-8 h-8 rounded-full border-2 border-[#3b5998] object-cover" loading="eager" decoding="async" />
                    </div>
                    <span className="text-sm text-neutral-400">Diese Fahrschüler haben bestanden</span>
                  </div>

                  {/* Mobile CTA to scroll */}
                  <div className="lg:hidden">
                    <Button size="lg" onClick={scrollToForm} className="w-full bg-[#3b5998] hover:bg-[#4a6cb3] text-white text-lg py-6 rounded-xl font-bold shadow-lg">
                      Ja, 279 € Angebot sichern!
                      <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
                    </Button>
                  </div>
                </div>

                {/* Right: Conversion Form */}
                <div id="contact-form" className="bg-neutral-900 rounded-2xl shadow-xl p-6 lg:p-8 border border-[#3b5998]/30">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-[#3b5998]/20 text-[#6d8fd4] px-4 py-2 rounded-full text-sm font-bold mb-3">Frühjahrs-Spezial 179 €
                      <Flower2 className="w-4 h-4" />
                      Frühjahrs-Spezial 279 €
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      Jetzt Platz sichern!
                    </h2>
                    <p className="text-neutral-400">
                      Wir melden uns innerhalb von 24 Stunden
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold text-neutral-300">
                        Dein Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1.5 h-14 border border-[#3b5998]/30 bg-neutral-800 text-white focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-lg p-4 placeholder:text-neutral-500"
                        placeholder="Vor- und Nachname"
                        autoComplete="name" />

                    </div>

                    {/* Phone Field */}
                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-neutral-300">
                        Telefonnummer
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5 h-14 border border-[#3b5998]/30 bg-neutral-800 text-white focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-lg p-4 placeholder:text-neutral-500"
                        placeholder="0151 12345678"
                        autoComplete="tel" />

                    </div>

                    {/* Crashkurs Interest Checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/40 rounded-xl p-4">
                      <input
                        type="checkbox"
                        checked={formData.crashkurs}
                        onChange={(e) => setFormData({ ...formData, crashkurs: e.target.checked })}
                        className="mt-0.5 h-5 w-5 rounded border-orange-400 text-orange-500 focus:ring-orange-500 bg-neutral-700"
                      />
                      <div>
                        <span className="text-sm font-semibold text-orange-300">
                          🔥 Ich interessiere mich für den Crashkurs im März
                        </span>
                        <span className="block text-xs text-neutral-400 mt-1">
                          04.–11. März 2026 | Täglich 16:30–19:30 Uhr
                        </span>
                      </div>
                    </label>

                    {/* Honeypot - Hidden */}
                    <div className="hidden" aria-hidden="true">
                      <Input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeyPot}
                        onChange={(e) => setFormData({ ...formData, honeyPot: e.target.value })} />

                    </div>

                    {/* Privacy Consent - Shows after first click */}
                    {showPrivacyConsent &&
                    <div className="bg-neutral-800 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                          type="checkbox"
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-1 h-5 w-5 rounded border-neutral-600 text-[#3b5998] focus:ring-[#3b5998] bg-neutral-700" />

                          <span className="text-sm text-neutral-300 leading-tight">
                            Ich stimme der{' '}
                            <a href="/datenschutz" target="_blank" className="text-[#6d8fd4] underline font-medium hover:text-[#8aa8e0]">
                              Datenschutzerklärung
                            </a>{' '}
                            zu und bin damit einverstanden, dass mich ABF Fahrschule kontaktiert.
                          </span>
                        </label>
                      </div>
                    }

                    {/* CTA Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-[#3b5998] hover:bg-[#4a6cb3] text-white h-16 text-xl font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50">Ja, 179 € Angebot sichern!

                      {isSubmitting ? "Wird gesendet..." : showPrivacyConsent ? "Jetzt absenden" : "Ja, 279 € Angebot sichern!"}
                    </Button>

                    {/* Trust Elements */}
                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-400 pt-2">
                      <Lock className="w-4 h-4 text-[#6d8fd4]" />
                      <span>Kostenlos & unverbindlich. Wir melden uns in 24h.</span>
                    </div>
                  </form>

                  {/* Alternative Contact */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-[#3b5998]/30">
                    <Button onClick={handleWhatsApp} variant="outline" className="flex-1 border-green-500 text-green-400 hover:bg-green-500/10 h-12 font-semibold rounded-xl bg-transparent">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                    <Button onClick={handleCall} variant="outline" className="flex-1 border-[#3b5998] text-[#6d8fd4] hover:bg-[#3b5998]/10 h-12 font-semibold rounded-xl bg-transparent">
                      <Phone className="w-5 h-5 mr-2" />
                      Anrufen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Crash Course Banner */}
        <section className="py-8 md:py-12 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="relative z-10 max-w-5xl mx-auto px-4">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full border border-white/30">
                <AlertTriangle className="w-4 h-4" />
                Begrenzte Plätze verfügbar
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center mb-3 leading-tight">
              Nächster Theorie-Crashkurs: In nur 7 Tagen zum Erfolg!
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-5">
              <div className="flex items-center gap-2 text-white">
                <CalendarDays className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                <span className="text-lg sm:text-xl font-bold text-yellow-300">04. März bis 11. März 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                <span className="text-base sm:text-lg font-semibold">Täglich 2 Themen, 16:30 – 19:30 Uhr</span>
              </div>
            </div>
            <div className="flex justify-center mb-5">
              <Button onClick={scrollToForm} size="lg" className="bg-white text-red-600 hover:bg-yellow-50 text-lg font-bold px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-105">
                Jetzt Platz für März sichern
              </Button>
            </div>
            <p className="text-center text-xs sm:text-sm text-white/80 max-w-3xl mx-auto leading-relaxed">
              Preise gemäß § 32 Fahrlehrergesetz: Unterweisungsstunde 67,50 €/45 Min., Übungsstunde 67,50 €/45 Min. und Besondere Ausbildungsfahrten 75 €/45 Min.
            </p>
          </div>
        </section>

        {/* CTA after Hero */}
        <InlineCTA text="Nur noch wenige Plätze für das Frühjahrs-Spezial verfügbar!" />

        {/* Value Communication Section */}
        <section className="py-16 bg-gradient-to-b from-black to-[#0a1628]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                Das bekommst du für <span className="text-[#6d8fd4]">179 €</span>
              </h2>
              <p className="text-lg text-neutral-400">
                Komplett transparent – keine versteckten Gebühren
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-6 text-center hover:border-[#3b5998] transition-colors">
                <div className="bg-[#3b5998]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-[#6d8fd4]" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Theorie komplett</h3>
                <p className="text-sm text-neutral-400">12+2 Unterrichtseinheiten</p>
              </div>

              <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-6 text-center hover:border-[#3b5998] transition-colors">
                <div className="bg-[#3b5998]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-[#6d8fd4]" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Lern-App</h3>
                <p className="text-sm text-neutral-400">Vogel Verlag – überall lernen</p>
              </div>

              <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-6 text-center hover:border-[#3b5998] transition-colors">
                <div className="bg-[#3b5998]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-[#6d8fd4]" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Erste-Hilfe-Kurs</h3>
                <p className="text-sm text-neutral-400">Zusätzlich inklusive</p>
              </div>

              <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-6 text-center hover:border-[#3b5998] transition-colors">
                <div className="bg-[#3b5998]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-[#6d8fd4]" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">ADAC Mitgliedschaft</h3>
                <p className="text-sm text-neutral-400">1 Jahr kostenlos</p>
              </div>
            </div>

            <div className="mt-8 bg-neutral-900/50 border border-[#3b5998]/20 rounded-xl p-6">
              <p className="text-center text-sm text-neutral-400">
                <strong className="text-white">Transparente Zusatzkosten:</strong> Fahrstunden 67,50 €/45 Min. | Besondere Ausbildungsfahrten 75 €/45 Min. | Prakt. Prüfung 189 €
              </p>
              <p className="text-center text-xs text-neutral-500 mt-2">
                Externe Gebühren (TÜV, Behörde) werden separat berechnet.{' '}
                <a href="/preise" className="text-[#6d8fd4] underline hover:text-[#8aa8e0]">Vollständige Preisliste ansehen</a>
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-[#0a1628]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                Das sagen unsere Fahrschüler
              </h2>
              <div className="inline-flex items-center gap-2 text-[#6d8fd4]">
                <span className="text-2xl">★★★★★</span>
                <span className="font-bold">5 Sterne bei Google Maps</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-neutral-900 rounded-2xl p-6 border border-[#3b5998]/30">
                <div className="flex items-center gap-1 text-[#6d8fd4] mb-3">★★★★★</div>
                <p className="text-neutral-300 mb-4 italic">Ich Hab bis Heute Da Fahrschule gehabt hatte Heute Meine Prüfung und Bestanden auf Anhieb. Mein Fahrlehrer heißt Ali netter Älter Herr , ich bin die ganze Zeit mit ihm gefahren.denn Job denn er macht Macht er super er is bisschen streng aber Korekt wenn ihn was nicht passt sagt er es dir ,er is direkt aber es hilft. Ich kann nur Gutes Sagen zu der Fahrschule!! Top weiter So !</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3b5998]/20 flex items-center justify-center text-[#6d8fd4] font-bold">G</div>
                  <div>
                    <p className="font-semibold text-white">Gregor S.</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 rounded-2xl p-6 border border-[#3b5998]/30">
                <div className="flex items-center gap-1 text-[#6d8fd4] mb-3">★★★★★</div>
                <p className="text-neutral-300 mb-4 italic">Ich kann diese Fahrschule absolut weiterempfehlen! Von der ersten Anmeldung bis zur praktischen Prüfung habe ich mich jederzeit bestens betreut gefühlt. Die Fahrlehrer (in meinem fall Serdar) sind unglaublich geduldig, freundlich und erklären alles klar und verständlich.</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3b5998]/20 flex items-center justify-center text-[#6d8fd4] font-bold">J</div>
                  <div>
                    <p className="font-semibold text-white">Johannes B.</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 rounded-2xl p-6 border border-[#3b5998]/30">
                <div className="flex items-center gap-1 text-[#6d8fd4] mb-3">★★★★★</div>
                <p className="text-neutral-300 mb-4 italic">Ich habe hier an dieser noch relativ neuen Fahrschule vor ein paar Tagen erfolgreich meinen Führerschein B197 absolviert und kann sie jedem wärmstens empfehlen:) </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3b5998]/20 flex items-center justify-center text-[#6d8fd4] font-bold">M</div>
                  <div>
                    <p className="font-semibold text-white">Malou D.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <a href="https://maps.google.com/?q=ABF+Fahrschule+Potsdam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#6d8fd4] hover:text-[#8aa8e0] hover:underline font-medium">
                Alle Bewertungen auf Google Maps lesen →
              </a>
              <p className="text-xs text-neutral-500 mt-2">
                * Bewertungen von echten Fahrschülern auf Google Maps (§ 5b Abs. 3 UWG)
              </p>
            </div>
          </div>
        </section>

        {/* CTA after Testimonials */}
        <InlineCTA text="Werde auch du Teil unserer zufriedenen Fahrschüler!" />

        {/* Process Section */}
        <section className="py-16 bg-gradient-to-b from-black to-[#0a1628]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                So einfach geht's
              </h2>
              <p className="text-lg text-neutral-400">
                In 3 Schritten zum Führerschein
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#3b5998] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Anmeldung</h3>
                <p className="text-neutral-400">
                  Formular ausfüllen oder anrufen – wir melden uns und kümmern uns um alles.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#3b5998] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Ausbildung</h3>
                <p className="text-neutral-400">
                  Theorie + Fahrstunden flexibel nach deinem Zeitplan. Moderne App zum Lernen.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#3b5998] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Führerschein!</h3>
                <p className="text-neutral-400">
                  Optimal vorbereitet zur Prüfung – dann hältst du deinen Führerschein in der Hand!
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button size="lg" onClick={scrollToForm} className="bg-[#3b5998] hover:bg-[#4a6cb3] text-white text-lg px-10 py-6 rounded-xl font-bold shadow-lg">Jetzt 179 € Angebot sichern

              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#0a1628]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                Deine Fragen – unsere Antworten
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="anmeldung" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />
                    Wie melde ich mich an?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Ganz einfach! Fülle das Formular oben aus oder ruf uns an. Wir melden uns innerhalb von 24 Stunden bei dir und kümmern uns um alles – von der Anmeldung bis zur Prüfung.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="raten" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />
                    Kann ich in Raten zahlen?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Ja, natürlich! Sprich uns einfach an – wir finden gemeinsam eine faire Lösung, die zu deinem Budget passt. Niemand soll wegen Geld auf den Führerschein verzichten müssen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="b197" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />
                    Was ist B197 (Automatik + Schaltung)?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Mit B197 lernst du hauptsächlich auf Automatik (einfacher!), machst zusätzlich 10 Schaltstunden + eine kurze Testfahrt – und darfst danach beide Fahrzeugtypen fahren. Modern, flexibel und stressfreier!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dauer" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />
                    Wie lange dauert die Ausbildung?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Bei uns schaffst du den Führerschein in etwa 4-8 Wochen – je nachdem, wie viel Zeit du hast. Wir passen uns flexibel an deinen Zeitplan an. Schneller geht's kaum!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="start" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />
                    Wann kann ich starten?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Sofort! Unsere Theorie-Kurse starten laufend. Nach der Anmeldung kannst du direkt mit der App lernen und in den nächsten Theorieunterricht einsteigen. Je früher du anfängst, desto schneller fährst du!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-[#3b5998]">
          <div className="max-w-3xl mx-auto px-4 text-center text-white">
            <div className="mb-6">
              <span className="inline-block bg-white text-[#3b5998] text-4xl lg:text-5xl font-black px-6 py-3 rounded-xl">179 €

              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Bereit, frei in den Frühling zu starten?
            </h2>
            
            <p className="text-xl text-white/90 mb-6">
              Sicher dir jetzt deinen Platz. Angebot gültig bis 30. April 2026.
            </p>

            <CountdownTimer targetDate={OFFER_END_DATE} className="justify-center mb-8" />
            
            <Button size="lg" onClick={scrollToForm} className="bg-white hover:bg-neutral-100 text-[#3b5998] text-xl px-12 py-7 rounded-xl font-bold shadow-lg">Ja, 179 € Angebot sichern!

            </Button>

            <p className="mt-6 text-sm text-white/80">
              🔒 Kostenlos & unverbindlich • Über 500 zufriedene Fahrschüler
            </p>
          </div>
        </section>

        {/* Footer - Blue gradient */}
        <footer className="bg-gradient-to-r from-[#1a2d4a] to-black text-neutral-400 py-8 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <img src="/abf-logo.png" alt="ABF Fahrschule Potsdam" className="h-12 w-auto mx-auto mb-4" />
            <p className="text-sm text-neutral-400 mb-4">
              ABF Fahrschule Potsdam-Babelsberg | Tuchmacherstraße 45b, 14482 Potsdam
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <a href="/impressum" className="hover:text-[#6d8fd4]">Impressum</a>
              <a href="/datenschutz" className="hover:text-[#6d8fd4]">Datenschutz</a>
              <a href="/agb" className="hover:text-[#6d8fd4]">AGB</a>
            </div>
          </div>
        </footer>

        {/* Mobile Sticky CTA - Blue theme */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-sm border-t border-[#3b5998]/30 md:hidden z-50 safe-area-inset-bottom">
          <Button onClick={scrollToForm} className="w-full bg-[#3b5998] hover:bg-[#4a6cb3] text-white h-14 text-lg font-bold rounded-xl shadow-lg">
            Jetzt 279 € Angebot sichern!
          </Button>
        </div>
      </div>
    </>);

};

export default Landing;