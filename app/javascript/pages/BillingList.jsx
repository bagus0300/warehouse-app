import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import $lang from "../utils/content/jp.json";
import CTable from "../components/CTable";

import {
  Form,
  Input,
  InputNumber,
  Layout,
  Popconfirm,
  Table,
  Select,
  Button,
  Modal,
  notification,
  DatePicker,
  message,
} from "antd";
const { Content } = Layout;

const BillingList = () => {

  const billingListColumns = [
    {
      title: "No",
      dataIndex: "key",
      sorter: true,
      align: "center",
      width: "5%",
    },
    {
      title: `${$lang.Maintenance.productName}`,
      key: "name",
      width: "20%",
      dataIndex: "name",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.name.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.handlingFee}`,
      dataIndex: "handling_fee_rate",
      key: "handling_fee_rate",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.storageFee}`,
      dataIndex: "storage_fee_rate",
      key: "storage_fee_rate",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.billingClass}`,
      dataIndex: "fee_category",
      align: "center",
      key: "fee_category",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.buttons.change}`,
      dataIndex: "operation",
      render: (text, record, dataIndex) => {
        return (
          <div className="flex justify-center">
            <div className="hidden rounded-full">
              {(star_color = record.done == true ? "text-yellow-500" : "")}
            </div>
            <div className="p-2 rounded-full cursor-pointer text-center">
              <PencilSquareIcon
                shape="circle"
                className="w-20"
                style={{ marginRight: "5px" }}
                onClick={() => {
                  setUpdateStatus("Edit");
                  onAction(record);
                }}
              />
            </div>
            <div className="p-2 rounded-full cursor-pointer items-center text-center">
              <TrashIcon
                shape="circle"
                className="w-20"
                onClick={() => {
                  onDelete(record);
                }}
              />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  const [form] = Form.useForm();
  const [allData, setAllData] = useState([]);
  const [showData, setShowData] = useState([]);

  return (
    <Content style={{ width: 1024 }} className="mx-auto content-h">
      <div>
        <div className="mt-5">
          <Button>{$lang.billing.new}</Button>
          <div className="mt-5  flex flex-row item-center">
            <label>{$lang.billing.YM}</label>
            <DatePicker
              theme={"light"}
              popoverDirection={"down"}
              toggleClassName="invisible"
              showShortcuts={true}
              picker="month"
              className="ml-4"
            />
            <label className="ml-8">{$lang.billing.day}</label>
            <DatePicker picker="day" className="ml-4" />
            <Button
              className="btn-bg-black ml-16"
            >
              {$lang.buttons.search}
            </Button>
          </div>
          <div className="mt-5">
            <CTable
              rowKey={(node) => node.key}
              dataSource={allData}
              columns={billingListColumns}
              pagination={false}
            />
          </div>
          <div>
            <Button className="btn-bg-black ml-64">{$lang.buttons.next}</Button>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default BillingList;
