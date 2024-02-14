import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import TopPage from "../../pages/TopPage";
import SignupPage from "../../pages/SignupPage";
import IncomePage from "../../pages/IncomePage";
import ProductList from "../Maintenance/ProductList";
import ShipperList from "../Maintenance/ShipperList";
import UnitPrice from "../Maintenance/UnitPrice";
import AuthContextProvider from "../../contexts/AuthContextProvider";
import OutputPage from "../../pages/OutputPage";
// import InventoryPage from "../../pages/InventoryPage"
import { getAuthUserToken } from "../../utils/helper";
import PrivateRoute from "./PrivateRoute";

export const AppRouter = () => {

  const token = getAuthUserToken();

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<PrivateRoute Component={TopPage} />} />
          <Route path="/in_process" element={<PrivateRoute Component={IncomePage} />} />
          <Route path="/product" element={<PrivateRoute Component={ProductList} />} />
          <Route path="/shipper" element={<PrivateRoute Component={ShipperList} />} />
          <Route path="/out_process" element={<PrivateRoute Component={OutputPage} />} />
          <Route path="/unit_price" element={<PrivateRoute Component={UnitPrice} />} />
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/inventory_process" element={<InventoryPage />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};