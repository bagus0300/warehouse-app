import React from "react";
import { ConfigProvider } from "antd";
import "../assets/stylesheets/application.css"
// import jaJP from "antd/lib/locale/ja_JP";
// import enUS from "antd/lib/locale/en_US";

// import { useLanguage } from "./hooks/useLanugage";
import { AppRouter } from "./components/router/AppRouter";

const App = () => {
  // const { language } = useLanguage();
  return (
    <>
      {/* <ConfigProvider locale={language === "en" ? enUS : jaJP}> */}
      <ConfigProvider>
        <AppRouter />
      </ConfigProvider>
    </>
  );
};

export default App;
