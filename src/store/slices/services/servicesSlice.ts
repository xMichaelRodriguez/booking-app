import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IService,
  IServiceSerializer,
  IServiceState,
} from './interface/services.interface';

const initialState: IServiceState = {
  services: [],
  isLoading: false,
  isActiveService: null,
  nextPage: null,
  prevPage: null,
  total: 0,
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    startLoadingServices: state => {
      state.isLoading = true;
    },
    setServices: (state, action: PayloadAction<IServiceSerializer>) => {
      state.isLoading = false;
      state.services = action.payload.data;
      state.total = action.payload.total;
      state.prevPage = action.payload.prevPage;
      state.nextPage = action.payload.nextPage;
    },
    setNewServices: (state, action: PayloadAction<IServiceSerializer>) => {
      state.isLoading = false;
      state.services = action.payload.data;
      state.total = action.payload.total;
      state.prevPage = action.payload.prevPage;
      state.nextPage = action.payload.nextPage;
    },

    activeService: (state, action: PayloadAction<IService>) => {
      state.isActiveService = action.payload;
    },
    onClearService: state => {
      state.isActiveService = null;
    },
    setClearServices: state => {
      state.isActiveService = null;
      state.isLoading = false;
      state.nextPage = null;
      state.prevPage = null;
      state.services = [];
    },
  },
});
export const {
  startLoadingServices,
  setServices,
  activeService,
  onClearService,
  setNewServices,
  setClearServices,
} = serviceSlice.actions;
