import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IService, IServiceState} from './interface/services.interface';

const initialState: IServiceState = {
  services: [],
  isLoading: false,
  isActiveService: null,
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
  addService,
  activeService,
  onClearService,
} = serviceSlice.actions;
