import React, { useEffect } from "react";
import { Space, Table, Button, Pagination, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Lang from "../../utils/content/jp.json";
import CustomButton from "../common/CustomButton";
import $lang from "../../utils/content/jp.json";

const OutStockTable = ({ data, editRow, deleteRow }) => {
  const columns = [
    {
      title: "No",
      dataIndex: "index",
      // key: "product",
      key: "",
      width: 70,
      render: (text) => <a>{text}</a>,
    },
    {
      title: $lang.outStock.table.productName,
      dataIndex: "product_name",
      key: "product_name",
      width: "35%",
      render: (_, record) => (
        <>
          <p className="text-lg">{record.product_name}</p>
          <p>
            <span className="text-xs text-blue">{record.shipper_name}</span>{" "}
            <span className="px-5 text-xs text-blue">|</span>
            <span className="text-xs text-blue">{record.warehouse_name}</span>
            <span className="px-5 text-xs text-blue">|</span>
            <span className="text-xs text-blue">
              {$lang.outStock.outStockDate}: {record.outstock_date}
            </span>
          </p>
        </>
      ),
    },
    {
      title: $lang.outStock.table.packaging,
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: $lang.outStock.table.lotNumber,
      dataIndex: "lot_number",
      key: "lot_number",
    },
    {
      title: $lang.outStock.table.weight,
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: $lang.outStock.table.amount,
      dataIndex: "outstock_amount",
      key: "outstock_amount",
    },
    {
      title: "#",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <CustomButton
            onClick={() => editRow(record.stock_inout_id)}
            title={Lang.buttons.change}
            icon={<EditOutlined />}
            size="small"
            className="btn-default btn-hover-black"
            style={{ backgroundColor: "transparent", color: "#000" }}
            visability={true}
          />
          <CustomButton
            onClick={() => deleteRow(record.stock_inout_id)}
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

export default OutStockTable;
