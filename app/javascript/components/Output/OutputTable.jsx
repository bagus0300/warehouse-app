import React, { useEffect } from "react";
import { Space, Table, Button, Pagination, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusSmallIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import Lang from "../../utils/content/jp.json";
import CustomButton from "../common/CustomButton";
import $lang from "../../utils/content/jp.json";

const IncomeTable = ({ data, editRow, deleteRow }) => {
  const columns = [
    {
      title: "No",
      dataIndex: "product_id",
      // key: "product",
      key: "",
      width: 70,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "品名",
      dataIndex: "product_name",
      key: "product_name",
      width: "35%",
      render: (_, record) => (
        <>
          <p className="my-2">{record.product_name}</p>
          <p>
            <Tag bordered={false} className="px-5" color="default">
              {record.shipper_name}
            </Tag>
            <Tag bordered={false} color="default" className="px-5">
              {record.warehouse_name}
            </Tag>
          </p>
        </>
      ),
    },
    {
      title: "荷姿",
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: "ロット番号",
      dataIndex: "lot_number",
      key: "lot_number",
    },
    {
      title: "重量",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "数量",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <CustomButton
            onClick={() => editRow(record.product_id)}
            title={Lang.buttons.change}
            icon={<EditOutlined />}
            size="small"
            className="btn-default btn-hover-black"
            style={{ backgroundColor: "transparent", color: "#000" }}
            visability={true}
          />
          <CustomButton
            onClick={() => deleteRow(record.product_id)}
            title={Lang.buttons.delete}
            icon={<DeleteOutlined />}
            style={{ backgroundColor: "transparent", color: "#000" }}
            size="small"
            className="btn-default btn-hover-black"
            visability={true}
          />
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
        };
      })}
    />
  );
};

export default IncomeTable;
