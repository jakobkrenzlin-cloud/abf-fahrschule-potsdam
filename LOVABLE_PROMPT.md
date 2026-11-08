# Lovable-Prompt — Design-Vereinheitlichung ABF Fahrschule

Erstellt 09.08.2026 auf Basis von `DESIGN_AUDIT.md` und `CONTENT_INVENTORY.md`.
Unten der Text zum Kopieren. Danach die Notizen dazu.

---

## PROMPT (ab hier kopieren)

Du überarbeitest die Website der ABF Fahrschule Potsdam. Ziel: **eine einzige, einheitliche,
professionelle Website** statt der heutigen drei Design-Welten. Schwerpunkt Smartphone (über 75 %
des Traffics). Geschäftsziel ist Lead-Generierung über das Formular.

Arbeite die Blöcke 1 bis 7 **in dieser Reihenfolge** ab und fasse nach jedem Block in einem Satz
zusammen, was du geändert hast.

---

### BLOCK 0 — Absolute Tabus

Diese Dinge **nicht** anfassen. Wenn eine Anweisung weiter unten damit kollidiert, gilt dieser Block:

- `index.html`: die gtag.js-Einbindung, `AW-17551238202`, `G-10161VSRHB`, den Consent-Mode-Block
- `src/lib/tracking.ts` — komplette Datei, inklusive aller Conversion-Labels
- `src/lib/cookieConsent.ts` und die Consent-Logik
- Die Absende-Logik in `src/components/lp/LeadForm.tsx` (`handleSubmit`, der Fetch auf
  `…/functions/v1/submit-lead`, der `dataLayer.push`, das `navigate('/danke', { state: { lead: true } })`)
- Die gleiche Logik in `src/components/ContactSection.tsx` und `src/pages/Karriere.tsx`
- `src/pages/Danke.tsx`: den `useEffect`, der die Conversion feuert
- `supabase/functions/submit-lead/index.ts`
- `src/components/lp/LpSeo.tsx` samt Titeln, Descriptions, Canonicals
- `vite.config.ts`, die package.json-Scripts, die Build-Konfiguration

Das Formular und das Conversion-Tracking sind **getestet und funktionieren**. Du darfst Felder
optisch umgestalten, aber **kein `name`-Attribut, keinen `value`, keine Validierung und keinen
Feldwert** ändern. Die Auswahlwerte `b`, `b197`, `bf17`, `be`, `a1`, `a2`, `a`, `a_unklar`, `b196`
müssen exakt so erhalten bleiben.

**Rechtstexte** (`Impressum.tsx`, `Datenschutz.tsx`, `AGB.tsx`): nur Layout und Typografie ändern,
**kein Wort am Fließtext** — mit genau einer Ausnahme, siehe Block 5, Punkt 14.

**Kundenrezensionen** in `Landing.tsx`, `B196.tsx`, `AnmeldungMotorrad.tsx` bleiben **wortwörtlich**,
inklusive vorhandener Tipp- und Grammatikfehler und der Namen.

Keine neuen npm-Pakete außer der Schriftart aus Block 1.

---

### BLOCK 1 — Design-System anlegen

Lege ein echtes Token-System an und benutze es danach überall. Keine rohen Hex-Werte mehr in
Komponenten.

**Farben** — trage sie als CSS-Variablen in `src/index.css` ein und verdrahte sie in
`tailwind.config.ts`:

| Rolle | Wert | Verwendung |
|---|---|---|
| `--brand` | `#1A9CFF` | Markenfarbe: Akzente, Icons, Rahmen, Links auf dunklem Grund |
| `--brand-strong` | `#0F6FBF` | **Alle Buttons und Flächen mit weißer Schrift** |
| `--brand-dark` | `#13243A` | dunkle Sektionen |
| `--ink` | `#1C1C1C` | Fließtext |
| `--surface` | `#F4F7FA` | helle Sektionsflächen |
| `--success` | `#15803D` | Erfolg, WhatsApp-Buttons |
| `--warning` | `#B45309` | Hinweise, Fristen |

