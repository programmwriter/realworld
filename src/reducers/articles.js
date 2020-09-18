import { RECEIVE_ARTICLES } from "../actions";

const initState = [];

const articles = (state = initState, { type, payload }) => {
  switch (type) {
    case RECEIVE_ARTICLES:
      return payload;
    default:
      return state;
  }
};

export default articles;
