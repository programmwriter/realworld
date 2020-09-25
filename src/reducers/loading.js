import { SET_LOADING } from "../actions";

const initialState = true;

const loading = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return payload;
    default:
      return state;
  }
};

export default loading;
