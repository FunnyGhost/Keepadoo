import { Action } from '@ngrx/store';
import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieSearchResult } from '../core/models/movie-search-result';

export enum MovieActionTypes {
  ChangeListDisplayMode = '[Movie] Change list display mode',
  SelectMovieList = '[Movie] Select movie list',
  SelectMovie = '[Movie] Select movie',
  LoadMoviesInList = '[Movie] Load movies in list',
  LoadMoviesInListSuccess = '[Movie] Load movies in list success',
  LoadMoviesInListFailed = '[Movie] Load movies in list failed',
  AddMovieToCurrentList = '[Movie] Add new movie to current list',
  AddMovieToCurrentListSuccess = '[Movie] Add new movie to current list success',
  AddMovieToCurrentListFailed = '[Movie] Add new movie to current list failed',
  RemoveMovieFromCurrentList = '[Movie] Remove movie from current list',
  RemoveMovieFromCurrentListSuccess = '[Movie] Remove movie from current list success',
  RemoveMovieFromCurrentListFailed = '[Movie] Remove movie from current list failed'
}

export class ChangeListDisplayMode implements Action {
  readonly type = MovieActionTypes.ChangeListDisplayMode;

  constructor(public payload: DisplayMode) {}
}

export class SelectMovieList implements Action {
  readonly type = MovieActionTypes.SelectMovieList;

  constructor(public payload: MovieList) {}
}

export class SelectMovie implements Action {
  readonly type = MovieActionTypes.SelectMovie;

  constructor(public payload: Movie) {}
}

export class LoadMoviesInList implements Action {
  readonly type = MovieActionTypes.LoadMoviesInList;
}

export class LoadMoviesInListFailed implements Action {
  readonly type = MovieActionTypes.LoadMoviesInListFailed;

  constructor(public payload: string) {}
}

export class LoadMoviesInListSuccess implements Action {
  readonly type = MovieActionTypes.LoadMoviesInListSuccess;

  constructor(public payload: Movie[]) {}
}

export class AddMovieToCurrentList implements Action {
  readonly type = MovieActionTypes.AddMovieToCurrentList;

  constructor(public payload: MovieSearchResult) {}
}

export class AddMovieToCurrentListFailed implements Action {
  readonly type = MovieActionTypes.AddMovieToCurrentListFailed;

  constructor(public payload: string) {}
}

export class AddMovieToCurrentListSuccess implements Action {
  readonly type = MovieActionTypes.AddMovieToCurrentListSuccess;
}

export class RemoveMovieFromCurrentList implements Action {
  readonly type = MovieActionTypes.RemoveMovieFromCurrentList;

  constructor(public payload: Movie) {}
}

export class RemoveMovieFromCurrentListFailed implements Action {
  readonly type = MovieActionTypes.RemoveMovieFromCurrentListFailed;

  constructor(public payload: string) {}
}

export class RemoveMovieFromCurrentListSuccess implements Action {
  readonly type = MovieActionTypes.RemoveMovieFromCurrentListSuccess;

  constructor(public payload: Movie) {}
}

export type MovieActions =
  | ChangeListDisplayMode
  | SelectMovieList
  | SelectMovie
  | LoadMoviesInList
  | LoadMoviesInListFailed
  | LoadMoviesInListSuccess
  | AddMovieToCurrentList
  | AddMovieToCurrentListFailed
  | AddMovieToCurrentListSuccess
  | RemoveMovieFromCurrentList
  | RemoveMovieFromCurrentListFailed
  | RemoveMovieFromCurrentListSuccess;
