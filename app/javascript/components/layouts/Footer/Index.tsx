import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Footer } = Layout;

const FooterSection = () => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  return (
    <Footer
      style={{
        textAlign: "center",
        display: "block",
        bottom: "0",
        width: "100%",
        backgroundColor: "#fff",
      }}
      className="mt-10"
    >
      <p>Soko Kanri system</p>
    </Footer>
  );
};

export default FooterSection;
