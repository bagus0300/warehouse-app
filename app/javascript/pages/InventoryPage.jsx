import React, { useState, useEffect } from "react";
import moment from "moment";
import dayjs from "dayjs";
import {
  Form,
  Layout,
  Select,
  Space,
  Input,
  DatePicker,
  Divider,
  Card,
  Row,
  Col,
  Button,
  Table
} from "antd";


import { makeHttpReq, makeHttpOptions } from "../utils/helper";
import { openNotificationWithIcon } from "../components/common/notification";

import { warehouseURL, shipperURL, warehouseFeeURL } from "../utils/contants";

import CustomButton from "../components/common/CustomButton";
import $lang from "../utils/content/jp.json";

const { Content } = Layout;
const dateFormat = "YYYY/MM/DD";

const InventoryPage = () => {
  // ---------Warehouse--------
  const [selectedWarehouse, setSelectedWarehouse] = useState({
    value: "",
    label: "",
  });
  const [warehouseOptions, setWarehouseOptions] = useState([]);

  // ------------Shipper-----------
  const [seletedShipper, setSeletedShipper] = useState({
    value: "",
    label: "",
  });

  const [shipperOptions, setShipperOptions] = useState();

  // ----------------Openday--------------
  const [receiptDate, setInoutOn] = useState(dayjs("2015/01/01", dateFormat));

  const onChangeWarehouse = (value, option) => {
    setSelectedWarehouse({ value: value, label: option.label });
  };

  const onChangeShipper = (value, option) => {
    setSeletedShipper({ value: value, label: option.label });
  };

  //  -------Get warehouse names--------
  const getWarehouses = () => {
    makeHttpReq(makeHttpOptions({}, "get", warehouseURL)).then((res) => {
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
    makeHttpReq(makeHttpOptions({}, "get", shipperURL)).then((res) => {
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

  const stockColumns = [
    {
      title: "No",
      dataIndex: "key",
      sorter: true,
      align: "center",
      width: "5%",
    },
    {
      title: `${$lang.stock.productName}`,
      key: "product_name",
      width: "20%",
      dataIndex: "product_name",
      align: "center",
    },
    {
      title: `${$lang.stock.packaging}`,
      dataIndex: "packaging",
      key: "packaging",
      align: "center",
    },
    {
      title: `${$lang.stock.lotoNumber}`,
      dataIndex: "lot_number",
      key: "lot_number",
      align: "center",
    },
    {
      title: `${$lang.stock.amount}`,
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: `${$lang.stock.inStockDate}`,
      dataIndex: "inout_on",
      key: "amount",
      align: "center",
    },
  ];

  // ----------When rerender, get all data------
  useEffect(() => {
    getWarehouses();
    getShippers();
  }, []);

  return (
    <div>
      <Content
        style={{ width: 1280, marginTop: 20 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-2 my-2"
          bordered={false}
        >
          <Form
            name="basic"
            autoComplete="off"
            initialValues={{
              warehouse: "",
              shipper: "",
              receipDate: "",
            }}
          >
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.IncomePageJp.warehouse}: </label>
              </Col>
              <Col span={6}>
                <Select
                  placeholder={$lang.IncomePageJp.warehouse}
                  style={{ width: 150, marginLeft: 14 }}
                  value={selectedWarehouse}
                  options={warehouseOptions}
                  onChange={onChangeWarehouse}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.IncomePageJp.shipper}:</label>
              </Col>
              <Col span={6}>
                <Select
                  style={{ width: 300, marginLeft: 14 }}
                  onChange={onChangeShipper}
                  options={shipperOptions}
                  value={seletedShipper.value}
                  defaultValue={""}
                  placeholder={$lang.IncomePageJp.shipper}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.IncomePageJp.receiptDate}:</label>
              </Col>
              <Col span={10}>
                <div className="ml-2">
                  <DatePicker
                    style={{ width: 150 }}
                    value={receiptDate}
                    onChange={(date, dateStr) => {
                      if (dateStr == "") {
                        setInoutOn(dayjs("2024/02/20", dateFormat));
                      } else setInoutOn(dayjs(dateStr, dateFormat));
                    }}
                    placeholder={$lang.IncomePageJp.receiptDate}
                    className="ml-1"
                    format={dateFormat}
                  />
                  <CustomButton
                    onClick={() => {
                      openNotificationWithIcon(
                        "success",
                        "",
                        "currently on developing."
                      );
                    }}
                    className="px-5 ml-2 btn-bg-black"
                    title={$lang.buttons.search}
                    htmlType="submit"
                    visability={true}
                  />
                </div>
              </Col>
              <Col span={13}>
                <CustomButton
                  onClick={() => {
                    openNotificationWithIcon(
                      "success",
                      "",
                      "currently on developing."
                    );
                  }}
                  className="px-5 ml-2 btn-bg-black"
                  title={$lang.stock.inventory_report}
                  visability={true}
                  style={{ float: "right" }}
                />
              </Col>
            </Row>
            <Divider />
          </Form>
        </Card>
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-4 my-2"
          bordered={false}
        >
          <Table
            columns={stockColumns}
            dataSource={[]}
            rowKey={(node) => node.key}
          />
        </Card>
      </Content>
    </div>
  );
};

export default InventoryPage;
