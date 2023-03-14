import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {backendApi} from '../../../API/backendApi';
import {getUserSessionParsed, removeUserSession} from '../../secure-session';
import {AppDispatch, RootState} from '../../store';
import {authLogout} from '../auth';
import {IService, IServiceSerializer} from './interface/services.interface';
import {
  activeService,
  onClearService,
  setClearServices,
  setNewServices,
  setServices,
  startLoadingServices,
} from './servicesSlice';

export const getServices = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingServices());
    try {
      // TODO: get Token
      const token = await getUserSessionParsed();
      // TODO: Make http request
      const {data} = await backendApi.get<IServiceSerializer>('/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setServices(data));
    } catch (error) {
      removeUserSession();
      dispatch(authLogout());
    }
  };
};

export const addNewService = (service: any, cb: (message: string) => void) => {
  return async (dispatch: AppDispatch) => {
    const formData = new FormData();
    formData.append('name', service.name);
    formData.append('description', service.description);
    formData.append('price', service.price);
    formData.append('image', service.image);

    try {
      // const token = await getUserSessionParsed();
      // await backendApi.post('/services', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      cb(`service: '${service.name}' Created`);
      dispatch(service);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response && error.response.data;
        if (errorData?.statusCode !== 200) {
          cb(errorData.message);
          return ToastAndroid.showWithGravityAndOffset(
            errorData.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      }
    }
  };
};

export const getNewServices = (url: string = '') => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const {services} = getState().service;
    try {
      const token = await getUserSessionParsed();
      const {data} = await axios.get<IServiceSerializer>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newData = {
        nextPage: data.nextPage,
        prevPage: data.prevPage,
        total: data.total,
        data: [...services, ...data.data],
      };
      dispatch(setNewServices(newData));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response && error.response.data;
        if (errorData?.statusCode !== 200) {
          return ToastAndroid.showWithGravityAndOffset(
            errorData.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      }
    }
  };
};

export const setActiveService = (service: IService) => {
  return async (dispatch: AppDispatch) => {
    dispatch(activeService(service));
  };
};
export const clearActiveService = () => {
  return (dispatch: AppDispatch) => {
    dispatch(onClearService());
  };
};

export const clearServices = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setClearServices());
  };
};
