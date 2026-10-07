import { formatInTimeZone } from 'date-fns-tz';
import { BOOKING_TIMEZONE } from '@/config/booking';

const WD_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const WD_LONG = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const MON_SHORT = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];
const MON_LONG = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

function isoWeekdayOfDay(day: string): number {
  const [y, m, d] = day.split('-').map(Number);
  const w = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return w === 0 ? 7 : w;
}

/** "YYYY-MM-DD" des Zeitpunkts in Berliner Ortszeit */
export const localDay = (d: Date) => formatInTimeZone(d, BOOKING_TIMEZONE, 'yyyy-MM-dd');
export const localTime = (d: Date) => formatInTimeZone(d, BOOKING_TIMEZONE, 'HH:mm');

export const dayShortWeekday = (day: string) => WD_SHORT[isoWeekdayOfDay(day) - 1];
/** "9. Okt." */
export const dayShortDate = (day: string) => {
  const [, m, d] = day.split('-').map(Number);
  return `${d}. ${MON_SHORT[m - 1]}`;
};

/** "Do, 9. Okt., 14:00 Uhr" */
export const formatShort = (d: Date) => {
  const day = localDay(d);
  return `${dayShortWeekday(day)}, ${dayShortDate(day)}, ${localTime(d)} Uhr`;
};

/** "Donnerstag, 9. Oktober" */
export const formatLongDate = (d: Date) => {
  const day = localDay(d);
  const [, m, dd] = day.split('-').map(Number);
  return `${WD_LONG[isoWeekdayOfDay(day) - 1]}, ${dd}. ${MON_LONG[m - 1]}`;
};

/** "Donnerstag, 9. Oktober, 14:00 Uhr" */
export const formatLong = (d: Date) => `${formatLongDate(d)}, ${localTime(d)} Uhr`;
