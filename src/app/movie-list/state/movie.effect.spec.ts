import { async, TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { of, throwError } from 'rxjs';
import * as userActions from '../../state//user.action';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieSearchResult } from '../core/models/movie-search-result';
import { MovieService } from '../core/movie.service';
import * as fromActions from './movie.action';
import { MovieEffect } from './movie.effect';

const moviesToUse: Movie[] = [
  {
    title: 'Batman Begins'
  } as Movie,
  {
    title: 'Dark knight rises'
  } as Movie
];

const movieServiceMock = {
  getMoviesInList(key: string) {
    return of(moviesToUse);
  },
  addMovieToList(key: string, movie: MovieSearchResult) {
    return of({});
  },
  deleteMovieFromList(key: string) {
    return of({});
  }
} as MovieService;

describe('MovieEffets', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  describe('loadMoviesInList$', () => {
    it('should dispatch success when there is no error', () => {
      const movieStore = TestBed.get(Store);
      spyOn(movieStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as MovieList);
      });

      const action = new fromActions.LoadMoviesInList();
      const completion = new fromActions.LoadMoviesInListSuccess(moviesToUse);

      const source = new Actions(hot('a', { a: action }));
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.loadMoviesInList$).toBeObservable(expected);
    });
    it('should dispatch error when there is an error', () => {
      const movieStore = TestBed.get(Store);
      spyOn(movieStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as MovieList);
      });
      const errorToUse = 'You failed!';
      spyOn(movieServiceMock, 'getMoviesInList').and.returnValue(throwError(errorToUse));

      const action = new fromActions.LoadMoviesInList();
      const completion = new fromActions.LoadMoviesInListFailed(errorToUse);

      const source = new Actions(hot('a', { a: action }));
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.loadMoviesInList$).toBeObservable(expected);
    });
  });
  describe('selectMovieList$', () => {
    it('should load movies in list', () => {
      const action = new fromActions.SelectMovieList({} as MovieList);
      const completion = new fromActions.LoadMoviesInList();

      const source = new Actions(cold('a', { a: action }));
      const movieStore = TestBed.get(Store);
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.selectMovieList$).toBeObservable(expected);
    });
  });
  describe('addMovie$', () => {
    it('should dispatch success when there is no error', () => {
      const movieStore = TestBed.get(Store);
      spyOn(movieStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as MovieList);
      });

      const action = new fromActions.AddMovieToCurrentList(moviesToUse[0] as MovieSearchResult);
      const completion = new fromActions.AddMovieToCurrentListSuccess();

      const source = new Actions(hot('a', { a: action }));
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.addMovie$).toBeObservable(expected);
    });
    it('should dispatch error when there is an error', () => {
      const movieStore = TestBed.get(Store);
      spyOn(movieStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as MovieList);
      });
      const errorToUse = 'You failed!';
      spyOn(movieServiceMock, 'addMovieToList').and.returnValue(throwError(errorToUse));

      const action = new fromActions.AddMovieToCurrentList(moviesToUse[0] as MovieSearchResult);
      const completion = new fromActions.AddMovieToCurrentListFailed(errorToUse);

      const source = new Actions(hot('a', { a: action }));
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.addMovie$).toBeObservable(expected);
    });
  });
  describe('addMovieSuccessThenLoad$', () => {
    it('should load movies in list', () => {
      const action = new fromActions.AddMovieToCurrentListSuccess();
      const completion = new fromActions.LoadMoviesInList();

      const source = new Actions(cold('a', { a: action }));
      const movieStore = TestBed.get(Store);
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.addMovieSuccessThenLoad$).toBeObservable(expected);
    });
  });
  describe('addMovieSuccessThenSetMessage$', () => {
    it('should set user message', () => {
      const action = new fromActions.AddMovieToCurrentListSuccess();
      const completion = new userActions.SetUserMessage('Movie added to list');

      const source = new Actions(cold('a', { a: action }));
      const movieStore = TestBed.get(Store);
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.addMovieSuccessThenSetMessage$).toBeObservable(expected);
    });
  });
  describe('removeMovie$', () => {
    it('should dispatch success when there is no error', () => {
      const movieStore = TestBed.get(Store);
      spyOn(movieStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as MovieList);
      });

      const action = new fromActions.RemoveMovieFromCurrentList(moviesToUse[0]);
      const completion = new fromActions.RemoveMovieFromCurrentListSuccess(moviesToUse[0]);

      const source = new Actions(hot('a', { a: action }));
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.removeMovie$).toBeObservable(expected);
    });
    it('should dispatch failed when there is an error', () => {
      const movieStore = TestBed.get(Store);
      spyOn(movieStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as MovieList);
      });
      const errorToUse = 'You failed!';
      spyOn(movieServiceMock, 'deleteMovieFromList').and.returnValue(throwError(errorToUse));

      const action = new fromActions.RemoveMovieFromCurrentList(moviesToUse[0]);
      const completion = new fromActions.RemoveMovieFromCurrentListFailed(errorToUse);

      const source = new Actions(hot('a', { a: action }));
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.removeMovie$).toBeObservable(expected);
    });
  });
  describe('removeMovieSuccess$', () => {
    it('should set user message', () => {
      const action = new fromActions.RemoveMovieFromCurrentListSuccess(moviesToUse[0]);
      const completion = new userActions.SetUserMessage('Movie removed from list');

      const source = new Actions(cold('a', { a: action }));
      const movieStore = TestBed.get(Store);
      const effects = new MovieEffect(source, movieServiceMock, movieStore);

      const expected = cold('a', { a: completion });

      expect(effects.removeMovieSuccess$).toBeObservable(expected);
    });
  });
});
