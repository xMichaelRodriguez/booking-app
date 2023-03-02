import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {backendApi} from '../../../API/backendApi';
import {ICreateBook} from '../../../screens/dashboard/booking/interface/createBook.interface';
import {getUserSessionParsed} from '../../secure-session';
import {AppDispatch, RootState} from '../../store';
import {clearActiveService} from '../services/thunks';
import {onCloseSheetBooton} from '../ui/thunks';
import {onCancelLoadingUI, startLoadingUI} from '../ui/uiSlice';
import {
  activeBook,
  onAddBook,
  onClearActiveBooking,
  onUpdateBooking,
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

const parsedDateToSave = async (booking: ICreateBook) => {
  const token = await getUserSessionParsed();
  const {date, hour} = booking;
  const newDate = new Date(`${date}T${hour}`);
  const parsedDate = newDate.toISOString();
  return {parsedDate, token};
};

export const createBooking = (
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
      dispatch(onClearActiveBooking());
      dispatch(clearActiveService());
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

export const updateBooking = (
  booking: ICreateBook,
  cb: (result: boolean) => void,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(startLoadingUI());
      const {parsedDate, token} = await parsedDateToSave(booking);

      const {
        auth: {id: clientId},
        bookings: {isBookingActive},
      } = getState();
      const payload = {
        clientId,
        serviceId: isBookingActive?.serviceId?.id,
        date: parsedDate,
      };
      await backendApi.patch<IBook>(
        `/bookings/${isBookingActive?.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      ToastAndroid.showWithGravityAndOffset(
        'Booking Reschedule',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      if (isBookingActive) {
        const payloadToSave: IBook = {
          ...isBookingActive,
          date: booking.date,
          hour: booking.hour,
          note: booking.note ?? '',
        };
        dispatch(onUpdateBooking(payloadToSave));
      }
      dispatch(onClearActiveBooking());
      dispatch(clearActiveService());
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
    dispatch(onCancelLoadingUI());
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
