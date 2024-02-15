import React from "react";
import { Button } from "antd";

const CustomButton = ({
  title,
  onClick = () => {},
  className = "btn-bg-black",
  icon = <></>,
  size = "default",
  htmlType = "default",
  style = {},
  visability = false,
}) => {
  return (
    <Button
      onClick={onClick}
      className={className}
      icon={icon}
      size={size}
      htmlType={htmlType}
      style={style}
      hidden={!visability}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
