import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieSearchResult } from '../core/models/movie-search-result';
import * as fromMovie from './movie.action';

describe('Movie Actions', () => {
  describe('MovieList', () => {
    describe('ChangeListDisplayMode', () => {
      it('should create an action', () => {
        const payload = DisplayMode.Grid;
        const action = new fromMovie.ChangeListDisplayMode(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.ChangeListDisplayMode,
          payload
        });
      });
    });
    describe('SelectMovieList', () => {
      it('should create an action', () => {
        const payload: MovieList = { key: '1234', name: 'To see', userId: '5454' };
        const action = new fromMovie.SelectMovieList(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.SelectMovieList,
          payload
        });
      });
    });
  });
  describe('Movies', () => {
    describe('SelectMovie', () => {
      it('should create an action', () => {
        const payload = { key: 'some-key-here', id: 1234, title: 'Dark Knight rises' } as Movie;
        const action = new fromMovie.SelectMovie(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.SelectMovie,
          payload
        });
      });
    });
    describe('LoadMoviesInList', () => {
      it('should create an action', () => {
        const action = new fromMovie.LoadMoviesInList();

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.LoadMoviesInList
        });
      });
    });
    describe('LoadMoviesInListFailed', () => {
      it('should create an action', () => {
        const payload = 'You failed!';
        const action = new fromMovie.LoadMoviesInListFailed(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.LoadMoviesInListFailed,
          payload
        });
      });
    });
    describe('LoadMoviesInListSuccess', () => {
      it('should create an action', () => {
        const payload: Movie[] = [
          {
            id: 123,
            title: 'Batman Begins'
          } as Movie
        ];
        const action = new fromMovie.LoadMoviesInListSuccess(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.LoadMoviesInListSuccess,
          payload
        });
      });
    });
    describe('AddMovieToCurrentList', () => {
      it('should create an action', () => {
        const payload: MovieSearchResult = {
          id: 123,
          title: 'Batman Begins'
        } as MovieSearchResult;
        const action = new fromMovie.AddMovieToCurrentList(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.AddMovieToCurrentList,
          payload
        });
      });
    });
    describe('AddMovieToCurrentListFailed', () => {
      it('should create an action', () => {
        const payload = 'You failed!';
        const action = new fromMovie.AddMovieToCurrentListFailed(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.AddMovieToCurrentListFailed,
          payload
        });
      });
    });
    describe('AddMovieToCurrentListSuccess', () => {
      it('should create an action', () => {
        const action = new fromMovie.AddMovieToCurrentListSuccess();

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.AddMovieToCurrentListSuccess
        });
      });
    });
    describe('RemoveMovieFromCurrentList', () => {
      it('should create an action', () => {
        const payload: Movie = {
          id: 123,
          title: 'Batman Begins'
        } as Movie;
        const action = new fromMovie.RemoveMovieFromCurrentList(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.RemoveMovieFromCurrentList,
          payload
        });
      });
    });
    describe('RemoveMovieFromCurrentListFailed', () => {
      it('should create an action', () => {
        const payload = 'You failed!';
        const action = new fromMovie.RemoveMovieFromCurrentListFailed(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.RemoveMovieFromCurrentListFailed,
          payload
        });
      });
    });
    describe('RemoveMovieFromCurrentListSuccess', () => {
      it('should create an action', () => {
        const payload: Movie = {
          id: 123,
          title: 'Batman Begins'
        } as Movie;
        const action = new fromMovie.RemoveMovieFromCurrentListSuccess(payload);

        expect(action).toEqual({
          type: fromMovie.MovieActionTypes.RemoveMovieFromCurrentListSuccess,
          payload
        });
      });
    });
  });
});
