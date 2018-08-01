import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs/operators';
import * as selectors from '../state/state';
import { UserState } from '../state/state';
import * as actions from '../state/user.action';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private userStore: Store<UserState>) {
    this.setupMessageListening();
  }

  private setupMessageListening() {
    this.userStore
      .pipe(
        select(selectors.getMessage),
        filter(Boolean),
        switchMap((message: string) => {
          return this.snackBar
            .open(message, null, {
              duration: 2000
            })
            .afterDismissed();
        }),
        tap(() => {
          this.userStore.dispatch(new actions.ClearUserMessage());
        })
      )
      .subscribe();
  }
}
