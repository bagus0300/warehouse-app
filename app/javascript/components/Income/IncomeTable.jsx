import React, { useEffect } from "react";
import { Space, Table, Button, Pagination } from "antd";
import messages from "../../utils/content/jp.json";

const IncomeTable = ({ data, editRow, deleteRow }) => {
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button onClick={() => editRow(record.product_id)}>
            {messages.buttons.change}
          </Button>
          <Button onClick={() => deleteRow(record.product_id)}>
            {messages.buttons.delete}
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={data.map((row, index) => {
        return {
          ...row,
          key: index + 1,
          actions: (
            <div>
              <a onClick={() => editRow(row.product_id)}>{messages.common.edit}</a>&nbsp;&nbsp;
            <a onClick={() => deleteRow(row.product_id)}>{messages.common.delete}</a>
            </div>
          ),
        };
      })}
    />
    // <Pagination pageSizeOptions={5} defaultPageSize={5}/>
  );
};

export default IncomeTable;
