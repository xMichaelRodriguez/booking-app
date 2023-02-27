import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {backendApi} from '../../../API/backendApi';
import {getUserSessionParsed} from '../../secure-session';
import {AppDispatch} from '../../store';
import {onAddBook, setBookings, startLoadingBookings} from './bookingSlice';
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

export const createBook = (booking: IBook) => {
  return async (dispatch: AppDispatch) => {
    const token = await getUserSessionParsed();

    try {
      const {date, hour, client: clientId, service: serviceId} = booking;
      const newDate = new Date(`${date}T${hour}`).toISOString();
      const payload = {
        clientId: typeof clientId === 'number' ? clientId : clientId?.id,
        serviceId: serviceId?.id,
        date: newDate,
      };
      const {data} = await backendApi.post<IBook>('/bookings', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(onAddBook(data));
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
