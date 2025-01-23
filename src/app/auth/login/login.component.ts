import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({});

  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
   
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Logging in...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { email, password } = this.loginForm.value;
    this.authService.loginUser(email, password)
      .then(credentials => {
        console.log(credentials);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
      });
    });

  }
}
