import { FirebaseConfig } from '../app/core/models/firebase-config';
import { TMDBConfig } from './tmdb-config';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyCmdoGjhIkg5Xz2okqrX4dEZZZlCOPGAjA',
  authDomain: 'keepadoo.firebaseapp.com',
  databaseURL: 'https://keepadoo.firebaseio.com',
  projectId: 'keepadoo',
  storageBucket: 'keepadoo.appspot.com',
  messagingSenderId: '516267612124'
};

const tmdbConfig: TMDBConfig = {
  api_key: 'd7c178b732e89a3e82d70f43186af535',
  apiUrl: 'https://api.themoviedb.org/3'
};

export const environment = {
  production: false,
  firebaseConfig,
  tmdbConfig
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
