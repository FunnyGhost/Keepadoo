import { async, TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { of, throwError } from 'rxjs';
import * as userActions from '../../state//user.action';
import { TvShow } from '../core/models/tv-show';
import { TvShowList } from '../core/models/tv-show-list';
import { TvShowSearchResult } from '../core/models/tv-show-search-result';
import { TvShowService } from '../core/tv-show.service';
import * as fromActions from './tv-show.action';
import { TvShowEffect } from './tv-show.effect';

const tvShowsToUse: TvShow[] = [
  {
    name: 'Gotham'
  } as TvShow,
  {
    name: 'Lost'
  } as TvShow
];

const tvShowServiceMock = {
  getTvShowsInList(key: string) {
    return of(tvShowsToUse);
  },
  addTvShowToList(key: string, tvShow: TvShowSearchResult) {
    return of({});
  },
  deleteTvShowFromList(key: string) {
    return of({});
  }
} as TvShowService;

describe('TvShowEffets', () => {
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

  describe('loadTvShowsInList$', () => {
    it('should dispatch success when there is no error', () => {
      const tvShowStore = TestBed.get(Store);
      spyOn(tvShowStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as TvShowList);
      });

      const action = new fromActions.LoadTvShowsInList();
      const completion = new fromActions.LoadTvShowsInListSuccess(tvShowsToUse);

      const source = new Actions(hot('a', { a: action }));
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.loadTvShowsInList$).toBeObservable(expected);
    });
    it('should dispatch error when there is an error', () => {
      const tvShowStore = TestBed.get(Store);
      spyOn(tvShowStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as TvShowList);
      });
      const errorToUse = 'You failed!';
      spyOn(tvShowServiceMock, 'getTvShowsInList').and.returnValue(throwError(errorToUse));

      const action = new fromActions.LoadTvShowsInList();
      const completion = new fromActions.LoadTvShowsInListFailed(errorToUse);

      const source = new Actions(hot('a', { a: action }));
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.loadTvShowsInList$).toBeObservable(expected);
    });
  });
  describe('selectTvShowList$', () => {
    it('should load tvShows in list', () => {
      const action = new fromActions.SelectTvShowList({} as TvShowList);
      const completion = new fromActions.LoadTvShowsInList();

      const source = new Actions(cold('a', { a: action }));
      const tvShowStore = TestBed.get(Store);
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.selectTvShowList$).toBeObservable(expected);
    });
  });
  describe('addTvShow$', () => {
    it('should dispatch success when there is no error', () => {
      const tvShowStore = TestBed.get(Store);
      spyOn(tvShowStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as TvShowList);
      });

      const action = new fromActions.AddTvShowToCurrentList(tvShowsToUse[0] as TvShowSearchResult);
      const completion = new fromActions.AddTvShowToCurrentListSuccess();

      const source = new Actions(hot('a', { a: action }));
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.addTvShow$).toBeObservable(expected);
    });
    it('should dispatch error when there is an error', () => {
      const tvShowStore = TestBed.get(Store);
      spyOn(tvShowStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as TvShowList);
      });
      const errorToUse = 'You failed!';
      spyOn(tvShowServiceMock, 'addTvShowToList').and.returnValue(throwError(errorToUse));

      const action = new fromActions.AddTvShowToCurrentList(tvShowsToUse[0] as TvShowSearchResult);
      const completion = new fromActions.AddTvShowToCurrentListFailed(errorToUse);

      const source = new Actions(hot('a', { a: action }));
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.addTvShow$).toBeObservable(expected);
    });
  });
  describe('addTvShowSuccessThenLoad$', () => {
    it('should load tvShows in list', () => {
      const action = new fromActions.AddTvShowToCurrentListSuccess();
      const completion = new fromActions.LoadTvShowsInList();

      const source = new Actions(cold('a', { a: action }));
      const tvShowStore = TestBed.get(Store);
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.addTvShowSuccessThenLoad$).toBeObservable(expected);
    });
  });
  describe('addTvShowSuccessThenSetMessage$', () => {
    it('should set user message', () => {
      const action = new fromActions.AddTvShowToCurrentListSuccess();
      const completion = new userActions.SetUserMessage('Tv show added to list');

      const source = new Actions(cold('a', { a: action }));
      const tvShowStore = TestBed.get(Store);
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.addTvShowSuccessThenSetMessage$).toBeObservable(expected);
    });
  });
  describe('removeTvShow$', () => {
    it('should dispatch success when there is no error', () => {
      const tvShowStore = TestBed.get(Store);
      spyOn(tvShowStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as TvShowList);
      });

      const action = new fromActions.RemoveTvShowFromCurrentList(tvShowsToUse[0]);
      const completion = new fromActions.RemoveTvShowFromCurrentListSuccess(tvShowsToUse[0]);

      const source = new Actions(hot('a', { a: action }));
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.removeTvShow$).toBeObservable(expected);
    });
    it('should dispatch failed when there is an error', () => {
      const tvShowStore = TestBed.get(Store);
      spyOn(tvShowStore, 'pipe').and.callFake(() => {
        return of({ key: 'some-key' } as TvShowList);
      });
      const errorToUse = 'You failed!';
      spyOn(tvShowServiceMock, 'deleteTvShowFromList').and.returnValue(throwError(errorToUse));

      const action = new fromActions.RemoveTvShowFromCurrentList(tvShowsToUse[0]);
      const completion = new fromActions.RemoveTvShowFromCurrentListFailed(errorToUse);

      const source = new Actions(hot('a', { a: action }));
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.removeTvShow$).toBeObservable(expected);
    });
  });
  describe('removeTvShowSuccess$', () => {
    it('should set user message', () => {
      const action = new fromActions.RemoveTvShowFromCurrentListSuccess(tvShowsToUse[0]);
      const completion = new userActions.SetUserMessage('Tv show removed from list');

      const source = new Actions(cold('a', { a: action }));
      const tvShowStore = TestBed.get(Store);
      const effects = new TvShowEffect(source, tvShowServiceMock, tvShowStore);

      const expected = cold('a', { a: completion });

      expect(effects.removeTvShowSuccess$).toBeObservable(expected);
    });
  });
});
