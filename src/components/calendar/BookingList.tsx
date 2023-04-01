import {type Moment} from 'moment';
import React from 'react';

import {useAppSelector} from '../../hooks';
import {type IBook} from '../../store/slices/bookings/interface/bookin.interface';
import {BookingItem} from './BookingItem';

interface IProps {
  selectedDate: Moment;
  handleOpenSheet: (item: IBook) => void;
}
export const BookingList = ({selectedDate, handleOpenSheet}: IProps) => {
  const {bookings} = useAppSelector(state => state.bookings);
  const validDate = selectedDate.toISOString().split('T')[0];
  return (
    <>
      {bookings?.map(
        booking =>
          booking.date === validDate && (
            <BookingItem
              booking={booking}
              key={booking.id}
              handleOpenSheet={handleOpenSheet}
            />
          ),
      )}
    </>
  );
};
