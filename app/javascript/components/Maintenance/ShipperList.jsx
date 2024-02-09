import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Layout,
  Popconfirm,
  Select,
  Table,
  Typography,
  Button,
  Modal,
  Tabs,
} from "antd";

import NavbarSection from "../layouts/Header/Navbar";
import FooterSection from "../layouts/Footer/Index";

import message from "../../utils/content/jp.json";
import { render } from "react-dom";

const { Search } = Input;
const { Content } = Layout;

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `${i}`,
    age: 32,
    address: `no${i}`,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ShipperList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const shipperListColumns = [
    {
      title: `${message.Maintenance.shipperID}`,
      dataIndex: "name",
      width: "10%",
      editable: true,
    },
    {
      title: `${message.Maintenance.shipperName}`,
      dataIndex: "age",
      width: "20%",
      editable: true,
    },
    {
      title: `${message.Maintenance.address}`,
      dataIndex: "address",
      width: "25%",
      editable: true,
    },
    {
      title: `${message.Maintenance.telephone}`,
      dataIndex: "address",
      width: "25%",
      editable: true,
    },
    {
      title: `${message.Maintenance.endDate}`,
      dataIndex: "address",
      width: "10%",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            {message.Maintenance.change}
          </Typography.Link>
        );
      },
    },
  ];

  const mergedShipperListColumns = shipperListColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <NavbarSection />
      <Content
        style={{ width: 1024 }}
        className="mx-auto flex flex-col content-h"
      >
        <div>
          <div className="mt-4" style={{ marginRight: "80px" }}>
            <Button onClick={showModal}>{message?.Maintenance?.addNew}</Button>
            <Modal
              title={message.Maintenance.shipperMaster}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="ok" onClick={handleOk}>
                  {message.Maintenance.register}
                </Button>,
                <Button key="cancel" onClick={handleCancel}>
                  {message.buttons.cancel}
                </Button>,
              ]}
            >
              <div>
                <div>
                  <label style={{ marginRight: "25px" }}>
                    {message.Maintenance.shipperID}
                  </label>{" "}
                  <Input style={{ width: "30%" }} name="品名id" />
                </div>
                <div>
                  <label style={{ marginRight: "25px" }}>
                    {message.Maintenance.shipperName}
                  </label>
                  <Input style={{ width: "40%" }} name="品番" />
                </div>

                <div>
                  <label style={{ marginRight: "12px" }}>
                    {message.Maintenance.postCode}
                  </label>
                  <Input
                    style={{ width: "30%", marginTop: "20px" }}
                    name="品名"
                  />
                </div>
                <div>
                  <label style={{ marginRight: "28px" }}>
                    {message.Maintenance.address1}
                  </label>{" "}
                  <Input style={{ width: "50%" }} name="住所1" />
                </div>
                <div>
                  <label style={{ marginRight: "22px" }}>
                    {message.Maintenance.address2}
                  </label>{" "}
                  <Input style={{ width: "50%" }} name="住所２" />
                </div>
                <div>
                  <label style={{ marginRight: "12px" }}>
                    {message.Maintenance.telephoneNumber}
                  </label>
                  <Input style={{ width: "30%" }} name="荷姿" />
                </div>

                <div>
                  <label style={{ marginRight: "36px" }}>
                    {message.Maintenance.endDate}
                  </label>{" "}
                  <Input
                    style={{ width: "30%", marginTop: "20px" }}
                    name="荷役料"
                  />
                </div>
                <div>
                  <label style={{ marginRight: "12px" }}>
                    {message.Maintenance.calCategory}
                  </label>
                  <Input style={{ width: "30%" }} name="保管料" />
                </div>
                <div>
                  <label style={{ marginRight: "12px" }}>
                    {message.Maintenance.usedTsubos}
                  </label>
                  <Input style={{ width: "30%" }} name="請求区分" />
                </div>
                <div>
                  <label style={{ marginRight: "25px" }}>
                    {message.Maintenance.priceTsubo}
                  </label>
                  <Input style={{ width: "30%" }} name="請求区分" />
                </div>
                <div>
                  <label style={{ marginRight: "26px" }}>
                    {message.Maintenance.discountRate}
                  </label>
                  <Input style={{ width: "30%" }} name="請求区分" />
                </div>
              </div>
            </Modal>
          </div>
          <div className="mt-10">
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={data}
                columns={mergedShipperListColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </div>
        </div>
      </Content>
      <FooterSection />
    </div>
  );
};
export default ShipperList;
