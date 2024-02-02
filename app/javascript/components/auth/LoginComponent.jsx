import React from "react";
import { Button, Checkbox, Form, Input, Card, Typography } from "antd";
const { Title } = Typography;
import { useAuth } from "../../hooks/userAuth";

import messages from "../../utils/content/jp.json";

const LoginForm = () => {
  const {
    state: { loginErrors },
    loginAction,
  } = useAuth();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFormSubmit = ({ username, password }) => {
    console.log("username", username);
    console.log("password", password);
    loginAction({ username, password });
  };

  return (
    <div style={{ width: 350 }} className="mx-auto">
      <div className="py-18 flex flex-col justify-center h-full min-h-screen gap-6 mt-12 xs:gap-7 xs:mt-0 sm">
        <Card style={{ width: 400 }} className="py-4">
          <Title
            level={4}
            className="text-center"
            style={{ marginTop: 10, marginBottom: 50 }}
          >
            {messages.SiteInfo.title}
          </Title>
          {loginErrors && <p>{loginErrors}</p>}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFormSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={messages.LoginFields.username}
              name="username"
              rules={[
                { required: true, message: messages.messages.type_username },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={messages.LoginFields.password}
              name="password"
              rules={[
                { required: true, message: messages.messages.type_password },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {messages.buttons.login}
              </Button>
              <small style={{ marginLeft: 20 }}>
                <a href="/signup">{messages.buttons.register}</a>
              </small>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
