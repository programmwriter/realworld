import { combineReducers } from "redux";
import user from "./user";
import articles from "./articles";
import page from "./page";
import loading from "./loading";

const rootReducer = combineReducers({
  user,
  page,
  articles,
  loading,
});

export default rootReducer;
