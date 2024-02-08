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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFormSubmit = ({ user_name, password, login_id }) => {
    signupAction({ user_name, password, login_id });
  };

  useEffect(() => {});

  return (
    <div style={{ width: 450 }} className="mx-auto">
      <div className="py-18 flex flex-col justify-center h-full min-h-screen gap-6 mt-12 xs:gap-7 xs:mt-0 sm">
        <Card style={{ width: 450 }} className="py-4">
          <Title
            level={4}
            className="text-center"
            style={{ marginTop: 10, marginBottom: 50 }}
          >
            {messages.pages.signup}
          </Title>
          {signupErrors && <p>{signupErrors}</p>}
          <Form
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
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={messages.signupFields.confirm_password}
              name="repassword"
              rules={[
                { required: true, message: messages.messages.type_repassword },
              ]}
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
