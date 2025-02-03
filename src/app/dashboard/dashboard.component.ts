import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IncomeOutcomeService } from '../services/income-outcome.service';
import * as incomeOutcomeActions from '../income-outcome/income-outcome.actions';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>,
    private incomeOutcomeService: IncomeOutcomeService ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) => {
        if ( user ) {
          this.incomeOutcomeService.initIncomeOutcomeListener( user.uid )
            .then( incomeOutcome => {
              this.store.dispatch( incomeOutcomeActions.setItems({ items: [...incomeOutcome] }) );
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
