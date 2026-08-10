import React from 'react';
import { Check, Phone, Mail, MapPin, Car, Clock, Award, Bike } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const OffersSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return <section id="offers" className="py-10 md:py-24 bg-gradient-to-br from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-brand-dark">
            Unsere Angebote in Potsdam
          </h2>
          <p className="text-base md:text-xl text-ink/75 max-w-3xl mx-auto">
            Starten Sie jetzt Ihre Fahrausbildung mit professioneller Betreuung und 
            modernem Unterricht in Potsdam.
          </p>
        </div>

        {/* Two Column Grid: Auto + Motorrad */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
          {/* Führerschein Angebot */}
          <div className="bg-white rounded-2xl shadow-lg border border-black/[0.08] overflow-hidden">
            <div className="bg-brand-strong text-white p-4 md:p-6">
              <div className="flex items-center space-x-3 mb-3 md:mb-4">
                <Car className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold">Führerschein-Ausbildung</h3>
                  <p className="text-white/80">🍂 Herbst-Angebot bis zum 31. Oktober 2026 nur 199 €!</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">199 €</div>
                <div className="text-sm text-white/80">Herbst-Angebot - Grundbetrag</div>
                <div className="text-xs text-white/80 mt-2">Preis gemäß § 32 Fahrlehrergesetz: Unterweisungsstunde 67,50 €/45 Min., Übungsstunde 67,50 €/45 Min. und Besondere Ausbildungsfahrten 75 €/45 Min.</div>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">

               <p className="text-ink leading-relaxed">
                Werde Teil unserer erfolgreichen Fahrschüler – starte deine Ausbildung in Potsdam mit 
                kompletter Theorie in nur einer Woche und ADAC 1 Jahr kostenlos!
               </p>

              <div className="space-y-3">
                <h3 className="font-semibold text-brand-dark mb-3">Im Grundbetrag enthalten:</h3>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-ink">Kompletter Theorieunterricht</span>
                </div>
              </div>

               <div className="space-y-3">
                <h3 className="font-semibold text-brand-dark mb-3">Im Grundbetrag zusätzlich:</h3>
                {['ADAC 1 Jahr kostenlos'].map((item, index) => <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-ink">{item}</span>
                  </div>)}
              </div>

              <div className="pt-4 space-y-3">
                <Link to="/anmeldung">
                  <Button className="w-full bg-brand-strong hover:bg-brand-strong text-white font-semibold py-3 text-lg">
                    Jetzt für 199 € anmelden
                  </Button>
                </Link>
                <Button onClick={scrollToContact} variant="outline" className="w-full border-brand/30 text-brand-strong hover:bg-surface font-semibold py-3">
                  Kostenlos beraten lassen
                </Button>
              </div>
            </div>
          </div>

          {/* Motorrad Angebot */}
          <div className="bg-black rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-brand-strong to-brand-dark text-white p-4 md:p-6">
              <div className="flex items-center space-x-3 mb-3 md:mb-4">
                <Bike className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold">Motorrad-Führerschein</h3>
                  <p className="text-white/80">🍂 Herbst-Angebot bis zum 31. Oktober 2026</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">399 €</div>
                <div className="text-sm text-white/80">Herbst-Angebot – Grundbetrag (A1, A2, A)</div>
                <div className="text-xs text-white/80 mt-2">Preis gemäß § 32 Fahrlehrergesetz: Unterweisungsstunde 75 €/45 Min., Übungsstunde 75 €/45 Min. und Besondere Ausbildungsfahrten 85 €/45 Min.</div>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6 flex-1 flex flex-col">
              <p className="text-white/75 leading-relaxed">
                Theorie im Winter machen und startklar sein, wenn die Saison beginnt – A1 ab 16,
                A2 ab 18 oder direkt Klasse A.
              </p>

              <div className="space-y-3">
                <h3 className="font-semibold text-white mb-3">Im Grundbetrag zusätzlich:</h3>
                {['Kompletter Theorieunterricht', 'LernApp für die Theorieprüfung', '100 € Louis und Polo Gutschein'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-white/75">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-auto space-y-3">
                <Link to="/anmeldungmotorrad">
                  <Button className="w-full bg-brand-strong hover:bg-brand-strong/90 text-white font-semibold py-3 text-lg">
                    Jetzt für 399 € anmelden
                  </Button>
                </Link>
                <Link to="/b196">
                  <Button variant="outline" className="w-full border-brand-strong text-white hover:bg-brand-strong/20 font-semibold py-3 bg-transparent">
                    Oder B196 für 750 € Festpreis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Kontaktinformationen */}
        <div className="bg-white rounded-2xl shadow-lg border border-black/[0.08] p-5 md:p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-brand-dark mb-2">
              Jetzt Kontakt aufnehmen
            </h3>
            <p className="text-ink/75">
              Wir beraten Sie gerne persönlich zu unseren Angeboten in Potsdam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Telefon */}
            <div className="text-center p-4 bg-surface rounded-xl">
              <Phone className="w-8 h-8 text-brand-strong mx-auto mb-3" />
              <h3 className="font-semibold text-brand-dark mb-2">Telefon</h3>
              <div className="space-y-1 text-sm">
                <div><span className="text-ink/60">Festnetz: </span><a href="tel:+4933196795854" className="text-brand-strong hover:text-brand-strong font-medium">+49 331 96795854</a></div>
                <div><span className="text-ink/60">Mobil: </span><a href="tel:+491622191290" className="text-brand-strong hover:text-brand-strong font-medium">+49 162 2191290</a></div>
              </div>
            </div>

            {/* E-Mail */}
            <div className="text-center p-4 bg-success/10 rounded-xl">
              <Mail className="w-8 h-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold text-brand-dark mb-2">E-Mail</h3>
              <a href="mailto:kontakt@abf-fahrschule.de" className="text-success hover:text-success font-medium">
                kontakt@abf-fahrschule.de
              </a>
            </div>

            {/* Adresse */}
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-brand-dark mb-2">Adresse</h3>
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
              <Award className="w-6 h-6 text-brand-strong" />
              <span className="text-ink font-medium">Anerkannte Fahrschule Potsdam</span>
            </div>
            <div className="w-px h-8 bg-surface"></div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-success" />
              <span className="text-ink font-medium">Schnelle Terminvergabe</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default OffersSection;