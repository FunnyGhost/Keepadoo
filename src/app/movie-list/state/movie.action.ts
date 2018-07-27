import { Action } from '@ngrx/store';
import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';

export enum MovieActionTypes {
  ChangeListDisplayMode = '[Movie] Change list display mode',
  AddMovieList = '[Movie] Add new movie list',
  SelectMovieList = '[Movie] Select movie list',
  DeleteCurrentMovieList = '[Movie] Delete current movie list',
  AddMovieToCurrentList = '[Movie] Add new movie to current list',
  RemoveMovieFromCurrentList = '[Movie] Remove movie from current list'
}

export class ChangeListDisplayMode implements Action {
  readonly type = MovieActionTypes.ChangeListDisplayMode;

  constructor(public payload: DisplayMode) {}
}

export class AddMovieList implements Action {
  readonly type = MovieActionTypes.AddMovieList;

  constructor(public payload: MovieList) {}
}

export class SelectMovieList implements Action {
  readonly type = MovieActionTypes.SelectMovieList;

  constructor(public payload: MovieList) {}
}

export class DeleteCurrentMovieList implements Action {
  readonly type = MovieActionTypes.DeleteCurrentMovieList;
}

export class AddMovieToCurrentList implements Action {
  readonly type = MovieActionTypes.AddMovieToCurrentList;

  constructor(public payload: Movie) {}
}

export class RemoveMovieFromCurrentList implements Action {
  readonly type = MovieActionTypes.RemoveMovieFromCurrentList;

  constructor(public payload: Movie) {}
}

export type MovieActions =
  | ChangeListDisplayMode
  | AddMovieList
  | SelectMovieList
  | DeleteCurrentMovieList
  | AddMovieToCurrentList
  | RemoveMovieFromCurrentList;
