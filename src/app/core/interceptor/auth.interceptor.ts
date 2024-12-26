import {HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn):Observable<any> => {
  const authService = Inject(AuthService);
  const accessToken = authService.getToken();

  if(accessToken){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
  return next(req);
};
