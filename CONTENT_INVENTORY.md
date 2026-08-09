# CONTENT_INVENTORY.md — Inhalts-Sicherheitsnetz

**Projekt:** jakobkrenzlin-cloud/abf-fahrschule-potsdam · Live: https://abf-fahrschule.de
**Erstellt:** 09.08.2026 · **Branch:** `design/unification`
**Code-Stand:** `c0040f5` ("Sommerangebote auf Herbst ersetzt", 09.08.2026 14:05 UTC) = identisch mit `origin/main`

## Zweck und Regeln

Diese Datei listet **jede Tatsachenaussage** der Website mit Fundstelle. Sie ist der Beweis, dass beim
Redesign keine Information verloren geht.

- Nach **jeder** Umsetzungsrunde wird gegen diese Liste geprüft: Ist jeder Eintrag noch vorhanden und
  inhaltlich unverändert? Ergebnis wird als Prüfliste berichtet.
- **Sprachliche** Änderung an einem Eintrag ist erlaubt. **Inhaltliche** nicht.
- Einträge mit dem Marker 🔒 sind wortwörtlich einzufrieren (Rezensionen, Rechtstexte).
- Einträge mit dem Marker ⚠️ sind **Widersprüche im Ist-Zustand**. Sie werden NICHT eigenmächtig
  aufgelöst — das wäre eine Inhaltsänderung. Sie sind in Abschnitt Z gesammelt und brauchen eine
  Entscheidung von Jakob.

**Legende Belegqualität:** [V] = im Code verifiziert (Datei:Zeile) · [L] = zusätzlich live im
gerenderten DOM auf abf-fahrschule.de geprüft

---

## A. Globale Stammdaten (auf mehreren Seiten wiederholt)

