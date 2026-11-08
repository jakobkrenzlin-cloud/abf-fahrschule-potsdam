# DESIGN_AUDIT.md — Phase 2: Inventur & Erstbewertung

**Erstellt:** 09.08.2026 · **Branch:** `design/unification` · **Code-Stand:** `ba383ba`
**Grundlage:** `SESSION_BRIEFING.md` Abschnitt 9 · `CONTENT_INVENTORY.md`
**Messgrundlage:** lokaler Dev-Server `http://localhost:5199` (Vite 5.4.10), Chrome headless,
Breiten **390 / 768 / 1440 px**, 14 Routen = **84 Screenshots**

**Belegqualität:** `[V]` im Code verifiziert (Datei:Zeile) · `[M]` im Browser gemessen ·
`[S]` per Screenshot gesehen · `[UNKLAR]` nicht abschließend geklärt · `[EMPFEHLUNG]` Vorschlag

> **Am Code wurde in dieser Phase nichts geändert.** Dieses Dokument ist reine Bestandsaufnahme.

---

## 0. Vorbemerkung: Abweichung beim Werkzeug — bitte lesen

Der Playwright-MCP war in dieser Session **nicht benutzbar**. Ursache `[V]`: In `~/.claude.json`
wurde der Pfad für `--output-dir` unescaped in JSON geschrieben. Dadurch sind `\U`, `\A`, `\T`
verschwunden und `\b` wurde zum Steuerzeichen `0x08`:

```
C:UsersJakobAppDataLocalTempclaudeC--Users-Jakob<0x08>c5e9de3-…scratchpadplaywright-out
```

Windows kann ein Verzeichnis mit Zeichen `0x08` im Namen nicht anlegen, deshalb scheiterte bereits
`browser_navigate` mit `ENOENT` — nicht erst das Screenshot-Schreiben. `[M]`

**Was ich getan habe:**
1. `~/.claude.json` repariert auf `C:/Users/Jakob/.playwright-mcp-out` (sessionsunabhängig, damit der
   Fehler nicht wiederkehrt). Backup: `~/.claude.json.bak-phase2-20260809-182545`.
   **Wirksam erst nach einem Neustart von Claude Code** — der laufende MCP-Prozess liest das
   Argument beim Start.
2. Für diese Session habe ich **dieselbe Playwright-Engine direkt angesteuert**
   (`playwright-core` aus dem npx-Cache des MCP, `channel: 'chrome'`, headless).

**Warum ich nicht gestoppt habe:** `SESSION_BRIEFING.md:78` begründet die Werkzeugvorgabe damit,
dass „alle visuellen Prüfungen selbst gemacht werden — Jakob muss keine Screenshots liefern".
Genau das ist erfüllt; Engine, Browser und Messwerte sind identisch, nur der Transportweg ist ein
anderer. **Jakob entscheidet**, ob Phase 2 mit dem MCP-Transport wiederholt werden soll — die
Skripte liegen bereit und laufen in ~4 Minuten durch.

---

## 1. Routenliste — gegen `src/App.tsx` gegengeprüft

Alle 16 `<Route>`-Einträge aus `App.tsx:63-79` `[V]`. Abgleich mit `SESSION_BRIEFING.md` Abschnitt 5:
**vollständig deckungsgleich, keine Abweichung gefunden.**

| # | Route | Datei | App.tsx | Kopf | Fuß | `<section>` | Welt | Umfang |
|---|---|---|---|---|---|---|---|---|
| 1 | `/` | `Index.tsx` | :63 | `Header` | ✅ | 10 | Rest | hoch |
| 2 | `/anmeldung` | `Landing.tsx` | :64 | `LpHeader` | ❌ | 8 | LP | **höchste** |
| 3 | `/b196` | `B196.tsx` | :65 | `LpHeader` | ❌ | 9 | LP | hoch |
| 4 | `/anmeldungmotorrad` | `AnmeldungMotorrad.tsx` | :66 | `LpHeader` | ❌ | 9 | LP | hoch |
| 5 | `/auth` | `Auth.tsx` | :67 | — | — | — | — | **außerhalb** |
| 6 | `/admin` | `Admin.tsx` | :68 | — | — | — | — | **außerhalb** |
| 7 | `/impressum` | `Impressum.tsx` | :69 | `Header` | ✅ | **0** | Rest | niedrig |
| 8 | `/datenschutz` | `Datenschutz.tsx` | :70 | `Header` | ✅ | **0** | Rest | niedrig |
| 9 | `/agb` | `AGB.tsx` | :71 | `Header` | ✅ | **0** | Rest | niedrig |
| 10 | `/danke` | `Danke.tsx` | :72 | `Header` | ✅ | **0** | Rest | hoch |
| 11 | `/preise` | `Preise.tsx` | :73 | `Header` | ✅ | **0** | Rest | mittel |
| 12 | `/kontakt` | `Kontakt.tsx` | :74 | `Header` | ✅ | **0** | Rest | mittel |
| 13 | `/theorie` | `Theorie.tsx` | :75 | `Header` | ✅ | **0** | Rest | mittel |
| 14 | `/karriere` | `Karriere.tsx` | :76 | `Header` | ✅ | 6 | eigene | nachrangig |
| 15 | `/karriere/danke` | `KarriereDanke.tsx` | :77 | `Header` | ✅ | **0** | eigene | nachrangig |
| 16 | `*` (404) | `NotFound.tsx` | :79 | **❌** | **❌** | 0 | keine | mittel |

Kopf/Fuß/`<section>` sind **gemessen im gerenderten DOM** `[M]`, nicht aus dem Code geschlossen.

**Befund R-1 (hoch):** Acht Seiten der Rest-Welt benutzen **kein einziges `<section>`-Element** —
`/preise`, `/kontakt`, `/theorie`, `/danke`, `/impressum`, `/datenschutz`, `/agb`, `/karriere/danke`.
Die Landingpages und `/karriere` gliedern sauber. `[M]`

**Befund R-2 (mittel):** `/karriere` ist eine **dritte** Design-Welt, nicht Teil der im Briefing
beschriebenen Zweiteilung: `Header` der Rest-Welt + Farbwelt der Landingpages (`#1C1C1C`, `#1A9CFF`)
+ eigenes `#0D1B2A` auf `/karriere/danke`. `[V]` `Karriere.tsx:336` · `KarriereDanke.tsx:22`

---

## 2. Sections pro Seite in ihrer Reihenfolge

Gemessen im gerenderten DOM bei 1440 px `[M]`; `py` = tatsächlich berechneter Innenabstand.

### 2.1 `/` — Startseite (10 `<section>`)

