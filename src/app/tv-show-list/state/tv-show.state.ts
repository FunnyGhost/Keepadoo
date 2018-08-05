import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../../state/state';
import { DisplayMode } from '../core/models/enums';
import { TvShow } from '../core/models/tv-show';
import { TvShowList } from '../core/models/tv-show-list';

export interface State extends State {
  tvShows: TvShowState;
}

export interface TvShowState {
  displayMode: DisplayMode;
  currentList: TvShowList | null;
  tvShowsInCurrentList: TvShow[];
  error: string;
}

// Selectors
const getTvShowFeatureState = createFeatureSelector<TvShowState>('tv-shows');

export const getDisplayMode = createSelector(getTvShowFeatureState, state => state.displayMode);
export const getCurrentList = createSelector(getTvShowFeatureState, state => state.currentList);
export const getError = createSelector(getTvShowFeatureState, state => state.error);
export const getTvShowsInCurrentList = createSelector(
  getTvShowFeatureState,
  state => state.tvShowsInCurrentList
);
