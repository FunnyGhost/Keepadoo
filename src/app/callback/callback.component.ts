import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from '../../../node_modules/rxjs';
import { filter, tap } from '../../../node_modules/rxjs/operators';
import { AuthenticationService } from '../core/authentication.service';
import * as userSelectors from '../state/state';
import { UserState } from '../state/state';

@Component({
  selector: 'kpd-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userStore: Store<UserState>
  ) {}

  ngOnInit() {
    this.userSubscription = this.userStore
      .pipe(
        select(userSelectors.getCurrentUser),
        filter(Boolean),
        tap(() => {
          this.router.navigateByUrl(this.authService.redirectUrl);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
