import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-types';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent {

  orderData:Order[]|undefined
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.getOrderList()
  }

  cancelOrder(orderId:any){
    orderId && this.product.deleteOrder(orderId).subscribe((res)=>{
      this.getOrderList()
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

}
