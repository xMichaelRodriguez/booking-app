import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {type IBook, type IBookState} from './interface/bookin.interface';

const initialState: IBookState = {
  bookings: [],
  isLoading: false,
  isBookingActive: null,
};
export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    startLoadingBookings: state => {
      state.isLoading = true;
    },
    setBookings: (state, action: PayloadAction<IBook[]>) => {
      state.isLoading = false;
      state.bookings = action.payload.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    },

    onAddBook: (state, action: PayloadAction<IBook>) => {
      state.bookings.push(action.payload);
    },

    onUpdateBooking: (state, action: PayloadAction<IBook>) => {
      const index = state.bookings.findIndex(
        booking => booking.id === action.payload.id,
      );
      if (index !== -1) state.bookings[index] = action.payload;
    },
    activeBook: (state, action: PayloadAction<IBook>) => {
      state.isBookingActive = action.payload;
    },
    removeBook: (state, action: PayloadAction<IBook>) => {
      state.bookings = state.bookings.filter(
        book => book.id !== action.payload.id,
      );
    },

    onClearActiveBooking: state => {
      state.isBookingActive = null;
    },
    setClearBookings: state => {
      state.isBookingActive = null;
      state.isLoading = false;
      state.bookings = [];
    },
    onCancelLoading: state => {
      state.isLoading = false;
    },
  },
});
export const {
  startLoadingBookings,
  setBookings,
  activeBook,
  setClearBookings,
  onAddBook,
  onUpdateBooking,
  onClearActiveBooking,
  removeBook,
  onCancelLoading,
} = bookingSlice.actions;
