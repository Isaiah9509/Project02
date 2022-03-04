import { ITicket } from '../interfaces/ITicket';
import { IUser } from '../interfaces/IUser';

//purchaseID and userID in the database have the stored ticket and user info we need
export interface IPurchase {
  id?: number;
  price: number;
  tickets: ITicket[];
  owner: IUser;
}
