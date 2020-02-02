import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from '../constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot)) {
      return from(this.authService.getAccessToken().then(token => {
        const headers = req.headers.set('Authorization', `Bearer ${token}`);
        const authReq = req.clone({ headers });
        return next.handle(authReq)
          .pipe(tap(_ => { }, error => {
            var respError = error as HttpErrorResponse;
            if (respError && (respError.status === 401 || respError.status === 403)) {
              console.log("ops!");

              this.router.navigate(['/unauthorized']);
            }
          }))
          .toPromise();
      }));
    } else {
      return next.handle(req);
    }

  }

  constructor(private authService: AuthService, private router: Router) { }
}
