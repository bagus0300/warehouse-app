// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// import Layout from "./layouts/Layout";
// import Home from "./pages";
import App from "./App";



document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    rootEl
  );
});
