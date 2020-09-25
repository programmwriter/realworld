import { SET_ERROR } from "../actions";

const initialState = false;

const error = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return payload;
    default:
      return state;
  }
};

export default error;
