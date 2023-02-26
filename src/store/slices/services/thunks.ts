import {backendApi} from '../../../API/backendApi';
import {retrieveUserSession} from '../../secure-session';
import {AppDispatch} from '../../store';
import {authLogout} from '../auth';
import {IService} from './interface/services.interface';
import {
  activeService,
  onClearService,
  setClearServices,
  setServices,
  startLoadingServices,
} from './servicesSlice';

export const getServices = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingServices());

    // TODO: get Token
    const session = await retrieveUserSession();

    if (!session) {
      dispatch(authLogout());
    } else {
      const sessionParsed = JSON.parse(session);
      // TODO: Make http request
      const {
        data: {data: services},
      } = await backendApi.get<{data: IService[]}>('/services', {
        headers: {
          Authorization: `Bearer ${sessionParsed.token}`,
        },
      });
      const newServicesList = services.filter(
        service => !service.thumbnail_url,
      );
      dispatch(setServices(newServicesList));
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
