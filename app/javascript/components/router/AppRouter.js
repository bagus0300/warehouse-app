import React from "react";
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

export const AppRouter = () => {
  const user = useAuth();
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<PrivateRoute Component={TopPage} />} />
          <Route
            path="/billing_process"
            element={<PrivateRoute Component={BillingProcess} />}
          />
          <Route
            path="/billing_list"
            element={<PrivateRoute Component={BillingList} />}
          />
          <Route
            path="/in_stock"
            element={<PrivateRoute Component={InStockPage} />}
          />
          <Route
            path="/product"
            element={<PrivateRoute Component={ProductPage} />}
          />
          <Route
            path="/shipper"
            element={<PrivateRoute Component={ShipperPage} />}
          />
          <Route
            path="/out_stock"
            element={<PrivateRoute Component={OutStockPage} />}
          />
          <Route
            path="/warehouse_fee"
            element={<PrivateRoute Component={WarehouseFee} />}
          />
          <Route
            path="/stock"
            element={<PrivateRoute Component={InventoryPage} />}
          />
          <Route
            path="/deposit_process"
            element={<PrivateRoute Component={DepositPage} />}
          />
          <Route path="/*" element={<PrivateRoute Component={NotFonud} />} />
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/user_process"
            element={<PrivateRoute Component={UserPage} />}
          />
          <Route
            path="/clientPage_process"
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
