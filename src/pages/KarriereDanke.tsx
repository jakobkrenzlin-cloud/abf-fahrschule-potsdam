import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const KarriereDanke = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1628] text-white">
      <Helmet>
        <title>Bewerbung erhalten – ABF Fahrschule Potsdam</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full text-center bg-[#13243A]/60 border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-[#1A9CFF]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Bewerbung erhalten
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Wir melden uns innerhalb von 48 Stunden bei dir.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-[#1A9CFF] hover:bg-[#1A9CFF]/90 text-white">
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KarriereDanke;
