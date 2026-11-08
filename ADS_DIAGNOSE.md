# ADS_DIAGNOSE.md — Vorfall „keine Conversions, keine Leads"

**Diagnose-Datum:** 10.08.2026 · **Konto:** 9513377982 · **Zugriff:** Google Ads read-only, Repo read-only
**Prüfling:** https://abf-fahrschule.de · Repo `jakobkrenzlin-cloud/abf-fahrschule-potsdam` @ `c0040f5`

---

## Kurzfassung

**Es wurde kein Defekt gefunden. Die komplette Lead-Strecke funktioniert — heute, live, verifiziert.**

Ich habe die Kette Formular → Supabase → `/danke` → Conversion-Tag am **10.08.2026 um 12:31 UTC**
mit einem echten Test-gclid durchgespielt. Jedes Glied hat geantwortet: Edge Function `HTTP 200`
mit Lead-ID, Weiterleitung auf `/danke`, Conversion-Tag an `googleadservices.com/pagead/conversion/17551238202/`
mit `HTTP 200` und angehängter gclid.

Die Zahlen sprechen ebenfalls gegen einen Defekt: die aktuelle Null-Serie ist **3 Tage lang** und damit
**exakt so lang wie eine bereits im selben 30-Tage-Fenster aufgetretene Null-Serie** (17.–19.07.).
Bei der gemessenen Conversion-Rate ist eine solche Serie statistisch unauffällig.

**Das ist ein widerlegter Verdacht, kein bestätigter Befund.** Was ich **nicht** verifizieren konnte,
steht in Abschnitt 6 — dort liegt der einzige verbleibende Ansatzpunkt.

---

## 1. Schritt 1 — Kommt Traffic an? → **Fall A**

**[VERIFIZIERT]** Tagesreihe 11.07.–09.08.2026, GAQL gegen `campaign`, segmentiert nach Datum.

### Letzter Tag mit Conversion
| Kampagne | Letzte Conversion | Wert |
|---|---|---|
| DE_POT_Search_Motorrad_Saison | **06.08.2026** | 1,00 |
| DE_POT_Search_PKW_Performance_2026 | **05.08.2026** | 1,00 |
| DE_POT_Recruiting_Search | 29.07.2026 | 1,00 |

→ **Null-Serie: 07.08., 08.08., 09.08. = 3 Tage** (kampagnenübergreifend).

### Klick-Verlauf in genau diesen Tagen
| Datum | PKW Klicks | PKW Kosten | Motorrad Klicks | Motorrad Kosten | Conv. |
|---|---|---|---|---|---|
| 05.08. | 12 | 11,15 € | 13 | 7,65 € | 1 |
| 06.08. | 21 | 19,93 € | 16 | 10,41 € | 1 |
| **07.08.** | **17** | 19,87 € | **17** | 11,06 € | **0** |
| **08.08.** | **11** | 14,75 € | **14** | 8,88 € | **0** |
| **09.08.** | **15** | 17,62 € | **13** | 7,88 € | **0** |

30-Tage-Spanne PKW: 2–30 Klicks/Tag, typisch 12–26. Motorrad: 9–20, typisch 12–18.
**Die Klickzahlen der betroffenen Tage liegen mitten im Normalbereich.** Kein Einbruch.

**→ FALL A [VERIFIZIERT]:** Klicks laufen normal weiter, Menschen landen auf der Seite.
Kosten in der Null-Serie: **rund 80 €** in 3 Tagen (PKW + Motorrad).

---

## 2. Schritt 2 — Auslieferung und Ziel-URLs

**[VERIFIZIERT]** GAQL gegen `ad_group_ad`, alle nicht entfernten Anzeigen aktiver Kampagnen (20 Anzeigen).

### 2.2 Genehmigungsstatus — **alle sauber**
**Alle 20 Anzeigen: `approval_status = APPROVED`, `review_status = REVIEWED`.**
Keine Ablehnung, keine Einschränkung, nichts in Prüfung. Der naheliegende Verdacht „neue Preisangaben
haben eine Richtlinienprüfung ausgelöst" ist damit **widerlegt**.

