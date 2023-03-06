import {IService} from '../../services/interface/services.interface';

export interface IBookState {
  bookings: IBook[];
  isLoading: boolean;
  isBookingActive: IBook | null;
}

export interface IBook {
  id: number;
  clientId: IUser | number | null;
  serviceId: IService | null;
  statusId: IState;
  date: string | null;
  hour: string | null;
  note: string | null;
}
interface IUser {
  id: number;
  username: string;
  email: string;
}

interface IState {
  id: number;
  name: string;
}
export interface ICreateBook {
  date: Date;
  hour: string;
  note?: string;
}