| # | Überschrift | py oben/unten | Hintergrund |
|---|---|---|---|
| 1 | Fahrschule Potsdam – Sicher fahren lernen | 64/0 | transparent |
| 2 | Unsere Angebote in Potsdam | 96/96 | transparent |
| 3 | *(ohne Überschrift — QuickContact)* | 32/32 | `rgb(37,99,235)` = blue-600 |
| 4 | Warum ABF Fahrschule Potsdam wählen? | 96/96 | weiß |
| 5 | Dein Führerschein in Potsdam in nur drei Schritten | 96/96 | transparent |
| 6 | Über ABF Fahrschule Potsdam | 96/96 | weiß |
| 7 | Werde Teil unseres Teams! | 96/96 | `rgb(37,99,235)` = blue-600 |
| 8 | Unsere erfolgreichen Fahrschüler | 96/96 | transparent |
| 9 | Häufige Fragen zur Fahrschule Potsdam | 96/96 | weiß |
| 10 | Jetzt Kontakt aufnehmen | 96/96 | transparent |

Reihenfolge deckt sich mit `Index.tsx:27-40` `[V]`. Kopf-, Fuß- und Sticky-Leiste liegen außerhalb
der `<section>`-Zählung.

### 2.2 `/anmeldung` — Haupt-Ads-Landingpage (8 `<section>`)

| # | Überschrift | py | Hintergrund |
|---|---|---|---|
| 1 | Dein Führerschein in Potsdam – Herbst-Angebot für 199 € | 64/64 | `#1C1C1C` |
| 2 | 199 € Herbst-Angebot – das ist drin | 64/64 | `#F4F7FA` |
| 3 | Das sagen unsere Fahrschüler | 64/64 | weiß |
| 4 | So läuft's ab | 64/64 | `#F4F7FA` |
| 5 | Warum ABF | 64/64 | `#13243A` |
| 6 | Häufige Fragen | 64/64 | weiß |
| 7 | So findest du uns | 64/64 | weiß |
| 8 | Herbst-Angebot: 199 € – nur noch bis 31. Oktober | 80/80 | `#13243A` |

Davor: `LpHeader` + `UrgencyBar`; danach: `StickyMobileCta`. Kein Footer. `[V]` `Landing.tsx:109-170`

### 2.3 `/anmeldungmotorrad` (9 `<section>`)
Wie 2.2, zusätzlich an Position 2 **„Welche Klasse passt zu dir?"** (weiß, 64/64). Schlusssektion
„Herbst-Angebot: 399 € – nur noch bis 31. Oktober". `[M]`

### 2.4 `/b196` (9 `<section>`)
Wie 2.2, zusätzlich an Position 2 **„Erfüllst du die Voraussetzungen?"** (`#F4F7FA`, 64/64).
**Keine `UrgencyBar`** — bestätigt `CONTENT_INVENTORY.md` Abschnitt D. `[M]`

### 2.5 `/karriere` (6 `<section>`)
Hero (0/0) · Warum ABF? (96/96, `#1C1C1C`) · Offene Stellen (96/96) · So läuft's ab (96/96,
`#1C1C1C`) · Jetzt bewerben (96/96) · Standort (80/80, `#1C1C1C`). `[M]`

### 2.6 Seiten ohne `<section>`

`/preise`, `/kontakt`, `/theorie`, `/danke`, `/impressum`, `/datenschutz`, `/agb`, `/karriere/danke`
gliedern ausschließlich über `<div>`. Inhaltliche Abfolge steht in `CONTENT_INVENTORY.md`
Abschnitte F–N. **Für Phase 3 ist hier eine Sektions-Semantik neu zu definieren.**

**Befund S-1 (niedrig, aber sichtbar):** Zwei leere Layout-Blöcke sind weiterhin im Code —
„Anfahrt" (`Kontakt.tsx:154-159`, ein `grid md:grid-cols-2 gap-6` ohne Kinder) und „Kurszeiten"
(`Theorie.tsx:147-149`, nur ein Kommentar). Entspricht Z10. `[V]`

---

## 3. Kriterium A messbar gemacht

Erhoben über **54 Dateien** im Umfang (`src/pages/*` ohne `Admin`/`Auth`, `src/components/*`,
`src/components/lp/*`; **ohne** `src/components/ui/*` = unveränderte shadcn-Basis, **ohne** die 12
nicht importierten Dateien). Skript: Klassen- und Hex-Extraktion Zeile für Zeile. `[V]`

### 3.1 Übersichtstabelle

| Dimension | Unterschiedliche Werte | Vorkommen | Bewertung |
|---|---|---|---|
| **Farbwerte gesamt** | **58** | 859 | ▓▓ kritisch |
| ├ Tailwind-Palette | 34 | 436 | |
| ├ rohe Hex-Werte | 16 | 191 | |
| └ shadcn-Tokens | 8 | 232 | |
| white/black + Deckkraftstufen | 28 Schreibweisen | 205 | ▓▓ |
| **Schriftgrößen** (Klassen) | **10** | 341 | ▓ |
| Schriftgrößen (live gemessen, @390) | 3–8 je Seite | — | ▓ |
| **Schriftgewichte** | **5** | 275 | ok |
| Zeilenhöhen | 4 | 31 | ok |
| **Eckenradien** | **8** | 182 | ▓ |
| **Schatten** | **7** | 42 | ▓ |
| **Vertikale Abstände `py-*`** | **17** | 113 | ▓▓ |
| Horizontale Abstände `px-*` | 8 | 128 | ▓ |
| Abstände `gap-*` | 14 | 136 | ▓▓ |
| Abstände `mb-*` | 11 | 313 | ▓ |
| **Container-Breiten `max-w-*`** | **8** | 55 | ▓▓ |
| **Icon-Größen** | **16** | 124 | ▓▓ |
| Schriftfamilien | **0 eigene** (System-Stack) | — | ▓▓ |

### 3.2 Farben — drei konkurrierende Systeme nebeneinander

Das ist der Kern von Kriterium A. Es gibt **drei nicht miteinander verbundene Farbsysteme**:

| System | Primärfarbe | Wo | Belege |
|---|---|---|---|
| **1. Marken-Blau** | `#1A9CFF` (83×) | `lp/*`, `/karriere` | `lp/FinalCta.tsx:21`, `Karriere.tsx:328` `[V]` |
| **2. Tailwind-Blau** | `blue-600` = `#2563EB` (80×) | `/`, `Header`, `Footer` | `AboutSection.tsx:38`, `OffersSection.tsx:73` `[V]` |
| **3. shadcn-Token** | `--primary: 182 81% 26%` ≈ **`#0D7478` (Petrol)** (62×) | `/preise`, `/kontakt`, `/theorie`, `/danke` | `index.css:16`, `Preise.tsx:58` `[V]` |

**Befund A-1 (hoch):** `--primary` in `index.css:16` ist **Petrol-Türkis**, nicht die Markenfarbe.
Jede Seite der Rest-Welt, die `text-primary`/`bg-primary` benutzt, zeigt damit eine Farbe, die in
der Markendefinition (`SESSION_BRIEFING.md:207-209`) **überhaupt nicht vorkommt**. `[V]` `[M]`

