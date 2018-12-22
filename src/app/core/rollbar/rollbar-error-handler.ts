import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RollbarService } from './rollbar.service';

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(err: any): void {
    if (environment.production) {
      const rollbar = this.injector.get(RollbarService);
      rollbar.error(err.originalError || err);
    }
  }
}
