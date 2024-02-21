import { getAuthUsername, getAuthUserToken } from "../utils/helper";

export const initialAuthState = {
  authUserName: getAuthUsername(),
  token: getAuthUserToken(),
  loginErrors: null,
  signupErrors: null,
  beforeRequest: true,
  perf: [
    { page_id: 1, is_read: true, is_write: true },
    { page_id: 2, is_read: true, is_write: true },
    { page_id: 2, is_read: true, is_write: true },
    { page_id: 3, is_read: true, is_write: true },
    { page_id: 1, is_read: true, is_write: true },
    { page_id: 1, is_read: true, is_write: true },
    { page_id: 1, is_read: true, is_write: true },
    { page_id: 1, is_read: true, is_write: true },
    { page_id: 1, is_read: true, is_write: true },
  ],
};
export const AuthReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        authUsername: action.payload.login_id,
        token: action.payload.token,
        loginErrors: null,
      };
    case "Signup":
      return {
        ...state,
        authUserName: action.payload.authUserName,
        loginErrors: null,
        signupErrors: null,
      };
    case "Logout":
      return {
        ...state,
        loginErrors: null,
        signupErrors: null,
        afterLogin: false,
        afterSignup: false,
      };

    case "Error":
      return {
        ...state,
        authUserName: "",
        token: "",
        loginErrors: action?.loginErrors ?? null,
        signupErrors: action?.signupErrors ?? null,
      };
    case "before":
      return {
        ...state,
        beforeRequest: action.payload.beforeRequest,
      };
    default:
      return state;
  }
};
