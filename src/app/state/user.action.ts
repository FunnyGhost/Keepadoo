import { Action } from '@ngrx/store';
import { User } from '../core/models/user';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';

export enum UserActionTypes {
  SetCurrentUser = '[User] Set current user',
  ClearCurrentUser = '[User] Clear current user',
  SetUserMessage = '[User] Set message',
  ClearUserMessage = '[User] Clear message',
  LoadMovieLists = '[User] Load movie lists',
  LoadMovieListsFailed = '[User] Load movie lists failed',
  LoadMovieListsSuccess = '[User] Load movie lists success',
  LoadDiscoverMovies = '[User] Load movies for discovering',
  LoadDiscoverMoviesSuccess = '[User] Load movies for discovering success',
  LoadDiscoverMoviesFailed = '[User] Load movies for discovering failed',
  ClearMovieLists = '[User] Clear movie lists',
  AddMovieList = '[User] Add movie list',
  AddMovieListFailed = '[User] Add movie list failed',
  AddMovieListSuccess = '[User] Add movie list success',
  DeleteMovieList = '[User] Delete movie list',
  DeleteMovieListFailed = '[User] Delete movie list failed',
  DeleteMovieListSuccess = '[User] Delete movie list success',
  LoadTvShowLists = '[User] Load tv-show lists',
  LoadTvShowListsSuccess = '[User] Load tv-show lists success',
  LoadTvShowListsFailed = '[User] Load tv-show lists failed',
  ClearTvShowLists = '[User] Clear tv-show lists',
  AddTvShowList = '[User] Add tv-show list',
  AddTvShowListFailed = '[User] Add tv-show list failed',
  AddTvShowListSuccess = '[User] Add tv-show list success',
  DeleteTvShowList = '[User] Delete tv-show list',
  DeleteTvShowListFailed = '[User] Delete tv-show list failed',
  DeleteTvShowListSuccess = '[User] Delete tv-show list success',
  SetRedirectUrl = '[User] Set redirectUrl'
}

export class SetCurrentUser implements Action {
  readonly type = UserActionTypes.SetCurrentUser;

  constructor(public payload: User) {}
}

export class ClearCurrentUser implements Action {
  readonly type = UserActionTypes.ClearCurrentUser;
}

export class SetUserMessage implements Action {
  readonly type = UserActionTypes.SetUserMessage;

  constructor(public payload: string) {}
}

export class ClearUserMessage implements Action {
  readonly type = UserActionTypes.ClearUserMessage;
}

export class LoadMovieLists implements Action {
  readonly type = UserActionTypes.LoadMovieLists;
}

export class LoadMovieListsFailed implements Action {
  readonly type = UserActionTypes.LoadMovieListsFailed;

  constructor(public payload: string) {}
}

export class LoadDiscoverMoviesFailed implements Action {
  readonly type = UserActionTypes.LoadDiscoverMoviesFailed;

  constructor(public payload: string) {}
}

export class LoadMovieListsSuccess implements Action {
  readonly type = UserActionTypes.LoadMovieListsSuccess;

  constructor(public payload: MovieList[]) {}
}

export class LoadDiscoverMovies implements Action {
  readonly type = UserActionTypes.LoadDiscoverMovies;
}

export class LoadDiscoverMoviesSuccess implements Action {
  readonly type = UserActionTypes.LoadDiscoverMoviesSuccess;

  constructor(public payload: MovieDiscover[]) {}
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

export class LoadTvShowLists implements Action {
  readonly type = UserActionTypes.LoadTvShowLists;
}

export class LoadTvShowListsSuccess implements Action {
  readonly type = UserActionTypes.LoadTvShowListsSuccess;

  constructor(public payload: TvShowList[]) {}
}

export class LoadTvShowListsFailed implements Action {
  readonly type = UserActionTypes.LoadTvShowListsFailed;

  constructor(public payload: string) {}
}

export class ClearTvShowLists implements Action {
  readonly type = UserActionTypes.ClearTvShowLists;
}

export class AddTvShowList implements Action {
  readonly type = UserActionTypes.AddTvShowList;

  constructor(public payload: TvShowList) {}
}

export class AddTvShowListSuccess implements Action {
  readonly type = UserActionTypes.AddTvShowListSuccess;
}

export class AddTvShowListFailed implements Action {
  readonly type = UserActionTypes.AddTvShowListFailed;

  constructor(public payload: string) {}
}

export class DeleteTvShowList implements Action {
  readonly type = UserActionTypes.DeleteTvShowList;

  constructor(public payload: string) {}
}

export class DeleteTvShowListSuccess implements Action {
  readonly type = UserActionTypes.DeleteTvShowListSuccess;

  constructor(public payload: string) {}
}

export class DeleteTvShowListFailed implements Action {
  readonly type = UserActionTypes.DeleteTvShowListFailed;

  constructor(public payload: string) {}
}

export class SetRedirectUrl implements Action {
  readonly type = UserActionTypes.SetRedirectUrl;

  constructor(public payload: string) {}
}

export type UserActions =
  | SetCurrentUser
  | ClearCurrentUser
  | SetUserMessage
  | ClearUserMessage
  | LoadMovieLists
  | LoadMovieListsSuccess
  | LoadMovieListsFailed
  | LoadDiscoverMovies
  | LoadDiscoverMoviesSuccess
  | LoadDiscoverMoviesFailed
  | ClearMovieLists
  | AddMovieList
  | AddMovieListSuccess
  | AddMovieListFailed
  | DeleteMovieList
  | DeleteMovieListSuccess
  | DeleteMovieListFailed
  | LoadTvShowLists
  | LoadTvShowListsSuccess
  | LoadTvShowListsFailed
  | ClearTvShowLists
  | AddTvShowList
  | AddTvShowListSuccess
  | AddTvShowListFailed
  | DeleteTvShowList
  | DeleteTvShowListSuccess
  | DeleteTvShowListFailed
  | SetRedirectUrl;
