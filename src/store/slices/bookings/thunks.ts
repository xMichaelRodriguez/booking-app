import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {backendApi} from '../../../API/backendApi';
import {parserDate} from '../../../constants/dateParser';
import {COMPLETED_STATE_ID} from '../../../utils/state-id';
import {getUserSessionParsed} from '../../secure-session';
import {AppDispatch, RootState} from '../../store';
import {clearActiveService} from '../services/thunks';
import {onCloseSheetBooton} from '../ui/thunks';
import {onCancelLoadingUI, startLoadingUI} from '../ui/uiSlice';
import {
  activeBook,
  onCancelLoading,
  onClearActiveBooking,
  onUpdateBooking,
  removeBook,
  setBookings,
  startLoadingBookings,
} from './bookingSlice';
import {IBook, IBookDB, ICreateBook} from './interface/bookin.interface';

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
        item = {...item, date: new Date(item.date).toISOString()};
        let [date, hour] = item.date.split('T');
        hour = hour.slice(0, 5);
        return {...item, date, hour};
      });

      dispatch(setBookings(bookings));
      dispatch(onCancelLoading());
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

      const dateParsed = parserDate(date);
      const newDate = new Date(`${dateParsed}T${hour}Z`);
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

      const resp: IBook = {...data, date: new Date(data.date).toISOString()};
      const [isoDate, isoHour] = resp.date.split('T');

      const newHour = isoHour.slice(0, 5);
      const newBooking = {...resp, date: isoDate, hour: newHour};
      console.debug({newBooking});
      ToastAndroid.showWithGravityAndOffset(
        'Booking Confirmed',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      dispatch(onClearActiveBooking());
      dispatch(clearActiveService());
      dispatch(onCancelLoadingUI());
      dispatch(getBookings());
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
      const parsedDate = parserDate(booking.date);
      const token = await getUserSessionParsed();

      const newDate = new Date(`${parsedDate}T${booking.hour}Z`);
      const {
        auth: {id: clientId},
        bookings: {isBookingActive},
      } = getState();
      const payload = {
        clientId,
        serviceId: isBookingActive?.serviceId?.id,
        date: newDate,
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
      cb(true);

      if (isBookingActive) {
        const payloadToSave: IBook = {
          ...isBookingActive,
          date: parsedDate,
          hour: booking.hour,
          note: booking.note ?? '',
        };
        dispatch(onUpdateBooking(payloadToSave));
      }
      dispatch(onClearActiveBooking());
      dispatch(clearActiveService());
      dispatch(onCancelLoadingUI());
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
    await dispatch(activeBook(booking));
    dispatch(onCancelLoadingUI());
  };
};

export const setCompleteBookingState = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const {isBookingActive} = getState().bookings;
    try {
      dispatch(startLoadingUI());
      const token = await getUserSessionParsed();

      await backendApi.patch(
        `/bookings/${isBookingActive?.id}/update-states`,
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
    } catch (error) {
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
