import { DisplayMode } from '../core/models/enums';
import { MovieState } from './movie-state';

const initialState: MovieState = {
  displayMode: DisplayMode.List,
  currentList: null,
  moviesInCurrentList: []
};

export function reducer(state: MovieState = initialState, action): MovieState {
  switch (action.type) {
    case 'CHANGE_LIST_MODE':
      return {
        ...state,
        displayMode: action.payload
      };
    default:
      return state;
  }
}
