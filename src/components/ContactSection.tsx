import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { CookieConsentManager } from '@/lib/cookieConsent';

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

const ContactSection = () => {
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
            source: 'homepage',
            consent: true
          }
        ]);

      if (error) {
        throw error;
      }

      // Trigger Google Ads conversion tracking with consent check
      CookieConsentManager.triggerConversion();

      toast({
        title: "Anfrage erfolgreich gesendet!",
        description: "Wir melden uns innerhalb von 24h bei dir zurück.",
      });

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
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Jetzt Kontakt aufnehmen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Haben Sie Fragen zu unserer Fahrschule in Potsdam oder möchten Sie sich für den Führerschein anmelden? 
            Wir freuen uns auf Ihre Nachricht und beraten Sie gerne kostenlos!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            {/* Offer Reminder */}
            <div className="text-center mb-8 p-4 bg-gradient-to-r from-blue-600/10 to-blue-600/5 rounded-xl border-l-4 border-blue-600">
              <p className="text-blue-600 font-bold text-lg">
                Sichere dir jetzt das 479€ Komplettpaket!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Limitiert auf die ersten 50 Anmeldungen
              </p>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-900">
              Kostenlose Beratung sichern
            </h3>
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
                  className="mt-2 h-12 border-2 border-gray-200 focus:border-blue-600 rounded-lg"
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
                  className="mt-2 h-12 border-2 border-gray-200 focus:border-blue-600 rounded-lg"
                  placeholder="Deine Telefonnummer"
                />
              </div>
              
              <div>
                <Label htmlFor="license" className="text-sm font-semibold text-gray-700">Führerscheinklasse *</Label>
                <Select value={formData.licenseClass} onValueChange={(value) => setFormData({...formData, licenseClass: value})}>
                  <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-blue-600 rounded-lg">
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
                className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
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
                WhatsApp
              </Button>
              <Button 
                onClick={handleCall}
                variant="outline"
                size="lg"
                className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-12 font-semibold rounded-xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Anrufen
              </Button>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
              <p>Deine Daten sind sicher und werden vertraulich behandelt</p>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900">
                ABF Fahrschule Potsdam - Ihr Kontakt
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Fahrschule Potsdam Adresse</div>
                    <div className="text-gray-600">
                      WEBERPARK<br />
                      Tuchmacherstraße 45b<br />
                      14482 Potsdam<br />
                      Brandenburg
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Telefon Fahrschule Potsdam</div>
                    <a href="tel:+4933196795854" className="text-blue-600 hover:text-blue-700">
                      0331 / 967 958 54
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">E-Mail Fahrschule Potsdam</div>
                    <a href="mailto:potsdam@fahrschuleabf.de" className="text-blue-600 hover:text-blue-700">
                      potsdam@fahrschuleabf.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Öffnungszeiten Fahrschule Potsdam</div>
                    <div className="text-gray-600 space-y-1">
                      <div>Mo - Fr: 12:00 - 18:00 Uhr</div>
                      <div>Wochenende: Nach Absprache</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 h-64 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Google Maps - Fahrschule Potsdam</h4>
                  <p className="text-gray-600">Finden Sie unsere Fahrschule im WEBERPARK Potsdam</p>
                  <a 
                    href="https://maps.google.com/?q=ABF+Fahrschule+WEBERPARK+Tuchmacherstraße+45b+14482+Potsdam" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-700 underline"
                  >
                    Route zur Fahrschule Potsdam planen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
