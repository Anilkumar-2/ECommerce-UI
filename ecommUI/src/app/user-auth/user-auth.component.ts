import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Cart, Login, Product, SignUp } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {

  userSignupForm: FormGroup;
  userLoginForm: FormGroup;
  userLoggedIn: boolean = false
  authError: string = ''

  constructor(private fb: FormBuilder, private user: UserService, private product: ProductService) {
    this.userSignupForm = fb.group({
      name: '',
      email: '',
      password: ''
    });
    this.userLoginForm = fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.user.userAuthReload()
  }

  userSignup(data: SignUp) {
    this.user.userSignup(data)
  }

  userLogin(data: Login) {
    this.user.userLogin(data)

    this.user.isLoginError.subscribe((res: any) => {
      if (res) {
        this.authError = "Credentials are invalid"
      }
      else {
        setTimeout(()=>{
          this.localCartToRemoteCart()
        },500)
      }
    })
  }

  OpenSignup() {
    this.userLoggedIn = true
  }

  OpenLogin() {
    this.userLoggedIn = false
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let userData = localStorage.getItem('user')
    console.log(userData)
    let userId = userData && JSON.parse(userData).id
    if (data) {
      let cartDataList: Product[] = JSON.parse(data)

      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((res) => {
            if (res) {
              console.log('product stored in db')
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }
        }, 500)
      });
    }

    setTimeout(()=>{
      this.product.getCartList(userId);
    },1000)
  }
}
