import React, { useReducer } from "react";
//import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth.context";
import { AuthReducer, initialAuthState } from "./auth.reducer";
import services from "../services/services";
import { hasError, saveAuthUser } from "../utils/helper";
import authActions from "./auth.actions";

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  //const history = useHistory();

  const loginAction = (payload) => {
    services
      .login(payload)
      .then((res) => {
        // if (!hasError(res?.status))
        authActions.loginAction(res)(dispatch);
        setBeforeRequestAction(false);
      })
      .catch((err) => {
        authActions.handleLoginErrorAction(err)(dispatch);
        setBeforeRequestAction(false);
      });
  };

  const signupAction = async (payload) => {
    services
      .signup(payload)
      .then((res) => {
        authActions.signupAction(res)(dispatch);
        setBeforeRequestAction(false);
      })
      .catch((err) => {
        authActions.handleSignupErrorAction(err)(dispatch);
        setBeforeRequestAction(false);
      });
  };

  const logoutAction = async () => {
    const res = await services.logout();
    if (res?.data?.ok) {
      authActions.logoutAction(dispatch);
    }
  };

  const setBeforeRequestAction = (flag) => {
    authActions.setBeforeRequestAction(flag)(dispatch);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        signupAction,
        loginAction,
        logoutAction,
        setBeforeRequestAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
