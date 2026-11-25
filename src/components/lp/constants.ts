// Zentrale Daten für die Landingpages (PKW, Motorrad, B196)
import type { ReactNode } from 'react';

export const PHONE_DISPLAY = '+49 175 8756463';
export const PHONE_RAW = '+491758756463';
export const WHATSAPP_BASE = 'https://wa.me/491758756463';
export const ADDRESS_LINE = 'Weberpark, Tuchmacherstraße 45b, 14482 Potsdam-Babelsberg';
export const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=ABF+Fahrschule+Tuchmacherstra%C3%9Fe+45b+14482+Potsdam';
export const GOOGLE_REVIEWS_URL = 'https://maps.google.com/?q=ABF+Fahrschule+Potsdam';
export const RATING_VALUE = '5,0';
export const REVIEW_COUNT = 40; // Stand Google-Profil November 2026, bei Änderung anpassen
export const SITE_URL = 'https://abf-fahrschule.de';
export const LOGO_URL = '/images/abf-logo-hell.png'; // zugeschnitten aus /lovable-uploads/043122ac-…png

export type Review = { name: string; text: string };
export type Step = { title: string; text?: string };
export type Faq = { question: string; answer: string; answerNode?: ReactNode };
