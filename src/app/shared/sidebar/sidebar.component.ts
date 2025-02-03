import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string | undefined = '';
  subcription: Subscription = new Subscription();

  constructor(private authService: AuthService, 
              private router: Router,
              private store: Store<AppState>) { }

    ngOnInit(): void {
      this.subcription = this.store.select('user')
      .pipe(
        filter(({ user }) => user != null)
      )
        .subscribe( ({ user }) => {
          this.userName = user?.name;
        }
      );
    }
  
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

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
