import { DisplayMode } from '../core/models/enums';
import { TvShow } from '../core/models/tv-show';
import { TvShowActions, TvShowActionTypes } from './tv-show.action';
import { TvShowState } from './tv-show.state';

export const initialState: TvShowState = {
  displayMode: DisplayMode.List,
  currentList: null,
  tvShowsInCurrentList: [],
  loadTvShowsInListLoading: false,
  addTvShowLoading: false,
  removeTvShowLoading: false,
  error: ''
};

export function reducer(state: TvShowState = initialState, action: TvShowActions): TvShowState {
  switch (action.type) {
    case TvShowActionTypes.ChangeListDisplayMode:
      return { ...state, displayMode: action.payload };
    case TvShowActionTypes.SelectTvShowList:
      return { ...state, currentList: action.payload };
    case TvShowActionTypes.LoadTvShowsInList:
      return { ...state, loadTvShowsInListLoading: true, error: '' };
    case TvShowActionTypes.LoadTvShowsInListSuccess:
      return {
        ...state,
        tvShowsInCurrentList: action.payload,
        error: '',
        loadTvShowsInListLoading: false
      };
    case TvShowActionTypes.LoadTvShowsInListFailed:
      return {
        ...state,
        tvShowsInCurrentList: [],
        error: action.payload,
        loadTvShowsInListLoading: false
      };
    case TvShowActionTypes.AddTvShowToCurrentList:
      return { ...state, error: '', addTvShowLoading: true };
    case TvShowActionTypes.AddTvShowToCurrentListSuccess:
      return { ...state, error: '', addTvShowLoading: false };
    case TvShowActionTypes.AddTvShowToCurrentListFailed:
      return { ...state, error: action.payload, addTvShowLoading: false };
    case TvShowActionTypes.RemoveTvShowFromCurrentList:
      return {
        ...state,
        error: '',
        removeTvShowLoading: true
      };
    case TvShowActionTypes.RemoveTvShowFromCurrentListSuccess:
      return {
        ...state,
        error: '',
        removeTvShowLoading: false,
        tvShowsInCurrentList: state.tvShowsInCurrentList.filter(
          (tvShow: TvShow) => tvShow.key !== action.payload.key
        )
      };
    case TvShowActionTypes.RemoveTvShowFromCurrentListFailed:
      return {
        ...state,
        removeTvShowLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
