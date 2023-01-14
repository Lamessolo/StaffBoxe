import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/orderHistory';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList : OrderHistory[] = [];
  storage : Storage = sessionStorage;

  constructor(private orderHistoryService : OrderHistoryService) { }

  ngOnInit(): void {

    this.handleOrderHitory();
    
  }
  handleOrderHitory() {
   this.orderHistoryService.getOrderHistory().subscribe(
    data =>{
      this.orderHistoryList = data.content;
    }
   )
  }

}
