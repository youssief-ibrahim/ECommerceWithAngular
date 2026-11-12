import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product-service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Product } from '../product/product';

@Component({
  selector: 'app-detalis',
  imports: [],
  templateUrl: './detalis.html',
  styleUrl: './detalis.scss',
})
export class Detalis implements OnInit{
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductService =inject(ProductService);

  productDetalis :IProduct|null =null;
 ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(p)=> {
     let id= p.get('id');
      this._ProductService.getSpecificProducts(id).subscribe({
        next:(res)=> {
          this.productDetalis=res.data;
        },
        error:(err)=> {
          console.log(err);
        },
      });
    },
   })
 }
}
