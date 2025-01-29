import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
   
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
      console.log('loading');
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch( uiActions.isLoading() );
    /*Swal.fire({
      title: 'Logging in...',
      didOpen: () => {
        Swal.showLoading();
      }
    });*/

    const { email, password } = this.loginForm.value;
    this.authService.loginUser(email, password)
      .then(credentials => {
        console.log(credentials);
        //Swal.close();
        this.store.dispatch( uiActions.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
      });
    });

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
