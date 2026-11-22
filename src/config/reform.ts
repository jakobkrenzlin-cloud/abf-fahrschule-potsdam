// Führerscheinreform – zentrale Faktenbasis für /anmeldung und /reform.
//
// Quelle der Fakten: ~/Documents/Fahrschulen/_gemeinsam/playbook/fuehrerscheinreform-stand.md
// (Primärdokumente: BT-Drs. 21/7404, 21/8979, BR-Drs. 365/26, BMV-PM 043/2026, Bundesrat TOP 62).
//
// WICHTIG beim Aktualisieren:
// - Stand 22.11.2026: Bundesrat hat dem Gesetz am 20.11.2026 zugestimmt (BundesratKOMPAKT 1070, TOP 62).
// - Nächste Prüfung: Bundesratssitzung 18.12.2026 (Verordnung?) und Verkündung im Bundesgesetzblatt.
//   Dann REFORM_STAND und die betroffenen Sätze anpassen. Alle Seiten lesen von hier, /reform hat zusätzlich
//   eigene FAQ-Texte in src/pages/Reform.tsx.
// - Nicht schreiben: „gilt ab …“ für Theorie und Sonderfahrten, „Führerschein wird um X € billiger“,
//   „Online-Theorie ab Januar 2027“, „Bestehensquoten öffentlich“. Keine Eurobeträge zur Ersparnis.

export const REFORM_STAND = '22. November 2026';
export const REFORM_STAND_ISO = '2026-11-22';

/** Kurze, belegte Kernsätze. Reihenfolge = Reihenfolge auf /anmeldung. */
export const REFORM_FACTS = {
  heute: {
    title: 'Heute gelten noch die bisherigen Regeln',
    text:
      'Bundestag und Bundesrat haben das Gesetz beschlossen, am 5. und am 20. November 2026. Es tritt zum größten Teil am 1. Juli 2027 in Kraft. Die Details zu Theorie, Sonderfahrten und Prüfung regelt eine Verordnung, über die der Bundesrat noch entscheidet.',
  },
  preis: {
    title: 'Ob es billiger wird, ist offen',
    text:
      'Das Gesetz macht die Preise aller Fahrschulen vergleichbar und soll den Führerschein so günstiger machen. Wie hoch die Preise sind, regelt es nicht, und eine Ersparnis nennt es nicht. Eine Beispielrechnung gibt es nur im Verordnungsentwurf, und nur für das Üben mit Angehörigen.',
  },
  warteschlange: {
    title: 'Der Entwurf rechnet mit einer „Bugwelle“',
    text:
      'Selbst der Verordnungsentwurf rechnet mit einer „Bugwelle“ an Fahrschülern, wenn viele bis zum Start warten, und mit längeren Wartezeiten auf Prüfungstermine.',
  },
  altesRecht: {
    title: 'Wer vorher anfängt, darf laut Entwurf nach altem Recht abschließen',
    text:
      'Laut Verordnungsentwurf gilt das für alle, die vor dem 1. Januar 2027 begonnen haben. Ob dieser Stichtag mitwandert, wenn sich die Reform verzögert, und was dann für die Prüfung gilt, ist noch offen.',
  },
} as const;

/** Was sich laut Gesetz oder Entwurf ändert. `basis` sagt, wie verbindlich es ist ("Beschlossen…" = grünes Badge). */
export const REFORM_CHANGES = [
  {
    topic: 'Theorie',
    text: 'Die Pflicht, vor Ort am Theorieunterricht teilzunehmen, fällt weg. Du kannst die Theorie dann auch digital oder per App lernen. Fahrschulen entscheiden selbst, ob und wie sie Theoriestunden anbieten.',
    basis: 'Beschlossen',
  },
  {
    topic: 'Sonderfahrten',
    text: 'Überland-, Autobahn- und Nachtfahrten bleiben Pflicht. Die feste Zahl von 12 fällt weg, den Umfang legt künftig dein Fahrlehrer im Einzelfall fest.',
    basis: 'Beschlossen',
  },
  {
    topic: 'Praktische Prüfung',
    text: 'Sie soll 40 statt 55 Minuten dauern, davon 25 Minuten reine Fahrzeit.',
    basis: 'Verordnungsentwurf',
  },
  {
    topic: 'Theorieprüfung',
    text: 'Das Bewertungssystem wird einfacher und der Fragenkatalog kleiner. Fragen zur Verkehrssicherheit bleiben ein Schwerpunkt.',
    basis: 'Beschlossen, Details per Verordnung',
  },
  {
    topic: 'Üben mit Angehörigen',
    text: 'Als Erprobung: nach bestandener Theorieprüfung und mindestens 6 Fahrstunden, nach einer Einweisung durch eine Fahrlehrkraft. Die Details regelt die Verordnung, die Länder entscheiden, ob sie das zulassen. Ob Brandenburg mitmacht, ist offen.',
    basis: 'Beschlossen, Details per Verordnung',
  },
  {
    topic: 'Preise',
    text: 'Fahrschulen melden ihre Preise, sie werden in der Mobilithek vergleichbar. Erstmals bis 1. Oktober 2027.',
    basis: 'Beschlossen',
  },
] as const;

/** Zeitstrahl, nur Daten mit Primärquelle. `done` = Termin liegt hinter uns (nach jeder Sitzung anpassen). */
export const REFORM_TIMELINE = [
  { date: '16. Oktober 2025', done: true, text: 'Das Bundesverkehrsministerium stellt Eckpunkte vor.' },
  { date: '20. Mai 2026', done: true, text: 'Das Bundeskabinett beschließt den Gesetzentwurf.' },
  { date: '24. September 2026', done: true, text: 'Erste Lesung im Bundestag.' },
  { date: '5. November 2026', done: true, text: 'Der Bundestag beschließt das Gesetz.' },
  { date: '20. November 2026', done: true, text: 'Der Bundesrat stimmt dem Gesetz zu.' },
  { date: 'offen', done: false, text: 'Der Bundesrat berät die Verordnung mit den Details zu Theorie, Sonderfahrten und Prüfung. Laut Bundesrat in einer seiner nächsten Sitzungen, die nächste ist am 18. Dezember 2026.' },
  { date: '1. Juli 2027', done: false, text: 'Das Gesetz tritt zum größten Teil in Kraft.' },
] as const;

export const REFORM_SOURCES = [
  {
    label: 'Bundestag: Beschluss vom 5. November 2026',
    url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw45-de-fahrlehrergesetz-1230606',
  },
  {
    label: 'Bundestag: Gesetzentwurf, Drucksache 21/7404',
    url: 'https://dserver.bundestag.de/btd/21/074/2107404.pdf',
  },
  {
    label: 'Bundestag: Beschlussempfehlung Verkehrsausschuss, Drucksache 21/8979',
    url: 'https://dserver.bundestag.de/btd/21/089/2108979.pdf',
  },
  {
    label: 'Bundesrat: Verordnungsentwurf, Drucksache 365/26',
    url: 'https://dserver.bundestag.de/brd/2026/0365-26.pdf',
  },
  {
    label: 'Bundesrat: Zustimmung am 20. November 2026, TOP 62',
    url: 'https://www.bundesrat.de/DE/plenum/bundesrat-kompakt/26/1070/62.html',
  },
  {
    label: 'Bundesverkehrsministerium: Pressemitteilung 043/2026',
    url: 'https://www.bmv.de/SharedDocs/DE/Pressemitteilungen/2026/043-schnieder-bezahlbarer-fuehrerschein.html',
  },
] as const;
