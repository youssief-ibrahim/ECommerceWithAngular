import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order-service';

@Component({
  selector: 'app-orders',
  imports: [ReactiveFormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
 cartId:string|null="";
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrderService=inject(OrderService)
  
  orders: FormGroup = new FormGroup({
  details: new FormControl(null),
  phone: new FormControl(null),
  city: new FormControl(null)
})

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=> {
     this.cartId=param.get("id");
    },
    error:(err)=> {
      console.log(err)
    },
   })
}

ordersSubmit():void {
  // submit {details: 'wfwefwefwef', phone: '01015265077', city: 'kfs'} -- id
  console.log(this.orders.value) ;// {details: 'wfwefwefwef', phone: '01015265077', city: 'kfs'} --- id Cart;

  this._OrderService.checkOut(this.cartId , this.orders.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status === 'success'){
        // res.session.url ; // url stripe "https://checkout.stripe.com/c/pay/cs_test_a1jBPD4icOTOnf2bz3twerZFhytOQglrklrXw0

        window.open(res.session.url)


      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

}
