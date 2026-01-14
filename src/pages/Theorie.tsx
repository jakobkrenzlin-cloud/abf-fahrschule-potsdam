import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { BookOpen, Smartphone, CheckCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Theorie = () => {
  return <>
      <Helmet>
        <title>Theorieunterricht Führerschein Klasse B | ABF Fahrschule Potsdam</title>
        <meta name="description" content="Kompletter Theorieunterricht kompakt & effektiv. LernApp vom Vogel Verlag inklusive. Flexible Kurszeiten in Potsdam-Babelsberg. Jetzt Theorie-Kursplatz sichern!" />
        <meta name="keywords" content="Theorieunterricht Potsdam, Führerschein Theorie Babelsberg, Fahrschule Theorie Potsdam, Führerschein Klasse B Theorie" />
        <link rel="canonical" href="https://www.abf-fahrschule.de/theorie" />
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Theorieunterricht Führerschein Klasse B",
          "description": "Kompletter Theorieunterricht für Führerschein Klasse B mit digitaler LernApp",
          "provider": {
            "@type": "LocalBusiness",
            "name": "ABF Bildungszentrum und Fahrschule GmbH",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Weber Park, Tuchmacherstraße 45 B",
              "addressLocality": "Potsdam",
              "postalCode": "14482",
              "addressCountry": "DE"
            },
            "telephone": "+49-331-9679-5854"
          },
          "courseMode": "blended",
          "educationalLevel": "Beginner"
        })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Kompletter Theorieunterricht – kompakt & effektiv
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Alles, was du für die theoretische Prüfung brauchst – verständlich erklärt, praxisnah und mit digitaler Unterstützung.
            </p>
          </div>

          {/* Übersicht */}
          <div className="bg-card rounded-2xl p-8 mb-8 border-2 border-primary shadow-lg">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="text-primary" size={32} />
                </div>
                <h3 className="font-bold text-foreground text-xl mb-2">14 Stunden</h3>
                <p className="text-muted-foreground text-sm">12x Grundstoff + 2x Zusatzstoff Klasse B</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="text-primary" size={32} />
                </div>
                <h3 className="font-bold text-foreground text-xl mb-2">LernApp</h3>
                <p className="text-muted-foreground text-sm">Vogel Verlag – offizieller TÜV-Fragenkatalog</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="text-primary" size={32} />
                </div>
                <h3 className="font-bold text-foreground text-xl mb-2">Prüfung</h3>
                <p className="text-muted-foreground text-sm">Vorstellung zur Theorieprüfung inklusive</p>
              </div>
            </div>
            <div className="text-center pt-6 border-t border-border">
              <Link to="/Anmeldung">
                <Button size="lg" className="text-lg px-8">
                  Jetzt Theorie-Kursplatz sichern
                </Button>
              </Link>
            </div>
          </div>

          {/* Ablauf */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              So läuft der Theorieunterricht ab
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Anmeldung & Zugang zur LernApp</h3>
                    <p className="text-muted-foreground">
                      Nach deiner Anmeldung erhältst du sofort Zugang zur digitalen LernApp vom Vogel Verlag. Damit kannst du jederzeit und überall lernen – am Handy, Tablet oder PC.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Theorieunterricht im Unterrichtsraum</h3>
                    <p className="text-muted-foreground">
                      Präsenzunterricht in modernen Räumen mit erfahrenen Fahrlehrern. Hier werden die wichtigen Themen verständlich erklärt – von Verkehrsregeln bis hin zu Vorfahrt und Technik.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Selbststudium mit der LernApp</h3>
                    <p className="text-muted-foreground">
                      Übe alle offiziellen Prüfungsfragen in der App. Du siehst deinen Lernfortschritt, bekommst Erklärungen zu Fehlern und kannst Prüfungssimulationen durchführen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Anmeldung zur Theorieprüfung</h3>
                    <p className="text-muted-foreground">
                      Sobald du bereit bist, melden wir dich zur theoretischen Prüfung beim TÜV an. Die Vorstellung ist bei uns bereits im Grundbetrag enthalten.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kurszeiten */}
          

          {/* Tipps für die Prüfung */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center"> Unsere Tipps für die Theorieprüfung</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2"> Übe täglich</h3>
                <p className="text-muted-foreground text-sm">
                  10–15 Minuten pro Tag in der LernApp sind effektiver als einmal die Woche 2 Stunden am Stück.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2"> Simulation machen</h3>
                <p className="text-muted-foreground text-sm">Mach mindestens 5–10 Prüfungssimulationen in der App. So weißt du, wie die echte Prüfung abläuft.</p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2"> Fragen stellen</h3>
                <p className="text-muted-foreground text-sm">
                  Nutze den Unterricht, um Unklarheiten zu klären. Deine Fahrlehrer kennen die Prüfung genau.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2"> Verstehen statt auswendig lernen</h3>
                <p className="text-muted-foreground text-sm">
                  Die App erklärt dir jeden Fehler. So lernst du nicht nur für die Prüfung, sondern fürs Leben.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2"> Entspannt bleiben</h3>
                <p className="text-muted-foreground text-sm">
                  Die Prüfung ist machbar! Mit guter Vorbereitung bestehen über 90% unserer Fahrschüler beim ersten Versuch.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2"> Zeit einplanen</h3>
                <p className="text-muted-foreground text-sm">
                  Plane etwa 2–3 Wochen Lernzeit ein. Wer regelmäßig übt, ist schneller prüfungsreif.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Schnellinfo */}
          <div className="bg-card rounded-xl p-8 border border-border mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Häufige Fragen zum Theorieunterricht</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Brauche ich zusätzliche Lehrbücher?</h3>
                <p className="text-muted-foreground text-sm">
                  Nein. Die LernApp enthält alle Prüfungsfragen und Erklärungen. Du brauchst kein extra Lehrbuch.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Wie lange dauert die Theorie insgesamt?</h3>
                <p className="text-muted-foreground text-sm">
                  Je nach Kurswahl 2–4 Wochen. Du kannst die 14 Stunden flexibel über mehrere Wochen verteilen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Wann kann ich zur Prüfung?</h3>
                <p className="text-muted-foreground text-sm">
                  Sobald du den gesamten Theorieunterricht absolviert hast und dich in der App sicher fühlst, melden wir dich an.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Was passiert, wenn ich durchfalle?</h3>
                <p className="text-muted-foreground text-sm">
                  Kein Problem! Du kannst die Prüfung nach 2 Wochen Wartezeit wiederholen. Wir unterstützen dich dabei.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border-2 border-primary">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Bereit für die Theorie?
            </h2>
            <p className="text-muted-foreground mb-6">
              Sichere dir jetzt deinen Platz im nächsten Theoriekurs und starte durch!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/Anmeldung">
                <Button size="lg" className="text-lg px-8">
                  Jetzt Theorie-Kursplatz sichern
                </Button>
              </Link>
              <Link to="/kontakt">
                <Button size="lg" variant="outline">
                  Fragen? Ruf uns an
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>;
};
export default Theorie;