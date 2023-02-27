import {IAuthState} from '../../auth/interfaces';
import {IService} from '../../services/interface/services.interface';

export interface IBookState {
  client: IAuthState | null;
  service: IService | null;
  date: string | null;
  hour: string | null;
}
