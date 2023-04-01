import {type Moment} from 'moment';

import {type IService} from '../../services/interface/services.interface';

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
  date: string;
  hour: string;
  note: string | null;
}
export interface IBookDB extends IBook {
  id: number;
  clientId: IUser | number | null;
  serviceId: IService | null;
  statusId: IState;
  date: string;
  note: string | null;
}

interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface IState {
  id: number;
  name: string;
}
export interface ICreateBook {
  date: Date | Moment | string;
  hour: string;
  note?: string;
}
