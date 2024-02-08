import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Typography,
  Row,
  Layout,
} from "antd";
const { Title, Paragraph, Text, Link } = Typography;

import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import SectionCard from "../components/Top/SectionCard";
import { cardTopics } from "../utils/content";

const { Header, Content, Footer } = Layout;

const Top = () => {
  return (
    <div>
      <NavbarSection />
      <Content
        style={{ width: 1024 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <Row
          className="my-8"
          style={{
            margin: 20,
            marginTop: 100,
          }}
        >
          {cardTopics.map((item, i) => (
            <SectionCard title={item} span={8} key={i}></SectionCard>
          ))}
        </Row>
      </Content>
      <FooterSection />
    </div>
  );
};

export default Top;
