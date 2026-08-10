import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ADDRESS_LINE, PHONE_DISPLAY, PHONE_RAW } from '@/components/lp/constants';

const linkClass =
  'flex items-center min-h-[44px] text-white/70 hover:text-white transition-colors';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-page section-y pb-28 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src="/lovable-uploads/be0365c9-6495-4129-8061-539de20befe7.png"
              alt="ABF Fahrschule Potsdam"
              width={180}
              height={64}
              className="h-16 w-auto"
              loading="lazy"
            />
            <p className="text-white/70 text-small leading-relaxed">
              Deine Fahrschule in Potsdam. Mit über 15 Jahren Erfahrung begleiten wir dich
              sicher zum Führerschein.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-h3 font-bold">Schnellzugriff</h2>
            <div>
              <Link to="/" className={linkClass}>Start</Link>
              <Link to="/anmeldung" className={linkClass}>Anmeldung</Link>
              <Link to="/preise" className={linkClass}>Preise</Link>
              <Link to="/theorie" className={linkClass}>Theorie</Link>
              <Link to="/kontakt" className={linkClass}>Kontakt</Link>
              <Link to="/karriere" className={linkClass}>Karriere</Link>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-h3 font-bold">Unsere Leistungen</h2>
            <ul className="text-white/70 text-small space-y-2">
              <li>Führerschein Klasse B</li>
              <li>Theorieunterricht</li>
              <li>Praktische Fahrstunden</li>
              <li>Prüfungsvorbereitung</li>
              <li>Motorrad A / A1 / A2 und B196</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-h3 font-bold">Kontakt</h2>
            <div className="space-y-3 text-small">
              <p className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-brand mt-0.5 shrink-0" aria-hidden="true" />
                <span>{ADDRESS_LINE}</span>
              </p>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand mt-3 shrink-0" aria-hidden="true" />
                <div>
                  <a href="tel:+4933196795854" className={linkClass}>
                    Festnetz: +49 331 96795854
                  </a>
                  <a href={`tel:${PHONE_RAW}`} className={linkClass}>
                    Mobil: {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
                <a href="mailto:kontakt@abf-fahrschule.de" className={linkClass}>
                  kontakt@abf-fahrschule.de
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-center text-white/50 text-label mb-6">
            Alle abgebildeten Personen haben der Veröffentlichung ihrer Bilder zugestimmt.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-small">
              © {year} ABF Fahrschule Potsdam. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-small">
              <Link to="/impressum" className={linkClass}>Impressum</Link>
              <Link to="/datenschutz" className={linkClass}>Datenschutz</Link>
              <Link to="/agb" className={linkClass}>AGB</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
