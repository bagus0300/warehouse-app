import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import TopPage from "../../pages/TopPage";
import IncomePage from "../../pages/IncomePage";
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
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<TopPage />} />
          <Route path="/in_process" element={<IncomePage />} />
          <Route path="/out_process" element={<OutputPage />} />
          <Route path="/inventory_control" element={<InventoryPage />} />
          <Route path="/deposit_process" element={<DepositPage />} />
          <Route path="/billing_process" element={<BillingPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
