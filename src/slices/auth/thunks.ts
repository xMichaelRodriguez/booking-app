import axios from 'axios';
import {backendApi} from '../../API/backendApi';
import {ToastAndroid} from 'react-native';
import {AppDispatch, storeUserSession} from '../../store';
import {signIn} from './authSlice';
import {IAuthLogin, IAuthRegister, ILoginState} from './interfaces';

export const startLogin = (login: ILoginState) => {
  return async (dispatch: AppDispatch) => {
    try {
      const {data, status} = await backendApi.post<IAuthLogin>(
        '/auth/local/login',
        login,
      );

      console.warn({status});
      const {user, jwt} = data;
      const {id, username, email, isActive, role} = user;
      storeUserSession(jwt.accessToken);

      dispatch(signIn({id, username, email, isActive, role}));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response && error.response.data;

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
