import { USER_LOGGED, USER_LOGOUT } from '../actions/actionTypes';

const initialState = {
  logged: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED:
      return {
        ...state,
        ...action.payload,
      };
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
