import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
const AGB = () => {
  return <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">§ 1 Geltungsbereich</h2>
          <p className="mb-4">Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der ABF Bildungszentrum und Fahrschule GmbH (nachfolgend „Fahrschule" genannt) und den Fahrschülern über die Erteilung von Fahrausbildung für PKW- und Motorrad-Führerscheine.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 2 Vertragsabschluss</h2>
          <p className="mb-4">Der Ausbildungsvertrag kommt mit der Anmeldung in der Fahrschule und der Annahme durch die Fahrschule zustande. Die Anmeldung erfolgt schriftlich oder elektronisch.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 3 Leistungen der Fahrschule</h2>
          <p className="mb-4">Die Fahrschule verpflichtet sich zur ordnungsgemäßen Durchführung der Fahrausbildung, insbesondere:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Bereitstellung qualifizierter Fahrlehrer</li>
            <li>Bereitstellung geeigneter und verkehrssicherer Lehrfahrzeuge</li>
            <li>Durchführung des theoretischen Unterrichts</li>
            <li>Durchführung der praktischen Fahrstunden</li>
            <li>Vorbereitung auf die theoretische und praktische Prüfung</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 4 Pflichten des Fahrschülers</h2>
          <p className="mb-4">Der Fahrschüler verpflichtet sich:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Zur rechtzeitigen Zahlung der vereinbarten Entgelte</li>
            <li>Zur Einhaltung der vereinbarten Termine</li>
            <li>Zum Mitführen aller notwendigen Unterlagen (Ausweis, Sehhilfen, etc.)</li>
            <li>Zur ordnungsgemäßen Behandlung der Lehrfahrzeuge</li>
            <li>Zur Beachtung der Hausordnung der Fahrschule</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 5 Preise und Zahlungsbedingungen</h2>
          <p className="mb-4">Es gelten die zum Zeitpunkt der Anmeldung gültigen Preise der Fahrschule. Zahlungen sind möglich durch:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Barzahlung</li>
            <li>Kartenzahlung (EC-Karte, Kreditkarte)</li>
          </ul>
          <p className="mb-4">Die Grundgebühr ist bei Vertragsabschluss fällig. Fahrstunden sind vor Antritt zu bezahlen, sofern nicht anders vereinbart.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 6 Rücktritt und Stornierung</h2>
          
          <ul className="mb-4 ml-6 list-disc">
            <li>Fahrstunden können bis 48 Stunden (2 Werktage) vor dem vereinbarten Termin kostenfrei storniert werden</li>
            <li>Bei späterer Stornierung oder Nichterscheinen werden 75% der Stundengebühr fällig</li>
            
            
          </ul>
          

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 7 Die Haftung der Fahrschule ist ausgeschlossen für</h2>
          <p className="mb-4">Die Haftung der Fahrschule ist ausgeschlossen für:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Verspätungen durch höhere Gewalt oder Verkehrsstörungen</li>
            <li>Schäden, die durch das Verhalten des Fahrschülers entstehen</li>
            <li>Den Ausgang der Führerscheinprüfung</li>
          </ul>
          <p className="mb-4">Die Haftung für Vorsatz und grobe Fahrlässigkeit bleibt unberührt. Die Haftung für leichte Fahrlässigkeit ist auf die Verletzung wesentlicher Vertragspflichten beschränkt.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 8 Kündigung</h2>
          <p className="mb-4">Beide Parteien können den Ausbildungsvertrag jederzeit mit einer Frist von 14 Tagen kündigen. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 9 Datenschutz</h2>
          <p className="mb-4">Die Fahrschule verpflichtet sich zur Einhaltung der datenschutzrechtlichen Bestimmungen. Nähere Informationen finden Sie in unserer Datenschutzerklärung.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 10 Schlussbestimmungen</h2>
          <p className="mb-4">Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Gerichtsstand ist Potsdam, soweit gesetzlich zulässig.</p>
          <p className="mb-4">Es gilt deutsches Recht.</p>

          <p className="text-sm text-gray-600 mt-8">Stand: Januar 2025</p>
        </div>
      </div>
      <Footer />
    </div>;
};
export default AGB;