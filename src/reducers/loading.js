import { SET_LOADING } from "../actions";

const loading = (state = false, { type, payload }) => {
  if (type === SET_LOADING) {
    return payload;
  }
  return state;
};

export default loading;
