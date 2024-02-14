import {
  verifyAuthURL,
  secretsURL,
  loginURL,
  logoutURL,
  signupURL,
} from "../utils/contants";

import {
  makeHttpReq,
  getAuthUserToken,
  makeHttpOptions,
  makeURLOptionsWtoken,
} from "../utils/helper";

const verifyAuth = async (token = getAuthUserToken()) =>
  makeHttpReq(verifyAuthURL, makeURLOptionsWtoken(token));

const login = async (payload) => {
  return makeHttpReq(makeHttpOptions(payload, "POST", loginURL));
};

const signup = async (payload) =>
  makeHttpReq(makeHttpOptions(payload, "POST", signupURL));

const logout = async () =>
  makeHttpReq(
    logoutURL,
    makeURLOptionsWtoken(getAuthUserToken(), {}, "DELETE")
  );

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
