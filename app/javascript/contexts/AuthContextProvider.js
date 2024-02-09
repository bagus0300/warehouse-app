import React, { useReducer } from "react";
//import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth.context";
import { AuthReducer, initialAuthState } from "./auth.reducer";
import services from "../services/services";
import { hasError } from "../utils/helper";
import authActions from "./auth.actions";

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  //const history = useHistory();

  const loginAction = async (payload) => {
    const res = await services.login(payload);
    if (!hasError(res?.status)) {
      authActions.loginAction(res)(dispatch);
      history.replace("/home");
    } else {
      authActions.handleLoginErrorAction(res)(dispatch);
    }
   
  };

  const signupAction = async (payload) => {
    const res = await services.signup(payload);
    if (!hasError(res?.status)) {
      authActions.signupAction(res)(dispatch);
      // history.replace("/login");
    } else {
      authActions.handleSignupErrorAction(res)(dispatch);
    }
  };

  const logoutAction = async () => {
    const res = await services.logout();
    if (res?.data?.ok) {
      authActions.logoutAction(dispatch);
      // history.replace("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        signupAction,
        loginAction,
        logoutAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
