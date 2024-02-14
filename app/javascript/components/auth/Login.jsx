import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Card, Typography } from "antd";
const { Title } = Typography;
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import messages from "../../utils/content/jp.json";
<<<<<<< HEAD



// useEffect(() => {
//   if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//     navigate("/");
//   }
// }, []);
=======
import { openNotificationWithIcon } from "../common/notification";
// import AlertComponent from "../common/alert";
>>>>>>> 6eeb1e2e47ec88274bc497e2f02f83d98426a454

const LoginForm = ({ token }) => {
  const navigate = useNavigate();

  const {
    state: { loginErrors, beforeRequest },
    loginAction,
    setBeforeRequestAction,
  } = useAuth();


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFormSubmit = ({ login_id, password }) => {
    loginAction({ user: { login_id, password } });
  };

  useEffect(() => {
    if (loginErrors != null && !beforeRequest) {
      openNotificationWithIcon("error", "error", loginErrors);
      setBeforeRequestAction(true);
    } else if (loginErrors == null && !beforeRequest) {
      navigate("/home");
    } else {
    }
  }, [loginErrors, beforeRequest]);

  return (
    <div style={{ width: 450 }} className="mx-auto">
      <div className="py-18 flex flex-col justify-center h-full min-h-screen gap-6 xs:gap-7 xs:mt-0 sm">
        <Title
          level={4}
          className="text-center"
          style={{ marginTop: 10, marginBottom: 20 }}
        >
          {messages.SiteInfo.title}
        </Title>
        <Card style={{ width: 450 }} className="py-4">
          {/* {loginErrors && <AlertComponent type="error" message={loginErrors} />} */}
          <Title
            level={5}
            className="text-center"
            style={{ marginTop: 10, marginBottom: 40 }}
          >
            {messages.pages.login}
          </Title>
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
              name="login_id"
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
                <Link to="/signup">{messages.buttons.register}</Link>
              </small>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
