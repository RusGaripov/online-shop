import * as actions from "./index";

export const toggleCartInMenu = (openedCart) => async (dispatch) => {
  dispatch({
    type: actions.OPEN_CART_IN_MENU,
    openedCart: openedCart,
  });
};
