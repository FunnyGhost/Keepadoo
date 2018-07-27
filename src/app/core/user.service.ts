import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as selectors from '../state/state';
import { UserState } from '../state/state';
import * as actions from '../state/user.action';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userProfile$: Observable<User>;

  constructor(private store: Store<UserState>) {
    this.userProfile$ = store.pipe(select(selectors.getCurrentUser));
  }

  updateUser(user: User): void {
    this.store.dispatch(new actions.SetCurrentUser(user));
  }

  clearUser(): void {
    this.store.dispatch(new actions.ClearCurrentUser());
  }
}
