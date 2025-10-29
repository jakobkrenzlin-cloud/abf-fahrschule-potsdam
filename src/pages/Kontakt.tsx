import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Kontakt = () => {
  return <>
      <Helmet>
        <title>Kontakt & Standort Weber Park | ABF Fahrschule Potsdam-Babelsberg</title>
        <meta name="description" content="ABF Fahrschule im Weber Park Potsdam-Babelsberg. Tuchmacherstraße 45 B. ☎ 0331 / 967 958 54. Öffnungszeiten, Anfahrt & direkter Kontakt." />
        <meta name="keywords" content="Fahrschule Potsdam Kontakt, ABF Fahrschule Babelsberg, Fahrschule Weber Park, Fahrschule Potsdam Adresse" />
        <link rel="canonical" href="https://www.abf-fahrschule.de/kontakt" />
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
          "email": "kontakt@abf-fahrschule.de",
          "url": "https://www.abf-fahrschule.de",
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "09:00",
            "closes": "18:00"
          }, {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Friday",
            "opens": "09:00",
            "closes": "16:00"
          }],
          "priceRange": "€€"
        })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              So findest du uns im Weber Park
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mitten in Potsdam-Babelsberg. Modern, zentral und gut erreichbar mit Bus, Straßenbahn und Auto.
            </p>
          </div>

          {/* Kontakt-Karten */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Adresse */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="text-primary" size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Unser Standort</h2>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">ABF Bildungszentrum und Fahrschule GmbH</strong><br />
                    Weber Park<br />
                    Tuchmacherstraße 45 B<br />
                    14482 Potsdam (Babelsberg)
                  </p>
                </div>
              </div>
              <a href="https://maps.google.com/?q=ABF+Fahrschule+Weber+Park+Potsdam" target="_blank" rel="noopener noreferrer">
                <Button className="w-full" variant="outline">
                  📍 In Google Maps öffnen
                </Button>
              </a>
            </div>

            {/* Öffnungszeiten */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="text-primary" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-4">Öffnungszeiten</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Montag – Donnerstag:</span>
                      <span className="font-semibold text-foreground">09:00 – 18:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Freitag:</span>
                      <span className="font-semibold text-foreground">09:00 – 16:00 Uhr</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span>Samstag & Sonntag:</span>
                      <span className="font-semibold text-foreground">Geschlossen</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                💡 Theorieunterricht findet auch außerhalb dieser Zeiten statt. <Link to="/theorie" className="text-primary hover:underline">Mehr zur Theorie</Link>
              </p>
            </div>
          </div>

          {/* Kontakt-Buttons */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground text-center mb-6">
              Nimm direkt Kontakt auf
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <a href="tel:+4933196795854" className="block">
                <Button size="lg" className="w-full text-base">
                  <Phone className="mr-2" size={20} />
                  Jetzt anrufen
                </Button>
              </a>
              <a href="https://wa.me/4933196795854" target="_blank" rel="noopener noreferrer" className="block">
                <Button size="lg" variant="outline" className="w-full text-base">
                  💬 WhatsApp
                </Button>
              </a>
              <a href="mailto:kontakt@abf-fahrschule.de" className="block">
                <Button size="lg" variant="outline" className="w-full text-base">
                  <Mail className="mr-2" size={20} />
                  E-Mail
                </Button>
              </a>
            </div>
            <p className="text-center text-muted-foreground mt-4">
              📞 <a href="tel:+4933196795854" className="text-primary hover:underline">0331 / 967 958 54</a> • 
              ✉️ <a href="mailto:kontakt@abf-fahrschule.de" className="text-primary hover:underline">kontakt@abf-fahrschule.de</a>
            </p>
          </div>

          {/* Google Maps Einbettung */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-12 border border-border">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.5!2d13.0945!3d52.3906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIzJzI2LjIiTiAxM8KwMDUnNDAuMiJF!5e0!3m2!1sde!2sde!4v1234567890" width="100%" height="450" style={{
            border: 0
          }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="ABF Fahrschule Standort im Weber Park Potsdam" />
          </div>

          {/* Anfahrt */}
          <div className="grid md:grid-cols-2 gap-6">
            

            
          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-card rounded-2xl p-8 border-2 border-primary">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Bereit für deinen Führerschein?
            </h2>
            <p className="text-muted-foreground mb-6">
              Komm vorbei oder melde dich direkt online an. Wir freuen uns auf dich!
            </p>
            <Link to="/Anmeldung">
              <Button size="lg" className="text-lg px-8">
                Jetzt Platz sichern
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>;
};
export default Kontakt;