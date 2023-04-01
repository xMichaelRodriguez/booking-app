import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
interface InitialProp {
  isLoading: boolean;
  snackVisible: boolean;
  message: string;
}

const initialState: InitialProp = {
  isLoading: false,
  snackVisible: false,
  message: '',
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startLoadingUI: (state /* action */) => {
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
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: state => {
      state.message = '';
    },
  },
});
export const {
  clearMessage,
  onCancelLoadingUI,
  onDismissSnackBar,
  onToggleSnackBar,
  setMessage,
  startLoadingUI,
} = uiSlice.actions;
