import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import Lang from "../../utils/content/jp.json";
import CustomButton from "../common/CustomButton";
import { EditOutlined } from "@ant-design/icons";

import { 
  makeHttpReq, 
  makeHttpOptions 
} from "../../utils/helper";

import {
  getUserAuthURL
} from "../../utils/contants";

const UserTable = ({ data, editRow }) => {

  const columns = [
    {
      title: "NO",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ユーザー名",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "ログインID",
      dataIndex: "login_id",
      key: "login_id",
    },
    {
      title: "電子メール",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "権限",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <CustomButton
            onClick={() => editRow(record.key)}
            title={Lang.buttons.change}
            icon={<EditOutlined />}
            size="small"
            className="btn-default btn-hover-black"
            style={{ backgroundColor: "transparent", color: "#000" }}
            visability={true}
          />
        </Space>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={true} />
  )
};

export default UserTable;
