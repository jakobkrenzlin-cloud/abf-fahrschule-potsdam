import { describe, expect, test } from 'bun:test';
import { OFFER, OFFER_COPY, getOfferCountdown, getOfferDateLabel, getOfferDeadline, withOfferDate } from '../src/config/offer';

describe('Aktuelle Angebotsregeln', () => {
  test('Klasse B kostet 219 Euro statt 479 Euro', () => {
    expect(OFFER.pkwGrundbetrag).toBe(219);
    expect(OFFER.pkwRegulaer).toBe(479);
  });
  test('Motorrad kostet 399 Euro statt 650 Euro', () => {
    expect(OFFER.motorradGrundbetrag).toBe(399);
    expect(OFFER.motorradRegulaer).toBe(650);
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
  test('Klasse B behält alle fünf Leistungen', () => {
    expect(OFFER_COPY.pkwIncluded).toEqual([
      'Anmeldung & Verwaltung', 'Kompletter Theorieunterricht',
      'Vorstellung zur theoretischen Prüfung', 'Persönliche Beratung', '1 Jahr ADAC-Mitgliedschaft',
    ]);
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