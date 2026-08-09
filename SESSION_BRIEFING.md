# SESSION_BRIEFING.md — Stand & Fortsetzung des Website-Redesigns

**Zuletzt aktualisiert:** 09.08.2026 · **Branch:** `design/unification` · **Basis:** `origin/main` @ `c0040f5`

Diese Datei ist der Einstiegspunkt für jede neue Session. Lies sie zuerst, dann
`CONTENT_INVENTORY.md`. Danach kannst du ohne Rückfragen weiterarbeiten.

---

## 1. Auftrag in einem Satz

Die **gesamte** Website `abf-fahrschule.de` auf ein einheitliches, professionelles,
branchengerechtes Design bringen — Schwerpunkt Smartphone (über 75 % des Traffics) —
**ohne die Inhalte zu verändern**. Sprachliche Verbesserung ist erlaubt, inhaltliche nicht.
Geschäftsziel der Seite: Lead-Generierung (Formular → `/danke`).

Gearbeitet wird in Phasen mit Stopp nach jeder Phase, gegen eine feste Bewertungsmatrix
(A Design-Konsistenz, B Hierarchie, C Mobile, D Copy, E Konversion, F Barrierefreiheit,
G Code-Hygiene, H Seitenübergreifende Einheitlichkeit; Ziel: Ø ≥ 4,5, kein Kriterium < 4,0).
Jede Selbstbewertung braucht einen Abschnitt **„Gegenrede"**, sonst ist sie ungültig.

---

## 2. Wo wir stehen

| Phase | Status |
|---|---|
| **Phase 1 — Inhalts-Inventar** | ✅ **fertig**, Commit `b59a633` → `CONTENT_INVENTORY.md` |
| Nachtrag: AGB-Preiskorrektur | ✅ **fertig**, Commit `5d913b4` |
| **Phase 2 — Inventur & Erstbewertung** | ⏭️ **als Nächstes** → `DESIGN_AUDIT.md` |
| Phase 3 — Design-System (`DESIGN.md`) | offen |
| Phase 4 — Umsetzungsplan | offen |
| Phase 5 — Umsetzungsrunden (wiederholt) | offen |
| Phase 6 — Abschluss | offen |

**Am Code wurde bisher genau eine Zeile-Gruppe geändert:** die Fahrstundenpreise in
`src/pages/AGB.tsx:43-46`. Sonst nichts. Kein Design, kein Layout, keine Komponente.

---

## 3. Harte Grenzen (Verletzung = abbrechen und fragen)

- **Inhalte eingefroren.** Keine Aussage hinzufügen, entfernen oder in ihrer Bedeutung ändern.
  Nach jeder Änderung muss jede Tatsachenaussage exakt dieselbe Tatsache aussagen.
- **Preise/Zahlen exakt wie im Code.** Nicht runden, kein „ab" aus einem Festpreis machen.
- **Rezensionen wortwörtlich**, inklusive Tipp- und Grammatikfehler und Namen.
- **Nicht anfassen:** `gtag.js` / `AW-17551238202` / `G-10161VSRHB`; Formularfelder, Validierung,
  Supabase-Anbindung, gclid/utm-Erfassung, Weiterleitung auf `/danke`;
  `src/components/lp/LpSeo.tsx` samt Titeln/Descriptions/Canonicals;
  `vite.config.ts`, package.json-Scripts, Build-/Deploy-Konfiguration.
  Kein Prerendering, kein SSR — bewusst außerhalb des Auftrags.
- **Keine neuen Abhängigkeiten** ohne Jakobs Freigabe.
- **Nie auf `main` committen**, kein force-push, **kein PR ohne Rückfrage**.
- **„Publish" in Lovable macht ausschließlich Jakob.**

### Arbeitsgrundsätze
Jede Aussage über den Ist-Zustand braucht einen Beleg: `Datei:Zeile` oder Screenshot.
Kennzeichnung durchgehend: `[VERIFIZIERT]` / `[UNKLAR]` / `[EMPFEHLUNG]`.
Keine erfundenen Metriken, Prozentwerte, Benchmarks oder Prognosen.

---

## 4. Werkzeuge

