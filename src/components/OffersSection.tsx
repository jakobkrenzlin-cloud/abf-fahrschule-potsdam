
import React from 'react';
import { Check, Phone, Mail, MapPin, Car, Truck, Clock, Award } from 'lucide-react';
import { Button } from './ui/button';

const OffersSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="offers" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Unsere Angebote für Ihren Erfolg in Potsdam
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Starten Sie jetzt Ihre Fahrausbildung oder beginnen Sie eine neue Karriere als Berufskraftfahrer – 
            mit professioneller Betreuung und attraktiven Förderungsmöglichkeiten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Führerschein Angebot */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Car className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">Führerschein-Ausbildung</h3>
                  <p className="text-blue-100">jetzt starten – nur 479 €!</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">479 €</div>
                <div className="text-sm text-blue-100">Sommer Angebot</div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Werde Teil unserer erfolgreichen Fahrschüler – starte deine Ausbildung in Potsdam mit 
                kompletter Theorie, Lern-App, Erste Hilfe Kurs und Fahrsimulator inklusive!
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Alles inklusive:</h4>
                {['14 Theoriestunden inklusive', 'LernApp vom Vogel Verlag inklusive', 'Erste Hilfe Kurs & Sehtest inklusive', '2x 45 Minuten Fahrtraining auf dem Fahrschulsimulator inklusive'].map((item, index) => <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>)}
              </div>

              <div className="pt-4 space-y-3">
                <Button onClick={scrollToContact} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg">
                  Jetzt für 479 € anmelden
                </Button>
                <Button onClick={scrollToContact} variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3">
                  Kostenlos beraten lassen
                </Button>
              </div>
            </div>
          </div>

          {/* Berufsausbildung Angebot */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-green-600 text-white p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Truck className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">Berufsausbildung</h3>
                  <p className="text-green-100">Mit 100% Förderung zum neuen Job als Fahrer</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">100% Förderung</div>
                <div className="text-sm text-green-100">durch Jobcenter oder Agentur für Arbeit möglich</div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Starte deine Ausbildung zum Kurierfahrer/in oder Berufskraftfahrer/in im Güterverkehr – 
                bis zu 100% Förderung durch das Jobcenter oder die Agentur für Arbeit möglich!
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Ihre Vorteile:</h4>
                {['Bis zu 100% Förderung möglich', 'Kursstart jederzeit möglich', 'Zukunftssicherer Beruf', 'Anerkannte Ausbildungsstätte (BKrFQG & AZAV)'].map((item, index) => <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>)}
              </div>

              <div className="pt-4 space-y-3">
                <Button onClick={scrollToContact} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg">
                  Jetzt Kurierfahrer/in werden
                </Button>
                <Button onClick={scrollToContact} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3">
                  Ausbildung zum Berufskraftfahrer starten
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Kontaktinformationen */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Jetzt Kontakt aufnehmen
            </h3>
            <p className="text-gray-600">
              Wir beraten Sie gerne persönlich zu unseren Angeboten in Potsdam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Telefon */}
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Telefon</h4>
              <a href="tel:+4933196795854" className="text-blue-600 hover:text-blue-700 font-medium">
                0331 / 967 958 54
              </a>
            </div>

            {/* E-Mail */}
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">E-Mail</h4>
              <a href="mailto:potsdam@fahrschuleabf.de" className="text-green-600 hover:text-green-700 font-medium">
                potsdam@fahrschuleabf.de
              </a>
            </div>

            {/* Adresse */}
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Adresse</h4>
              <a href="https://maps.google.com/?q=ABF+Bildungszentrum+Fahrschule+Potsdam+Tuchmacherstraße+WEBERPARK" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium">
                WEBERPARK Potsdam<br />
                Tuchmacherstraße
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-white rounded-xl px-8 py-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700 font-medium">Anerkannte Fahrschule Potsdam</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-green-600" />
              <span className="text-gray-700 font-medium">Schnelle Terminvergabe</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <Check className="w-6 h-6 text-orange-600" />
              <span className="text-gray-700 font-medium">100% Förderung möglich</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
