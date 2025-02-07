import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeOutcomeComponent } from './income-outcome.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { IncomeOrderPipe } from '../pipes/income-order.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { incomeOutcomeReducer } from './income-outcome.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeOutcomeComponent,
    StatisticsComponent,
    DetailComponent,
    IncomeOrderPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeOutcome', incomeOutcomeReducer),
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IncomeOutcomeModule { }
