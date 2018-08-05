import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../core/models/user';
import { MovieDiscover } from '../movie-list/core/models/movie-discover';
import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';

export interface State {
  users: UserState;
}

export interface UserState {
  currentUser: User;
  movieLists: MovieList[];
  discoverMovies: MovieDiscover[];
  tvShowLists: TvShowList[];
  isLoading: boolean;
  message: string;
  error: string;
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(getUserFeatureState, state => state.currentUser);
export const getMovieLists = createSelector(getUserFeatureState, state => state.movieLists);
export const getDiscoverMovies = createSelector(getUserFeatureState, state => state.discoverMovies);
export const getTvShowLists = createSelector(getUserFeatureState, state => state.tvShowLists);
export const getIsLoading = createSelector(getUserFeatureState, state => state.isLoading);
export const getMessage = createSelector(getUserFeatureState, state => state.message);
export const getError = createSelector(getUserFeatureState, state => state.error);
