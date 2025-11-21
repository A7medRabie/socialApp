import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../../projects/auth/src/public-api';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

 
  if (localStorage.getItem('token')) {
     
    router.navigate(['/timeline']);
    return false;
  }

  return true;
};
