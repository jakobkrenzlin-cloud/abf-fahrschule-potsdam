
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
          <p className="mb-4">
            <strong>ABF Bildungszentrum und Fahrschule GmbH</strong><br />
            Alishan Celik<br />
            Weber Park, Tuchmacherstraße 45 B<br />
            14482 Potsdam<br />
            Telefon: +49 162 2191290<br />
            E-Mail: <a href="mailto:kontakt@abf-fahrschule.de" className="text-blue-600 hover:text-blue-800">kontakt@abf-fahrschule.de</a>
          </p>
          <p className="mb-4">Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">3. Datenerfassung auf dieser Website</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">3.1 Kontaktformular & Online-Anmeldung</h3>
          <p className="mb-4"><strong>Art und Umfang der Datenverarbeitung:</strong></p>
          <p className="mb-4">Wenn Sie uns per Kontaktformular oder Online-Anmeldung Anfragen zukommen lassen, werden folgende Daten verarbeitet:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Name (Pflichtfeld)</li>
            <li>Telefonnummer (Pflichtfeld)</li>
            <li>Führerscheinklasse (Pflichtfeld)</li>
            <li>E-Mail-Adresse (optional)</li>
            <li>Zeitstempel der Anfrage</li>
          </ul>
          <p className="mb-4"><strong>Zweck der Verarbeitung:</strong> Bearbeitung Ihrer Anfrage, Kontaktaufnahme zur Terminvereinbarung, Verwaltung der Fahrschüleranmeldungen.</p>
          <p className="mb-4"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch Formularabsendung).</p>
          <p className="mb-4"><strong>Speicherdauer:</strong> Die Daten werden nach vollständiger Bearbeitung Ihrer Anfrage oder nach Ablauf gesetzlicher Aufbewahrungsfristen gelöscht.</p>
          <p className="mb-4">Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">3.2 Server-Log-Dateien</h3>
          <p className="mb-4">Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse (anonymisiert)</li>
          </ul>
          <p className="mb-4"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit und Funktionsfähigkeit unserer Website).</p>
          <p className="mb-4">Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Daten werden nach 7 Tagen automatisch gelöscht.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">4. Hosting und externe Dienste</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">4.1 Lovable / Supabase</h3>
          <p className="mb-4">Diese Website wird über Lovable gehostet, welches Supabase als Backend-Infrastruktur nutzt. Anbieter ist Supabase Inc., San Francisco, USA.</p>
          <p className="mb-4"><strong>Umfang der Verarbeitung:</strong> Beim Besuch unserer Website werden Server-Log-Daten (IP-Adresse, Zeitstempel, aufgerufene Seiten) verarbeitet. Formulardaten werden in einer Supabase-Datenbank gespeichert.</p>
          <p className="mb-4"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer und zuverlässiger Website-Bereitstellung).</p>
          <p className="mb-4"><strong>Drittlandübermittlung:</strong> Daten können in die USA übermittelt werden. Supabase ist nach dem EU-US Data Privacy Framework zertifiziert.</p>
          <p className="mb-4"><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit Supabase geschlossen.</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">4.2 Google Fonts (lokal eingebunden)</h3>
          <p className="mb-4">Diese Website nutzt Google Fonts. Die Schriftarten sind lokal auf unserem Server gespeichert, sodass keine Verbindung zu Google-Servern hergestellt wird und keine personenbezogenen Daten an Google übermittelt werden.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">5. Cookie-Banner & Einwilligung</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">5.1 Cookie-Consent-Banner</h3>
          <p className="mb-4">Beim ersten Besuch unserer Website erscheint ein Cookie-Banner, über den Sie Ihre Einwilligung zur Nutzung verschiedener Cookie-Kategorien erteilen können:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li><strong>Essenziell:</strong> Technisch notwendige Cookies für den Betrieb der Website (immer aktiv)</li>
            <li><strong>Statistik:</strong> Cookies zur Analyse des Nutzerverhaltens (z.B. Google Analytics)</li>
            <li><strong>Marketing:</strong> Cookies zur Conversion-Messung (z.B. Google Ads)</li>
          </ul>
          <p className="mb-4"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</p>
          <p className="mb-4"><strong>Speicherung der Einwilligung:</strong> Ihre Einwilligungsentscheidung wird lokal in Ihrem Browser gespeichert (localStorage) und ist 12 Monate gültig.</p>
          <p className="mb-4"><strong>Widerruf:</strong> Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie Ihren Browser-Cache leeren oder über die Cookie-Einstellungen auf unserer Website.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">6. Analyse- und Marketing-Tools</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">6.1 Google Ads Conversion-Tracking</h3>
          <p className="mb-4">Diese Website nutzt Google Ads Conversion-Tracking. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.</p>
          <p className="mb-4"><strong>Zweck:</strong> Messung der Wirksamkeit unserer Online-Werbung.</p>
          <p className="mb-4"><strong>Umfang:</strong> Es wird ein Cookie gesetzt, das 30 Tage gültig ist und pseudonyme Daten über Ihr Nutzungsverhalten sammelt.</p>
          <p className="mb-4"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über Cookie-Banner).</p>
          <p className="mb-4"><strong>Drittlandübermittlung:</strong> Google verarbeitet Daten in den USA. Google ist nach dem EU-US Data Privacy Framework zertifiziert.</p>
          <p className="mb-4"><strong>Widerruf:</strong> Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die Cookie-Einstellungen zurücksetzen. Dies verhindert zukünftige Datenverarbeitung, bereits gesendete Daten können jedoch nicht zurückgeholt werden.</p>
          <p className="mb-4"><strong>Hinweis:</strong> Google Ads Tracking-Scripts werden erst nach Ihrer Einwilligung geladen und ausgeführt.</p>
          <p className="mb-4">Weitere Informationen: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Google Datenschutzerklärung</a></p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">6.2 Google Analytics (optional)</h3>
          <p className="mb-4">Falls aktiviert, nutzen wir Google Analytics. Die Nutzung erfolgt nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). IP-Adressen werden anonymisiert. Sie können Ihre Einwilligung jederzeit über den Cookie-Banner widerrufen.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">7. Externe Kommunikationskanäle</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">7.1 WhatsApp-Kontakt</h3>
          <p className="mb-4">Auf unserer Website befindet sich ein Link/Button zur Kontaktaufnahme über WhatsApp. Wenn Sie diesen Button nutzen, werden Sie zur WhatsApp-Website bzw. -App weitergeleitet.</p>
          <p className="mb-4"><strong>Hinweis:</strong> Sobald Sie auf den Link klicken, gelten die Datenschutzbestimmungen von WhatsApp (Meta Platforms Ireland Limited).</p>
          <p className="mb-4">Wir haben keinen Einfluss auf die durch WhatsApp verarbeiteten Daten. Weitere Informationen: <a href="https://www.whatsapp.com/legal/privacy-policy" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">WhatsApp Datenschutz</a></p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">8. Ihre Rechte als betroffene Person</h2>
          <p className="mb-4">Sie haben nach der DSGVO folgende Rechte:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über die von uns verarbeiteten personenbezogenen Daten verlangen.</li>
            <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.</li>
            <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen, sofern gesetzliche Aufbewahrungspflichten dem nicht entgegenstehen.</li>
            <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
            <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, die Sie betreffenden Daten in einem strukturierten, gängigen Format zu erhalten.</li>
            <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer Daten aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen.</li>
            <li><strong>Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Sofern die Verarbeitung auf einer Einwilligung beruht, können Sie diese jederzeit widerrufen.</li>
            <li><strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Zuständige Aufsichtsbehörde</h3>
          <p className="mb-4">
            Die Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg<br />
            Stahnsdorfer Damm 77<br />
            14532 Kleinmachnow<br />
            Telefon: 033203 / 356-0<br />
            E-Mail: <a href="mailto:poststelle@lda.brandenburg.de" className="text-blue-600 hover:text-blue-800">poststelle@lda.brandenburg.de</a>
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">9. Speicherdauer</h2>
          <p className="mb-4">Wir speichern personenbezogene Daten nur so lange, wie es für die Erfüllung der Zwecke erforderlich ist, zu denen die Daten erhoben wurden, oder soweit dies durch gesetzliche Aufbewahrungsfristen vorgeschrieben ist (z.B. steuerrechtliche Aufbewahrungspflichten von 10 Jahren).</p>
          <p className="mb-4">Nach Ablauf der Speicherdauer werden die Daten routinemäßig gelöscht, sofern keine weitere Verarbeitung erforderlich ist.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">10. Datensicherheit</h2>
          <p className="mb-4">Wir verwenden SSL/TLS-Verschlüsselung für die Übertragung sensibler Daten. Die Website ist über HTTPS abgesichert. Zusätzlich setzen wir technische und organisatorische Maßnahmen ein, um Ihre Daten vor unberechtigtem Zugriff, Verlust oder Missbrauch zu schützen.</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">11. Kontakt in Datenschutzfragen</h2>
          <p className="mb-4">Bei Fragen zum Datenschutz wenden Sie sich bitte an:</p>
          <p className="mb-4">
            Alishan Celik<br />
            ABF Bildungszentrum und Fahrschule GmbH<br />
            Weber Park, Tuchmacherstraße 45 B<br />
            14482 Potsdam<br />
            E-Mail: <a href="mailto:kontakt@abf-fahrschule.de" className="text-blue-600 hover:text-blue-800">kontakt@abf-fahrschule.de</a>
          </p>

          <p className="text-sm text-gray-600 mt-8">Stand: Januar 2025</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Datenschutz;
