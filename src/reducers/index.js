import { combineReducers } from "redux";
import user from "./user";
import logedIn from "./logedIn";
import token from "./token";

const rootReducer = combineReducers({
  logedIn,
  user,
  token,
});

export default rootReducer;
