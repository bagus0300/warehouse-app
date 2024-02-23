import React from "react";
import { Row, Layout, Card, Col } from "antd";

const { Header, Content, Footer } = Layout;
import { useAuth } from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

const Top = ({ navigations }) => {
  const authState = useAuth();
  let index = 1;
  const topNavications = navigations.map((item) => ({
    ...item,
    title: `${index++}. ${item.name}`
  }))
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
          {topNavications.map((item, i) => (
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
