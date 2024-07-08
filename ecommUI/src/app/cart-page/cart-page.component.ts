import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, priceSummary } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  cartData: Cart[] | undefined
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private product: ProductService, private route:Router) { }

  ngOnInit(): void {
    this.loadDetails()
  }

  checkout(){
    this.route.navigate(['/checkout'])
  }

  removeToCart(cartId:string|undefined){
    cartId && this.cartData && this.product.deleteFromCart(cartId)
    .subscribe((result)=>{
      this.loadDetails()
    })
  }

  loadDetails(){
    this.product.currentCart().subscribe((res) => {
      this.cartData = res
      let price = 0
      res.forEach((item) => {
        if (item.quantity) {
          price = price + item.quantity * item.price
        }
      })
      this.priceSummary.price = price
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = 8 * price / 100
      this.priceSummary.delivery = 100
      this.priceSummary.total = price + (8 * price / 100) + 100 - (price / 10)
      if(!this.cartData.length){
        this.route.navigate(['/'])
      }
    })
  }
}
