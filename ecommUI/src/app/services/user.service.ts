import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private route: Router) { }

  userSignup(data: SignUp) {
    this.http.post("http://localhost:3000/user", data, {observe:'response'})
      .subscribe((res) => {
        if(res){
          localStorage.setItem('user', JSON.stringify(res.body))
        this.route.navigate(['/'])
        }
      })
    return false
  }

  userLogin(data: Login) {
    return this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'})
      .subscribe((res: any) => {
        if (res && res.body?.length) {
          this.isLoginError.emit(false)
          localStorage.setItem('user', JSON.stringify(res.body[0]))
          this.route.navigate(['/'])
        }
        else {
          this.isLoginError.emit(true)
        }
      })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }
}
