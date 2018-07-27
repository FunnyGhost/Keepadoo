import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../../state/state';
import { DisplayMode } from '../core/models/enums';
import { Movie } from '../core/models/movie';
import { MovieList } from '../core/models/movie-list';

export interface State extends State {
  movies: MovieState;
}

export interface MovieState {
  displayMode: DisplayMode;
  currentList: MovieList;
  moviesInCurrentList: Movie[];
  movieLists: MovieList[];
}

// Selectors
const getMovieFeatureState = createFeatureSelector<MovieState>('movies');

export const getDisplayMode = createSelector(getMovieFeatureState, state => state.displayMode);
export const getCurrentList = createSelector(getMovieFeatureState, state => state.currentList);
export const getMovieLists = createSelector(getMovieFeatureState, state => state.movieLists);
export const getMoviesInCurrentList = createSelector(
  getMovieFeatureState,
  state => state.moviesInCurrentList
);
