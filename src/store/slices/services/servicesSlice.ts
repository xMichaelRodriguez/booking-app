import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IService,
  IServiceSerializer,
  IServiceState,
} from './interface/services.interface';

const initialState: IServiceState = {
  services: [],
  isLoadingService: false,
  isActiveService: null,
  nextPage: '',
  prevPage: '',
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    startLoadingServices: state => {
      state.isLoadingService = true;
    },
    setServices: (state, action: PayloadAction<IServiceSerializer>) => {
      state.isLoadingService = false;
      state.services = action.payload.data;
      state.prevPage = action.payload.prevPage;
      state.nextPage = action.payload.nextPage;
    },
    setNewServices: (state, action: PayloadAction<IServiceSerializer>) => {
      state.isLoadingService = false;
      state.services = action.payload.data;
      state.prevPage = action.payload.prevPage;
      state.nextPage = action.payload.nextPage;
    },

    activeService: (state, action: PayloadAction<IService>) => {
      state.isActiveService = action.payload;
    },
    onClearService: state => {
      state.isActiveService = null as unknown as IService;
    },
    setClearServices: state => {
      state.isActiveService = null;
      state.isLoadingService = false;
      state.nextPage = '';
      state.prevPage = '';
      state.services = [];
    },
    onAddService: (state, action: PayloadAction<IService>) => {
      state.services.push(action.payload);
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
