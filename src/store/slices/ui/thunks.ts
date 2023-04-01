import {type AppDispatch} from '../../store';
import {onClearActiveBooking} from '../bookings/bookingSlice';
import {clearActiveService} from '../services/thunks';

export const onCloseSheetBooton = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(onClearActiveBooking());
    dispatch(clearActiveService());
  };
};
