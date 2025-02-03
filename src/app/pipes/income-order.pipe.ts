import { Pipe, PipeTransform } from '@angular/core';
import { IncomeOutcome } from '../models/income-outcome.model';

@Pipe({
  name: 'incomeOrder',
  standalone: false
})
export class IncomeOrderPipe implements PipeTransform {

  transform(items: IncomeOutcome[]): IncomeOutcome[] {
    return items.slice().sort( (a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
