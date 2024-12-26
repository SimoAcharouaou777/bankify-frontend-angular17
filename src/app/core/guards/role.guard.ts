import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const expectedRole = route.data['expectedRole'];
  const role = localStorage.getItem('role');

  if (role !== expectedRole) {
    const router = new Router();
    router.navigate(['/login']);
    return false;
  }
  return true;
};