| # | Aussage | Fundstellen |
|---|---|---|
| A01 | Firmenname: **ABF Bildungszentrum und Fahrschule GmbH** | Impressum.tsx:23 · Kontakt.tsx:19,70 · Preise.tsx:19 · Theorie.tsx:23 [V] |
| A02 | Marken-/Kurzname: **ABF Fahrschule Potsdam** | u. a. Header.tsx:40 · constants.ts (LpSeo.tsx:21) · Karriere.tsx:243 [V] |
| A03 | Adresse: **Weberpark / Weber Park / WEBERPARK, Tuchmacherstraße 45b (auch „45 B"), 14482 Potsdam-Babelsberg** ⚠️ (drei Schreibweisen, siehe Z01) | constants.ts:6 · Impressum.tsx:24-26 · Kontakt.tsx:71-73 · Footer.tsx:76-78 · ContactSection.tsx:252-255 · Danke.tsx:93 · Karriere.tsx:251 [V] |
| A04 | Telefon Festnetz: **+49 331 96795854** (`tel:+4933196795854`) | Impressum.tsx:36 · Kontakt.tsx:116,141 · Footer.tsx:87 · Danke.tsx:73-75 · QuickContact.tsx:15 · OffersSection.tsx:150 · ContactSection.tsx:265 · JobSection.tsx:70,73 · Preise.tsx:261-263 · SuccessfulStudentsSection.tsx:87 · Karriere.tsx:~611 [V] |
| A05 | Telefon Mobil: **+49 162 2191290** (`tel:+491622191290`) | constants.ts:3-4 · Impressum.tsx:37 · Kontakt.tsx:122,142 · Footer.tsx:91 · Danke.tsx:80-82 · QuickContact.tsx:16 · OffersSection.tsx:151 · ContactSection.tsx:266 · JobSection.tsx:76,79 · Preise.tsx:266-268 [V] |
| A06 | WhatsApp-Nummer: **wa.me/491622191290** | constants.ts:5 · Kontakt.tsx:128 · ContactSection.tsx:106 · MobileStickyFooter.tsx:11 [V] |
| A07 | E-Mail **kontakt@abf-fahrschule.de** ⚠️ (siehe Z02) | Impressum.tsx:38 · Kontakt.tsx:35,133,143 · Footer.tsx:98-99 [V] |
| A08 | E-Mail **potsdam@fahrschuleabf.de** ⚠️ (siehe Z02) | OffersSection.tsx:159-160 · QuickContact.tsx:25-26 · ContactSection.tsx:275-276 · SuccessfulStudentsSection.tsx:99 · JobSection.tsx:64 · Karriere.tsx:~560,~619 · KarriereDanke.tsx:75 [V] |
| A09 | E-Mail **info@abf-fahrschule-potsdam.de** ⚠️ (siehe Z02) | Danke.tsx:87-88 [V] |
| A10 | Öffnungszeiten: **Montag – Freitag, 12:00 – 18:00 Uhr** | Kontakt.tsx:94-95,39-41 · LocationSection.tsx:20 · LpSeo.tsx:34 · FAQSection.tsx:38 · ContactSection.tsx:286 [V] |
| A11 | **Samstag & Sonntag: Geschlossen** | Kontakt.tsx:98-99 [V] |
| A12 | **Wochenende: Nach Absprache** ⚠️ (steht im Widerspruch zu A11, siehe Z03) | ContactSection.tsx:287 [V] |
| A13 | Fahrstunden-Termine auch außerhalb der Öffnungszeiten nach Absprache möglich | LocationSection.tsx:20 · FAQSection.tsx:38 · Kontakt.tsx:105 · Landing.tsx:76 [V] |
| A14 | Google-Bewertung: **5,0 ★** | constants.ts:10 · Hero.tsx:48 · LpSeo.tsx:39-40 · Karriere.tsx:312 [V] |
| A15 | Anzahl Google-Rezensionen: **26** | constants.ts:11 · Hero.tsx:48 · LpSeo.tsx:40 [V] |
| A16 | **Über 15 Jahre Erfahrung** (der Fahrlehrer / des Betriebs) | Hero.tsx:40,52 · Footer.tsx:27 · WhyABF.tsx:28 · AboutSection.tsx:18 [V] |
| A17 | Erreichbarkeit: Parkplätze direkt vor der Tür; Bahnhof Babelsberg, Tram und Bus in wenigen Minuten zu Fuß | LocationSection.tsx:23-24 · Landing.tsx:81 [V] |
| A18 | Geschäftsführer / inhaltlich verantwortlich: **Alishan Celik** | Impressum.tsx:31,67 [V] |
| A19 | Handelsregister: **Amtsgericht Potsdam, HRB 40850** | Impressum.tsx:44-45 [V] |
| A20 | Steuernummer: **3720153721** | Impressum.tsx:50 [V] |
| A21 | Aufsichtsbehörde: **Landesamt für Verkehr Brandenburg, Horstweg 102-109, 14478 Potsdam** | Impressum.tsx:55-57 [V] |
| A22 | Fahrerlaubnisbehörde: **Landeshauptstadt Potsdam, Friedrich-Ebert-Straße 79/81, 14469 Potsdam** | Impressum.tsx:60-62 [V] |
| A23 | Keine Teilnahme an Verbraucherstreitbeilegungsverfahren | Impressum.tsx:81 [V] |
| A24 | Hinweis: „Alle abgebildeten Personen haben der Veröffentlichung ihrer Bilder zugestimmt." | Footer.tsx:109 [V] |
| A25 | Copyright-Zeile: **© 2025 ABF Fahrschule Potsdam. Alle Rechte vorbehalten.** ⚠️ (Jahr, siehe Z04) | Footer.tsx:114 [V] |
| A26 | Geokoordinaten ⚠️ **drei verschiedene Werte** (siehe Z05) | LpSeo.tsx:33 (52.3906/13.0645) · Preise.tsx:31-32 (52.3906/13.0945) · Kontakt.tsx:31-32 (52.3935/13.0967) [V] |
| A27 | Angebotsfrist Herbst-Angebot: **endet 31.10.2026, 23:59:59** / Label „31. Oktober" | constants.ts:16-17 · OffersSection.tsx:38,91 [V] |
| A28 | Preisrahmen laut Schema: **€€** | LpSeo.tsx:36 · Preise.tsx:35 · Kontakt.tsx:43 [V] |

---

## B. Startseite `/` (Index.tsx)

Sections in Reihenfolge: Header · Hero · OffersSection · QuickContact · WhyABF · ProcessSection ·
AboutSection · JobSection · SuccessfulStudentsSection · FAQSection · ContactSection · Footer ·
MobileStickyFooter (Index.tsx:27-40) [V]

### B.1 Meta / SEO
| # | Aussage | Fundstelle |
|---|---|---|
| B01 | Title: „ABF Fahrschule Potsdam \| Führerschein in 4 Wochen" | Index.tsx:23 · index.html [V][L] |
| B02 | Description: „Führerschein Klasse B & Motorrad in Potsdam. Schnelle Theorie, moderne Ausbildung, faire Preise. Jetzt kostenlose Beratung sichern!" | Index.tsx:24 [V] |
| B03 | Canonical: `https://abf-fahrschule-potsdam.lovable.app/` ⚠️ (Lovable-Staging-Domain, siehe Z06) | Index.tsx:25 [V][L] |

### B.2 Hero (Hero.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B04 | H1: „**Fahrschule Potsdam** – Sicher fahren lernen" | Hero.tsx:34-37 [V][L] |
| B05 | „ABF Fahrschule Potsdam: Mit ruhiger Hand, persönlicher Betreuung und moderner Fahrausbildung zum Führerschein. Über 15 Jahre Erfahrung unserer Fahrlehrer – Ihre Fahrschule in Potsdam." | Hero.tsx:38-41 [V] |
| B06 | Trust-Badge: „5,0 ★ aus 26 Google-Bewertungen" | Hero.tsx:48 [V] |
| B07 | Trust-Badge: „Über 15 Jahre Erfahrung" | Hero.tsx:52 [V] |
| B08 | Trust-Badge: „Hohe Erfolgsquote" | Hero.tsx:56 [V] |
| B09 | CTA-Button: „Kostenlose Beratung" → scrollt zu `#contact` | Hero.tsx:62-63 [V] |
| B10 | CTA-Button: „Führerschein Info" → scrollt zu `#process` | Hero.tsx:66-69 [V] |
| B11 | Status-Badge: „Termine verfügbar" | Hero.tsx:116 [V] |
| B12 | Bild 1 alt/title: Fahrschulgebäude im WEBERPARK Tuchmacherstraße; Overlay „Moderne Fahrausbildung in Potsdam" / „Unser modernes Fahrschulgebäude im WEBERPARK Potsdam – Ihr Weg zum Führerschein" | Hero.tsx:16-20 [V] |
| B13 | Bild 2 alt/title: Theorieunterricht, moderner Unterrichtsraum mit roter Bestuhlung; Overlay „Theorieunterricht in Potsdam" / „Moderner Unterrichtsraum für entspanntes Lernen der Fahrtheorie" | Hero.tsx:22-26 [V] |

### B.3 Angebote (OffersSection.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B14 | H2: „Unsere Angebote in Potsdam" | OffersSection.tsx:20-22 [V] |
| B15 | „Starten Sie jetzt Ihre Fahrausbildung mit professioneller Betreuung und modernem Unterricht in Potsdam." | OffersSection.tsx:23-26 [V] |
| B16 | Karte PKW-Titel: „Führerschein-Ausbildung" | OffersSection.tsx:37 [V] |
| B17 | „🍂 Herbst-Angebot bis zum 31. Oktober 2026 nur 199 €!" | OffersSection.tsx:38 [V] |
| B18 | Preis PKW: **199 €** — „Herbst-Angebot - Grundbetrag" | OffersSection.tsx:42-43 [V] |
| B19 | § 32 FahrlG PKW: Unterweisungsstunde **67,50 €/45 Min.**, Übungsstunde **67,50 €/45 Min.**, Besondere Ausbildungsfahrten **75 €/45 Min.** | OffersSection.tsx:44 [V] |
| B20 | „Werde Teil unserer erfolgreichen Fahrschüler – starte deine Ausbildung in Potsdam mit kompletter Theorie in nur einer Woche und ADAC 1 Jahr kostenlos!" | OffersSection.tsx:50-53 [V] |
| B21 | Im Grundbetrag enthalten: **Kompletter Theorieunterricht** | OffersSection.tsx:56-60 [V] |
| B22 | Im Grundbetrag zusätzlich: **ADAC 1 Jahr kostenlos** | OffersSection.tsx:64-65 [V] |
| B23 | CTA „Jetzt für 199 € anmelden" → `/Anmeldung` ⚠️ (Groß-A, siehe Z07) | OffersSection.tsx:72-75 [V] |
| B24 | CTA „Kostenlos beraten lassen" → `#contact` | OffersSection.tsx:77-79 [V] |
| B25 | Karte Motorrad-Titel: „Motorrad-Führerschein" | OffersSection.tsx:90 [V] |
| B26 | „🍂 Herbst-Angebot bis zum 31. Oktober 2026" | OffersSection.tsx:91 [V] |
| B27 | Preis Motorrad: **399 €** — „Herbst-Angebot – Grundbetrag (A1, A2, A)" | OffersSection.tsx:95-96 [V] |
| B28 | § 32 FahrlG Motorrad: Unterweisungsstunde **75 €/45 Min.**, Übungsstunde **75 €/45 Min.**, Besondere Ausbildungsfahrten **85 €/45 Min.** | OffersSection.tsx:97 [V] |
| B29 | „Theorie im Winter machen und startklar sein, wenn die Saison beginnt – A1 ab 16, A2 ab 18 oder direkt Klasse A." | OffersSection.tsx:102-105 [V] |
| B30 | Motorrad zusätzlich enthalten: Kompletter Theorieunterricht · LernApp für die Theorieprüfung · **100 € Louis und Polo Gutschein** | OffersSection.tsx:109 [V] |
| B31 | CTA „Jetzt für 399 € anmelden" → `/anmeldungmotorrad` | OffersSection.tsx:118-121 [V] |
| B32 | CTA „Oder B196 für **750 € Festpreis**" → `/b196` | OffersSection.tsx:123-126 [V] |
| B33 | H3 „Jetzt Kontakt aufnehmen" + „Wir beraten Sie gerne persönlich zu unseren Angeboten in Potsdam" | OffersSection.tsx:136-141 [V] |
| B34 | Adresse-Kachel: „WEBERPARK Potsdam / Tuchmacherstraße" (Link zu Google Maps) | OffersSection.tsx:168-171 [V] |
| B35 | Trust-Badge: „Anerkannte Fahrschule Potsdam" | OffersSection.tsx:181 [V] |
| B36 | Trust-Badge: „Schnelle Terminvergabe" | OffersSection.tsx:186 [V] |

### B.4 QuickContact (QuickContact.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B37 | „Jetzt anrufen" mit Festnetz + Mobil (A04/A05) | QuickContact.tsx:13-17 [V] |
| B38 | „E-Mail schreiben" → potsdam@fahrschuleabf.de (A08) | QuickContact.tsx:24-27 [V] |
| B39 | „Besuchen Sie uns" — Tuchmacherstraße 45b, 14482 Potsdam | QuickContact.tsx:34-37 [V] |

### B.5 Warum ABF (WhyABF.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B40 | H2: „Warum ABF Fahrschule Potsdam wählen?" | WhyABF.tsx:24-26 [V] |
| B41 | „Mit über 15 Jahren Erfahrung als Fahrschule in Potsdam bieten wir Ihnen die beste Grundlage für eine erfolgreiche Führerscheinausbildung in Potsdam und Umgebung." | WhyABF.tsx:27-30 [V] |
| B42 | „Lokale Expertise Potsdam" — „Unsere Fahrlehrer kennen alle Straßen, Verkehrsregeln und Prüfungsrouten in Potsdam perfekt." | WhyABF.tsx:5-7 [V] |
| B43 | „Individuelle Fahrausbildung" — „Jeder Fahrschüler in Potsdam ist anders - wir passen unsere Ausbildung an Ihre Bedürfnisse an." | WhyABF.tsx:9-11 [V] |
| B44 | „Stressfreies Lernen in Potsdam" — „Kein Stress, kein Druck – entspannte Fahrausbildung mit Vertrauen in Potsdam." | WhyABF.tsx:13-15 [V] |
| B45 | „Moderne Fahrschule Potsdam" — „Zeitgemäße Theorieausbildung und praktische Fahrstunden mit neuesten Methoden." | WhyABF.tsx:17-19 [V] |

### B.6 Ablauf (ProcessSection.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B46 | H2: „Dein Führerschein in Potsdam in nur drei Schritten" | ProcessSection.tsx:31-33 [V] |
| B47 | „Schnell, entspannt und modern zu deinem Führerschein in Potsdam – mit der innovativen B197 Ausbildung bei der ABF Fahrschule für mehr Flexibilität in Potsdam." | ProcessSection.tsx:34-37 [V] |
| B48 | Schritt 1 „Anmeldung Fahrschule Potsdam" + Beschreibung (unverbindliche Beratung, Ablauf, Termine, inkl. B197-Option) | ProcessSection.tsx:10-13 [V] |
| B49 | Schritt 2 „Theorieunterricht & Praktische Fahrstunden Potsdam" + Beschreibung (moderner interaktiver Theorieunterricht in kleinen Gruppen, zeitnaher Praxisstart, lokale erfahrene Fahrlehrer) | ProcessSection.tsx:15-18 [V] |
| B50 | Schritt 3 „Führerscheinprüfung Potsdam" + Beschreibung (gezielte Vorbereitung Theorie + Praxis, Begleitung bis zum Bestehen) | ProcessSection.tsx:21-24 [V] |
| B51 | Zusatz zu Schritt 2: „B197 Ausbildung Potsdam" / „Automatik lernen, Schaltwagen fahren - in Potsdam" | ProcessSection.tsx:68,77 [V] |
| B52 | CTA: „Jetzt kostenlose Beratung Fahrschule Potsdam anfragen" | ProcessSection.tsx:97 [V] |
| B53 | B197-Modal H3: „B197 Ausbildung in Potsdam" | ProcessSection.tsx:118 [V] |
| B54 | B197-Modal: „Mehr Freiheit in Potsdam: Du kannst den Großteil deiner Fahrausbildung mit einem Automatikfahrzeug in Potsdam machen und trotzdem einen Schaltwagen fahren." | ProcessSection.tsx:121-124 [V] |
| B55 | B197-Modal: „So funktioniert's in Potsdam: **Nach mindestens 10 Fahrstunden** im Automatik machst du eine kurze Testfahrt im Schaltwagen – fertig!" | ProcessSection.tsx:125-128 [V] |
| B56 | B197-Modal: „Ihr Vorteil bei ABF Potsdam: Entspannter lernen in Potsdam, trotzdem alle Fahrzeugtypen fahren können." | ProcessSection.tsx:129-132 [V] |

### B.7 Über uns (AboutSection.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B57 | H2: „Über ABF Fahrschule Potsdam - Ihre vertrauensvolle Fahrschule" | AboutSection.tsx:12-14 [V] |
| B58 | Absatz 1: „Seit über 15 Jahren bilden wir in Potsdam erfolgreich Fahrschüler aus. …geduldigen, lokalen Fahrlehrern… Wir kennen die Straßen Potsdams perfekt und bereiten Sie optimal auf die Prüfung vor." | AboutSection.tsx:17-21 [V] |
| B59 | Absatz 2: „…eine gute Fahrschule in Potsdam ist mehr als nur das Bestehen einer Prüfung… verantwortungsvolles Fahren für das ganze Leben… ruhiger Hand und modernen Ausbildungsmethoden…" | AboutSection.tsx:23-27 [V] |
| B60 | Absatz 3: „Unsere Mission… jeden Fahrschüler mit Vertrauen, Geduld und Fachkompetenz zum Erfolg zu führen… entspannte Lernatmosphäre… ohne Stress und Druck…" | AboutSection.tsx:29-32 [V] |
| B61 | Werte: „Erfahrenes Fahrlehrer-Team Potsdam" · „Flexible Fahrstunden in Potsdam" · „Top Fahrausbildung Potsdam" · „Mit Herzblut in Potsdam" | AboutSection.tsx:39,43,47,51 [V] |
| B62 | „Unser Fahrlehrer-Team Potsdam" — „Erfahren, geduldig und immer für Sie da - lokale Fahrlehrer mit Potsdam-Expertise" | AboutSection.tsx:60-63 [V] |
| B63 | Qualifikationen: „Staatlich anerkannte Fahrschule in Potsdam" · „Zertifizierte Fahrlehrer für Potsdam" · „Regelmäßige Weiterbildungen" · „Moderne Fahrzeugflotte für Potsdam" | AboutSection.tsx:72,76,80,84 [V] |
| B64 | Team-Bilder-Slideshow (Inhalt in TeamSlideshow.tsx) | AboutSection.tsx:59 [V] |

### B.8 Stellenanzeige auf Startseite (JobSection.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B65 | H2 „Werde Teil unseres Teams!" · H3 „Wir suchen: **Bürokraft (m/w/d) in Teilzeit (30h/Woche)**" | JobSection.tsx:23-28 [V] |
| B66 | „Du bist ein Organisationstalent, liebst den Kontakt mit Menschen und willst Teil einer modernen, wachsenden Fahrschule in Potsdam werden? Dann bist du bei uns genau richtig!" | JobSection.tsx:29-31 [V] |
| B67 | Aufgaben: Telefonische und persönliche Betreuung unserer Fahrschüler · Terminplanung und Koordination der Fahrstunden · Allgemeine Büroorganisation und administrative Aufgaben | JobSection.tsx:7-9 [V] |
| B68 | Angebot: **Eine 30-Stunden-Woche mit flexiblen Arbeitszeiten** | JobSection.tsx:13 [V] |
| B69 | Angebot: **Eine Top-Bezahlung über dem Branchendurchschnitt** | JobSection.tsx:14 [V] |
| B70 | Angebot: **Ein modernes Büro im Herzen von Potsdam (WEBERPARK)** | JobSection.tsx:15 [V] |
| B71 | Angebot: **Ein herzliches und motiviertes Team** | JobSection.tsx:16 [V] |
| B72 | CTAs: „Jetzt per E-Mail bewerben" (A08) · „Festnetz: +49 331 96795854" · „Mobil: +49 162 2191290" | JobSection.tsx:63-80 [V] |

### B.9 Erfolgreiche Fahrschüler (SuccessfulStudentsSection.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B73 | H2 „Unsere erfolgreichen Fahrschüler" + „Diese stolzen Gesichter zeigen, was bei der ABF Fahrschule Potsdam möglich ist: Erfolgreiche Prüfungen und glückliche Fahrschüler!" | SuccessfulStudentsSection.tsx:36-42 [V] |
| B74 | 5 Bilder mit Alt-Texten (Fahrschülerin vor ABF · zwei Fahrschülerinnen vor Bildungszentrum · glückliche Fahrschülerinnen mit Führerschein · Motorradschüler im Ausbildungsraum · bestandene Fahrschülerinnen) | SuccessfulStudentsSection.tsx:7-27 [V] |
| B75 | Badge auf jedem Bild: „Prüfung bestanden!" / „ABF Fahrschule Potsdam" | SuccessfulStudentsSection.tsx:64,67 [V] |
| B76 | CTA-Block: „Du willst auch dabei sein?" + „Werde Teil unserer Erfolgsgeschichte und starte noch heute deine Fahrausbildung bei der ABF Fahrschule in Potsdam!" + Buttons Festnetz/Mobil/E-Mail | SuccessfulStudentsSection.tsx:78-103 [V] |

### B.10 FAQ Startseite (FAQSection.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B77 | H2 „Häufige Fragen zur Fahrschule Potsdam" + „Alles, was du über deine Führerschein-Ausbildung bei ABF in Potsdam wissen musst." | FAQSection.tsx:47-52 [V] |
| B78 | F: „Was kostet der Führerschein bei der ABF Fahrschule in Potsdam?" A: Grundbetrag Klasse B **aktuell nur 199 € im Herbst-Angebot**; enthalten kompletter Theorieunterricht + **1 Jahr ADAC-Mitgliedschaft**; Fahrstunden **ab 67,50 €/45 Min.** | FAQSection.tsx:11-13 [V] |
| B79 | F: „Wie lange dauert die Führerschein-Ausbildung in Potsdam?" A: Theorie **in nur einer Woche**; Gesamtdauer hängt von Verfügbarkeit für die Praxis ab; flexible Terminoptionen | FAQSection.tsx:16-18 [V] |
| B80 | F: „Was ist die B197 Ausbildung?" A: Großteil auf Automatikfahrzeug; nach **mindestens 10 Fahrstunden** kurze Testfahrt im Schaltwagen; danach beides fahren | FAQSection.tsx:21-23 [V] |
| B81 | F: „Wo befindet sich die ABF Fahrschule in Potsdam?" A: **WEBERPARK, Tuchmacherstraße 45b, 14482 Potsdam**; gut mit ÖPNV und Auto erreichbar | FAQSection.tsx:26-28 [V] |
| B82 | F: „Bietet die ABF Fahrschule auch Motorrad-Führerschein in Potsdam an?" A: Klassen **A, A1, A2**; Motorrad-Grundbetrag **ab 599 €** ⚠️ (siehe Z08) inkl. **Erste-Hilfe-Kurs, LernApp, 100 € Louis und Polo Gutschein** | FAQSection.tsx:31-33 [V] |
| B83 | F: „Welche Öffnungszeiten hat die Fahrschule in Potsdam?" A: **Mo–Fr 12:00–18:00 Uhr**; Fahrstunden auch außerhalb nach Absprache | FAQSection.tsx:36-38 [V] |

### B.11 Kontaktformular Startseite (ContactSection.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B84 | H2 „Jetzt Kontakt aufnehmen" + „Haben Sie Fragen zu unserer Fahrschule in Potsdam oder möchten Sie sich für den Führerschein anmelden? Wir freuen uns auf Ihre Nachricht und beraten Sie gerne kostenlos!" | ContactSection.tsx:114-120 [V] |
| B85 | Dynamischer Angebotshinweis: „🍂 Herbst-Angebot: nur {Preis} Grundbetrag!" — **b/be → 199 €**, **a1/a2/a → 399 €**, Default **199 €** | ContactSection.tsx:96-103,128 [V] |
| B86 | Zusatzhinweise: „gilt nur für Klasse B (PKW)" / „…B/BE" / „…A1" / „…A2" / „…A" | ContactSection.tsx:97-101 [V] |
| B87 | „Zusätzlich: ADAC 1 Jahr kostenlos. Fahrstunden **ab 67,50€/45 Min.**" | ContactSection.tsx:132-133 [V] |
| B88 | „Limitiertes Herbst-Angebot" | ContactSection.tsx:135 [V] |
| B89 | H3 „Kostenlose Beratung sichern" + „Wir melden uns **innerhalb von 24h** bei dir zurück" | ContactSection.tsx:139-144 [V] |
| B90 | Formularfelder: Vollständiger Name * · Telefonnummer * · E-Mail (optional) · Führerscheinklasse * · Datenschutz-Checkbox * | ContactSection.tsx:148-212 [V] |
| B91 | Klassen-Auswahl: Klasse B (PKW) · Klasse A1 (Motorrad 125ccm) · Klasse A2 (Motorrad 35kW) · Klasse A (Motorrad unbegrenzt) · Klasse BE (PKW + Anhänger) | ContactSection.tsx:181-185 [V] |
| B92 | Submit-Label: „Jetzt Anfrage senden & {Preis} Herbst-Angebot sichern" / mobil „Jetzt für {Preis} anmelden" | ContactSection.tsx:217 [V] |
| B93 | „Deine Daten sind sicher und werden vertraulich behandelt" | ContactSection.tsx:234 [V] |
| B94 | Kontaktblock H3 „ABF Fahrschule Potsdam - Ihr Kontakt" mit Adresse (A03), Telefon (A04/A05), E-Mail (A08), Öffnungszeiten (A10/A12) | ContactSection.tsx:242-291 [V] |
| B95 | Karten-Platzhalter: „Google Maps - Fahrschule Potsdam" + „Finden Sie unsere Fahrschule im WEBERPARK Potsdam" + Link „Route zur Fahrschule Potsdam planen" | ContactSection.tsx:299-303 [V] |

### B.12 Footer (Footer.tsx) — auf allen Nicht-LP-Seiten
| # | Aussage | Fundstelle |
|---|---|---|
| B96 | „Ihre vertrauensvolle Fahrschule in Potsdam. Mit über 15 Jahren Erfahrung begleiten wir Sie sicher zum Führerschein." | Footer.tsx:26-29 [V] |
| B97 | Schnellzugriff-Links: Home · Über uns · Führerschein · Bewertungen (Google Maps) · Kontakt · Anmeldung (→ `/Anmeldung` ⚠️ Z07) | Footer.tsx:36-53 [V] |
| B98 | Leistungen: Führerschein Klasse B · Theorieunterricht · Praktische Fahrstunden · Prüfungsvorbereitung · **Auffrischungskurse** | Footer.tsx:61-65 [V] |
| B99 | Rechtslinks: Impressum · Datenschutz · AGB | Footer.tsx:117-125 [V] |

### B.13 Mobile Sticky Footer (MobileStickyFooter.tsx)
| # | Aussage | Fundstelle |
|---|---|---|
| B100 | Buttons „Anrufen" (Mobil A05) und „WhatsApp" mit vorbelegtem Text „Hallo, ich interessiere mich für den Führerschein bei ABF Fahrschule Potsdam." | MobileStickyFooter.tsx:7-32 [V] |

---

## C. `/anmeldung` — PKW Klasse B (Landing.tsx)

Sections: LpHeader · UrgencyBar · LpHero+LeadForm · PriceBlock · SocialProof · Steps · WhyAbfCards ·
FaqBlock · LocationSection · FinalCta · StickyMobileCta (Landing.tsx:109-170) [V]

| # | Aussage | Fundstelle |
|---|---|---|
| C01 | Title: „Führerschein Klasse B Potsdam – Herbst-Angebot 199 € \| ABF Fahrschule" | Landing.tsx:102 [V][L] |
| C02 | Description: „PKW-Führerschein in Potsdam-Babelsberg. Theorie in 1 Woche, faire Preise, 5,0★ bei Google. Herbst-Angebot 199 € – nur bis 31. Oktober. Jetzt sichern!" | Landing.tsx:103 [V] |
| C03 | H1: „Dein Führerschein in Potsdam – Herbst-Angebot für **199 €**" | Landing.tsx:115 [V][L] |
| C04 | Subline: „Klasse B bei der ABF Fahrschule in Babelsberg. Theorie in nur einer Woche, erfahrene Fahrlehrer, faire Preise. **Nur bis 31. Oktober.**" | Landing.tsx:116 [V] |
| C05 | Chips: „Theorie in 1 Woche" · „5,0★ bei Google" · „Keine versteckten Kosten" | Landing.tsx:117 [V] |
| C06 | Urgency-Bar: „Herbst-Angebot – nur bis 31. Oktober" + Live-Countdown bis 31.10.2026 23:59:59 | UrgencyBar.tsx:19,42 · constants.ts:16-17 [V] |
| C07 | Formular-Klassen: **Klasse B – PKW** · **Klasse B197 – Automatik & Schalter** · **BF17 – Begleitetes Fahren ab 17** · **Klasse BE – PKW mit Anhänger** | Landing.tsx:86-89 [V] |
| C08 | CTA-Label Formular/Header/FinalCta: „Herbst-Angebot sichern" | Landing.tsx:121,159 [V] |
| C09 | WhatsApp-Vorbelegung: „Hallo, ich möchte das Herbst-Angebot (199 €) für den Führerschein Klasse B sichern." | Landing.tsx:126 [V] |
| C10 | Preisblock Badge „Herbst-Angebot", Preis **199 €**, Titel „199 € Herbst-Angebot – das ist drin" | Landing.tsx:132-134 [V] |
| C11 | Enthalten: Anmeldung & Verwaltung · Kompletter Theorieunterricht · Lern-App & Unterlagen · Vorstellung zur theoretischen Prüfung · Persönliche Beratung · **1 Jahr ADAC-Mitgliedschaft** | Landing.tsx:135-142 [V] |
| C12 | Kommt dazu: Übungsstunde (45 Min.) **67,50 €** · Unterweisung (45 Min.) **67,50 €** · Besondere Ausbildungsfahrten (45 Min.) **75 €** | Landing.tsx:143-147 [V] |
| C13 | Preis-Schlusssatz (Default): „Keine versteckten Kosten. Du bekommst vor dem Start eine vollständige Übersicht." | PriceBlock.tsx:20 [V] |
| C14 🔒 | Rezension **Zaplatix**: „Ich kann es hier nur empfehlen, bin hier hin gewechselt und innerhalb von 3 Monaten beim ersten Versuch bestanden, sowohl Serdar als auch Ali sind super Fahrlehrer, meine klare Empfehlung" | Landing.tsx:22-23 [V] |
| C15 🔒 | Rezension **Janne Stuer**: „Sehr nett alle und habe schnell viele Termine bekommen. Hab nur knapp 2 Monate für alle Fahrstunden gebraucht." | Landing.tsx:26-27 [V] |
| C16 🔒 | Rezension **THS KALLE Boss**: „Ein gute Fahrschule mit kompetente Fahrlehrer und alles beim ersten Mal bestanden.( hat nur 2 Monate gedauert)" | Landing.tsx:30-31 [V] |
| C17 | Schritt 1: „Formular ausfüllen" — „Dauert keine 2 Minuten – Name und Telefonnummer reichen." | Landing.tsx:36 [V] |
| C18 | Schritt 2: „Wir melden uns **innerhalb von 24 Stunden**" — „Kurzer Anruf, alle offenen Fragen geklärt." | Landing.tsx:37 [V] |
| C19 | Schritt 3: „Persönliches Beratungsgespräch im Weberpark" — „Wir zeigen dir alles und planen deinen Start." | Landing.tsx:38 [V] |
| C20 | Schritt 4: „Theoriekurs starten" — „Theorie in einer Woche – danach direkt in die Praxis." | Landing.tsx:39 [V] |
| C21 | FAQ: „Was genau ist im 199-€-Angebot enthalten?" → Anmeldung/Verwaltung, kompletter Theorieunterricht, Lern-App & Unterlagen, Vorstellung zur theoretischen Prüfung, persönliche Beratung, **1 Jahr ADAC-Mitgliedschaft**; Fahrstunden und amtliche Gebühren kommen zusätzlich dazu | Landing.tsx:44-46 [V] |
| C22 | FAQ: „Wie lange dauert der Führerschein bei euch insgesamt?" → Theorie **in einer Woche**; Gesamtdauer abhängig von Fahrstunden pro Woche; **viele Fahrschüler in 2 bis 3 Monaten fertig** | Landing.tsx:49-51 [V] |
| C23 | FAQ: „Kann ich auch mit 17 anfangen (BF17)?" → Anmeldung **ab 16,5 Jahren**, Prüfung **mit 17**, danach **bis 18** mit eingetragener Begleitperson | Landing.tsx:54-56 [V] |
| C24 | FAQ: „Was kostet der Führerschein am Ende ungefähr komplett?" → abhängig von Fahrstunden; Übungsstunde (45 Min.) **67,50 €**, Unterweisung **67,50 €**, besondere Ausbildungsfahrt **75 €**; amtliche Gebühren (**TÜV/DEKRA, Führerscheinstelle, Sehtest, Erste Hilfe**) kommen dazu | Landing.tsx:59-61 [V] |
| C25 | FAQ: „Muss ich bei der Anmeldung schon zahlen?" → **Nein**, Anfrage kostenlos und unverbindlich, **keine Vorkasse** | Landing.tsx:64-66 [V] |
| C26 | FAQ: „Bietet ihr auch Automatik (B197) an?" → Ja; überwiegend Automatik, nach **mindestens 10 Fahrstunden** kurze Testfahrt im Schaltwagen; danach beides, **ohne Automatik-Eintrag** | Landing.tsx:69-71 [V] |
| C27 | FAQ: „Wie flexibel sind die Fahrstunden-Termine?" → sehr flexibel, gemeinsame Planung, auch außerhalb der Bürozeiten nach Absprache | Landing.tsx:74-76 [V] |
| C28 | FAQ: „Wo genau finde ich euch?" → Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg; Parkplätze vor der Tür; Bahnhof Babelsberg, Tram und Bus in wenigen Minuten zu Fuß | Landing.tsx:79-81 [V] |
| C29 | FinalCta: „Herbst-Angebot: **199 € – nur noch bis 31. Oktober**" + „Sichere dir deinen Platz im nächsten Theoriekurs. Kostenlos & unverbindlich anfragen." | Landing.tsx:157-158 [V] |

---

## D. `/b196` — B196-Erweiterung (B196.tsx)

Sections: LpHeader · LpHero+LeadForm · **Voraussetzungs-Check** · PriceBlock · SocialProof · Steps ·
WhyAbfCards · FaqBlock · LocationSection · FinalCta · StickyMobileCta (B196.tsx:116-260) [V]
**Hinweis:** Diese Seite hat **keine** UrgencyBar (B196.tsx enthält keinen `<UrgencyBar />`, anders
als Landing.tsx:110 und AnmeldungMotorrad.tsx:136). [V]

| # | Aussage | Fundstelle |
|---|---|---|
| D01 | Title: „B196 Potsdam – 125er fahren mit Autoführerschein \| ABF Fahrschule" | B196.tsx:109 [V][L] |
| D02 | Description: „Mit dem B-Führerschein 125er fahren – ohne zusätzliche Prüfung. B196 in Potsdam-Babelsberg für 750 €. 5,0★ bei Google. Jetzt Platz sichern." | B196.tsx:110 [V] |
| D03 | H1: „125er fahren – mit deinem Autoführerschein, ohne neue Prüfung" | B196.tsx:121 [V][L] |
| D04 | Subline: „Die Schlüsselzahl B196 erweitert deinen bestehenden Führerschein Klasse B. Kein Theorie-, keine Praxisprüfung – nur eine kompakte Schulung. Bei ABF in Potsdam für **750 € Festpreis**." | B196.tsx:122 [V] |
| D05 | Chips: „Keine Prüfung nötig" · „In 2–3 Wochen fertig" · „Fester Komplettpreis" | B196.tsx:123 [V] |
| D06 | Formular-Klasse: **B196 – 125er Erweiterung** (einzige Option) | B196.tsx:21 [V] |
| D07 | CTA-Labels: Header „Platz anfragen", Formular/FinalCta „B196-Platz anfragen", Sticky „Platz anfragen" | B196.tsx:116,127,248,258 [V] |
| D08 | WhatsApp-Vorbelegung: „Hallo, ich interessiere mich für die B196-Schulung (750 € Festpreis)." | B196.tsx:132 [V] |
| D09 | Check-H2: „Erfüllst du die Voraussetzungen?" + „Drei kurze Fragen – du weißt es in 30 Sekunden." | B196.tsx:145,148 [V] |
| D10 | Check-Frage 1: „Bist du **mindestens 25 Jahre** alt?" | B196.tsx:24 [V] |
| D11 | Check-Frage 2: „Hast du deinen Führerschein Klasse B **seit mindestens 5 Jahren**?" | B196.tsx:25 [V] |
| D12 | Check-Frage 3: „Wohnst du im Raum Potsdam?" | B196.tsx:26 [V] |
| D13 | Erfolgsmeldung: „Du erfüllst alle Voraussetzungen – du kannst sofort starten" + Button „Jetzt Platz anfragen" | B196.tsx:188,195 [V] |
| D14 | Ablehnungsmeldung: „Für B196 fehlt dir aktuell noch eine Voraussetzung – kein Problem. Dann ist vielleicht **A1 oder A2** das Richtige für dich. [Zur Motorrad-Seite → `/anmeldungmotorrad`]. Wenn du unsicher bist, ruf uns einfach an – wir beraten dich ehrlich." | B196.tsx:208-216 [V] |
| D15 | Preisblock Badge „Festpreis", Preis **750 €**, Titel „750 € Festpreis – alles drin" | B196.tsx:226-228 [V] |
| D16 | Enthalten: **4 Einheiten Theorie** · **5 Einheiten Praxis auf 125er** · Nutzung unserer Schulungsmotorräder · Bescheinigung für die Führerscheinstelle · Keine Prüfungsgebühren (weil keine Prüfung nötig) | B196.tsx:229-235 [V] |
| D17 | Preis-Schlusssatz: „Fester Komplettpreis. Keine Nachberechnung, keine Überraschungen." | B196.tsx:236 [V] |
| D18 🔒 | Rezension **Max Katzmann**: „Ich hab meine Erweiterung auf A bei Mohamed gemacht und das war eine großartige Erfahrung." | B196.tsx:31-32 [V] |
| D19 🔒 | Rezension **Yasin Dinc**: „Top Fahrschule , Motorrad Führerschein da gemacht , lief alles reibungslos . Preis leistungs Verhältnis super . Sehr empfehlenswert" | B196.tsx:35-36 [V] |
| D20 🔒 | Rezension **Simone**: „Freundliche Beratung, tolle Fahrlehrer" | B196.tsx:38 [V] |
| D21 | Schritt 1: „Voraussetzungen prüfen" — „Dauert 30 Sekunden – direkt hier auf der Seite." | B196.tsx:42 [V] |
| D22 | Schritt 2: „Formular ausfüllen" — „Name und Telefonnummer reichen uns." | B196.tsx:43 [V] |
| D23 | Schritt 3: „Rückmeldung **in 24 Stunden**" — „Wir melden uns mit einem konkreten Terminvorschlag." | B196.tsx:44 [V] |
| D24 | Schritt 4: „Schulung an **2–3 Terminen**" — „Danach Eintrag holen und direkt losfahren." | B196.tsx:45 [V] |
| D25 | FAQ: „Was genau ist B196?" → Schlüsselzahl im bestehenden B-Führerschein; **Leichtkrafträder bis 125 ccm und 11 kW**; kein neuer Führerschein, keine Prüfung, nur vorgeschriebene Schulung | B196.tsx:50-52 [V] |
| D26 | FAQ: „Muss ich wirklich keine Prüfung machen?" → weder theoretische noch praktische Prüfung; **4 Einheiten Theorie, 5 Einheiten Praxis**; danach Bescheinigung für die Führerscheinstelle | B196.tsx:55-57 [V] |
| D27 | FAQ: „Welche Voraussetzungen brauche ich genau?" → **mindestens 25 Jahre** UND **Klasse B seit mindestens 5 Jahren**; beide Bedingungen gleichzeitig | B196.tsx:60-62 [V] |
| D28 | FAQ: „Wie lange dauert die Schulung?" → **2 bis 3 Termine**, verteilt auf etwa **2 bis 3 Wochen** | B196.tsx:65-67 [V] |
| D29 | FAQ: „Welche Motorräder darf ich danach fahren?" → bis **125 ccm**, max. **11 kW**, Leistungsgewicht bis **0,1 kW/kg** | B196.tsx:70-72 [V] |
| D30 | FAQ: „Gilt das auch im Ausland?" → **Nein**, B196 gilt ausschließlich in Deutschland; im Ausland wäre **Klasse A1** nötig | B196.tsx:75-77 [V] |
| D31 | FAQ: „Brauche ich eigene Ausrüstung?" → Motorradbekleidung (**Helm, Handschuhe, Jacke, Hose, feste Stiefel**); **das Motorrad stellen wir** | B196.tsx:80-82 [V] |
| D32 | FAQ: „Was ist der Unterschied zu A1?" → A1 = eigene Klasse mit Theorie- und Praxisprüfung, **EU-weit gültig**, **ab 16 Jahren**; B196 = Erweiterung ohne Prüfung, schneller und günstiger, **nur in Deutschland** | B196.tsx:85-87 [V] |
| D33 | FinalCta: „B196 bei ABF – **750 € Festpreis**, jetzt Platz sichern" + „Kompakte Schulung, keine Prüfung, danach direkt auf die 125er." | B196.tsx:246-247 [V] |

---

## E. `/anmeldungmotorrad` — Motorrad A1/A2/A (AnmeldungMotorrad.tsx)

Sections: LpHeader · UrgencyBar · LpHero+LeadForm · **Klassen-Vergleich** · PriceBlock · SocialProof ·
Steps · WhyAbfCards · FaqBlock · LocationSection · FinalCta · StickyMobileCta [V]

| # | Aussage | Fundstelle |
|---|---|---|
| E01 | Title: „Motorradführerschein Potsdam – A1, A2, A ab 399 € \| ABF Fahrschule" | AnmeldungMotorrad.tsx:128 [V][L] |
| E02 | Description: „Motorradführerschein in Potsdam: A1 ab 16, A2 ab 18, Klasse A. Herbst-Angebot 399 € bis 31. Oktober – jetzt Theorie machen, im Frühjahr fahren." | AnmeldungMotorrad.tsx:129 [V] |
| E03 | H1: „Motorradführerschein Potsdam – jetzt starten, im Frühjahr fahren" | AnmeldungMotorrad.tsx:141 [V][L] |
| E04 | Subline: „A1 ab 16, A2 ab 18 oder Klasse A. Herbst-Angebot **399 €** – Theorie im Winter, und wenn die Saison beginnt, bist du startklar. **Nur bis 31. Oktober.**" | AnmeldungMotorrad.tsx:142 [V] |
| E05 | Chips: „Eigene Schulungsmotorräder" · „5,0★ bei Google" · „Im Frühjahr sofort auf die Straße" | AnmeldungMotorrad.tsx:143-147 [V] |
| E06 | Formular-Klassen: **A1 – ab 16 Jahren (125 ccm)** · **A2 – ab 18 Jahren (bis 35 kW)** · **A – unbegrenzt** · „Weiß noch nicht – bitte beraten" | AnmeldungMotorrad.tsx:22-27 [V] |
| E07 | Klassen-Vergleich H2: „Welche Klasse passt zu dir?" | AnmeldungMotorrad.tsx:169 [V] |
| E08 | Karte **A1**: „ab 16 Jahren" · „bis 125 ccm / 11 kW" · „Der Einstieg" | AnmeldungMotorrad.tsx:31-35 [V] |
| E09 | Karte **A2**: „ab 18 Jahren" · „bis 35 kW" · „Der Stufenweg, Aufstieg nach 2 Jahren" | AnmeldungMotorrad.tsx:38-43 [V] |
| E10 | Karte **A**: „ab 24 Jahren (bzw. Aufstieg)" · „unbegrenzt" · „Der Direkteinstieg" | AnmeldungMotorrad.tsx:45-50 [V] |
| E11 | Karten-Button: „Diese Klasse wählen" (setzt Klasse + scrollt zum Formular) | AnmeldungMotorrad.tsx:186 [V] |
| E12 | CTA-Label Formular/FinalCta: „Motorrad-Platz sichern" | AnmeldungMotorrad.tsx:151,224 [V] |
| E13 | WhatsApp-Vorbelegung: „Hallo, ich interessiere mich für den Motorradführerschein (Herbst-Angebot 399 €)." | AnmeldungMotorrad.tsx:156 [V] |
| E14 | Preisblock Badge „Herbst-Angebot", Preis **399 €**, Titel „399 € Herbst-Angebot – das ist drin" | AnmeldungMotorrad.tsx:197-199 [V] |
| E15 | Enthalten: Anmeldung & Verwaltung · Kompletter Theorieunterricht · Motorrad-spezifische Theorie · **100 € Louis und Polo Gutschein** · Prüfungsvorbereitung · **1 Jahr ADAC-Mitgliedschaft** | AnmeldungMotorrad.tsx:200-207 [V] |
| E16 | Kommt dazu: Übungsstunde (45 Min.) **75 €** · Unterweisung (45 Min.) **75 €** · Besondere Ausbildungsfahrten (45 Min.) **85 €** | AnmeldungMotorrad.tsx:208-212 [V] |
| E17 🔒 | Rezension **Bogdan Kotenko**: „Fahrlehrer Mohamed - ist der beste Fahrlehrer!!! 100% Weiterempfehlung! Motorrad Führerschein beim ersten Versuch bekommen!! ABF Fahrschule - weiter so!" | AnmeldungMotorrad.tsx:55-56 [V] |
| E18 🔒 | Rezension **Leander Fischer**: „Ich habe bei der ABF Fahrschule meinen A1 Schein gemacht und beim ersten Mal bestanden. Mit meinem Fahrlehrer Mohamed bin ich auch super zufrieden gewesen und er hat mich sehr gut auf die Prüfung vorbereitet :)" | AnmeldungMotorrad.tsx:59-60 [V] |
| E19 🔒 | Rezension **Yasin Dinc** (identisch mit D19) | AnmeldungMotorrad.tsx:63-64 [V] |
| E20 | Schritt 1: „Klasse wählen & Formular ausfüllen" — „A1, A2 oder A – oder wir beraten dich dazu." | AnmeldungMotorrad.tsx:69 [V] |
| E21 | Schritt 2: „Rückmeldung **in 24 Stunden**" — „Kurzer Anruf, alles Weitere besprechen wir persönlich." | AnmeldungMotorrad.tsx:70 [V] |
| E22 | Schritt 3: „Beratung & Klassencheck" — „Welche Klasse passt wirklich zu dir und deinem Alter?" | AnmeldungMotorrad.tsx:71 [V] |
| E23 | Schritt 4: „Theorie starten, im Frühjahr fahren" — „Winter für die Theorie nutzen – zur Saison bist du startklar." | AnmeldungMotorrad.tsx:72 [V] |
| E24 | FAQ: „Welche Klasse ist die richtige für mich?" → **mit 16 nur A1** (bis 125 ccm / 11 kW); **ab 18 A2** (bis 35 kW), **nach 2 Jahren A2** Aufstieg auf A; **Direkteinstieg A ab 24 Jahren** | AnmeldungMotorrad.tsx:77-79 [V] |
| E25 | FAQ: „Lohnt es sich, im Herbst anzufangen?" → Ja; Theorie und Vorbereitung in der ruhigen Jahreszeit mit guter Terminverfügbarkeit; im Frühjahr bereits fahren statt auf einen Platz warten | AnmeldungMotorrad.tsx:82-84 [V] |
| E26 | FAQ: „Habt ihr eigene Motorräder zum Üben?" → Ja, eigene gepflegte Schulungsmotorräder; kein eigenes Motorrad nötig | AnmeldungMotorrad.tsx:87-89 [V] |
| E27 | FAQ: „Brauche ich eigene Schutzkleidung?" → Motorradbekleidung (Helm, Handschuhe, Jacke, Hose, feste Stiefel); **Louis- und Polo-Gutschein** verbilligt die Erstausstattung | AnmeldungMotorrad.tsx:92-94 [V] |
| E28 | FAQ: „Was kostet der Motorradführerschein insgesamt?" → Grundbetrag im Herbst-Angebot **399 €**; Übungsstunde (45 Min.) **75 €**, Unterweisung **75 €**, besondere Ausbildungsfahrt **85 €**; amtliche Gebühren zusätzlich | AnmeldungMotorrad.tsx:97-99 [V] |
| E29 | FAQ: „Kann ich später von A2 auf A aufsteigen?" → Ja, **nach 2 Jahren Besitz A2** über Aufstiegsschulung mit praktischer Prüfung, **ohne erneute Theorieprüfung** | AnmeldungMotorrad.tsx:102-104 [V] |
| E30 | FAQ: „Ich habe schon Klasse B – bringt mir das etwas?" → Ja; **ab 25 Jahren** und **B seit mindestens 5 Jahren** per **B196** ohne Prüfung 125er fahren; Verweis auf `/b196` | AnmeldungMotorrad.tsx:107-109 [V] |
| E31 | FinalCta: „Herbst-Angebot: **399 € – nur noch bis 31. Oktober**" + „Theorie jetzt, Fahrspaß im Frühjahr. Kostenlos & unverbindlich anfragen." | AnmeldungMotorrad.tsx:222-223 [V] |

