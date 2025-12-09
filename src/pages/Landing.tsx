import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import OfferBox from "@/components/OfferBox";
import TestimonialsBox from "@/components/TestimonialsBox";
import ProcessSteps from "@/components/ProcessSteps";
import ConversionFAQ from "@/components/ConversionFAQ";
import { z } from "zod";
import { CookieConsentManager } from '@/lib/cookieConsent';
const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name darf maximal 100 Zeichen lang sein'),
  phone: z.string().trim().regex(/^[+]?[0-9\s()-]{6,20}$/, 'Ungültige Telefonnummer'),
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
    phone: '',
    licenseClass: '',
    honeyPot: '',
    privacyConsent: false,
    agbConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Validate input
      const result = leadSchema.safeParse({
        name: formData.name,
        phone: formData.phone,
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
      const {
        error
      } = await supabase.from('leads').insert([{
        name: formData.name,
        phone: formData.phone,
        license_class: formData.licenseClass,
        source: 'landingpage',
        consent: true
      }]);
      if (error) {
        throw error;
      }

      // Trigger Google Ads conversion tracking with consent check
      CookieConsentManager.triggerConversion();

      // Redirect to thank you page
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
      {/* Header with Logo */}
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img src="/abf-logo.png" alt="Fahrschule ABF Logo - Professionelle Fahrausbildung in Potsdam-Babelsberg" className="h-12 w-auto" loading="eager" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-16 lg:py-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Urgency Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
                Limitiertes Angebot
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Dein Führerschein in nur
                <span className="block text-accent text-5xl lg:text-7xl mt-2">
                  4 Wochen!
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-6 text-blue-100 font-medium">
                Starte jetzt in Potsdam-Babelsberg – ab 479 € Anmeldegebühr
              </p>
              
              {/* USP Bulletpoints with Icons */}
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full p-2 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white bg-slate-800">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">14 Theoriestunden, LernApp & Erste Hilfe inklusive</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full p-2 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white bg-slate-800">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">Flexible Termine – schnell & stressfrei</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full p-2 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white bg-slate-900">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">Erfahrene, geduldige Fahrlehrer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full p-2 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white bg-slate-900">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">Auch mit Automatik & B197 (Schaltberechtigung)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full p-2 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white bg-slate-900">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">Zentrale Lage im Weber Park</span>
                </div>
              </div>

              <p className="text-sm text-blue-200 mb-6 opacity-90">
                Fahrstunden & Prüfungsgebühren nicht im Preis enthalten
              </p>
              
              <Button size="lg" onClick={() => document.getElementById('contact-form')?.scrollIntoView({
              behavior: 'smooth'
            })} className="bg-accent hover:bg-accent/90 text-lg px-12 py-6 rounded-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-slate-800">
                Jetzt Platz sichern
              </Button>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img src="/lovable-uploads/abf-storefront.jpg" alt="ABF Fahrschule Potsdam - Bildungszentrum mit Motorrädern vor dem Geschäft" className="w-full h-full object-cover" />
              </div>
              <div className="mt-6 bg-white/20 rounded-lg p-3 text-center backdrop-blur-sm">
                <p className="text-xs font-semibold text-white mb-2">
                  Echte Fahrschüler bei ABF Fahrschule
                </p>
                <div className="grid grid-cols-6 gap-1">
                  <div className="aspect-square rounded overflow-hidden">
                    <img src="/lovable-uploads/success-students-1.jpg" alt="Erfolgreiche Fahrschüler vor der ABF Fahrschule" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img src="/lovable-uploads/success-students-2.jpg" alt="Fahrschüler mit Fahrlehrer nach bestandener Prüfung" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img src="/lovable-uploads/success-students-3.jpg" alt="Glückliche Fahrschüler mit Führerschein" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img src="/lovable-uploads/success-students-4.jpg" alt="Erfolgreiche Fahrschülerinnen vor der Fahrschule" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img src="/lovable-uploads/success-students-5.jpg" alt="Fahrschülerin mit Führerschein vor ABF Fahrschule" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img src="/lovable-uploads/success-students-6.jpg" alt="Fahrschülerin und Fahrlehrer nach erfolgreichem Abschluss" className="w-full h-full object-cover" />
                  </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Value Proposition - What's Included */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Das bekommst du für 479 €
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Alles, was du für deinen Führerschein-Start brauchst
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">14 Theoriestunden</h3>
              <p className="text-sm text-muted-foreground">Komplett inklusive</p>
            </div>
            
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Lern-App</h3>
              <p className="text-sm text-muted-foreground">Vogel Verlag</p>
            </div>
            
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Erste-Hilfe-Kurs</h3>
              <p className="text-sm text-muted-foreground">Komplett inklusive</p>
            </div>
            
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Fahrsimulator</h3>
              <p className="text-sm text-muted-foreground">Training inklusive</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg inline-block">
              <strong>Hinweis:</strong> Fahrstunden und Prüfungsgebühren sind individuell und nicht im Anmeldepreis enthalten.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof - Real Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Das sagen unsere Fahrschüler
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Über 500 zufriedene Fahrschüler haben bei uns bestanden
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-xl">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-foreground mb-4 italic">
                "Ich hab meinen Führerschein beim ersten Anlauf geschafft! Die Fahrlehrer bei ABF sind super geduldig und erklären alles perfekt. Kann ich nur weiterempfehlen!"
              </p>
              <p className="text-sm font-semibold text-primary">Max, 19 Jahre</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-xl">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-foreground mb-4 italic">
                "Die Lern-App ist mega praktisch und die Theoriestunden waren nie langweilig. Nach nur 6 Wochen hatte ich meinen Schein – schneller als gedacht!"
              </p>
              <p className="text-sm font-semibold text-primary">Lisa, 20 Jahre</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-xl">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-foreground mb-4 italic">
                "Zentrale Lage, moderne Autos und ein richtig gutes Team. Die B197-Ausbildung mit Automatik war perfekt für mich. Danke ABF!"
              </p>
              <p className="text-sm font-semibold text-primary">Tim, 18 Jahre</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-card border-2 border-primary/30 rounded-full px-8 py-4">
              <div className="bg-primary/10 rounded-full px-4 py-2">
                <span className="text-2xl font-bold text-primary">500+</span>
              </div>
              <span className="font-semibold">erfolgreiche Fahrschüler</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - 3 Simple Steps */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            So einfach geht's zum Führerschein
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            In nur 3 Schritten zu deinem Führerschein
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-primary">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Beratung & Anmeldung</h3>
              <p className="text-muted-foreground">
                Fülle das Formular aus oder ruf uns an. Wir beraten dich kostenlos und kümmern uns um alles Weitere.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-primary">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Theorie & Praxis</h3>
              <p className="text-muted-foreground">
                Besuche die 14 Theoriestunden und absolviere deine Fahrstunden mit unseren erfahrenen Fahrlehrern.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-primary">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Prüfung bestehen</h3>
              <p className="text-muted-foreground">
                Wir begleiten dich bis zur Prüfung – und dann hältst du deinen Führerschein in den Händen!
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" onClick={() => document.getElementById('contact-form')?.scrollIntoView({
            behavior: 'smooth'
          })} className="bg-accent hover:bg-accent/90 text-lg px-12 py-6 rounded-xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 text-slate-900">
              Jetzt starten
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form - Lead Capture */}
      <section id="contact-form" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            {/* Offer Reminder */}
            <div className="text-center mb-8 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border-l-4 border-primary">
              <p className="text-primary font-bold text-lg">
                Sichere dir jetzt die 479€ Anmeldegebühr!
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Inkl. 14 Theoriestunden, LernApp, Erste Hilfe & Fahrsimulator. Fahrstunden & Prüfungsgebühren nicht enthalten.
              </p>
              <p className="text-xs text-gray-500 mt-1">Angebot gültig bis 31.12.2025</p>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-900">
              Unverbindliche Beratung anfragen
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Wir melden uns innerhalb von 24 Stunden bei dir – kostenfrei & unverbindlich
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Vollständiger Name *</Label>
                <Input id="name" type="text" required value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="mt-2 h-12 border-2 border-gray-200 focus:border-primary rounded-lg" placeholder="Dein vollständiger Name" />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Telefonnummer *</Label>
                <Input id="phone" type="tel" required value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} className="mt-2 h-12 border-2 border-gray-200 focus:border-primary rounded-lg" placeholder="Deine Telefonnummer" />
              </div>
              
              <div>
                <Label htmlFor="license" className="text-sm font-semibold text-gray-700">Führerscheinklasse *</Label>
                <Select onValueChange={value => setFormData({
                ...formData,
                licenseClass: value
              })}>
                  <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-primary rounded-lg">
                    <SelectValue placeholder="Wähle deine Führerscheinklasse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b">Klasse B (PKW)</SelectItem>
                    <SelectItem value="a1">Klasse A1 (Motorrad 125ccm)</SelectItem>
                    <SelectItem value="a2">Klasse A2 (Motorrad 35kW)</SelectItem>
                    <SelectItem value="a">Klasse A (Motorrad unbegrenzt)</SelectItem>
                    <SelectItem value="be">Klasse BE (PKW + Anhänger)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Honeypot Field - Hidden from users, catches bots */}
              <div className="hidden" aria-hidden="true">
                <Label htmlFor="website">Website (Bitte leer lassen)</Label>
                <Input id="website" type="text" tabIndex={-1} autoComplete="off" value={formData.honeyPot} onChange={e => setFormData({
                ...formData,
                honeyPot: e.target.value
              })} />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="privacyConsent" checked={formData.privacyConsent} onChange={e => setFormData({
                  ...formData,
                  privacyConsent: e.target.checked
                })} className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" required />
                  <Label htmlFor="privacyConsent" className="text-sm text-gray-700 leading-tight cursor-pointer">
                    Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                    <a href="/datenschutz" target="_blank" className="text-primary underline hover:text-primary/80">
                      Datenschutzerklärung
                    </a>{' '}
                    zu. *
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="agbConsent" checked={formData.agbConsent} onChange={e => setFormData({
                  ...formData,
                  agbConsent: e.target.checked
                })} className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" required />
                  <Label htmlFor="agbConsent" className="text-sm text-gray-700 leading-tight cursor-pointer">
                    Ich habe die{' '}
                    <a href="/agb" target="_blank" className="text-primary underline hover:text-primary/80">
                      AGB
                    </a>{' '}
                    und{' '}
                    <a href="/agb#widerruf" target="_blank" className="text-primary underline hover:text-primary/80">
                      Widerrufsbelehrung
                    </a>{' '}
                    gelesen und stimme zu. *
                  </Label>
                </div>

                {/* BF17 Notice */}
                <div className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <strong>Hinweis für Minderjährige (BF17):</strong> Bei Begleiteten Fahren ab 17 benötigen wir die Einwilligung deiner Erziehungsberechtigten. Diese Unterlagen erhältst du nach der Anmeldung.
                </div>
              </div>
              
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50">
                {isSubmitting ? "Wird gesendet..." : "Jetzt Anfrage senden & 479€ Angebot sichern"}
              </Button>
            </form>
            
            {/* WhatsApp & Call Buttons */}
            <div className="flex gap-4 mt-6">
              <Button onClick={handleWhatsApp} variant="outline" size="lg" className="flex-1 border-2 border-green-500 text-green-600 hover:bg-green-50 h-12 font-semibold rounded-xl">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Chat
              </Button>
              <Button onClick={handleCall} variant="outline" size="lg" className="flex-1 border-2 border-primary text-primary hover:bg-primary/10 h-12 font-semibold rounded-xl">
                <Phone className="w-5 h-5 mr-2" />
                Sofort anrufen
              </Button>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
              <p>Deine Daten sind sicher und werden vertraulich behandelt</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Häufige Fragen */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Deine Fragen – unsere Antworten
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Hier findest du Antworten auf die häufigsten Fragen
          </p>
          
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <h3 className="font-bold text-lg mb-2 text-primary">Wie melde ich mich an?</h3>
              <p className="text-muted-foreground">
                Ganz einfach! Fülle das Formular auf dieser Seite aus oder ruf uns direkt an. Wir kümmern uns um alles Weitere und begleiten dich durch den gesamten Prozess.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <h3 className="font-bold text-lg mb-2 text-primary">Wie schnell kann ich starten?</h3>
              <p className="text-muted-foreground">
                In der Regel kannst du innerhalb weniger Tage mit der Theorie beginnen. Wir planen flexibel nach deinen Wünschen und Terminen.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <h3 className="font-bold text-lg mb-2 text-primary">Kann ich in Raten zahlen?</h3>
              <p className="text-muted-foreground">
                Ja! Sprich uns einfach an – wir finden gemeinsam eine faire und flexible Zahlungslösung, die zu deiner Situation passt.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <h3 className="font-bold text-lg mb-2 text-primary">Was ist B197 / Automatik mit Schaltberechtigung?</h3>
              <p className="text-muted-foreground">
                Mit B197 lernst du hauptsächlich auf einem Automatikfahrzeug, absolvierst aber auch 10 Fahrstunden plus eine 15-minütige Testfahrt auf einem Schaltwagen. So bekommst du die volle Berechtigung für beide Getriebe – modern und flexibel!
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <h3 className="font-bold text-lg mb-2 text-primary">Wie lange dauert die Ausbildung?</h3>
              <p className="text-muted-foreground">
                Das hängt von deinem Tempo und der Verfügbarkeit ab. Viele unserer Fahrschüler schaffen es in 4-8 Wochen. Wir passen uns deinem Zeitplan an!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Last Chance */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Bist du bereit, in 4 Wochen mobil zu sein?
          </h2>
          <p className="text-xl lg:text-2xl mb-4 text-blue-100 font-medium">
            Starte jetzt deine Fahrausbildung in Potsdam-Babelsberg
          </p>
          <p className="text-lg mb-8 text-blue-200">
            479 € Anmeldegebühr – Theorie, LernApp, Erste Hilfe & Fahrsimulator inklusive
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={() => document.getElementById('contact-form')?.scrollIntoView({
            behavior: 'smooth'
          })} className="bg-accent hover:bg-accent/90 text-xl px-16 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 text-slate-900">
              Jetzt Platz sichern
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-2 border-white hover:bg-white/20 text-lg px-12 py-6 rounded-2xl font-bold backdrop-blur-sm" onClick={handleCall}>
              <Phone className="w-5 h-5 mr-2" />
              Direkt anrufen
            </Button>
          </div>
          
          <div className="mt-8 text-sm opacity-90">
            <p>Über 500 zufriedene Fahrschüler vertrauen uns bereits</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ABF Fahrschule</h3>
              <p className="text-gray-400">
                Deine Fahrschule in Potsdam-Babelsberg für schnellen und sicheren Führerscheinerwerb.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>0331 / 967 958 54</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>potsdam@fahrschuleabf.de</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Tuchmacherstraße 45b, 14482 Potsdam</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
              <div className="space-y-2">
                <a href="/impressum" className="text-gray-400 hover:text-white block">Impressum</a>
                <a href="/datenschutz" className="text-gray-400 hover:text-white block">Datenschutz</a>
                <a href="/agb" className="text-gray-400 hover:text-white block">AGB</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;