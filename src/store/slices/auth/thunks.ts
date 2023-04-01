/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from 'axios';
import {ToastAndroid} from 'react-native';

import {backendApi} from '../../../API/backendApi';
import {
  getUserSessionParsed,
  removeUserSession,
  storeUserSession,
} from '../../secure-session';
import {type AppDispatch, type RootState} from '../../store';
import {setClearBookings} from '../bookings/bookingSlice';
import {clearServices} from '../services/thunks';
import {onCancelLoadingUI, startLoadingUI} from '../ui/uiSlice';
import {logout, signIn, startLoadingLogin} from './authSlice';
import {
  type IAuthLogin,
  type IAuthRegister,
  type IAuthState,
  type ILoginState,
} from './interfaces';

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
      await dispatch(authLogout());
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

      dispatch(
        signIn({
          id,
          username,
          email,
          isActive,
          role,
          isLoading: false,
          isSigned: true,
        }),
      );
      dispatch(onCancelLoadingUI());
    } catch (error) {
      removeUserSession();
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
        if (errorData?.statusCode !== 200) {
          dispatch(onCancelLoadingUI());
          console.log({errorData});
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
      dispatch(
        signIn({
          id,
          username,
          email,
          isActive,
          role,
          isLoading: false,
          isSigned: true,
        }),
      );
    } catch (error) {
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

export const startRegister = (register: IAuthRegister) => {
  return async () => {
    try {
      await backendApi.post<IAuthLogin>('/auth/local/register', register);

      ToastAndroid.showWithGravityAndOffset(
        'Se ha enviado un correo electrónico para confirmar su cuenta',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
        if (errorData.statusCode !== 201)
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
        const errorData = error?.response?.data;
        if (errorData.statusCode !== 201)
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

export const subscribeNotifications = (token: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const {id: authId} = getState().auth;
      const isSubscribed = await checkSubscription(authId);
      if (!isSubscribed) {
        const jwtToken = await getUserSessionParsed();
        await backendApi.post(
          '/auth/subscriptions',
          {token},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        );

        ToastAndroid.showWithGravityAndOffset(
          'Notificaciones Activadas',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else return;
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Error al activar notificaciones',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
        console.debug({errorData});
      }
    }
  };
};

const checkSubscription = async (id: number) => {
  const token = await getUserSessionParsed();
  const {data} = await backendApi.get(`/auth/subscriptions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const authLogout = () => {
  return async (dispatch: AppDispatch) => {
    await removeUserSession();
    dispatch(setClearBookings());
    dispatch(clearServices());
    dispatch(logout());
  };
};
