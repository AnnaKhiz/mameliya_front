export const splitDate = ({ eventStart, eventEnd }: { eventStart: string | Date, eventEnd: string | Date}) => {
  const date = eventStart.toString().split(' ')[0];
  const start = eventStart.toString().split(' ')[1];
  const end = eventEnd.toString().split(' ')[1] || '';

  const splittedStart = start.split(':');
  const startHours = splittedStart[0];
  const startMinutes = splittedStart[1];

  const splittedEnd = end.split(':');
  const endHours = splittedEnd[0];
  const endMinutes = splittedEnd[1];

  return {
    date,
    start,
    end,
    startHours,
    startMinutes,
    endHours,
    endMinutes
  }
}
