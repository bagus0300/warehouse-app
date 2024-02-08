export const makeHttpReq = async (url, options = {}, auth = false) => {
  try {
    const res = await fetch(url, { ...options });
    const data = await res.json();
    if (auth && !hasError(res?.status)) {
      saveAuthUser(data?.data?.user_name, res.headers.get("Authorization"));
    }

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
    // authorization: `Bearer ${token}`,
    authorization: `${token}`,
  },
});

export const falsy = (d) => d === undefined || d === null;

export const isEmpty = (d) => d?.toString().trim().length === 0;

export const hasKey = (obj, key) => typeof obj === "object" && !falsy(obj[key]);

export const getAuthUser = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  return falsy(username) || falsy(token) || isEmpty(username) || isEmpty(token)
    ? { username: null, token: null }
    : { username, token };
};

export const getAuthUsername = () => getAuthUser()?.username;
export const getAuthUserToken = () => getAuthUser()?.token;

export const saveAuthUser = (username, token) => {
  localStorage.setItem("username", username);
  localStorage.setItem("token", token);
};

export const clearStorage = () => localStorage.clear();
