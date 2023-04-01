import moment, {type Moment} from 'moment';

export const parserDate = (date: Date | Moment | string) => {
  return moment(date).format('YYYY-MM-DD');
};

export const formatDateToCalendar = (date: Date | Moment) => {
  const formattedDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  return formattedDate;
};
