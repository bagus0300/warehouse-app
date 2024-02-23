import React, { useState, useEffect } from "react";
import { Row, Layout, Card, Col } from "antd";
import axios from "axios";
const { Header, Content, Footer } = Layout;
import { useAuth } from "../hooks/useAuth.js";
import { Link } from "react-router-dom";
import { navigatiionsURL } from "../utils/contants.js";

const Top = () => {
  const [navigations, setNavigations] = useState([]);

  const getNavigations = () => {
    axios.get(`${navigatiionsURL}`).then((res) => {
      let index = 1;
      const allData = res.data.data.map((item) => {
        return {
          ...item,
          key: item.path,
          label: item.name,
          url: item.path,
          title: `${index++}. ${item.name}`,
        };
      });
      setNavigations(allData);
    });
  };

  useEffect(() => {
    getNavigations();
  }, []);

  const authState = useAuth();

  return (
    <div>
      <Content
        style={{ width: 1024 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <Row
          className="my-8"
          style={{
            margin: 20,
            marginTop: 50,
          }}
        >
          {navigations.map((item, i) => (
            <Col key={i} span={8} style={{ margin: 20 }}>
              <Link to={item.key} key={i}>
                <Card bordered={false}>{item.title}</Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Content>
    </div>
  );
};

export default Top;
