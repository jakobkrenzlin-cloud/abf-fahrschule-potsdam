import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Phone, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileStickyFooter from '../components/MobileStickyFooter';
import { Button } from '@/components/ui/button';
import { fireConversion, CONVERSION_LABELS } from '@/lib/tracking';

const KarriereDanke = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { bewerbung?: boolean } | null;
    if (state?.bewerbung === true) {
      fireConversion(CONVERSION_LABELS.BEWERBUNG);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-white">
      <Helmet>
        <title>Bewerbung eingegangen | ABF Fahrschule Potsdam</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-grow px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/karriere"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu Karriere
          </Link>

          <div className="bg-brand-dark/60 border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-brand" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Deine Bewerbung ist da!
            </h1>
            <p className="text-lg text-white/80 text-center mb-10">
              Wir melden uns innerhalb von 48 Stunden telefonisch oder per E-Mail bei dir.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { n: 1, t: 'Kennenlern-Telefonat', d: 'Kurzes Gespräch, um dich und deine Wünsche kennenzulernen.' },
                { n: 2, t: 'Persönliches Gespräch & Probetag', d: 'Du lernst unser Team, die Fahrzeuge und den Alltag kennen.' },
                { n: 3, t: 'Vertrag & Start', d: 'Wenn es für beide Seiten passt, planen wir deinen Einstieg.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-4 items-start bg-brand-dark/60 border border-white/5 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-brand-strong text-white flex items-center justify-center font-bold flex-shrink-0">
                    {step.n}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{step.t}</div>
                    <div className="text-sm text-white/70">{step.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 mb-8 space-y-3 text-sm">
              <a href="tel:+4933196795854" className="flex items-center justify-center gap-2 text-white/80 hover:text-brand transition-colors">
                <Phone className="w-4 h-4" />
                +49 331 96795854
              </a>
              <a href="mailto:potsdam@fahrschuleabf.de" className="flex items-center justify-center gap-2 text-white/80 hover:text-brand transition-colors">
                <Mail className="w-4 h-4" />
                potsdam@fahrschuleabf.de
              </a>
            </div>

            <div className="flex justify-center">
              <Link to="/">
                <Button size="lg" className="bg-brand-strong hover:bg-brand-strong/90 text-white">
                  Zurück zur Startseite
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default KarriereDanke;
