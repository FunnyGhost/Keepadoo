import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}

  canActivate(): Observable<boolean> {
    return this.authenticationService.isAuthenticated$.pipe(
      tap((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true;
        } else {
          this.authenticationService.login();
          return false;
        }
      })
    );
  }
}
