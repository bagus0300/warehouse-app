import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuthUserToken } from "../../utils/helper";

const PrivateRoute = ({ Component }) => {

  const token = getAuthUserToken()

  return token ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;