import React from "react";
import { Table,  Space, Pagination } from "antd";
import messages from "../../utils/content/jp.json";

const DepositTable = ({data, editRow, deleteRow}) => {
  const columns = [
    {
      title: "入金日",
      dataIndex: "product_payDay",
      key: "product_payDay",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "荷主コード",
      dataIndex: "product_shipperCode",
      key: "product_shipperCode",
    },
    {
      title: "荷主名",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "入金額",
      dataIndex: "depositAmount",
      key: "depositAmount",
    },
    {
      title: "摘要",
      dataIndex: "abstract",
      key: "abstract",
    },
    {
      title: "処理日時",
      dataIndex: "processingDataTime",
      key: "processingDataTime",
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="small">
            <Button onClick={() => editRow(record.product_id)}>{ messages.buttons.delete }</Button>
          </Space>
        ),
      }
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
    // <Pagination pageSizeOptions={5} defaultPageSize={5}/>
  )
};

export default DepositTable;
