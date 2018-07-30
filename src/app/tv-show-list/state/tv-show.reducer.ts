import { DisplayMode } from '../core/models/enums';
import { TvShow } from '../core/models/tv-show';
import { TvShowActions, TvShowActionTypes } from './tv-show.action';
import { TvShowState } from './tv-show.state';

const initialState: TvShowState = {
  displayMode: DisplayMode.List,
  currentList: null,
  tvShowsInCurrentList: [],
  error: ''
};

export function reducer(state: TvShowState = initialState, action: TvShowActions): TvShowState {
  switch (action.type) {
    case TvShowActionTypes.ChangeListDisplayMode:
      return { ...state, displayMode: action.payload };
    case TvShowActionTypes.SelectTvShowList:
      return { ...state, currentList: action.payload };
    case TvShowActionTypes.LoadTvShowsInListSuccess:
      return { ...state, tvShowsInCurrentList: action.payload, error: '' };
    case TvShowActionTypes.LoadTvShowsInListFailed:
      return { ...state, tvShowsInCurrentList: [], error: action.payload };
    case TvShowActionTypes.AddTvShowToCurrentListSuccess:
      return { ...state, error: '' };
    case TvShowActionTypes.AddTvShowToCurrentListFailed:
      return { ...state, error: action.payload };
    case TvShowActionTypes.RemoveTvShowFromCurrentListSuccess:
      return {
        ...state,
        error: '',
        tvShowsInCurrentList: state.tvShowsInCurrentList.filter(
          (tvShow: TvShow) => tvShow.key !== action.payload.key
        )
      };
    case TvShowActionTypes.RemoveTvShowFromCurrentListFailed:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
