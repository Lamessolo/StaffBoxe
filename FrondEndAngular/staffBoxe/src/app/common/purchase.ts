import { Address } from "./address";
import { Order } from "./order";
import { OrderItem } from "./orderItem";
import { User } from "./user";

export class Purchase{
    user!: User;
    shippingAddress! : Address;
    billingAddress !: Address;
    order!: Order;
    orderItems!: OrderItem[];

    constructor(){
   
    }
}