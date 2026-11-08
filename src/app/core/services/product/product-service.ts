import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _HttpClient=inject(HttpClient);

  getAllProducts():Observable<any>{
     return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }

  getSpecificProducts(id:string):Observable<any>{
     return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
