import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup = new FormGroup({});

  constructor( 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ]
    });
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Logging in...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const { username, email, password } = this.registerForm.value;
    this.authService.createUser(username, email, password)
      .then (credentials => {
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
