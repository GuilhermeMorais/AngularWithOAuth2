import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { ErrorHandlerService } from './errorHandler.service';
import { ProjectService } from './project.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    ProjectService,
    ErrorHandlerService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
