import React from "react";
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
// import InventoryPage from "../../pages/InventoryPage";
import { useAuth } from "../../hooks/useAuth";
import Top from "../../pages/TopPage";

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
          <Route path="/product" element={<ProductList />} />
          <Route path="/shipper" element={<ShipperList />} />
          <Route path="/out_process" element={<OutputPage />} />
          <Route path="/unit_price" element={<UnitPrice />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