**Wichtig:** `--primary` in `src/index.css` steht aktuell auf `182 81% 26%` — ein Petrol-Türkis,
das nichts mit der Marke zu tun hat und auf `/preise`, `/kontakt`, `/theorie` und `/danke`
ausgespielt wird. Setze `--primary` auf die Markenfarbe.

`#1A9CFF` bleibt die Markenfarbe für Flächen und Akzente. Aber weiße Schrift darauf erreicht nur
2,9:1 Kontrast und ist nicht barrierefrei. Deshalb: **Buttons mit weißer Schrift benutzen
`--brand-strong` `#0F6FBF`.** Gleiches Prinzip beim Grün: `#16A34A` durch `#15803D` ersetzen.

Entferne diese Farben ersatzlos: `#3b5998`, `#4a6cb3`, `#1a2d4a`, `#1b3357`, `#0D1B2A`, `#0f86e0`,
`#0d76c7`, `#12813b`, `#8a5a00` sowie sämtliche `blue-*`-, `gray-*`-, `green-*`-, `orange-*`- und
`yellow-*`-Klassen aus der Tailwind-Standardpalette. Alles läuft über die Tokens.

**Schrift** — aktuell ist gar keine geladen, die Seite nutzt den Systemstack und sieht auf jedem
Gerät anders aus. Binde **Inter lokal ein** (Dateien im Projekt, `@font-face` in `index.css`),
**nicht** über das Google-CDN — die Datenschutzerklärung sagt ausdrücklich „lokal eingebunden".
Entferne dann die beiden toten `preconnect`-Zeilen zu `fonts.googleapis.com` und `fonts.gstatic.com`
aus `index.html`.

**Typo-Skala** — genau diese Stufen, keine anderen:

| Element | Mobil | Desktop | Gewicht |
|---|---|---|---|
| H1 | 32 px | 48 px | 800 |
| H2 | 26 px | 36 px | 700 |
| H3 | 20 px | 24 px | 700 |
| Fließtext | 17 px | 17 px | 400 |
| Klein | 15 px | 15 px | 400 |
| Label | 13 px | 13 px | 600 |

Zeilenhöhe: 1,2 für Überschriften, 1,6 für Fließtext.

**Abstände** — nur 4, 8, 12, 16, 24, 32, 48, 64, 80 px. Jede Sektion bekommt einheitlich
`py-12 md:py-20`. Keine anderen Sektionsabstände.

**Radien** — nur drei: 12 px (Karten, Eingabefelder), 16 px (große Flächen), voll (Pillen, Avatare).

**Schatten** — nur zwei: eine dezente Stufe für Karten, eine kräftige für herausgehobene Elemente.
`shadow-2xl` und `shadow-xl` ersatzlos streichen.

**Container** — überall `max-w-6xl mx-auto px-4 md:px-6`. Kein `max-w-7xl` mehr.

**Icons** — ausschließlich `lucide-react` in den Größen 16, 20, 24 px. **Alle Emoji, die als Icon
benutzt werden, ersetzen** (📍 💡 📊 🎓 🍂 ✓ und weitere) — in Fließtext dürfen sie bleiben.

---

### BLOCK 2 — Buttons und Karten vereinheitlichen

Es gibt heute vier verschiedene Button-Sorten. Baue **eine** Komponente mit drei Varianten:

- **primary** — Fläche `--brand-strong`, weiße Schrift, für die Hauptaktion
- **secondary** — Rahmen `--brand`, Schrift `--brand-dark`, transparenter Grund
- **ghost** — nur Text mit Unterstreichung beim Hover

Für alle gilt: **mindestens 48 px hoch auf Mobil**, 44 px auf Desktop, Radius 12 px, Gewicht 600,
sichtbarer Fokusring (2 px `--brand`, 2 px Abstand). Die heutigen shadcn-Höhen `h-10`/`h-9`/`h-11`
sind zu niedrig und müssen weg.

Ersetze **alle** rohen `<button className="…">` (aktuell 37 Stück) und alle handgefärbten Buttons
durch diese Komponente.

