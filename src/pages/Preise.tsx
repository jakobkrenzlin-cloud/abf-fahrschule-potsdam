import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Preise = () => {
  return <>
      <Helmet>
        <title>Faire Preise für deinen Führerschein | ABF Fahrschule Potsdam</title>
        <meta name="description" content="Transparente Preise für Führerschein Klasse B in Potsdam-Babelsberg. 179€ Frühjahrs Angebot Grundbetrag. Zusätzlich: Kompletter Theorieunterricht, LernApp & Erste Hilfe. Jetzt Angebot sichern!" />
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
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }]
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
              Transparente Kosten gemäß § 32 Fahrlehrergesetz. Bei uns wissen Sie genau, was Sie erwartet.
            </p>
          </div>

          {/* Vollständige Preisliste gemäß § 32 FahrlG */}
          <div className="bg-card border-2 border-primary rounded-2xl p-8 mb-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">🌸 Frühjahrs Angebot – Jetzt sparen!</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Preisliste Führerschein </h2>
              <p className="text-muted-foreground">Alle Preise inkl. MwSt. gemäß § 32 FahrlG</p>
            </div>

            {/* Hauptpreistabelle */}
            <div className="space-y-6 mb-8">
              {/* Grundbetrag */}
              <div className="bg-primary/5 rounded-xl p-6 border-2 border-primary">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Grundbetrag Klasse B</h3>
                    <p className="text-muted-foreground mt-1">
                      Einmalige Gebühr für Verwaltung und vollständige Theorieausbildung
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground line-through">statt 479 €</div>
                    <div className="text-4xl font-bold text-primary">179 €</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-2">Der Grundbetrag beinhaltet:</p>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      Kompletter Theorieunterricht (12 × Grundstoff + 2 × Zusatzstoff)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      Digitale LernApp (Vogel Verlag)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      Erste-Hilfe-Kurs
                    </li>
                    
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      Vorstellung zur theoretischen Prüfung
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      Anmeldebearbeitung & Verwaltung
                    </li>
                  </ul>
                </div>
              </div>

              {/* Fahrstunden Klasse B */}
              <div className="bg-secondary/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Praktische Fahrstunden – Klasse B</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-foreground">Unterweisung (45 Min.)</span>
                    <span className="font-bold text-foreground">67,50 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-foreground">Übungsstunde (45 Min.)</span>
                    <span className="font-bold text-foreground">67,50 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-foreground">Besondere Ausbildungsfahrten (45 Min.)</span>
                    <span className="font-bold text-foreground">75 €</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Besondere Ausbildungsfahrten: 5× Überland, 4× Autobahn, 3× Nachtfahrt (gesetzlich vorgeschrieben)
                </p>
              </div>

              {/* Grundbetrag Klasse A + A2 */}
              <div className="bg-primary/5 rounded-xl p-6 border-2 border-primary">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Grundbetrag Klasse A + A2</h3>
                    <p className="text-muted-foreground mt-1">
                      Einmalige Gebühr für Verwaltung und vollständige Theorieausbildung
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground line-through">statt 650 €</div>
                    <div className="text-4xl font-bold text-primary">550 €</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-2">Der Grundbetrag beinhaltet:</p>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      Erste-Hilfe-Kurs
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      Digitale LernApp (Vogel Verlag)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      100 € Gutschein für Louis (Motorradzubehör)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={16} />
                      ADAC Mitgliedschaft 1 Jahr kostenlos
                    </li>
                  </ul>
                </div>
              </div>

              {/* Fahrstunden Klasse A + A2 */}
              <div className="bg-secondary/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Praktische Fahrstunden – Klasse A + A2</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-foreground">Unterweisung (45 Min.)</span>
                    <span className="font-bold text-foreground">75 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-foreground">Übungsstunde (45 Min.)</span>
                    <span className="font-bold text-foreground">75 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-foreground">Besondere Ausbildungsfahrten (45 Min.)</span>
                    <span className="font-bold text-foreground">85 €</span>
                  </div>
                </div>
              </div>

              {/* Prüfungsvorstellung */}
              <div className="bg-secondary/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Vorstellung zur Prüfung</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-foreground">Theoretische Prüfung</span>
                    <span className="font-bold text-primary">Im Grundbetrag enthalten</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-foreground">Praktische Prüfung</span>
                    <span className="font-bold text-foreground">189 €</span>
                  </div>
                </div>
              </div>

              {/* Externe Gebühren */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <X className="text-muted-foreground" size={20} />
                  Externe Gebühren (nicht an uns)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-muted-foreground">TÜV Theorieprüfung</span>
                    <span className="text-muted-foreground">ca. 23 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-muted-foreground">TÜV Praxisprüfung</span>
                    <span className="text-muted-foreground">ca. 117 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-muted-foreground">Führerscheinantrag (Behörde)</span>
                    <span className="text-muted-foreground">ca. 44 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-muted-foreground">Sehtest & Passfoto</span>
                    <span className="text-muted-foreground">ca. 15 €</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Diese Gebühren werden direkt an TÜV/DEKRA bzw. Behörden gezahlt.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-2">💡 Warum Qualität günstiger ist, als Sie denken</h3>
              <p className="text-muted-foreground">
                Bei ABF Fahrschule investieren Sie in erfahrene Fahrlehrer, moderne Fahrzeuge und eine effiziente Ausbildung. 
                Das bedeutet: weniger Fahrstunden nötig, schnellerer Prüfungserfolg und am Ende sogar niedrigere Gesamtkosten.
              </p>
            </div>

            <div className="text-center">
              <Link to="/Anmeldung">
                <Button size="lg" className="text-lg px-8 py-6">
                  Jetzt Angebot sichern
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Ratenzahlung möglich – sprechen Sie uns bei der Anmeldung darauf an.
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
    </>;
};
export default Preise;