import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-Item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[]=[]
  totalPrice : Subject<number> = new Subject<number>();
  totalQuantity : Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(thecartItem : CartItem){
  // Check if item is already in the cart  

  let alreadyExistsInCart : boolean = false ;
  let existingCartItem : CartItem | undefined = undefined; ; 
  if(this.cartItems.length > 0){
 // find the item in the cart based on item id
 /*for(let tempCartItem of this.cartItems){
        if(tempCartItem.id===thecartItem.id){
          existingCartItem = tempCartItem;
          break;
        }*/
        existingCartItem = this.cartItems.find(
          tempCartItem=> tempCartItem.id === thecartItem.id
          );
          alreadyExistsInCart = (existingCartItem != undefined);
 }
  
if(alreadyExistsInCart){
  // increment the quantity
  existingCartItem!.quantity++;
}else{
  // just add items to the array
 this.cartItems.push(thecartItem);
}
  // check if we found it
this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue : number = 0;
 for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity }

      // publish the news value
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);
      // log cart data for debugging
      this.logCartData(totalPriceValue,totalQuantityValue);
  }
  // log cart data for debugging
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('content of the cart :');
    for(let tempCartItem of this.cartItems){
    const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
    console.log(`name: ${tempCartItem.name}
                ,quantity: ${tempCartItem.quantity}
                ,unitPrice: ${tempCartItem.unitPrice}
                ,subTotalPrice: ${subTotalPrice}`);
    }

    console.log(`totalPrice:${totalPriceValue.toFixed(2)}
    , totalQuantity:${totalQuantityValue}`);
    console.log('---------');

    
  }
}
