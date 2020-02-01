import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, isDevMode } from '@angular/core';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else if (error instanceof HttpErrorResponse) {
      let niceMsg = `Backend returned code ${error.status}, ${error.statusText}`;
      console.log(niceMsg);
    } else {
      let msg = 'Unknown error';
      if (error.error && typeof error.error === 'string') {
        msg = <string>error.error;
      } else if (error.message) {
        msg = error.message;
      }
      console.error(msg);
      if (isDevMode()) {
        console.error(`Ops...`);
        console.error(error);
      }
    }
  }
}
