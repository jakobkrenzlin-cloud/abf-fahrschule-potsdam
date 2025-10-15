import React, { useState } from 'react';
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

const leadSchema = z.object({
  name: z.string().trim()
    .min(2, 'Name muss mindestens 2 Zeichen lang sein')
    .max(100, 'Name darf maximal 100 Zeichen lang sein'),
  phone: z.string().trim()
    .regex(/^[+]?[0-9\s()-]{6,20}$/, 'Ungültige Telefonnummer'),
  licenseClass: z.enum(['b', 'a1', 'a2', 'a', 'be'], {
    errorMap: () => ({ message: 'Ungültige Führerscheinklasse' })
  })
});

const Landing = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    licenseClass: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate input
      const result = leadSchema.safeParse({
        name: formData.name,
        phone: formData.phone,
        licenseClass: formData.licenseClass
      });

      if (!result.success) {
        toast({
          title: "Ungültige Eingabe",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            license_class: formData.licenseClass,
            source: 'landingpage',
            consent: true
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Anfrage erfolgreich gesendet!",
        description: "Wir melden uns innerhalb von 24h bei dir zurück.",
      });

      // Trigger Google Ads conversion tracking
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion();
      }

      // Reset form
      setFormData({
        name: '',
        phone: '',
        licenseClass: ''
      });

    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuche es nochmal oder rufe uns direkt an.",
        variant: "destructive",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img 
              src="/abf-logo.png"
              alt="Fahrschule ABF Logo - Professionelle Fahrausbildung in Potsdam-Babelsberg"
              className="h-12 w-auto"
              loading="eager"
            />
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
                Dein Führerschein in Potsdam-Babelsberg
                <span className="block text-yellow-300 text-5xl lg:text-7xl mt-2">
                  Jetzt für nur 479 €!
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 font-medium">
                Nur für kurze Zeit: Komplettpaket mit Theorie, Lern-App & Erste Hilfe inklusive
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 text-lg px-12 py-6 rounded-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Jetzt anmelden & Platz sichern
              </Button>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/abf-storefront.jpg" 
                  alt="ABF Fahrschule Potsdam - Bildungszentrum mit Motorrädern vor dem Geschäft"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 bg-white/20 rounded-lg p-3 text-center backdrop-blur-sm">
                <p className="text-xs font-semibold text-white mb-2">
                  Echte Fahrschüler bei ABF Fahrschule
                </p>
                <div className="grid grid-cols-6 gap-1">
                  <div className="aspect-square rounded overflow-hidden">
                    <img 
                      src="/lovable-uploads/success-students-1.jpg" 
                      alt="Erfolgreiche Fahrschüler vor der ABF Fahrschule"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img 
                      src="/lovable-uploads/success-students-2.jpg" 
                      alt="Fahrschüler mit Fahrlehrer nach bestandener Prüfung"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img 
                      src="/lovable-uploads/success-students-3.jpg" 
                      alt="Glückliche Fahrschüler mit Führerschein"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img 
                      src="/lovable-uploads/success-students-4.jpg" 
                      alt="Erfolgreiche Fahrschülerinnen vor der Fahrschule"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img 
                      src="/lovable-uploads/success-students-5.jpg" 
                      alt="Fahrschülerin mit Führerschein vor ABF Fahrschule"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded overflow-hidden">
                    <img 
                      src="/lovable-uploads/success-students-6.jpg" 
                      alt="Fahrschülerin und Fahrlehrer nach erfolgreichem Abschluss"
                      className="w-full h-full object-cover"
                    />
                  </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Big Value Proposition - Offer Box */}
      <OfferBox />

      {/* Social Proof & Testimonials */}
      <TestimonialsBox />

      {/* CTA Block */}
      <section className="py-16 bg-primary text-white text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 -translate-x-32"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 translate-x-24"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Starte jetzt deinen Führerschein in Potsdam
          </h2>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100 font-medium">
            Sichere dir das 479 € Angebot – nur für kurze Zeit!
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 text-lg px-12 py-6 rounded-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Jetzt anmelden & 479€ Angebot sichern
          </Button>
          <div className="mt-6 text-sm opacity-90">
            Limitiert auf die ersten 50 Anmeldungen
          </div>
        </div>
      </section>

      {/* Process Steps - How it Works */}
      <ProcessSteps />

      {/* Contact Form - Lead Capture */}
      <section id="contact-form" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            {/* Offer Reminder */}
            <div className="text-center mb-8 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border-l-4 border-primary">
              <p className="text-primary font-bold text-lg">
                Sichere dir jetzt das 479€ Komplettpaket!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Limitiert auf die ersten 50 Anmeldungen
              </p>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-900">
              Kostenlose Beratung sichern
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Wir melden uns innerhalb von 24h bei dir zurück
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Vollständiger Name *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-2 h-12 border-2 border-gray-200 focus:border-primary rounded-lg"
                  placeholder="Dein vollständiger Name"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Telefonnummer *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-2 h-12 border-2 border-gray-200 focus:border-primary rounded-lg"
                  placeholder="Deine Telefonnummer"
                />
              </div>
              
              <div>
                <Label htmlFor="license" className="text-sm font-semibold text-gray-700">Führerscheinklasse *</Label>
                <Select onValueChange={(value) => setFormData({...formData, licenseClass: value})}>
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
              
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? "Wird gesendet..." : "Jetzt Anfrage senden & 479€ Angebot sichern"}
              </Button>
            </form>
            
            {/* WhatsApp & Call Buttons */}
            <div className="flex gap-4 mt-6">
              <Button 
                onClick={handleWhatsApp}
                variant="outline"
                size="lg"
                className="flex-1 border-2 border-green-500 text-green-600 hover:bg-green-50 h-12 font-semibold rounded-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Chat
              </Button>
              <Button 
                onClick={handleCall}
                variant="outline"
                size="lg"
                className="flex-1 border-2 border-primary text-primary hover:bg-primary/10 h-12 font-semibold rounded-xl"
              >
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

      {/* FAQ - Objection Handling */}
      <ConversionFAQ />

      {/* Final CTA - Last Chance */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-primary text-white text-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Urgency Reminder */}
          <div className="inline-flex items-center gap-2 bg-red-500/90 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse">
            Nur noch wenige Plätze verfügbar!
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Jetzt anmelden & Führerschein starten
          </h2>
          <p className="text-xl lg:text-2xl mb-4 text-blue-100 font-medium">
            Sichere dir das 479€ Komplettpaket
          </p>
          <p className="text-lg mb-8 text-blue-200">
            Theorie • LernApp • Erste Hilfe - alles inklusive!
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 text-xl px-16 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Jetzt 479€ Angebot sichern
          </Button>
          
          <div className="mt-8 text-sm opacity-90">
            <p className="mb-2">Limitiert auf die ersten 50 Anmeldungen</p>
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
    </div>
  );
};

export default Landing;