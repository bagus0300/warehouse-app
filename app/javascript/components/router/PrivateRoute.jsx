import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  getAuthUserToken,
  getAuthUsername,
  getPermissionPage,
} from "../../utils/helper";
import NavbarSection from "../layouts/Header/Navbar";
import FooterSection from "../layouts/Footer/Index";
import $lang from "../../utils/content/jp.json";

const PrivateRoute = ({ Component, navigations }) => {
  const token = getAuthUserToken();
  const permissionPages =
    getPermissionPage() != "" ? JSON.parse(getPermissionPage()) : [];
  const name = getAuthUsername();
  const [currentPage, setCurrentPage] = useState({});

  const location = useLocation();

  const getCurrentPage = () => {
    if (permissionPages.length > 0) {
      const currentPageInfo = permissionPages.find((item) => {
        return item.path === location.pathname;
      });
      setCurrentPage(currentPageInfo);
    }
  };

  useEffect(() => {
    getCurrentPage();
  }, [location]);

  useEffect(() => { }, [currentPage]);

  return token ? (
    <>
      <NavbarSection navigations={navigations} />
      {currentPage.is_read == 1 ? (
        <Component navigations={navigations} is_edit={currentPage.is_edit} />
      ) : (
        <p className="items-center" style={{ fontSize: 50, margin: 300 }}>
          {$lang.pages.warning}
        </p>
      )}
      <FooterSection />
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
