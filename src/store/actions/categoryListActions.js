import * as actions from "./index";

let dataList = [];

const fetchDataListRequest = () => {
  return {
    type: actions.FETCH_DATALIST_REQUEST,
  };
};

const fetchDataListSuccess = (dataList) => {
  return {
    type: actions.FETCH_DATALIST_SUCCESS,
    payload: dataList,
  };
};

const fetchDataListFailure = (error) => {
  return {
    type: actions.FETCH_DATALIST_FAILURE,
    payload: error,
  };
};

export const fetchDataList = () => {
  return function (dispatch) {
    dispatch(fetchDataListRequest());
    fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
          category{
            products{
              name 
              inStock
              gallery
              description
              category
              attributes{
                id
                name
                type
                items{
                  displayValue
                  value
                  id
                }
              }
              prices{
                currency
                amount
              }
            }
          }
        } `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dataList = data.data.category.products;
        const dataList1 = [];
        const dataList2 = [];
        for (let i = 0; i < data.data.category.products.length; i++) {
          if (data.data.category.products[i].category === "clothes") {
            dataList1.push(data.data.category.products[i]);
          }
          if (data.data.category.products[i].category === "tech")
            dataList2.push(data.data.category.products[i]);
        }
        dispatch(fetchDataListSuccess(dataList));
      })
      .catch((error) => {
        dispatch(fetchDataListFailure(error.message));
      });
  };
};

export const getOne = (id) => (dispatch) => {
  let idNumber = Number.parseInt(id);
  let choosenElArray = dataList[idNumber - 1];

  dispatch({
    type: actions.GET_ONE,
    one: choosenElArray,
  });
};
