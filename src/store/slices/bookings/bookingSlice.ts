import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  client: {},
  service: {},
  date: null,
  hour: null,
};
export const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {},
});
export const {} = bookingSlice.actions;