### Playwright MCP — eingerichtet, nutzen!
Eingetragen in `~/.claude.json` unter `mcpServers.playwright`:
```
cmd /c npx -y @playwright/mcp@latest --browser chrome --headless
    --output-dir <scratchpad>/playwright-out
```
Getestet per JSON-RPC-Handshake: `Playwright 1.63.0-alpha`, **24 Tools**
(`browser_navigate`, `browser_take_screenshot`, `browser_snapshot`, `browser_resize`,
`browser_evaluate`, `browser_console_messages`, `browser_network_requests`, …).
Nutzt das installierte Chrome unter `C:\Program Files\Google\Chrome\Application\chrome.exe`,
kein zusätzlicher Chromium-Download.
Backup der vorherigen Config: `C:\Users\Jakob\.claude.json.bak-20260809`.

**Damit werden alle visuellen Prüfungen selbst gemacht** — Jakob muss keine Screenshots liefern.
Breiten: **390 px** (Mobil, Priorität), **768 px** (Tablet), **1440 px** (Desktop).

### Git
```
Repo:   C:\Users\Jakob\abf-fahrschule-potsdam
Remote: https://github.com/jakobkrenzlin-cloud/abf-fahrschule-potsdam.git
Branch: design/unification
```
Vor jeder Änderung `git fetch origin` + `git status`. Nach jedem `reset`/`pull`: **`npm install`**
(neue Commits können Dependencies mitbringen — das ist hier schon einmal passiert,
`react-helmet-async`).
Selbstprüfung vor jedem Push: `npx tsc --noEmit` **und** `npm run build` müssen grün sein.

**Offener Punkt im Arbeitsverzeichnis:** `package-lock.json` ist modifiziert (Rest des
`npm install` nach dem Repo-Sync). Nicht committet. Mit Jakob klären.

### Live-Test-Fallstrick
Bei Formular-/Tracking-Tests **immer isolierte Browser-Kontexte** verwenden. Mehrere Seiten im
selben Kontext verfälschen die `localStorage`-Attribution (`landing_page` etc.) und erzeugen
Phantom-Bugs — genau das ist am 09.08. passiert.

---

## 5. Die Website: 15 Routen

Aus `src/App.tsx:63-79`.

| Route | Datei | Rolle | Priorität |
|---|---|---|---|
| `/` | `pages/Index.tsx` | Startseite (12 Sections) | hoch |
| `/anmeldung` | `pages/Landing.tsx` | **PKW Klasse B — Haupt-Ads-Landingpage** | **höchste** |
| `/anmeldungmotorrad` | `pages/AnmeldungMotorrad.tsx` | Motorrad A1/A2/A | hoch |
| `/b196` | `pages/B196.tsx` | B196-Erweiterung | hoch |
| `/danke` | `pages/Danke.tsx` | Dankesseite nach Lead (feuert Conversion) | hoch |
| `/preise` | `pages/Preise.tsx` | Preisliste § 32 FahrlG | mittel |
| `/kontakt` | `pages/Kontakt.tsx` | Standort & Kontakt | mittel |
| `/theorie` | `pages/Theorie.tsx` | Theorieunterricht | mittel |
| `/impressum` | `pages/Impressum.tsx` | Rechtstext 🔒 | niedrig (nur Layout) |
| `/datenschutz` | `pages/Datenschutz.tsx` | Rechtstext 🔒 | niedrig (nur Layout) |
| `/agb` | `pages/AGB.tsx` | Rechtstext 🔒 | niedrig (nur Layout) |
| `/karriere` | `pages/Karriere.tsx` | Bewerber-Funnel, 645 Zeilen | **nachrangig** (Jakobs Entscheidung) |
| `/karriere/danke` | `pages/KarriereDanke.tsx` | Bewerber-Danke | **nachrangig** |
| `*` | `pages/NotFound.tsx` | 404, aktuell englisch | mittel |
| `/auth`, `/admin` | `pages/Auth.tsx`, `pages/Admin.tsx` | intern | **außerhalb des Auftrags** |

