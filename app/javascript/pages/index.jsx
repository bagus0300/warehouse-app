import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./login";
import Top from "./top";
const Home = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Top />} />
      </Routes>
    </Router>
  );
};

export default Home;
