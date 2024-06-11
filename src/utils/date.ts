import moment from 'moment';

import { getPreferences } from '@/services';

export const prettyPrintDateFromLocale = (timestamp: number) => {
  const preferences = getPreferences();
  const date = new Date(timestamp * 1000);
  return date.toLocaleString(preferences.language);
};

export const prettyPrintMomentDate = (date?: moment.Moment) => {
  const currentDate = date || moment();
  if (moment().year() === currentDate.year()) {
    return currentDate.format('D MMM, HH:mm');
  }
  return currentDate.format('D MMM, YYYY HH:mm');
};

export const prettyPrintDate = (date: Date) => {
  const currentDate = moment(date);
  return prettyPrintMomentDate(currentDate);
};
