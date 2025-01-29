import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor( 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ]
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
      console.log('loading');
    });
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }
    /*Swal.fire({
      title: 'Logging in...',
      didOpen: () => {
        Swal.showLoading();
      }
    });*/
    this.store.dispatch( uiActions.isLoading() );
    const { username, email, password } = this.registerForm.value;
    this.authService.createUser(username, email, password)
      .then (credentials => {
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
