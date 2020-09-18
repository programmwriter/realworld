export const REGISTER_USER = "REGISTER_USER";
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const SET_PAGE = "SET_PAGE";
export const SET_LOADING = "SET_LOADING ";

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});
export const authenticateUser = (userData) => ({
  type: AUTHENTICATE_USER,
  payload: userData,
});
export const updateUser = (userData) => ({
  type: UPDATE_USER,
  payload: userData,
});
export const recieveArticles = (articles) => ({
  type: RECEIVE_ARTICLES,
  payload: articles,
});
export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});
