import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { captureException } from "@booji/browser";
import { runOutsideAngular } from "./Zone";
/**
 * Angular ErrorHandler
 * @public
 */
@Injectable({ providedIn: "root" })
class BoojiErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error: any): void {
    const extractedError = this.extractError(error);
    runOutsideAngular(() => captureException(extractedError));
  }

  private extractError(e: unknown): Error | string {
    let error = e;

    // 解析 zone.js error
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && (error as { ngOriginalError: Error }).ngOriginalError) {
      error = (error as { ngOriginalError: Error }).ngOriginalError;
    }

    if (typeof error === "string" || error instanceof Error) {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof Error) {
        return error.error;
      }

      if (error.error instanceof ErrorEvent && error.error.message) {
        return error.error.message;
      }

      if (typeof error.error === "string") {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }

      return error.message;
    }

    return "Unknown angular error";
  }
}

function createBoojiErrorHandler() {
  return new BoojiErrorHandler();
}

export { BoojiErrorHandler, createBoojiErrorHandler };
