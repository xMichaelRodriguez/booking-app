import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';
import {IAuthState} from './interfaces';

// Define the initial state using that type
const initialState = {isSigned: false} as IAuthState;

export const authSlace = createSlice({
  name: 'Auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IAuthState>) => {
      state = action.payload;
    },
  },
});

export const {signIn} = authSlace.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

// export default counterSlice.reducer;