**Befund A-2 (hoch, per Screenshot belegt):** Auf **einem** Mobil-Bildschirm der Startseite sind
**drei unverbundene Akzentfarben** gleichzeitig sichtbar `[S]` (`fold/index-390-fold.png`):
- CTA „Kostenlose Beratung" → `blue-600` `#2563EB` (`Hero.tsx:62`)
- Sticky „Anrufen" → `bg-primary` `#0D7478` (`MobileStickyFooter.tsx:19`)
- Sticky „WhatsApp" → `green-600` `#16A34A` (`MobileStickyFooter.tsx:27`)

Die eigentliche Markenfarbe `#1A9CFF` kommt auf der Startseite **gar nicht vor**. `[V]`

**Befund A-3 (mittel):** Neun Blautöne parallel im Einsatz: `#1A9CFF`, `#0F86E0`, `#0D76C7`,
`#13243A`, `#3B5998`, `#1A2D4A`, `#4A6CB3`, `#1B3357`, `#0D1B2A` — plus die Tailwind-Stufen
`blue-50/100/200/400/500/600/700/800`. `#3B5998` (Facebook-Blau) steckt sogar im Lade-Spinner der
gesamten App: `App.tsx:35`. `[V]`

### 3.3 Typografie

**Befund A-4 (hoch):** Es ist **keine Schriftart geladen**. Gemessene `font-family` auf allen 14
Routen: `ui-sans-serif` — der Tailwind-Standard-Systemstack. `[M]`
Weder in `index.html`, noch in `src/`, noch in `tailwind.config.ts` existiert ein
`@font-face`, ein `fontFamily`-Eintrag oder ein Google-Fonts-Stylesheet. `[V]`

Gleichzeitig stehen in `index.html:145-146` **zwei `preconnect`-Verbindungen zu
`fonts.googleapis.com` und `fonts.gstatic.com`**, die ins Leere laufen — es wird nie eine Schrift
von dort geholt. `[V]`
→ Die Seite hat damit **keine typografische Handschrift**; sie sieht auf iOS (San Francisco),
Android (Roboto) und Windows (Segoe UI) unterschiedlich aus.
→ `[UNKLAR]` Für Jakob, **nicht** von mir zu entscheiden: `Datenschutz.tsx` Abschnitt 4.2 heißt
„Google Fonts (lokal eingebunden)". Beides — die toten preconnects und der Text — passt nicht zum
Ist-Zustand. Rechtstext ist eingefroren (🔒 M01), daher hier **nur gemeldet, nichts geändert.**

**Befund A-5 (mittel):** Zehn Schriftgrößen-Klassen ohne erkennbare Stufung; `text-4xl` und
`text-3xl` werden 28×/28× fast beliebig für H1 wie H2 verwendet. Die Landingpages nutzen zusätzlich
`text-5xl`/`text-6xl` und als einzige `font-extrabold` (4×) — ein Gewicht, das in der Rest-Welt
nicht existiert. `[V]`

### 3.4 Abstände, Radien, Schatten, Icons

**Befund A-6 (hoch):** 17 verschiedene `py-*`-Werte. Die beiden Welten haben unterschiedliche
Sektionsrhythmen `[M]`:
- Rest-Welt: `py-16 md:py-24` → **64 px mobil / 96 px Desktop**
- LP-Welt: `py-12 md:py-16` → **48 px mobil / 64 px Desktop**, Abschluss-CTA 80 px

Auf der Startseite kommen bei 390 px **vier** verschiedene py-Kombinationen vor (48/0, 40/40,
32/32, 64/64), auf den Landingpages **drei** (40/40, 48/48, 56/56). `[M]`

**Befund A-7 (mittel):** Acht Container-Breiten parallel: `max-w-7xl` (Rest-Welt, 10×) gegen
`max-w-6xl` (LP-Welt, 11×), dazu `max-w-2xl/3xl/4xl/5xl/xl/md`. Zwei Seiten mischen innerhalb
derselben Seite. `[V]`

**Befund A-8 (mittel):** 16 Icon-Größen von `w-2 h-2` bis `w-20 h-20`, ohne Stufensystem —
`w-4/5/6/7/8/10/11/12/14/16/20` plus die Schreibvarianten `h-4 w-4` vs. `w-4 h-4`. `[V]`

**Befund A-9 (mittel):** Acht Eckenradien (`rounded`, `-lg`, `-xl`, `-2xl`, `-full`, `-t-2xl`,
`-b-2xl`, `-b-xl`) und sieben Schattenstufen. `rounded-xl` (62×) und `rounded-2xl` (34×) werden
für dieselbe Bauteilart (Karte) gemischt. `[V]`

### 3.5 Button- und Kartenvarianten

**Befund A-10 (hoch):** Es gibt **kein Button-System**. `[V]`
- 45× die shadcn-`<Button>`-Komponente
- 37× rohes `<button className="…">` mit handgeschriebenen Farben
- `ui/button.tsx:23-27` definiert Höhen `h-10` (40 px), `h-9`, `h-11` — **alle unter 44 px**
- die LP-Welt umgeht die Komponente vollständig und schreibt `min-h-[56px]` / `h-[60px]` direkt
  (`lp/LeadForm.tsx:249`, `lp/StickyMobileCta.tsx`) `[V]`

Damit existieren mindestens **vier** Button-Ausprägungen nebeneinander: shadcn-default (40 px,
Petrol), roh-blau (`blue-600`, 40 px), LP-blau (`#1A9CFF`, 56–60 px), WhatsApp-grün (`#16A34A`).

**Befund A-11 (mittel):** Kartenvarianten: `bg-white rounded-2xl shadow-2xl p-8` (ContactSection),
`bg-white rounded-xl shadow-lg p-8` (ContactSection, dieselbe Seite), `bg-card border-border`
(Kontakt/Preise), `bg-[#F4F7FA] border-black/5` (LP-Welt). Vier Kartenrezepte für denselben Zweck. `[V]`

---

## 4. Befunde zu B–H

### B — Hierarchie

