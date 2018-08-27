import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from '../../../node_modules/rxjs';
import { filter, switchMapTo, tap } from '../../../node_modules/rxjs/operators';
import * as userSelectors from '../state/state';
import { UserState } from '../state/state';

@Component({
  selector: 'kpd-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  constructor(private router: Router, private userStore: Store<UserState>) {}

  ngOnInit() {
    this.userSubscription = this.userStore
      .pipe(
        select(userSelectors.getCurrentUser),
        filter(Boolean),
        switchMapTo(this.userStore.select(userSelectors.getRedirectUrl)),
        filter(Boolean),
        tap((redirectUrl: string) => {
          this.router.navigateByUrl(redirectUrl);
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
