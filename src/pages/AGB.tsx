import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
const AGB = () => {
  return <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-4 text-sm text-gray-600">Diese AGB gelten für Verträge, die über unsere Website oder in der Fahrschule geschlossen werden.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 1 Geltungsbereich</h2>
          <p className="mb-4">Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der ABF Bildungszentrum und Fahrschule GmbH, Weber Park, Tuchmacherstraße 45 B, 14482 Potsdam (nachfolgend „Fahrschule" genannt) und den Fahrschülern (nachfolgend „Kunde" genannt) über die Erteilung von Fahrausbildung für PKW- und Motorrad-Führerscheine.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 2 Vertragsabschluss</h2>
          <p className="mb-4">Der Ausbildungsvertrag kommt mit der Anmeldung in der Fahrschule und der Annahme durch die Fahrschule zustande. Die Anmeldung kann erfolgen:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Schriftlich in der Fahrschule</li>
            <li>Online über das Anmeldeformular auf unserer Website</li>
            <li>Telefonisch (mit anschließender schriftlicher Bestätigung)</li>
          </ul>
          <p className="mb-4">Bei Online-Anmeldung erfolgt die Vertragsannahme durch eine Bestätigungs-E-Mail der Fahrschule. Der Vertrag gilt ab diesem Zeitpunkt als abgeschlossen.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 3 Leistungen und Preise der Fahrschule (gemäß § 32 FahrlG)</h2>
          <p className="mb-4"><strong>Grundbetrag (179 € Frühjahrs Angebot) beinhaltet:</strong></p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Kompletter Theorieunterricht (12 × Grundstoff à 90 Minuten + 2 × klassenspezifischer Zusatzstoff à 90 Minuten)</li>
            <li>Zugang zur LernApp für Theorieprüfung (Vogel Verlag)</li>
            <li>Erste-Hilfe-Kurs</li>
            <li>ADAC 1 Jahr kostenlos</li>
            <li>Vorstellung zur theoretischen Prüfung</li>
            <li>Anmeldebearbeitung und Verwaltung</li>
          </ul>
          <p className="mb-4"><strong>Preise für praktische Fahrstunden (je 45 Minuten):</strong></p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Übungsfahrt: 69 €</li>
            <li>Sonderfahrt Überland: 79 €</li>
            <li>Sonderfahrt Autobahn: 79 €</li>
            <li>Sonderfahrt Nachtfahrt: 79 €</li>
          </ul>
          <p className="mb-4"><strong>Vorstellung zur Prüfung:</strong></p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Theoretische Prüfung: Im Grundbetrag enthalten</li>
            <li>Praktische Prüfung: 189 €</li>
          </ul>
          <p className="mb-4"><strong>Externe Gebühren (nicht an die Fahrschule):</strong></p>
          <ul className="mb-4 ml-6 list-disc">
            <li>TÜV Theorieprüfung: ca. 23 €</li>
            <li>TÜV Praxisprüfung: ca. 117 €</li>
            <li>Führerscheinantrag (Behörde): ca. 44 €</li>
            <li>Sehtest & Passbilder: ca. 15 €</li>
          </ul>
          <p className="mb-4">Die Fahrschule verpflichtet sich zur ordnungsgemäßen Durchführung der Fahrausbildung nach den geltenden gesetzlichen Bestimmungen, insbesondere:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Bereitstellung qualifizierter, staatlich geprüfter Fahrlehrer</li>
            <li>Bereitstellung geeigneter und verkehrssicherer Lehrfahrzeuge</li>
            <li>Durchführung der praktischen Fahrstunden nach Fahrschüler-Ausbildungsordnung</li>
            <li>Vorbereitung auf die theoretische und praktische Prüfung</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 4 Pflichten des Kunden</h2>
          <p className="mb-4">Der Kunde verpflichtet sich:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Zur rechtzeitigen Zahlung der vereinbarten Entgelte</li>
            <li>Zur pünktlichen Einhaltung der vereinbarten Termine</li>
            <li>Zum Mitführen aller notwendigen Unterlagen (Ausweis, Sehhilfen, etc.)</li>
            <li>Zur ordnungsgemäßen Behandlung der Lehrfahrzeuge</li>
            <li>Zur Beachtung der Hausordnung der Fahrschule</li>
            <li>Zum Erscheinen in nüchternem Zustand (kein Alkohol, keine Drogen)</li>
            <li>Zur unverzüglichen Meldung von Änderungen persönlicher Daten</li>
          </ul>
          <p className="mb-4"><strong>Bei Minderjährigen (BF17):</strong> Für Fahrschüler unter 18 Jahren ist die schriftliche Einwilligung der Erziehungsberechtigten erforderlich.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 5 Preise und Zahlungsbedingungen</h2>
          <p className="mb-4">Es gelten die zum Zeitpunkt der Anmeldung auf unserer Website und in der Fahrschule ausgewiesenen Preise. Alle Preise sind Endpreise und verstehen sich inklusive der gesetzlichen Mehrwertsteuer.</p>
          
          <p className="mb-4"><strong>Zahlungsmodalitäten:</strong></p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Der Grundbetrag (179 € Frühjahrs Angebot) ist bei Vertragsabschluss fällig</li>
            <li>Fahrstunden sind vor Fahrtantritt zu bezahlen (Barzahlung oder Kartenzahlung)</li>
            <li>Sonderfahrten (Autobahn, Überland, Nachtfahrt) sind spätestens 2 Werktage vor Fahrtantritt zu bezahlen</li>
          </ul>

          <p className="mb-4"><strong>Zahlungsarten:</strong></p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Barzahlung</li>
            <li>EC-Karte</li>
            <li>Kreditkarte</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 6 Absage und Stornierung von Fahrstunden</h2>
          <ul className="mb-4 ml-6 list-disc">
            <li>Fahrstunden können bis zu 2 Werktage (48 Stunden) vor dem vereinbarten Termin kostenfrei storniert werden</li>
            <li>Bei späterer Stornierung oder Nichterscheinen ohne Absage werden 75% der Stundengebühr fällig</li>
            <li>Bei Verhinderung durch Krankheit ist ein ärztliches Attest vorzulegen</li>
            <li>Die Absage muss telefonisch, per WhatsApp oder per E-Mail erfolgen</li>
          </ul>
          <p className="mb-4"><strong>Absage durch die Fahrschule:</strong> Die Fahrschule behält sich vor, Fahrstunden bei technischen Problemen, Krankheit des Fahrlehrers oder höherer Gewalt abzusagen. In diesem Fall werden keine Gebühren berechnet, und ein Ersatztermin wird angeboten.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 7 Widerrufsrecht bei Online-Anmeldung</h2>
          <p className="mb-4"><strong>Widerrufsbelehrung für Verbraucher (§ 312g BGB):</strong></p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Widerrufsrecht</h3>
            <p className="mb-4">Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
            <p className="mb-4">Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
            <p className="mb-4">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:</p>
            <p className="mb-4">
              <strong>ABF Bildungszentrum und Fahrschule GmbH</strong><br />
              Weber Park, Tuchmacherstraße 45 B<br />
              14482 Potsdam<br />
              Telefon: 0331 / 9679 58 54<br />
              E-Mail: kontakt@abf-fahrschule.de
            </p>
            <p className="mb-4">mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Folgen des Widerrufs</h3>
            <p className="mb-4">Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Vorzeitiges Erlöschen des Widerrufsrechts</h3>
            <p className="mb-4">Haben Sie ausdrücklich verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll (z.B. sofortiger Zugang zur LernApp oder Teilnahme am Theorieunterricht), so erlischt Ihr Widerrufsrecht, sobald wir die Dienstleistung vollständig erbracht haben.</p>
            <p className="mb-4">In diesem Fall müssen Sie uns einen angemessenen Betrag für die bereits erbrachten Leistungen zahlen.</p>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 8 Haftung</h2>
          <p className="mb-4">Die Haftung der Fahrschule ist ausgeschlossen für:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Verspätungen durch höhere Gewalt, Verkehrsstörungen oder Witterungsbedingungen</li>
            <li>Schäden am Lehrfahrzeug, die durch Verschulden des Kunden entstehen</li>
            <li>Den Ausgang der Führerscheinprüfung (die Fahrschule bereitet bestmöglich vor, kann aber keinen Prüfungserfolg garantieren)</li>
            <li>Persönliche Gegenstände des Kunden, die im Fahrzeug zurückgelassen werden</li>
          </ul>
          <p className="mb-4"><strong>Haftungsausschluss:</strong> Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit nicht wesentliche Vertragspflichten (Kardinalpflichten) betroffen sind. Die Haftung für Vorsatz und grobe Fahrlässigkeit sowie bei Körper- und Gesundheitsschäden bleibt unberührt.</p>
          <p className="mb-4"><strong>Versicherung:</strong> Während der Fahrstunden ist der Kunde über die Kfz-Haftpflichtversicherung der Fahrschule versichert. Bei Schäden durch grobe Fahrlässigkeit oder Vorsatz kann der Kunde in Regress genommen werden.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 9 Kündigung und Vertragsbeendigung</h2>
          <p className="mb-4"><strong>Ordentliche Kündigung:</strong> Beide Parteien können den Ausbildungsvertrag jederzeit mit einer Frist von 14 Tagen schriftlich kündigen.</p>
          <p className="mb-4"><strong>Außerordentliche Kündigung:</strong>Außerordentliche Kündigung: Der Ausbildungsvertrag kann sowohl von Fahrschüler als auch von der Fahrschule nur aus wichtigem Grund gekündigt werden. Ein wichtiger grund liegt vor wenn:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Wiederholtem unentschuldigtem Fernbleiben vom Unterricht</li>
            <li>Zahlungsverzug trotz Mahnung</li>
            <li>Erscheinen unter Alkohol- oder Drogeneinfluss</li>
            <li>Groben Verstößen gegen die Hausordnung</li>
            <li>Beleidigung oder Bedrohung von Fahrlehrern oder Mitschülern</li>
            <li>Die Fahrschule keine Leistung wie Theorie oder Praxis innerhalb von 3 Monaten erbringt</li>
            <li>Die Fahrschule vom Fahrschüler Verleugnet wird</li>
          </ul>
          <p className="mb-4"><strong>Abrechnung bei Kündigung:</strong> Bei Kündigung werden bereits gebuchte, aber noch nicht durchgeführte Fahrstunden erstattet. Der Grundbetrag wird nicht erstattet, da die Verwaltungs- und Vorbereitungsleistungen bereits erbracht wurden.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 10 Datenschutz</h2>
          <p className="mb-4">Die Fahrschule verpflichtet sich zur Einhaltung der datenschutzrechtlichen Bestimmungen gemäß DSGVO. Personenbezogene Daten werden ausschließlich zur Vertragsabwicklung und zur Erfüllung gesetzlicher Pflichten (z.B. Meldung bei der Führerscheinstelle) verarbeitet.</p>
          <p className="mb-4">Nähere Informationen finden Sie in unserer <Link to="/datenschutz" className="text-blue-600 hover:text-blue-800">Datenschutzerklärung</Link>.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 11 Online-Streitbeilegung</h2>
          <p className="mb-4">Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a></p>
          <p className="mb-4">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherstreitschlichtungsstelle teilzunehmen.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">§ 12 Schlussbestimmungen</h2>
          <p className="mb-4">Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.</p>
          <p className="mb-4"><strong>Gerichtsstand:</strong> Gerichtsstand ist Potsdam, soweit der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.</p>
          <p className="mb-4"><strong>Anwendbares Recht:</strong> Es gilt ausschließlich deutsches Recht unter Ausschluss des UN-Kaufrechts.</p>
          <p className="mb-4"><strong>Änderungen der AGB:</strong> Änderungen dieser AGB werden dem Kunden per E-Mail mitgeteilt und gelten als genehmigt, wenn der Kunde nicht innerhalb von 4 Wochen widerspricht.</p>

          <p className="text-sm text-gray-600 mt-8">Stand: Januar 2025</p>
        </div>
      </div>
      <Footer />
    </div>;
};
export default AGB;