import { fromZonedTime } from 'date-fns-tz';

export const OFFER = {
  label: 'Aktionspreis',
  pkwGrundbetrag: 219,
  pkwRegulaer: 479,
  motorradGrundbetrag: 399,
  motorradRegulaer: 650,
  b196Festpreis: 750,
  endDate: null as string | null,
};

export const formatOfferPrice = (price: number) => `${price.toLocaleString('de-DE')} €`;

export function getOfferDeadline(endDate: string | null = OFFER.endDate) {
  if (!endDate) return null;
  return fromZonedTime(`${endDate}T23:59:59.999`, 'Europe/Berlin');
}

export function getOfferDateLabel(endDate: string | null = OFFER.endDate) {
  if (!endDate) return null;
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin',
  }).format(fromZonedTime(`${endDate}T12:00:00`, 'Europe/Berlin'));
}

export function withOfferDate(text: string, endDate: string | null = OFFER.endDate) {
  const label = getOfferDateLabel(endDate);
  return label ? `${text} – bis ${label}` : text;
}

export function getOfferCountdown(now = Date.now(), endDate: string | null = OFFER.endDate) {
  const deadline = getOfferDeadline(endDate);
  if (!deadline) return null;
  const ms = deadline.getTime() - now;
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  };
}

export const OFFER_COPY = {
  pkwBanner: `${OFFER.label}: Grundbetrag ${formatOfferPrice(OFFER.pkwGrundbetrag)} – jetzt Anmeldetermin anfragen`,
  motorradBanner: `Grundbetrag ${formatOfferPrice(OFFER.motorradGrundbetrag)} – Theorie im Winter, im Frühjahr fahren`,
  pkwOnsite: withOfferDate(`Der ${OFFER.label} von ${formatOfferPrice(OFFER.pkwGrundbetrag)} gilt bei Anmeldung vor Ort.`),
  motorradOnsite: withOfferDate(`Der Grundbetrag von ${formatOfferPrice(OFFER.motorradGrundbetrag)} gilt bei Anmeldung vor Ort.`),
  pkwTitle: withOfferDate(`Führerschein Klasse B Potsdam – Grundbetrag ${formatOfferPrice(OFFER.pkwGrundbetrag)} | ABF Fahrschule`),
  pkwDescription: withOfferDate(`PKW-Führerschein in Potsdam-Babelsberg: Grundbetrag ${formatOfferPrice(OFFER.pkwGrundbetrag)} inkl. Theorie, Theorie in 1 Woche, 5,0★ bei Google. Jetzt Termin anfragen.`),
  motorradTitle: withOfferDate('Motorradführerschein A1, A2, A in Potsdam | ABF Fahrschule'),
  motorradDescription: withOfferDate(`Motorradführerschein in Potsdam: A1 ab 16, A2 ab 18, Klasse A. Grundbetrag ${formatOfferPrice(OFFER.motorradGrundbetrag)} – jetzt Theorie machen, im Frühjahr fahren.`),
  b196Title: 'B196 Potsdam – 125er fahren mit Autoführerschein | ABF Fahrschule',
  b196Description: `Mit dem B-Führerschein 125er fahren – ohne zusätzliche Prüfung. B196 in Potsdam-Babelsberg für ${formatOfferPrice(OFFER.b196Festpreis)}. 5,0★ bei Google. Jetzt Platz sichern.`,
  homeTitle: withOfferDate('Fahrschule Potsdam-Babelsberg – Klasse B & Motorrad | ABF Fahrschule'),
  homeDescription: withOfferDate(`Führerschein in Potsdam-Babelsberg: Grundbetrag Klasse B ${formatOfferPrice(OFFER.pkwGrundbetrag)}, Theorie in einer Woche, erfahrene Fahrlehrer, 5,0★ bei Google. Jetzt kostenlos beraten lassen.`),
  pricesTitle: withOfferDate('Faire Preise für deinen Führerschein | ABF Fahrschule Potsdam'),
  pricesDescription: withOfferDate(`Transparente Preise in Potsdam-Babelsberg: Grundbetrag Klasse B ${formatOfferPrice(OFFER.pkwGrundbetrag)}, Motorrad ${formatOfferPrice(OFFER.motorradGrundbetrag)}. Kompletter Theorieunterricht und 1 Jahr ADAC. Jetzt Angebot sichern!`),
  b196Included: [
    '4 Einheiten Theorie',
    '5 Einheiten Praxis auf 125er',
    'Nutzung unserer Schulungsmotorräder',
    'Bescheinigung für die Führerscheinstelle',
    'Keine Prüfungsgebühren (weil keine Prüfung nötig)',
  ],
  motorradAdditional: ['Anmeldung & Verwaltung', 'Prüfungsvorbereitung', '1 Jahr ADAC-Mitgliedschaft'],
  pkwIncluded: ['Anmeldung & Verwaltung', 'Kompletter Theorieunterricht', 'Vorstellung zur theoretischen Prüfung', 'Persönliche Beratung', '1 Jahr ADAC-Mitgliedschaft'],
};