---

## F. `/preise` (Preise.tsx)

| # | Aussage | Fundstelle |
|---|---|---|
| F01 | Title: „Faire Preise für deinen Führerschein \| ABF Fahrschule Potsdam" | Preise.tsx:11 [V][L] |
| F02 | Description erwähnt **„199€ Herbst-Angebot Grundbetrag"** ⚠️ (widerspricht F06, siehe Z09) | Preise.tsx:12 [V] |
| F03 | Canonical `https://www.abf-fahrschule.de/preise` ⚠️ (www-Variante, siehe Z06) | Preise.tsx:14 [V][L] |
| F04 | H1: „Faire Preise – volle Leistung" | Preise.tsx:49-51 [V][L] |
| F05 | „Transparente Kosten gemäß **§ 32 Fahrlehrergesetz**. Bei uns wissen Sie genau, was Sie erwartet." | Preise.tsx:52-54 [V] |
| F06 | Badge „🍂 Herbst-Angebot – Jetzt sparen!" · H2 „Preisliste Führerschein" · „Alle Preise inkl. MwSt. gemäß § 32 FahrlG" | Preise.tsx:60-62 [V] |
| F07 | **Grundbetrag Klasse B: 279 € (statt 479 €)** ⚠️ (siehe Z09) — „Einmalige Gebühr für Verwaltung und vollständige Theorieausbildung" | Preise.tsx:71-78 [V] |
| F08 | Im Grundbetrag Klasse B zusätzlich: **Vorstellung zur theoretischen Prüfung** | Preise.tsx:86 [V] |
| F09 | Fahrstunden Klasse B: Unterweisung (45 Min.) **67,50 €** · Übungsstunde (45 Min.) **67,50 €** · Besondere Ausbildungsfahrten (45 Min.) **75 €** | Preise.tsx:97-106 [V] |
| F10 | „Besondere Ausbildungsfahrten: **5× Überland, 4× Autobahn, 3× Nachtfahrt** (gesetzlich vorgeschrieben)" | Preise.tsx:110 [V] |
| F11 | **Grundbetrag Klasse A + A2: 550 € (statt 650 €)** ⚠️ (siehe Z08) | Preise.tsx:118-125 [V] |
| F12 | Im Grundbetrag A+A2 zusätzlich: **Erste-Hilfe-Kurs** · **Digitale LernApp (Vogel Verlag)** · **100 € Louis und Polo Gutschein (Motorradzubehör)** · **ADAC Mitgliedschaft 1 Jahr kostenlos** | Preise.tsx:133-145 [V] |
| F13 | Fahrstunden Klasse A + A2: Unterweisung (45 Min.) **75 €** · Übungsstunde (45 Min.) **75 €** · Besondere Ausbildungsfahrten (45 Min.) **85 €** | Preise.tsx:157-165 [V] |
| F14 | Vorstellung zur **theoretischen Prüfung: Im Grundbetrag enthalten** | Preise.tsx:175-176 [V] |
| F15 | Vorstellung zur **praktischen Prüfung: 189 €** | Preise.tsx:179-180 [V] |
| F16 | Externe Gebühren (nicht an ABF): **TÜV Theorieprüfung ca. 23 €** · **TÜV Praxisprüfung ca. 117 €** · **Führerscheinantrag (Behörde) ca. 44 €** · **Sehtest & Passfoto ca. 15 €** | Preise.tsx:193-206 [V] |
| F17 | „Diese Gebühren werden direkt an TÜV/DEKRA bzw. Behörden gezahlt." | Preise.tsx:210 [V] |
| F18 | „💡 Warum Qualität günstiger ist, als Sie denken" — „Bei ABF Fahrschule investieren Sie in erfahrene Fahrlehrer, moderne Fahrzeuge und eine effiziente Ausbildung. Das bedeutet: weniger Fahrstunden nötig, schnellerer Prüfungserfolg und am Ende sogar niedrigere Gesamtkosten." | Preise.tsx:216-220 [V] |
| F19 | CTA „Jetzt Angebot sichern" → `/Anmeldung` ⚠️ (Z07) | Preise.tsx:224-227 [V] |
| F20 | „**Ratenzahlung möglich** – sprechen Sie uns bei der Anmeldung darauf an." | Preise.tsx:229-231 [V] |
| F21 | Karte „📊 Ratenzahlung möglich" — „Wir bieten flexible Zahlungsoptionen an. Sprich uns einfach bei der Anmeldung darauf an." | Preise.tsx:238-241 [V] |
| F22 | Karte „🎓 BF17 (Begleitetes Fahren)" — „Bereits **ab 16,5 Jahren** kannst du mit der Ausbildung starten. **Gleiche Konditionen wie für Klasse B.**" | Preise.tsx:245-248 [V] |
| F23 | CTA-Block: „Noch Fragen zu den Preisen?" + „Ruf uns an oder komm direkt im Weber Park vorbei. Wir beraten dich gerne persönlich." + Buttons Festnetz / Mobil / „📍 Standort & Öffnungszeiten" (→ `/kontakt`) | Preise.tsx:254-275 [V] |
| F24 | Schema.org LocalBusiness mit Öffnungszeiten **09:00–18:00** ⚠️ (widerspricht A10, siehe Z03) | Preise.tsx:36-41 [V] |

