import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import $lang from "../utils/content/jp.json";
import CTable from "../components/CTable";

import {
  Form,
  InputNumber,
  Layout,
  Button,
  Card,
  Space,
  Row,
  Col,
  Select,
} from "antd";
import Item from "antd/es/list/Item";
const { Content } = Layout;

const BillingList = ({ is_edit }) => {
  const [year, setYear] = useState(2024);
  const [day, setDay] = useState(1);
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
    },
    {
      title: `${$lang.Maintenance.storageFee}`,
      dataIndex: "storage_fee_rate",
      key: "storage_fee_rate",
      align: "center",
    },
    {
      title: `${$lang.Maintenance.billingClass}`,
      dataIndex: "fee_category",
      align: "center",
      key: "fee_category",
    },
    is_edit === 1 ? (
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
      }
    ) : (
      <div></div>
    ),
  ];

  const [form] = Form.useForm();
  const [allData, setAllData] = useState([]);
  const [showData, setShowData] = useState([]);

  const dateOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  return (
    <Content style={{ width: 1280 }} className="mx-auto content-h">
      <Card
        style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
        className="py-2 my-2"
        bordered={false}
      >
        <Row>
          <Col span={12}>
            <Space>
              <label>{$lang.billing.YM}:</label>
              <InputNumber defaultValue={2024} value={year} />
            </Space>
            <Space>
              <label className="ml-8">{$lang.billing.day}:</label>
              <Select
                options={dateOptions.map((item) => {
                  return {
                    value: item,
                    label: item,
                  };
                })}
                defaultValue={1}
                style={{ width: 80 }}
              />
            </Space>
          </Col>
          <Col span={12}>
            <div style={{ float: "right" }}>
              <Button className="btn-bg-black">{$lang.buttons.search}</Button>
              <Button className="ml-2">{$lang.billing.new}</Button>
            </div>
          </Col>
        </Row>
      </Card>
      <Card
        style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
        className="py-2 my-2"
        bordered={false}
      >
        {" "}
        <div className="mt-5">
          <CTable
            rowKey={(node) => node.key}
            dataSource={allData}
            columns={billingListColumns}
            pagination={false}
          />
        </div>
      </Card>
    </Content>
  );
};

export default BillingList;
