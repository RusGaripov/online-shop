import { combineReducers } from "redux";
import myCurrencyReducer from "./myCurrencyReducer";
import categoryListReducer from "./categoryListReducer";
import toggleCartInMenuReducer from "./toggleCartInMenuReducer";
import cartReducer from "./cartReducer";
export default combineReducers({
  categoryListReducer,
  myCurrencyReducer,
  cartReducer,
  toggleCartInMenuReducer,
});
