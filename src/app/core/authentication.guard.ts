import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as userSelectors from '../state/state';
import { UserState } from '../state/state';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private userStore: Store<UserState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userStore.pipe(
      select(userSelectors.getCurrentUser),
      map((user: User) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['./login']);
          return false;
        }
      })
    );
  }
}
