import { RESET_APP_VALUES, SET_APP_VALUE } from '../actions/actionTypes';

const initialState = {
  product_id: undefined,
  item_id: undefined,
  pack_id: undefined,
  promotion_id: undefined,
  timeline_id: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_VALUE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_APP_VALUES:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
