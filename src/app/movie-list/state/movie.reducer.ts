export function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_LIST_MODE':
      console.log('previous state: ', state);
      console.log('payload:', action.payload);
      return {
        ...state,
        displayMode: action.payload
      };
    default:
      return state;
  }
}
