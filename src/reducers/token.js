import { SET_TOKEN, DELETE_TOKEN } from "../actions";

const initState = "";

const token = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN:
      return payload;
    case DELETE_TOKEN:
      return "";
    default:
      return state;
  }
};

export default token;
