import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import * as fromActions from './movie.action';
import * as fromReducers from './movie.reducer';
import * as fromSelectors from './movie.state';

describe('Movie selectors', () => {
  let store: Store<fromSelectors.MovieState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), StoreModule.forFeature('movies', fromReducers.reducer)]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe('getDisplayMode', () => {
    const displayModeToUse = DisplayMode.Grid;
    it('should return the display mode', () => {
      let result;

      store.select(fromSelectors.getDisplayMode).subscribe(value => {
        result = value;
      });
      expect(result).toBe(DisplayMode.List);

      store.dispatch(new fromActions.ChangeListDisplayMode(displayModeToUse));
      expect(result).toEqual(displayModeToUse);
    });
  });
  describe('getCurrentList', () => {
    const currentListToUse: MovieList = {
      key: '123',
      name: 'To see',
      userId: 'abc'
    };
    it('should return the current movie list', () => {
      let result;

      store.select(fromSelectors.getCurrentList).subscribe(value => {
        result = value;
      });
      expect(result).toBeNull();

      store.dispatch(new fromActions.SelectMovieList(currentListToUse));
      expect(result).toEqual(currentListToUse);
    });
  });
  describe('getCurrentMovie', () => {
    const currentMovieToUse: Movie = {
      key: '123',
      listId: '4df4f',
      title: 'Dark Knight rises'
    };
    it('should return the current movie', () => {
      let result;

      store.select(fromSelectors.getCurrentMovie).subscribe(value => {
        result = value;
      });
      expect(result).toBeNull();

      store.dispatch(new fromActions.SelectMovie(currentMovieToUse));
      expect(result).toEqual(currentMovieToUse);
    });
  });
  describe('getError', () => {
    const errorToUse = 'You failed!';
    it('should return the current error', () => {
      let result;

      store.select(fromSelectors.getError).subscribe(value => {
        result = value;
      });
      expect(result).toEqual('');

      store.dispatch(new fromActions.LoadMoviesInListFailed(errorToUse));
      expect(result).toEqual(errorToUse);
    });
  });
  describe('getMoviesInCurrentList', () => {
    const moviesToUse: Movie[] = [
      {
        title: 'Batman Begins'
      } as Movie,
      {
        title: 'Dark knight rises'
      } as Movie
    ];
    it('should return the movies in the current list', () => {
      let result;

      store.select(fromSelectors.getMoviesInCurrentList).subscribe(value => {
        result = value;
      });
      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadMoviesInListSuccess(moviesToUse));
      expect(result).toEqual(moviesToUse);
    });
  });
});
