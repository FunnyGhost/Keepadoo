import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieActions, MovieActionTypes } from './movie.action';
import { MovieState } from './movie.state';

const initialState: MovieState = {
  displayMode: DisplayMode.List,
  currentList: null,
  moviesInCurrentList: [],
  error: ''
};

export function reducer(state: MovieState = initialState, action: MovieActions): MovieState {
  switch (action.type) {
    case MovieActionTypes.ChangeListDisplayMode:
      return { ...state, displayMode: action.payload };
    case MovieActionTypes.SelectMovieList:
      return { ...state, currentList: action.payload };
    case MovieActionTypes.LoadMoviesInListSuccess:
      return { ...state, moviesInCurrentList: action.payload, error: '' };
    case MovieActionTypes.LoadMoviesInListFailed:
      return { ...state, moviesInCurrentList: [], error: action.payload };
    case MovieActionTypes.AddMovieToCurrentListSuccess:
      return { ...state, error: '' };
    case MovieActionTypes.AddMovieToCurrentListFailed:
      return { ...state, error: action.payload };
    case MovieActionTypes.RemoveMovieFromCurrentListSuccess:
      return {
        ...state,
        error: '',
        moviesInCurrentList: state.moviesInCurrentList.filter(
          (movie: Movie) => movie.key !== action.payload.key
        )
      };
    case MovieActionTypes.RemoveMovieFromCurrentListFailed:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
