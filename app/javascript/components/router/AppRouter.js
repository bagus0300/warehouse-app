import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import TopPage from "../../pages/TopPage";
import SignupPage from "../../pages/SignupPage";
import IncomePage from "../../pages/IncomePage";
import ProductPage from "../../pages/ProductPage";
import ShipperPage from "../../pages/ShipperPage";
import WarehouseFee from "../../pages/WarehouseFee";
import AuthContextProvider from "../../contexts/AuthContextProvider";
import OutputPage from "../../pages/OutputPage";
// import InventoryPage from "../../pages/InventoryPage"
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
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/inventory_process" element={<InventoryPage />} /> */}
        </Routes>
        <FooterSection />
      </BrowserRouter>
    </AuthContextProvider>
  );
};
