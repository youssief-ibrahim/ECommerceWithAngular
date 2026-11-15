import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText',
})
export class SearchTextPipe implements PipeTransform {
  transform(arrofProduct:any[],textsearch:string): any[] {
     return arrofProduct.filter((item)=>item.title.toLowerCase().includes(textsearch.toLowerCase()));    
  }
}
