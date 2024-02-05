import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import TopPage from "../../pages/TopPage";
<<<<<<< HEAD
import SignupPage from "../../pages/SignupPage";
=======
>>>>>>> 36c0d0eac0a3e2cf7872d018c7481cde53310ced
import IncomePage from "../../pages/IncomePage";
import AuthContextProvider from "../../contexts/AuthContextProvider";

export const AppRouter = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<TopPage />} />
          <Route path="/in_process" element={<IncomePage />} />
          <Route path="/" element={<LoginPage />} />
=======
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<TopPage />} />
          <Route path="/in_process" element={<IncomePage />} />
>>>>>>> 36c0d0eac0a3e2cf7872d018c7481cde53310ced
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
