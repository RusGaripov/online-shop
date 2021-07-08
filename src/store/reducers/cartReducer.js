import * as actions from "../actions";

const initialState = {
  cart: [],
  quantityArray: [1],
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_PRODUCT:
      return { ...state, cart: action.cart };
    case actions.DELETE_PRODUCT:
      return { ...state, quantityArray: action.quantities };
    case actions.ADD_QUANTITY:
      return { ...state, quantityArray: action.quantityArray };
    default:
      return state;
  }
}
