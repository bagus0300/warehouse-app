// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";

import React from "react";
import ReactDOM from "react-dom";

import Layout from "./layouts/Layout";
import Home from "./pages";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  ReactDOM.render(
    <Layout>
      <Home />
    </Layout>,
    rootEl
  );
});
