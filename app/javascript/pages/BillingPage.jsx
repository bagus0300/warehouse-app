import React from "react";
import {
  Form,
  Layout,
  Select,
  Input,
  DatePicker,
  Divider,
  Button,
  Modal,
} from "antd";

import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import BillingTable from "../components/Billing/BillingTable";
import localeJP from "antd/es/date-picker/locale/ja_JP";
import messages from "../utils/content/jp.json";
import { useState } from "react";

const { Search } = Input;
const { Content } = Layout;

const BillingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Content
        style={{ width: 1280 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <div
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ margin: "50px 0 0px 0" }}
        >
          <div>
            <Button onClick={showModal}>{messages.buttons.newPost}</Button>
            <Modal
              title={messages.Modal.depositRegist}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="ok" onClick={handleOk}>
                  {messages.buttons.change}
                </Button>,
                <Button key="cancel" onClick={handleCancel}>
                  {messages.buttons.delete}
                </Button>,
              ]}
            >
              <div>
                {/* <Input name='shipperId' label={messages.Modal.shipperId} /> */}
                <Form.Item
                  label={messages.Modal.shipperId}
                  name="shipperId"
                  style={{
                    display: "inline-block",
                    width: 300,
                    marginBottom: 0,
                  }}
                >
                  <Select
                    // defaultValue={storeVal.label}
                    style={{ width: 150, marginLeft: 45 }}
                    // onChange={selStoreChange}
                    // options={storeOptions}
                  />
                </Form.Item>
                <Form.Item
                  // label={messages.BillingPagehipperName}
                  name="shipperName"
                  style={{
                    display: "",
                    width: 400,
                    marginBottom: 0,
                    flexFlow: "nowrap",
                  }}
                >
                  <Input
                    // defaultValue={shipperVal.label}
                    style={{ width: 200, marginLeft: 43 }}
                    // onChange={selShipperChange}
                    // options={shipperOptions}
                  />
                </Form.Item>
                <Divider />
                <Form.Item
                  name="depositDate"
                  label={messages.Modal.depositDate}
                  style={{
                    display: "inline-block",
                    width: 400,
                    marginBottom: 0,
                  }}
                >
                  {messages.Modal.depositDate}
                  <Input type="number" min={2000} />
                </Form.Item>
                <Form.Item
                  label={messages.Modal.depositAmount}
                  name="shipperName"
                  style={{
                    display: "",
                    width: 400,
                    marginBottom: 0,
                    flexFlow: "nowrap",
                  }}
                >
                  <Input
                    // defaultValue={shipperVal.label}
                    style={{ width: 150, marginLeft: 43 }}
                    // onChange={selShipperChange}
                    // options={shipperOptions}
                  />
                </Form.Item>
              </div>
            </Modal>
          </div>
          <div style={{ display: "flex", marginTop: 20 }}>
            <Form.Item
              label={messages.BillingPage.yearMonth}
              name="yearMonth"
              style={{
                display: "inline-block",
                width: 400,
                marginLeft: 0,
                marginBottom: 0,
              }}
            >
              <DatePicker
                // defaultValue={storeVal.label}
                style={{ width: 150, marginLeft: 15 }}
                placeholder={messages.BillingPage.yearMonth}
                // onChange={selStoreChange}
                // options={storeOptions}
              />
            </Form.Item>
            <Form.Item
              label={messages.BillingPage.closingDate}
              name="username"
              style={{
                display: "",
                width: 300,
                marginBottom: 0,
                flexFlow: "nowrap",
              }}
            >
              <Select
                // defaultValue={shipperVal.label}
                style={{ width: 150, marginLeft: 14 }}
                placeholder={messages.BillingPage.closingDate}
                // onChange={selShipperChange}
                // options={shipperOptions}
              />
            </Form.Item>
            <Form.Item
              name="username"
              style={{
                display: "inline-block",
                width: 1000,
                marginLeft: 0,
                marginBottom: 0,
              }}
            >
              <Button style={{ width: 120, marginLeft: 60 }}>
                {messages.IncomePageJp.search}
              </Button>
            </Form.Item>
          </div>
        </div>
        <Divider />
        <BillingTable />
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <Button style={{ width: 120 }}>{messages.buttons.next}</Button>
        </div>
      </Content>
      <FooterSection />
    </div>
  );
};

export default BillingPage;
