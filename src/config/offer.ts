import { fromZonedTime } from 'date-fns-tz';

export const OFFER = {
  label: 'Winter-Angebot',
  pkwGrundbetrag: 219,
  motorradGrundbetrag: 399,
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
  motorradBanner: `${OFFER.label}: Grundbetrag ${formatOfferPrice(OFFER.motorradGrundbetrag)} – Theorie im Winter, im Frühjahr fahren`,
  pkwOnsite: withOfferDate(`Das ${OFFER.label} von ${formatOfferPrice(OFFER.pkwGrundbetrag)} gilt bei Anmeldung vor Ort.`),
  motorradOnsite: withOfferDate(`Das ${OFFER.label} von ${formatOfferPrice(OFFER.motorradGrundbetrag)} gilt bei Anmeldung vor Ort.`),
  pkwTitle: withOfferDate(`Führerschein Klasse B Potsdam – ${OFFER.label} | ABF Fahrschule`),
  pkwDescription: withOfferDate(`PKW-Führerschein in Potsdam-Babelsberg: ${OFFER.label}, Theorie in 1 Woche, transparente Preise, 5,0★ bei Google. Jetzt Termin anfragen.`),
  motorradTitle: withOfferDate('Motorradführerschein A1, A2, A in Potsdam | ABF Fahrschule'),
  motorradDescription: withOfferDate(`Motorradführerschein in Potsdam: A1 ab 16, A2 ab 18, Klasse A. ${OFFER.label} – jetzt Theorie machen, im Frühjahr fahren.`),
  b196Title: 'B196 Potsdam – 125er fahren mit Autoführerschein | ABF Fahrschule',
  b196Description: `Mit dem B-Führerschein 125er fahren – ohne zusätzliche Prüfung. B196 in Potsdam-Babelsberg für ${formatOfferPrice(OFFER.b196Festpreis)}. 5,0★ bei Google. Jetzt Platz sichern.`,
  homeTitle: withOfferDate('Fahrschule Potsdam-Babelsberg – Klasse B & Motorrad | ABF Fahrschule'),
  homeDescription: withOfferDate(`Führerschein in Potsdam-Babelsberg: ${OFFER.label} für Klasse B und Motorrad, Theorie in einer Woche, erfahrene Fahrlehrer, 5,0★ bei Google. Jetzt kostenlos beraten lassen.`),
  pricesTitle: withOfferDate('Faire Preise für deinen Führerschein | ABF Fahrschule Potsdam'),
  pricesDescription: withOfferDate(`Transparente Preise in Potsdam-Babelsberg: alle Entgelte für Klasse B und Motorrad auf einen Blick, kompletter Theorieunterricht im Grundbetrag. Jetzt ${OFFER.label} ansehen.`),
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