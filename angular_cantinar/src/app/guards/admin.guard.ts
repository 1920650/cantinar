import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogedIn() && authService.isAdmin()) {
    return true;
  }

  if (authService.isLogedIn()) {
    router.navigate(['/home']);
  } else {
    router.navigate(['/login']);
  }

  return false;
};