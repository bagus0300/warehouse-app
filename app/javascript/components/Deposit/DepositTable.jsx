import React from "react";
import { Table, Space, Button, Pagination } from "antd";
import messages from "../../utils/content/jp.json";
import {
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const DepositTable = ({ data, editRow, deleteRow }) => {
  const columns = [
    {
      title: "入金日",
      dataIndex: "received_on",
      key: "received_on",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "荷主コード",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "荷主名",
      dataIndex: "shipper_name",
      key: "shipper_name",
    },
    {
      title: "入金額",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "摘要",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "処理日時",
      dataIndex: "processing_on",
      key: "processing_on",
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <PencilSquareIcon style={{ width: 20, cursor: "pointer" }} onClick={() => editRow(record)}>{messages.buttons.change}</PencilSquareIcon>
          <TrashIcon style={{ width: 20, cursor: "pointer" }} onClick={() => deleteRow(record.id)}>{messages.buttons.delete}</TrashIcon>
        </div>
      ),
    }
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={true} />
    // <Pagination pageSizeOptions={5} defaultPageSize={5}/>
  )
};

export default DepositTable;
