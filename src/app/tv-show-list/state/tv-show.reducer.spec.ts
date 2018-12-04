import { DisplayMode } from 'src/app/tv-show-list/core/models/enums';
import { TvShow } from '../core/models/tv-show';
import { TvShowList } from '../core/models/tv-show-list';
import { TvShowSearchResult } from '../core/models/tv-show-search-result';
import * as fromActions from './tv-show.action';
import * as fromTvShow from './tv-show.reducer';
import { TvShowState } from './tv-show.state';

describe('TvShow reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromTvShow;
      const action = {} as any;
      const state = fromTvShow.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
  describe('ChangeListDisplayMode action', () => {
    it('should set the display mode', () => {
      const { initialState } = fromTvShow;
      const action = new fromActions.ChangeListDisplayMode(DisplayMode.Grid);
      const state = fromTvShow.reducer(initialState, action);

      expect(state.displayMode).toEqual(DisplayMode.Grid);
    });
  });
  describe('SelectTvShowList action', () => {
    it('should set the selected list', () => {
      const { initialState } = fromTvShow;
      const tvShowListToSelect: TvShowList = { key: '123', name: 'To see', userId: '456' };
      const action = new fromActions.SelectTvShowList(tvShowListToSelect);
      const state = fromTvShow.reducer(initialState, action);

      expect(state.currentList).toEqual(tvShowListToSelect);
    });
  });
  describe('LoadTvShowsInList action', () => {
    let state: TvShowState;
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const action = new fromActions.LoadTvShowsInList();
      state = fromTvShow.reducer(initialState, action);
    });

    it('should set loading to true', () => {
      expect(state.loadTvShowsInListLoading).toEqual(true);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
  });
  describe('LoadTvShowsInListSuccess action', () => {
    let state: TvShowState;
    const tvShows: TvShow[] = [
      { id: 123, name: 'Batman Begins' } as TvShow,
      { id: 456, name: 'Dark Knight Rises' } as TvShow
    ];
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const action = new fromActions.LoadTvShowsInListSuccess(tvShows);
      state = fromTvShow.reducer(initialState, action);
    });

    it('should set loading to false', () => {
      expect(state.loadTvShowsInListLoading).toEqual(false);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
    it('should set the tvShows in current list', () => {
      expect(state.tvShowsInCurrentList).toEqual(tvShows);
    });
  });
  describe('LoadTvShowsInListFailed action', () => {
    let state: TvShowState;
    const error = 'You failed!';
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const action = new fromActions.LoadTvShowsInListFailed(error);
      state = fromTvShow.reducer(initialState, action);
    });

    it('should set loading to false', () => {
      expect(state.loadTvShowsInListLoading).toEqual(false);
    });
    it('should set the error', () => {
      expect(state.error).toEqual(error);
    });
    it('should clear the tvShows in current list', () => {
      expect(state.tvShowsInCurrentList).toEqual([]);
    });
  });
  describe('AddTvShowToCurrentList action', () => {
    let state: TvShowState;
    const tvShowToAdd: TvShowSearchResult = {
      id: 123,
      name: 'Batman Begins'
    } as TvShowSearchResult;
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const action = new fromActions.AddTvShowToCurrentList(tvShowToAdd);
      state = fromTvShow.reducer(initialState, action);
    });

    it('should set loading to true', () => {
      expect(state.addTvShowLoading).toEqual(true);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
  });
  describe('AddTvShowToCurrentListSuccess action', () => {
    let state: TvShowState;
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const action = new fromActions.AddTvShowToCurrentListSuccess();
      state = fromTvShow.reducer(initialState, action);
    });

    it('should set loading to false', () => {
      expect(state.addTvShowLoading).toEqual(false);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
  });
  describe('AddTvShowToCurrentListFailed action', () => {
    let state: TvShowState;
    const error = 'You failed!';
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const action = new fromActions.AddTvShowToCurrentListFailed(error);
      state = fromTvShow.reducer(initialState, action);
    });

    it('should set loading to false', () => {
      expect(state.addTvShowLoading).toEqual(false);
    });
    it('should set the error', () => {
      expect(state.error).toEqual(error);
    });
  });
  describe('RemoveTvShowFromCurrentList action', () => {
    let state: TvShowState;
    const tvShow: TvShow = { key: '123', id: 123, name: 'Batman Begins' } as TvShow;
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const action = new fromActions.RemoveTvShowFromCurrentList(tvShow);
      state = fromTvShow.reducer(initialState, action);
    });

    it('should set loading to true', () => {
      expect(state.removeTvShowLoading).toEqual(true);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
  });
  describe('RemoveTvShowFromCurrentListSuccess action', () => {
    let state: TvShowState;
    const tvShow: TvShow = { key: '123', id: 123, name: 'Batman Begins' } as TvShow;
    const tvShowsInCurrentList = [
      { key: '123', name: 'Batman Begins' } as TvShow,
      { key: '456', name: 'Dark Knight Rises' } as TvShow
    ];
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const previousState = { ...initialState, tvShowsInCurrentList };
      const action = new fromActions.RemoveTvShowFromCurrentListSuccess(tvShow);
      state = fromTvShow.reducer(previousState, action);
    });

    it('should set loading to false', () => {
      expect(state.removeTvShowLoading).toEqual(false);
    });
    it('should clear the error', () => {
      expect(state.error).toEqual('');
    });
    it('should remove the delete tvShow', () => {
      expect(state.tvShowsInCurrentList).toEqual([tvShowsInCurrentList[1]]);
    });
  });
  describe('RemoveTvShowFromCurrentListFailed action', () => {
    let state: TvShowState;
    const error = 'You failed!';
    const tvShowsInCurrentList = [
      { key: '123', name: 'Batman Begins' } as TvShow,
      { key: '456', name: 'Dark Knight Rises' } as TvShow
    ];
    beforeAll(() => {
      const { initialState } = fromTvShow;
      const previousState = { ...initialState, tvShowsInCurrentList };
      const action = new fromActions.RemoveTvShowFromCurrentListFailed(error);
      state = fromTvShow.reducer(previousState, action);
    });

    it('should set loading to false', () => {
      expect(state.removeTvShowLoading).toEqual(false);
    });
    it('should set the error', () => {
      expect(state.error).toEqual(error);
    });
    it('should not remove the delete tvShow', () => {
      expect(state.tvShowsInCurrentList).toEqual(tvShowsInCurrentList);
    });
  });
});
