import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DisplayMode } from '../core/models/enums';
import { TvShow } from '../core/models/tv-show';
import { TvShowList } from '../core/models/tv-show-list';
import * as fromActions from './tv-show.action';
import * as fromReducers from './tv-show.reducer';
import * as fromSelectors from './tv-show.state';

describe('TvShow selectors', () => {
  let store: Store<fromSelectors.TvShowState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), StoreModule.forFeature('tv-shows', fromReducers.reducer)]
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
    const currentListToUse: TvShowList = {
      key: '123',
      name: 'To see',
      userId: 'abc'
    };
    it('should return the current tvShow list', () => {
      let result;

      store.select(fromSelectors.getCurrentList).subscribe(value => {
        result = value;
      });
      expect(result).toBeNull();

      store.dispatch(new fromActions.SelectTvShowList(currentListToUse));
      expect(result).toEqual(currentListToUse);
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

      store.dispatch(new fromActions.LoadTvShowsInListFailed(errorToUse));
      expect(result).toEqual(errorToUse);
    });
  });
  describe('getTvShowsInCurrentList', () => {
    const tvShowsToUse: TvShow[] = [
      {
        name: 'Lost'
      } as TvShow,
      {
        name: 'Gotham'
      } as TvShow
    ];
    it('should return the tvShows in the current list', () => {
      let result;

      store.select(fromSelectors.getTvShowsInCurrentList).subscribe(value => {
        result = value;
      });
      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadTvShowsInListSuccess(tvShowsToUse));
      expect(result).toEqual(tvShowsToUse);
    });
  });
});
