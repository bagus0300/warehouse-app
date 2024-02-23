import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useMatch, Link } from "react-router-dom";
import { Typography, Breadcrumb, Button } from "antd";
import { Layout, Menu, theme } from "antd";
import { siteInfo } from "../../../utils/content";
import { useAuth } from "../../../hooks/useAuth";
import { navigatiionsURL } from "../../../utils/contants";
import $lang from "../../../utils/content/jp.json";

const NavbarSection = () => {
  const { logoutAction } = useAuth();
  const { Title } = Typography;
  const { Header } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("");
  const [title, setTitle] = useState("");
  const [navigations, setNavigations] = useState([]);

  const onMenuClick = (e) => {
    const { label } = navigations.find((item) => item.key === e.key) || {};
    setTitle(label);
    setCurrent(e.key);
    navigate(e.key);
  };
  const getNavigations = () => {
    axios.get(`${navigatiionsURL}`).then((res) => {
      const allData = res.data.data.map((item) => {
        return { ...item, key: item.path, label: item.name, url: item.path };
      });
      setNavigations(allData);
    });
  };

  useEffect(() => {
    getNavigations();
  }, []);

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
            <Link to="/" style={{ color: "#fff" }}>
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
          className="btn-bg-black"
          onClick={logoutAction}
          style={{ marginLeft: "300px", marginTop: "15px", border: "none" }}
        >
          <Link to="/signin" style={{ color: "#fff" }}>
            {$lang.buttons.logout}
          </Link>
        </Button>
      </Header>
      <Breadcrumb
        items={[{ title }]}
        style={{
          padding: "20px 50px ",
          marginTop: "55px",
          backgroundColor: "#fff",
        }}
      />
    </Layout>
  );
};

export default NavbarSection;
