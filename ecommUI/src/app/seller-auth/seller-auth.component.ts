import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  showLogin = true
  authError:string=''
  constructor(private seller: SellerService, private router: Router) { }
  ngOnInit() {
    this.seller.realoadSeller()
  }

  signUp(data: SignUp) {
    this.seller.signUp(data)
  }
  
login(data:Login){
  this.seller.login(data)
  this.seller.isLoginError.subscribe((isError)=>
  {
    if(isError){
      this.authError="Email or Password is ivalid"
    }
  })
}

  OpenSignup() {
    this.showLogin = false
  }

  OpenLogin() {
    this.showLogin = true
  }

}
