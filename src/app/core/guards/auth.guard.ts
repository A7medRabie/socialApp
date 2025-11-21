import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('token')) {
    const _router=inject(Router);
    _router.navigate(['/login']);
    return false;
  }
  return true;
};
