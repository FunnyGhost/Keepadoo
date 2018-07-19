import { FirebaseConfig } from '../app/core/models/firebase-config';
import { Auth0Config } from './auth0-config';
import { TMDBConfig } from './tmdb-config';

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyCmdoGjhIkg5Xz2okqrX4dEZZZlCOPGAjA',
  authDomain: 'keepadoo.firebaseapp.com',
  databaseURL: 'https://keepadoo.firebaseio.com',
  projectId: 'keepadoo',
  storageBucket: 'keepadoo.appspot.com',
  messagingSenderId: '516267612124'
};

const auth0Config: Auth0Config = {
  clientID: 'QTMdMOEkh5ZFPNWp1qdyHsSep436KHhS',
  domain: 'funnyghost.eu.auth0.com',
  responseType: 'token id_token',
  audience: 'https://funnyghost.eu.auth0.com/userinfo',
  redirectUri: 'https://www.keepadoo.com/callback',
  scope: 'openid profile'
};

const tmdbConfig: TMDBConfig = {
  api_key: 'd7c178b732e89a3e82d70f43186af535',
  apiUrl: 'https://api.themoviedb.org/3'
};

export const environment = { production: true, firebaseConfig, auth0Config, tmdbConfig };
