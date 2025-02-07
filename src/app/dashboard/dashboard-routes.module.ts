import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
//import { authGuard } from '../services/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent, 
    children: dashboardRoutes,
    //canActivate: [ authGuard ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
