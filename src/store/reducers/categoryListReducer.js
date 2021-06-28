import * as actions from "../actions";

const initialState = {
  dataList: null,
  one: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_DATALIST_REQUEST:
      return { ...state, loading: true };
    case actions.FETCH_DATALIST_SUCCESS:
      return {
        loading: false,
        dataList: action.payload,
        error: "",
      };
    case actions.FETCH_DATALIST_FAILURE:
      return {
        loading: false,
        dataList: [],
        error: action.payload,
      };
    case actions.GET_ONE:
      return { ...state, one: action.one };
    default:
      return state;
  }
};
