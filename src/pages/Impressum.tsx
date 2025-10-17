
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
          
          <div className="mb-6">
            <p><strong>ABF Bildungszentrum und Fahrschule GmbH</strong></p>
            <p>Weber Park<br />
            Tuchmacherstraße 45 B<br />
            14482 Potsdam</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vertreten durch:</h3>
            <p>Alishan Celik (Geschäftsführer)</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Kontakt</h3>
            <p>Telefon: 0331 / 9679 58 54<br />
            E-Mail: <a href="mailto:kontakt@abf-fahrschule.de" className="text-blue-600 hover:text-blue-800">kontakt@abf-fahrschule.de</a></p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Registereintrag</h3>
            <p>Eintragung im Handelsregister<br />
            Registergericht: Amtsgericht Potsdam<br />
            Registernummer: HRB 40850</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Umsatzsteuer-Identifikationsnummer</h3>
            <p>Steuernummer: 3720153721</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Zuständige Aufsichtsbehörde</h3>
            <p>Landesamt für Verkehr Brandenburg<br />
            Horstweg 102-109<br />
            14478 Potsdam<br />
            <br />
            Fahrerlaubnisbehörde:<br />
            Landeshauptstadt Potsdam<br />
            Friedrich-Ebert-Straße 79/81<br />
            14469 Potsdam</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <p>Alishan Celik<br />
            Weber Park, Tuchmacherstraße 45 B<br />
            14482 Potsdam</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">EU-Streitschlichtung</h3>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:text-blue-800"> https://ec.europa.eu/consumers/odr/</a><br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherstreitschlichtungsstelle teilzunehmen.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Impressum;
