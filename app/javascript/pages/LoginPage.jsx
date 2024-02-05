import React, { useEffect, useMemo } from "react";
// import { useTranslation } from "react-i18next";
<<<<<<< HEAD
import LoginComponent from "../components/auth/Login";
=======
import LoginComponent from "../components/auth/LoginComponent";
>>>>>>> 36c0d0eac0a3e2cf7872d018c7481cde53310ced
import { falsy, getAuthUser } from "../utils/helper";

const LoginPage = () => {
  const token = useMemo(() => getAuthUser().token, [getAuthUser().token]);

  useEffect(() => {
    if (!falsy(token)) {
      // history.replaceState("/");
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
