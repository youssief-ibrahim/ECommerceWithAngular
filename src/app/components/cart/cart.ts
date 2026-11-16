import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit{
  private readonly _CartService=inject(CartService);

  cartListProduct:Icart={} as Icart;
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
//  clearCart():void{
//   this._CartService.clearCartItem().subscribe({
//     next:(value)=> {
//        if(value.message=="success")
//        {
//         this.cartListProduct={} as Icart
//        }
//     },
//     error:(err)=> {
//       console.log(err)
//     },
//    })
//  }

clearCart(): void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then((result) => {

    if (result.isConfirmed) {

      this._CartService.clearCartItem().subscribe({
        next: (value) => {

          if (value.message === "success") {

            this.cartListProduct = {} as Icart;

            Swal.fire({
              title: "Deleted!",
              text: "Your cart has been cleared successfully.",
              icon: "success"
            });

          }

        },
        error: (err) => {
          console.log(err);

          Swal.fire({
            title: "Error!",
            text: "Something went wrong while clearing your cart.",
            icon: "error"
          });
        }
      });

    }

  });
}
}
