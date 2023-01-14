import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/paymentInfo';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private paymentIntentUrl = environment.UrlCheckout + '/payment-intent'
  private baseUrlPurchase = environment.UrlPurchase;
  constructor(private httpClient : HttpClient) { }

  placeOrder(purchase:Purchase):Observable<any>{
      return this.httpClient.post<Purchase>(this.baseUrlPurchase,purchase);
  }

  createPaymentIntent(paymentInfo : PaymentInfo):Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }
}
