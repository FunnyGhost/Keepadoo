import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './core/authentication.service';
import * as selectors from './state/state';
import { UserState } from './state/state';

@Component({
  selector: 'kpd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private authService: AuthenticationService,
    private firebaseAuth: AngularFireAuth,
    private breakpointObserver: BreakpointObserver,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.authService.handleAuthentication();
    this.authService.scheduleRenewal();
    this.firebaseAuth.auth.signInAnonymously();
    this.isLoggedIn$ = this.authService.isAuthenticated$;
    this.isLoading$ = this.userStore.pipe(select(selectors.getIsLoading));
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
