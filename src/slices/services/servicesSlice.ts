import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IService, IServiceState} from './interface/services.interface';

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
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.isLoading = false;
      state.services = action.payload;
    },
    addService: (state, action: PayloadAction<IService>) => {
      state.services.push(action.payload);
    },
    updateService: (state, action: PayloadAction<IService>) => {
      state.services = state.services.map(service =>
        service.id === action.payload.id ? action.payload : service,
      );
    },
  },
});
export const {startLoadingServices, setServices, addService} =
  serviceSlice.actions;
