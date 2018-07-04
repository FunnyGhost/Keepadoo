import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  auth0 = new auth0.WebAuth(environment.auth0Config);

  private _isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  constructor(private router: Router, private userService: UserService) {
    if (this.isAuthenticated()) {
      this.setupProfile();
    }
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log('Handle authentication', err, authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this._isAuthenticated$.next(true);
        this.setupProfile();
        this.router.navigate(['/']);
      } else if (err) {
        this._isAuthenticated$.next(false);
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this._isAuthenticated$.next(false);

    this.router.navigate(['/']);
  }

  private setupProfile(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log('no access token pressent');
      return;
    }

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userService.updateUser(profile);
      }
    });
  }

  private isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