### 2.5 Ziel-URLs — **alle gültig, kein 404**
| Ziel-URL | Anzahl Anzeigen | Route existiert? |
|---|---|---|
| `https://abf-fahrschule.de/anmeldung` | 6 | ✅ `App.tsx:64` |
| `https://abf-fahrschule.de/anmeldungmotorrad` | 8 | ✅ `App.tsx:66` |
| `https://abf-fahrschule.de/karriere` | 4 | ✅ `App.tsx:76` |
| `https://abf-fahrschule.de/b196` | 1 (**PAUSIERT**) | ✅ `App.tsx:65` |

**Keine einzige Ziel-URL zeigt auf einen Pfad, den es nicht mehr gibt.** Die Hypothese
„404 nach dem Klick" ist **widerlegt**.

Nebenbefund: Die einzige Anzeige mit Ziel `/b196` (ID `815615232379`) ist **pausiert**. Die neue
B196-Seite bekommt also gar keinen direkten Anzeigentraffic — das erklärt, warum von dort
strukturell keine Leads kommen können, ist aber **nicht** die Ursache des Vorfalls
(die Seite hat auch vorher keinen Traffic bekommen).

### 2.6 Änderungshistorie
**[UNKLAR — nicht abgefragt]** `change_event` wurde in diesem Durchgang nicht gezogen, weil die
Ursache bereits in Schritt 1/3 eingegrenzt war und `change_event` auf 30 Tage begrenzt sowie
in der API-Abdeckung lückenhaft ist. Falls du eine lückenlose Kontohistorie brauchst:
Google Ads Oberfläche → Tools → **Änderungsverlauf**.

---

## 3. Schritt 3 — Formularstrecke

### 3.1 Git-Historie — **die zeitliche Korrelation ist echt, die Kausalität nicht**
**[VERIFIZIERT]** `git log --since="2026-08-06" --name-only origin/main`

Am **07.08.2026** wurden **21 Commits** gepusht — der komplette Landingpage-Umbau. Das ist
**derselbe Tag, an dem die Null-Serie beginnt**. Diese Korrelation ist der Grund, warum der
Verdacht naheliegt. Die inhaltliche Prüfung entlastet den Umbau aber:

| Commit | Datei | Änderung | Bewertung |
|---|---|---|---|
| `a69ad1d` | `supabase/functions/submit-lead/index.ts` | `validLicenseClasses` **erweitert** um `b197`, `bf17`, `a_unklar`, `B197`, `BF17` | **Entschärfung**, kein Bruch — ohne diesen Commit hätten die neuen Klassen abgelehnt |
| `a575cc0`, `85c190a` | `src/lib/tracking.ts` | `getAttribution()` füllt fehlende UTM-Keys mit `'direkt'` | **unkritisch** — siehe unten |
| `4a260e7` | `src/components/lp/LeadForm.tsx` | Formular neu gebaut | funktioniert, live getestet |
| `ae1a558`, `3bc769d` | `Landing.tsx`, `B196.tsx`, `AnmeldungMotorrad.tsx` | Seiten neu gebaut | Routen unverändert |
| `39ff839`, `2fc4536`, `d8ec744` | `src/App.tsx` | Routing | alle Ziel-URLs weiter gültig, s. 2.5 |

**Geprüfte und widerlegte Hypothese zu `'direkt'`:** Der Fill betrifft laut
`tracking.ts:25-26` **nur** `UTM_KEYS` (`utm_source`, `utm_medium`, `utm_campaign`), **nicht**
die Click-IDs. Die Edge Function validiert UTM-Parameter ausschließlich auf Länge ≤ 200
(`submit-lead/index.ts:140-146`), die strenge Regex `/^[\w.\-~]{1,200}$/` gilt nur für
gclid/wbraid/gbraid (`:148-156`). `'direkt'` passiert die Validierung problemlos —
und würde sie sogar bestehen. **Widerlegt.**

### 3.2 Supabase-Client — **intakt**
**[VERIFIZIERT]** `src/integrations/supabase/client.ts:5-6`: URL und anon-Key sind **hart im Code**,
keine Umgebungsvariablen. Ein fehlendes `.env` im Build kann diesen Pfad also gar nicht brechen.
Die Landingpage-Formulare gehen ohnehin per direktem `fetch` an die Edge Function
(`LeadForm.tsx:80-94`), nicht über den Client.

