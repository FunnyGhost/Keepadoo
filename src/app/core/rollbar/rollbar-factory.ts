import * as Rollbar from 'rollbar';
import { rollbarConfig } from './rollbar-config';

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}
