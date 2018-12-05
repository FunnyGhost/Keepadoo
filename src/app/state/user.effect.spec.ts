import { Actions } from '@ngrx/effects';
import { cold } from 'jest-marbles';
import { of, throwError } from 'rxjs';
import { User } from '../core/models/user';
import { TMDBService } from '../core/tmdb.service';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import { MovieList } from '../movie-list/core/models/movie-list';
import { MovieListsService } from '../movie-list/core/movie-lists.service';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';
import { TvShowListsService } from '../tv-show-list/core/tv-show-lists.service';
import * as fromActions from './user.action';
import { UserEffect } from './user.effect';

const errorToUse = 'You failed!';
const movieListsToUse: MovieList[] = [
  {
    key: '123',
    name: 'To see',
    userId: 'asd'
  },
  {
    key: '456',
    name: 'Seen',
    userId: 'asd'
  }
];
const tvShowListsToUse: TvShowList[] = [
  {
    key: '123',
    name: 'To see',
    userId: 'asd'
  },
  {
    key: '456',
    name: 'Seen',
    userId: 'asd'
  }
];
const discoverMoviesToUse: MovieDiscover[] = [
  {
    title: 'Batman begins'
  } as MovieDiscover,
  {
    title: 'Dark knight rises'
  } as MovieDiscover
];
const movieListsServiceMock = {
  addMovieList(name: string) {
    return of([]);
  },
  deleteMovieList(key: string) {
    return of(key);
  },
  getMovieLists() {
    return of(movieListsToUse);
  }
} as MovieListsService;
const tvShowListsServiceMock = {
  addTvShowList(name: string) {
    return of([]);
  },
  deleteTvShowList(key: string) {
    return of(key);
  },
  getTvShowLists() {
    return of(tvShowListsToUse);
  }
} as TvShowListsService;
const tmdbServiceMock = {
  discoverMovies() {
    return of(discoverMoviesToUse);
  }
} as TMDBService;

