
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Allgemeine Hinweise</h3>
          <p className="mb-4">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">2. Verantwortliche Stelle</h2>
          <p className="mb-4">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <p className="mb-4"><strong>ABF Bildungszentrum und Fahrschule GmbH</strong><br />
          Aslihan Elik<br />
          Tuchmacherstraße 45b<br />
          14482 Potsdam<br />
          Telefon: 0331 / 967 958 54<br />
          E-Mail: potsdam@fahrschuleabf.de</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">3. Datenerfassung auf dieser Website</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Kontaktformular</h3>
          <p className="mb-4">Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Server-Log-Dateien</h3>
          <p className="mb-4">Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">4. Hosting</h2>
          <p className="mb-4">Wir hosten die Inhalte unserer Website bei IONOS. Anbieter ist die IONOS SE, Elgendorfer Str. 57, 56410 Montabaur (nachfolgend „IONOS"). Wenn Sie unsere Website besuchen, erfasst IONOS verschiedene Logfiles inklusive Ihrer IP-Adressen.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">5. Ihre Rechte</h2>
          <p className="mb-4">Sie haben folgende Rechte:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Recht auf Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten</li>
            <li>Recht auf Berichtigung unrichtiger oder unvollständiger Daten</li>
            <li>Recht auf Löschung Ihrer personenbezogenen Daten</li>
            <li>Recht auf Einschränkung der Verarbeitung</li>
            <li>Recht auf Datenübertragbarkeit</li>
            <li>Widerspruchsrecht gegen die Verarbeitung</li>
            <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">6. Speicherdauer</h2>
          <p className="mb-4">Wir speichern personenbezogene Daten nur so lange, wie es für die Erfüllung der Zwecke erforderlich ist, zu denen die Daten erhoben wurden, oder soweit dies durch gesetzliche Aufbewahrungsfristen vorgeschrieben ist.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">7. Datenschutzbeauftragte</h2>
          <p className="mb-4">Bei Fragen zum Datenschutz wenden Sie sich bitte an:</p>
          <p className="mb-4">Aslihan Elik<br />
          ABF Bildungszentrum und Fahrschule GmbH<br />
          Tuchmacherstraße 45b<br />
          14482 Potsdam<br />
          E-Mail: potsdam@fahrschuleabf.de</p>

          <p className="text-sm text-gray-600 mt-8">Stand: Januar 2025</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Datenschutz;
