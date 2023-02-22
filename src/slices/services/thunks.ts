import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {backendApi} from '../../API/backendApi';
import {AppDispatch, retrieveUserSession, RootState} from '../../store';
import {logout} from '../auth';
import {ICreateService, IService} from './interface/services.interface';
import {
  activeService,
  addService,
  onClearService,
  setServices,
  startLoadingServices,
} from './servicesSlice';

export const getServices = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingServices());

    // TODO: get Token
    const session = await retrieveUserSession();

    if (!session) {
      console.log('NECESITA INICIAR SESSION');
    } else {
      const sessionParsed = JSON.parse(session);
      // TODO: Make http request
      const {data} = await backendApi.get<IService[]>('/services', {
        headers: {
          Authorization: `Bearer ${sessionParsed.token}`,
        },
      });
      dispatch(setServices(data));
    }
  };
};

export const createService = (service: ICreateService) => {
  return async (dispatch: AppDispatch) => {
    // TODO: get Token
    const session = await retrieveUserSession();

    if (!session) {
      return dispatch(logout());
    } else {
      const sessionParsed = JSON.parse(session);
      try {
        // TODO: Make http request
        const {data} = await backendApi.post<IService>('/services', service, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionParsed.token}`,
          },
        });

        ToastAndroid.showWithGravityAndOffset(
          'Service Created',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );

        dispatch(addService(data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorData = error.response && error.response.data;
          if (errorData.statusCode !== 201) {
            ToastAndroid.showWithGravityAndOffset(
              errorData.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        }
      }
    }
  };
};

export const updateService = (service: IService) => {
  return async (dispatch: AppDispatch) => {
    // TODO: get Token
    const session = await retrieveUserSession();

    if (!session) {
      console.log('NECESITA INICIAR SESSION');
    } else {
      const sessionParsed = JSON.parse(session);
      try {
        // TODO: Make http request
        const {data, status} = await backendApi.patch<IService>(
          `/services/${service.id}`,
          service,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionParsed.token}`,
            },
          },
        );
        if (status === 200) {
          return ToastAndroid.showWithGravityAndOffset(
            'Updated',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        dispatch(addService(data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorData = error.response && error.response.data;
          if (errorData.statusCode !== 201) {
            ToastAndroid.showWithGravityAndOffset(
              errorData.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
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

export const setDeleteService = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const {isActiveService} = getState().service;
    // TODO: get Token
    const session = await retrieveUserSession();

    if (!session) {
      console.log('NECESITA INICIAR SESSION');
    } else {
      backendApi.delete(`/services/${isActiveService?.id}`, {headers: {}});
    }
  };
};
