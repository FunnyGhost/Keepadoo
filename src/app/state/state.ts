import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../core/models/user';
import { MovieList } from '../movie-list/core/models/movie-list';
import { TvShowList } from '../tv-show-list/core/models/tv-show-list';

export interface State {
  users: UserState;
}

export interface UserState {
  currentUser: User;
  movieLists: MovieList[];
  tvShowLists: TvShowList[];
  message: string;
  error: string;
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(getUserFeatureState, state => state.currentUser);
export const getMovieLists = createSelector(getUserFeatureState, state => state.movieLists);
export const getTvShowLists = createSelector(getUserFeatureState, state => state.tvShowLists);
export const getMessage = createSelector(getUserFeatureState, state => state.message);
export const getError = createSelector(getUserFeatureState, state => state.error);
