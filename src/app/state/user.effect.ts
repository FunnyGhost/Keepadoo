import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'node_modules/rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MovieList } from '../movie-list/core/models/movie-list';
import { MovieListsService } from '../movie-list/core/movie-lists.service';
import * as userActions from './user.action';

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions, private movieListsService: MovieListsService) {}

  @Effect()
  loadMovieLists$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadMovieLists),
    mergeMap((action: userActions.LoadMovieLists) =>
      this.movieListsService.getMovieLists().pipe(
        map((movieLists: MovieList[]) => new userActions.LoadMovieListsSuccess(movieLists)),
        catchError(err => of(new userActions.LoadFailed(err)))
      )
    )
  );

  @Effect()
  addMovieList$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddMovieList),
    mergeMap((action: userActions.AddMovieList) =>
      this.movieListsService.addMovieList(action.payload.name).pipe(
        map((movieLists: MovieList[]) => new userActions.AddMovieListSuccess()),
        catchError(err => of(new userActions.LoadFailed(err)))
      )
    )
  );

  @Effect()
  addMovieListSuccess$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddMovieListSuccess),
    map(() => new userActions.LoadMovieLists())
  );

  @Effect()
  deleteMovieList$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.DeleteMovieList),
    mergeMap((action: userActions.DeleteMovieList) =>
      this.movieListsService.deleteMovieList(action.payload).pipe(
        map((movieListKey: string) => new userActions.DeleteMovieListSuccess(movieListKey)),
        catchError(err => of(new userActions.DeleteMovieListFailed(err)))
      )
    )
  );
}
