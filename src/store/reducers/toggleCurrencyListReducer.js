import * as actions from "../actions";

const initialState = {
  openedCurrencyList: false,
};

export function toggleCurrencyListReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_CURRENCY_LIST:
      return { ...state, openedCurrencyList: action.openedCurrencyList };
    default:
      return state;
  }
}
