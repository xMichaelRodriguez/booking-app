import {createSlice} from '@reduxjs/toolkit';
type InitialProp = {
  isLoading: boolean;
  snackVisible: boolean;
};

const initialState: InitialProp = {
  isLoading: false,
  snackVisible: false,
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
    onToggleSnackBar: state => {
      state.snackVisible = !state.snackVisible;
    },
    onDismissSnackBar: state => {
      state.snackVisible = false;
    },
  },
});
export const {
  startLoadingUI,
  onCancelLoadingUI,
  onToggleSnackBar,
  onDismissSnackBar,
} = uiSlice.actions;
