import { saveAuthUser, clearStorage } from "../utils/helper";
const handleLoginErrorAction = (res) => (dispatch) =>
  dispatch({
    type: "Error",
    loginErrors: res?.data?.msg ?? "Something went wrong",
  });
const handleSignupErrorAction = (res) => (dispatch) =>
  dispatch({
    type: "Error",
    signupErrors: res?.data?.msg ?? "Something went wrong",
  });

const signupAction = (res) => (dispatch) => {
  dispatch({
    type: "Signup",
    payload: {
      username: res?.data?.payload?.user_name,
      token: res?.data?.payload?.token,
    },
  });
};

const loginAction = (res) => (dispatch) => {
  dispatch({
    type: "Login",
    payload: {
      username: res?.data?.payload?.user_name,
      token: res?.data?.payload?.token,
      
    },
  });
  // saveAuthUser(res?.data?.payload?.email, res?.data?.payload?.token);
};

const logoutAction = (dispatch) => {
  clearStorage();
  dispatch({ type: "Logout" });
};
const authActions = {
  signupAction,
  loginAction,
  logoutAction,
  handleLoginErrorAction,
  handleSignupErrorAction,
};

export default authActions;
