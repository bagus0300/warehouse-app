import React from "react";
import { Table, Input } from "antd";


const UserTable = ({ data  }) => {

  const columns = [
    {
      title: "NO",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ページ名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "読み込み専用",
      key: "readonly",
      render: (_, record) => (
          <Input
            type="checkbox"
          />
      ),
    },
    {
      title: "編集",
      key: "edit",
      render: (_, record) => (
          <Input
            type="checkbox"
          />
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
};

export default UserTable;
