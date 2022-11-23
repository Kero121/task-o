import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calc'
})
export class CalcPipe implements PipeTransform {

  transform(price:number , discontRate:number): number {
    return Math.round(price-((discontRate/100)*price));
  }

}