**Regel: pro Bildschirm genau ein `primary`-Button.** Alles andere ist `secondary` oder `ghost`.
Auf der Startseite konkurrieren heute „Kostenlose Beratung" und „Führerschein Info" gleichwertig —
„Kostenlose Beratung" wird `primary`, „Führerschein Info" wird `secondary`.

**Karten**: ein einziges Rezept — weißer Grund, 1 px Rahmen in 8 % Schwarz, Radius 12 px, Innenabstand
20 px mobil / 24 px Desktop, dezenter Schatten. Die vier heutigen Varianten verschwinden.

---

### BLOCK 3 — Kopfzeile, Fußzeile, Sticky-Leiste

**Eine Kopfzeile für die ganze Website.** `Header.tsx` und `lp/LpHeader.tsx` zu einer Komponente
zusammenführen:
- Logo links, Höhe 40 px mobil / 48 px Desktop — **das Logo darf die Kopfzeile nicht überragen**
  (heute ist die Leiste 48 px hoch und das Logo 56 px, es steht über)
- Navigation ab Desktop, darunter ein Burger-Menü
- rechts ein `primary`-Button
- Auf den drei Anzeigen-Landingpages (`/anmeldung`, `/b196`, `/anmeldungmotorrad`) wird die
  Navigation ausgeblendet und nur Logo + Telefon + CTA gezeigt — gleiche Komponente, schlanker Modus

**Eine Fußzeile** für alle Seiten außer den drei Landingpages. Überschriften darin als `H2`, nicht
als `H4`. Copyright-Jahr dynamisch aus `new Date().getFullYear()`.

**Landingpages bekommen keinen vollen Footer**, aber zwei Dinge neu:

1. **Unter** dem Abschluss-CTA ein schlanker Abschnitt „Mehr über die ABF Fahrschule" mit drei
   Karten, die auf `/preise`, `/theorie` und `/kontakt` verlinken, plus einen Textlink zur
   Startseite. Grund: Interessenten fühlen sich auf der Landingpage eingesperrt und springen ab,
   wenn sie sich vor der Anfrage noch umsehen wollen. **Wichtig: dieser Abschnitt steht unterhalb
   des Formulars und des Abschluss-CTAs**, er darf dem Formular keine Aufmerksamkeit wegnehmen.
2. Eine schmale Rechtszeile ganz unten mit Impressum und Datenschutz.

**Eine Sticky-Leiste** für Mobil. `MobileStickyFooter.tsx` und `lp/StickyMobileCta.tsx`
zusammenführen. Auf Seiten mit Formular: „Jetzt anmelden" (`primary`) + „Anrufen". Auf allen anderen
Seiten: „Anrufen" + „WhatsApp". Bisher hat die Rest-Welt mobil überhaupt keinen Weg ins Formular.

---

### BLOCK 4 — Doppelte Bausteine zusammenführen

Sechs Bausteine existieren doppelt und sehen unterschiedlich aus. Behalte jeweils die
LP-Version als Vorlage — die ist sauberer gebaut — und benutze sie auf allen Seiten:

| Zweck | behalten | entfernen |
|---|---|---|
| FAQ | `lp/FaqBlock.tsx` | `FAQSection.tsx` |
| Ablauf/Schritte | `lp/Steps.tsx` | `ProcessSection.tsx` |
| Warum ABF | `lp/WhyAbfCards.tsx` | `WhyABF.tsx` |
| Standort | `lp/LocationSection.tsx` | Standortteil in `ContactSection.tsx` |

**Die Inhalte der entfernten Komponenten müssen erhalten bleiben** — übertrage jeden Text in die
bleibende Komponente. Es darf keine Aussage verloren gehen.

Gib außerdem den acht Seiten ohne Sektionsstruktur (`/preise`, `/kontakt`, `/theorie`, `/danke`,
`/impressum`, `/datenschutz`, `/agb`, `/karriere/danke`) eine ordentliche `<section>`-Gliederung.

