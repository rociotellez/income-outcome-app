import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeOutcome } from '../../models/income-outcome.model';
import { Subscription } from 'rxjs';
import { IncomeOutcomeService } from '../../services/income-outcome.service';
import Swal from 'sweetalert2';
import { AppStateWithIncomeOutcome } from '../income-outcome.reducer';

@Component({
  selector: 'app-detail',
  standalone: false,
  
  templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit, OnDestroy {
  incomeOutcome: IncomeOutcome[] = [];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppStateWithIncomeOutcome>,
    private incomeOutcomeService: IncomeOutcomeService
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('incomeOutcome')
      .subscribe( ({ items }) => this.incomeOutcome = items );
  }

  delete( uid: string | undefined ) {
    if (!uid) { return; }
    console.log(uid);
    this.incomeOutcomeService.deleteIncomeOutcome( uid )
      .then( () =>  Swal.fire('Record deleted', 'Deleted item', 'success') )
      .catch( err => Swal.fire('Error', err.message, 'error') );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
