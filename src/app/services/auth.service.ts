import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createUser(name: string, email: string, password: string): Promise<any> {
    console.log(name, email, password);

    if (name === 'error') {
      // Mock error response
      const errorResponse = {
        error: 'User creation failed',
        message: 'Invalid user name'
      };
      return Promise.reject(errorResponse);
    }
    // Mock success response
    const mockResponse = {
      id: '12345',
      name: name,
      email: email,
      message: 'User created successfully'
    };
    return Promise.resolve(mockResponse);
  }

  loginUser(email: string, password: string): Promise<any> {
    console.log(email, password);

    if (email === 'error@example.com') {
      // Mock error response
      const errorResponse = {
        error: 'Login failed',
        message: 'Invalid email address'
      };
      return Promise.reject(errorResponse);
    }
    // Mock success response
    const mockResponse = {
      id: '12345',
      email: email,
      message: 'User logged in successfully'
    };
    return Promise.resolve(mockResponse);
  }
  logoutUser(): Promise<any> {
    // Mock success response
    const mockResponse = {
      message: 'User logged out successfully'
    };
    return Promise.resolve(mockResponse);
  }
}
