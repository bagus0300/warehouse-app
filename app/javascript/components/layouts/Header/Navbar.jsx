import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useMatch, Link } from "react-router-dom";
import { Typography, Breadcrumb, Button } from "antd";
import { Layout, Menu, theme } from "antd";
import { siteInfo } from "../../../utils/content";
import { useAuth } from "../../../hooks/useAuth";
import { navigatiionsURL } from "../../../utils/contants";

const NavbarSection = ({ navigations }) => {
  const { logoutAction } = useAuth();
  const { Title } = Typography;
  const { Header } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("");
  const [title, setTitle] = useState("");

  const onMenuClick = (e) => {
    const { label } = navigations.find((item) => item.key === e.key) || {};
    setTitle(label);
    setCurrent(e.key);
    navigate(e.key);
  };

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const { label } = navigations.find((item) => item.key === current) || {};
    setTitle(label);
  }, [current, navigations]);

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
            <Link to="home">{siteInfo.title}</Link>
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
          style={{ marginLeft: "300px", marginTop: "15px" }}
        >
          <Link to="/signin">LogOut</Link>
        </Button>
      </Header>
      <Breadcrumb
        items={[{ title }]}
        style={{
          padding: "10px 50px ",
          backgroundColor: "grey",
          marginTop: "55px",
        }}
      />
    </Layout>
  );
};

export default NavbarSection;
