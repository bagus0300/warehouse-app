import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import $lang from "../utils/content/jp.json";
import CTable from "../components/CTable";
import { API } from "../utils/helper";
import { warehouseURL, shipperURL } from "../utils/contants";
import { Space, Card, Row, Col, Divider } from "antd";
const { RangePicker } = DatePicker;

import {
  Form,
  Input,
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
import { Spa } from "@mui/icons-material";
const { Content } = Layout;

const BillingProcess = ({ is_edit }) => {
  const billingProcessColumns = [
    {
      title: `${$lang.billing.table.number}`,
      dataIndex: "key",
      align: "center",
      width: "8%",
    },
    {
      title: `${$lang.billing.table.shipperName}`,
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
      title: `${$lang.billing.table.receivedAmount}`,
      key: "name",
      width: "10%",
      dataIndex: "name",
      align: "center",
    },
    {
      title: `${$lang.billing.table.handlingFee}`,
      key: "name",
      width: "10%",
      dataIndex: "name",
      align: "center",
    },
    {
      title: `${$lang.billing.table.storageFee}`,
      key: "name",
      width: "10%",
      dataIndex: "name",
      align: "center",
    },
    {
      title: `${$lang.billing.table.invoiceAmount}`,
      dataIndex: "handling_fee_rate",
      key: "handling_fee_rate",
      align: "center",
    },
    {
      title: `${$lang.billing.table.consumptionTax}`,
      dataIndex: "storage_fee_rate",
      key: "storage_fee_rate",
      align: "center",
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
  const [dValue, setDValue] = useState();
  const [shipperOptions, setShipperOptions] = useState();
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState({
    value: "",
    label: "",
  });
  // ------------Shipper-----------
  const [seletedShipper, setSeletedShipper] = useState({
    value: "",
    label: "",
  });

  const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dateOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const onChangeDateValue = () => {
    console.log("log");
  };

  //  -------Get warehouse names--------
  const getWarehouses = () => {
    API.get(warehouseURL).then((res) => {
      const warehouses = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setWarehouseOptions(warehouses);

      if (warehouses.length > 0)
        setSelectedWarehouse({
          value: warehouses[0].value,
          label: warehouses[0].label,
        });
    });
  };

  // --------Get shipper data--------
  const getShippers = () => {
    API.get(shipperURL).then((res) => {
      const shippers = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setShipperOptions(shippers);

      if (shippers.length > 0)
        setSeletedShipper({
          value: shippers[0].value,
          label: shippers[0].label,
        });
    });
  };

  const onChangeWarehouse = (value, option) => {
    setSelectedWarehouse({ value: value, label: option.label });
  };
  const onChangeShipper = (value, option) => {
    setSeletedShipper({ value: value, label: option.label });
  };

  useEffect(() => {
    getWarehouses();
    getShippers();
  }, []);

  return (
    <Content
      style={{ width: 1280, marginTop: 20 }}
      className="mx-auto content-h"
    >
      <Card
        style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
        className="py-2 my-2"
        bordered={false}
      >
        <Row className="my-2">
          <Space align="center">
            <label>{$lang.billing.billingDate}:</label>
            <Input
              type="number"
              className=""
              min={2000}
              style={{ width: 100 }}
              defaultValue={2024}
            ></Input>
          </Space>
          <Space align="center" className="ml-4">
            <label>{$lang.billing.month}:</label>
            <Select
              options={monthOptions.map((item) => {
                return {
                  value: item,
                  label: item,
                };
              })}
              defaultValue={1}
              style={{ width: 80 }}
            />
          </Space>
          <Space align="center" className="ml-4">
            <label className="">{$lang.billing.day}:</label>
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
        </Row>
        <Row className="my-2">
          <Space align="center">
            <label>{$lang.billing.targetPeriod}:</label>
            <RangePicker
              theme={"light"}
              popoverDirection={"down"}
              toggleClassName="invisible"
              showShortcuts={true}
              placeholder={["YYYY/MM/DD", "YYYY/MM/DD"]}
            />
          </Space>
        </Row>
        <Row className="my-2">
          <Space align="center">
            <label>{$lang.billing.targetShipper}:</label>
            <Select
              style={{ width: 200 }}
              onChange={onChangeShipper}
              options={shipperOptions}
              value={seletedShipper.value}
              defaultValue={""}
              placeholder={$lang.inStock.shipper}
            />
          </Space>
        </Row>
        <Row className="my-2">
          <Space align="center">
            <label>{$lang.billing.targetWarehouse}:</label>
            <Select
              placeholder={$lang.inStock.warehouse}
              style={{ width: 150 }}
              value={selectedWarehouse}
              options={warehouseOptions}
              onChange={onChangeWarehouse}
            />
          </Space>
        </Row>
        <Divider />
        <Row>
          <Space align="center">
            {" "}
            <Button className="btn-bg-black" style={{ marginLeft: 60 }}>
              {$lang.billing.buttons.billingCalculation}
            </Button>
            <Button className="btn-bg-black ml-1">
              {$lang.billing.buttons.billingList}
            </Button>
          </Space>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col span={12}>
            <div>{$lang.billing.new}</div>
          </Col>
          <Col span={12}>
            {is_edit === 1 ?
              (<Space className="" style={{ float: "right" }}>
                <Button className="btn-bg-black">
                  {$lang.buttons.billingListOutput}
                </Button>
                <Button className="btn-bg-black">
                  {$lang.buttons.billingConfirmed}
                </Button>
              </Space>) :
              (<></>)}
          </Col>
        </Row>
        <Row className="my-2">
          <CTable
            rowKey={(node) => node.key}
            dataSource={allData}
            columns={billingProcessColumns}
            pagination={false}
          />
        </Row>
      </Card>
    </Content>
  );
};

export default BillingProcess;
