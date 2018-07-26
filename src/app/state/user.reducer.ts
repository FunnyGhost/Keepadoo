import { UserState } from './state';

const initialState: UserState = {
  currentUser: null
};

export function reducer(state: UserState = initialState, action): UserState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}
