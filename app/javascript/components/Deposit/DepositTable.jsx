import React from "react";
import { Table, Space, Button, Pagination } from "antd";
import messages from "../../utils/content/jp.json";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const DepositTable = ({ data, editRow, deleteRow, is_edit }) => {
  const columns = [
    {
      title: "入金日",
      dataIndex: "received_on",
      key: "received_on",
      render: (val) => (val != undefined ? val.replace(/\-/g, "/") : ""),
    },
    {
      title: "荷主コード",
      dataIndex: "shipper_code",
      key: "shipper_code",
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
      render: (val) => (val != undefined ? val.replace(/\-/g, "/") : ""),
    },
    is_edit === 1 ? (
      {
        title: "#",
        key: "action",
        render: (_, record) => (
          <div style={{ display: "flex" }}>
            <PencilSquareIcon
              style={{ width: 20, cursor: "pointer" }}
              onClick={() => editRow(record)}
            >
              {messages.buttons.change}
            </PencilSquareIcon>
            <TrashIcon
              style={{ width: 20, cursor: "pointer" }}
              onClick={() => deleteRow(record.id)}
            >
              {messages.buttons.delete}
            </TrashIcon>
          </div>
        ),
      }
    ) : (
      <div></div>
    ),
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
    // <Pagination pageSizeOptions={5} defaultPageSize={5}/>
  );
};

export default DepositTable;