---

## G. `/kontakt` (Kontakt.tsx)

| # | Aussage | Fundstelle |
|---|---|---|
| G01 | Title: „Kontakt & Standort Weber Park \| ABF Fahrschule Potsdam-Babelsberg" | Kontakt.tsx:11 [V][L] |
| G02 | Canonical `https://www.abf-fahrschule.de/kontakt` ⚠️ (Z06) | Kontakt.tsx:14 [V][L] |
| G03 | H1: „So findest du uns im Weber Park" | Kontakt.tsx:51-53 [V][L] |
| G04 | „Mitten in Potsdam-Babelsberg. Modern, zentral und gut erreichbar mit Bus, Straßenbahn und Auto." | Kontakt.tsx:54-56 [V] |
| G05 | Standort-Karte: „ABF Bildungszentrum und Fahrschule GmbH / Weber Park / Tuchmacherstraße 45 B / 14482 Potsdam (Babelsberg)" + Button „📍 In Google Maps öffnen" | Kontakt.tsx:68-80 [V] |
| G06 | Öffnungszeiten-Karte: **Montag – Freitag: 12:00 – 18:00 Uhr** · **Samstag & Sonntag: Geschlossen** | Kontakt.tsx:91-100 [V] |
| G07 | „💡 Theorieunterricht findet auch außerhalb dieser Zeiten statt." + Link „Mehr zur Theorie" (→ `/theorie`) | Kontakt.tsx:104-106 [V] |
| G08 | H2 „Nimm direkt Kontakt auf" + 4 Buttons: Festnetz · Mobil · WhatsApp · E-Mail | Kontakt.tsx:112-138 [V] |
| G09 | Kontaktzeile: Festnetz +49 331 96795854 · Mobil +49 162 2191290 · kontakt@abf-fahrschule.de | Kontakt.tsx:141-143 [V] |
| G10 | Eingebettete Google-Maps-Karte, Titel „ABF Fahrschule im Weber Park Potsdam, Tuchmacherstraße 45 B" | Kontakt.tsx:149-151 [V] |
| G11 | CTA-Block: „Bereit für deinen Führerschein?" + „Komm vorbei oder melde dich direkt online an. Wir freuen uns auf dich!" + Button „Jetzt Platz sichern" → `/Anmeldung` ⚠️ (Z07) | Kontakt.tsx:163-172 [V] |
| G12 | Schema.org: E-Mail `kontakt@abf-fahrschule.de`, URL `https://www.abf-fahrschule.de` | Kontakt.tsx:35-36 [V] |
| G13 | **Leerer „Anfahrt"-Block** — zwei leere `<div>` im Grid ohne Inhalt ⚠️ (siehe Z10) | Kontakt.tsx:154-159 [V] |

