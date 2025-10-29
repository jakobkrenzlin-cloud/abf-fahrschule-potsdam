import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Preise = () => {
  return (
    <>
      <Helmet>
        <title>Faire Preise für deinen Führerschein | ABF Fahrschule Potsdam</title>
        <meta name="description" content="Transparente Preise für Führerschein Klasse B in Potsdam-Babelsberg. 479€ Anmeldegebühr inkl. 14 Theoriestunden, LernApp & Erste Hilfe. Jetzt Angebot sichern!" />
        <meta name="keywords" content="Fahrschule Potsdam Preise, Führerschein Kosten Potsdam, Fahrschule Babelsberg Preise, Führerschein Klasse B Kosten" />
        <link rel="canonical" href="https://www.abf-fahrschule.de/preise" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ABF Bildungszentrum und Fahrschule GmbH",
            "image": "https://www.abf-fahrschule.de/abf-logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Weber Park, Tuchmacherstraße 45 B",
              "addressLocality": "Potsdam",
              "addressRegion": "Brandenburg",
              "postalCode": "14482",
              "addressCountry": "DE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 52.3906,
              "longitude": 13.0945
            },
            "telephone": "+49-331-9679-5854",
            "priceRange": "€€",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Faire Preise – volle Leistung
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparente Kosten ohne versteckte Gebühren. Bei uns weißt du genau, was dich erwartet.
            </p>
          </div>

          {/* Hauptangebot */}
          <div className="bg-card border-2 border-primary rounded-2xl p-8 mb-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ⚡ Aktuelles Angebot – Nur bis 30.04.2025
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Führerschein Klasse B</h2>
              <div className="text-5xl font-bold text-primary mb-4">
                479 €
                <span className="text-lg text-muted-foreground font-normal"> Anmeldegebühr</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Im Preis enthalten */}
              <div className="bg-secondary/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Check className="text-primary" size={24} />
                  Im Preis enthalten
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-primary mt-1 flex-shrink-0" size={18} />
                    <span className="text-foreground">14 Theoriestunden (Grundstoff + klassenspezifisch)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary mt-1 flex-shrink-0" size={18} />
                    <span className="text-foreground">Digitale LernApp vom Vogel Verlag</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary mt-1 flex-shrink-0" size={18} />
                    <span className="text-foreground">Erste-Hilfe-Kurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary mt-1 flex-shrink-0" size={18} />
                    <span className="text-foreground">Fahrsimulator-Training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary mt-1 flex-shrink-0" size={18} />
                    <span className="text-foreground">Vorstellung zur theoretischen Prüfung</span>
                  </li>
                </ul>
              </div>

              {/* Zusätzliche Kosten */}
              <div className="bg-secondary/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <X className="text-muted-foreground" size={24} />
                  Zusätzlich anfallende Kosten
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-foreground">Fahrpraxis (Übungsfahrten & Sonderfahrten nach Bedarf)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-foreground">Vorstellung zur praktischen Prüfung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-foreground">TÜV-Prüfungsgebühren (Theorie & Praxis)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-foreground">Sehtest & biometrisches Passfoto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-foreground">Behördengebühren für Führerscheinantrag</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-2">💡 Warum Qualität günstiger ist, als du denkst</h3>
              <p className="text-muted-foreground">
                Bei ABF Fahrschule investierst du in erfahrene Fahrlehrer, moderne Fahrzeuge und eine effiziente Ausbildung. 
                Das bedeutet: weniger Fahrstunden nötig, schnellerer Prüfungserfolg und am Ende sogar niedrigere Gesamtkosten. 
                Billig-Angebote kosten dich oft mehr – durch mehr Fahrstunden und Prüfungswiederholungen.
              </p>
            </div>

            <div className="text-center">
              <Link to="/Anmeldung">
                <Button size="lg" className="text-lg px-8 py-6">
                  Jetzt Angebot sichern
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                ⏱️ Angebot gültig bis 30.04.2025 • Begrenzte Plätze verfügbar
              </p>
            </div>
          </div>

          {/* Weitere Informationen */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">📊 Ratenzahlung möglich</h3>
              <p className="text-muted-foreground">
                Wir bieten flexible Zahlungsoptionen an. Sprich uns einfach bei der Anmeldung darauf an.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">🎓 BF17 (Begleitetes Fahren)</h3>
              <p className="text-muted-foreground">
                Bereits ab 16,5 Jahren kannst du mit der Ausbildung starten. Gleiche Konditionen wie für Klasse B.
              </p>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Noch Fragen zu den Preisen?
            </h2>
            <p className="text-muted-foreground mb-6">
              Ruf uns an oder komm direkt im Weber Park vorbei. Wir beraten dich gerne persönlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+493319679585" className="inline-block">
                <Button size="lg" variant="outline">
                  📞 0331 / 967 958 54
                </Button>
              </a>
              <Link to="/kontakt">
                <Button size="lg" variant="outline">
                  📍 Standort & Öffnungszeiten
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Preise;