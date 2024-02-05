import React from "react";
import { Form, Layout, Select, Space, Input, DatePicker, Divider, Button } from "antd";

import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import IncomeTable from "../components/Income/IncomeTable";
import localeJP from "antd/es/date-picker/locale/ja_JP";
import messages from "../utils/content/jp.json";
import { useState } from "react";

const { Search } = Input;
const { Content } = Layout;

const IncomePage = () => {

  // backend data start

  const storeOptions = [
    {value: 0, label: "一般倉庫"},
    {value: 1, label: "編集"},
    {value: 2, label: "削除"},
    {value: 3, label: "代替テキスト"}
  ];

  const shipperOptions = [
    {value: 0, label: "株式会社XXXXXX（○○倉庫製品）"},
    {value: 1, label: "編集"},
    {value: 2, label: "削除"},
    {value: 2, label: "代替テキスト"},
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
      action: ["変更", "削除"],
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
      action: ["変更", "削除"],
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
      action: ["変更", "削除"],
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
      action: ["変更", "削除"],
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
      action: ["変更", "削除"],
      key: "5"
    }
  ];

  // backend data end

  const [data, setData] = useState([]);

  const [storeVal, setStoreVal] = useState(storeOptions[0]);
  const [shipperVal, setShipperVal] = useState(shipperOptions[0]);
  const [receiptDate, setReceiptDate] = useState();
  const [searchResult, setSearchResult] = useState({});

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
    console.log(result);
    setSearchResult(result);
  }

  const editRow = (idx) => {
    console.log('edit', idx);
  }

  const deleteRow = (idx) => {
    console.log('delete', idx);
  }

  const insertData = () => {
    const newData = data.slice();
    newData.push(searchResult);
    setData(newData);
    console.log(data);
  };

  return (
    <div>
      <NavbarSection />
      <Content
        style={{ width: 1024 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <div
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ margin: "50px 0 0px 0" }}
        >
          <Space direction="horizontal">
            <Form.Item
              label="倉庫"
              name="username"
              style={{ display: "inline-block", width: 200, marginBottom: 0 }}
            >
              <Select
                defaultValue={storeVal.label}
                onChange={selStoreChange}
                style={{ width: 140 }}
                options={storeOptions}
              />
            </Form.Item>
            <Form.Item
              label="荷主"
              name="username"
              style={{ display: "inline-block", width: 300, marginBottom: 0 }}
            >
              <Select
                defaultValue={shipperVal.label}
                style={{ width: 280 }}
                onChange={selShipperChange}
                options={shipperOptions}
              />
            </Form.Item>
            <Form.Item
              label="入庫日"
              name="username"
              style={{
                display: "inline-block",
                width: 250,
                marginLeft: 30,
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
                label="品番"
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginBottom: 0,
                }}
              >
                <Search
                  placeholder="品番"
                  allowClear
                  enterButton="検索"
                  value={searchResult.product_id}
                  onSearch={onSearch}
                />
              </Form.Item>
            </Space>
          </div>
          <div>
            <Space direction="horizontal" style={{ margin: "0 0 20px 0" }}>
              <Form.Item
                label="品名"
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginBottom: 0,
                }}
              >
                <Space.Compact>
                  <Input placeholder="品名" value={searchResult.product_name}/>
                </Space.Compact>
              </Form.Item>
              <Form.Item
                label="荷姿"
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginLeft: 30,
                  marginBottom: 0,
                }}
              >
                <Space.Compact>
                  <Input placeholder="荷姿" value={searchResult.product_type}/>
                </Space.Compact>
              </Form.Item>
              <Form.Item
                label="荷姿"
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginLeft: 30,
                  marginBottom: 0,
                }}
              >
                <Space.Compact>
                  <Input placeholder="荷役単価" value={searchResult.cargoPrice}/>
                  <Input placeholder="保管単価" value={searchResult.storagePrice}/>
                </Space.Compact>
              </Form.Item>
            </Space>
            <Space>
              <Form.Item
                  // label="messages.IncomePageJp.packing"
                  // name="username"
                style={{
                  display: "inline-block",
                  width: 400,
                  marginLeft: 40,
                  marginBottom: 0,
                }}
              >
                <Input style={{ width: 150 }} placeholder={messages.IncomePageJp.lotNumber} value={searchResult.lotNumber} />
                <Input style={{ width: 100 }} placeholder={messages.IncomePageJp.weight+"(kg)"} value={searchResult.weight}/>
                <Input style={{ width: 100 }} placeholder={messages.IncomePageJp.itemNumber} value={searchResult.stock}/>
              </Form.Item>
              <Button onClick={ insertData } style={{fontWeight: "bold", width: "100px", fontSize: "15px"}}>{messages.IncomePageJp.addition}</Button>
            </Space>
          </div>
          <Divider />
        </div>
        <IncomeTable
          data={data}
          editRow={editRow}
          deleteRow={deleteRow}
        />
      </Content>
      <FooterSection />
    </div>
  );
};

export default IncomePage;
