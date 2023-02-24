import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IService, IServiceState} from './interface/services.interface';

const initialState: IServiceState = {
  services: [],
  isLoading: false,
  isActiveService: null,
  next: '',
  previus: '',
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    startLoadingServices: state => {
      state.isLoading = true;
    },
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.isLoading = false;
      state.services = action.payload;
    },

    activeService: (state, action: PayloadAction<IService>) => {
      state.isActiveService = action.payload;
    },
    onClearService: state => {
      state.isActiveService = null;
    },
  },
});
export const {
  startLoadingServices,
  setServices,
  activeService,
  onClearService,
} = serviceSlice.actions;
