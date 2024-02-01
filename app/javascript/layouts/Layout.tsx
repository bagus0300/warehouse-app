import React from "react";
import ThemeProvider from "../lib/hooks/use-theme";

const Layout = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Layout;
