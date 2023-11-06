/**
 * @description a 1 based index -> pass 1 - 12 month number and get name of month
 * @param num
 */
export function getMonthName(num: number) {
  const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
  return formatter.format(new Date(2003, num - 1, 12));
}
