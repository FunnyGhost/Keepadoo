import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';
import { UserState } from './state';
import { UserActions, UserActionTypes } from './user.action';

const initialState: UserState = {
  currentUser: null,
  movieLists: [],
  tvShowLists: [],
  error: ''
};

export function reducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.SetCurrentUser:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.ClearCurrentUser:
      return {
        ...state,
        currentUser: null,
        movieLists: []
      };
    case UserActionTypes.LoadMovieListsSuccess:
      return {
        ...state,
        movieLists: action.payload,
        error: ''
      };
    case UserActionTypes.LoadFailed:
      return {
        ...state,
        movieLists: [],
        error: action.payload
      };
    case UserActionTypes.AddMovieListSuccess:
      return {
        ...state,
        error: ''
      };
    case UserActionTypes.AddMovieListFailed:
      return {
        ...state,
        error: action.payload
      };
    case UserActionTypes.DeleteMovieListSuccess:
      return {
        ...state,
        error: '',
        movieLists: state.movieLists.filter(
          (movieList: MovieList) => movieList.key !== action.payload
        )
      };
    case UserActionTypes.DeleteMovieListFailed:
      return {
        ...state,
        error: action.payload
      };
    case UserActionTypes.LoadTvShowListsSuccess:
      return {
        ...state,
        tvShowLists: action.payload,
        error: ''
      };
    case UserActionTypes.AddTvShowListSuccess:
      return {
        ...state,
        error: ''
      };
    case UserActionTypes.AddTvShowListFailed:
      return {
        ...state,
        error: action.payload
      };
    case UserActionTypes.DeleteTvShowListSuccess:
      return {
        ...state,
        error: '',
        tvShowLists: state.tvShowLists.filter(
          (tvShowList: TvShowList) => tvShowList.key !== action.payload
        )
      };
    case UserActionTypes.DeleteTvShowListFailed:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
