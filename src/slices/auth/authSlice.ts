import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';
import {IAuthState} from './interfaces';

// Define the initial state using that type
const initialState = {isSigned: false} as IAuthState;

export const authSlice = createSlice({
  name: 'Auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IAuthState>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.isActive = action.payload.isActive;
      state.isSigned = true;
    },
  },
});

export const {signIn} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

// export default counterSlice.reducer;
