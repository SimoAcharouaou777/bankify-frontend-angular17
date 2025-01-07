
import {HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Observable, switchMap, throwError} from 'rxjs';
import {Router} from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const authService = inject(AuthService);
  const accessToken = authService.getToken();
  const refreshToken = authService.getRefreshToken();
  const router = inject(Router);

  if(req.url.includes('/api/auth/login') ||
     req.url.includes('/api/auth/register') ||
     req.url.includes('/api/auth/refresh')
  ) {
    return next(req);
  }

  if(!accessToken) {
    if (!refreshToken) {
      router.navigate(['/login']);
      return throwError('No access token or refresh token found');
    }

    return authService.refreshToken(refreshToken).pipe(
      switchMap((newToken) => {
        if(newToken) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          return next(req);
        } else {
          router.navigate(['/login']);
          return throwError('Refresh token failed');
        }
      })
    );
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return next(req);
};

