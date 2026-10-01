// Zentrale Preisdatei – alle Entgelte gemäß § 32 FahrlG je Klasse.
// Alle Seiten lesen ihre Preise aus dieser Datei.

export type PriceItem = { label: string; price: string };

export type ClassPrices = {
  key: 'b' | 'a';
  name: string;
  basePrice: string;
  baseLabel: string;
  items: PriceItem[]; // alle Entgelte außer dem Grundbetrag
};

export const PRICES_B: ClassPrices = {
  key: 'b',
  name: 'Klasse B (gilt auch für B197 und BF17)',
  basePrice: '199 €',
  baseLabel:
    'Grundbetrag (allgemeine Aufwendungen inkl. Theorieunterricht), Herbst-Angebot bis 31.10.2026',
  items: [
    { label: 'Grundbetrag bei Nichtbestehen der theoretischen Prüfung und weitere Ausbildung', price: '0 € (kein zusätzlicher Grundbetrag)' },
    { label: 'Vorstellung zur theoretischen Prüfung', price: 'im Grundbetrag enthalten' },
    { label: 'Übungsstunde (45 Min.)', price: '73,12 €' },
    { label: 'Besondere Ausbildungsfahrt Überland (45 Min.)', price: '80 €' },
    { label: 'Besondere Ausbildungsfahrt Autobahn (45 Min.)', price: '80 €' },
    { label: 'Besondere Ausbildungsfahrt Dämmerung/Dunkelheit (45 Min.)', price: '80 €' },
    { label: 'Unterweisung am Fahrzeug (45 Min.)', price: '73,12 €' },
  ],
};

export const PRICES_A: ClassPrices = {
  key: 'a',
  name: 'Klassen A1, A2 und A',
  basePrice: '399 €',
  baseLabel:
    'Grundbetrag (allgemeine Aufwendungen inkl. Theorieunterricht), Herbst-Angebot bis 31.10.2026',
  items: [
    { label: 'Grundbetrag bei Nichtbestehen der theoretischen Prüfung und weitere Ausbildung', price: '0 € (kein zusätzlicher Grundbetrag)' },
    { label: 'Vorstellung zur theoretischen Prüfung', price: 'im Grundbetrag enthalten' },
    { label: 'Übungsstunde (45 Min.)', price: '80 €' },
    { label: 'Besondere Ausbildungsfahrt Überland (45 Min.)', price: '85 €' },
    { label: 'Besondere Ausbildungsfahrt Autobahn (45 Min.)', price: '85 €' },
    { label: 'Besondere Ausbildungsfahrt Dämmerung/Dunkelheit (45 Min.)', price: '85 €' },
    { label: 'Unterweisung am Fahrzeug (45 Min.)', price: '80 €' },
  ],
};

/** Findet ein Entgelt anhand des Label-Anfangs. */
export const priceOf = (c: ClassPrices, labelStart: string) =>
  c.items.find((i) => i.label.startsWith(labelStart))?.price ?? '';
