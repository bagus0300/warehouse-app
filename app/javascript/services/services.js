import {
  verifyAuthURL,
  secretsURL,
  loginURL,
  logoutURL,
  signupURL,
} from "../utils/contants";

import {
  makeHttpReq,
<<<<<<< HEAD
  getAuthUserToken,
=======
  // getAuthUserToken,
>>>>>>> 36c0d0eac0a3e2cf7872d018c7481cde53310ced
  makeURLOptions,
  makeURLOptionsWtoken,
} from "../utils/helper";

const verifyAuth = async (token = getAuthUserToken()) =>
  makeHttpReq(verifyAuthURL, makeURLOptionsWtoken(token));

const login = async (payload) => {
  makeHttpReq(loginURL, makeURLOptions(payload, "POST"));
};

const signup = async (payload) =>
  makeHttpReq(signupURL, makeURLOptions(payload, "POST"));

const logout = async () =>
  makeHttpReq(logoutURL, makeURLOptionsWtoken(getAuthUserToken(), {}, "POST"));

const services = {
  signup,
  login,
  logout,
  verifyAuth,
  // addNewSecret,
  // getSecrets,
  // deleteSecret,
};

export default services;
