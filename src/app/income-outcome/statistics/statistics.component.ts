import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IncomeOutcome } from '../../models/income-outcome.model';

@Component({
  selector: 'app-statistics',
  standalone: false,
  
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit{
  income: number = 0;
  outcome: number = 0;  

  totalIncome: number = 0;
  totalOutcome: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('incomeOutcome').subscribe( ({ items }) => {
      this.calculateIncomeOutcome(items)
    });
  }

  calculateIncomeOutcome(items: IncomeOutcome[]) {

    this.income = 0;
    this.outcome = 0;  

    this.totalIncome = 0;
    this.totalOutcome = 0;

    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncome += item.amount;
        this.income++;
      } else {
        this.totalOutcome += item.amount;
        this.outcome++; 
      }
    }
    
  }
}
