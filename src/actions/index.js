export const REGISTER_USER = "REGISTER_USER";
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_LOGEDIN = "SET_LOGEDIN";

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});
export const authenticateUser = (userData) => ({
  type: AUTHENTICATE_USER,
  payload: userData,
});
export const updateUserProfile = (userData) => ({
  type: UPDATE_USER,
  payload: userData,
});
export const logoutUser = () => ({
  type: LOGOUT_USER,
});
export const setLogedIn = (value) => ({
  type: SET_LOGEDIN,
  payload: value,
});
