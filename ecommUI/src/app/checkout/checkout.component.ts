import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Cart, Order } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  shippingAddress: FormGroup;
  totalPrice: number | undefined
  cartData: Cart[] | undefined
  OrderMsg:string|undefined

  constructor(private fb: FormBuilder, private product: ProductService, private router: Router) {
    this.shippingAddress = fb.group({
      name: '',
      email: '',
      mobile: '',
      address: '',
      pin: '',
    });
  }

  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      let price = 0
      this.cartData=res
      res.forEach((item) => {
        if (item.quantity) {
          price = price + (item.quantity * item.price)
        }
      })
      this.totalPrice = price + (8 * price / 100) + 100 - (price / 10)
      console.log(this.totalPrice)
    })
  }

  orderNow(data: { name: string, email: string, address: string, mobile: string, pin: number }) {
    let userData = localStorage.getItem('user')
    let userId = userData && JSON.parse(userData).id
    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach(item => {
        setTimeout(()=>{
          item.id && this.product.deleteCartItems(Number(item.id))
        },500)
      });

      this.product.orderNow(orderData).subscribe((res) => {
        if(res){
          this.OrderMsg='Your order has placed'
          setTimeout(()=>{
            this.router.navigate(['/my-order'])
          },2000)
        }
      })
    }
  }
}