---

## H. `/theorie` (Theorie.tsx)

| # | Aussage | Fundstelle |
|---|---|---|
| H01 | Title: „Theorieunterricht Führerschein Klasse B \| ABF Fahrschule Potsdam" | Theorie.tsx:11 [V][L] |
| H02 | Canonical `https://www.abf-fahrschule.de/theorie` ⚠️ (Z06) | Theorie.tsx:14 [V][L] |
| H03 | H1: „Kompletter Theorieunterricht – kompakt & effektiv" | Theorie.tsx:42-44 [V][L] |
| H04 | „Alles, was du für die theoretische Prüfung brauchst – verständlich erklärt, praxisnah und mit digitaler Unterstützung." | Theorie.tsx:45-47 [V] |
| H05 | **14 Stunden** — „**12x Grundstoff + 2x Zusatzstoff** Klasse B" | Theorie.tsx:57-58 [V] |
| H06 | **LernApp** — „**Vogel Verlag** – offizieller TÜV-Fragenkatalog" | Theorie.tsx:64-65 [V] |
| H07 | **Prüfung** — „Vorstellung zur Theorieprüfung zusätzlich" ⚠️ (widerspricht F14/C11, siehe Z11) | Theorie.tsx:71-72 [V] |
| H08 | CTA „Jetzt Theorie-Kursplatz sichern" → `/Anmeldung` ⚠️ (Z07), zweimal auf der Seite | Theorie.tsx:76-79, 232-235 [V] |
| H09 | H2 „So läuft der Theorieunterricht ab" | Theorie.tsx:86-88 [V] |
| H10 | Schritt 1 „Anmeldung & Zugang zur LernApp" — sofortiger Zugang zur digitalen LernApp vom Vogel Verlag; lernen am Handy, Tablet oder PC | Theorie.tsx:96-99 [V] |
| H11 | Schritt 2 „Theorieunterricht im Unterrichtsraum" — Präsenzunterricht in modernen Räumen mit erfahrenen Fahrlehrern; von Verkehrsregeln bis Vorfahrt und Technik | Theorie.tsx:110-113 [V] |
| H12 | Schritt 3 „Selbststudium mit der LernApp" — alle offiziellen Prüfungsfragen, Lernfortschritt, Fehlererklärungen, Prüfungssimulationen | Theorie.tsx:124-127 [V] |
| H13 | Schritt 4 „Anmeldung zur Theorieprüfung" — Anmeldung beim TÜV, sobald du bereit bist; „Die Vorstellung erfolgt zusätzlich." | Theorie.tsx:138-141 [V] |
| H14 | H2 „Unsere Tipps für die Theorieprüfung" | Theorie.tsx:153 [V] |
| H15 | Tipp „Übe täglich" — **10–15 Minuten pro Tag** effektiver als einmal wöchentlich 2 Stunden | Theorie.tsx:156-159 [V] |
| H16 | Tipp „Simulation machen" — **mindestens 5–10 Prüfungssimulationen** | Theorie.tsx:162-163 [V] |
| H17 | Tipp „Fragen stellen" — Unterricht nutzen, um Unklarheiten zu klären | Theorie.tsx:166-169 [V] |
| H18 | Tipp „Verstehen statt auswendig lernen" — App erklärt jeden Fehler | Theorie.tsx:172-175 [V] |
| H19 | Tipp „Entspannt bleiben" — „Mit guter Vorbereitung bestehen **über 90% unserer Fahrschüler** beim ersten Versuch." | Theorie.tsx:178-181 [V] |
| H20 | Tipp „Zeit einplanen" — **etwa 2–3 Wochen Lernzeit** einplanen | Theorie.tsx:184-187 [V] |
| H21 | FAQ „Brauche ich zusätzliche Lehrbücher?" → Nein, LernApp enthält alle Prüfungsfragen und Erklärungen | Theorie.tsx:197-200 [V] |
| H22 | FAQ „Wie lange dauert die Theorie insgesamt?" → **komplette Theorie in nur einer Woche**, **14 Stunden** kompakt | Theorie.tsx:203-206 [V] |
| H23 | FAQ „Wann kann ich zur Prüfung?" → sobald gesamter Theorieunterricht absolviert und in der App sicher | Theorie.tsx:209-212 [V] |
| H24 | FAQ „Was passiert, wenn ich durchfalle?" → Wiederholung **nach 2 Wochen Wartezeit** möglich | Theorie.tsx:215-218 [V] |
| H25 | CTA-Block: „Bereit für die Theorie?" + „Sichere dir jetzt deinen Platz im nächsten Theoriekurs und starte durch!" + Buttons „Jetzt Theorie-Kursplatz sichern" / „Fragen? Ruf uns an" (→ `/kontakt`) | Theorie.tsx:225-241 [V] |
| H26 | **Leerer „Kurszeiten"-Block** (nur Kommentar, kein Inhalt) ⚠️ (Z10) | Theorie.tsx:148-149 [V] |

