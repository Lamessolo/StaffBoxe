import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Adherent } from 'src/app/common/adherent';
import { AdherentAdd } from 'src/app/common/adherentAdd';
import { CartItem } from 'src/app/common/cart-Item';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/orderItem';
import { PaymentInfo } from 'src/app/common/paymentInfo';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { AdherentService } from 'src/app/services/adherent.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { SectionService } from 'src/app/services/section.service';
import { SexeService } from 'src/app/services/sexe.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
      countries:Country[] = [];
      states : State[] = [];
      adherentNew : AdherentAdd ={
        name: '',
        prenom: '',
        adresse: '',
        email: '',
        phone: '',
        imageUrl: '',
        statut: '',
        poid: 0,
        dateNaissance: new Date(),
        sexe: 0,
        section: 0,
        categorie: 0
      }
      checkoutFormGroup !: FormGroup ;
      totalPrice :  number = 0;
      totalQuantity : number = 0;
      creditCardMonths: number[] = [];
      creditCardYears: number[] = [];
      shippingAddressStates: State[]= [];
      billingAddressStates : State[]= [];

 // Initialize Stripe API
 stripe = Stripe(environment.stripePublishableKey);
 paymentInfo : PaymentInfo = new PaymentInfo();
 cardElement : any ;
 displayError : any = "";
 selectPaiementUneFois : boolean = true;
 isDisabled : boolean = false;

  constructor(private formBuilder :FormBuilder,
              private cartService : CartService,
              private adherentService: AdherentService,
              private sectionService : SectionService,
              private sexeService : SexeService,
              private checkoutService: CheckoutService,
              private router : Router,
        private luv2ShopFormService: Luv2ShopFormService) { }

  ngOnInit(): void {

// Setup Stripe payment form

    this.setupStripePaymentForm();

    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      user : this.formBuilder.group({
        email: new FormControl('',
        [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        name :new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        lastName : new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        phone :new FormControl('',
        [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
      }),
      adherentCreate : this.formBuilder.group({
      emailAdherent: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      nameAdherent :new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
      lastNameAdherent : new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
      phoneAdherent :new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
      dateNaissance : new FormControl('2022-12-09'),
      addresse :  new FormControl(''),
      statut : new FormControl('Inscrit'),
      poid : new FormControl(40),
      imageUrl : new FormControl("assets/images/staffboxe.png"),
      sexe:new FormControl(1),
      section : new FormControl(6),
      categorie : new FormControl(2)
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
    creditCard : this.formBuilder.group({
        /*
            cardType : new FormControl('',[Validators.required]),
              nameOnCard : new FormControl('',
              [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
              cardNumber :  new FormControl('',[Validators.pattern('[0-9]{16}')]),
              securityCode:new FormControl('',[Validators.pattern('[0-9]{3}')]),
              expirationMonth:[''],
              expirationYear:['']*/
            })
    });
/*
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
*/  
  this.luv2ShopFormService.getAllCountries().subscribe(
      (successResponse)=>{
        console.log("Retrieved countries : " + JSON.stringify(successResponse));
        this.countries =successResponse;
      });
   
  }
  setupStripePaymentForm() {
    // get a handle to stripe elements***

var elements = this.stripe.elements();

    // Create a card element ..... and hide the zipCode field 
this.cardElement = elements.create('card',{hidePostalCode :true});

    // Add an instance of card UI component into the 'card-element' div

 this.cardElement.mount('#card-element');   
    //Add event binding for the 'change' event on the card element

    this.cardElement.on('change',(event:any)=>{
        // get a handle to cart-error element
        this.displayError = document.getElementById('card-errors');
        if(event.complete){
          this.displayError.textContent ="";  
        }else if(event.error){
          // Show validation error to customer
          this.displayError.textContent = event.error.message;
        }
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

// Create a new adherent

// get Cart items
const cartItems = this.cartService.cartItems;

// create orderItems from cartItems

// Short way of doing the same things

let orderItems : OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

// set up purchase

let purchase = new Purchase();
//populate purchase - user

purchase.user = this.checkoutFormGroup.controls["user"].value;
purchase.adherentCreate = this.checkoutFormGroup.controls["adherentCreate"].value;

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

// compute payment info
this.paymentInfo.amount = Math.round(this.totalPrice * 100);
this.paymentInfo.currency = "USD";
this.paymentInfo.receiptEmail = purchase.user.email;

console.log(`this.paymentInfo.amount: ${this.paymentInfo.amount}`);

// if valid from them
// - Create payment intent 
// -confirm card payment
// -place order

if(!this.checkoutFormGroup.invalid && this.displayError.textContent === ""){
  this.isDisabled= true;
  this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
    (paymentIntentResponse)=>{
      this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
        {
          payment_method:{
            card:this.cardElement,
            billing_details:{
              email: purchase.user.email,
              name : `${purchase.user.name} ${purchase.user.lastname}`,
              address :{
                line1: purchase.billingAddress.street,
                city:purchase.billingAddress.city,
                state : purchase.billingAddress.state,
                postal_code : purchase.billingAddress.zipCode,
                country:this.billingAddressCountry?.value.code
              }

            }
          }
        },{handleAction : false}).then((result:any)=>{
          if(result.error){
            // inform the customer there was a error
            alert(`There was an error : ${result.error.message}`);
            this.isDisabled = false;
          }else{
           this.checkoutService.placeOrder(purchase).subscribe({
            next : (response :any)=> {
              alert(`Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`);

              // Reset cart
              this.resetCart();
              this.isDisabled =false;
            },
            error:(error:any)=>{
              alert(`there was an error: ${error.message}`);
              this.isDisabled = false;
            }
           }) 
          }
        });
    }
  );
}else{
  this.checkoutFormGroup.markAllAsTouched();
  return;
}
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

  getStates(formGroupName: string){
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


  getChoixPaiement(event : any){
    if(event.target.checked &&  this.selectPaiementUneFois ){
     this.selectPaiementUneFois = false;
     console.log(this.selectPaiementUneFois);
    }else{
      this.selectPaiementUneFois = true;
    }
  }
    get name(){return this.checkoutFormGroup.get('user.name');}
    get lastName(){return this.checkoutFormGroup.get('user.lastName');}
    get email(){return this.checkoutFormGroup.get('user.email');}
    get phone(){return this.checkoutFormGroup.get('user.phone');}

   // Adherent

    get dateNaissance(){return this.checkoutFormGroup.get('adherentCreate.dateNaissance');}
    get emailAdherent(){return this.checkoutFormGroup.get('adherentCreate.emailAdherent');}
    get lastNameAdherent(){return this.checkoutFormGroup.get('adherentCreate.lastNameAdherent');}
    get nameAdherent(){return this.checkoutFormGroup.get('adherentCreate.nameAdherent');}
    get phoneAdherent(){return this.checkoutFormGroup.get('adherentCreate.phoneAdherent');}
    get sexe(){return this.checkoutFormGroup.get('adherentCreate.sexe');}
    get section(){return this.checkoutFormGroup.get('adherentCreate.section');}
    get addresse(){return this.checkoutFormGroup.get('adherentCreate.addresse');}

    // Shipping Adresse
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
