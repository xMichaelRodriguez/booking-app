import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {backendApi} from '../../API/backendApi';
import {AppDispatch, retrieveUserSession} from '../../store';
import {ICreateService, IService} from './interface/services.interface';
import {addService, setServices, startLoadingServices} from './servicesSlice';

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
      console.log('NECESITA INICIAR SESSION');
    } else {
      const sessionParsed = JSON.parse(session);
      try {
        // TODO: Make http request
        const {data, status, statusText} = await backendApi.post<IService>(
          '/services',
          service,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionParsed.token}`,
            },
          },
        );
        console.log({status, statusText});
        if (status !== 201) {
          return ToastAndroid.showWithGravityAndOffset(
            statusText,
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
