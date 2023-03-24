import axios from 'axios';
import {backendApi} from '../../../API/backendApi';
import {ToastAndroid} from 'react-native';
import {AppDispatch} from '../../store';
import {logout, signIn, startLoadingLogin} from './authSlice';
import {IAuthLogin, IAuthRegister, IAuthState, ILoginState} from './interfaces';
import {
  getUserSessionParsed,
  removeUserSession,
  storeUserSession,
} from '../../secure-session';
import {clearServices} from '../services/thunks';
import {setClearBookings} from '../bookings/bookingSlice';
import {onCancelLoadingUI, startLoadingUI} from '../ui/uiSlice';

export const checkIsAuthenticated = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(startLoadingLogin());
      const token = await getUserSessionParsed();

      // TODO: Make http request

      const {data} = await backendApi.get<IAuthState>('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(startLoadingLogin());
      dispatch(signIn(data));
    } catch (error) {
      await removeUserSession();
      return dispatch(authLogout());
    }
  };
};
export const startLogin = (login: ILoginState) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingUI());
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
      await storeUserSession(jwt.accessToken);

      dispatch(signIn({id, username, email, isActive, role}));
      dispatch(onCancelLoadingUI());
    } catch (error) {
      removeUserSession();
      if (axios.isAxiosError(error)) {
        const errorData = error.response && error.response.data;
        if (errorData?.statusCode !== 200) {
          dispatch(onCancelLoadingUI());
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

export const starLoginGoogle = (accessToken: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingUI());
    try {
      const {data} = await backendApi.get<IAuthLogin>(
        `/auth/google-accesses?access_token=${accessToken}`,
      );

      const {user, jwt} = data;
      const {id, username, email, isActive, role} = user;
      await storeUserSession(jwt.accessToken);

      dispatch(onCancelLoadingUI());
      dispatch(signIn({id, username, email, isActive, role}));
    } catch (error) {
      dispatch(onCancelLoadingUI());
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

export const requestResetPasswordToken = (data: {email: string}) => {
  return async () => {
    try {
      await backendApi.patch('/auth/request-reset-password', data);

      ToastAndroid.showWithGravityAndOffset(
        'Email has been sent to reset password',
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
  return async (dispatch: AppDispatch) => {
    await removeUserSession();
    dispatch(setClearBookings());
    dispatch(clearServices());
    removeUserSession();
    dispatch(logout());
  };
};
