import React from "react";
import { Card, Col } from "antd";

const SectionCard = ({ span, title }) => (
  <>
    <Col
      span={span}
      style={{
        margin: 20,
      }}
    >
      <Card bordered={false}>{title}</Card>
    </Col>
  </>
);

export default SectionCard;
