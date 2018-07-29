import { Action } from '@ngrx/store';
import { User } from '../core/models/user';
import { MovieList } from '../movie-list/core/models/movie-list';

export enum UserActionTypes {
  SetCurrentUser = '[User] Set current user',
  ClearCurrentUser = '[User] Clear current user',
  LoadMovieLists = '[User] Load movie lists',
  LoadFailed = '[User] Load failed',
  LoadMovieListsSuccess = '[User] Load movie lists success',
  ClearMovieLists = '[User] Clear movie lists',
  AddMovieList = '[User] Add movie list',
  AddMovieListFailed = '[User] Add movie list failed',
  AddMovieListSuccess = '[User] Add movie list success',
  DeleteMovieList = '[User] Delete movie list',
  DeleteMovieListFailed = '[User] Delete movie list failed',
  DeleteMovieListSuccess = '[User] Delete movie list success'
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

export class LoadMovieListsSuccess implements Action {
  readonly type = UserActionTypes.LoadMovieListsSuccess;

  constructor(public payload: MovieList[]) {}
}

export class ClearMovieLists implements Action {
  readonly type = UserActionTypes.ClearMovieLists;
}

export class AddMovieList implements Action {
  readonly type = UserActionTypes.AddMovieList;

  constructor(public payload: MovieList) {}
}

export class AddMovieListSuccess implements Action {
  readonly type = UserActionTypes.AddMovieListSuccess;
}

export class AddMovieListFailed implements Action {
  readonly type = UserActionTypes.AddMovieListFailed;

  constructor(public payload: string) {}
}

export class DeleteMovieList implements Action {
  readonly type = UserActionTypes.DeleteMovieList;

  constructor(public payload: string) {}
}

export class DeleteMovieListSuccess implements Action {
  readonly type = UserActionTypes.DeleteMovieListSuccess;

  constructor(public payload: string) {}
}

export class DeleteMovieListFailed implements Action {
  readonly type = UserActionTypes.DeleteMovieListFailed;

  constructor(public payload: string) {}
}

export type UserActions =
  | SetCurrentUser
  | ClearCurrentUser
  | LoadMovieLists
  | LoadFailed
  | LoadMovieListsSuccess
  | ClearMovieLists
  | AddMovieList
  | AddMovieListSuccess
  | AddMovieListFailed
  | DeleteMovieList
  | DeleteMovieListSuccess
  | DeleteMovieListFailed;
