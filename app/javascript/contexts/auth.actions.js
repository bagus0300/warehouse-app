import { saveAuthUser, clearStorage } from "../utils/helper";
import lang from "../utils/content/jp.json";
const handleLoginErrorAction = (err) => (dispatch) => {
  dispatch({
    type: "Error",
    loginErrors: err?.message ?? lang.messages.something_wrong,
  });
};
const handleSignupErrorAction = (err) => (dispatch) =>
  dispatch({
    type: "Error",
    signupErrors: err?.message ?? lang.messages.something_wrong,
  });

const signupAction = (res) => (dispatch) => {
  dispatch({
    type: "Signup",
    payload: {
      authUserName: res?.data?.user_name,
      token: res?.headers?.authorization,
    },
  });
};

const loginAction = (res) => (dispatch) => {
  dispatch({
    type: "Login",
    payload: {
      authUserName: res?.data?.data?.user_name,
      token: res?.headers?.authorization,
      authority_client_pages: res?.data?.authority_client_pages,
    },
  });
  saveAuthUser(
    res?.data?.data?.user_name,
    res?.headers?.authorization,
    res?.data?.authority_client_pages
  );
};

const logoutAction = (dispatch) => {
  clearStorage();
  dispatch({ type: "Logout" });
};

const setBeforeRequestAction = (beforeRequest) => (dispatch) => {
  dispatch({
    type: "before",
    payload: {
      beforeRequest: beforeRequest,
    },
  });
};

const authActions = {
  signupAction,
  loginAction,
  logoutAction,
  handleLoginErrorAction,
  handleSignupErrorAction,
  setBeforeRequestAction,
};

export default authActions;
