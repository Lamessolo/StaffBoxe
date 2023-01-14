import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderHistory } from '../common/orderHistory';
import { PaginationForOrderHistory } from '../common/paginationForOrderHistory';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private baseUrlOrder = environment.UrlOrderHistory;
  constructor(private httpClient : HttpClient) { }

  getOrderHistory():Observable<PaginationForOrderHistory>{
    const searchUrl = `${this.baseUrlOrder}`;
    return this.httpClient.get<PaginationForOrderHistory>(searchUrl);
  }

  getOrderByUserEmail(){
    
  }


}
