import { Alert } from "antd";
import React from "react";

const onClose = (e) => {};
const AlertComponent = ({ type, message }) => (
  <>
    <Alert
      description={message}
      type={type}
      closable
      onClose={onClose}
      style={{ margin: "10px 0" }}
    />
  </>
);
export default AlertComponent;
