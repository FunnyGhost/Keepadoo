import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../core/models/user';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';

export interface State {
  users: UserState;
}

export interface UserState {
  currentUser: User | null;
  movieLists: MovieList[];
  movieListsLoading: boolean;
  discoverMovies: MovieDiscover[];
  discoverMoviesLoading: boolean;
  tvShowLists: TvShowList[];
  tvShowListsLoading: boolean;
  message: string;
  redirectUrl: string;
  error: string;
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(getUserFeatureState, state => state.currentUser);
export const getMovieLists = createSelector(getUserFeatureState, state => state.movieLists);
export const getDiscoverMovies = createSelector(getUserFeatureState, state => state.discoverMovies);
export const getTvShowLists = createSelector(getUserFeatureState, state => state.tvShowLists);
export const getMessage = createSelector(getUserFeatureState, state => state.message);
export const getRedirectUrl = createSelector(getUserFeatureState, state => state.redirectUrl);
export const getError = createSelector(getUserFeatureState, state => state.error);
