import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit{
  private readonly _CartService=inject(CartService);

  cartListProduct:Icart={} as Icart
 ngOnInit(): void {
   this._CartService.getProductOfCartt().subscribe({
    next:(value)=> {
      this.cartListProduct=value.data;      // totalPrice , products
    },
    error:(err)=> {
      console.log(err)
    },
   })
 }
 removeItem(id:string):void{
  this._CartService.removeSpacidiProduct(id).subscribe({
    next:(value)=> {
       this.cartListProduct=value.data; 
    },
    error:(err)=> {
      console.log(err)
    },
   })
 }
 UpdateItem(id:string,countnum:number):void{
  this._CartService.updateProductQuintity(id,countnum).subscribe({
    next:(value)=> {
       this.cartListProduct=value.data; 
    },
    error:(err)=> {
      console.log(err)
    },
   })
 }
 clearCart():void{
  this._CartService.clearCartItem().subscribe({
    next:(value)=> {
       if(value.message=="success")
       {
        this.cartListProduct={} as Icart
       }
    },
    error:(err)=> {
      console.log(err)
    },
   })
 }
}
