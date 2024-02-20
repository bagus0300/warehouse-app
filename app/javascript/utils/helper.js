import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

class HTTPError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const makeHttpReq = async (options = {}) => {
  const apiClient = axios.create({ baseURL: "/" });
  try {
    const res = await apiClient.request(options);
    return res;
  } catch (error) {
    if (!error.response) {
      throw new Error("Network Error");
    }

    switch (error.response.status) {
      case 400:
        // throw new HTTPError("Bad Request", error.response.status);
        throw new Error("Bad Request");
      case 401:
        throw new Error("Unauthorized");
      case 404:
        throw new Error("Not Found");
      default:
        throw new Error("Internal Server Error");
    }
  }
};

export const hasError = (status) => status >= 400 && status <= 600;

export const arrayIsEmpty = (arr) => arr?.length === 0;

export const arrayIsNotEmpty = (arr) => !arrayIsEmpty(arr);

export const makeHttpOptions = (
  payload,
  method = "GET",
  url,
  timeout = 1000
) => ({
  method,
  url: url,
  headers: {
    "content-type": "application/json",
    Authorization: getAuthUserToken(),
  },
  data: payload,
  timeout: timeout,
  // ...(method !== "GET" &&
  //   arrayIsNotEmpty(Object.keys(body)) && { body: JSON.stringify(body) }),
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

export const currentDate = () => dayjs().tz("Asia/Tokyo");
