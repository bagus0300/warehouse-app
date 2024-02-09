import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import TopPage from "../../pages/TopPage";
import SignupPage from "../../pages/SignupPage";
import IncomePage from "../../pages/IncomePage";
import ProductList from "../Maintenance/ProductList";
import ShipperList from "../Maintenance/ShipperList";
import UnitPrice from "../Maintenance/UnitPrice";
import AuthContextProvider from "../../contexts/AuthContextProvider";
import OutputPage from "../../pages/OutputPage";
import InventoryPage from "../../pages/InventoryPage";
import DepositPage from "../../pages/DepositPage";
import BillingPage from "../../pages/BillingPage";

export const AppRouter = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<TopPage />} />
          <Route path="/in_process" element={<IncomePage />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/shipper" element={<ShipperList />} />
          <Route path="/out_process" element={<OutputPage />} />
          <Route path="/inventory_control" element={<InventoryPage />} />
          <Route path="/deposit_process" element={<DepositPage />} />
          <Route path="/billing_process" element={<BillingPage />} />
          <Route path="/unit_price" element={<UnitPrice />} />
          {/* <Route path="/inventory_process" element={<InventoryPage />} /> */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
