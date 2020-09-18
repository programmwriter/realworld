import { SET_PAGE } from "../actions";

const page = (state = 1, { type, payload }) => {
  if (type === SET_PAGE) {
    return payload;
  }
  return state;
};

export default page;
