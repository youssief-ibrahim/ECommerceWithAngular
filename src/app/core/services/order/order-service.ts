import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly _HttpClient:HttpClient,private readonly _AuthService:AuthService) { };



checkOut(idCart:string|null , shippingDetails:object):Observable<any> {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,
    {
      "shippingAddress":shippingDetails
    }
  )
}
getUserOrder():Observable<any>{
 return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this._AuthService.userData.id}`
 );
}
}
