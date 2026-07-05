import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Phone, MessageCircle, CheckCircle, Star, Lock, BookOpen, Bike, FileCheck, HelpCircle, ArrowDown, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { getAttribution, callPhone, openWhatsApp } from '@/lib/tracking';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MotorradTestimonials from '@/components/motorrad/MotorradTestimonials';

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100),
  phone: z.string().trim().min(5, 'Bitte gib eine gültige Telefonnummer ein').max(30),
  email: z.string().trim().email('Bitte gib eine gültige E-Mail-Adresse ein').max(255).optional().or(z.literal('')),
  honeyPot: z.string().max(0, 'Spam erkannt')
});

const B196 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', honeyPot: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { toast } = useToast();

  const scrollToForm = () => {
    document.getElementById('b196-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(formData);
    if (!result.success) {
      toast({ title: "Ungültige Eingabe", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    if (!privacyConsent) {
      toast({ title: "Bitte zustimmen", description: "Bitte stimme der Datenschutzerklärung zu.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://jxxhrldcmwjnjqfpfeti.supabase.co/functions/v1/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          ...(formData.email?.trim() ? { email: formData.email.trim() } : {}),
          license_class: 'b196',
          source: 'landingpage-b196',
          ...getAttribution()
        })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Submission failed');
      }
      (window as unknown as { dataLayer?: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({ event: 'lead_submitted', form_type: 'contact' });
      navigate('/danke', { state: { lead: true } });
    } catch (error) {
      toast({ title: "Fehler beim Senden", description: "Bitte versuche es nochmal oder rufe uns direkt an.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    openWhatsApp('https://wa.me/491622191290?text=Hallo,%20ich%20interessiere%20mich%20für%20B196%20(125ccm%20mit%20Autoführerschein)!', 'landing-b196');
  };
  const handleCall = () => {
    callPhone('+491622191290', 'landing-b196');
  };

  const InlineCTA = ({ text, cta = "Jetzt B196-Platz sichern" }: { text: string; cta?: string }) => (
    <div className="py-6 sm:py-10 bg-gradient-to-r from-[#2a4a7f] to-black">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-white text-base sm:text-lg lg:text-xl font-semibold text-center sm:text-left">{text}</p>
        <Button onClick={scrollToForm} size="lg" className="bg-[#3b5998] hover:bg-[#4a6cb3] text-white font-bold rounded-xl px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg whitespace-nowrap transition-all hover:scale-105 w-full sm:w-auto">
          {cta}
          <ArrowDown className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>B196 Potsdam: 125er fahren ohne Prüfung | 750 € komplett | ABF</title>
        <meta name="description" content="B196 in Potsdam: Mit deinem Autoführerschein 125-ccm-Motorrad fahren – ohne Prüfung. Komplettpreis 750 € inkl. Theorie & Praxis. In wenigen Tagen startklar." />
        <link rel="canonical" href="https://abf-fahrschule.de/b196" />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#1a2d4a] to-black py-3 border-b border-[#3b5998]/30">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <img src="/abf-logo.png" alt="ABF Fahrschule Potsdam" className="h-12 w-auto" loading="eager" />
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3 text-white text-sm">
                <Phone className="w-4 h-4 text-[#3b5998]" />
                <div className="leading-tight">
                  <a href="tel:+4933196795854" className="block hover:text-[#6d8fd4] transition-colors"><span className="text-[#6d8fd4]">Festnetz:</span> <span className="font-semibold">+49 331 96795854</span></a>
                  <a href="tel:+491622191290" className="block hover:text-[#6d8fd4] transition-colors"><span className="text-[#6d8fd4]">Mobil:</span> <span className="font-semibold">+49 162 2191290</span></a>
                </div>
              </div>
              <Button onClick={scrollToForm} size="sm" className="bg-[#3b5998] hover:bg-[#4a6cb3] text-white font-semibold rounded-lg">
                Jetzt anmelden
              </Button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-black via-[#0a1628] to-black">
          <div className="relative z-10 py-8 lg:py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left */}
                <div className="lg:pr-8">
                  <div className="inline-flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 px-4 py-2 rounded-full text-sm font-bold mb-6 text-white">
                    <Star className="w-4 h-4 fill-current text-[#6d8fd4]" />
                    5,0 ★ bei Google Maps
                  </div>

                  <div className="mb-4">
                    <span className="inline-block text-[#6d8fd4] text-5xl lg:text-7xl font-black">750 €</span>
                    <span className="block text-neutral-400 text-lg mt-1">Komplettpreis</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white">
                    B196 in Potsdam:
                    <span className="block text-[#6d8fd4]">125er fahren – ganz ohne Prüfung</span>
                  </h1>

                  <p className="text-lg lg:text-xl text-neutral-300 mb-6">
                    Erweitere deinen Autoführerschein um 125-ccm-Motorräder. Keine Theorieprüfung, keine praktische Prüfung – nur eine kompakte Schulung.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 rounded-full px-4 py-2 text-white">
                      <CheckCircle className="w-5 h-5 text-[#6d8fd4]" />
                      <span className="font-medium">Keine Prüfung nötig</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 rounded-full px-4 py-2 text-white">
                      <CheckCircle className="w-5 h-5 text-[#6d8fd4]" />
                      <span className="font-medium">In wenigen Tagen startklar</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#3b5998]/20 border border-[#3b5998]/40 rounded-full px-4 py-2 text-white">
                      <CheckCircle className="w-5 h-5 text-[#6d8fd4]" />
                      <span className="font-medium">Auch am Wochenende</span>
                    </div>
                  </div>

                  <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-5">
                    <h3 className="text-white font-bold mb-3">Das brauchst du für B196:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-neutral-300">
                        <CheckCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0 mt-0.5" />
                        <span>Mindestens 25 Jahre alt</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-300">
                        <CheckCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0 mt-0.5" />
                        <span>Führerschein Klasse B seit mindestens 5 Jahren</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right: Form */}
                <div id="b196-form" className="bg-neutral-900 rounded-2xl shadow-xl p-6 lg:p-8 border border-[#3b5998]/30">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-[#3b5998]/20 text-[#6d8fd4] px-4 py-2 rounded-full text-sm font-bold mb-3">
                      <Bike className="w-4 h-4" />
                      B196 – 750 € Komplettpreis
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Jetzt B196-Platz sichern!</h2>
                    <p className="text-neutral-400">Wir melden uns innerhalb von 24 Stunden</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold text-neutral-300">Dein Name</Label>
                      <Input id="name" type="text" required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1.5 h-14 border border-[#3b5998]/30 bg-neutral-800 text-white focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-lg p-4 placeholder:text-neutral-500"
                        placeholder="Vor- und Nachname" autoComplete="name" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-neutral-300">Telefonnummer</Label>
                      <Input id="phone" type="tel" inputMode="tel" required value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5 h-14 border border-[#3b5998]/30 bg-neutral-800 text-white focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-lg p-4 placeholder:text-neutral-500"
                        placeholder="0151 12345678" autoComplete="tel" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-neutral-300">
                        E-Mail <span className="text-neutral-500 font-normal">(optional)</span>
                      </Label>
                      <Input id="email" type="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5 h-14 border border-[#3b5998]/30 bg-neutral-800 text-white focus:border-[#3b5998] focus:ring-[#3b5998] rounded-xl text-lg p-4 placeholder:text-neutral-500"
                        placeholder="deine@email.de" autoComplete="email" />
                    </div>

                    <div className="bg-neutral-800 border border-[#3b5998]/30 rounded-xl p-4">
                      <p className="text-xs text-neutral-400 mb-1">Führerscheinklasse</p>
                      <p className="text-white font-semibold">B196 – 125 ccm mit Autoführerschein</p>
                    </div>

                    <div className="hidden" aria-hidden="true">
                      <Input type="text" tabIndex={-1} autoComplete="off" value={formData.honeyPot}
                        onChange={(e) => setFormData({ ...formData, honeyPot: e.target.value })} />
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-1 h-5 w-5 rounded border-neutral-600 text-[#3b5998] focus:ring-[#3b5998] bg-neutral-700" />
                        <span className="text-sm text-neutral-300 leading-tight">
                          Ich stimme der{' '}
                          <a href="/datenschutz" target="_blank" className="text-[#6d8fd4] underline font-medium hover:text-[#8aa8e0]">Datenschutzerklärung</a>{' '}
                          zu und bin damit einverstanden, dass mich ABF Fahrschule kontaktiert.
                        </span>
                      </label>
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting}
                      className="w-full bg-[#3b5998] hover:bg-[#4a6cb3] text-white h-16 text-xl font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50">
                      {isSubmitting ? "Wird gesendet..." : "Ja, B196 für 750 € sichern!"}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-400 pt-2">
                      <Lock className="w-4 h-4 text-[#6d8fd4]" />
                      <span>Kostenlos & unverbindlich. Wir melden uns in 24h.</span>
                    </div>
                  </form>

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

        <InlineCTA text="Die B196-Kurse für 2026 sind schnell voll – sichere dir deinen Platz!" />

        {/* Was du bekommst */}
        <section className="py-16 bg-gradient-to-b from-black to-[#0a1628]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                Das bekommst du für <span className="text-[#6d8fd4]">750 €</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-6 text-center hover:border-[#3b5998] transition-colors">
                <div className="bg-[#3b5998]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-[#6d8fd4]" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Theorie-Schulung</h3>
                <p className="text-sm text-neutral-400">4 Einheiten à 90 Minuten – kompakt & verständlich</p>
              </div>
              <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-6 text-center hover:border-[#3b5998] transition-colors">
                <div className="bg-[#3b5998]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bike className="w-8 h-8 text-[#6d8fd4]" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Praxis-Schulung</h3>
                <p className="text-sm text-neutral-400">5 Einheiten à 90 Minuten auf modernen 125ern</p>
              </div>
              <div className="bg-neutral-900 border border-[#3b5998]/30 rounded-2xl p-6 text-center hover:border-[#3b5998] transition-colors">
                <div className="bg-[#3b5998]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-[#6d8fd4]" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Bescheinigung</h3>
                <p className="text-sm text-neutral-400">Für die Eintragung bei der Führerscheinstelle – ohne Prüfung</p>
              </div>
            </div>

            <div className="mt-8 bg-neutral-900/50 border border-[#3b5998]/20 rounded-xl p-6">
              <p className="text-center text-sm text-neutral-300">
                <strong className="text-white">Gut zu wissen:</strong> Nach der Schulung trägt die Führerscheinstelle die Schlüsselzahl 196 in deinen Führerschein ein (kleine Amtsgebühr). Danach fährst du in Deutschland Leichtkrafträder bis 125 ccm.
              </p>
            </div>
          </div>
        </section>

        {/* Prozess */}
        <section className="py-16 bg-[#0a1628]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">In 3 Schritten zum 125er</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#3b5998] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="font-bold text-xl mb-3 text-white">Anfragen</h3>
                <p className="text-neutral-400">Formular oder Anruf – Termine auch am Wochenende.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#3b5998] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="font-bold text-xl mb-3 text-white">Schulung</h3>
                <p className="text-neutral-400">9 Einheiten Theorie &amp; Praxis, kompakt in wenigen Tagen.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#3b5998] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="font-bold text-xl mb-3 text-white">Eintragung &amp; losfahren</h3>
                <p className="text-neutral-400">Bescheinigung zur Führerscheinstelle, Schlüsselzahl 196.</p>
              </div>
            </div>
          </div>
        </section>

        <MotorradTestimonials />

        <InlineCTA text="Noch Fragen? Ruf uns an oder schreib per WhatsApp – wir beraten dich ehrlich." cta="Jetzt B196-Platz sichern" />

        {/* FAQ */}
        <section className="py-16 bg-[#0a1628]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Deine Fragen – unsere Antworten</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="q1" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3"><HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />Was darf ich mit B196 fahren?</span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Leichtkrafträder der Klasse A1: bis 125 ccm und maximal 11 kW – zum Beispiel die meisten 125er-Roller und -Motorräder. Wichtig: B196 gilt nur in Deutschland und ist kein Einstieg in A2/A per Aufstieg – dafür beraten wir dich gern zum richtigen Weg.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3"><HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />Welche Voraussetzungen brauche ich?</span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Du musst mindestens 25 Jahre alt sein und deinen Führerschein der Klasse B seit mindestens 5 Jahren besitzen.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3"><HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />Muss ich wirklich keine Prüfung machen?</span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Richtig – weder Theorie- noch praktische Prüfung. Du absolvierst nur die gesetzliche Fahrerschulung (4 Theorie- + 5 Praxis-Einheiten à 90 Minuten) und bekommst danach die Bescheinigung für die Führerscheinstelle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3"><HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />Wie lange dauert das Ganze?</span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Die Schulung schaffst du bei uns kompakt in wenigen Tagen – auf Wunsch auch am Wochenende. Danach fehlt nur noch die Eintragung.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5" className="bg-neutral-900 rounded-xl border border-[#3b5998]/30 px-6">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5">
                  <span className="flex items-center gap-3"><HelpCircle className="w-5 h-5 text-[#6d8fd4] flex-shrink-0" />Was kostet B196 insgesamt?</span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 pb-5">
                  Bei uns 750 € Komplettpreis für die gesamte Schulung (Theorie + Praxis). Dazu kommt nur die kleine Gebühr der Führerscheinstelle. Keine versteckten Kosten.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-[#3b5998]">
          <div className="max-w-3xl mx-auto px-4 text-center text-white">
            <div className="mb-6">
              <span className="inline-block bg-white text-[#3b5998] text-4xl lg:text-5xl font-black px-6 py-3 rounded-xl">750 €</span>
              <span className="block text-lg text-white/80 mt-2 font-normal">Komplettpreis – Theorie &amp; Praxis inklusive</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Diesen Sommer schon auf der 125er?</h2>
            <p className="text-xl text-white/90 mb-6 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" /> Termine auch am Wochenende
            </p>
            <Button size="lg" onClick={scrollToForm} className="bg-white hover:bg-neutral-100 text-[#3b5998] text-xl px-12 py-7 rounded-xl font-bold shadow-lg">
              Ja, B196-Platz sichern!
            </Button>
          </div>
        </section>

        {/* Footer */}
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

        {/* Mobile Sticky Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden safe-area-inset-bottom">
          <div className="flex gap-2 p-3">
            <button onClick={handleCall}
              className="flex-1 flex items-center justify-center gap-2 bg-[#3b5998] text-white py-3.5 px-4 rounded-xl font-semibold text-base shadow-md active:scale-95 transition-transform"
              aria-label="Jetzt anrufen">
              <Phone className="w-5 h-5" />
              <span>Anrufen</span>
            </button>
            <button onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 px-4 rounded-xl font-semibold text-base shadow-md active:scale-95 transition-transform"
              aria-label="WhatsApp öffnen">
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default B196;
