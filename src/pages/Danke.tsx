import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Danke = () => {
  useEffect(() => {
    // Trigger Google Ads conversion tracking when page loads
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17551238202/UhzpCN_gq6YbELrIirFB'
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vielen Dank für deine Anfrage!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Wir haben deine Anmeldung erfolgreich erhalten und werden uns innerhalb von 24 Stunden bei dir melden.
            </p>
            
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Was passiert als Nächstes?
              </h2>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Ein Mitarbeiter wird sich telefonisch oder per E-Mail bei dir melden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Wir vereinbaren einen Termin für ein persönliches Beratungsgespräch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Du erhältst alle Informationen zur Anmeldung und zum Start</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t pt-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Du hast dringliche Fragen?
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:+4933123456" className="hover:text-primary transition-colors">
                    +49 331 123456
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:info@abf-fahrschule-potsdam.de" className="hover:text-primary transition-colors">
                    info@abf-fahrschule-potsdam.de
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Tuchmacherstraße 45b, 14482 Potsdam</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" size="lg">
                  Zurück zur Startseite
                </Button>
              </Link>
              <Link to="/Anmeldung">
                <Button size="lg">
                  Weitere Informationen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Danke;
