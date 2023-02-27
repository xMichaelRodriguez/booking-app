import {IAuthState} from '../../auth/interfaces';
import {IService} from '../../services/interface/services.interface';

export interface IBookState {
  bookings: IBook[];
  isLoading: boolean;
  isBookingActive: IBook | null;
}

export interface IBook {
  client: IAuthState | number | null;
  service: IService | null;
  date: string | null;
  hour: string | null;
}
