import { combineReducers } from "redux";
import user from "./user";
import articles from "./articles";
import article from "./article";
import page from "./page";
import loading from "./loading";
import error from "./error";

const rootReducer = combineReducers({
  user,
  page,
  articles,
  loading,
  article,
  error,
});

export default rootReducer;
