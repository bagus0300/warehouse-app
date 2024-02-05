import { getAuthUsername, getAuthUserToken } from "../utils/helper";

export const initialAuthState = {
  authUsername: getAuthUsername(),
  token: getAuthUserToken(),
  loginErrors: null,
  signupErrors: null,
};
export const AuthReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        authUserEmail: action.payload.email,
        token: action.payload.token,
        loginErrors: null,
      };
    case "Signup":
      return {
        ...state,
        loginErrors: null,
        signupErrors: null,
      };
    case "Logout":
      return { ...state, loginErrors: null, signupErrors: null };

    case "Error":
      return {
        ...state,
        authUserEmail: "",
        token: "",
        loginErrors: action?.loginErrors ?? null,
        signupErrors: action?.signupErrors ?? null,
      };
    default:
      return state;
  }
};
