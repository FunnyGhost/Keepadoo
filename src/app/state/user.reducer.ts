import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';
import { UserState } from './state';
import { UserActions, UserActionTypes } from './user.action';

const initialState: UserState = {
  currentUser: null,
  movieLists: [],
  discoverMovies: [],
  tvShowLists: [],
  isLoading: false,
  error: '',
  message: ''
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
        movieLists: [],
        tvShowLists: [],
        message: ''
      };
    case UserActionTypes.SetIsLoading:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.SetIsNotLoading:
      return {
        ...state,
        isLoading: false
      };
    case UserActionTypes.SetUserMessage:
      return {
        ...state,
        message: action.payload
      };
    case UserActionTypes.ClearUserMessage:
      return {
        ...state,
        message: ''
      };
    case UserActionTypes.LoadMovieLists:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.LoadMovieListsSuccess:
      return {
        ...state,
        movieLists: action.payload,
        isLoading: false,
        error: ''
      };
    case UserActionTypes.LoadDiscoverMovies:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.LoadDiscoverMoviesSuccess:
      return {
        ...state,
        discoverMovies: action.payload,
        isLoading: false,
        error: ''
      };
    case UserActionTypes.LoadFailed:
      return {
        ...state,
        movieLists: [],
        isLoading: false,
        error: action.payload
      };
    case UserActionTypes.AddMovieList:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.AddMovieListSuccess:
      return {
        ...state,
        error: '',
        message: 'Movie list added',
        isLoading: false
      };
    case UserActionTypes.AddMovieListFailed:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UserActionTypes.DeleteMovieList:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.DeleteMovieListSuccess:
      return {
        ...state,
        error: '',
        movieLists: state.movieLists.filter(
          (movieList: MovieList) => movieList.key !== action.payload
        ),
        isLoading: false,
        message: 'Movie list deleted'
      };
    case UserActionTypes.DeleteMovieListFailed:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UserActionTypes.LoadTvShowLists:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.LoadTvShowListsSuccess:
      return {
        ...state,
        tvShowLists: action.payload,
        isLoading: false,
        error: ''
      };
    case UserActionTypes.AddTvShowList:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.AddTvShowListSuccess:
      return {
        ...state,
        error: '',
        message: 'Tv-show list added',
        isLoading: false
      };
    case UserActionTypes.AddTvShowListFailed:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UserActionTypes.LoadMovieLists:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.DeleteTvShowListSuccess:
      return {
        ...state,
        error: '',
        tvShowLists: state.tvShowLists.filter(
          (tvShowList: TvShowList) => tvShowList.key !== action.payload
        ),
        isLoading: false,
        message: 'Movie list deleted'
      };
    case UserActionTypes.DeleteTvShowListFailed:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