describe('UserEffects', () => {
  describe('Movies', () => {
    describe('loadMovieLists$', () => {
      it('should dispatch success when there is no error', () => {
        const action = new fromActions.LoadMovieLists();
        const completion = new fromActions.LoadMovieListsSuccess(movieListsToUse);

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.loadMovieLists$).toBeObservable(expected);
      });
      it('should dispatch failed when there is an error', () => {
        const action = new fromActions.LoadMovieLists();
        const completion = new fromActions.LoadMovieListsFailed(errorToUse);
        spyOn(movieListsServiceMock, 'getMovieLists').and.returnValue(throwError(errorToUse));

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.loadMovieLists$).toBeObservable(expected);
      });
    });
    describe('loadDiscoverMovies$', () => {
      it('should dispatch success when there is no error', () => {
        const action = new fromActions.LoadDiscoverMovies();
        const completion = new fromActions.LoadDiscoverMoviesSuccess(discoverMoviesToUse);

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.loadDiscoverMovies$).toBeObservable(expected);
      });
      it('should dispatch failed when there is an error', () => {
        const action = new fromActions.LoadDiscoverMovies();
        const completion = new fromActions.LoadDiscoverMoviesFailed(errorToUse);
        spyOn(tmdbServiceMock, 'discoverMovies').and.returnValue(throwError(errorToUse));

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.loadDiscoverMovies$).toBeObservable(expected);
      });
    });
    describe('addMovieList$', () => {
      it('should dispatch success when there is no error', () => {
        const action = new fromActions.AddMovieList(movieListsToUse[0]);
        const completion = new fromActions.AddMovieListSuccess();

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.addMovieList$).toBeObservable(expected);
      });
      it('should dispatch failed when there is an error', () => {
        const action = new fromActions.AddMovieList(movieListsToUse[0]);
        const completion = new fromActions.AddMovieListFailed(errorToUse);
        spyOn(movieListsServiceMock, 'addMovieList').and.returnValue(throwError(errorToUse));

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.addMovieList$).toBeObservable(expected);
      });
    });
    describe('addMovieListSuccess$', () => {
      it('should dispatch load movie lists', () => {
        const action = new fromActions.AddMovieListSuccess();
        const completion = new fromActions.LoadMovieLists();

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.addMovieListSuccess$).toBeObservable(expected);
      });
    });
    describe('reloadUserMovieLists$', () => {
      it('should dispatch load movie lists', () => {
        const action = new fromActions.SetCurrentUser({} as User);
        const completion = new fromActions.LoadMovieLists();

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.reloadUserMovieLists$).toBeObservable(expected);
      });
    });
    describe('clearUserMovieLists$', () => {
      it('should dispatch clear movie lists', () => {
        const action = new fromActions.ClearCurrentUser();
        const completion = new fromActions.ClearMovieLists();

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.clearUserMovieLists$).toBeObservable(expected);
      });
    });
    describe('deleteMovieList$', () => {
      it('should dispatch success when there is no error', () => {
        const action = new fromActions.DeleteMovieList(movieListsToUse[0].key);
        const completion = new fromActions.DeleteMovieListSuccess(movieListsToUse[0].key);

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.deleteMovieList$).toBeObservable(expected);
      });
      it('should dispatch failed when there is an error', () => {
        const action = new fromActions.DeleteMovieList(movieListsToUse[0].key);
        const completion = new fromActions.DeleteMovieListFailed(errorToUse);
        spyOn(movieListsServiceMock, 'deleteMovieList').and.returnValue(throwError(errorToUse));

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.deleteMovieList$).toBeObservable(expected);
      });
    });
  });
  describe('TvShows', () => {
    describe('loadTvShowLists$', () => {
      it('should dispatch success when there is no error', () => {
        const action = new fromActions.LoadTvShowLists();
        const completion = new fromActions.LoadTvShowListsSuccess(tvShowListsToUse);

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.loadTvShowLists$).toBeObservable(expected);
      });
      it('should dispatch failed when there is an error', () => {
        const action = new fromActions.LoadTvShowLists();
        const completion = new fromActions.LoadTvShowListsFailed(errorToUse);
        spyOn(tvShowListsServiceMock, 'getTvShowLists').and.returnValue(throwError(errorToUse));

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.loadTvShowLists$).toBeObservable(expected);
      });
    });
    describe('addTvShowList$', () => {
      it('should dispatch success when there is no error', () => {
        const action = new fromActions.AddTvShowList(movieListsToUse[0]);
        const completion = new fromActions.AddTvShowListSuccess();

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.addTvShowList$).toBeObservable(expected);
      });
      it('should dispatch failed when there is an error', () => {
        const action = new fromActions.AddTvShowList(movieListsToUse[0]);
        const completion = new fromActions.AddTvShowListFailed(errorToUse);
        spyOn(tvShowListsServiceMock, 'addTvShowList').and.returnValue(throwError(errorToUse));

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.addTvShowList$).toBeObservable(expected);
      });
    });
    describe('addTvShowListSuccess$', () => {
      it('should dispatch load tv-show lists', () => {
        const action = new fromActions.AddTvShowListSuccess();
        const completion = new fromActions.LoadTvShowLists();

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.addTvShowListSuccess$).toBeObservable(expected);
      });
    });
    describe('reloadUserTvShowLists$', () => {
      it('should dispatch load tv-show lists', () => {
        const action = new fromActions.SetCurrentUser({} as User);
        const completion = new fromActions.LoadTvShowLists();

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.reloadUserTvShowLists$).toBeObservable(expected);
      });
    });
    describe('clearUserTvShowLists$', () => {
      it('should dispatch clear tv-show lists', () => {
        const action = new fromActions.ClearCurrentUser();
        const completion = new fromActions.ClearTvShowLists();

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.clearUserTvShowLists$).toBeObservable(expected);
      });
    });
    describe('deleteTvShowList$', () => {
      it('should dispatch success when there is no error', () => {
        const action = new fromActions.DeleteTvShowList(tvShowListsToUse[0].key);
        const completion = new fromActions.DeleteTvShowListSuccess(tvShowListsToUse[0].key);

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.deleteTvShowList$).toBeObservable(expected);
      });
      it('should dispatch failed when there is an error', () => {
        const action = new fromActions.DeleteTvShowList(movieListsToUse[0].key);
        const completion = new fromActions.DeleteTvShowListFailed(errorToUse);
        spyOn(tvShowListsServiceMock, 'deleteTvShowList').and.returnValue(throwError(errorToUse));

        const source = new Actions(cold('a', { a: action }));
        const effects = new UserEffect(
          source,
          movieListsServiceMock,
          tmdbServiceMock,
          tvShowListsServiceMock
        );

        const expected = cold('a', { a: completion });

        expect(effects.deleteTvShowList$).toBeObservable(expected);
      });
    });
  });
});
