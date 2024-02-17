import React, { useState, useEffect } from "react";
import UserTable from "../components/User/UserTable";
import messages from "../utils/content/jp.json";

import { 
  makeHttpReq, 
  makeHttpOptions 
} from "../utils/helper";

import {
  Layout,
  Card,
  Form,
  Modal,
  Button,
  Input
} from "antd";

import {
  getUserURL
} from "../utils/contants";

const { Content } = Layout;



const UserPage = () => {

  const [form] = Form.useForm();
  const [userData, setUserData] = useState();
  const [updateData, setUpdateData] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    setIsModalOpen(false);
    let data = await form.validateFields();
    console.log("updatedata", data)
    if (updateData) {
      makeHttpReq(
        makeHttpOptions(
          {
            id: updateData.id,
            ...data,
          },
          "put",
          getUserURL
        )
      );
      notification.success({ message: "編集が成功しました。", duration: 1 });
      setIsModalOpen(false);
    }
  }

  const editRow = (key) => {
    setIsModalOpen(true);
    form.setFieldsValue({
      user_name: userData[key].user_name,
      login_id:userData[key].login_id,
      email:userData[key].email,
      authority:userData[key].authority,
    });
    const data = userData[key];
    setUpdateData({
      data
    });
  };


  const getAllUser = () => {
    makeHttpReq(makeHttpOptions({}, "get", getUserURL)).then((res) => {
      let index=1;
      console.log("res", res.data.data)
      const users = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setUserData(users);
    }
  )};

  useEffect(() => {
    getAllUser();
  },[])

  return (
    <>
      <Content
        style={{ width: 1280, marginTop: 20 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <Modal
        form={form}
        open={isModalOpen}
        onOk={handleEdit}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleEdit} key="ok">
            {messages.buttons.save}
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            {messages.buttons.cancel}
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label={messages.UserPage.user_name}
            style={{
              display: "",
              width: 300,
              marginBottom: 0,
              flexFlow: "nowrap",
            }}
            name={"user_name"}
          >
            <Input 
              style={{ width: 200, marginLeft: 17 }}
              placeholder={messages.UserPage.user_name} 
            />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.UserPage.login_id}
            style={{
              display: "",
              width: 300,
              marginBottom: 0,
              flexFlow: "nowrap",
            }}
            name={"login_id"}
          >
            <Input 
              style={{ width: 200, marginLeft: 17 }}
              placeholder={messages.UserPage.login_id} 
            />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.UserPage.email}
            style={{
              display: "",
              width: 300,
              marginBottom: 0,
              flexFlow: "nowrap",
            }}
            name={"email"}
          >
            <Input
              style={{ width: 200, marginLeft: 17 }}
              placeholder={messages.UserPage.email}
            />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.UserPage.authority}
            style={{
              display: "inline-block",
              width: 400,
              marginBottom: 0,
            }}
            name={"authority"}
          >
            <Input
              placeholder={messages.UserPage.authority}
              style={{ marginLeft: 58, width: 200 }}
            />
          </Form.Item>
        </Form>
      </Modal>
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-4 my-2"
          bordered={false}
        >
          <UserTable
            data = { userData }
            pagination= { false }
            editRow={(key) => editRow(key)}
          />
        </Card>
      </Content>
    </>
)
}

export default UserPage;