### Zwei getrennte Design-Welten (der Kern des Problems)
- **Landingpage-Welt** (`/anmeldung`, `/b196`, `/anmeldungmotorrad`): moderne Komponenten unter
  `src/components/lp/*`, dunkles Hero (`#1C1C1C`), Marken-Blau `#1A9CFF`, eigener `LpHeader`,
  **kein Footer**, sticky Mobile-CTA. Sauber gebaut.
- **Rest-Welt** (`/`, `/preise`, `/kontakt`, `/theorie`, `/danke`, Rechtsseiten): alter
  `Header`/`Footer`, Tailwind-Standardfarben (`blue-600`, `gray-900`) oder shadcn-Tokens
  (`primary`, `foreground`), heller Look, andere Typografie, andere Buttons.

Das ist der Hauptgrund, warum sich die Seite nicht wie **eine** Website anfühlt.

---

## 6. Verbindliche Inhalts-Entscheidungen von Jakob (ENT-1 … ENT-5)

Das ist die **einzige** erlaubte Ausnahme vom Inhalts-Einfrieren. Alles Weitere braucht neue Freigabe.

| Nr. | Verbindlich | Noch zu korrigieren |
|---|---|---|
| **ENT-1** | PKW Klasse B Grundbetrag **199 €** (Herbst-Angebot) | `Preise.tsx:77-78` sagt „279 € statt 479 €" ❌ |
| **ENT-2** | Motorrad A/A1/A2 Grundbetrag **399 €** (Herbst-Angebot) | `Preise.tsx:124-125` sagt „550 € statt 650 €" ❌ · `FAQSection.tsx:33` sagt „ab 599 €" ❌ |
| **ENT-3** | B196 **750 €** Festpreis | keine Abweichung ✅ |
| **ENT-4** | Einzige E-Mail: **kontakt@abf-fahrschule.de** | 8× `potsdam@fahrschuleabf.de` ❌ · 1× `info@abf-fahrschule-potsdam.de` (Danke.tsx:87-88) ❌ |
| **ENT-5** | Fahrstunden **67,50 €** / Sonderfahrten **75 €** | ✅ erledigt in `AGB.tsx:43-46` (Commit `5d913b4`) |

---

## 7. Offene Widersprüche — noch **ohne** Entscheidung

Nicht eigenmächtig auflösen. Vollständig mit Belegen in `CONTENT_INVENTORY.md`, Abschnitt Z.