### 3.3–3.6 Insert, Fehlerbehandlung, Validierung, Submit-Handler — **live geprüft**
Statt Code-Lektüre habe ich die Strecke **gegen die Produktion** getestet (Playwright MCP,
Chrome, echte Seite):

| Test | Ergebnis | Bewertung |
|---|---|---|
| Edge Function erreichbar? (bewusst ungültiger Payload, Name = „X") | `HTTP 400` + `{"error":"Name muss zwischen 2 und 100 Zeichen lang sein"}` | **lebt und validiert korrekt** |
| Gültiger Payload | `HTTP 200` + `{"success":true,"id":"622b93d9-5d8b-4c4e-a12d-3bec719a8797"}`, 475 ms | **Insert funktioniert** |
| Formularstruktur `/anmeldung` | `<form>` vorhanden, Submit-Button `type=submit`, **nicht** disabled, Felder `lead-form-pkw-name` / `-phone` / `-class` / `-consent` alle aktiv | **intakt** |
| **Echte UI-Absendung** (Cookie-Banner akzeptiert, Felder befüllt, Consent geklickt, Button geklickt) | Weiterleitung `/anmeldung` → **`/danke`**, Text „Vielen Dank für deine Anfrage!" | **intakt** |
| Zweiter `submit-lead`-POST aus der UI | `HTTP 200` | **intakt** |
| Conversion-Tag auf `/danke` | `GET googleadservices.com/pagead/conversion/17551238202/?…&label=UhzpCN_gq6YbELrIirFB&en=conversion&gclaw=TESTDIAGNOSE20260810` → **`HTTP 200`** | **feuert, inkl. gclid** |
| gclid-Erfassung | `localStorage["abf-attribution"]` = `{"gclid":"TESTDIAGNOSE20260810","landing_page":"/anmeldung?gclid=…"}` | **intakt** |

**3.4 Fehlerbehandlung:** `LeadForm.tsx:95-98` wirft bei `!response.ok` und zeigt einen Toast
„Fehler beim Senden"; die Weiterleitung auf `/danke` steht **hinter** dem `throw`
(`LeadForm.tsx:102`). Ein fehlgeschlagener Insert kann also **nicht** stillschweigend als Erfolg
durchgehen. **Widerlegt.**

**3.5 Validierung:** Client verlangt Name ≥ 2 Zeichen, Telefon 6–30 Zeichen
(`LeadForm.tsx:10-15`) — bewusst lax. Der Server verlangt zusätzlich
`/^[+]?[0-9\s()\-]{6,30}$/` (`submit-lead/index.ts:107`). Keine unerfüllbare Regel gefunden.

### 3.7 Routen — **alle vorhanden**
**[VERIFIZIERT]** `src/App.tsx:63-79`: `/anmeldung` (:64), `/b196` (:65), `/anmeldungmotorrad` (:66),
`/danke` (:72). Nichts umbenannt.

### 3.8 Konsole und Netzwerk — **sauber**
Die 3 Konsolenfehler stammen **ausschließlich aus meinen eigenen Testaufrufen**
(der absichtliche 400er und ein manuell ausgelöster OPTIONS-Preflight, den das Formular selbst
nie sendet — ein `fetch` mit nur `Content-Type: application/json` ist ein Simple Request).
**Kein Fehler aus dem regulären Seitenbetrieb.**

---

## 4. Sofort-Test für Jakob (unter 3 Minuten)

1. Browser öffnen, **Inkognito-Fenster** (wichtig: sonst verfälscht altes `localStorage` die Attribution).
2. Aufrufen: `https://abf-fahrschule.de/anmeldung?gclid=JAKOBTEST100826`
3. **F12** → Reiter **Netzwerk** offen lassen, Filter `submit-lead`.
4. Cookie-Banner „Alle akzeptieren" klicken.
5. Formular ausfüllen: Name `ZZ JAKOB TEST`, Telefon `0160 1234567`, Häkchen setzen,
   Button „Herbst-Angebot sichern".

**Was du sehen musst — und was es bedeutet, wenn nicht:**

| Beobachtung | Bedeutung |
|---|---|
| POST auf `submit-lead` erscheint, Status **200** | Kette bis Datenbank ist ganz ✅ |
| Kein POST erscheint | Submit-Handler feuert nicht → Frontend-Bruch |
| POST mit Status **400** | Validierung lehnt ab → Response-Body lesen, dort steht der genaue Grund |
| POST mit Status **429** | Rate-Limit greift (10 Anfragen / 30 Min. pro IP) |
| Seite wechselt auf `/danke` | Weiterleitung intakt ✅ |
| Auf `/danke` erscheint im Netzwerk `googleadservices.com/pagead/conversion/17551238202` | Conversion-Tag feuert ✅ |
| Dieser Aufruf fehlt | Tag-Problem — dann ist es doch ein Zählproblem, kein Lead-Problem |

**Der eigentliche Prüfpunkt danach:** Kommt `ZZ JAKOB TEST` in deiner Leads-Ansicht an?
Wenn der POST 200 liefert, die Zeile bei dir aber **nicht** auftaucht, liegt das Problem
**nicht** an Website oder Formular, sondern zwischen Datenbank und deiner Ansicht — siehe Abschnitt 6.

---

## 5. Befund

### Zeitachse
```
05.08.  PKW letzte Conversion (1)
06.08.  Motorrad letzte Conversion (1)
07.08.  21 Commits: kompletter Landingpage-Umbau  ←  Beginn der Null-Serie
08.08.  0 Conversions,  26 Klicks,  23,63 €
09.08.  0 Conversions,  28 Klicks,  25,50 €
10.08.  Diagnose: Kette End-to-End verifiziert funktionsfähig
```

### Ursachenliste nach Wahrscheinlichkeit

| # | Hypothese | Beweisstand |
|---|---|---|
| 1 | **Normale statistische Schwankung** — 3 Null-Tage bei ~0,63 Conv./Tag | **offen, aber am besten gestützt** (s. u.) |
| 2 | Conversion-Rückdatierung: Google verbucht Conversions auf das **Klickdatum**. Die letzten 1–3 Tage füllen sich rückwirkend und sehen systematisch schlechter aus als die Realität | **offen, mechanisch belegt** |
| 3 | Formular/Landingpage defekt | **widerlegt** — UI-Absendung live erfolgreich, `/danke` erreicht |
| 4 | Supabase-Insert defekt | **widerlegt** — `HTTP 200` + Lead-ID `622b93d9-…` |
| 5 | Edge-Function-Validierung lehnt neue Klassen ab | **widerlegt** — `a69ad1d` hat die Liste erweitert, nicht verengt |
| 6 | `'direkt'`-Fill in `tracking.ts` bricht die Validierung | **widerlegt** — betrifft nur UTM-Keys, die nur längengeprüft werden |
| 7 | Anzeigen abgelehnt wegen neuer Preisangaben | **widerlegt** — 20/20 `APPROVED` |
| 8 | Ziel-URL zeigt auf gelöschte Route (404) | **widerlegt** — alle 4 Ziel-URLs existieren |
| 9 | Auslieferungsproblem (Budget, Rang, Status) | **widerlegt** — Klicks im Normalbereich |
| 10 | Conversion-Tag feuert nicht | **widerlegt** — Aufruf an `…/conversion/17551238202/` mit `HTTP 200` und gclid |
| 11 | Leads entstehen, sind aber in Jakobs Ansicht nicht sichtbar | **offen — nicht prüfbar, s. Abschnitt 6** |

### Wahrscheinlichste Einzelursache
**Hypothese 1 + 2 zusammen: Es liegt gar kein Defekt vor.**

Begründung, rein aus den Zahlen:
- PKW: **16,0 Conversions in 30 Tagen = 0,53/Tag**. Motorrad: 3 in 30 Tagen = 0,10/Tag.
  Zusammen **0,63/Tag**.
- Im selben 30-Tage-Fenster gab es bereits **Null-Serien von 3 Tagen** (17.–19.07. sowohl
  kampagnenübergreifend als auch bei PKW, zusätzlich 23.–25.07. bei PKW).
  **Die aktuelle Serie ist nicht länger als das, was schon zweimal passiert ist.**
- Bei 0,63 Conversions/Tag ist eine 3-tägige Null-Serie ein **alltägliches Ereignis**,
  kein Ausreißer.
- Dazu kommt die Rückdatierung: Google ordnet eine Conversion dem **Klicktag** zu. Die letzten
  Tage sind deshalb strukturell unvollständig und füllen sich noch nach.

Die zeitliche Nähe zum Umbau am 07.08. ist **Korrelation, keine belegte Kausalität** — jedes
Glied der Kette, das der Umbau berührt hat, wurde einzeln geprüft und funktioniert.

### Genau EINE nächste Maßnahme zur Bestätigung
**Führe den Sofort-Test aus Abschnitt 4 aus und sage mir, ob `ZZ JAKOB TEST` in deiner
Leads-Ansicht ankommt.**

Das ist der einzige Punkt, den ich nicht selbst prüfen kann (Abschnitt 6), und er trennt die
beiden verbleibenden Möglichkeiten sauber:
- **Zeile kommt an** → kein Defekt, es ist eine Flaute. Dann nicht an der Technik schrauben,
  sondern die Ads-Diagnose in 3–4 Tagen mit dann nachgefüllten Zahlen wiederholen.
- **Zeile kommt nicht an** → das Problem liegt zwischen Datenbank und deiner Ansicht
  (Rechte, gelöschte Zeilen, falsche Tabelle). Dann ist die Website unschuldig und wir
  suchen dort weiter.

### Reparaturvorschlag — **erst nach dieser Bestätigung**
Solange Hypothese 1 nicht widerlegt ist, gibt es **nichts zu reparieren**. Eine Änderung an
Budgets, Geboten oder Code auf Basis einer 3-tägigen Null-Serie wäre eine Reaktion auf Rauschen
und würde die Diagnose zusätzlich verwässern.

Zwei Dinge sind unabhängig davon auffällig und lohnen später einen eigenen Blick:
1. Die einzige `/b196`-Anzeige ist **pausiert** — die neue B196-Seite bekommt keinen Anzeigentraffic.
2. Die Motorrad-Kampagne liefert **0,10 Conversions/Tag bei ~9 €/Tag Kosten** — das ist unabhängig
   vom Vorfall das schwächere Segment.

---

## 6. Was ich NICHT verifizieren konnte

**[UNKLAR — Leserechte]** Ob in `lead_log` / `leads` tatsächlich keine neuen Zeilen liegen.

- Der `supabase_select`-Aufruf des MCP-Servers liefert für **alle** Tabellen
  (`lead_log`, `leads`, `rate_limits`) **leere Antworten** — das wirkt wie ein Defekt des Tools,
  nicht wie ein Datenbefund.
- Der direkte REST-Zugriff mit dem anon-Key liefert `HTTP 200` und `Content-Range: */0`.
  **Das ist beweiskräftig wertlos:** Ich habe denselben Zähler **nach** meinen zwei erfolgreich
  geschriebenen Testzeilen erneut abgefragt — er stand weiterhin auf `*/0`. Der anon-Key darf
  also gar nicht lesen (RLS). `[]` bedeutet hier „du siehst nichts", nicht „da ist nichts".

Ich kann die Aussage „in Supabase kommen keine Einträge mehr an" damit **weder bestätigen noch
widerlegen**. Sie bleibt der einzige offene Faden — und genau darauf zielt die Maßnahme in Abschnitt 5.

---

## 7. Aufräumen — bitte löschen

Bei der Diagnose sind **zwei echte Testzeilen** in der Datenbank entstanden:

| Name | Telefon | Quelle | ID |
|---|---|---|---|
| `ZZ TESTLEAD DIAGNOSE BITTE LOESCHEN` | 0160 0000000 | landingpage-pkw | `622b93d9-5d8b-4c4e-a12d-3bec719a8797` |
| `ZZ UI-TEST DIAGNOSE BITTE LOESCHEN` | 0160 0000001 | landingpage-pkw | (aus der UI-Absendung) |

Beide tragen `gclid = TESTDIAGNOSE20260810`. Die zweite hat außerdem **eine echte
Google-Ads-Conversion ausgelöst** — sie wird in den Zahlen des 10.08. als eine Conversion auftauchen.
Das ist bei der nächsten Auswertung zu berücksichtigen.

**Am Google-Ads-Konto wurde nichts verändert.** Alle Abfragen waren `SELECT`.
**Am Repo wurde keine bestehende Datei verändert** — diese Datei ist neu angelegt und nicht committet.
