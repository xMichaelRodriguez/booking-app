export interface IServiceState {
  services: IService[];
  isLoading: boolean;
  isActiveService: IService | null;
  nextPage: string | null;
  prevPage: string | null;
  total: number;
}

export interface IService {
  id: number;
  igPostId: string;
  caption: string;
  mediaUrl: string;
}

export interface IServiceSerializer {
  data: IService[];
  nextPage: string | null;
  prevPage: string | null;
  total: number;
}
