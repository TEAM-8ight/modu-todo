import { TIME_ZONE } from './contants';

export const getDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleString(TIME_ZONE, options);
};
