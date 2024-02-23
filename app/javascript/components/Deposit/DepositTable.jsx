import React from "react";
import { Table, Space, Button, Pagination } from "antd";
import $lang from "../../utils/content/jp.json";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import CustomButton from "../common/CustomButton";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
            <CustomButton
              onClick={() => {
                editRow(record);
              }}
              title={$lang.buttons.change}
              icon={<EditOutlined />}
              size="small"
              className="btn-default btn-hover-black"
              style={{ backgroundColor: "transparent", color: "#000" }}
              visability={true}
            />{" "}
            <CustomButton
              onClick={() => deleteRow(record.id)}
              title={$lang.buttons.delete}
              icon={<DeleteOutlined />}
              style={{
                backgroundColor: "transparent",
                color: "#000",
                marginLeft: 10,
              }}
              size="small"
              className="btn-default btn-hover-black"
              visability={true}
            />
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
