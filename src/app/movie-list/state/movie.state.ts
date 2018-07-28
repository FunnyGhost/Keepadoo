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
  error: string;
}

// Selectors
const getMovieFeatureState = createFeatureSelector<MovieState>('movies');

export const getDisplayMode = createSelector(getMovieFeatureState, state => state.displayMode);
export const getCurrentList = createSelector(getMovieFeatureState, state => state.currentList);
export const getError = createSelector(getMovieFeatureState, state => state.error);
export const getMoviesInCurrentList = createSelector(
  getMovieFeatureState,
  state => state.moviesInCurrentList
);
