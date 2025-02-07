import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

export const canLoadGuard: CanActivateFn = (route, state) => {
  return true;
};
