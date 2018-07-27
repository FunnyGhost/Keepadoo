import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieActions, MovieActionTypes } from './movie.action';
import { MovieState } from './movie.state';

const initialState: MovieState = {
  displayMode: DisplayMode.List,
  currentList: null,
  moviesInCurrentList: []
};

export function reducer(state: MovieState = initialState, action: MovieActions): MovieState {
  switch (action.type) {
    case MovieActionTypes.ChangeListDisplayMode:
      return {
        ...state,
        displayMode: action.payload
      };
    case MovieActionTypes.AddMovieToCurrentList:
      return {
        ...state,
        moviesInCurrentList: [...state.moviesInCurrentList, action.payload]
      };
    case MovieActionTypes.RemoveMovieFromCurrentList:
      return {
        ...state,
        moviesInCurrentList: state.moviesInCurrentList.filter(
          (movie: Movie) => movie.key !== action.payload.key
        )
      };
    case MovieActionTypes.SelectMovieList:
      return {
        ...state,
        currentList: action.payload
      };
    default:
      return state;
  }
}
