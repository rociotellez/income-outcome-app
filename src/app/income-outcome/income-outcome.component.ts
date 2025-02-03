import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeOutcome } from '../models/income-outcome.model';
import { IncomeOutcomeService } from '../services/income-outcome.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as UIActions from '../shared/ui.actions';

@Component({
  selector: 'app-income-outcome',
  standalone: false,
  
  templateUrl: './income-outcome.component.html'
})
export class IncomeOutcomeComponent implements OnInit, OnDestroy {

  incomeForm: FormGroup = new FormGroup({});
  type: string = 'income';
  isLoading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(  private fb: FormBuilder,
                private incomeOutcomeService: IncomeOutcomeService,
                private store: Store<AppState> ) {
   
  }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: [ '', Validators.required] ,
      amount: [ '', Validators.required ],
      type: ['']
    });
    this.uiSubscription = this.store.select('ui').subscribe( ui => this.isLoading = ui.isLoading );
  }

  save() {
    if (this.incomeForm.invalid) { return; }
    this.store.dispatch( UIActions.isLoading() );
    console.log(this.incomeForm.value);
    const { description, amount} = this.incomeForm.value;
    const incomeOutcome = new IncomeOutcome( description, amount, this.type );

    this.incomeOutcomeService.createIncomeOutcome( incomeOutcome )
      .then( () => {
        this.store.dispatch( UIActions.stopLoading() );
        this.incomeForm.reset();
        Swal.fire('Record created', description, 'success');
      })
      .catch( err => {
        this.store.dispatch( UIActions.stopLoading() );
        Swal.fire('Error', err.message, 'error');
      });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
