import { TIME_ZONE } from 'utils/constants';

const getDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleString(TIME_ZONE, options);
};

export default getDate;
