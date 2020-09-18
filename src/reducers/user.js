import { REGISTER_USER, AUTHENTICATE_USER, UPDATE_USER } from "../actions";

const initState = {
  id: 114822,
  email: "johndoe@doe.com",
  createdAt: "2020-09-16T08:06:14.166Z",
  updatedAt: "2020-09-16T08:06:14.171Z",
  username: "JohnDoe88",
  bio: null,
  image: null,
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE0ODIyLCJ1c2VybmFtZSI6IkpvaG5Eb2U4OCIsImV4cCI6MTYwNTQyNzczM30._LdsvPz6O3QRB749PKzXkUuOsBOsRVsgxUjrwHcRZHk",
};

const user = (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, payload };
    case AUTHENTICATE_USER:
      return { ...state, payload };
    case UPDATE_USER:
      return { ...state, payload };
    default:
      return state;
  }
};

export default user;
