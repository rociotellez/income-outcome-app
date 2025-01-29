import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login']);
      /*.then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error(error);
      });*/

  }

}
