import { DisplayMode } from 'src/app/tv-show-list/core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieSearchResult } from '../core/models/movie-search-result';
import * as fromActions from './movie.action';
import * as fromMovie from './movie.reducer';
import { MovieState } from './movie.state';

describe('Movie reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromMovie;
      const action = {} as any;
      const state = fromMovie.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
  describe('ChangeListDisplayMode action', () => {
    it('should set the display mode', () => {
      const { initialState } = fromMovie;
      const action = new fromActions.ChangeListDisplayMode(DisplayMode.Grid);
      const state = fromMovie.reducer(initialState, action);

      expect(state.displayMode).toEqual(DisplayMode.Grid);
    });
  });
  describe('SelectMovieList action', () => {
    it('should set the selected list', () => {
      const { initialState } = fromMovie;
      const movieListToSelect: MovieList = { key: '123', name: 'To see', userId: '456' };
      const action = new fromActions.SelectMovieList(movieListToSelect);
      const state = fromMovie.reducer(initialState, action);

      expect(state.currentList).toEqual(movieListToSelect);
    });
  });
  describe('LoadMoviesInList action', () => {
    let state: MovieState;
    beforeAll(() => {
      const { initialState } = fromMovie;
      const action = new fromActions.LoadMoviesInList();
      state = fromMovie.reducer(initialState, action);
    });

    it('should set loading to true', () => {
      expect(state.loadMoviesInListLoading).toEqual(true);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
  });
  describe('LoadMoviesInListSuccess action', () => {
    let state: MovieState;
    const movies: Movie[] = [
      {
        id: 123,
        title: 'Batman Begins'
      } as Movie,
      {
        id: 456,
        title: 'Dark Knight Rises'
      } as Movie
    ];
    beforeAll(() => {
      const { initialState } = fromMovie;
      const action = new fromActions.LoadMoviesInListSuccess(movies);
      state = fromMovie.reducer(initialState, action);
    });

    it('should set loading to false', () => {
      expect(state.loadMoviesInListLoading).toEqual(false);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
    it('should set the movies in current list', () => {
      expect(state.moviesInCurrentList).toEqual(movies);
    });
  });
  describe('LoadMoviesInListFailed action', () => {
    let state: MovieState;
    const error = 'You failed!';
    beforeAll(() => {
      const { initialState } = fromMovie;
      const action = new fromActions.LoadMoviesInListFailed(error);
      state = fromMovie.reducer(initialState, action);
    });

    it('should set loading to false', () => {
      expect(state.loadMoviesInListLoading).toEqual(false);
    });
    it('should set the error', () => {
      expect(state.error).toEqual(error);
    });
    it('should clear the movies in current list', () => {
      expect(state.moviesInCurrentList).toEqual([]);
    });
  });
  describe('AddMovieToCurrentList action', () => {
    let state: MovieState;
    const movieToAdd: MovieSearchResult = { id: 123, title: 'Batman Begins' } as MovieSearchResult;
    beforeAll(() => {
      const { initialState } = fromMovie;
      const action = new fromActions.AddMovieToCurrentList(movieToAdd);
      state = fromMovie.reducer(initialState, action);
    });

    it('should set loading to true', () => {
      expect(state.addMovieLoading).toEqual(true);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
  });
  describe('AddMovieToCurrentListSuccess action', () => {
    let state: MovieState;
    beforeAll(() => {
      const { initialState } = fromMovie;
      const action = new fromActions.AddMovieToCurrentListSuccess();
      state = fromMovie.reducer(initialState, action);
    });

    it('should set loading to false', () => {
      expect(state.addMovieLoading).toEqual(false);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
  });
  describe('AddMovieToCurrentListFailed action', () => {
    let state: MovieState;
    const error = 'You failed!';
    beforeAll(() => {
      const { initialState } = fromMovie;
      const action = new fromActions.AddMovieToCurrentListFailed(error);
      state = fromMovie.reducer(initialState, action);
    });

    it('should set loading to false', () => {
      expect(state.addMovieLoading).toEqual(false);
    });
    it('should set the error', () => {
      expect(state.error).toEqual(error);
    });
  });
  describe('RemoveMovieFromCurrentList action', () => {
    let state: MovieState;
    const movie: Movie = { key: '123', id: 123, title: 'Batman Begins' } as Movie;
    beforeAll(() => {
      const { initialState } = fromMovie;
      const action = new fromActions.RemoveMovieFromCurrentList(movie);
      state = fromMovie.reducer(initialState, action);
    });

    it('should set loading to true', () => {
      expect(state.removeMovieLoading).toEqual(true);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
  });
  describe('RemoveMovieFromCurrentListSuccess action', () => {
    let state: MovieState;
    const movie: Movie = { key: '123', id: 123, title: 'Batman Begins' } as Movie;
    const moviesInCurrentList = [
      {
        key: '123',
        title: 'Batman Begins'
      } as Movie,
      {
        key: '456',
        title: 'Dark Knight Rises'
      } as Movie
    ];
    beforeAll(() => {
      const { initialState } = fromMovie;
      const previousState = { ...initialState, moviesInCurrentList };
      const action = new fromActions.RemoveMovieFromCurrentListSuccess(movie);
      state = fromMovie.reducer(previousState, action);
    });

    it('should set loading to false', () => {
      expect(state.removeMovieLoading).toEqual(false);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
    it('should remove the delete movie', () => {
      expect(state.moviesInCurrentList).toEqual([moviesInCurrentList[1]]);
    });
  });
  describe('RemoveMovieFromCurrentListFailed action', () => {
    let state: MovieState;
    const error = 'You failed!';
    const moviesInCurrentList = [
      { key: '123', title: 'Batman Begins' } as Movie,
      { key: '456', title: 'Dark Knight Rises' } as Movie
    ];
    beforeAll(() => {
      const { initialState } = fromMovie;
      const previousState = { ...initialState, moviesInCurrentList };
      const action = new fromActions.RemoveMovieFromCurrentListFailed(error);
      state = fromMovie.reducer(previousState, action);
    });

    it('should set loading to false', () => {
      expect(state.removeMovieLoading).toEqual(false);
    });
    it('should set the error', () => {
      expect(state.error).toEqual(error);
    });
    it('should not remove the delete movie', () => {
      expect(state.moviesInCurrentList).toEqual(moviesInCurrentList);
    });
  });
});
