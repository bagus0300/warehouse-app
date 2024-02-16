import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuthUserToken } from "../../utils/helper";
import NavbarSection from "../layouts/Header/Navbar";
import FooterSection from "../layouts/Footer/Index";

const PrivateRoute = ({ Component }) => {
  const token = getAuthUserToken();

  return token ? (
    <>
      <NavbarSection />
      <Component />
      <FooterSection />
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
