import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import admin from "./adminReducer";
import user from "./userReducer";
import cart from "./cartReducer";
//import techReducer from "./techReducer";

export default combineReducers({
  auth,
  alert,
  admin,
  user,
  cart
});
