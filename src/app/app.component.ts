import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './core/authentication.service';
import { User } from './core/models/user';
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
  hasError$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.userStore
      .pipe(select(selectors.getCurrentUser))
      .pipe(map((user: User | null) => !!user));
  }

  logout(): void {
    this.authService.logout();
  }
}
