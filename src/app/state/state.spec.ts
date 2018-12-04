import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { User } from '../core/models/user';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';
import * as fromSelectors from './state';
import * as fromActions from './user.action';
import * as fromReducers from './user.reducer';

describe('User selectors', () => {
  const userToUse: User = {
    email: 'batman@dc.com',
    userId: '123'
  };
  let store: Store<fromSelectors.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), StoreModule.forFeature('users', fromReducers.reducer)]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCurrentUser', () => {
    it('should return the current user', () => {
      let result;

      store.select(fromSelectors.getCurrentUser).subscribe(value => {
        result = value;
      });
      expect(result).toBeNull();

      store.dispatch(new fromActions.SetCurrentUser(userToUse));
      expect(result).toEqual(userToUse);
    });
  });
  describe('getMovieLists', () => {
    const movieListsToUse: MovieList[] = [
      {
        key: '123',
        name: 'To see',
        userId: 'asd'
      },
      {
        key: '456',
        name: 'Seen',
        userId: 'fgh'
      }
    ];
    it('should return the movie lists', () => {
      let result;

      store.select(fromSelectors.getMovieLists).subscribe(value => {
        result = value;
      });
      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadMovieListsSuccess(movieListsToUse));
      expect(result).toEqual(movieListsToUse);
    });
  });
  describe('getDiscoverMovies', () => {
    const discoverMoviesToUse: MovieDiscover[] = [
      { title: 'Batman begins' } as MovieDiscover,
      { title: 'Dark knight rises' } as MovieDiscover
    ];
    it('should return the discovered movies', () => {
      let result;

      store.select(fromSelectors.getDiscoverMovies).subscribe(value => {
        result = value;
      });
      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadDiscoverMoviesSuccess(discoverMoviesToUse));
      expect(result).toEqual(discoverMoviesToUse);
    });
  });
  describe('getTvShowLists', () => {
    const tvShowListsToUse: TvShowList[] = [
      { key: '123', name: 'To see', userId: 'asd' },
      { key: '456', name: 'Seen', userId: 'fgh' }
    ];
    it('should return the tv-show lists', () => {
      let result;

      store.select(fromSelectors.getTvShowLists).subscribe(value => {
        result = value;
      });
      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadTvShowListsSuccess(tvShowListsToUse));
      expect(result).toEqual(tvShowListsToUse);
    });
  });
  describe('getMessage', () => {
    const messageToUse = 'I am Batman!';
    it('should return the current message', () => {
      let result;

      store.select(fromSelectors.getMessage).subscribe(value => {
        result = value;
      });
      expect(result).toEqual('');

      store.dispatch(new fromActions.SetUserMessage(messageToUse));
      expect(result).toEqual(messageToUse);
    });
  });
  describe('getRedirectUrl', () => {
    const redirectUrlToUse = 'arkham-asylum';
    it('should return the current redirect url', () => {
      let result;

      store.select(fromSelectors.getRedirectUrl).subscribe(value => {
        result = value;
      });
      expect(result).toEqual('');

      store.dispatch(new fromActions.SetRedirectUrl(redirectUrlToUse));
      expect(result).toEqual(redirectUrlToUse);
    });
  });
  describe('getError', () => {
    const errorToUse = 'Ha-ha-ha-ha';
    it('should return the current error', () => {
      let result;

      store.select(fromSelectors.getError).subscribe(value => {
        result = value;
      });
      expect(result).toEqual('');

      store.dispatch(new fromActions.LoadMovieListsFailed(errorToUse));
      expect(result).toEqual(errorToUse);
    });
  });
});
