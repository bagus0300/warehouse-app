import React from "react";
import { Form, Layout, Select, Space, Input, DatePicker, Divider } from "antd";
import type { DatePickerProps } from "antd";

import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import IncomeTable from "../components/Income/IncomeTable";
import localeJP from "antd/es/date-picker/locale/ja_JP";
import type { SearchProps } from "antd/es/input/Search";

const { Search } = Input;
const { Content } = Layout;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const IncomePage: React.FC = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div>
      <NavbarSection />
      <Content
        style={{ width: 1024 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ margin: "50px 0 0px 0" }}
        >
          <Space direction="horizontal">
            <Form.Item<FieldType>
              label="倉庫"
              name="username"
              style={{ display: "inline-block", width: 200, marginBottom: 0 }}
            >
              <Select
                defaultValue="一般倉庫"
                onChange={handleChange}
                style={{ width: 140 }}
                options={[
                  { value: "1", label: "編集" },
                  { value: "2", label: "削除" },
                  { value: "3", label: "代替テキスト" },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="荷主"
              name="username"
              style={{ display: "inline-block", width: 300, marginBottom: 0 }}
            >
              <Select
                defaultValue="株式会社XXXXXX（○○倉庫製品）"
                style={{ width: 280 }}
                onChange={handleChange}
                options={[
                  { value: "1", label: "編集" },
                  { value: "2", label: "削除" },
                  { value: "3", label: "代替テキスト" },
                ]}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="入庫日"
              name="username"
              style={{
                display: "inline-block",
                width: 250,
                marginLeft: 30,
                marginBottom: 0,
              }}
            >
              <DatePicker onChange={onChangeDate} locale={localeJP} />
            </Form.Item>
          </Space>
          <Divider />
          <div>
            <Space direction="horizontal" style={{ margin: "0 0 20px 0" }}>
              <Form.Item<FieldType>
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
                  onSearch={onSearch}
                />
              </Form.Item>
            </Space>
          </div>
          <div>
            <Space direction="horizontal" style={{ margin: "0 0 20px 0" }}>
              <Form.Item<FieldType>
                label="品名"
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginBottom: 0,
                }}
              >
                <Input placeholder="品名" />
              </Form.Item>
              <Form.Item<FieldType>
                label="荷姿"
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginLeft: 30,
                  marginBottom: 0,
                }}
              >
                <Input placeholder="荷姿" />
              </Form.Item>
              <Form.Item<FieldType>
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
                  <Input placeholder="荷役単価" />
                  <Input placeholder="保管単価" />
                </Space.Compact>
              </Form.Item>
            </Space>
          </div>
          <Divider />
        </Form>
        <IncomeTable />
      </Content>
      <FooterSection />
    </div>
  );
};

export default IncomePage;
