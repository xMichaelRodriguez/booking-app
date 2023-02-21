export interface IServiceState {
  services: IService[];
  isLoading: boolean;
}

export interface IService {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ICreateService {
  name: string;
  description: string;
  price: number;
}