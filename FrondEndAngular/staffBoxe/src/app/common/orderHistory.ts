import { User } from "./user";

export interface OrderHistory {

   orderTrackingNumber : string,
   totalPrice: number,
   totalQuantity : number,
   dateCreated: Date,
   user : User 
   
}