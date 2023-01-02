import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-Item';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/orderItem';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
      countries:Country[] = [];
      states : State[] = [];
      checkoutFormGroup !: FormGroup ;
      totalPrice :  number = 0;
      totalQuantity : number = 0;
      creditCardMonths: number[] = [];
      creditCardYears: number[] = [];
      shippingAddressStates: State[]= [];
      billingAddressStates : State[]= [];
  constructor(private formBuilder :FormBuilder,
              private cartService : CartService,
              private checkoutService: CheckoutService,
              private router : Router,
        private luv2ShopFormService: Luv2ShopFormService) { }

  ngOnInit(): void {
    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      user : this.formBuilder.group({
        email: new FormControl('',
        [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        name :new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        lastName : new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        phone :new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
      }),
      shippingAddress : this.formBuilder.group({
        street : new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
          city : new FormControl('',
          [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
          state :new FormControl('',[Validators.required]),
          country:new FormControl('',[Validators.required]),
          zipCode:new FormControl('',
          [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace])
        }),
      billingAddress : this.formBuilder.group({
        street : new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        city : new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        state : new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode:new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace])
          }),
      creditCardInformation : this.formBuilder.group({
            cardType : new FormControl('',[Validators.required]),
              nameOnCard : new FormControl('',
              [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
              cardNumber :  new FormControl('',[Validators.pattern('[0-9]{16}')]),
              securityCode:new FormControl('',[Validators.pattern('[0-9]{3}')]),
              expirationMonth:[''],
              expirationYear:['']
            })
    });

    // Populate credit card month

const startMonth : number = new Date().getMonth() + 1;
console.log("starMonth:" + startMonth);
this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
  (data)=>{
    console.log("retrieved credit card month : " + JSON.stringify(data));
    this.creditCardMonths=data;

  });
    // Populate credit card years

this.luv2ShopFormService.getCreditCardYears().subscribe(
      (data)=>{
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )

    this.luv2ShopFormService.getAllCountries().subscribe(
      (successResponse)=>{
        console.log("Retrieved countries : " + JSON.stringify(successResponse));
        this.countries =successResponse;
      });
     
  }
  reviewCartDetails() {
   // Subscribe totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity =>this.totalQuantity = totalQuantity
    );

   // subscribe totalPrice
   this.cartService.totalPrice.subscribe(
    totalPrice =>this.totalPrice = totalPrice
  );
  }

  onSubmit(){
    console.log("handling this submit button");
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

// set up order 
let order = new Order();
order.totalPrice = this.totalPrice;
order.totalQuantity = this.totalQuantity;


// get Cart items
const cartItems = this.cartService.cartItems;

// create orderItems from cartItems
// -long way
/* let orderItems : OrderItem[ ]= [];
for(let i=0; i< cartItems.length; i++){

  orderItems[i] = new OrderItem(cartItems[i]);
}
*/
// Short way of doing the same things

let orderItems : OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

// set up purchase

let purchase = new Purchase();
//populate purchase - user

purchase.user = this.checkoutFormGroup.controls["user"].value;

// Populate purchase - shipping Address
purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
const shippingState : State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
const shippingCountry : Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
purchase.shippingAddress.state = shippingState.name;
purchase.shippingAddress.country = shippingCountry.name;
// Populate purchase - billing Address
purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
const billingState : State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
const billingCountry : Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
purchase.billingAddress.state = billingState.name;
purchase.billingAddress.country = billingCountry.name;

// Populate purchase - order and orderItems
purchase.order  = order;
purchase.orderItems = orderItems;

// call REST API via CheckoutService

this.checkoutService.placeOrder(purchase).subscribe(
  {
    next: response=>{alert(`your order has been received .\nOrder tracking number:
     ${response.orderTrackingNumber}`);
     this.resetCart();
    },
    error:error=>{
      alert(`there was an error: ${error.message}`);
    }
  }
)
  }

resetCart() {
   // reset cart data

   this.cartService.cartItems = [];
   this.cartService.totalPrice.next(0);
   this.cartService.totalQuantity.next(0);

   // reset form
   this.checkoutFormGroup.reset();
   this.router.navigateByUrl("/sections");
  }

  copyShippingAddressToBillingAddress(event : any){

    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
      .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      // Bug fix for states
      this.billingAddressStates = this.shippingAddressStates;

    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();

      //bug fixe
      this.billingAddressStates = [];
    }

  }


  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear : number = new Date().getFullYear();
    const selectedYear : number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year , then  start with the current month
    let  starMonth : number;
    if(currentYear === selectedYear){
      starMonth = new Date().getMonth() + 1;
    }else{
      starMonth = 1;
    }
    this.luv2ShopFormService.getCreditCardMonths(starMonth).subscribe(
      (data)=>{
        console.log("Retrieved credit card month : " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode  = formGroup?.value.country.code;
    const countryName  = formGroup?.value.country.name;

    console.log(`${formGroupName} country code :${countryCode} `);
    console.log(`${formGroupName} country name : ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;

        }else{
          this.billingAddressStates = data;
        }
        // Select first item default

        formGroup?.get('state')?.setValue(data[0]);
      }
      );
    }

    get name(){return this.checkoutFormGroup.get('user.name');}
    get lastName(){return this.checkoutFormGroup.get('user.lastName');}
    get email(){return this.checkoutFormGroup.get('user.email');}
    get phone(){return this.checkoutFormGroup.get('user.phone');}

    get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
    get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
    get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
    get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}
    get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}

    get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
    get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
    get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
    get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}
    get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}

    get creditCardType(){return this.checkoutFormGroup.get('creditCardInformation.cardType');}
    get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCardInformation.nameOnCard');}
    get creditCardNumber(){return this.checkoutFormGroup.get('creditCardInformation.cardNumber');}
    get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCardInformation.securityCode');}



}
