import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import TopPage from "../../pages/TopPage";
import IncomePage from "../../pages/IncomePage";
import ProductList from "../Maintenance/ProductList";
import ShipperList from "../Maintenance/ShipperList";
import AuthContextProvider from "../../contexts/AuthContextProvider";
import OutputPage from "../../pages/OutputPage";
// import InventoryPage from "../../pages/InventoryPage";

export const AppRouter = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<TopPage />} />
          <Route path="/in_process" element={<IncomePage />} />
          <Route path="/maintenance" element={<ProductList />} />
          <Route path="/shipperlist" element={<ShipperList />} />
          <Route path="/out_process" element={<OutputPage />} />
          {/* <Route path="/inventory_process" element={<InventoryPage />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
