import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default'
  sellerName: string = ''
  userName: string = ''
  searchResult: undefined | Product[]
  cartItems = 0

  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url?.includes('seller')) {
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.name
          this.menuType = 'seller'
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name
          this.menuType = 'user'
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType = 'default'
        }
      }
    })
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems=JSON.parse(cartData).length
    }
    
    this.product.cartData.subscribe((res:any)=>{
      this.cartItems=res.length
    })
  }

  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])    
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((res) => {
        if (res.length > 5) {
          res.length = 5
          this.searchResult = res
        }
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined
  }

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])
  }

  redirectToDetails(id: string) {
    this.route.navigate(['/details/' + id])
  }

}
