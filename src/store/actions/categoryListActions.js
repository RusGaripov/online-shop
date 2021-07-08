import * as actions from "./index";

let dataList = [];
let dataListTech = [];
let dataListClothes = [];

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

const fetchDataListTechSuccess = (dataListTech) => {
  return {
    type: actions.FETCH_DATALIST_TECH_SUCCESS,
    payload: dataListTech,
  };
};

const fetchDataListClothesSuccess = (dataListClothes) => {
  return {
    type: actions.FETCH_DATALIST_CLOTHES_SUCCESS,
    payload: dataListClothes,
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
        dispatch(fetchDataListSuccess(dataList));
      })
      .catch((error) => {
        dispatch(fetchDataListFailure(error.message));
      });
  };
};

export const fetchDataListTech = () => {
  return function (dispatch) {
    dispatch(fetchDataListRequest());
    fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
          category(input: {
            title:"tech"}){
            name
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
        dataListTech = data.data.category.products;
        dispatch(fetchDataListTechSuccess(dataListTech));
      })
      .catch((error) => {
        dispatch(fetchDataListFailure(error.message));
      });
  };
};

export const fetchDataListClothes = () => {
  return function (dispatch) {
    dispatch(fetchDataListRequest());
    fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
          category(input: {
            title:"clothes"}){
            name
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
        dataListClothes = data.data.category.products;
        dispatch(fetchDataListClothesSuccess(dataListClothes));
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

export const getOneTech = (id) => (dispatch) => {
  let idNumber = Number.parseInt(id);
  let choosenElArray = dataListTech[idNumber - 1];
  dispatch({
    type: actions.GET_ONE_TECH,
    oneTech: choosenElArray,
  });
};

export const getOneClothes = (id) => (dispatch) => {
  let idNumber = Number.parseInt(id);
  let choosenElArray = dataListClothes[idNumber - 1];
  dispatch({
    type: actions.GET_ONE_CLOTHES,
    oneClothes: choosenElArray,
  });
};
