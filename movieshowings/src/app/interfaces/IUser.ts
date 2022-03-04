import { IPurchase } from "../interfaces/IPurchase";
import { ITicket } from "./ITicket";

export interface IUser {
    id?: string;
    first?: string;
    last?: string;
    email: string;
    password: string;
    purchases?:IPurchase;
    tickets?:ITicket;
}
