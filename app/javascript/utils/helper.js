export const makeHttpReq = async (url, options = {}) => {
  try {
    const res = await fetch(url, { ...options });
    const data = await res.json();
    return { status: res.status, data };
  } catch (e) {
    console.log(`Something went wrong  ${e}`);
  }
};

export const hasError = (status) => status >= 400 && status <= 600;

export const arrayIsEmpty = (arr) => arr?.length === 0;

export const arrayIsNotEmpty = (arr) => !arrayIsEmpty(arr);

export const makeURLOptions = (body, method = "GET") => ({
  method,
  headers: {
    "content-type": "application/json",
  },
  ...(method !== "GET" &&
    arrayIsNotEmpty(Object.keys(body)) && { body: JSON.stringify(body) }),
});

export const makeURLOptionsWtoken = (token, body = {}, method = "GET") => ({
  ...makeURLOptions(body, method),
  headers: {
    ...makeURLOptions(body, method).headers,
    authorization: `Bearer ${token}`,
  },
});

export const falsy = (d) => d === undefined || d === null;

export const isEmpty = (d) => d?.toString().trim().length === 0;

export const hasKey = (obj, key) => typeof obj === "object" && !falsy(obj[key]);

export const getAuthUser = () => {
<<<<<<< HEAD
  const email = localStorage.getItem("email");
=======
  const email = localStorage.getItem("username");
>>>>>>> 36c0d0eac0a3e2cf7872d018c7481cde53310ced
  const token = localStorage.getItem("token");

  return falsy(email) || falsy(token) || isEmpty(email) || isEmpty(token)
    ? { email: null, token: null }
    : { email, token };
};

<<<<<<< HEAD
export const getAuthUserEmail = () => getAuthUser()?.email;
export const getAuthUserToken = () => getAuthUser()?.token;

export const saveAuthUser = (email, token) => {
  localStorage.setItem("email", email);
=======
export const getAuthUsername = () => getAuthUser()?.username;
export const getAuthUserToken = () => getAuthUser()?.token;

export const saveAuthUser = (email, token) => {
  localStorage.setItem("username", email);
>>>>>>> 36c0d0eac0a3e2cf7872d018c7481cde53310ced
  localStorage.setItem("token", token);
};

export const clearStorage = () => localStorage.clear();
