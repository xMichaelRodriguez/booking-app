export interface IServiceState {
  services: IService[];
  isLoading: boolean;
  isActiveService: IService | null;
  next: string;
  previus: string;
}

export interface IService {
  id: number;
  caption: string;
  media_url: string;
  thumbnail_url?: string;
}
