import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Card, Typography } from "antd";
const { Title } = Typography;
import { useAuth } from "../../hooks/userAuth";
import { Link } from "react-router-dom";

import messages from "../../utils/content/jp.json";

const Signup = () => {
  const {
    state: { signupErrors },
    signupAction,
  } = useAuth();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFormSubmit = ({ user_name, email, login_id, password }) => {
    signupAction({ user_name, email, login_id, password });
  };

  useEffect(() => {});

  return (
    <div style={{ width: 550 }} className="mx-auto">
      <div className="py-18 flex flex-col justify-center h-full min-h-screen gap-6 mt-12 xs:gap-7 xs:mt-0 sm">
        <Card style={{ width: 550 }} className="py-4">
          <Title
            level={4}
            className="text-center"
            style={{ marginTop: 10, marginBottom: 50 }}
          >
            {messages.pages.signup}
          </Title>
          {signupErrors && <p>{signupErrors}</p>}
          <Form
            {...formItemLayout}
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFormSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={messages.signupFields.username}
              name="user_name"
              rules={[
                { required: true, message: messages.messages.type_username },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={messages.signupFields.email}
              name="email"
              rules={[
                {
                  type: "email",
                  message: messages.messages.invalide_email,
                },
                { required: true, message: messages.messages.type_email },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={messages.signupFields.loginId}
              name="login_id"
              rules={[
                { required: true, message: messages.messages.type_loginId },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={messages.signupFields.password}
              name="password"
              rules={[
                { required: true, message: messages.messages.type_password },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={messages.signupFields.confirm_password}
              name="repassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: messages.messages.type_repassword },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(messages.messages.no_matched_password)
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {messages.signupFields.signup}
              </Button>
              <small style={{ marginLeft: 20 }}>
                <Link to="/">{messages.signupFields.to_login}</Link>
              </small>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
