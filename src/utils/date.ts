import { TIME_ZONE } from './constants';

export const getDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleString(TIME_ZONE, options);
};
