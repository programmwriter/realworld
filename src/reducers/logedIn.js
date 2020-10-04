import { SET_LOGEDIN } from "../actions";

const initState = false;

const logedIn = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LOGEDIN:
      return payload;
    default:
      return state;
  }
};

export default logedIn;
