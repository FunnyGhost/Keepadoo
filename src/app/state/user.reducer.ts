import { UserState } from './state';
import { UserActions, UserActionTypes } from './user.action';

const initialState: UserState = {
  currentUser: null,
  movieLists: []
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
        movieLists: action.payload
      };
    case UserActionTypes.ClearMovieLists:
      return {
        ...state,
        movieLists: []
      };
    default:
      return state;
  }
}
