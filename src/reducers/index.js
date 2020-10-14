import { combineReducers } from "redux";
import user from "./user";
import logedIn from "./logedIn";

const rootReducer = combineReducers({
  logedIn,
  user,
});

export default rootReducer;