`/karriere` und `/karriere/danke` benutzen heute eine dritte Farbwelt — auf das gemeinsame System
umstellen.

---

### BLOCK 5 — Textkorrekturen (verbindlich, vom Inhaber freigegeben)

Das sind echte Fehler auf der Seite, keine Geschmacksfragen. Bitte exakt so umsetzen:

1. **Grundbetrag Klasse B ist überall `199 €`.** `Preise.tsx` sagt „279 € statt 479 €" — falsch.
   Stelle es dort genauso dar wie auf `/anmeldung`: **199 €**, Label „Herbst-Angebot – Grundbetrag",
   **ohne** durchgestrichenen Vergleichspreis.
2. **Grundbetrag Motorrad A / A1 / A2 ist überall `399 €`.** `Preise.tsx` sagt „550 € statt 650 €"
   und die Startseiten-FAQ sagt „ab 599 €" — beides falsch. Ebenfalls ohne Vergleichspreis.
3. **B196 bleibt `750 €` Festpreis** (stimmt bereits).
4. **Einzige gültige E-Mail-Adresse: `kontakt@abf-fahrschule.de`.** Ersetze jedes Vorkommen von
   `potsdam@fahrschuleabf.de` (8 Stellen) und `info@abf-fahrschule-potsdam.de` (1 Stelle auf
   `/danke`).
5. **Öffnungszeiten überall: Montag – Freitag 12:00 – 18:00 Uhr, Samstag und Sonntag geschlossen.**
   Korrigiere das strukturierte Datenblatt auf `/preise`, das `09:00–18:00` sagt. Ersetze
   „Wochenende: nach Absprache" in `ContactSection.tsx` durch „Samstag & Sonntag: geschlossen".
   Der Hinweis, dass **Fahrstunden** auch außerhalb der Öffnungszeiten nach Absprache möglich sind,
   bleibt bestehen — das ist etwas anderes.
6. **„Vorstellung zur theoretischen Prüfung" ersatzlos entfernen.** Diese Leistung wird nicht
   angeboten. Betroffen: die Leistungsliste auf `/anmeldung`, zwei Stellen auf `/preise`, und auf
   `/theorie` die Kachel „Prüfung – Vorstellung zur Theorieprüfung zusätzlich" sowie der Satz „Die
   Vorstellung erfolgt zusätzlich." im vierten Ablaufschritt.
7. **LernApp aus allen Angebots- und Leistungslisten entfernen** — sie ist in keinem Grundbetrag
   enthalten. Betroffen: „Lern-App & Unterlagen" auf `/anmeldung` (Leistungsliste **und** die
   passende FAQ-Antwort), „Digitale LernApp (Vogel Verlag)" auf `/preise`, „LernApp für die
   Theorieprüfung" auf der Startseite, und die Erwähnung in der Motorrad-FAQ der Startseite.
   **Die Seite `/theorie` bleibt inhaltlich unverändert** — dort darf die LernApp weiter vorkommen.
8. **„Erste-Hilfe-Kurs" aus der Motorrad-Leistungsliste auf `/preise` entfernen** — nicht enthalten.
9. **Diese Leistungen bleiben und stimmen:** „ADAC 1 Jahr kostenlos", „100 € Louis und Polo
   Gutschein" (Motorrad), „Kompletter Theorieunterricht".
10. **Adresse einheitlich schreiben:** „Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg".
    Heute stehen dort „Weber Park", „WEBERPARK", „45 B" und „45b" durcheinander.
11. **Alle internen Links auf `/anmeldung` kleinschreiben.** An sechs Stellen steht `/Anmeldung`
    mit großem A, das erzeugt eine zweite URL-Variante derselben Seite.
12. **Copyright-Jahr dynamisch** statt fest „© 2025".
13. **404-Seite auf Deutsch** und mit Kopf- und Fußzeile. Statt „Oops! Page not found" eine
    hilfreiche Seite mit Links zu Startseite, `/anmeldung`, `/preise` und `/kontakt`.
