import React, { useEffect, useMemo } from "react";
// import { useTranslation } from "react-i18next";
import SignupComponent from "../components/auth/Signup";
import { falsy, getAuthUser } from "../utils/helper";

const LoginPage = () => {
  const token = useMemo(() => getAuthUser().token, [getAuthUser().token]);

  useEffect(() => {
    if (!falsy(token)) {
      return;
    }
  }, [token]);

  return (
    <>
      <SignupComponent />
    </>
  );
};

export default LoginPage;
