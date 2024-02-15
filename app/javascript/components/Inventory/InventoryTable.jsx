import React from "react";
import { Space, Table, Button, Pagination } from "antd";
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
      title: "数量",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "入庫日",
      dataIndex: "stock",
      key: "stock",
    }
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
    // <Pagination pageSizeOptions={5} defaultPageSize={5}/>
  )
};

export default IncomeTable;
