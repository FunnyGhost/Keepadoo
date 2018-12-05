import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mapTo, mergeMap, mergeMapTo } from 'rxjs/operators';
import { TMDBService } from '../core/tmdb.service';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
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
    private tmdbService: TMDBService,
    private tvShowListsService: TvShowListsService
  ) {}

  @Effect()
  loadMovieLists$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadMovieLists),
    mergeMapTo(
      this.movieListsService.getMovieLists().pipe(
        map((movieLists: MovieList[]) => new userActions.LoadMovieListsSuccess(movieLists)),
        catchError(err => of(new userActions.LoadMovieListsFailed(err)))
      )
    )
  );

  @Effect()
  loadDiscoverMovies$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadDiscoverMovies),
    mergeMapTo(
      this.tmdbService.discoverMovies().pipe(
        map(
          (discoveredMovies: MovieDiscover[]) =>
            new userActions.LoadDiscoverMoviesSuccess(discoveredMovies)
        ),
        catchError(err => of(new userActions.LoadDiscoverMoviesFailed(err)))
      )
    )
  );

  @Effect()
  addMovieList$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddMovieList),
    mergeMap((action: any) =>
      this.movieListsService.addMovieList(action.payload.name).pipe(
        mapTo(new userActions.AddMovieListSuccess()),
        catchError(err => of(new userActions.AddMovieListFailed(err)))
      )
    )
  );

  @Effect()
  addMovieListSuccess$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddMovieListSuccess),
    mapTo(new userActions.LoadMovieLists())
  );

  @Effect()
  reloadUserMovieLists$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.SetCurrentUser),
    mapTo(new userActions.LoadMovieLists())
  );

  @Effect()
  clearUserMovieLists$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.ClearCurrentUser),
    mapTo(new userActions.ClearMovieLists())
  );

  @Effect()
  deleteMovieList$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.DeleteMovieList),
    mergeMap((action: any) =>
      this.movieListsService.deleteMovieList(action.payload).pipe(
        map((movieListKey: string) => new userActions.DeleteMovieListSuccess(movieListKey)),
        catchError(err => of(new userActions.DeleteMovieListFailed(err)))
      )
    )
  );

  @Effect()
  loadTvShowLists$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadTvShowLists),
    mergeMapTo(
      this.tvShowListsService.getTvShowLists().pipe(
        map((tvShowLists: TvShowList[]) => new userActions.LoadTvShowListsSuccess(tvShowLists)),
        catchError(err => of(new userActions.LoadTvShowListsFailed(err)))
      )
    )
  );

  @Effect()
  addTvShowList$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddTvShowList),
    mergeMap((action: any) =>
      this.tvShowListsService.addTvShowList(action.payload.name).pipe(
        mapTo(new userActions.AddTvShowListSuccess()),
        catchError(err => of(new userActions.AddTvShowListFailed(err)))
      )
    )
  );

  @Effect()
  addTvShowListSuccess$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.AddTvShowListSuccess),
    mapTo(new userActions.LoadTvShowLists())
  );

  @Effect()
  reloadUserTvShowLists$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.SetCurrentUser),
    mapTo(new userActions.LoadTvShowLists())
  );

  @Effect()
  clearUserTvShowLists$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.ClearCurrentUser),
    mapTo(new userActions.ClearTvShowLists())
  );

  @Effect()
  deleteTvShowList$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.DeleteTvShowList),
    mergeMap((action: any) =>
      this.tvShowListsService.deleteTvShowList(action.payload).pipe(
        map((tvShowListKey: string) => new userActions.DeleteTvShowListSuccess(tvShowListKey)),
        catchError(err => of(new userActions.DeleteTvShowListFailed(err)))
      )
    )
  );
}
