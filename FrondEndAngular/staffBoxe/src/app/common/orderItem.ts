import { CartItem } from "./cart-Item";

export class OrderItem{
    imageUrl : string;
    unitPrice: number;
    quantity : number;
    sectionId : number; 

    constructor(cartItem : CartItem){
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.sectionId = cartItem.id;
    }
 }
