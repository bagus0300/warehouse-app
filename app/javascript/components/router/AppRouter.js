import React from "react";
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
// import InventoryPage from "../../pages/InventoryPage";
import { useAuth } from "../../hooks/useAuth";

export const AppRouter = () => {
  const user = useAuth();

  // if () {

  // }
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<TopPage />} />
          <Route path="/in_process" element={<IncomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/shipper" element={<ShipperPage />} />
          <Route path="/out_process" element={<OutputPage />} />
          <Route path="/warehouse_fee" element={<WarehouseFee />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
