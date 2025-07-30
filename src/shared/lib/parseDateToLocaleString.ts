export const parseDateToLocaleString = (value: number) => {
  const parsedDate = new Date(value).toLocaleString();
  return parsedDate.split(',');
}
