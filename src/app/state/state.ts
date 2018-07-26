import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../core/models/user';

export interface State {
  users: UserState;
}

export interface UserState {
  currentUser: User;
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(getUserFeatureState, state => state.currentUser);