14. **Einzige erlaubte Änderung an einem Rechtstext:** In `AGB.tsx` § 3 steht der Punkt „ADAC 1 Jahr
    kostenlos" **zweimal direkt untereinander**. Entferne die Dublette. Sonst nichts an den AGB.
15. **Durchgehend duzen.** Die Landingpages duzen bereits, die Startseite und `/preise`, `/kontakt`,
    `/theorie` siezen — teils auf derselben Seite gemischt. Vereinheitliche auf „du".
    **Ausgenommen:** Impressum, Datenschutz, AGB und die Rezensionen bleiben wortwörtlich.

**Ansonsten gilt: keine inhaltliche Änderung.** Formulierungen darfst du glätten, aber jede
Tatsachenaussage — jeder Preis, jede Zahl, jede Leistung, jede Frist — muss danach exakt dasselbe
aussagen wie vorher.

---

### BLOCK 6 — Konkrete Fehler beheben

Diese Punkte sind gemessen, nicht geschätzt:

1. **Waagerechtes Scrollen auf der Startseite bei 390 px** (Inhalt 416 px statt 390 px). Ursache:
   In `ContactSection.tsx` steht ein `grid lg:grid-cols-2`, dessen Kartenkind wegen `p-8` und
   `min-width: auto` nicht unter etwa 400 px schrumpfen kann. Gib dem Grid-Kind `min-w-0` und
   reduziere den Innenabstand auf Mobil.
2. **Waagerechtes Scrollen auf `/impressum` bei 390 px** (465 px statt 390 px). Ursache: die
   Überschrift „Verbraucherstreitbeilegung/Universalschlichtungsstelle" ist ein unumbrechbares
   Langwort. Gib allen Überschriften `hyphens: auto` und `overflow-wrap: anywhere`.
3. **Waagerechtes Scrollen auf `/preise` bei 768 px** (+14 px) durch den Header-Button und den CTA
   „Standort & Öffnungszeiten".
4. **Zu kleine Tap-Ziele.** Auf der Startseite sind 38 interaktive Elemente unter 44 px hoch, unter
   anderem alle Angebots-Buttons (40 px), die Karussell-Pfeile (32 px), der Cookie-Banner-Schließer
   (24 px) und die komplette Fußzeilen-Navigation (24 px). Alles auf mindestens 44 px bringen.
5. **Bilder ohne Größenangabe.** Auf der Startseite haben 11 von 11 Bildern kein `width`/`height`,
   dadurch springt das Layout beim Laden. Bei allen Bildern ergänzen und `loading="lazy"` setzen —
   außer beim ersten sichtbaren Bild.
6. **Ungültiges HTML.** In `OffersSection.tsx` umschließt ein `<Link>` einen `<Button>`, das ergibt
   `<a><button>`. Nutze stattdessen die `asChild`-Variante. Auf der Startseite steht außerdem ein
   `<p>` in einem `<p>` — React meldet das in der Konsole.
7. **Zwei Helmet-Bibliotheken parallel.** Zehn Seiten nutzen `react-helmet`, `App.tsx` und
   `lp/LpSeo.tsx` nutzen `react-helmet-async`. Stelle alles auf `react-helmet-async` um und
   entferne `react-helmet`. **`LpSeo.tsx` dabei nicht verändern.** Das behebt auch die Warnung
   „React does not recognize the `%s` prop", die auf jeder Seite in der Konsole steht.
8. **Tote Dateien löschen** — sie werden von nichts importiert: der komplette Ordner
   `src/components/motorrad/` (8 Dateien) sowie `ConversionFAQ.tsx`, `OfferBox.tsx`,
   `ProcessSteps.tsx`, `CountdownTimer.tsx`.
9. **Leere Layout-Blöcke entfernen:** der leere „Anfahrt"-Grid auf `/kontakt` und der leere
   „Kurszeiten"-Block auf `/theorie`.
10. **`lp/Reveal.tsx`:** Bei `prefers-reduced-motion: reduce` sollen die Inhalte **sofort sichtbar**
    sein statt bei `opacity: 0` zu starten.

---

### BLOCK 7 — Startseite konversionsstark machen

