// Führerscheinreform – zentrale Faktenbasis für /anmeldung und /reform.
//
// Quelle der Fakten: ~/Documents/Fahrschulen/_gemeinsam/playbook/fuehrerscheinreform-stand.md
// (Primärdokumente: BT-Drs. 21/7404, 21/8979, BR-Drs. 365/26, BMV-PM 043/2026, Bundesrat TOP 62).
//
// WICHTIG beim Aktualisieren:
// - Nach der Bundesratssitzung am 20.11.2026 und nach jeder weiteren Sitzung (laut Fachseiten 18.12.2026)
//   REFORM_STAND und die betroffenen Sätze anpassen. Alle Seiten lesen von hier.
// - Nicht schreiben: „gilt ab …“ für Theorie und Sonderfahrten, „Führerschein wird um X € billiger“,
//   „Online-Theorie ab Januar 2027“, „Bestehensquoten öffentlich“. Keine Eurobeträge zur Ersparnis.

export const REFORM_STAND = '17. November 2026';
export const REFORM_STAND_ISO = '2026-11-17';

/** Kurze, belegte Kernsätze. Reihenfolge = Reihenfolge auf /anmeldung. */
export const REFORM_FACTS = {
  heute: {
    title: 'Heute gelten die bisherigen Regeln',
    text:
      'Der Bundestag hat die Reform am 5. November 2026 beschlossen. Der Bundesrat muss noch zustimmen, und die Details zu Theorie und Sonderfahrten hängen an einer Verordnung, die noch nicht beschlossen ist. Das Gesetz soll frühestens am 1. Juli 2027 in Kraft treten.',
  },
  preis: {
    title: 'Ob es billiger wird, ist offen',
    text:
      'Das Gesetz regelt, dass Fahrschulen ihre Preise melden und vergleichbar machen. Wie hoch die Preise sind, regelt es nicht. Eine Beispielrechnung mit Ersparnis gibt es nur im Verordnungsentwurf, und nur für das Üben mit Angehörigen.',
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

/** Was sich laut Gesetz oder Entwurf ändern soll. `basis` sagt, wie verbindlich es ist. */
export const REFORM_CHANGES = [
  {
    topic: 'Theorie',
    text: 'Du sollst wählen können, ob du per App, online oder vor Ort lernst. Fahrschulen müssen nicht jedes Format anbieten.',
    basis: 'Verordnungsentwurf',
  },
  {
    topic: 'Sonderfahrten',
    text: 'Überland, Autobahn und Dunkelheit bleiben Pflicht. Nur die feste Anzahl soll wegfallen, der Umfang richtet sich dann nach deinem Ausbildungsstand.',
    basis: 'Verordnungsentwurf',
  },
  {
    topic: 'Praktische Prüfung',
    text: 'Sie soll 40 statt 55 Minuten dauern, davon 25 Minuten reine Fahrzeit.',
    basis: 'Verordnungsentwurf',
  },
  {
    topic: 'Theorieprüfung',
    text: 'Das Ministerium hat einen um etwa ein Drittel kleineren Fragenkatalog angekündigt. Die Zahl der Fragen je Prüfung bleibt gleich.',
    basis: 'Ankündigung des Ministeriums',
  },
  {
    topic: 'Üben mit Angehörigen',
    text: 'Als befristeter Versuch: nach bestandener Theorie und mindestens 6 Fahrstunden, mit einer Begleitperson, die seit 7 Jahren den Führerschein hat. Die Länder können aussteigen. Ob Brandenburg mitmacht, ist offen.',
    basis: 'Gesetz (Rahmen) und Verordnungsentwurf (Details)',
  },
  {
    topic: 'Preise',
    text: 'Fahrschulen melden ihre Preise, sie werden öffentlich vergleichbar. Erstmals bis 1. Oktober 2027.',
    basis: 'Gesetz',
  },
] as const;

/** Zeitstrahl, nur Daten mit Primärquelle. `done` = Termin liegt hinter uns (nach jeder Sitzung anpassen). */
export const REFORM_TIMELINE = [
  { date: '16. Oktober 2025', done: true, text: 'Das Bundesverkehrsministerium stellt Eckpunkte vor.' },
  { date: '20. Mai 2026', done: true, text: 'Das Bundeskabinett beschließt den Gesetzentwurf.' },
  { date: '24. September 2026', done: true, text: 'Erste Lesung im Bundestag.' },
  { date: '5. November 2026', done: true, text: 'Der Bundestag beschließt das Gesetz.' },
  { date: '20. November 2026', done: false, text: 'Der Bundesrat berät das Gesetz.' },
  { date: 'offen', done: false, text: 'Bundesrat zur Verordnung (Theorie, Sonderfahrten, Prüfung). Der Entwurf nennt den 1. Januar und den 1. Juli 2027, beschlossen ist er nicht.' },
  { date: 'frühestens 1. Juli 2027', done: false, text: 'Das Gesetz tritt in Kraft.' },
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
    label: 'Bundesrat: Tagesordnung 20. November 2026, TOP 62',
    url: 'https://www.bundesrat.de/DE/plenum/bundesrat-kompakt/26/1070/62.html',
  },
  {
    label: 'Bundesverkehrsministerium: Pressemitteilung 043/2026',
    url: 'https://www.bmv.de/SharedDocs/DE/Pressemitteilungen/2026/043-schnieder-bezahlbarer-fuehrerschein.html',
  },
] as const;
