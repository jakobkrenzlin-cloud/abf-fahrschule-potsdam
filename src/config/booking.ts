// WICHTIG: Diese Datei muss inhaltlich identisch bleiben mit supabase/functions/_shared/booking-rules.ts
// (einziger Unterschied: die Import-Zeile von date-fns-tz).
import { fromZonedTime, toZonedTime, formatInTimeZone } from "date-fns-tz";

export const BOOKING_TIMEZONE = "Europe/Berlin";
/** ISO-Wochentage: 1 = Montag ... 5 = Freitag */
export const BOOKING_WEEKDAYS = [1, 2, 3, 4, 5];
export const BOOKING_HOURS = [12, 13, 14, 15, 16, 17];
export const BOOKING_LEAD_HOURS = 24;
export const BOOKING_RANGE_DAYS = 14;
/** Formular-Variante: "ab" = 50/50-Test, sonst feste Variante für alle */
export const BOOKING_MODE: "ab" | "booking" | "classic" = "booking";
/** Letzter Öffnungstag für das Herbst-Angebot (31.10.2026 ist Samstag + Feiertag) */
export const AUTUMN_OFFER_LAST_DAY = "2026-10-30";

const pad = (n: number) => String(n).padStart(2, "0");
export const ymd = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

/** Ostersonntag (Gauss/Meeus), Rückgabe als { m, d } */
function easterSunday(year: number): { m: number; d: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { m: month, d: day };
}

function addDaysYmd(y: number, m: number, d: number, add: number): string {
  const dt = new Date(Date.UTC(y, m - 1, d + add));
  return ymd(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

/** Gesetzliche Feiertage Brandenburg als sortierte "YYYY-MM-DD"-Liste */
export function getBrandenburgHolidays(year: number): string[] {
  const e = easterSunday(year);
  const list = [
    ymd(year, 1, 1),
    addDaysYmd(year, e.m, e.d, -2), // Karfreitag
    addDaysYmd(year, e.m, e.d, 0), // Ostersonntag
    addDaysYmd(year, e.m, e.d, 1), // Ostermontag
    ymd(year, 5, 1),
    addDaysYmd(year, e.m, e.d, 39), // Christi Himmelfahrt
    addDaysYmd(year, e.m, e.d, 49), // Pfingstsonntag
    addDaysYmd(year, e.m, e.d, 50), // Pfingstmontag
    ymd(year, 10, 3),
    ymd(year, 10, 31),
    ymd(year, 12, 25),
    ymd(year, 12, 26),
  ];
  return list.sort();
}

export function isHoliday(day: string): boolean {
  return getBrandenburgHolidays(Number(day.slice(0, 4))).includes(day);
}

/** Lokale Berliner Uhrzeit (Tag "YYYY-MM-DD", Stunde) -> echter Zeitpunkt */
export function localSlotToDate(day: string, hour: number): Date {
  return fromZonedTime(`${day}T${pad(hour)}:00:00`, BOOKING_TIMEZONE);
}

/** ISO-Wochentag (1-7) eines "YYYY-MM-DD" */
function isoWeekday(day: string): number {
  const [y, m, d] = day.split("-").map(Number);
  const w = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return w === 0 ? 7 : w;
}

export type SlotDay = { day: string; slots: Date[] };

/** Alle wählbaren Termine, gruppiert nach Tag */
export function getAvailableSlots(now: Date, blockedDays: string[] = []): SlotDay[] {
  const blocked = new Set(blockedDays);
  const minTime = now.getTime() + BOOKING_LEAD_HOURS * 3600_000;
  const todayLocal = formatInTimeZone(now, BOOKING_TIMEZONE, "yyyy-MM-dd");
  const [ty, tm, td] = todayLocal.split("-").map(Number);
  const result: SlotDay[] = [];
  for (let i = 0; i <= BOOKING_RANGE_DAYS; i++) {
    const day = addDaysYmd(ty, tm, td, i);
    if (!BOOKING_WEEKDAYS.includes(isoWeekday(day))) continue;
    if (isHoliday(day) || blocked.has(day)) continue;
    const slots = BOOKING_HOURS.map((h) => localSlotToDate(day, h)).filter(
      (s) => s.getTime() >= minTime && s.getTime() <= now.getTime() + BOOKING_RANGE_DAYS * 86400_000,
    );
    if (slots.length) result.push({ day, slots });
  }
  return result;
}

/** Serverseitige Prüfung eines Termins. toleranceMinutes lockert nur den Vorlauf. */
export function validateAppointment(
  start: Date,
  now: Date,
  blockedDays: string[] = [],
  toleranceMinutes = 0,
): { valid: boolean; reason?: string } {
  if (isNaN(start.getTime())) return { valid: false, reason: "invalid_date" };
  const local = toZonedTime(start, BOOKING_TIMEZONE);
  const day = formatInTimeZone(start, BOOKING_TIMEZONE, "yyyy-MM-dd");
  if (!BOOKING_WEEKDAYS.includes(isoWeekday(day))) return { valid: false, reason: "weekday" };
  if (!BOOKING_HOURS.includes(local.getHours()) || local.getMinutes() !== 0 || local.getSeconds() !== 0) {
    return { valid: false, reason: "hour" };
  }
  if (isHoliday(day)) return { valid: false, reason: "holiday" };
  if (blockedDays.includes(day)) return { valid: false, reason: "blocked" };
  const diff = start.getTime() - now.getTime();
  if (diff > BOOKING_RANGE_DAYS * 86400_000) return { valid: false, reason: "too_far" };
  if (diff < BOOKING_LEAD_HOURS * 3600_000 - toleranceMinutes * 60_000) return { valid: false, reason: "too_soon" };
  return { valid: true };
}

const WD = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
/** "Do, 09.10.2026, 14:00 Uhr" in Ortszeit */
export function formatAppointment(start: Date): string {
  const local = toZonedTime(start, BOOKING_TIMEZONE);
  return `${WD[local.getDay()]}, ${formatInTimeZone(start, BOOKING_TIMEZONE, "dd.MM.yyyy, HH:mm")} Uhr`;
}
