import { Address } from "./address";
import { Adherent } from "./adherent";
import { Order } from "./order";
import { OrderItem } from "./orderItem";
import { User } from "./user";

export class Purchase{
    user!: User;
    adherentCreate! : Adherent;
    shippingAddress! : Address;
    billingAddress !: Address;
    order!: Order;
    orderItems!: OrderItem[];

    constructor(){
   
    }
}