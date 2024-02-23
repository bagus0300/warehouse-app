import React, { useEffect, useMemo } from "react";
// import { useTranslation } from "react-i18next";
import LoginComponent from "../components/auth/Login";
import { falsy, getAuthUser } from "../utils/helper";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const token = useMemo(() => getAuthUser().token, [getAuthUser().token]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!falsy(token)) {
      navigate("/home");
      return;
    } else {
      navigate("/signin");
      return;
    }
  }, [token]);

  return (
    <>
      <LoginComponent />
    </>
  );
};

export default LoginPage;
