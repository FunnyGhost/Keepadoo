import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../core/models/user';
import { MovieList } from '../movie-list/core/models/movie-list';

export interface State {
  users: UserState;
}

export interface UserState {
  currentUser: User;
  movieLists: MovieList[];
  error: string;
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(getUserFeatureState, state => state.currentUser);
export const getMovieLists = createSelector(getUserFeatureState, state => state.movieLists);
export const getError = createSelector(getUserFeatureState, state => state.error);