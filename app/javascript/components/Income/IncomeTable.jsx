import React from "react";
import { Space, Table, Button } from "antd";
import messages from "../../utils/content/jp.json";

const IncomeTable = ({data, editRow, deleteRow}) => {
  const columns = [
    {
      title: "品番",
      dataIndex: "product_id",
      key: "product_id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "品名",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "荷姿",
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: "ロット番号",
      dataIndex: "lotNumber",
      key: "lotNumber",
    },
    {
      title: "重量",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "数量",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button onClick={() => editRow(record.productnumber)}>{ messages.buttons.change }</Button>
          <Button onClick={() => deleteRow(record.productnumber)}>{ messages.buttons.delete }</Button>
        </Space>
      ),
    }
  ];
  return (
    <Table columns={columns} dataSource={data} />
  )
};

export default IncomeTable;
