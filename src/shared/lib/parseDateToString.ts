export const parseDateToString = (value: string): string => {
  if (!value) return ''

  let start = null;
  try {
    start = new Date(value);
  } catch (error) {
    console.log('Error creating Date object', error)
  }

  const hours = start?.getHours().toString().padStart(2, '0') || '';
  const minutes = start?.getMinutes().toString().padStart(2, '0') || '';
  const year = start?.getFullYear() || '';
  const month = start?.getMonth().toString().padStart(2, '0') || '';
  const day = start?.getDay().toString().padStart(2, '0') || '';

  if ([year, month, day].some(e => e === '00')) return '';

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
