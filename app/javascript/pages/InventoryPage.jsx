import React, { useState, useEffect } from "react";
import moment from "moment";
import dayjs from "dayjs";
import {
  Form,
  Layout,
  Select,
  DatePicker,
  Divider,
  Card,
  Row,
  Col,
  Table,
} from "antd";

import { API } from "../utils/helper";
import { openNotificationWithIcon } from "../components/common/notification";

import { warehouseURL, shipperURL, inventoryURL } from "../utils/contants";

import CustomButton from "../components/common/CustomButton";
import $lang from "../utils/content/jp.json";

const { Content } = Layout;
const dateFormat = "YYYY/MM/DD";

const InventoryPage = ({ is_edit }) => {
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

  const [shipperOptions, setShipperOptions] = useState([]);
  const [shipperDisctription, setShipperDescription] = useState({
    code: "",
    closingDate: "",
  });

  const [inventories, setInventories] = useState([]);
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
          code: item.code,
          closingDate: item.closingDate,
        };
      });
      setShipperOptions(shippers);

      if (shippers.length > 0) {
        setSeletedShipper({
          value: shippers[0].value,
          label: shippers[0].label,
        });

        setShipperDescription({
          code: shippers[0].code,
          closingDate: shippers[0].closingDate,
        });
      }
    });
  };

  const getInventory = () => {
    let url = `${inventoryURL}`;
    if (seletedShipper.value != "" || selectedWarehouse.value != "") url += "?";
    url +=
      seletedShipper.value != "" ? `shipper_id=${seletedShipper.value}` : "";
    url +=
      selectedWarehouse.value != ""
        ? `&warehouse_id=${selectedWarehouse.value}`
        : "";

    API.get(url)
      .then((res) => {
        const inventories = res.data.map((item, i) => {
          i++;
          return {
            inout_on: item.inout_on,
            amount: item.inventory_stock,
            lot_number: item.lot_number,
            product_name: item.name,
            packaging: item.packaging,
            key: i,
          };
        });
        setInventories(inventories);
      })
      .catch((err) => {});
  };

  const stockColumns = [
    {
      title: "No",
      dataIndex: "key",
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
    getInventory();
  }, []);

  useEffect(() => {
    const shipper = shipperOptions.filter(
      (item) => item.value == seletedShipper.value
    );
    setShipperDescription({
      code: shipper.length > 0 ? shipper[0].code : "",
      closingDate: shipper.length > 0 ? shipper[0].closingDate : "",
    });
  }, [seletedShipper]);

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
                <label>{$lang.inStock.warehouse}: </label>
              </Col>
              <Col span={6}>
                <Select
                  placeholder={$lang.inStock.warehouse}
                  style={{ width: 150, marginLeft: 14 }}
                  value={selectedWarehouse}
                  options={warehouseOptions}
                  onChange={onChangeWarehouse}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.inStock.shipper}:</label>
              </Col>
              <Col span={6}>
                <Select
                  style={{ width: 300, marginLeft: 14 }}
                  onChange={onChangeShipper}
                  options={shipperOptions}
                  value={seletedShipper.value}
                  defaultValue={""}
                  placeholder={$lang.inStock.shipper}
                />
                {shipperOptions.length > 0 && (
                  <span className="" style={{ marginLeft: 16 }}>
                    {$lang.inStock.shipper} :&nbsp;&nbsp;
                    {shipperDisctription.code} &nbsp;/ &nbsp;
                    {shipperDisctription.closingDate}
                  </span>
                )}{" "}
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.stock.targetDate}:</label>
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
                    placeholder={$lang.inStock.in}
                    className="ml-1"
                    format={dateFormat}
                  />
                  <CustomButton
                    className="px-5 ml-2 btn-bg-black"
                    title={$lang.buttons.search}
                    visability={true}
                    onClick={getInventory}
                  />
                </div>
              </Col>
              <Col span={13}>
                {is_edit === 1 ? (
                  <CustomButton
                    onClick={() => {
                      openNotificationWithIcon(
                        "success",
                        $lang.popConrimType.success,
                        "currently on developing."
                      );
                    }}
                    className="px-5 ml-2 btn-bg-black"
                    title={$lang.stock.inventory_report}
                    visability={true}
                    style={{ float: "right" }}
                  />
                ) : (
                  <></>
                )}
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
            dataSource={inventories}
            rowKey={(node) => node.key}
            is_edit={is_edit}
            pagination={false}
          />
        </Card>
      </Content>
    </div>
  );
};

export default InventoryPage;
