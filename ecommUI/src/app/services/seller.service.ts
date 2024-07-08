import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, SignUp } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private route: Router) { }
  signUp(data: any) {
    this.http.post("http://localhost:3000/seller", data, { observe: 'response' })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('seller', JSON.stringify(res.body))
        this.route.navigate(['seller-home'])
      })
    return false
  }

  realoadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this.route.navigate(['seller-home'])
    }
  }

  login(data: Login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((res: any) => {
        if (res && res.body && res.body.length === 1) {
          this.isLoginError.emit(false)
          this.isSellerLoggedIn.next(true)
          localStorage.setItem('seller', JSON.stringify(res.body))
          this.route.navigate(['seller-home'])
        }
        else {
          this.isLoginError.emit(true)
        }
      })
  }

}
