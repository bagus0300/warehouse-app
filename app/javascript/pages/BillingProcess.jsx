import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import $lang from "../utils/content/jp.json";
import CTable from "../components/CTable";

const { RangePicker } = DatePicker;

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

const BillingProcess = () => {

  const billingProcessColumns = [
    {
      title: `${$lang.billing.number}`,
      dataIndex: "key",
      align: "center",
      width: "8%",
    },
    {
      title: `${$lang.Maintenance.shipperID}`,
      key: "name",
      width: "8%",
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
      title: `${$lang.Maintenance.shipperName}`,
      key: "name",
      width: "10%",
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
      title: `${$lang.billing.lastBilledAmount}`,
      key: "name",
      width: "10%",
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
      title: `${$lang.DepositPage.amount}`,
      key: "name",
      width: "10%",
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
      title: `${$lang.billing.billingAmout}`,
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
      title: `${$lang.billing.consumptionTax}`,
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
      title: `${$lang.billing.output}`,
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
          <div className="mt-5  flex flex-row item-center">
            <label>{$lang.billing.billingDate}:</label>
            <DatePicker
              theme={"light"}
              popoverDirection={"down"}
              toggleClassName="invisible"
              showShortcuts={true}
              picker="year"
              className="ml-4"
            />
            <label>{$lang.billing.year}</label>
            <DatePicker
              theme={"light"}
              popoverDirection={"down"}
              toggleClassName="invisible"
              showShortcuts={true}
              picker="month"
              className="ml-4"
            />
            <label>{$lang.billing.month}</label>
            <label className="ml-16">{$lang.billing.day}:</label>
            <DatePicker picker="day" className="ml-4" />

            <Button
              className="btn-bg-black ml-16"
            >
              {$lang.buttons.return}
            </Button>
          </div>
          <div className="mt-5  flex flex-row item-center">
            <label>{$lang.billing.targetPeriod}</label>
            <RangePicker
              theme={"light"}
              popoverDirection={"down"}
              toggleClassName="invisible"
              showShortcuts={true}
              placeholder={['YYYY/MM/DD', 'YYYY/MM/DD']}
              className="ml-4"
            />
          </div>
          <div className="flex flex-row item-center">
            <label>{$lang.billing.targetShipper}</label>
            <InputNumber className="ml-4" />
            <label className="ml-4" >~</label>
            <InputNumber className="ml-4" />
          </div>
          <div className="mt-5  flex flex-row item-center ">
            <div>
              <label>{$lang.billing.targetWarehouse}</label>
              <Select className="ml-4 w-100"
                defaultValue={1}
                align={'center'}
                options={[
                  {
                    value: 1,
                    label: 1
                  },
                  {
                    value: 2,
                    label: 2
                  },
                  {
                    value: 3,
                    label: 3
                  },
                ]}
              />
            </div>
            <label className="ml-16"></label>
            <label className="ml-16"></label>
            <Button className="btn-bg-black ml-16">
              {$lang.buttons.calculation}
            </Button>
          </div>
          <div className="mt-5">
            <div>
              {$lang.billing.new}
            </div>
            <div className="flex flex-row">
              <Button className="btn-bg-black">
                {$lang.buttons.billingListOutput}
              </Button>
              <label className="ml-16"></label>
              <label className="ml-16"></label>
              <label className="ml-16"></label>
              <Button className="btn-bg-black ml-32">
                {$lang.buttons.billingConfirmed}
              </Button>
            </div>
          </div>
          <div className="mt-5">
            <CTable
              rowKey={(node) => node.key}
              dataSource={allData}
              columns={billingProcessColumns}
              pagination={false}
            />
          </div>
          <div>
            <Button className="btn-bg-black ml-64">{$lang.buttons.next}</Button>
          </div>
        </div>
      </div>
    </Content >
  );
};

export default BillingProcess;

