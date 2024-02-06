import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import TopPage from "../../pages/TopPage";
import SignupPage from "../../pages/SignupPage";
import IncomePage from "../../pages/IncomePage";
import AuthContextProvider from "../../contexts/AuthContextProvider";

export const AppRouter = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<TopPage />} />
          <Route path="/in_process" element={<IncomePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
