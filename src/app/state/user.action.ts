import { Action } from '@ngrx/store';
import { User } from '../core/models/user';
import { MovieList } from '../movie-list/core/models/movie-list';

export enum UserActionTypes {
  SetCurrentUser = '[User] Set current user',
  ClearCurrentUser = '[User] Clear current user',
  LoadMovieLists = '[User] Load movie lists',
  LoadFailed = '[User] Load failed',
  SetMovieLists = '[User] Set movie lists',
  ClearMovieLists = '[User] Clear movie lists'
}

export class SetCurrentUser implements Action {
  readonly type = UserActionTypes.SetCurrentUser;

  constructor(public payload: User) {}
}

export class ClearCurrentUser implements Action {
  readonly type = UserActionTypes.ClearCurrentUser;
}

export class LoadMovieLists implements Action {
  readonly type = UserActionTypes.LoadMovieLists;
}

export class LoadFailed implements Action {
  readonly type = UserActionTypes.LoadFailed;

  constructor(public payload: string) {}
}

export class SetMovieLists implements Action {
  readonly type = UserActionTypes.SetMovieLists;

  constructor(public payload: MovieList[]) {}
}

export class ClearMovieLists implements Action {
  readonly type = UserActionTypes.ClearMovieLists;
}

export type UserActions =
  | SetCurrentUser
  | ClearCurrentUser
  | LoadMovieLists
  | LoadFailed
  | SetMovieLists
  | ClearMovieLists;
