import React, { useEffect, useState } from "react";
import axios from "axios";
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
import PrivateRoute from "./PrivateRoute";

import BillingPage from "../../pages/BillingPage";
import { useAuth } from "../../hooks/useAuth";

import { navigatiionsURL } from "../../utils/contants";

export const AppRouter = () => {
  const [navigations, setNavigations] = useState([]);

  const getNavigations = () => {
    axios.get(`${navigatiionsURL}`).then((res) => {
      const allData = res.data.data.map((item) => {
        return { ...item, key: item.path, label: item.name, url: item.path };
      });
      setNavigations(allData);
    });
  };
  useEffect(() => {
    getNavigations();
  }, []);

  const user = useAuth();
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
            path="/billing_process"
            element={
              <PrivateRoute
                navigations={navigations}
                Component={BillingProcess}
              />
            }
          />
          <Route
            path="/billing_list"
            element={
              <PrivateRoute navigations={navigations} Component={BillingList} />
            }
          />
          <Route
            path="/in_stock"
            element={
              <PrivateRoute navigations={navigations} Component={IncomePage} />
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
            path="/out_stock"
            element={
              <PrivateRoute navigations={navigations} Component={OutputPage} />
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
        </Routes>
        {/* <FooterSection /> */}
      </BrowserRouter>
    </AuthContextProvider>
  );
};
