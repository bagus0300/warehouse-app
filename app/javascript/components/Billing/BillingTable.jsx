import React from "react";
import { Table,  Space, Pagination } from "antd";
import messages from "../../utils/content/jp.json";

const BillingTable = ({data, editRow, deleteRow}) => {
  const columns = [
    {
      title: "年/月",
      dataIndex: "yearMonth",
      key: "yearMonth",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "締日",
      dataIndex: "closingDate",
      key: "closingDate",
    },
    {
      title: "件数",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "対象期間",
      dataIndex: "targetPeriod",
      key: "targetPeriod",
    },
    {
      title: "処理日時",
      dataIndex: "processingDateTime",
      key: "processingDateTime",
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="small">
            <Button onClick={() => listRow(record.list)}>{ messages.buttons.list }</Button>
            <Button onClick={() => detailRow(record.detail)}>{ messages.buttons.detail }</Button>
          </Space>
        ),
      }
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
    // <Pagination pageSizeOptions={5} defaultPageSize={5}/>
  )
};

export default BillingTable;
