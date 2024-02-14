import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useMatch } from "react-router-dom";

import { Typography, Breadcrumb } from "antd";

import { Layout, Menu, theme } from "antd";
import { navigations, siteInfo } from "../../../utils/content";

const NavbarSection = () => {
  const [currentMenu, setCurrentMenu] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [title, setTitle] = useState('');
  const { Header } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  let flattenNavigations = [];

  useEffect(() => {
    flattenNavigations = navigations.reduce(
      (a, b) => a.concat(b.children ? b.children : b),
      []
    );
  }, []);


  const handleMenuClick = ({ key }) => {
    flattenNavigations = navigations.reduce(
      (a, b) => a.concat(b.children ? b.children : b),
      []
    )
    const { url } = flattenNavigations.find((item) => item.key === key) || {};
    const { label } = flattenNavigations.find((item) => item.key === key) || {};
    console.log(label)
    setTitle(label);

    if (url) {
      navigate(url);
    }

    setSelectedKeys([key]);
    setCurrentMenu({ key, label })
  };


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
          selectedKeys={selectedKeys}
          items={navigations}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
        />
      </Header>
      <Breadcrumb
        items={[
          {
            title: `${title}`,
          },
        ]}
        style={{ padding: "10px 50px " }}
      />
    </Layout>
  );
};

export default NavbarSection;
