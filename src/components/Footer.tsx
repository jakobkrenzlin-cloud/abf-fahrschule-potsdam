import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/be0365c9-6495-4129-8061-539de20befe7.png"
                alt="ABF Fahrschule Potsdam Logo"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Ihre vertrauensvolle Fahrschule in Potsdam. Mit über 15 Jahren Erfahrung 
              begleiten wir Sie sicher zum Führerschein.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Schnellzugriff</h4>
            <div className="space-y-2">
              <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-white transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-white transition-colors">
                Über uns
              </button>
              <button onClick={() => scrollToSection('process')} className="block text-gray-400 hover:text-white transition-colors">
                Führerschein
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="block text-gray-400 hover:text-white transition-colors">
                Bewertungen
              </button>
              <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white transition-colors">
                Kontakt
              </button>
              <Link to="/Anmeldung" className="block text-gray-400 hover:text-white transition-colors">
                Anmeldung
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Unsere Leistungen</h4>
            <div className="space-y-2 text-gray-400">
              <div>Führerschein Klasse B</div>
              <div>Theorieunterricht</div>
              <div>Praktische Fahrstunden</div>
              <div>Prüfungsvorbereitung</div>
              <div>Auffrischungskurse</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div className="text-gray-400">
                  WEBERPARK<br />
                  Tuchmacherstraße 45b<br />
                  14482 Potsdam
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+4933196795854" className="text-gray-400 hover:text-white transition-colors">
                  0331 / 967 958 54
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:kontakt@abf-fahrschule.de" className="text-gray-400 hover:text-white transition-colors">
                  kontakt@abf-fahrschule.de
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Consent Notice */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center text-gray-500 text-xs mb-6">
            Alle abgebildeten Personen haben der Veröffentlichung ihrer Bilder zugestimmt.
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 ABF Fahrschule Potsdam. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/impressum" className="text-gray-400 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link to="/datenschutz" className="text-gray-400 hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link to="/agb" className="text-gray-400 hover:text-white transition-colors">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
