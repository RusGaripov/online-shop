import * as actions from "./index";
let cartStorage = [];

export const addProduct = (object) => async (dispatch) => {
  cartStorage.push(object);

  for (let i = 0; i < cartStorage.length; i++) {
    if (cartStorage[i] === undefined) {
      cartStorage.splice(i, 1);
    }
  }
  dispatch({
    type: actions.ADD_PRODUCT,
    cart: cartStorage,
  });
};
export const deleteProduct = (index) => async (dispatch) => {
  cartStorage.splice(index, 1);
  dispatch({
    type: actions.DELETE_PRODUCT,
    cart: cartStorage,
  });
};

export const addQuantity = (index, quantities) => async (dispatch) => {
  console.log(index, quantities);
  dispatch({
    type: actions.ADD_QUANTITY,
    quantityArray: quantities,
  });
};
