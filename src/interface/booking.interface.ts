import {IService} from '../slices/services/interface/services.interface';

export interface IBooking {
  id: number;
  service: IService;
  client: IClient;
  status: IState;
  date: string;
  hour: string;
}

interface IClient {
  id: number;
  username: string;
  email: string;
}

export interface IState {
  id: number;
  name: string;
}
