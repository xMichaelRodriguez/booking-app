import moment from 'moment';

export const times = [
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
];
export const weeKendTimes = [
  '7:00',
  '7:30',
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
];

const today = moment().format('YYYY-MM-DD');
export const INITIAL_DATE = today;
