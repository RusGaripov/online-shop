import * as actions from "./index";
let cartStorage = [];

export const addProduct = (object, quantities) => async (dispatch) => {
  console.log(object, quantities, cartStorage);

  /*for (let i = 0; i < cartStorage.length; i++) {
    if (JSON.stringify(cartStorage[i].name) === JSON.stringify(object.name)) {
      console.log("ага");
      count += 1;
      quantities[i] = quantities[i] + 1;
      dispatch({
        type: actions.ADD_QUANTITY,
        quantityArray: quantities,
      });
    }
  }*/

  //if (count === 0) {
  //console.log(count);
  cartStorage.push(object);
  //}

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

export const addQuantity = (index, quantities, object) => async (dispatch) => {
  console.log(quantities, object);

  dispatch({
    type: actions.ADD_QUANTITY,
    quantityArray: quantities,
  });
};
