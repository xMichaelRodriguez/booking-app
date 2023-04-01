/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable n/no-callback-literal */
import axios from 'axios';
import {ToastAndroid} from 'react-native';

import {backendApi} from '../../../API/backendApi';
import {getUserSessionParsed, removeUserSession} from '../../secure-session';
import {type AppDispatch, type RootState} from '../../store';
import {authLogout} from '../auth';
import {onCancelLoadingUI, startLoadingUI} from '../ui/uiSlice';
import {
  type IService,
  type IServiceForm,
  type IServiceSerializer,
} from './interface/services.interface';
import {
  activeService,
  onClearService,
  onDelete,
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
      dispatch(onCancelLoadingUI());
    } catch (error) {
      dispatch(onCancelLoadingUI());
      removeUserSession();
      dispatch(authLogout());
    }
  };
};

export const addNewService = (
  service: IServiceForm,
  cb: ({message}: {message: string}) => void,
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingUI());
    try {
      const formData = formDataGenerator(service);

      const token = await getUserSessionParsed();
      await backendApi.post<IService>('/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getServices());
      dispatch(onCancelLoadingUI());
      cb({message: `service: ${service.name} Created`});
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
        if (errorData?.statusCode !== 200) {
          cb({message: errorData.message[0]});
          return;
        }
      }

      ToastAndroid.showWithGravityAndOffset(
        'Error',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };
};

const formDataGenerator = (service: IServiceForm) => {
  const formData = new FormData();
  formData.append('name', service.name);
  formData.append('description', service.description);
  formData.append('price', service.price);
  formData.append('image', {
    uri: service.image[0].uri,
    type: service.image[0].type,
    name: service.image[0].fileName,
  });
  return formData;
};
export const getNewServices = (url = '') => {
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
        const errorData = error?.response?.data;
        if (errorData?.statusCode !== 200)
          ToastAndroid.showWithGravityAndOffset(
            errorData.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
      }
    }
  };
};

export const removeService = (
  cb: ({isRemoved}: {isRemoved: boolean}) => void,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const {isActiveService} = getState().service;
    if (isActiveService == null) return;

    dispatch(startLoadingUI());
    try {
      const token = await getUserSessionParsed();
      const {id} = isActiveService;
      await backendApi.delete(`/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(onDelete(isActiveService));
      cb({isRemoved: true});
      dispatch(onCancelLoadingUI());
      ToastAndroid.showWithGravityAndOffset(
        'The service has been deleted',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    } catch (error) {
      cb({isRemoved: false});
      dispatch(onCancelLoadingUI());
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
        if (errorData?.statusCode !== 200)
          ToastAndroid.showWithGravityAndOffset(
            errorData.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
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
