import * as actions from "./index";

export const toggleCurrencyMenu = (openedCurrencyList) => async (dispatch) => {
  dispatch({
    type: actions.TOGGLE_CURRENCY_LIST,
    openedCurrencyList: openedCurrencyList,
  });
};
