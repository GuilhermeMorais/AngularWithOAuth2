import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { Constants } from '../constants';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot)) {
      return from(this.authService.getAccessToken().then(token => {
        const headers = req.headers.set('Authorization', `Bearer ${token}`);
        const authReq = req.clone({ headers });
        return next.handle(authReq).toPromise();
      }));
    } else {
      return next.handle(req);
    }

  }

  constructor(private authService: AuthService) { }
}
