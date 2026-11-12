import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product/product-service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../core/services/category/category-service';
import { ICategory } from '../../core/interfaces/icategory';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, CommonModule, RouterLink],
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

customOptionscat: OwlOptions = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 2500,
  autoplaySpeed: 1000,
  autoplayHoverPause: true,

  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,

  dots: true,
  nav: false,

  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  }
};
customOptionsMain: OwlOptions = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 2500,
  autoplaySpeed: 1000,
  autoplayHoverPause: true,

  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,

  dots: true,
  nav: false,

  responsive: {
      0: {
      items: 1
    },
  }
};
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.getAllCategoriesSubscrib= this._CategoryService.getAllCategories().subscribe({
      next:(res)=> {
        console.log(res.data[0]);
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
