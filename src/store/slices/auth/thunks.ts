import axios from 'axios';
import {backendApi} from '../../../API/backendApi';
import {ToastAndroid} from 'react-native';
import {AppDispatch} from '../../store';
import {logout, signIn, startLoadingLogin} from './authSlice';
import {IAuthLogin, IAuthRegister, IAuthState, ILoginState} from './interfaces';
import {
  removeUserSession,
  retrieveUserSession,
  storeUserSession,
} from '../../secure-session';
import {clearServices} from '../services/thunks';

export const checkIsAuthenticated = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(startLoadingLogin());
      // TODO: get Token
      const session = await retrieveUserSession();

      if (!session) {
        await removeUserSession();
        return dispatch(authLogout());
      }

      const sessionParsed = JSON.parse(session);
      // TODO: Make http request
      const {data} = await backendApi.get<IAuthState>('/auth/me', {
        headers: {
          Authorization: `Bearer ${sessionParsed.token}`,
        },
      });

      dispatch(signIn(data));
    } catch (error) {
      await removeUserSession();
      return dispatch(authLogout());
    }
  };
};
export const startLogin = (login: ILoginState) => {
  return async (dispatch: AppDispatch) => {
    try {
      const {data} = await backendApi.post<IAuthLogin>(
        '/auth/local/login',
        login,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const {user, jwt} = data;
      const {id, username, email, isActive, role} = user;
      storeUserSession(jwt.accessToken);

      dispatch(signIn({id, username, email, isActive, role}));
    } catch (error) {
      removeUserSession();
      if (axios.isAxiosError(error)) {
        console.debug(error);
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

export const startRegister = (register: IAuthRegister) => {
  return async () => {
    try {
      await backendApi.post<IAuthLogin>('/auth/local/register', register);

      ToastAndroid.showWithGravityAndOffset(
        'Email has been sent to confirm your account',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
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
  };
};

export const authLogout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(clearServices());
    dispatch(logout());
  };
};
