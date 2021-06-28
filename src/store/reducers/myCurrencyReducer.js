import * as actions from "../actions";

const initialState = {
  myCard: null,
  currency: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PRODUCT:
      return { ...state, myCard: null };
    case actions.DELETE_PRODUCT:
      return { ...state, myCard: null };
    case actions.GET_CURRENCY:
      return { ...state, currency: action.currency };
    default:
      return state;
  }
};
