import {backendApi} from '../../API/backendApi';
import {AppDispatch} from '../../store';
import {signIn} from './authSlice';
import {IAuthState, ILoginState} from './interfaces';

export const startLogin = (login: ILoginState) => {
  return async (dispatch: AppDispatch) => {
    const {data} = await backendApi.post<IAuthState>(
      '/auth/local/login',
      login,
    );
    console.log({data});
    const {id, username, email, isActive} = data;

    dispatch(signIn({id, username, email, isActive}));
  };
};
