import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {inject} from "@angular/core";

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const expectedRole = route.data['expectedRole'];
  const role = localStorage.getItem('role');
  const router = inject(Router);

  if (role !== expectedRole) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
