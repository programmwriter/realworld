const baseUrl = "https://conduit.productionready.io/api/";

const request = async (url, options = {}) => {
  let body;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw Error(`Could not fetch ${url}. Status: ${response.status}`);
    }

    body = await response.json();
  } catch (error) {
    const myMessage = "Requests faild";
    throw new Error(`${myMessage}, ${error.message}`);
  }

  return body;
};
export const regUser = async (userData) => {
  if (!userData) {
    throw new Error("Missing user data");
  }

  const { username, email, password } = userData;

  const regUserData = {
    user: {
      username,
      email,
      password,
    },
  };
  const regOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(regUserData),
  };
  const regData = await request(`${baseUrl}users`, regOptions);

  return regData;
};
export const authUser = async (userData, jwtToken) => {
  if (!userData) {
    throw new Error("Missing user data");
  }

  const { email, password } = userData;
  const regUserData = {
    user: {
      email,
      password,
    },
  };
  const regOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${jwtToken}`,
    },
    body: JSON.stringify(regUserData),
  };
  const regData = await request(`${baseUrl}users/login`, regOptions);

  return regData;
};
export const updateUser = async (userData, jwtToken) => {
  if (!userData) {
    throw new Error("Missing user data");
  }

  const { email, bio, image } = userData;
  const regUserData = {
    user: {
      email,
      bio,
      image,
    },
  };
  const regOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${jwtToken}`,
    },
    body: JSON.stringify(regUserData),
  };
  const updateData = await request(`${baseUrl}user`, regOptions);

  return updateData;
};
export const getArticlesList = async (limit = 5, page = 1) => {
  const offset = page === 1 ? 0 : (page - 1) * 5;
  const articlesList = await request(
    `${baseUrl}articles?limit=${limit}&offset=${offset}`
  );

  return articlesList;
};
export const getSingleArticle = async (slug) => {
  const singleArticle = await request(`${baseUrl}articles/${slug}`);

  return singleArticle;
};