| Nr. | Kurz | Fundstelle |
|---|---|---|
| Z01 | Adresse in drei Schreibweisen: „Weberpark" / „Weber Park" / „WEBERPARK"; „45b" vs. „45 B" | constants.ts:6, Kontakt.tsx:71-72, Footer.tsx:76-77 |
| Z03 | Öffnungszeiten: sichtbar Mo–Fr 12–18 Uhr, aber Preise-Schema sagt **09:00–18:00**; „Sa+So geschlossen" vs. „Wochenende: nach Absprache" | Preise.tsx:39-40, Kontakt.tsx:98-99, ContactSection.tsx:287 |
| Z04 | Footer sagt **© 2025**, aktuelles Jahr ist 2026 | Footer.tsx:114 |
| Z05 | Drei verschiedene Geokoordinaten im strukturierten Datensatz | LpSeo.tsx:33, Preise.tsx:31-32, Kontakt.tsx:31-32 |
| **Z06** | **Jede Seite liefert zwei canonical-Tags** (statisch aus `index.html` + Helmet). `/` und `/impressum` zeigen auf die Lovable-Staging-Domain, `/preise`/`/kontakt`/`/theorie` auf die www-Variante. **`LpSeo.tsx` darf nicht angefasst werden** → Lösung müsste woanders ansetzen | live gemessen über alle 10 Routen |
| Z07 | Interne Links auf **`/Anmeldung`** (großes A). Live geprüft: **kein 404**, React Router matcht case-insensitiv — erzeugt aber eine zweite URL-Variante (SEO-Dubletten, `landing_page` = „/Anmeldung") | OffersSection.tsx:72, Footer.tsx:51, Preise.tsx:224, Kontakt.tsx:169, Theorie.tsx:76+232 |
| Z10 | Leere Layout-Blöcke im ausgelieferten Code: „Anfahrt" auf `/kontakt`, „Kurszeiten" auf `/theorie` | Kontakt.tsx:154-159, Theorie.tsx:148-149 |
| Z11 | „Vorstellung zur theoretischen Prüfung": „im Grundbetrag enthalten" vs. „erfolgt **zusätzlich**" | Landing.tsx:139 + Preise.tsx:86/176 gegen Theorie.tsx:72/140 |
| Z12 | 404-Seite ist **englisch** („Oops! Page not found") und hat weder Header noch Footer | NotFound.tsx:14-23 |
| Z15 | In AGB § 3 steht „ADAC 1 Jahr kostenlos" **doppelt** untereinander — reine Dublette, aber Rechtstext | AGB.tsx:36-37 |

---

## 8. Technische Befunde aus Phase 1 (belegt)

- **12 Komponentendateien werden von nichts importiert:** das komplette Verzeichnis
  `src/components/motorrad/` (8 Dateien: B196Offer, MotorradAdvantages, MotorradContactForm,
  MotorradFlyerSection, MotorradHero, MotorradOffer, MotorradProcess, MotorradTestimonials)
  plus `ConversionFAQ.tsx`, `OfferBox.tsx`, `ProcessSteps.tsx`, `CountdownTimer.tsx`.
  → Kriterium G (Code-Hygiene).
- **Zwei konkurrierende Helmet-Bibliotheken in einer App:** `react-helmet` (Index, Preise, Kontakt,
  Theorie, Danke, Impressum, Karriere) und `react-helmet-async` (nur `lp/LpSeo.tsx`).
  Vermutlich die Ursache der doppelten canonical-Tags (Z06) — **noch nicht bewiesen**.
- **Kein Prerendering/SSR.** Roher Server-HTML liefert `<div id="root"></div>` und die statischen
  Meta-Tags aus `index.html`. Ein Crawler ohne JS sieht auf `/anmeldung` den Startseiten-Titel.
  Ausdrücklich **außerhalb des Auftrags**, nur zur Einordnung.
- **Genau eine `<h1>` pro Seite** auf allen 10 geprüften Routen ✅.
- **Layoutbreite > Viewport bei 390 px** auf `/` (417 px) und `/impressum` (465 px)
  → Verdacht auf horizontales Scrollen, **Ursache in Phase 2 zu finden**.
- Startseite und `/preise`/`/kontakt`/`/theorie` siezen teilweise („Bei uns wissen **Sie** genau"),
  die Landingpages duzen durchgehend → Kriterium D.

---

## 9. Nächster Schritt: Phase 2

Erstelle `DESIGN_AUDIT.md` mit:
1. Vollständige Routenliste (aus Abschnitt 5 übernehmen, gegen `src/App.tsx` gegenprüfen)
2. Pro Seite: alle Sections in ihrer Reihenfolge
3. **Kriterium A messbar machen:** tatsächlich verwendete unterschiedliche Werte zählen für
   Farben, Schriftgrößen, Schriftgewichte, Abstände, Eckenradien, Schatten, Button-Varianten,
   Karten-Varianten, Icon-Größen — mit Zahlen und Fundstellen
4. Befunde zu B–H, je mit Fundstelle und Schwere (hoch/mittel/niedrig)
5. **Vorab definieren, was „5" pro Kriterium in diesem Projekt konkret bedeutet** — die Skala muss
   über alle Runden gleich bleiben
6. Erstbewertung nach der Matrix **inklusive Gegenrede** (mindestens drei Punkte, an denen die
   eigene Punktzahl zu großzügig sein könnte)
7. Screenshots per Playwright MCP selbst erstellen: 13 Seiten × 390/768/1440 px

Danach **STOPP** und auf Jakobs Freigabe warten.

**Markenfarben für Phase 3 (nicht verändern):**
`#1A9CFF` Primär/Akzent · `#13243A` Dunkel · `#1C1C1C` Fast-Schwarz · `#FFFFFF` Weiß ·
`#F4F7FA` Hellgrau. Fehlende Zustandsfarben passend ergänzen.
