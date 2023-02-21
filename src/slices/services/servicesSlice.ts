import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IServiceState} from './interface/services.interface';

const initialState: IServiceState = {
  services: [],
  isLoading: false,
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    startLoadingServices: state => {
      state.isLoading = true;
    },
    setServices: (state, action: PayloadAction<IServiceState>) => {
      const {services} = action.payload;
      state.isLoading = false;
      state.services = services;
    },
  },
});
export const {startLoadingServices, setServices} = serviceSlice.actions;
