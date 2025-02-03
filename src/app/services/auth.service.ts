import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as authActions from '../auth/auth.actions';
import * as incomeOutcomeActions from '../income-outcome/income-outcome.actions';
import { User } from '../models/user.model';

interface AuthEvent {
  eventType: string;
  eventResponse: {
    user: User | null;
    message: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authEvents = new Subject<AuthEvent>();
  private _user: User | null = null;

  constructor(private store: Store) { }

  initAuthListener() {
    console.log('Auth listener initialized');
    let user: User;
    this.authEvents.subscribe( authEvent => {
      console.log('Auth event:', authEvent.eventType);
      if ( authEvent.eventResponse.user ) {
        user = authEvent.eventResponse.user;
        this._user = user;
        this.store.dispatch( authActions.setUser({ user }) );
        console.log('User:', user); 

      } else {
        this._user = null;
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( incomeOutcomeActions.unsetItems() );
      }
      
    });
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  createUser(name: string, email: string, password: string): Promise<any> {
    console.log(name, email, password);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === 'error') {
          // Mock error response
          const errorResponse = {
            error: 'User creation failed',
            message: 'Invalid user name'
          };
          reject(errorResponse);
        } else {
          // Mock success response
          let user: User = {
            uid: this.generateRandomId(),
            name: name,
            email: email
          };
          const mockResponse = {
            user: user,
            message: 'User created successfully'
          };
          this.authEvents.next({ eventType: 'User created', eventResponse: mockResponse });
          resolve(mockResponse);
        }
      }, 1000); // 1 second delay
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    console.log(email, password);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'error@example.com') {
          // Mock error response
          const errorResponse = {
            error: 'Login failed',
            message: 'Invalid email address'
          };
          reject(errorResponse);
        } else {
          // Mock success response
          let user: User = {
            uid: this.generateRandomId(),
            name: 'User',
            email: email
          };
          const mockResponse = {
            user: user,
            message: 'User logged in successfully'
          };
          this.authEvents.next({ eventType: 'User logged in', eventResponse: mockResponse });
          resolve(mockResponse);
        }
      }, 1000); // 1 second delay
    });
  }

  logout() {
    console.log('User logged out');
    this.authEvents.next({ eventType: 'User logged out', eventResponse: { user: null, message: 'User logged out' } });
  }

  get user() {
    return { ...this._user };
  }
}