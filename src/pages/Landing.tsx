import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, TrendingUp, DollarSign, Calendar, CheckCircle, Star, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Landing = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    licenseClass: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    console.log('Form submitted:', formData);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/4933196795854', '_blank');
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
            <div className="w-32 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
              Logo Platzhalter
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                🚗 Führerschein in Potsdam-Babelsberg
                <span className="block text-yellow-300">schnell, fair & sicher bestehen</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Jetzt anmelden & 50 € sparen
              </p>
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-4 rounded-lg font-semibold"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Jetzt anmelden
              </Button>
            </div>
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="aspect-video bg-white/20 rounded-lg flex items-center justify-center text-white/70">
                Fahrschüler im Auto - Bild Platzhalter
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-lg font-semibold ml-2">4.9/5 (200+ Bewertungen)</span>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Fahrschüler erfolgreich bestanden</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Erfolgsquote beim ersten Versuch</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Jahre Erfahrung</div>
              </div>
            </div>
          </div>
          
          {/* Trust Logos */}
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div className="w-20 h-12 bg-muted rounded flex items-center justify-center text-xs">TÜV</div>
            <div className="w-20 h-12 bg-muted rounded flex items-center justify-center text-xs">DEKRA</div>
            <div className="w-20 h-12 bg-muted rounded flex items-center justify-center text-xs">Google</div>
          </div>
        </div>
      </section>

      {/* USPs/Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900">
            Warum ABF Fahrschule?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Zentrale Lage</h3>
              <p className="text-gray-600">Mitten in Potsdam-Babelsberg, perfekt erreichbar</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hohe Erfolgsquote</h3>
              <p className="text-gray-600">95% bestehen beim ersten Versuch</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Faire Preise</h3>
              <p className="text-gray-600">Transparente Kosten ohne versteckte Gebühren</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Termine</h3>
              <p className="text-gray-600">Fahrstunden auch abends und am Wochenende</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Starte jetzt deinen Führerschein
          </h2>
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-4"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Kostenlose Beratung sichern
          </Button>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900">
            So läuft deine Fahrausbildung ab
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: 1, title: 'Anmeldung', desc: 'Einfache Anmeldung vor Ort oder online' },
              { step: 2, title: 'Theorie', desc: 'Theorieunterricht in kleinen Gruppen' },
              { step: 3, title: 'Praxis', desc: 'Fahrstunden mit erfahrenen Lehrern' },
              { step: 4, title: 'Theorieprüfung', desc: 'Prüfung beim TÜV mit Vorbereitung' },
              { step: 5, title: 'Praxisprüfung', desc: 'Praktische Prüfung und Führerschein' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-900">
              Kostenlose Beratung sichern
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Wir melden uns in 24h bei dir zurück
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Vollständiger Name *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefonnummer *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="license">Führerscheinklasse *</Label>
                <Select onValueChange={(value) => setFormData({...formData, licenseClass: value})}>
                  <SelectTrigger className="mt-1">
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
              
              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Jetzt Anfrage senden
              </Button>
            </form>
            
            {/* WhatsApp & Call Buttons */}
            <div className="flex gap-4 mt-6">
              <Button 
                onClick={handleWhatsApp}
                variant="outline"
                size="lg"
                className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button 
                onClick={handleCall}
                variant="outline"
                size="lg"
                className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <Phone className="w-5 h-5 mr-2" />
                Anrufen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900">
            Häufig gestellte Fragen
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Wie lange dauert die Fahrausbildung?
              </AccordionTrigger>
              <AccordionContent>
                Die Dauer hängt von verschiedenen Faktoren ab. Im Durchschnitt benötigen unsere Fahrschüler 3-6 Monate für den Führerschein Klasse B, inklusive Theorie- und Praxisausbildung.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Was kostet der Führerschein?
              </AccordionTrigger>
              <AccordionContent>
                Die Kosten variieren je nach Führerscheinklasse und benötigten Fahrstunden. Gerne erstellen wir dir ein individuelles und transparentes Angebot. Kontaktiere uns für Details.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Kann ich auch abends Fahrstunden nehmen?
              </AccordionTrigger>
              <AccordionContent>
                Ja, wir bieten flexible Termine auch abends und am Wochenende an. So kannst du die Fahrausbildung optimal in deinen Alltag integrieren.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Welche Unterlagen brauche ich zur Anmeldung?
              </AccordionTrigger>
              <AccordionContent>
                Du benötigst: Personalausweis, Passbild, Sehtest, Erste-Hilfe-Kurs-Bescheinigung und gegebenenfalls weitere Dokumente je nach Führerscheinklasse.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Jetzt anmelden & Führerschein starten
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Sichere dir jetzt deinen Platz und spare 50 €
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-4"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Jetzt anmelden
          </Button>
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