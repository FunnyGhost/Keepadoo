import { User } from '../core/models/user';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';
import { UserState } from './state';
import * as fromActions from './user.action';
import * as fromUser from './user.reducer';

describe('User reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUser;
      const action = {} as any;
      const state = fromUser.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
  describe('SetCurrentUser action', () => {
    it('should set the current user', () => {
      const { initialState } = fromUser;
      const userToUse = { userId: '1234', email: 'batman@dc.com' } as User;
      const action = new fromActions.SetCurrentUser(userToUse);
      const state = fromUser.reducer(initialState, action);

      expect(state.currentUser).toEqual(userToUse);
    });
  });
  describe('ClearCurrentUser action', () => {
    let state: UserState;

    beforeAll(() => {
      const { initialState } = fromUser;
      const userToUse = { userId: '1234', email: 'batman@dc.com' } as User;
      const previousState = { ...initialState, currentUser: userToUse };
      const action = new fromActions.ClearCurrentUser();
      state = fromUser.reducer(previousState, action);
    });

    it('should clear the current user', () => {
      expect(state.currentUser).toBeNull();
    });
    it('should clear the movie lists', () => {
      expect(state.movieLists).toEqual([]);
    });
    it('should clear the tv-show lists', () => {
      expect(state.tvShowLists).toEqual([]);
    });
    it('should clear the user message', () => {
      expect(state.message).toEqual('');
    });
    it('should clear the redirectUrl', () => {
      expect(state.redirectUrl).toEqual('');
    });
  });
  describe('SetUserMessage action', () => {
    it('should set the user message', () => {
      const { initialState } = fromUser;
      const messageToUse = 'Hello mister!';
      const action = new fromActions.SetUserMessage(messageToUse);
      const state = fromUser.reducer(initialState, action);

      expect(state.message).toEqual(messageToUse);
    });
  });
  describe('ClearUserMessage action', () => {
    it('should clear the user message', () => {
      const { initialState } = fromUser;
      const message = 'Hello mister!';
      const previousState = { ...initialState, message };
      const action = new fromActions.ClearUserMessage();
      const state = fromUser.reducer(previousState, action);

      expect(state.message).toEqual('');
    });
  });
  describe('Movie lists', () => {
    describe('LoadMovieLists action', () => {
      it('should set loading to true', () => {
        const { initialState } = fromUser;
        const action = new fromActions.LoadMovieLists();
        const state = fromUser.reducer(initialState, action);

        expect(state.movieListsLoading).toEqual(true);
      });
    });
    describe('LoadMovieListsSuccess action', () => {
      const movieListsToUse: MovieList[] = [
        {
          key: '123',
          name: 'To see',
          userId: 'Batman'
        },
        {
          key: '456',
          name: 'Seen',
          userId: 'Batman'
        }
      ];
      let state: UserState;

      beforeAll(() => {
        const { initialState } = fromUser;
        const action = new fromActions.LoadMovieListsSuccess(movieListsToUse);
        state = fromUser.reducer(initialState, action);
      });
      it('should set loading to false', () => {
        expect(state.movieListsLoading).toEqual(false);
      });
      it('should set error to empty', () => {
        expect(state.error).toEqual('');
      });
      it('should set the movie lists', () => {
        expect(state.movieLists).toEqual(movieListsToUse);
      });
    });
    describe('LoadMovieListsFailed action', () => {
      const errorToUse = 'You failed!';
      const movieListsToUse: MovieList[] = [
        {
          key: '123',
          name: 'To see',
          userId: 'Batman'
        },
        {
          key: '456',
          name: 'Seen',
          userId: 'Batman'
        }
      ];
      let state: UserState;

      beforeAll(() => {
        const { initialState } = fromUser;
        const previousState = { ...initialState, movieLists: movieListsToUse };
        const action = new fromActions.LoadMovieListsFailed(errorToUse);
        state = fromUser.reducer(previousState, action);
      });
      it('should set loading to false', () => {
        expect(state.movieListsLoading).toEqual(false);
      });
      it('should set error to fetch error', () => {
        expect(state.error).toEqual(errorToUse);
      });
      it('should set the movie lists', () => {
        expect(state.movieLists).toEqual([]);
      });
    });
    describe('LoadDiscoverMovies action', () => {
      it('should set loading to true', () => {
        const { initialState } = fromUser;
        const action = new fromActions.LoadDiscoverMovies();
        const state = fromUser.reducer(initialState, action);

        expect(state.discoverMoviesLoading).toEqual(true);
      });
    });
    describe('LoadDiscoverMoviesSuccess action', () => {
      const discoveredMovies: MovieDiscover[] = [
        {
          id: 123,
          title: 'Batman Begins'
        } as MovieDiscover,
        {
          id: 456,
          title: 'The laughing Joke'
        } as MovieDiscover
      ];
      let state: UserState;

      beforeAll(() => {
        const { initialState } = fromUser;
        const action = new fromActions.LoadDiscoverMoviesSuccess(discoveredMovies);
        state = fromUser.reducer(initialState, action);
      });
      it('should set loading to false', () => {
        expect(state.discoverMoviesLoading).toEqual(false);
      });
      it('should set error to empty', () => {
        expect(state.error).toEqual('');
      });
      it('should set the movie lists', () => {
        expect(state.discoverMovies).toEqual(discoveredMovies);
      });
    });
    describe('LoadDiscoverMoviesFailed action', () => {
      const errorToUse = 'You failed!';
      const discoveredMovies: MovieDiscover[] = [
        {
          id: 123,
          title: 'Batman Begins'
        } as MovieDiscover,
        {
          id: 456,
          title: 'The laughing Joke'
        } as MovieDiscover
      ];
      let state: UserState;

      beforeAll(() => {
        const { initialState } = fromUser;
        const previousState = { ...initialState, discoverMovies: discoveredMovies };
        const action = new fromActions.LoadDiscoverMoviesFailed(errorToUse);
        state = fromUser.reducer(previousState, action);
      });
      it('should set loading to false', () => {
        expect(state.discoverMoviesLoading).toEqual(false);
      });
      it('should set error to fetch error', () => {
        expect(state.error).toEqual(errorToUse);
      });
      it('should set the movie lists', () => {
        expect(state.discoverMovies).toEqual([]);
      });
    });
    describe('AddMovieList action', () => {
      it('should return the same state', () => {
        const { initialState } = fromUser;
        const action = new fromActions.AddMovieList({} as MovieList);
        const state = fromUser.reducer(initialState, action);

        expect(state).toEqual(initialState);
      });
    });
    describe('AddMovieListSuccess action', () => {
      let state: UserState;
      beforeAll(() => {
        const { initialState } = fromUser;
        const action = new fromActions.AddMovieListSuccess();
        state = fromUser.reducer(initialState, action);
      });
      it('should clear the error', () => {
        expect(state.error).toEqual('');
      });
      it('should set a message that the list was added', () => {
        expect(state.message).toEqual('Movie list added');
      });
    });
    describe('AddMovieListFailed action', () => {
      it('should set the error', () => {
        const { initialState } = fromUser;
        const error = 'You failed!';
        const action = new fromActions.AddMovieListFailed(error);
        const state = fromUser.reducer(initialState, action);

        expect(state.error).toEqual(error);
      });
    });
    describe('DeleteMovieList action', () => {
      it('should return the same state', () => {
        const { initialState } = fromUser;
        const action = new fromActions.DeleteMovieList('listId');
        const state = fromUser.reducer(initialState, action);

        expect(state).toEqual(initialState);
      });
    });
    describe('DeleteMovieListSuccess action', () => {
      let state: UserState;
      const movieListsToUse: MovieList[] = [
        {
          key: '123',
          name: 'To see',
          userId: 'Batman'
        },
        {
          key: '456',
          name: 'Seen',
          userId: 'Batman'
        }
      ];
      beforeAll(() => {
        const { initialState } = fromUser;
        const previousState = { ...initialState, movieLists: movieListsToUse };
        const listId = '123';
        const action = new fromActions.DeleteMovieListSuccess(listId);
        state = fromUser.reducer(previousState, action);
      });
      it('should clear the error', () => {
        expect(state.error).toEqual('');
      });
      it('should remove the deleted list', () => {
        expect(state.movieLists).toEqual([movieListsToUse[1]]);
      });
      it('should set a message that the list was deleted', () => {
        expect(state.message).toEqual('Movie list deleted');
      });
    });
    describe('DeleteMovieListFailed action', () => {
      it('should set the error', () => {
        const { initialState } = fromUser;
        const error = 'You failed!';
        const action = new fromActions.DeleteMovieListFailed(error);
        const state = fromUser.reducer(initialState, action);

        expect(state.error).toEqual(error);
      });
    });
  });
  describe('Tv-show lists', () => {
    describe('LoadTvShowLists action', () => {
      it('should set the loading to true', () => {
        const { initialState } = fromUser;
        const action = new fromActions.LoadTvShowLists();
        const state = fromUser.reducer(initialState, action);

        expect(state.tvShowListsLoading).toEqual(true);
      });
    });
    describe('LoadTvShowListsSuccess action', () => {
      let state: UserState;
      const tvShowLists: TvShowList[] = [{ key: '123', name: 'To see', userId: 'qwe' }];
      beforeAll(() => {
        const { initialState } = fromUser;
        const action = new fromActions.LoadTvShowListsSuccess(tvShowLists);
        state = fromUser.reducer(initialState, action);
      });
      it('should set the tv-show lists', () => {
        expect(state.tvShowLists).toEqual(tvShowLists);
      });
      it('should clear the error', () => {
        expect(state.error).toEqual('');
      });
      it('should stop loading', () => {
        expect(state.tvShowListsLoading).toEqual(false);
      });
    });
    describe('LoadTvShowListsFailed action', () => {
      const errorToUse = 'You failed!';
      const tvShowLists: TvShowList[] = [
        {
          key: '123',
          name: 'To see',
          userId: 'Batman'
        },
        {
          key: '456',
          name: 'Seen',
          userId: 'Batman'
        }
      ];
      let state: UserState;

      beforeAll(() => {
        const { initialState } = fromUser;
        const previousState = { ...initialState, tvShowLists: tvShowLists };
        const action = new fromActions.LoadTvShowListsFailed(errorToUse);
        state = fromUser.reducer(previousState, action);
      });
      it('should set loading to false', () => {
        expect(state.tvShowListsLoading).toEqual(false);
      });
      it('should set error to fetch error', () => {
        expect(state.error).toEqual(errorToUse);
      });
      it('should set the tv-show lists', () => {
        expect(state.tvShowLists).toEqual([]);
      });
    });
    describe('AddTvShowList action', () => {
      it('should return the same state', () => {
        const { initialState } = fromUser;
        const action = new fromActions.AddTvShowList({} as TvShowList);
        const state = fromUser.reducer(initialState, action);

        expect(state).toEqual(initialState);
      });
    });
    describe('AddTvShowListSuccess action', () => {
      let state: UserState;
      beforeAll(() => {
        const { initialState } = fromUser;
        const action = new fromActions.AddTvShowListSuccess();
        state = fromUser.reducer(initialState, action);
      });
      it('should clear the error', () => {
        expect(state.error).toEqual('');
      });
      it('should set a message that the list was added', () => {
        expect(state.message).toEqual('Tv-show list added');
      });
    });
    describe('AddTvShowListFailed action', () => {
      it('should set the error', () => {
        const { initialState } = fromUser;
        const error = 'You failed!';
        const action = new fromActions.AddTvShowListFailed(error);
        const state = fromUser.reducer(initialState, action);

        expect(state.error).toEqual(error);
      });
    });
    describe('DeleteTvShowList action', () => {
      it('should return the same state', () => {
        const { initialState } = fromUser;
        const action = new fromActions.DeleteTvShowList('listId');
        const state = fromUser.reducer(initialState, action);

        expect(state).toEqual(initialState);
      });
    });
    describe('DeleteTvShowListSuccess action', () => {
      let state: UserState;
      const tvShowListsToUse: TvShowList[] = [
        { key: '123', name: 'To see', userId: 'Batman' },
        { key: '456', name: 'Seen', userId: 'Batman' }
      ];
      beforeAll(() => {
        const { initialState } = fromUser;
        const previousState = { ...initialState, tvShowLists: tvShowListsToUse };
        const listId = '123';
        const action = new fromActions.DeleteTvShowListSuccess(listId);
        state = fromUser.reducer(previousState, action);
      });
      it('should clear the error', () => {
        expect(state.error).toEqual('');
      });
      it('should remove the deleted list', () => {
        expect(state.tvShowLists).toEqual([tvShowListsToUse[1]]);
      });
      it('should set a message that the list was deleted', () => {
        expect(state.message).toEqual('Tv-show list deleted');
      });
    });
    describe('DeleteMovieListFailed action', () => {
      it('should set the error', () => {
        const { initialState } = fromUser;
        const error = 'You failed!';
        const action = new fromActions.DeleteMovieListFailed(error);
        const state = fromUser.reducer(initialState, action);

        expect(state.error).toEqual(error);
      });
    });
  });
});
