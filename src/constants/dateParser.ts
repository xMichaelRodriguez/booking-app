export const parserDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const parsed = `${year}-${month}-${day}`;
  return parsed;
};

export const formatDateToCalendar = (date: string) => {
  const currentDate = date.split('/').reverse().join('/').replace(/\//g, '-');

  const formatDate = new Date(currentDate);
  return formatDate
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    })
    .split('/')
    .reverse()
    .join('/')
    .replace(/\//g, '-');
};
