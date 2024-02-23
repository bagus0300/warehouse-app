import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import SignupPage from "../../pages/SignupPage";
import NotFonud from "../../pages/404";

import TopPage from "../../pages/TopPage";
import InStockPage from "../../pages/InStockPage";
import ProductPage from "../../pages/ProductPage";
import ShipperPage from "../../pages/ShipperPage";
import WarehouseFee from "../../pages/WarehouseFee";
import OutStockPage from "../../pages/OutStockPage";
import BillingProcess from "../../pages/BillingProcess";
import BillingList from "../../pages/BillingList";
import DepositPage from "../../pages/DepositPage";
import UserPage from "../../pages/UserPage";
import AuthContextProvider from "../../contexts/AuthContextProvider";

import InventoryPage from "../../pages/InventoryPage";
import PrivateRoute from "./PrivateRoute";

import { useAuth } from "../../hooks/useAuth";
import ClientPage from "../../pages/ClientPage";
import ChangePassword from "../../pages/changePasswordPage";

import { navigatiionsURL } from "../../utils/contants";

export const AppRouter = () => {
  const [navigations, setNavigations] = useState([]);
  const user = useAuth();

  const getNavigations = () => {
    axios.get(`${navigatiionsURL}`).then((res) => {
      const allData = res.data.data.map((item) => {
        return { ...item, key: item.path, label: item.name, url: item.path };
      });
      setNavigations(allData);
    });
  };

  useEffect(() => {
    if (user.authUserName != null) getNavigations();
  }, [user.authUserName]);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute navigations={navigations} Component={TopPage} />
            }
          />
          <Route
            path="/bill_process"
            element={
              <PrivateRoute
                navigations={navigations}
                Component={BillingProcess}
              />
            }
          />
          <Route
            path="/bill_list"
            element={
              <PrivateRoute navigations={navigations} Component={BillingList} />
            }
          />
          <Route
            path="/stock_in"
            element={
              <PrivateRoute navigations={navigations} Component={InStockPage} />
            }
          />
          <Route
            path="/product"
            element={
              <PrivateRoute navigations={navigations} Component={ProductPage} />
            }
          />
          <Route
            path="/shipper"
            element={
              <PrivateRoute navigations={navigations} Component={ShipperPage} />
            }
          />
          <Route
            path="/stock_out"
            element={
              <PrivateRoute
                navigations={navigations}
                Component={OutStockPage}
              />
            }
          />
          <Route
            path="/warehouse_fee"
            element={
              <PrivateRoute
                navigations={navigations}
                Component={WarehouseFee}
              />
            }
          />
          <Route
            path="/stock"
            element={
              <PrivateRoute
                navigations={navigations}
                Component={InventoryPage}
              />
            }
          />
          <Route
            path="/deposit_process"
            element={
              <PrivateRoute navigations={navigations} Component={DepositPage} />
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute navigations={navigations} Component={NotFonud} />
            }
          />
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/user_managent"
            element={<PrivateRoute Component={UserPage} />}
          />
          <Route
            path="/auth_permission"
            element={<PrivateRoute Component={ClientPage} />}
          />
          <Route
            path="/changePassword_process"
            element={<PrivateRoute Component={ChangePassword} />}
          />
        </Routes>
        {/* <FooterSection /> */}
      </BrowserRouter>
    </AuthContextProvider>
  );
};