| Nr. | Befund | Beleg | Schwere |
|---|---|---|---|
| B-1 | Genau **eine `<h1>` auf allen 14 Routen** ✅ | `[M]` alle Routen | — (gut) |
| B-2 | Startseite springt **H1 → H3**: nach der H1 folgen zwei H3 (Bildunterschriften im Karussell), erst danach die erste H2 | `Hero.tsx:34` → Karussell-`<h4>`/`<h3>`; `[M]` Reihenfolge `H1,H3,H3,H2,…` | hoch |
| B-3 | `/theorie` springt ebenfalls **H1 → H3** („14 Stunden", „LernApp", „Prüfung" sind H3 vor der ersten H2) | `Theorie.tsx:57,64,71`; `[M]` | mittel |
| B-4 | Der **Footer benutzt H4** („Schnellzugriff", „Leistungen", „Kontakt"). Auf 7 Seiten erzeugt das einen Sprung **H2 → H4** | `Footer.tsx`; `[M]` `/preise`, `/kontakt`, `/datenschutz`, `/agb`, `/karriere` u. a. | mittel |
| B-5 | `/karriere/danke` springt **H1 → H4** — die Seite hat außer der H1 nur Footer-Überschriften | `[M]` | niedrig |
| B-6 | Auf der Startseite steht der **Preis 199 € nicht über der Falz**; sichtbar sind nur zwei gleichgewichtige CTAs ohne Angebotsbezug | `[S]` `fold/index-390-fold.png` | hoch |
| B-7 | Auf `/` konkurrieren zwei optisch gleich starke CTAs („Kostenlose Beratung" gefüllt / „Führerschein Info" outline) ohne klare Priorität | `Hero.tsx:62-69`; `[S]` | mittel |

### C — Mobile (Priorität, >75 % des Traffics)

| Nr. | Befund | Beleg | Schwere |
|---|---|---|---|
| **C-1** | **Horizontales Scrollen auf `/` bei 390 px: Inhalt 416 px statt 390 px (+26 px).** Ursache exakt lokalisiert: `ContactSection.tsx:123` `grid lg:grid-cols-2` berechnet bei 358 px Container eine Spaltenbreite von **399,7 px**, weil das Kartenkind (`:125`, `p-8` = 2×32 px Innenabstand) bei `min-width:auto` nicht schrumpfen kann | `[M]` gemessene Elternkette; `ContactSection.tsx:123,125` `[V]` | **hoch** |
| **C-2** | **Horizontales Scrollen auf `/impressum` bei 390 px: 465 px statt 390 px (+75 px).** Ursache: die Überschrift „Verbraucherstreitbeilegung/Universalschlichtungsstelle" ist ein unumbrechbares Langwort; das `<h3>` hat `wordBreak: normal`, kein `hyphens`, kein `break-words` → interner Überlauf 91 px bei 358 px Spaltenbreite | `Impressum.tsx:80` `[V]`; `[M]` | **hoch** |
| C-3 | **Horizontales Scrollen auf `/preise` bei 768 px (+14 px)** — bisher unbekannt. Der Header-Button „Jetzt anfragen" (`hidden md:flex`) reicht bis x=808, und der CTA „📍 Standort & Öffnungszeiten" bis x=782 | `[M]`; `Header.tsx` md-Zweig, `Preise.tsx:271-274` | mittel |
| C-4 | **38 Tap-Targets unter 44 px Höhe auf `/`** gegenüber **7 auf `/anmeldung`**. Betroffen u. a. alle Angebots-CTAs mit 40 px (`Button`-Default `h-10`) und die Karussell-Pfeile mit 32×32 px | `[M]`; `ui/button.tsx:24` `[V]` | **hoch** |
| C-5 | Der **Cookie-Banner-Schließer misst 24×24 px** und taucht auf 10 Routen auf | `CookieConsent.tsx:66` `[V]`; `[M]` | mittel |
| C-6 | Der **Footer-Navigationsblock** hat durchgehend 24 px hohe Ziele („Home", „Über uns", „Führerschein", „Kontakt", „Anmeldung") — auf jeder Seite mit Footer | `Footer.tsx:36-53` `[V]`; `[M]` | mittel |
| C-7 | Das **Logo ist höher als die Kopfzeile**: Kopfzeile `h-12 md:h-16` (48/64 px), Logo `h-14 md:h-20` (56/80 px) → das Logo ragt um 8 px bzw. 16 px heraus | `Header.tsx:34,41` `[V]`; `[S]` | mittel |
| C-8 | Die LP-Welt ist mobil **deutlich besser gebaut**: Formular über der Falz, 56–60 px CTAs, Angebot und Countdown sofort sichtbar | `[S]` `fold/anmeldung-390-fold.png` | — (gut) |
| C-9 | `[UNKLAR]` Nur 390/768/1440 px geprüft. **320 px (iPhone SE) wurde nicht getestet** — dort ist mit weiteren Überläufen zu rechnen | — | offen |

### D — Copy

| Nr. | Befund | Beleg | Schwere |
|---|---|---|---|
| D-1 | **Sie/du gemischt, teils auf derselben Seite.** `/preise` siezt in der Einleitung („Bei uns wissen **Sie** genau", `Preise.tsx:53`) und duzt in den Karten („**Sprich** uns einfach … darauf an", `Preise.tsx:240`; „kannst **du**", `Preise.tsx:247`) | `[V]` | hoch |
| D-2 | Die gesamte Rest-Welt siezt (`Hero.tsx:38`, `WhyABF.tsx:27`, `AboutSection.tsx:17`), die LP-Welt duzt durchgehend (`Landing.tsx:116`) | `[V]` | hoch |
| D-3 | Die **404-Seite ist englisch** („Oops! Page not found", „Return to Home") und hat weder Kopf- noch Fußzeile — als einzige Route der Website | `NotFound.tsx:17-21` `[V]`; `[M]` `header=false footer=false` | mittel |
| D-4 | Überschriften-Stil uneinheitlich: Rest-Welt hängt „Potsdam" fast überall an (SEO-Kadenz: „Anmeldung Fahrschule Potsdam", „Führerscheinprüfung Potsdam"), LP-Welt formuliert natürlich | `ProcessSection.tsx:10-24` gegen `Landing.tsx:36-39` `[V]` | mittel |
| D-5 | Nicht Teil des Design-Auftrags, aber sichtbar: `/preise` zeigt **279 €**, während Anzeigen und alle anderen Seiten **199 €** versprechen (ENT-1 noch offen) | `Preise.tsx:77-78` `[V]`; `[S]` `fold/preise-390-fold.png` | hoch |

### E — Konversion

| Nr. | Befund | Beleg | Schwere |
|---|---|---|---|
| E-1 | Die **Landingpages sind konversionsstark gebaut**: Formular über der Falz, Angebot + Frist + Countdown sofort sichtbar, Sticky-CTA, Vertrauenszeile | `[S]` `fold/anmeldung-390-fold.png` | — (gut) |
| E-2 | Die **Startseite verschenkt die Falz**: kein Preis, kein Angebot, keine Frist; zwei gleichrangige CTAs, das Formular liegt ganz am Seitenende (Sektion 10 von 10) | `[S]`; `[M]` | **hoch** |
| E-3 | `/preise` nennt **279 €** statt der beworbenen 199 € — wer aus einer Anzeige über `/anmeldung` kommt und auf „Preise" klickt, sieht einen **höheren** Preis als versprochen | `Preise.tsx:77-78` `[V]` | **hoch** |
| E-4 | **Kein Footer auf den Landingpages** → von `/anmeldung` führt kein Weg zu `/preise`, `/kontakt`, `/theorie`; umgekehrt verlinkt die Rest-Welt auf `/Anmeldung` (Groß-A, Z07) | `Landing.tsx:109-170` `[V]`; `[M]` `footer=false` | mittel |
| E-5 | Die **Sticky-Leiste unterscheidet sich je Welt**: Rest-Welt „Anrufen/WhatsApp" (`MobileStickyFooter.tsx`), LP-Welt „Jetzt anmelden/Anrufen" (`lp/StickyMobileCta.tsx`). Die Rest-Welt bietet mobil **keinen** Weg ins Formular | `[V]` `[S]` | mittel |
| E-6 | Auf `/` sind alle Angebots-CTAs als `<Link><Button>` verschachtelt — der `<a>` ist nur 21 px hoch, der `<button>` darin 40 px | `OffersSection.tsx:72-74` `[V]`; `[M]` | mittel |

### F — Barrierefreiheit

Kontrastwerte mit korrekter Alpha-Kompositierung berechnet; Elemente mit Verlaufs- oder
Bildhintergrund wurden **ausgelassen statt geraten**. `[M]`

| Nr. | Befund | Beleg | Schwere |
|---|---|---|---|
| **F-1** | **Die Markenfarbe selbst besteht WCAG AA nicht.** Weiß auf `#1A9CFF` = **2,9:1** (nötig 4,5:1). Betrifft **jeden** primären CTA der Landingpages: „Herbst-Angebot sichern", „Motorrad-Platz sichern", „B196-Platz anfragen", „Jetzt anmelden", „Route in Google Maps öffnen" | `[M]` `/anmeldung`, `/anmeldungmotorrad`, `/b196`, `/karriere`; `lp/LeadForm.tsx:249` `[V]` | **hoch** |
| F-2 | Weiß auf `#16A34A` (WhatsApp) = **3,3:1** — auf allen vier Landingpages und auf `/` | `[M]`; `lp/LeadForm.tsx:269` `[V]` | hoch |
| F-3 | `#1A9CFF` auf `#F4F7FA` = **2,7:1** („Der Einstieg" in den Klassenkarten) | `[M]` `/anmeldungmotorrad`; `AnmeldungMotorrad.tsx:35` `[V]` | mittel |
| F-4 | **13 Kontrastverstöße auf `/`**, u. a. `text-gray-400` „(optional)" = **2,54:1**, `blue-100` auf `blue-600` = **2,97:1**, `green-600` auf `green-50` = **3,15:1**, `orange-600` auf `orange-50` = **3,35:1** | `[M]`; `ContactSection.tsx:164`, `OffersSection.tsx:159,168` `[V]` | **hoch** |
| F-5 | `text-gray-500` auf `bg-gray-900` = **3,67:1** im Footer („Festnetz:") — auf **allen 11 Seiten mit Footer** | `Footer.tsx:86` `[V]`; `[M]` | mittel |
| F-6 | **Formularfelder ohne zugeordnetes Label**: 1 Feld auf `/` (`<select>`), je 1 auf den drei Landingpages, 2 auf `/karriere` (`<select>` + Checkbox) | `[M]` | mittel |
| F-7 | **11 von 11 Bildern auf `/` ohne `width`/`height`** → Layoutsprünge beim Laden. Auf `/anmeldung` korrekt gesetzt (1/1) | `[M]` | mittel |
| F-8 | `alt`-Texte sind **auf allen Seiten vollständig** ✅ (0 Bilder ohne `alt`) | `[M]` | — (gut) |
| F-9 | Sichtbarer Fokus existiert über `focus-visible:ring-2` der shadcn-Komponente; die 37 rohen `<button>` und die LP-Elemente haben **kein einheitliches Fokusverhalten** — `LpHeader.tsx:41,50` setzt eigene `outline`-Farben | `ui/button.tsx:8` gegen `lp/LpHeader.tsx:41` `[V]` | mittel |
| F-10 | **20 von 20 Reveal-Blöcken auf `/anmeldung` sind vor dem Scrollen `opacity:0`** und werden ausschließlich per `IntersectionObserver` sichtbar. Bei `prefers-reduced-motion: reduce` ebenfalls 20/20 — `motion-reduce:transition-none` schaltet nur den Übergang ab, nicht den unsichtbaren Startzustand | `lp/Reveal.tsx:39-41` `[V]`; `[M]` beide Modi | mittel |

### G — Code-Hygiene

| Nr. | Befund | Beleg | Schwere |
|---|---|---|---|
| G-1 | **12 Dateien werden von nichts importiert** — bestätigt: `src/components/motorrad/` (8 Dateien) sowie `ConversionFAQ.tsx`, `OfferBox.tsx`, `ProcessSteps.tsx`, `CountdownTimer.tsx`, je **0 importierende Dateien** | `[V]` Importsuche über `src/` | mittel |
| G-2 | **Zwei Helmet-Bibliotheken parallel**: `react-helmet` in 10 Seiten, `react-helmet-async` in `App.tsx` und `lp/LpSeo.tsx` | `[V]` | hoch |
| G-3 | **Ungültige HTML-Verschachtelung**: React meldet auf `/` „`<p>` cannot appear as a descendant of `<p>`" | `[M]` Konsole `/` | mittel |
| G-4 | React-Warnung **auf allen 13 gerenderten Routen**: „React does not recognize the `%s` prop on a DOM element" — tritt auf jeder Seite mit `react-helmet` auf, auf den Landingpages (`react-helmet-async`) **nicht** | `[M]` | mittel |
| G-5 | `<Link>` umschließt `<Button>` → gerendertes `<a><button>`, in HTML nicht zulässig | `OffersSection.tsx:72-74` `[V]` | mittel |
| G-6 | **Zwei tote `preconnect`-Verbindungen** zu Google-Fonts-Servern, obwohl keine Schrift geladen wird | `index.html:145-146` `[V]` | niedrig |
| G-7 | **Sechs Bausteinpaare doppelt gebaut** (gleicher Zweck, zwei Implementierungen): FAQ (`FAQSection.tsx` 95 Z. / `lp/FaqBlock.tsx` 34 Z.), Ablauf (`ProcessSection.tsx` 142 Z. / `lp/Steps.tsx` 32 Z.), Warum-ABF (`WhyABF.tsx` 47 Z. / `lp/WhyAbfCards.tsx` 37 Z.), Standort (in `ContactSection.tsx` / `lp/LocationSection.tsx` 41 Z.), Kopfzeile (`Header.tsx` 132 Z. / `lp/LpHeader.tsx` 60 Z.), Sticky-CTA (`MobileStickyFooter.tsx` 38 Z. / `lp/StickyMobileCta.tsx` 80 Z.) | `[V]` | **hoch** |
| G-8 | `--radius: 0.5rem` ist definiert (`index.css:42`) und in `tailwind.config.ts:75-79` verdrahtet, wird aber **fast nirgends benutzt** — stattdessen 8 direkte `rounded-*`-Klassen | `[V]` | mittel |
| G-9 | Der `.dark`-Modus ist in `index.css:61-101` vollständig gepflegt, aber **nirgends aktivierbar** — kein Umschalter, keine `dark:`-Klasse in den 54 Dateien im Umfang | `[V]` | niedrig |

### H — Seitenübergreifende Einheitlichkeit

| Nr. | Befund | Beleg | Schwere |
|---|---|---|---|
| **H-1** | **Drei Design-Welten statt der im Briefing angenommenen zwei**: LP-Welt (`#1A9CFF`/`#1C1C1C`/`#13243A`), Rest-Welt (`blue-600`/`gray-900` + Petrol-Token), Karriere-Welt (LP-Farben + Rest-Header + eigenes `#0D1B2A`) | `[V]` `[M]` `[S]` | **hoch** |
| H-2 | **Zwei Kopfzeilen**: `Header.tsx` (11 Seiten, weiß, `blue-600`, Burger-Menü) und `LpHeader.tsx` (3 Seiten, eigener CTA, kein Menü) | `[V]` | hoch |
| H-3 | **Footer fehlt auf 3 von 14 Routen** (`/anmeldung`, `/b196`, `/anmeldungmotorrad`) und auf der 404-Seite; Kopfzeile fehlt nur auf 404 | `[M]` | hoch |
| H-4 | **Zwei Sektionsrhythmen**: 64/96 px (Rest-Welt) gegen 48/64 px (LP-Welt) | `[M]` | hoch |
| H-5 | **Zwei Containerbreiten**: `max-w-7xl` (1280 px, Rest-Welt) gegen `max-w-6xl` (1152 px, LP-Welt) | `[V]` | mittel |
| H-6 | **Dieselbe Aussage, zwei Gestaltungen**: Die FAQ existiert als `FAQSection` (weiß, blau, `text-4xl`) und als `FaqBlock` (`#F4F7FA`, `#13243A`, `text-3xl`) — beide auf shadcn-Accordion, aber optisch unverwandt | `[V]` `[S]` | hoch |
| H-7 | Die 404-Seite steht **völlig außerhalb** jedes Systems: kein Header, kein Footer, englisch, `blue-500`, `bg-gray-100` | `NotFound.tsx:14-21` `[V]`; `[M]` | mittel |

---

## 5. Bewertungsskala — was „5" in diesem Projekt konkret heißt

**Diese Definition gilt ab jetzt unverändert für alle Runden.** Ohne sie ist ein Fortschritt über
mehrere Runden nicht vergleichbar. Zwischenstufen (2, 3, 4) werden interpoliert; **eine 5 gibt es
nur, wenn jeder Punkt der 5er-Spalte erfüllt ist.**

| Kriterium | 1 = Ist-Zustand heute | 3 = brauchbar | **5 = Ziel** |
|---|---|---|---|
| **A Design-Konsistenz** | 58 Farbwerte, 3 Farbsysteme, 4 Button-Ausprägungen, 17 py-Werte, keine Schrift definiert | ein Farbsystem, ≤ 20 Farbwerte, Buttons aus einer Quelle | **≤ 15 Farbwerte, alle aus benannten Tokens; genau 1 Buttonsystem mit ≤ 4 Varianten; ≤ 6 Abstands-, ≤ 3 Radien-, ≤ 3 Schattenstufen; ≤ 8 Schriftgrößen; eine definierte Schriftfamilie; 0 rohe Hex-Werte in Komponenten** |
| **B Hierarchie** | H1→H3-Sprünge, Angebot nicht über der Falz, zwei gleichrangige CTAs | keine Ebenensprünge, ein klarer Haupt-CTA | **Auf jeder Seite: genau 1 H1, keine Ebenensprünge, genau 1 optisch dominanter CTA je Bildschirm; das Kernversprechen (Preis + Frist) steht bei 390 px über der Falz; Schriftgrößen folgen einer benannten Stufenleiter** |
| **C Mobile** | 3 Seiten mit horizontalem Scrollen, 38 Tap-Targets < 44 px auf `/` | kein horizontales Scrollen, Haupt-CTAs ≥ 44 px | **Bei 320/390/768 px kein horizontales Scrollen (scrollWidth ≤ clientWidth + 1 px); jedes interaktive Element ≥ 44×44 px; Formular ohne Zoom bedienbar; keine Layoutsprünge (alle Bilder mit width/height)** |
| **D Copy** | Sie/du gemischt, 404 englisch | durchgehend eine Anrede | **Durchgehend eine Anrede auf allen 14 Routen; alles auf Deutsch; einheitliche Überschriftenlogik; jede Tatsachenaussage deckungsgleich mit `CONTENT_INVENTORY.md`** |
| **E Konversion** | Startseite ohne Angebot über der Falz, `/preise` widerspricht der Anzeige | Angebot auf jeder Kernseite sichtbar, ein CTA-Typ | **Auf jeder Kundenseite: Angebot + Frist über der Falz, genau 1 Primär-CTA, durchgehend erreichbarer Weg ins Formular (Sticky auf allen Seiten); widerspruchsfreie Preise; jeder interne Anmelde-Link zeigt auf `/anmeldung`** |
| **F Barrierefreiheit** | Marken-CTA bei 2,9:1, 13 Verstöße auf `/`, Felder ohne Label | alle Fließtexte ≥ 4,5:1 | **Alle Text/Hintergrund-Paare erfüllen WCAG AA (4,5:1 bzw. 3:1 groß) — auch auf Verläufen; jedes Formularfeld hat ein Label; sichtbarer, einheitlicher Fokusring auf allen interaktiven Elementen; vollständig per Tastatur bedienbar; `prefers-reduced-motion` respektiert** |
| **G Code-Hygiene** | 12 tote Dateien, 2 Helmet-Bibliotheken, ungültiges HTML, 6 Bausteindubletten | tote Dateien entfernt, eine Helmet-Bibliothek | **0 nicht importierte Dateien; genau 1 Helmet-Bibliothek; 0 React-Warnungen und 0 Konsolenfehler auf allen Routen; gültiges HTML; jeder Baustein existiert genau einmal; `npx tsc --noEmit` und `npm run build` grün** |
| **H Einheitlichkeit** | 3 Welten, 2 Kopfzeilen, Footer fehlt auf 4 Routen | eine Kopfzeile, ein Footer überall | **Alle 14 Routen teilen Kopfzeile, Fußzeile, Sektionsrhythmus, Containerbreite, Typo- und Farbsystem; jeder Baustein sieht auf jeder Seite gleich aus; ein Fremder erkennt alle Seiten als dieselbe Website** |

---

## 6. Erstbewertung

**Skala:** 1 = unbrauchbar · 5 = Zielzustand nach Abschnitt 5.
**Zielvorgabe des Auftrags:** Ø ≥ 4,5, kein Kriterium < 4,0.

| Kriterium | Note | Tragende Begründung |
|---|---:|---|
| **A** Design-Konsistenz | **1,5** | 58 Farbwerte in 3 unverbundenen Systemen (A-1…A-3); keine Schrift geladen (A-4); kein Buttonsystem (A-10); 17 py-Werte (A-6) |
| **B** Hierarchie | **2,5** | Genau 1 H1 überall ✅ (B-1), aber Ebenensprünge auf 7 Seiten (B-2…B-5) und die Startseite führt nicht (B-6, B-7) |
| **C** Mobile | **2,0** | 3 Seiten mit horizontalem Scrollen (C-1…C-3), 38 zu kleine Tap-Targets auf `/` (C-4); die LP-Welt zieht die Note nach oben (C-8) |
| **D** Copy | **2,5** | Sie/du auf derselben Seite gemischt (D-1, D-2), 404 englisch (D-3); sprachlich ansonsten sauber |
| **E** Konversion | **2,5** | Landingpages stark (E-1), aber Startseite verschenkt die Falz (E-2) und `/preise` widerspricht der Anzeige (E-3) |
| **F** Barrierefreiheit | **2,0** | Die Markenfarbe selbst besteht AA nicht (F-1); 13 Verstöße auf `/` (F-4); Felder ohne Label (F-6); `alt`-Texte vollständig ✅ (F-8) |
| **G** Code-Hygiene | **2,0** | 12 tote Dateien (G-1), 2 Helmet-Bibliotheken (G-2), ungültiges HTML (G-3, G-5), 6 Bausteindubletten (G-7) |
| **H** Einheitlichkeit | **1,5** | Drei Welten (H-1), zwei Kopfzeilen (H-2), Footer fehlt auf 4 Routen (H-3), zwei Rhythmen und Breiten (H-4, H-5) |
| **Ø** | **2,06** | **Zielabstand: 2,44 Punkte. Kein Kriterium erreicht die Mindestnote 4,0.** |

---

## 7. Gegenrede

*Ohne diesen Abschnitt ist die Bewertung laut `SESSION_BRIEFING.md:20` ungültig. Hier argumentiere
ich **gegen meine eigenen Noten** — sieben Punkte, an denen ich zu großzügig gewesen sein könnte,
und zwei, an denen ich zu streng war.*

### Wo ich zu großzügig war

**1. F (2,0) ist vermutlich zu hoch — meine Messung hat systematische Lücken.**
Ich habe **alle Elemente mit Verlaufs- oder Bildhintergrund übersprungen**, weil ich deren
Kontrast nicht sauber berechnen kann. Genau dort liegen aber die auffälligsten Stellen: der
Hero-Verlauf auf `/`, `from-blue-600 to-blue-700` (`ProcessSection.tsx:95`), die
Bild-Overlays im Karussell und auf den Fahrschüler-Bildern. Die 13 Verstöße auf `/` sind eine
**Untergrenze, keine Bilanz**. Zudem habe ich **nicht per Tastatur navigiert**, **keinen
Screenreader** und **keinen 200-%-Zoom** getestet — drei der vier häufigsten realen Barrieren.
Ehrlicher wäre **1,5**, solange das nicht geprüft ist.

**2. B (2,5) ist zu hoch — ich habe Struktur mit Wirkung verwechselt.**
Ich habe „genau eine H1 auf allen Routen" als Pluspunkt gewertet. Das ist eine
**Maschinen**-Eigenschaft. Für einen Menschen auf 390 px ist die Startseite hierarchielos: H1,
dann zwei Bildunterschriften als H3, dann zwei gleich starke Buttons, dann ein Karussell. Wer die
Seite ansieht, weiß nach drei Sekunden nicht, was sie will. Nach der Skala in Abschnitt 5 („genau
1 optisch dominanter CTA je Bildschirm", „Kernversprechen über der Falz") ist beides verfehlt.
**2,0 wäre richtiger.**

**3. E (2,5) ist zu hoch — ich habe den Trichter nicht als Ganzes bewertet.**
Ich habe die starken Landingpages gegen die schwache Startseite verrechnet. Der Trichter ist aber
eine Kette: Anzeige → `/anmeldung` (199 €) → Nutzer klickt „Preise" → `/preise` zeigt **279 €**.
Das ist kein Schönheitsfehler, sondern ein **Vertrauensbruch an der Kaufentscheidung**, und die
Landingpages können ihn nicht ausgleichen. Dass zusätzlich der Footer auf den Landingpages fehlt
(E-4), macht `/preise` nur über den Header erreichbar — das mildert es, behebt es aber nicht.
**2,0 wäre ehrlicher.**

**4. C (2,0) beruht auf drei Breiten, nicht auf Geräten.**
Ich habe 390/768/1440 px gemessen, wie beauftragt. Aber **320 px habe ich nicht getestet** — und
die Ursache von C-1 (ein Kartenkind mit `p-8`, das unter ~400 px nicht schrumpfen kann) wird bei
320 px **zwangsläufig schlimmer**. Ebenso ungetestet: Querformat, dynamische Schriftvergrößerung
(iOS/Android), langsame Verbindungen. Meine 2,0 gilt für drei Standbilder, nicht für das
Gerätefeld.

**5. Ich habe die Screenshots nach vollständigem Durchscrollen erzeugt — das ist geschönt.**
Weil `Reveal` alle Inhalte auf `opacity:0` setzt (F-10), zeigte der erste Fullpage-Durchlauf große
weiße Flächen. Ich habe daraufhin **vor jedem Screenshot durchgescrollt**, damit der
IntersectionObserver auslöst. Das ist methodisch nötig, zeigt aber **nicht**, was ein Nutzer auf
einer langsamen Verbindung sieht. Die Bilder in `fold/` (erster Bildschirm, ohne Scrollen) sind die
ehrlicheren Belege — ich habe meine Bewertung überwiegend auf sie gestützt, aber nicht
ausschließlich.

**6. G (2,0) blendet aus, dass ich den Build nicht geprüft habe.**
Meine Skala verlangt für eine 5 ausdrücklich „`npx tsc --noEmit` und `npm run build` grün". Ich
habe **beides in dieser Phase nicht ausgeführt** — Phase 2 ändert keinen Code, also schien es
entbehrlich. Damit fehlt mir aber der Ausgangswert, gegen den ich ab Phase 5 prüfen muss. Die 2,0
stützt sich nur auf Dateizählung und Konsolenausgabe.

**7. Die Note A (1,5) könnte sogar zu hoch sein.**
Ich habe `src/components/ui/*` aus der Zählung ausgenommen, weil es unveränderte shadcn-Basis ist.
Das ist verteidigbar — aber `ui/button.tsx:23-27` definiert die Buttonhöhen `h-10`/`h-9`/`h-11`,
die **alle unter 44 px** liegen und damit C-4 mitverursachen. Die shadcn-Basis ist also **nicht
neutral**, sondern Teil des Problems. Hätte ich sie mitgezählt, wären die Zahlen in 3.1 höher.

### Wo ich zu streng war

**8. H (1,5) bestraft eine bewusste Entscheidung.**
Dass Landingpages keinen Footer haben, ist im Anzeigen-Marketing **übliche Praxis** — jeder
zusätzliche Ausgang kostet Konversion. Ich habe das unter H-3 als Mangel gewertet. Es ist aber eher
eine **Zielkonflikt-Entscheidung** (E gegen H), die Jakob in Phase 3 treffen muss, kein Fehler.
Ohne H-3 läge H bei etwa 1,8.

**9. Die LP-Welt verdient mehr Anerkennung, als die Durchschnittsnote zeigt.**
`src/components/lp/*` ist sauber gebaut: konsistente 64-px-Sektionen, ein Farbsystem, 56–60 px
Tap-Targets, Formular über der Falz, 7 statt 38 zu kleine Tap-Targets. Der Durchschnitt von 2,06
verdeckt, dass **etwa ein Drittel des Codes bereits nahe am Ziel ist**. Für Phase 3 ist das die
wichtigste Erkenntnis: Das Design-System muss nicht erfunden, sondern **aus `lp/*` extrahiert und
auf die übrigen 11 Routen ausgerollt** werden.

### Der eine Punkt, an dem meine Bewertung mit dem Auftrag kollidiert

**F-1 gegen die Markenvorgabe.** `SESSION_BRIEFING.md:207-209` legt `#1A9CFF` als Primärfarbe fest
und sagt „nicht verändern". Gemessen ergibt Weiß auf `#1A9CFF` aber **2,9:1** — WCAG AA verlangt
4,5:1. **Beides gleichzeitig ist nicht erfüllbar.** Kriterium F kann die geforderte 4,0 nur
erreichen, wenn eine dieser Vorgaben nachgibt. Ich löse das **nicht eigenmächtig auf**. Mögliche
Wege für Phase 3, zur Entscheidung durch Jakob:

| Weg | Auswirkung |
|---|---|
| a) `#1A9CFF` bleibt Flächenfarbe, Schrift darauf wird dunkel (`#0B2B45`) statt weiß | Kontrast ~8:1 ✅, Markenfarbe unverändert, CTA-Optik ändert sich deutlich |
| b) `#1A9CFF` bleibt für Flächen/Akzente, für **Text-auf-Farbe** wird ein abgedunkelter Geschwisterton (~`#0F6FBF`) eingeführt | Kontrast ~4,6:1 ✅, Markenauftritt bleibt nah am Original |
| c) `#1A9CFF` bleibt exakt wie heute | F bleibt dauerhaft unter 4,0 — Zielvorgabe des Auftrags nicht erreichbar |

**Empfehlung:** Weg **b** — er erhält den Markenauftritt und macht die Zielvorgabe erreichbar.
`[EMPFEHLUNG]`, keine Änderung ohne Freigabe.

---

## 8. Screenshots

Selbst erstellt, **84 Dateien**, alle in `C:/Users/Jakob/.playwright-mcp-out/phase2/` `[S]`:

| Ordner | Inhalt | Anzahl |
|---|---|---|
| `phase2/<seite>-<breite>.png` | **Ganzseitig**, nach vollständigem Durchscrollen (löst `Reveal` aus) | 42 |
| `phase2/fold/<seite>-<breite>-fold.png` | **Erster Bildschirm**, ohne Scrollen — der ehrlichere Beleg | 42 |

14 Routen (`/`, `/anmeldung`, `/anmeldungmotorrad`, `/b196`, `/danke`, `/preise`, `/kontakt`,
`/theorie`, `/impressum`, `/datenschutz`, `/agb`, `/karriere`, `/karriere/danke`, 404)
× 3 Breiten (390 / 768 / 1440 px). Cookie-Banner vor der Aufnahme weggeklickt.

Die im Text zitierten Belege:

| Befund | Screenshot |
|---|---|
| A-2 (drei Akzentfarben auf einem Bildschirm) | `fold/index-390-fold.png` |
| B-6, E-2 (Startseite ohne Angebot über der Falz) | `fold/index-390-fold.png` |
| C-8, E-1 (LP-Welt mobil stark) | `fold/anmeldung-390-fold.png` |
| D-5, E-3 (`/preise` zeigt 279 €, Petrol-Farbwelt) | `fold/preise-390-fold.png` |

Messdaten als Rohdaten: `phase2/results.json`, `phase2/contrast.json`,
`phase2/report.txt`, `phase2/contrast.txt`.

---

## 9. Was Phase 3 aus diesem Audit mitnehmen sollte

1. **Das Design-System nicht erfinden — aus `src/components/lp/*` extrahieren.** Es ist bereits
   konsistent und mobil stark (Gegenrede 9).
2. **Zuerst entscheiden, dann bauen:** die Farbfrage aus Abschnitt 7 (F-1 gegen Markenvorgabe) und
   die Footer-Frage auf Landingpages (Gegenrede 8).
3. **`--primary` in `index.css:16` ist Petrol und muss auf die Markenfarbe.** Das allein räumt
   62 Vorkommen auf einen Schlag auf (A-1).
4. **Eine Schriftfamilie festlegen** — aktuell ist keine definiert (A-4).
5. **Drei Überlauf-Ursachen sind punktgenau bekannt** und in Phase 5 gezielt behebbar
   (C-1: `ContactSection.tsx:123/125`, C-2: `Impressum.tsx:80`, C-3: `Preise.tsx` @768).

---

## 10. Offene Punkte für Jakob

| # | Punkt | Warum ich nicht selbst entscheide |
|---|---|---|
| **P1** | **Markenfarbe gegen WCAG AA** (Abschnitt 7, F-1) | Beide Vorgaben stehen im Auftrag und schließen sich aus |
| **P2** | **Footer auf Landingpages: ja oder nein?** (H-3 gegen E-4) | Zielkonflikt Konversion gegen Einheitlichkeit |
| **P3** | **Playwright-MCP-Transport** (Abschnitt 0) | Soll Phase 2 nach einem Neustart mit dem MCP wiederholt werden? |
| **P4** | **Tote Preconnects + Datenschutztext zu Google Fonts** (A-4, G-6) | Der Datenschutztext ist eingefroren (🔒 M01); die Preconnects zu entfernen wäre eine Code-, keine Inhaltsänderung — Freigabe nötig |
| **P5** | **`package-lock.json` ist weiterhin unverändert offen** im Arbeitsverzeichnis | Aus dem Repo-Sync, nicht committet — steht seit dem Briefing offen |
| **P6** | **`.dark`-Modus** (G-9): vollständig gepflegt, nirgends aktivierbar — entfernen oder ausbauen? | Umfangsentscheidung |

---

**Ende Phase 2. Keine Code-Änderung erfolgt. Warte auf Freigabe für Phase 3 (`DESIGN.md`).**
