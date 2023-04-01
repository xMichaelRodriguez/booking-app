/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IService {
  id: number;
  name: string;
  description: string;
  price: string;
  publicId: string;
  secureUrl: string;
}

export interface IServiceSerializer {
  data: IService[];
  nextPage: string;
  prevPage: string;
  total: number;
}

export interface IServiceState {
  isLoadingService: boolean;
  services: IService[];
  isActiveService: IService | null;
  nextPage: string;
  prevPage: string;
}

export interface IServiceForm {
  name: string;
  description: string;
  price: string;
  image: any;
}
