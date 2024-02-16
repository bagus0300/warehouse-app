import React from "react";
import { Row, Layout, Card, Col } from "antd";

import SectionCard from "../components/Top/SectionCard";
import { cardTopic } from "../utils/content";
const { Header, Content, Footer } = Layout;
import { useAuth } from "../hooks/useAuth.js";
import { Link } from "react-router-dom";
import { margin } from "@mui/system";

const Top = () => {
  const authState = useAuth();
  console.log("----------------", authState.token);
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
          {cardTopic.map((item, i) => (
            <Col key={i} span={8} style={{ margin: 20 }}>
              <Link to={item.key} key={i}>
                <Card bordered={false}>{item.label}</Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Content>
    </div>
  );
};

export default Top;
