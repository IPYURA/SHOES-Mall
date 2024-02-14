import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authenticateReducer from "./authenticateReducer";
import addCartReducer from "./addCartReducer";
import likesReducer from "./likesReducer";

export default combineReducers({
  product: productReducer,
  auth: authenticateReducer,
  cart: addCartReducer,
  likes: likesReducer,
});
