import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product/product-service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../core/services/category/category-service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit,OnDestroy{
    productList:IProduct[]=[];
    categorytList:ICategory[]=[];
   getAllProductSubscrib!:Subscription;
   getAllCategoriesSubscrib!:Subscription;
  _ProductService=inject(ProductService);
  _CategoryService=inject(CategoryService);
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.getAllCategoriesSubscrib= this._CategoryService.getAllCategories().subscribe({
      next:(res)=> {
        // console.log(res.data);
        this.categorytList=res.data;
      },
      error:(err)=> {
        console.log(err)
      },
    });

   this.getAllProductSubscrib= this._ProductService.getAllProducts().subscribe({
      next:(res)=> {
        this.productList=res.data;
      },
      error:(err)=> {
        console.log(err)
      },
    });

  }
  ngOnDestroy(): void {
    this.getAllProductSubscrib?.unsubscribe();
    this.getAllCategoriesSubscrib?.unsubscribe();
  }
  
}
