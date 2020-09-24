import { SET_LOADING_ARTICLES, SET_LOADING_ARTICLE } from "../actions";

const initialState = {
  articles: false,
  article: false,
};

const loading = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_ARTICLES:
      return { ...state, articles: payload };
    case SET_LOADING_ARTICLE:
      return { ...state, article: payload };
    default:
      return state;
  }
};

export default loading;
