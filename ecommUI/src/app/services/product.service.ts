import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Product[] | undefined>()
  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post("http://localhost:3000/product", data)
  }

  productList() {
    return this.http.get<Product[]>("http://localhost:3000/product")
  }

  deleteProduct(id: any) {
    return this.http.delete(`http://localhost:3000/product/${id}`)
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:3000/product/${product.id}`, product)
  }

  getProduct(id: any) {
    return this.http.get<Product>(`http://localhost:3000/product/${id}`)
  }

  popularProducts() {
    return this.http.get<Product[]>("http://localhost:3000/product?_limit=3")
  }

  trendyProducts() {
    return this.http.get<Product[]>('http://localhost:3000/product?_limit=5');
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/product?name=${query}`)
  }

  localAddToCart(data: Product) {
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }

  removeFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: Product[] = JSON.parse(cartData)
      items = items.filter((item: Product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData)
  }

  deleteFromCart(cartId: string) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  getCartList(userId: number) {
    return this.http
      .get<Product[]>('http://localhost:3000/cart?userId=' + userId, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  currentCart() {
    let userStore = localStorage.getItem('user')
    let userdata = userStore && JSON.parse(userStore)
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId' + userdata.id)
  }

  orderNow(data:Order){
    return this.http.post('http://localhost:3000/order',data)
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>('http://localhost:3000/order?userId=' + userData.id);
  }

  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart'+cartId, {observe:'response'}).subscribe((res)=>{
      if(res){
        this.cartData.emit([])
      }
    })
  }

  deleteOrder(orderId:string){
    return this.http.delete('http://localhost:3000/order/'+orderId)
  }
}