Die Startseite ist der größte organische Eingang, verschenkt aber den ersten Bildschirm: kein Preis,
kein Angebot, keine Frist, dafür zwei gleichrangige Buttons.

Baue den Hero um, ohne neue Aussagen zu erfinden — alle Bausteine gibt es auf der Seite bereits
weiter unten:
- H1 bleibt inhaltlich
- **direkt darunter das Herbst-Angebot: „199 €" mit dem Hinweis „nur bis 31. Oktober"**
- darunter genau **ein** `primary`-Button „Kostenlose Beratung", daneben `secondary`
  „Führerschein Info"
- die Vertrauenszeile („5,0 ★ aus 26 Google-Bewertungen", „Über 15 Jahre Erfahrung") bleibt sichtbar

Das Bilderkarussell rutscht unter diesen Block.

---

### ABSCHLUSSPRÜFUNG

Prüfe zum Schluss und berichte mir das Ergebnis:

1. Bei 390 px, 768 px und 1440 px gibt es auf **keiner** Seite waagerechtes Scrollen.
2. Kopfzeile, Fußzeile, Schrift, Farben, Abstände und Buttons sind auf allen Seiten identisch.
3. Kein Emoji wird mehr als Icon verwendet.
4. Der Preis „199 €" steht auf Startseite, `/anmeldung` und `/preise` gleich — nirgends mehr 279 €.
   Motorrad überall 399 €, nirgends mehr 550 € oder 599 €.
5. `potsdam@fahrschuleabf.de` und `info@abf-fahrschule-potsdam.de` kommen **nirgends** mehr vor.
6. „Vorstellung zur theoretischen Prüfung" kommt nirgends mehr vor.
7. Die Konsole zeigt auf **keiner** Seite mehr Fehler oder React-Warnungen.
8. **Das Formular funktioniert unverändert:** Absenden führt auf `/danke`, und im `dataLayer`
   erscheint danach der Eintrag `["event","conversion",{"send_to":"AW-17551238202/UhzpCN_gq6YbELrIirFB"}]`.
   Prüfe das ausdrücklich und melde es mir.
9. Der Build läuft fehlerfrei durch.

Wenn dir bei einem Punkt eine Information fehlt: **frag mich, rate nicht.**

---

## ENDE DES PROMPTS

---

## Notizen für Jakob (nicht mitkopieren)

**Bewusst nicht im Prompt, weil ich die richtige Antwort nicht kenne:**

- **Geokoordinaten.** Im strukturierten Datenblatt stehen drei verschiedene Werte
  (`52.3906/13.0645`, `52.3906/13.0945`, `52.3935/13.0967`). Ein falscher Wert schadet der lokalen
  Sichtbarkeit. Sag mir den richtigen, dann kommt er in einen Nachschlag-Prompt.
- **Doppelte Canonical-Tags.** Jede Seite liefert zwei davon, teils auf die Lovable-Staging-Domain.
  Das lässt sich nicht sauber lösen, ohne `LpSeo.tsx` anzufassen — das ist gesperrt. Eigener
  Arbeitsschritt.

**Annahmen, die du kippen kannst:**

- Ich habe „durchgehend duzen" gesetzt, weil die Anzeigen-Landingpages duzen und dort das Geld
  verdient wird. Wenn du auf der Startseite lieber siezt, sag Bescheid — dann drehen wir es um.
- Bei den Preisen habe ich die durchgestrichenen Vergleichspreise („statt 479 €", „statt 650 €")
  entfernt statt sie auf neue Werte zu setzen, weil ich die echten Normalpreise nicht kenne. Wenn
  du sie behalten willst, brauche ich die richtigen Zahlen.

**Zum Formular:** Ich habe es vor dem Prompt vollständig getestet — Absenden, Payload, `gclid`,
Weiterleitung und Conversion-Event funktionieren auf allen drei Landingpages. Deshalb steht es im
Prompt unter Tabu, damit Lovable nichts daran kaputtmacht. Punkt 8 der Abschlussprüfung lässt
Lovable das nachweisen.
