import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "品番",
    dataIndex: "productnumber",
    key: "productnumber",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "品名",
    dataIndex: "productname",
    key: "productname",
  },
  {
    title: "荷姿",
    dataIndex: "packaging",
    key: "packaging",
  },
  {
    title: "ロット番号",
    dataIndex: "lotnumber",
    key: "lotnumber",
  },
  {
    title: "重量",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "数量",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "",
    key: "action",
    dataIndex: "action",
    render: (_, { action }) => (
      <>
        {action.map((tag, i) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "削除") {
            color = "red";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a style={{ margin: "0 20px " }}> {record.action}</a>
  //     </Space>
  //   ),
  // },
];

const data = [
  {
    productnumber: "1",
    productnamme: "xxx",
    packaging: "xxx",
    lotnumber: "xxx",
    weight: "xxx",
    quantity: "xxx",
    action: ["変更", "削除"],
    key: "1",
  },
  {
    productnumber: "2",
    productnamme: "xxx",
    packaging: "xxx",
    lotnumber: "xxx",
    weight: "xxx",
    quantity: "xxx",
    action: ["変更", "削除"],
    key: "2",
  },
  {
    productnumber: "3",
    productnamme: "xxx",
    packaging: "xxx",
    lotnumber: "xxx",
    weight: "xxx",
    quantity: "xxx",
    action: ["変更", "削除"],
    key: "3",
  },
  {
    productnumber: "4",
    productnamme: "xxx",
    packaging: "xxx",
    lotnumber: "xxx",
    weight: "xxx",
    quantity: "xxx",
    action: ["変更", "削除"],
    key: "4",
  },
  {
    productnumber: "5",
    productnamme: "xxx",
    packaging: "xxx",
    lotnumber: "xxx",
    weight: "xxx",
    quantity: "xxx",
    action: ["変更", "削除"],
    key: "5",
  },
];

const IncomeTable = () => <Table columns={columns} dataSource={data} />;

export default IncomeTable;
