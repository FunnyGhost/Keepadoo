import { InjectionToken } from '@angular/core';
import * as Rollbar from 'rollbar';

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
