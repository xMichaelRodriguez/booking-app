/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable n/no-callback-literal */
import axios from 'axios';
import moment from 'moment';
import {ToastAndroid} from 'react-native';

import {backendApi} from '../../../API/backendApi';
import {parserDate} from '../../../constants/dateParser';
import {COMPLETED_STATE_ID} from '../../../utils/state-id';
import {getUserSessionParsed} from '../../secure-session';
import {type AppDispatch, type RootState} from '../../store';
import {clearActiveService} from '../services/thunks';
import {onCloseSheetBooton} from '../ui/thunks';
import {onCancelLoadingUI, setMessage, startLoadingUI} from '../ui/uiSlice';
import {
  activeBook,
  onCancelLoading,
  onClearActiveBooking,
  onUpdateBooking,
  removeBook,
  setBookings,
  startLoadingBookings,
} from './bookingSlice';
import {
  type IBook,
  type IBookDB,
  type ICreateBook,
} from './interface/bookin.interface';

export const getBookings = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingBookings());

    const token = await getUserSessionParsed();
    try {
      // TOO: Make http request
      const {data} = await backendApi.get<IBookDB[]>('/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookings: IBook[] = data.map(item => {
        item = {...item, date: moment(item.date).toISOString()};
        let [date, hour] = item.date.split('T');
        hour = hour.slice(0, 5);
        return {...item, date, hour};
      });

      dispatch(setBookings(bookings));
      dispatch(onCancelLoading());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
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

export const createBooking = (
  booking: ICreateBook,
  cb: ({result}: {result: boolean}) => void,
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

      const dateParsed = parserDate(date);
      const newDate = moment(
        `${dateParsed}T${hour}:00Z`,
        'YYYY-MM-DDTHH:mm:ssZ',
      );
      const parsedDate = newDate.toISOString();
      const payload = {
        clientId,
        serviceId: isActiveService?.id,
        date: parsedDate,
      };
      await backendApi.post<IBook>('/bookings', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      ToastAndroid.showWithGravityAndOffset(
        'Orden Programada',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      dispatch(onClearActiveBooking());
      dispatch(clearActiveService());
      dispatch(onCancelLoadingUI());
      dispatch(getBookings());
      cb({result: true});
    } catch (error) {
      cb({
        result: false,
      });
      dispatch(onCancelLoadingUI());
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
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
  cb: ({result}: {result: boolean}) => void,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingUI());
    try {
      const parsedDate = parserDate(booking.date);
      const token = await getUserSessionParsed();

      const newDate = moment(`${parsedDate}T${booking.hour}Z`);
      const {
        auth: {id: clientId},
        bookings: {isBookingActive},
      } = getState();
      const payload = {
        clientId,
        serviceId: isBookingActive?.serviceId?.id,
        date: newDate,
        note: booking?.note,
      };
      if (isBookingActive != null) {
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
          'Booking Rescheduled',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        cb({
          result: true,
        });
        dispatch(setMessage('Booking Rescheduled'));

        const payloadToSave: IBook = {
          ...isBookingActive,
          date: parsedDate,
          hour: booking.hour,
          note: booking.note ?? '',
        };
        dispatch(onUpdateBooking(payloadToSave));
        dispatch(onClearActiveBooking());
        dispatch(clearActiveService());
        dispatch(onCancelLoadingUI());
      }
      dispatch(onClearActiveBooking());
      dispatch(clearActiveService());
      dispatch(onCancelLoadingUI());
    } catch (error) {
      cb({
        result: false,
      });
      dispatch(onCancelLoadingUI());
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
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
  return (dispatch: AppDispatch) => {
    dispatch(activeBook(booking));

    dispatch(onCancelLoadingUI());
  };
};

export const setCompleteBookingState = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const {isBookingActive} = getState().bookings;
    try {
      dispatch(startLoadingUI());
      const token = await getUserSessionParsed();
      if (isBookingActive != null) {
        await backendApi.patch(
          `/bookings/${isBookingActive.id}/update-states`,
          {stateId: COMPLETED_STATE_ID},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        ToastAndroid.showWithGravityAndOffset(
          'Completed Booking',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        await dispatch(getBookings());
        dispatch(onClearActiveBooking());
        dispatch(clearActiveService());
        dispatch(onCancelLoadingUI());
      }
    } catch (error) {
      dispatch(onCancelLoadingUI());
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
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

export const onDeleteBook = (cb: ({result}: {result: boolean}) => void) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingUI());
    const {isBookingActive} = getState().bookings;

    try {
      const token = await getUserSessionParsed();

      if (isBookingActive != null) {
        await backendApi.delete(`/bookings/${isBookingActive?.id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(onClearActiveBooking());
        dispatch(onCancelLoadingUI());
        dispatch(removeBook(isBookingActive));
        dispatch(onCloseSheetBooton());
        cb({result: true});
        ToastAndroid.showWithGravityAndOffset(
          'Booking Removed',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (error) {
      cb({
        result: false,
      });
      dispatch(onCancelLoadingUI());
      dispatch(onClearActiveBooking());
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
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
