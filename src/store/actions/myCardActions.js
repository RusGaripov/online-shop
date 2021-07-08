import * as actions from "./index";

export const getCurrency = (currency) => (dispatch) => {
  if (currency !== undefined) {
    dispatch({
      type: actions.GET_CURRENCY,
      currency: currency,
    });
  }
};
