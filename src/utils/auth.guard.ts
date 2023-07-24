import { inject } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.user) {
    return true;
  }
  return router.parseUrl('/auth');
};