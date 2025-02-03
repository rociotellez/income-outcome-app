import { Injectable } from '@angular/core';
import { IncomeOutcome } from '../models/income-outcome.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeOutcomeService {

  constructor(private authService: AuthService) { }

  createIncomeOutcome(incomeOutcome: IncomeOutcome): Promise<any> { 
    const uid = this.authService.user.uid;
    console.log('incomeOutcome', incomeOutcome);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock success response
        const mockResponse = {
          id: this.generateRandomId(),
          uid: uid,
          ...incomeOutcome,
          message: 'IncomeOutcome created successfully'
        };
        resolve(mockResponse);
      }, 1000); // 1 second delay
    });
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  initIncomeOutcomeListener(uid: string): Promise<IncomeOutcome[]> {
    console.log('initIncomeOutcomeListener', uid);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock response
        const mockResponse: IncomeOutcome[] = [
          {
            description: 'Salary',
            amount: 5000,
            type: 'income',
            uid: this.generateRandomId()
          },
          {
            description: 'Groceries',
            amount: 150,
            type: 'outcome',
            uid: this.generateRandomId()
          },
          {
            description: 'Car payment',
            amount: 500,
            type: 'outcome',
            uid: this.generateRandomId()
          }
        ];
        resolve(mockResponse);
      }, 1000); // 1 second delay
    });
  }

  deleteIncomeOutcome(uid: string): Promise<any> {
    console.log('deleteIncomeOutcome', uid);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock success response
        const mockResponse = {
          uid: uid,
          message: 'IncomeOutcome deleted successfully'
        };
        resolve(mockResponse);
      }, 1000); // 1 second delay
    });
  }
}