---

## I. `/karriere` (Karriere.tsx)

| # | Aussage | Fundstelle |
|---|---|---|
| I01 | Title: „Karriere bei ABF Fahrschule Potsdam – Jobs & Praktikum" | Karriere.tsx:277 [V][L] |
| I02 | Description: „Werde Teil des ABF-Teams in Potsdam: Fahrlehrer, Fahrlehreranwärter, Büro & Aushilfe. Faire Vergütung, modernes Team, 5,0★ bei Google. Jetzt bewerben!" | Karriere.tsx:278-281 [V] |
| I03 | Canonical `https://abf-fahrschule.de/karriere` | Karriere.tsx:282 [V][L] |
| I04 | H1: „Werde Teil des **ABF-Teams** in Potsdam" | Karriere.tsx:314-316 [V][L] |
| I05 | Badge: „5,0 bei Google – ausgezeichnetes Team" | Karriere.tsx:312 [V] |
| I06 | „Ob erfahrener Fahrlehrer, angehender Fahrlehreranwärter oder im Büro – bei uns gestaltest du die Mobilität von morgen mit." | Karriere.tsx:317-319 [V] |
| I07 | Badge: „**Bis zu 30 €/Stunde**" | Karriere.tsx:322 [V] |
| I08 | Stelle 1: **Fahrlehrer/in (m/w/d) – Klasse B / BE / A**, Vollzeit / Teilzeit, **30 €/Std** | Karriere.tsx:37-42 [V] |
| I09 | Stelle 1 Kurztext: „Erfahrener Fahrlehrer für unser wachsendes Team in Potsdam." | Karriere.tsx:43 [V] |
| I10 | Stelle 1 Details: Gültige Fahrlehrerlaubnis (**mind. Klasse BE, A von Vorteil**) erforderlich · Faire, leistungsgerechte Vergütung · Moderne, top ausgestattete Schulungsfahrzeuge · Flexible Einteilung · Familiäres Team | Karriere.tsx:44-50 [V] |
| I11 | Stelle 2: **Fahrlehreranwärter/in (m/w/d) – Praktikumsstelle**, **Praktikum (4 Monate)**, **25 €/Std** | Karriere.tsx:54-58 [V] |
| I12 | Stelle 2 Kurztext: „Du machst die Fahrlehrerausbildung und suchst eine Ausbildungsfahrschule für dein Praktikum?" | Karriere.tsx:59 [V] |
| I13 | Stelle 2 Details: Persönliche Betreuung durch erfahrene Ausbildungsfahrlehrer · Vergütung während des gesamten Praktikums · Übernahmemöglichkeit nach erfolgreichem Abschluss · **2–4 Plätze verfügbar** · Strukturierter Ausbildungsplan | Karriere.tsx:60-66 [V] |
| I14 | Stelle 3: **Büromitarbeiter/in (m/w/d)**, **Teilzeit / Minijob**, kein Stundensatz angegeben | Karriere.tsx:70-74 [V] |
| I15 | Stelle 3 Kurztext + Details: Organisationstalent · freundlicher Kundenkontakt persönlich/telefonisch/per Mail · Terminkoordination · digitale Verwaltung mit moderner Fahrschulsoftware · familiäres Umfeld & geregelte Arbeitszeiten | Karriere.tsx:75-81 [V] |
| I16 | Stelle 4: **Aushilfe / Minijob (m/w/d)**, **Minijob (603€)** | Karriere.tsx:85-88 [V] |
| I17 | Stelle 4 Details: Flexible Stunden – ideal für Studierende · Einblick in den Fahrschulbetrieb · Unterstützung bei Verwaltung, Empfang und Organisation · Faire Bezahlung & angenehmes Team | Karriere.tsx:90-96 [V] |
| I18 | Filter-Kategorien: Alle · Fahrlehrer · Praktikum/Ausbildung · Büro & Verwaltung · Aushilfe/Minijob | Karriere.tsx:100 [V] |
| I19 | Benefits: Faire Vergütung („Leistungsgerechte Bezahlung, auch im Praktikum.") · Moderne Fahrzeuge · Flexible Arbeitszeiten · Familiäres Team · Übernahmechance · Weiterbildung | Karriere.tsx:102-109 [V] |
| I20 | Ablauf: Bewerbung absenden („Formular in 2 Minuten ausfüllen") · Kennenlernen („Wir melden uns **innerhalb von 48h**") · Schnuppertag · Willkommen im Team | Karriere.tsx:111-116 [V] |
| I21 | H2-Abschnitte: „Warum ABF?" / „Was uns als Arbeitgeber besonders macht" · „Offene Stellen" / „Finde deine Position – klick dich durch die Details" · „So läuft's ab" / „Vom Klick zum Job – in vier Schritten" · „Jetzt bewerben" / „Wir melden uns **innerhalb von 48 Stunden** bei dir." · „Standort" · „Direkt für Bewerber" | Karriere.tsx:339-620 [V] |
| I22 | Bewerbungsformular: Stelle * · Name * · E-Mail * · Telefon * · Ausbildungsphase (nur bei Praktikum: „Noch nicht begonnen" / „In Ausbildung" / „Praktikumsphase") · Nachricht · Datenschutz-Checkbox * · Option **Initiativbewerbung** | Karriere.tsx:487-577 [V] |
| I23 | Bewerber-Kontakt: Festnetz A04 · Mobil A05 · E-Mail A08 | Karriere.tsx:~611-619 [V] |
| I24 | JobPosting-Schema: `validThrough: 2026-12-31`, Ort Tuchmacherstraße 45b, 14482 Potsdam, Brandenburg, DE; Gehalt pro Stunde für Fahrlehrer (30) und Praktikum (25) | Karriere.tsx:232-272 [V] |

---

## J. `/karriere/danke` (KarriereDanke.tsx)

| # | Aussage | Fundstelle |
|---|---|---|
| J01 | Title: „Bewerbung eingegangen \| ABF Fahrschule Potsdam" | KarriereDanke.tsx:24 [V] |
| J02 | H1 + Bestätigungstext (Bewerbungseingang) | KarriereDanke.tsx:45-49 [V] |
| J03 | Kontakt: Festnetz A04 · E-Mail A08 | KarriereDanke.tsx:71-76 [V] |

---

## K. `/danke` — Dankesseite nach Lead (Danke.tsx)

| # | Aussage | Fundstelle |
|---|---|---|
| K01 | Title: „Danke für deine Anfrage \| ABF Fahrschule Potsdam"; `robots: noindex, nofollow` | Danke.tsx:24-25 [V][L] |
| K02 | H1: „Vielen Dank für deine Anfrage!" | Danke.tsx:36-38 [V][L] |
| K03 | „Wir haben deine Anmeldung erfolgreich erhalten und werden uns **innerhalb von 24 Stunden** bei dir melden." | Danke.tsx:40-42 [V] |
| K04 | H2 „Was passiert als Nächstes?" | Danke.tsx:45-47 [V] |
| K05 | Punkt 1: „Ein Mitarbeiter wird sich telefonisch oder per E-Mail bei dir melden" | Danke.tsx:51 [V] |
| K06 | Punkt 2: „Wir vereinbaren einen Termin für ein persönliches Beratungsgespräch" | Danke.tsx:55 [V] |
| K07 | Punkt 3: „Du erhältst alle Informationen zur Anmeldung und zum Start" | Danke.tsx:59 [V] |
| K08 | H3 „Du hast dringliche Fragen?" + Festnetz A04 · Mobil A05 · **E-Mail info@abf-fahrschule-potsdam.de** ⚠️ (A09/Z02) · „Tuchmacherstraße 45b, 14482 Potsdam" | Danke.tsx:65-94 [V] |
| K09 | Buttons: „Zurück zur Startseite" (→ `/`) · „Weitere Informationen" (→ `/anmeldung`) | Danke.tsx:99-108 [V] |
| K10 | Feuert die Google-Ads-Lead-Conversion, wenn `location.state.lead === true` — **technisch, nicht anfassen** | Danke.tsx:13-19 [V] |

---

## L. `/impressum` (Impressum.tsx) 🔒 Rechtstext

| # | Aussage | Fundstelle |
|---|---|---|
| L01 | Title „Impressum \| ABF Fahrschule Potsdam"; Canonical `https://abf-fahrschule-potsdam.lovable.app/impressum` ⚠️ (Z06) | Impressum.tsx:11,13 [V][L] |
| L02 | H1 „Impressum" · H2 „Angaben gemäß § 5 TMG" | Impressum.tsx:17,20 [V] |
| L03 | Anbieter A01 + Adresse A03 | Impressum.tsx:23-26 [V] |
| L04 | Vertreten durch: A18 | Impressum.tsx:30-31 [V] |
| L05 | Kontakt: A04 · A05 · A07 | Impressum.tsx:35-38 [V] |
| L06 | Registereintrag: A19 | Impressum.tsx:42-45 [V] |
| L07 | Steuernummer: A20 | Impressum.tsx:49-50 [V] |
| L08 | Aufsichtsbehörde A21 + Fahrerlaubnisbehörde A22 | Impressum.tsx:54-62 [V] |
| L09 | Verantwortlich nach § 55 Abs. 2 RStV: A18 + Adresse | Impressum.tsx:66-69 [V] |
| L10 | EU-Streitschlichtung mit Link `https://ec.europa.eu/consumers/odr/` | Impressum.tsx:73-76 [V] |
| L11 | Verbraucherstreitbeilegung: A23 | Impressum.tsx:80-81 [V] |

---

## M. `/datenschutz` (Datenschutz.tsx) 🔒 Rechtstext — **vollständig einfrieren**

Struktur (Datenschutz.tsx:17-162) [V]: H1 „Datenschutzerklärung" · 1. Datenschutz auf einen Blick
(Allgemeine Hinweise) · 2. Verantwortliche Stelle · 3. Datenerfassung auf dieser Website
(3.1 Kontaktformular & Online-Anmeldung, 3.2 Server-Log-Dateien) · 4. Hosting und externe Dienste
(4.1 Lovable / Supabase, 4.2 Google Fonts (lokal eingebunden)) · 5. Cookie-Banner & Einwilligung
(5.1 Cookie-Consent-Banner) · 6. Analyse- und Marketing-Tools (6.1 Google Ads Conversion-Tracking,
6.2 Google Analytics (optional)) · 7. Externe Kommunikationskanäle (7.1 WhatsApp-Kontakt) ·
8. Ihre Rechte als betroffene Person (inkl. Zuständige Aufsichtsbehörde) · 9. Speicherdauer ·
10. Datensicherheit · 11. Kontakt in Datenschutzfragen.

| # | Regel |
|---|---|
| M01 | Der komplette Fließtext der Datenschutzerklärung ist **wortwörtlich einzufrieren**. Erlaubt sind ausschließlich Layout- und Typografie-Änderungen (Abstände, Schriftgrößen, Container-Breite). Keine Umformulierung, keine Kürzung, keine Umsortierung von Abschnitten. |

---

## N. `/agb` (AGB.tsx) 🔒 Rechtstext — **vollständig einfrieren**

Struktur (AGB.tsx:15-170) [V]: H1 „Allgemeine Geschäftsbedingungen (AGB)" · § 1 Geltungsbereich ·
§ 2 Vertragsabschluss · § 3 Leistungen und Preise der Fahrschule (gemäß § 32 FahrlG) ·
§ 4 Pflichten des Kunden · § 5 Preise und Zahlungsbedingungen · § 6 Absage und Stornierung von
Fahrstunden · § 7 Widerrufsrecht bei Online-Anmeldung (Widerrufsrecht / Folgen des Widerrufs /
Vorzeitiges Erlöschen des Widerrufsrechts) · § 8 Haftung · § 9 Kündigung und Vertragsbeendigung ·
§ 10 Datenschutz · § 11 Online-Streitbeilegung · § 12 Schlussbestimmungen.

| # | Regel |
|---|---|
| N01 | Der komplette Fließtext der AGB ist **wortwörtlich einzufrieren**, insbesondere die Preisangaben in § 3 und § 5 sowie die Widerrufsbelehrung in § 7. Nur Layout und Typografie dürfen angepasst werden. |
| N02 | ⚠️ Die Preisangaben in AGB § 3 sind vor Phase 5 gegen F07–F16 abzugleichen (siehe Z09) — **Abgleich nur berichten, nicht ändern.** |

---

## O. `/404` (NotFound.tsx)

| # | Aussage | Fundstelle |
|---|---|---|
| O01 | H1 „404" · „Oops! Page not found" · Link „Return to Home" → `/` ⚠️ (**englisch**, siehe Z12) | NotFound.tsx:17-21 [V] |

---

## P. Nicht-öffentliche Routen (kein Redesign-Umfang)

| # | Route | Datei | Anmerkung |
|---|---|---|---|
| P01 | `/auth` | Auth.tsx | Login-Seite, nicht Teil des Kunden-Funnels |
| P02 | `/admin` | Admin.tsx | Interner Bereich, nicht Teil des Kunden-Funnels |

---

## Q. Formulare und ihre Funktion (technisch — nicht anfassen, nur schützen)

| # | Formular | Datei | Ziel |
|---|---|---|---|
| Q01 | LeadForm (`/anmeldung`, `/b196`, `/anmeldungmotorrad`) — Felder: Name, Telefonnummer, Führerscheinklasse, Startwunsch (optional), Consent-Checkbox, Honeypot | lp/LeadForm.tsx:128-281 | POST an `…/functions/v1/submit-lead`, danach `navigate('/danke', { state: { lead: true } })` [V] |
| Q02 | Kontaktformular Startseite — Felder: Name, Telefon, E-Mail (optional), Führerscheinklasse, Consent, Honeypot | ContactSection.tsx:146-219 | POST an dieselbe Edge Function, `source: 'homepage'`, danach `/danke` [V] |
| Q03 | Bewerbungsformular `/karriere` | Karriere.tsx:183-220 | `supabase.functions.invoke('submit-bewerbung')`, danach `/karriere/danke` [V] |
| Q04 | Attribution (gclid/utm/landing_page) wird bei jedem Submit mitgeschickt | tracking.ts via `getAttribution()` — LeadForm.tsx:91, ContactSection.tsx:74, Karriere.tsx:205 [V] |
| Q05 | Formular-Vertrauenstexte: „Kostenlos & unverbindlich · Antwort in 24 h" (LeadForm.tsx:125) · „Kostenlos & unverbindlich. Keine Vorkasse." (LeadForm.tsx:260) · Consent-Text „Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden." (LeadForm.tsx:229) | | [V] |
| Q06 | Startwunsch-Optionen: **Sofort** · **In 1–2 Monaten** · **Weiß noch nicht** | LeadForm.tsx:21 [V] |

---

## Z. ⚠️ Widersprüche und offene Punkte im Ist-Zustand — **Entscheidung von Jakob nötig**

Diese Punkte sind **nicht** Teil des Design-Auftrags. Sie aufzulösen wäre eine **Inhaltsänderung**
(Regel 1.1) und passiert nur nach ausdrücklicher Freigabe.

### ✅ Von Jakob entschieden am 09.08.2026 — autorisierte Ausnahme zu Regel 1.1

Diese drei Festlegungen sind ab sofort die **verbindliche Wahrheit**. Abweichende Stellen im Code
sind **falsch** und werden korrigiert. Das ist die einzige erlaubte Inhaltsänderung im gesamten
Auftrag; jede weitere braucht eine neue Freigabe.

| Nr. | Verbindlicher Wert | Falsche Stellen, die korrigiert werden |
|---|---|---|
| **ENT-1** | **PKW Klasse B Grundbetrag = 199 € (Herbst-Angebot)** | `Preise.tsx:77-78` („statt 479 €" / „279 €") → muss 199 € werden. Korrekt sind bereits: Landing.tsx:115, OffersSection.tsx:42, FAQSection.tsx:13, ContactSection.tsx:97-98 |
| **ENT-2** | **Motorrad Klasse A / A1 / A2 Grundbetrag = 399 € (Herbst-Angebot)** | `Preise.tsx:124-125` („statt 650 €" / „550 €") und `FAQSection.tsx:33` („ab 599 €") → beide müssen 399 € werden. Korrekt sind bereits: AnmeldungMotorrad.tsx:198, OffersSection.tsx:95, ContactSection.tsx:99-101 |
| **ENT-3** | **B196 = 750 € Festpreis** | Keine Abweichung gefunden — B196.tsx:227 und OffersSection.tsx:125 stimmen bereits überein |
| **ENT-4** | **Einzige gültige E-Mail-Adresse: `kontakt@abf-fahrschule.de`** | `potsdam@fahrschuleabf.de` an 8 Stellen (OffersSection.tsx:159-160, QuickContact.tsx:25-26, ContactSection.tsx:275-276, SuccessfulStudentsSection.tsx:99, JobSection.tsx:64, Karriere.tsx ~560/~619, KarriereDanke.tsx:75) und `info@abf-fahrschule-potsdam.de` an 1 Stelle (Danke.tsx:87-88) → alle ersetzen. Korrekt sind bereits: Impressum.tsx:38, Kontakt.tsx:35/133/143, Footer.tsx:98-99 |

**AGB-Abgleich durchgeführt (Z13 aufgelöst → neuer Befund Z14):**
Der Grundbetrag in den AGB stimmt mit ENT-1 überein („Grundbetrag (199 € Herbst-Angebot)",
AGB.tsx:33 und AGB.tsx:86). **Aber die Fahrstundenpreise in AGB § 3 weichen von allen anderen
Seiten ab** — siehe Z14. Da es sich um Rechtstext handelt (🔒 N01), ändere ich dort **nichts** ohne
separate Freigabe.

**Ebenfalls entschieden:** `/karriere` und `/karriere/danke` werden **nachrangig** behandelt (eigener
Funnel für Bewerber, nicht Teil des Lead-Funnels). Sie kommen erst nach den Kunden-Seiten dran.

| # | Widerspruch | Belege |
|---|---|---|
| Z01 | Adresse in **drei Schreibweisen**: „Weberpark" / „Weber Park" / „WEBERPARK"; Hausnummer „45b" vs. „45 B" | constants.ts:6 vs. Kontakt.tsx:71-72 vs. Footer.tsx:76-77 [V] |
| Z02 | **Drei verschiedene E-Mail-Adressen**: `kontakt@abf-fahrschule.de` (Impressum, Kontakt, Footer) · `potsdam@fahrschuleabf.de` (Startseite, Karriere) · `info@abf-fahrschule-potsdam.de` (nur `/danke`) | A07/A08/A09 [V] |
| Z03 | **Öffnungszeiten widersprüchlich**: sichtbar überall „Mo–Fr 12:00–18:00"; Preise-Schema sagt **09:00–18:00**; Kontakt sagt „Sa+So geschlossen", ContactSection sagt „Wochenende: nach Absprache" | Preise.tsx:39-40 vs. Kontakt.tsx:98-99 vs. ContactSection.tsx:287 [V] |
| Z04 | Footer-Copyright sagt **© 2025**, aktuelles Jahr ist 2026 | Footer.tsx:114 [V] |
| Z05 | **Drei verschiedene Geokoordinaten** im strukturierten Datensatz | A26 [V] |
| Z06 | **Canonical-Chaos**: Jede Seite liefert **zwei** canonical-Tags (statisches aus `index.html` = `https://abf-fahrschule.de/` **plus** das per Helmet gesetzte). Zusätzlich zeigen `/` und `/impressum` auf die **Lovable-Staging-Domain** `abf-fahrschule-potsdam.lovable.app`, und `/preise`, `/kontakt`, `/theorie` auf die **www-Variante**, obwohl die Seite ohne `www` läuft. | Live-Messung aller 10 Routen [L]; index.html · Index.tsx:25 · Impressum.tsx:13 · Preise.tsx:14 · Kontakt.tsx:14 · Theorie.tsx:14 [V] — **LpSeo.tsx darf laut Regel 1.4 nicht angefasst werden**, eine Lösung müsste also woanders ansetzen |
| Z07 | Interne Links auf **`/Anmeldung` mit großem A** (Route heißt `/anmeldung`). Live geprüft: die Seite lädt korrekt, **kein 404** — React Router matcht standardmäßig ohne Groß-/Kleinschreibung. Folge ist aber eine **zweite URL-Variante** derselben Seite (SEO-Dubletten, und `landing_page` in der Lead-Attribution wird als „/Anmeldung" gespeichert). | OffersSection.tsx:72 · Footer.tsx:51 · Preise.tsx:224 · Kontakt.tsx:169 · Theorie.tsx:76,232 [V]; Live-Test `/Anmeldung` → H1 „Dein Führerschein in Potsdam…", `is404: false` [L] |
| Z08 | **Motorradpreis dreifach unterschiedlich**: `/anmeldungmotorrad` + Startseite sagen **399 €** (Herbst-Angebot), `/preise` sagt **550 € (statt 650 €)**, Startseiten-FAQ sagt **„ab 599 €"** | AnmeldungMotorrad.tsx:198 · OffersSection.tsx:95 vs. Preise.tsx:125 vs. FAQSection.tsx:33 [V] |
| Z09 | **PKW-Grundbetrag widersprüchlich**: `/anmeldung`, Startseite und Startseiten-FAQ sagen **199 €**; `/preise` sagt im Fließtext **279 € (statt 479 €)** — und die Meta-Description derselben Seite `/preise` sagt wiederum **199 €** | Landing.tsx:115 · OffersSection.tsx:42 · FAQSection.tsx:13 vs. Preise.tsx:78 vs. Preise.tsx:12 [V] |
| Z10 | **Leere Layout-Blöcke** im ausgelieferten Code: „Anfahrt"-Grid auf `/kontakt` und „Kurszeiten"-Block auf `/theorie` sind leer | Kontakt.tsx:154-159 · Theorie.tsx:148-149 [V] |
| Z11 | **„Vorstellung zur theoretischen Prüfung"**: `/anmeldung` und `/preise` sagen „im Grundbetrag enthalten", `/theorie` sagt zweimal „erfolgt **zusätzlich**" | Landing.tsx:139 · Preise.tsx:86,176 vs. Theorie.tsx:72,140 [V] |
| Z12 | 404-Seite ist **auf Englisch** („Oops! Page not found", „Return to Home") und hat weder Header noch Footer | NotFound.tsx:14-23 [V] |
| Z13 | ~~AGB-Preise noch nicht abgeglichen~~ → **erledigt 09.08.2026**, Ergebnis in Z14 | AGB.tsx:32-97 [V] |
| **Z14** | 🚨 **Die AGB nennen andere Fahrstundenpreise als der Rest der Website.** AGB § 3: Übungsfahrt **69 €**, Sonderfahrt Überland/Autobahn/Nachtfahrt je **79 €**. Überall sonst: Übungsstunde **67,50 €**, Besondere Ausbildungsfahrten **75 €**. Da § 3 ausdrücklich „gemäß § 32 FahrlG" überschrieben ist, ist das eine **rechtlich relevante Abweichung**, kein Designproblem. **Nicht von mir zu entscheiden.** | AGB.tsx:43-46 vs. Preise.tsx:97-106, Landing.tsx:143-147, OffersSection.tsx:44 [V] |
| **Z15** | In AGB § 3 steht der Punkt **„ADAC 1 Jahr kostenlos" doppelt** untereinander | AGB.tsx:36-37 [V] |

---

## Prüfprotokoll (wird ab Phase 5 fortgeschrieben)

| Runde | Datum | Geprüfte Einträge | Fehlend | Wiederhergestellt |
|---|---|---|---|---|
| — | — | Basis erstellt, noch keine Änderung erfolgt | — | — |
