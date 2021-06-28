import * as actions from "../actions";

const initialState = {
  openedCart: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_CART_IN_MENU:
      return { ...state, openedCart: action.openedCart };
    default:
      return state;
  }
};
