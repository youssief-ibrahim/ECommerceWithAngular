import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _HttpClient=inject(HttpClient)
  myHeader:any={ token:localStorage.getItem("userToken")};
  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        // body
        "productId": id
      },
      {
        headers:this.myHeader,
      }
    )
  }
  getProductOfCartt():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:this.myHeader,
      }
    )
  }
  removeSpacidiProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        headers:this.myHeader
      }
    )
  }
  updateProductQuintity(id:string,countnun:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": countnun
      },
      {
        headers:this.myHeader
      }
    )
  }
  clearCartItem():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:this.myHeader
      }
    )
  }
}
