import {createSlice} from '@reduxjs/toolkit';
type InitialProp = {
  isLoading: boolean;
};

const initialState: InitialProp = {
  isLoading: false,
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startLoadingUI: (state /*action*/) => {
      state.isLoading = true;
    },
    onCancelLoadingUI: state => {
      state.isLoading = false;
    },
  },
});
export const {startLoadingUI, onCancelLoadingUI} = uiSlice.actions;
