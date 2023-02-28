import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {backendApi} from '../../../API/backendApi';
import {
  getUserSessionParsed,
  removeUserSession,
  retrieveUserSession,
} from '../../secure-session';
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

    // TODO: get Token
    const session = await retrieveUserSession();

    if (!session) {
      removeUserSession();
      dispatch(authLogout());
    } else {
      const sessionParsed = JSON.parse(session);
      // TODO: Make http request
      const {data} = await backendApi.get<IServiceSerializer>('/services', {
        headers: {
          Authorization: `Bearer ${sessionParsed.token}`,
        },
      });
      dispatch(setServices(data));
    }
  };
};

export const getNewServices = (url: string = '') => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const {services} = getState().service;
    try {
      const token = await getUserSessionParsed();
      url = url.replace('localhost', '192.168.1.10');
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
