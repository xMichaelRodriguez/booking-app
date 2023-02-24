import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';
import {IAuthState} from './interfaces';

// Define the initial state using that type
const initialState: IAuthState = {
  isSigned: false,
  id: null,
  username: null,
  email: null,
  isActive: null,
  role: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'Auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    startLoadingLogin: state => {
      state.isLoading = true;
    },
    signIn: (state, action: PayloadAction<IAuthState>) => {
      const {email, id, username, isActive, role} = action.payload;
      state.email = email;
      state.id = id;
      state.username = username;
      state.isActive = isActive;
      state.role = role;
      state.isSigned = true;
      state.isLoading = false;
    },

    logout: state => {
      state.email = null;
      state.id = null;
      state.isActive = null;
      state.role = null;
      state.username = null;
      state.isSigned = false;
      state.isLoading = false;
    },
  },
});

export const {signIn, logout, startLoadingLogin} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

// export default counterSlice.reducer;
