import { loginURL, logoutURL, signupURL } from "../utils/contants";

import { getAuthUserToken, API, makeURLOptionsWtoken } from "../utils/helper";

// const verifyAuth = async (token = getAuthUserToken()) =>
//   makeHttpReq(verifyAuthURL, makeURLOptionsWtoken(token));

const login = async (payload) => {
  return API.post(loginURL, payload);
};

const signup = async (payload) => API.post(signupURL, payload);

const logout = async () => API.delete(logoutURL, getAuthUserToken());
// makeHttpReq(
//   logoutURL,
//   makeURLOptionsWtoken(getAuthUserToken(), {}, "DELETE")
// );

const services = {
  signup,
  login,
  logout,
};

export default services;
