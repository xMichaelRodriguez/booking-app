import {createSlice} from '@reduxjs/toolkit';
import {IBookState} from './interface/bookin.interface';

const initialState: IBookState = {
  client: null,
  service: null,
  date: null,
  hour: null,
};
export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
});
export const {} = bookingSlice.actions;
