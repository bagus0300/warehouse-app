import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useMatch, Link } from "react-router-dom";
import { Typography, Breadcrumb, Button } from "antd";
import { Layout, Menu, theme } from "antd";
import { siteInfo, navigations } from "../../../utils/content";
import { useAuth } from "../../../hooks/useAuth";
import $lang from "../../../utils/content/jp.json";

const NavbarSection = () => {
  const { logoutAction } = useAuth();
  const { Title } = Typography;
  const { Header } = Layout;

  const navigate = useNavigate();
  const loc = useLocation();
  const [current, setCurrent] = useState("");
  const [title, setTitle] = useState("");

  const onMenuClick = (e) => {
    const flattenNavigations = navigations.reduce(
      (a, b) => a.concat(b.children ? b.children : b),
      []
    );
    const { label } =
      flattenNavigations.find((item) => item.key === e.key) || {};
    setTitle(label);
    setCurrent(e.key);
    navigate(e.key);
  };

  useEffect(() => {
    setCurrent(loc.pathname);
  }, []);

  useEffect(() => {
    const flattenNavigations = navigations.reduce(
      (a, b) => a.concat(b.children ? b.children : b),
      []
    );
    const { label } =
      flattenNavigations.find((item) => item.key === current) || {};
    setTitle(label);
  }, [current]);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "right",
          backgroundColor: "#000",
          position: "fixed",
          width: "100%",
          zIndex: "10",
        }}
      >
        <div className="demo-logo " style={{ marginRight: "100px" }}>
          <Title level={4} style={{ marginTop: 15 }}>
            <Link to="home" style={{ color: "#fff" }}>
              {siteInfo.title}
            </Link>
          </Title>
        </div>
        <Menu
          onClick={onMenuClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={navigations}
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "#000",
            color: "#fff",
          }}
        />
        <Button
          onClick={logoutAction}
          style={{ marginLeft: "300px", marginTop: "15px", border: "none" }}
        >
          <Link to="/signin" style={{ color: "#fff" }}>
            {$lang.buttons.logout}
          </Link>
        </Button>
      </Header>
      <div className="">
        <Breadcrumb
          items={[{ title }]}
          style={{
            padding: "10px 50px ",
            backgroundColor: "#dfdfdf",
            marginTop: "55px",
          }}
        />
      </div>
    </Layout>
  );
};

export default NavbarSection;
