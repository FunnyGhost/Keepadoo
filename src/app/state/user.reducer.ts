import { UserState } from './state';
import { UserActions, UserActionTypes } from './user.action';

const initialState: UserState = {
  currentUser: null,
  movieLists: [],
  error: ''
};

export function reducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.SetCurrentUser:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.ClearCurrentUser:
      return {
        ...state,
        currentUser: null
      };
    case UserActionTypes.SetMovieLists:
      return {
        ...state,
        movieLists: action.payload,
        error: ''
      };
    case UserActionTypes.ClearMovieLists:
      return {
        ...state,
        movieLists: []
      };
    case UserActionTypes.LoadFailed:
      return {
        ...state,
        movieLists: [],
        error: action.payload
      };
    default:
      return state;
  }
}
