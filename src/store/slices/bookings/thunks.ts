import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {backendApi} from '../../../API/backendApi';
import {ICreateBook} from '../../../screens/dashboard/booking/interface/createBook.interface';
import {getUserSessionParsed} from '../../secure-session';
import {AppDispatch, RootState} from '../../store';
import {onCloseSheetBooton} from '../ui/thunks';
import {onCancelLoadingUI, startLoadingUI} from '../ui/uiSlice';
import {
  activeBook,
  onAddBook,
  onClearActiveBooking,
  removeBook,
  setBookings,
  startLoadingBookings,
} from './bookingSlice';
import {IBook} from './interface/bookin.interface';

export const getBookings = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingBookings());

    const token = await getUserSessionParsed();
    try {
      // TOO: Make http request
      const {data} = await backendApi.get<IBook[]>('/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setBookings(data));
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

export const createBook = (
  booking: ICreateBook,
  cb: (result: boolean) => void,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingUI());
    const {
      auth: {id: clientId},
      service: {isActiveService},
    } = getState();
    try {
      const token = await getUserSessionParsed();
      const {date, hour} = booking;
      const newDate = new Date(`${date}T${hour}`);
      const parsedDate = newDate.toISOString();
      const payload = {
        clientId,
        serviceId: isActiveService?.id,
        date: parsedDate,
      };
      const {data} = await backendApi.post<IBook>('/bookings', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      ToastAndroid.showWithGravityAndOffset(
        'Booking Confirmed',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      dispatch(onAddBook(data));
      dispatch(onCancelLoadingUI());
      cb(true);
    } catch (error) {
      cb(false);
      dispatch(onCancelLoadingUI());
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

export const setActiveBooking = (booking: IBook) => {
  return async (dispatch: AppDispatch) => {
    dispatch(activeBook(booking));
  };
};

export const onDeleteBook = (cb: (result: boolean) => void) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingUI());
    const {isBookingActive} = getState().bookings;

    try {
      const token = await getUserSessionParsed();
      await backendApi.delete(`/bookings/${isBookingActive?.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (isBookingActive) {
        dispatch(onClearActiveBooking());
        dispatch(onCancelLoadingUI());
        dispatch(removeBook(isBookingActive));
        dispatch(onCloseSheetBooton());
        cb(true);
        ToastAndroid.showWithGravityAndOffset(
          'Booking Removed',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (error) {
      cb(false);
      dispatch(onCancelLoadingUI());
      dispatch(onClearActiveBooking());
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
