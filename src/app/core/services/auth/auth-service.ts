import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData:any=null;
 private readonly _HttpClient=inject(HttpClient);
 private readonly _Router=inject(Router);


  setRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  setloginform(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  saveUserData():void{
   this.userData= jwtDecode(localStorage.getItem("userToken")!);
  }

  logOut():void{
    localStorage.removeItem("userToken");
    this.userData=null;

    //call api End Point to rempve token from backend 
    this._Router.navigate(["/login"]);
  }
}
