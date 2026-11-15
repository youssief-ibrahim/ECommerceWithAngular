import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
})
export class TermTextPipe implements PipeTransform {
  transform(text:string , term:number): string{
    return text.split(" ",term).join(" ");
  }
}
