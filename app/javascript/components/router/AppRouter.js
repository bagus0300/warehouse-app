import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import SignupPage from "../../pages/SignupPage";
import NotFonud from "../../pages/404";

import TopPage from "../../pages/TopPage";
import IncomePage from "../../pages/IncomePage";
import ProductPage from "../../pages/ProductPage";
import ShipperPage from "../../pages/ShipperPage";
import WarehouseFee from "../../pages/WarehouseFee";
import OutputPage from "../../pages/OutputPage";
import BillingProcess from "../../pages/BillingProcess";
import BillingList from "../../pages/BillingList";
import DepositPage from "../../pages/DepositPage";
import AuthContextProvider from "../../contexts/AuthContextProvider";

import InventoryPage from "../../pages/InventoryPage";
import { getAuthUserToken } from "../../utils/helper";
import PrivateRoute from "./PrivateRoute";
import NavbarSection from "../layouts/Header/Navbar";
import FooterSection from "../layouts/Footer/Index";

export const AppRouter = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <NavbarSection />
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
            path="/in_process"
            element={<PrivateRoute Component={IncomePage} />}
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
            path="/out_process"
            element={<PrivateRoute Component={OutputPage} />}
          />
          <Route
            path="/warehouse_fee"
            element={<PrivateRoute Component={WarehouseFee} />}
          />
          <Route
            path="/inventory_control"
            element={<PrivateRoute Component={InventoryPage} />}
          />
          <Route
            path="/deposit_process"
            element={<PrivateRoute Component={DepositPage} />}
          />
          <Route path="/*" element={<PrivateRoute Component={NotFonud} />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <FooterSection />
      </BrowserRouter>
    </AuthContextProvider>
  );
};
