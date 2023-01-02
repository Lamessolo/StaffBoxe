import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-Item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems : CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
   // get a Handle to cart items
this.cartItems = this.cartService.cartItems;

   // suscribe to the cart totalPrice
this.cartService.totalPrice.subscribe(data=>{
  this.totalPrice = data;
});
  // suscribe to the cart totalQuantity
   this.cartService.totalQuantity.subscribe(data=>{
    this.totalQuantity = data;
  });
  // compute cart total price and quantity
  this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem : CartItem){
 this.cartService.decrementQuantity(cartItem);

  }
  computeCartTotals() {
    throw new Error('Method not implemented.');
  }
  remove(cartItem: CartItem) {
  
   this.cartService.remove(cartItem);
     }
  
}
