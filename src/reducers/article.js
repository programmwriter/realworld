import { RECEIVE_ARTICLE } from "../actions";

const initState = {};

const article = (state = initState, { type, payload }) => {
  switch (type) {
    case RECEIVE_ARTICLE:
      return payload;
    default:
      return state;
  }
};

export default article;
