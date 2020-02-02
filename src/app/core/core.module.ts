import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { ErrorHandlerService } from './errorHandler.service';
import { ProjectService } from './project.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    ErrorHandlerService,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    AuthService,
    ProjectService,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
