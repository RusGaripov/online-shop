import * as actions from "../actions";

const initialState = {
  dataList: null,
  dataListTech: null,
  dataListClothes: null,
  one: null,
  oneTech: null,
  oneClothes: null,
  loading: false,
};

export function categoryListReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_DATALIST_REQUEST:
      return { ...state, loading: true };
    case actions.FETCH_DATALIST_SUCCESS:
      return {
        loading: false,
        dataList: action.payload,
        error: "",
      };
    case actions.FETCH_DATALIST_TECH_SUCCESS:
      return {
        loading: false,
        dataListTech: action.payload,
        error: "",
      };
    case actions.FETCH_DATALIST_CLOTHES_SUCCESS:
      return {
        loading: false,
        dataListClothes: action.payload,
        error: "",
      };
    case actions.FETCH_DATALIST_FAILURE:
      return {
        loading: false,
        dataList: [],
        dataListTech: [],
        error: action.payload,
      };
    case actions.GET_ONE:
      return { ...state, one: action.one };
    case actions.GET_ONE_TECH:
      return { ...state, oneTech: action.oneTech };
    case actions.GET_ONE_CLOTHES:
      return { ...state, oneClothes: action.oneClothes };
    default:
      return state;
  }
}
