import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product/product-service';
import { IProduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
    productList:IProduct[]=[];
  _ProductService=inject(ProductService);
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ProductService.getAllProducts().subscribe({
      next:(res)=> {
        this.productList=res.data;
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
}
