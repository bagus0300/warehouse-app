import React from "react";
import { Form, Layout, Select, Space, Input, DatePicker, Divider, Button } from "antd";

import IncomeTable from "../components/Income/IncomeTable";
import localeJP from "antd/es/date-picker/locale/ja_JP";
import messages from "../utils/content/jp.json";
import { useState, useEffect } from "react";


const { Search } = Input;
const { Content } = Layout;

const OutputPage = () => {

  // backend data start

  const storeOptions = [
    { value: 0, label: "一般倉庫" },
    { value: 1, label: "編集" },
    { value: 2, label: "削除" },
    { value: 3, label: "代替テキスト" }
  ];

  const shipperOptions = [
    { value: 0, label: "株式会社XXXXXX（○○倉庫製品）" },
    { value: 1, label: "編集" },
    { value: 2, label: "削除" },
    { value: 2, label: "代替テキスト" },
  ];

  const products = [
    {
      product_id: "1",
      product_name: "product name 1",
      product_type: "project type 1",
      cargoPrice: "100",
      storagePrice: "200",
      lotNumber: "123123123",
      weight: "100",
      stock: "200",
      action: ["messages.buttons.change", "messages.buttons.delete"],
      key: "1"
    },
    {
      product_id: "2",
      product_name: "product name 2",
      product_type: "project type 2",
      cargoPrice: "100",
      storagePrice: "200",
      lotNumber: "123123123",
      weight: "100",
      stock: "200",
      action: ["messages.buttons.change", "messages.buttons.delete"],
      key: "2"
    },
    {
      product_id: "3",
      product_name: "product name 3",
      product_type: "project type 3",
      cargoPrice: "100",
      storagePrice: "200",
      lotNumber: "123123123",
      weight: "100",
      stock: "200",
      action: ["messages.buttons.change", "messages.buttons.delete"],
      key: "3"
    },
    {
      product_id: "4",
      product_name: "product name 4",
      product_type: "project type 4",
      cargoPrice: "100",
      storagePrice: "200",
      lotNumber: "123123123",
      weight: "100",
      stock: "200",
      action: ["messages.buttons.change", "messages.buttons.delete"],
      key: "4"
    },
    {
      product_id: "5",
      product_name: "product name 5",
      product_type: "project type 5",
      cargoPrice: "100",
      storagePrice: "200",
      lotNumber: "123123123",
      weight: "100",
      stock: "200",
      action: ["messages.buttons.change", "messages.buttons.delete"],
      key: "5"
    }
  ];

  // backend data end

  const [data, setData] = useState([]);

  const [storeVal, setStoreVal] = useState(storeOptions[0]);
  const [shipperVal, setShipperVal] = useState(shipperOptions[0]);
  const [receiptDate, setReceiptDate] = useState();
  const [searchResult, setSearchResult] = useState({});

  const handleSubmit = (e) => {

  };


  // useEffect(() => {

  // }, []);


  // const handleSubmit = (e) = {

  // };

  const selStoreChange = (value) => {
    setStoreVal(storeOptions[value]);
  };

  const selShipperChange = (value) => {
    setShipperVal(shipperOptions[value]);
  }

  const onChangeDate = (date, dateString) => {
    setReceiptDate(dateString);
  };

  const onSearch = (value, _e, info) => {
    const result = products.filter(product => product.product_id == value)[0];
    setSearchResult(result);
  }

  const editRow = (id) => {
  }

  const deleteRow = (id) => {
    const newData = data.slice();
    const delData = newData.filter((data) => data.product_id == id)[0];
    const index = newData.indexOf(delData);
    newData.splice(index, 1);
    setData(newData);
  }

  const insertData = () => {
    const newData = data.slice();
    newData.push(searchResult);
    setData(newData);
  };

  return (
    <div>
      <Content
        style={{ width: 1024, }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <div
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ margin: "50px 0 0px 0" }}
        >
          <Space style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", }}>
            <Form.Item
              label={messages.IncomePageJp.warehouse}
              name="username"
              style={{ display: "inline-block", width: 200, marginBottom: 0 }}
            >
              <Select
                defaultValue={storeVal.label}
                onChange={selStoreChange}
                style={{ width: 140, marginLeft: 14 }}
                options={storeOptions}
              />
            </Form.Item>
            <Form.Item
              label={messages.IncomePageJp.shipper}
              name="username"
              style={{ display: "", width: 500, marginBottom: 0, flexFlow: "nowrap" }}
            >
              <Select
                defaultValue={shipperVal.label}
                style={{ width: 300, marginLeft: 14 }}
                onChange={selShipperChange}
                options={shipperOptions}
              />
            </Form.Item>
            <Form.Item
              label={messages.IncomePageJp.receiptDate}
              name="username"
              style={{
                display: "inline-block",
                width: 250,
                marginLeft: 0,
                marginBottom: 0,
              }}
            >
              <DatePicker value={receiptDate} onChange={onChangeDate} locale={localeJP} />
            </Form.Item>
          </Space>
          <Divider />
          <div>
            <Space direction="horizontal" style={{ margin: "0 0 20px 0" }}>
              <Form.Item
                label={messages.IncomePageJp.productNumber}
                name="username"
                style={{
                  display: "inline-block",
                  width: 350,
                  marginBottom: 0,
                }}
              >
                <Select
                  placeholder={messages.IncomePageJp.productNumber}
                  allowClear
                  style={{ marginLeft: 15, width: 200 }}
                  enterButton="検索"
                  value={searchResult.product_id}
                />
              </Form.Item>
            </Space>
          </div>
          <div>
            <Space direction="horizontal" style={{ margin: "0 0 20px 0" }}>
              <Form.Item
                label={messages.IncomePageJp.productName}
                name="username"
                style={{
                  display: "inline-block",
                  width: 350,
                  marginBottom: 0,
                }}
              >
                <Space.Compact>
                  <Input
                    placeholder={messages.IncomePageJp.productName}
                    style={{ marginLeft: 15, width: 250 }}
                    value={searchResult.product_name} />
                </Space.Compact>
              </Form.Item>
              <Form.Item
                label={messages.IncomePageJp.packing}
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginLeft: 30,
                  marginBottom: 0,
                }}
              >
                <Space.Compact>
                  <Input placeholder={messages.IncomePageJp.packing} value={searchResult.product_type} />
                </Space.Compact>
              </Form.Item>
              <Form.Item
                label={messages.IncomePageJp.packing}
                name="username"
                style={{
                  display: "inline-block",
                  width: 450,
                  marginLeft: 30,
                  marginBottom: 0,
                }}
              >
                <Space.Compact>
                  <Input
                    style={{ width: 100, }}
                    placeholder={messages.IncomePageJp.cargoPrice}
                    value={searchResult.cargoPrice} />
                  <Input style={{ width: 80 }} />
                  <Input style={{ width: 100 }} placeholder={messages.IncomePageJp.storagePrice} value={searchResult.storagePrice} />
                </Space.Compact>
              </Form.Item>
            </Space>
            <Space>
              <Form.Item
                // label="messages.IncomePageJp.packing"
                // name="username"
                style={{
                  display: "flexs",
                  width: 700,
                  marginLeft: 55,
                  marginBottom: 0,
                }}
              >
                <DatePicker value={receiptDate} onChange={onChangeDate} locale={localeJP} />
                <Select
                  // defaultValue={shipperVal.label}
                  style={{ width: 200 }}
                  placeholder={messages.IncomePageJp.lotNumber}
                // onChange={selShipperChange}
                // options={shipperOptions}
                />
                <Input
                  style={{
                    width: 100, marginLeft: 20, marginBottom: 0,
                  }}
                  placeholder={messages.OutputPage.libraryNumber}
                  value={searchResult.weight} />
                <Input
                  style={{ width: 100, marginBottom: 0, }}
                  placeholder={messages.OutputPage.shipmentNumber}
                  value={searchResult.stock} />
              </Form.Item>
              <Button onClick={insertData} style={{ fontWeight: "bold", width: "100px", fontSize: "15px" }}>
                {messages.IncomePageJp.addition}
              </Button>
            </Space>
          </div>
          <Divider />
        </div>
        <IncomeTable
          data={data}
          editRow={editRow}
          deleteRow={deleteRow}
          pagination={false}
        />
        <div style={{ height: 15 }}></div>
        <div style={{ justifyContent: "flex-end", display: "flex" }}>
          <Button style={{ width: 150, }}>{messages.buttons.csvExchange}</Button>
          <div style={{ width: 40 }}></div>
          <Button style={{ width: 150, }} >{messages.buttons.confirmDeparture}</Button>
        </div>
      </Content>
    </div>
  );
};

export default OutputPage;
