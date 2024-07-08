import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | Product;
  productQuantity: number = 1
  removeCart = false
  cartData: Product | undefined

  constructor(private router: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let productId = this.router.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: Product) => productId == item.id)
        if (items.length) {
          this.removeCart = true
        }
        else {
          this.removeCart = false
        }
      }

      let userData = localStorage.getItem('user')
      if (userData) {
        let userId = userData && JSON.parse(userData).id
        this.product.getCartList(userId)
        this.product.cartData.subscribe((res) => {
          let item = res?.filter((item: Product) => productId?.toString() == item.productId)
          if (item?.length) {
           this.cartData=item[0]
          }
        })

      }

    });
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'increase') {
      this.productQuantity += 1
    }
    else if (this.productQuantity > 1 && val === 'decrease') {
      this.productQuantity -= 1

    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData)
        this.removeCart = true
      }
      else {
        let userData = localStorage.getItem('user')
        let userId = userData && JSON.parse(userData).id
        let cartData: Cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;

        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId)
            this.removeCart = true
          }
        })
      }
    }
  }

  removeFromCart(productId: any) {
    if (!localStorage.getItem('user')) {
      this.product.removeFromCart(productId)
      this.removeCart = false
    }
    else {
      let userData = localStorage.getItem('user')
      let userId = userData && JSON.parse(userData).id
      this.cartData && this.product.deleteFromCart(this.cartData.id).subscribe((res)=>{
        if(res){
          this.product.getCartList(userId)
        }
      })
      this.removeCart=false
    }
  }
}
