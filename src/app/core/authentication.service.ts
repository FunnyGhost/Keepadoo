import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  auth0 = new auth0.WebAuth(environment.auth0Config);

  private refreshSubscription: any;

  private _isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  get redirectUrl(): string {
    return localStorage.getItem('redirect_url');
  }
  set redirectUrl(value: string) {
    localStorage.setItem('redirect_url', value);
  }

  constructor(private router: Router, private userService: UserService) {
    if (this.isAuthenticated()) {
      this.setupProfile();
    }
  }

  public login(redirectUrl: string = this.router.url): void {
    this.redirectUrl = redirectUrl;
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this._isAuthenticated$.next(true);
        this.setupProfile();
      } else if (err) {
        this._isAuthenticated$.next(false);
        this.router.navigate(['/']);
        console.error(err);
      }
    });
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this._isAuthenticated$.next(false);
    this.userService.clearUser();

    this.router.navigate(['/']);
  }

  public scheduleRenewal(): void {
    if (!this.isAuthenticated()) {
      return;
    }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const expiresIn$ = of(expiresAt).pipe(
      mergeMap(expiration => {
        const now = Date.now();

        return timer(Math.max(1, expiration - now));
      })
    );

    this.refreshSubscription = expiresIn$.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  private renewToken(): void {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        this.setSession(result);
      }
    });
  }

  private unscheduleRenewal(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private setupProfile(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
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

    this.scheduleRenewal();
  }
}
