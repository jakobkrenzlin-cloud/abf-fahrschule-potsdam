// Zentrale Daten für die Landingpages (PKW, Motorrad, B196)

export const PHONE_DISPLAY = '+49 162 2191290';
export const PHONE_RAW = '+491622191290';
export const WHATSAPP_BASE = 'https://wa.me/491622191290';
export const ADDRESS_LINE = 'Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg';
export const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=ABF+Fahrschule+Tuchmacherstra%C3%9Fe+45b+14482+Potsdam';
export const GOOGLE_REVIEWS_URL = 'https://maps.google.com/?q=ABF+Fahrschule+Potsdam';
export const RATING_VALUE = '5,0';
export const REVIEW_COUNT = 26;
export const SITE_URL = 'https://abf-fahrschule.de';
export const LOGO_URL = '/lovable-uploads/043122ac-3ad6-402e-85ea-565401e53982.png';

// Herbst-Angebot Ende: 31.10.2026, 23:59:59 (Europe/Berlin = UTC+1 Ende Oktober)
export const OFFER_END = new Date('2026-10-31T23:59:59+01:00');
export const OFFER_DEADLINE_LABEL = '31. Oktober';

export type Review = { name: string; text: string };
export type Step = { title: string; text?: string };
export type Faq = { question: string; answer: string };
