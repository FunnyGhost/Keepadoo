import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieService } from '../core/movie.service';
import * as movieActions from './movie.action';
import * as movieSelectors from './movie.state';
import { MovieState } from './movie.state';

@Injectable()
export class MovieEffect {
  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private movieStore: Store<MovieState>
  ) {}

  @Effect()
  loadMoviesInList$ = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.LoadMoviesInList),
    withLatestFrom(this.movieStore.pipe(select(movieSelectors.getCurrentList))),
    mergeMap(([action, currentMovieList]) =>
      this.movieService.getMoviesInList(currentMovieList.key).pipe(
        map((movies: Movie[]) => new movieActions.LoadMoviesInListSuccess(movies)),
        catchError(err => of(new movieActions.LoadMoviesInListFailed(err)))
      )
    )
  );

  @Effect()
  selectMovieList$ = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.SelectMovieList),
    map(() => new movieActions.LoadMoviesInList())
  );

  @Effect()
  addMovie$ = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.AddMovieToCurrentList),
    withLatestFrom(this.movieStore.pipe(select(movieSelectors.getCurrentList))),
    mergeMap(([action, currentMovieList]: [movieActions.AddMovieToCurrentList, MovieList]) =>
      this.movieService.addMovieToList(currentMovieList.key, action.payload).pipe(
        map(() => new movieActions.AddMovieToCurrentListSuccess()),
        catchError(err => of(new movieActions.AddMovieToCurrentListFailed(err)))
      )
    )
  );

  @Effect()
  addMovieSuccess$ = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.AddMovieToCurrentListSuccess),
    map(() => new movieActions.LoadMoviesInList())
  );

  @Effect()
  removeMovie$ = this.actions$.pipe(
    ofType(movieActions.MovieActionTypes.RemoveMovieFromCurrentList),
    withLatestFrom(this.movieStore.pipe(select(movieSelectors.getCurrentList))),
    mergeMap(([action, currentMovieList]: [movieActions.RemoveMovieFromCurrentList, MovieList]) =>
      this.movieService.deleteMovieFromList(currentMovieList.key, action.payload.key).pipe(
        map(() => new movieActions.RemoveMovieFromCurrentListSuccess(action.payload)),
        catchError(err => of(new movieActions.RemoveMovieFromCurrentListFailed(err)))
      )
    )
  );
}