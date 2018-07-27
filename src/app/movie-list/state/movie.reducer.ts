import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';
import { MovieActions, MovieActionTypes } from './movie.action';
import { MovieState } from './movie.state';

const initialState: MovieState = {
  displayMode: DisplayMode.List,
  currentList: null,
  moviesInCurrentList: [],
  movieLists: []
};

export function reducer(state: MovieState = initialState, action: MovieActions): MovieState {
  switch (action.type) {
    case MovieActionTypes.ChangeListDisplayMode:
      return {
        ...state,
        displayMode: action.payload
      };
    case MovieActionTypes.AddMovieList:
      return {
        ...state,
        movieLists: [...state.movieLists, action.payload]
      };
    case MovieActionTypes.AddMovieToCurrentList:
      return {
        ...state,
        moviesInCurrentList: [...state.moviesInCurrentList, action.payload]
      };
    case MovieActionTypes.DeleteCurrentMovieList:
      return {
        ...state,
        movieLists: state.movieLists.filter((list: MovieList) => list.key !== state.currentList.key)
      };
    case MovieActionTypes.RemoveMovieFromCurrentList:
      return {
        ...state,
        moviesInCurrentList: state.moviesInCurrentList.filter(
          (movie: Movie) => movie.key !== action.payload.key
        )
      };
    case MovieActionTypes.SelectMovieList:
      const selectedMovieList = state.movieLists.find(
        (list: MovieList) => list.key !== action.payload
      );
      return {
        ...state,
        currentList: selectedMovieList
      };
    default:
      return state;
  }
}
