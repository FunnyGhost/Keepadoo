import { Action } from '@ngrx/store';
import { User } from '../core/models/user';

export enum UserActionTypes {
  SetCurrentUser = '[User] Set current user',
  ClearCurrentUser = '[User] Clear current user'
}

export class SetCurrentUser implements Action {
  readonly type = UserActionTypes.SetCurrentUser;

  constructor(public payload: User) {}
}

export class ClearCurrentUser implements Action {
  readonly type = UserActionTypes.ClearCurrentUser;
}

export type UserActions = SetCurrentUser | ClearCurrentUser;
