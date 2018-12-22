import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieActions, MovieActionTypes } from './movie.action';
import { MovieState } from './movie.state';

export const initialState: MovieState = {
  displayMode: DisplayMode.List,
  currentList: null,
  currentMovie: null,
  moviesInCurrentList: [],
  loadMoviesInListLoading: false,
  addMovieLoading: false,
  removeMovieLoading: false,
  error: ''
};

export function reducer(state: MovieState = initialState, action: MovieActions): MovieState {
  switch (action.type) {
    case MovieActionTypes.ChangeListDisplayMode:
      return { ...state, displayMode: action.payload };
    case MovieActionTypes.SelectMovieList:
      return { ...state, currentList: action.payload };
    case MovieActionTypes.SelectMovie:
      return { ...state, currentMovie: action.payload };
    case MovieActionTypes.LoadMoviesInList:
      return { ...state, loadMoviesInListLoading: true, error: '' };
    case MovieActionTypes.LoadMoviesInListSuccess:
      return {
        ...state,
        moviesInCurrentList: action.payload,
        error: '',
        loadMoviesInListLoading: false
      };
    case MovieActionTypes.LoadMoviesInListFailed:
      return {
        ...state,
        moviesInCurrentList: [],
        error: action.payload,
        loadMoviesInListLoading: false
      };
    case MovieActionTypes.AddMovieToCurrentList:
      return { ...state, error: '', addMovieLoading: true };
    case MovieActionTypes.AddMovieToCurrentListSuccess:
      return { ...state, error: '', addMovieLoading: false };
    case MovieActionTypes.AddMovieToCurrentListFailed:
      return { ...state, error: action.payload, addMovieLoading: false };
    case MovieActionTypes.RemoveMovieFromCurrentList:
      return {
        ...state,
        error: '',
        removeMovieLoading: true
      };
    case MovieActionTypes.RemoveMovieFromCurrentListSuccess:
      return {
        ...state,
        error: '',
        removeMovieLoading: false,
        moviesInCurrentList: state.moviesInCurrentList.filter(
          (movie: Movie) => movie.key !== action.payload.key
        )
      };
    case MovieActionTypes.RemoveMovieFromCurrentListFailed:
      return {
        ...state,
        removeMovieLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
