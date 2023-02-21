import {backendApi} from '../../API/backendApi';
import {AppDispatch, retrieveUserSession} from '../../store';
import {IServiceState} from './interface/services.interface';
import {setServices, startLoadingServices} from './servicesSlice';

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
      const {data} = await backendApi.get<IServiceState>('/services', {
        headers: {
          Authorization: `Bearer ${sessionParsed.token}`,
        },
      });
      dispatch(setServices(data));
    }
  };
};
