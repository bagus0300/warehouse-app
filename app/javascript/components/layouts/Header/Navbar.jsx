import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useMatch } from "react-router-dom";
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Typography, Breadcrumb } from "antd";

import { Layout, Menu, theme } from "antd";
import { navigations, siteInfo } from "../../../utils/content";

const NavbarSection = () => {
  const [currentMenu, setCurrentMenu] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const { Header } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  let flattenNavigations = [];
  // const urlSlice = useLocation().pathname;
  // const { label, url } =
  //   navigations.find((item) => item.key === useLocation().pathname) || {};

  // const breadcrumbTitle = label;

  const handleMenuClick = ({ key }) => {
    const { url } = flattenNavigations.find((item) => item.key === key) || {};

    if (url) {
      navigate(url);
    }
  };
  const location = useLocation();
  useEffect(() => {
    flattenNavigations = navigations.reduce(
      (a, b) => a.concat(b.children ? b.children : b),
      []
    );
    // setSelectedKeys([location.pathname]);
    // setCurrentMenu(navigations.find((item) => item.key === location.pathname));
  }, []);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "right",
          backgroundColor: "#fff",
        }}
      >
        <div className="demo-logo " style={{ marginRight: "100px" }}>
          <Title level={4} style={{ marginTop: 15 }}>
            {siteInfo.title}
          </Title>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          items={navigations}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
        />
      </Header>
      <Breadcrumb
        items={[
          {
            title: "breadcrumbTitle",
          },
        ]}
        style={{ padding: "10px 50px " }}
      />
    </Layout>
  );
};

export default NavbarSection;
