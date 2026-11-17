import { describe, expect, test } from 'bun:test';
import {
  OFFER,
  OFFER_COPY,
  PKW_B197_BENEFIT,
  PKW_OFFER_SAVINGS,
  PKW_SAVINGS_NOTE,
  getOfferCountdown,
  getOfferDateLabel,
  getOfferDeadline,
  withOfferDate,
} from '../src/config/offer';

describe('Aktuelle Angebotsregeln', () => {
  test('Der PKW-Grundbetrag im Winter-Angebot beträgt 299 Euro', () => {
    expect(OFFER.pkwGrundbetrag).toBe(299);
  });
  test('Der bisherige PKW-Grundbetrag von 599 Euro bleibt als Berechnungsgrundlage hinterlegt', () => {
    expect(OFFER.pkwPreviousGrundbetrag).toBe(599);
  });
  test('B197 umfasst zehn Schaltstunden à 45 Minuten für 0 Euro', () => {
    expect(OFFER.b197Schaltstunden).toBe(10);
    expect(OFFER.b197SchaltstundenMinuten).toBe(45);
    expect(OFFER.b197SchaltstundenPreis).toBe(0);
    expect(PKW_B197_BENEFIT).toBe('10 × 45 Min. Schaltstunden für 0 €');
  });
  test('Der B197-Gesamtvorteil beträgt nachvollziehbar 1.032 Euro', () => {
    expect(OFFER.b197PreviousSchaltstundenPreis).toBe(732);
    expect(PKW_OFFER_SAVINGS).toBe(1032);
    expect(PKW_SAVINGS_NOTE).toContain('599 €');
    expect(PKW_SAVINGS_NOTE).toContain('299 €');
    expect(PKW_SAVINGS_NOTE).toContain('732 €');
    expect(PKW_SAVINGS_NOTE).toContain('1.032 €');
  });
  test('Motorrad kostet unverändert 399 Euro', () => {
    expect(OFFER.motorradGrundbetrag).toBe(399);
  });
  test('B196 kostet weiterhin 750 Euro', () => {
    expect(OFFER.b196Festpreis).toBe(750);
  });
  test('B196 enthält weder ADAC noch Zubehörgutscheine', () => {
    expect(OFFER_COPY.b196Included.length).toBe(5);
    expect(OFFER_COPY.b196Included.some((item) => /ADAC|gutsche[i]n/i.test(item))).toBe(false);
  });
  test('Motorrad behält ADAC, aber keinen Zubehörgutschein', () => {
    expect(OFFER_COPY.motorradAdditional).toContain('1 Jahr ADAC-Mitgliedschaft');
    expect(OFFER_COPY.motorradAdditional.some((item) => /gutsche[i]n/i.test(item))).toBe(false);
  });
  test('Das PKW-Angebot enthält 14 Theoriestunden und Erste Hilfe, aber kein ADAC', () => {
    expect(OFFER_COPY.pkwIncluded).toEqual([
      'Anmeldung & Verwaltung',
      '14 × 90 Min. Theorieunterricht',
      'Vorstellung zur theoretischen Prüfung',
      'Persönliche Beratung',
      'Erste-Hilfe-Kurs',
    ]);
    expect(OFFER_COPY.pkwIncluded.some((item) => /ADAC/i.test(item))).toBe(false);
  });
  test('Ohne Enddatum gibt es keine Frist und keinen Countdown', () => {
    expect(OFFER.endDate).toBeNull();
    expect(getOfferDeadline()).toBeNull();
    expect(getOfferDateLabel()).toBeNull();
    expect(getOfferCountdown()).toBeNull();
    expect(withOfferDate('Angebot')).toBe('Angebot');
  });
  test('Ein gesetztes Datum aktiviert Frist und Countdown in Berliner Zeit', () => {
    expect(withOfferDate('Angebot', '2026-12-31')).toBe('Angebot – bis 31. Dezember 2026');
    expect(getOfferDeadline('2026-12-31')?.toISOString()).toBe('2026-12-31T22:59:59.999Z');
    expect(getOfferCountdown(Date.parse('2026-12-30T22:59:59.999Z'), '2026-12-31')).toEqual({ days: 1, hours: 0, minutes: 0, seconds: 0 });
    expect(getOfferCountdown(Date.parse('2027-01-01T00:00:00Z'), '2026-12-31')).toBeNull();
  });
});
