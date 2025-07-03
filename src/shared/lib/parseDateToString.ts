import { i18n } from '@/shared/config/i18n';
export const parseDateToString = (value: string | Date): string => {
  if (!value) return i18n.global.t('mama.event.no_checked_date');

  let start: Date | null = null;
  try {
    start = new Date(value);
  } catch (error) {
    console.log('Error creating Date object', error);
  }

  const hours: string = start?.getHours().toString().padStart(2, '0') || '';
  const minutes: string = start?.getMinutes().toString().padStart(2, '0') || '';
  const year: number | string = start?.getFullYear() || '';
  const monthDefault: number | undefined = start?.getMonth();
  const month: string = monthDefault != undefined ? (monthDefault + 1).toString().padStart(2, '0') : '';
  const day: string = start?.getDate().toString().padStart(2, '0') || '';

  if ([year, month, day].some(e => e === '00')) return '';

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
