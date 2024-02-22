import {
  getAuthUsername,
  getAuthUserToken,
  getPermissionPage,
} from "../utils/helper";

export const initialAuthState = {
  authUserName: getAuthUsername(),
  token: getAuthUserToken(),
  authority_client_pages: getPermissionPage(),

  loginErrors: null,
  signupErrors: null,
  beforeRequest: true,
};
export const AuthReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        authUsername: action.payload.login_id,
        token: action.payload.token,
        authority_client_pages: action.payload.authority_client_pages,
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
        authority_client_pages: [],
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
