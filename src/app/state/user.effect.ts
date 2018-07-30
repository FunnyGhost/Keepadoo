import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MovieList } from '../movie-list/core/models/movie-list';
import { MovieListsService } from '../movie-list/core/movie-lists.service';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';
import { TvShowListsService } from '../tv-show-list/core/tv-show-lists.service';
import * as userActions from './user.action';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private movieListsService: MovieListsService,
    private tvShowListsService: TvShowListsService
  ) {}

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

  @Effect()
  loadTvShowLists$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadTvShowLists),
    mergeMap((action: userActions.LoadTvShowLists) =>
      this.tvShowListsService.getTvShowLists().pipe(
        map((tvShowLists: TvShowList[]) => new userActions.LoadTvShowListsSuccess(tvShowLists)),
        catchError(err => of(new userActions.LoadFailed(err)))
      )
    )
  );

  @Effect()
  addTvShowList$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddTvShowList),
    mergeMap((action: userActions.AddTvShowList) =>
      this.tvShowListsService.addTvShowList(action.payload.name).pipe(
        map((tvShowLists: TvShowList[]) => new userActions.AddTvShowListSuccess()),
        catchError(err => of(new userActions.LoadFailed(err)))
      )
    )
  );

  @Effect()
  addTvShowListSuccess$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddTvShowListSuccess),
    map(() => new userActions.LoadTvShowLists())
  );

  @Effect()
  deleteTvShowList$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.DeleteTvShowList),
    mergeMap((action: userActions.DeleteTvShowList) =>
      this.tvShowListsService.deleteTvShowList(action.payload).pipe(
        map((tvShowListKey: string) => new userActions.DeleteTvShowListSuccess(tvShowListKey)),
        catchError(err => of(new userActions.DeleteTvShowListFailed(err)))
      )
    )
  );
}
