import React, { useState, useEffect } from "react";
import axios from "axios";
// import moment from "moment";
import {
  Form,
  Input,
  InputNumber,
  Layout,
  Popconfirm,
  DatePicker,
  Table,
  Typography,
  Button,
  Modal,
  notification,
} from "antd";

import NavbarSection from "../layouts/Header/Navbar";
import FooterSection from "../layouts/Footer/Index";

import message from "../../utils/content/jp.json";
import { render } from "react-dom";

const { Search } = Input;
const { Content } = Layout;

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
  const [editingKey, setEditingKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);

  const [shipperName, setShipperName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [subAddress, setSubAddress] = useState("");
  const [tel, setTel] = useState("");
  // const [calCategory, setCalCategory] = useState("");
  // const [usedTsubos, setUsedTsubos] = useState("");
  // const [discountRate, setDiscountRate] = useState("");
  const [closingDate, setClosingDate] = useState("");

  const handleShipperName = (e) => {
    setShipperName(e.target.value);
  };

  const handlePostCode = (e) => {
    setPostCode(e.target.value);
  };

  const handleMainAddress = (e) => {
    setMainAddress(e.target.value);
  };

  const handleSubAddress = (e) => {
    setSubAddress(e.target.value);
  };
  const handleTel = (e) => {
    setTel(e.target.value);
  };
  // const handleCalCategory = (e) => {
  //   setCalCategory(e.target.value);
  // };
  // const handleUsedTsubo = (e) => {
  //   setUsedTsubos(e.target.value);
  // };
  // const handleDiscountRate = (e) => {
  //   setDiscountRate(e.target.value);
  // };

  const handleClosingDate = (value) => {
    setClosingDate(value);
  };

  const getAllShipper = () => {
    axios.get("http://127.0.0.1:3000/api/shipper").then((res) => {
      let index = 0;
      const shipperData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setAllData(shipperData);
      console.log(shipperData, "resData");
    });
  };

  const createShipper = () => {
    if (
      shipperName &&
      mainAddress &&
      subAddress &&
      postCode &&
      tel &&
      // calCategory &&
      // usedTsubos &&
      // discountRate &&
      closingDate
    ) {
      axios
        .post("http://127.0.0.1:3000/api/shipper", {
          name: shipperName,
          post_code: postCode,
          mainAddress: mainAddress,
          subAddress: subAddress,
          tel: tel,
          // calc_category: calCategory,
          // used_tsubo_price: usedTsubos,
          // discourt_rate: discountRate,
          closng_date: closingDate,
        })
        .then((res) => {
          notification.success({ message: "Success", duration: 1 });
          setIsModalOpen(false);
          setShipperName("");
          setMainAddress("");
          setSubAddress("");
          // setCalCategory("");
          // setDiscountRate("");
          setClosingDate("");
          setTel("");
          getAllShipper();
        });
    } else {
      notification.warning({ message: "Complete All Input!", duration: 1 });
    }
  };

  useEffect(() => {
    getAllShipper();
  }, []);

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
      const newData = [...allData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setAllData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setAllData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const shipperListColumns = [
    {
      title: `${message.tableCommon.no}`,
      dataIndex: "id",
      key: "id",
      width: "5%",
      editable: true,
    },
    {
      title: `${message.shipper.name}`,
      dataIndex: "name",
      key: "name",
      width: "30%",
      editable: true,
    },
    {
      title: `${message.shipper.main_address}`,
      dataIndex: "main_address",
      key: "mainAddress",
      width: "30%",
      editable: true,
    },
    {
      title: `${message.shipper.tel_number}`,
      dataIndex: "tel",
      key: "tel",
      width: "15%",
      editable: true,
    },
    {
      title: `${message.shipper.closing_date}`,
      dataIndex: "closing_date",
      width: "10%",
      key: "closing_date",
      render: (closingDate, record) => {
        <DatePicker
          value={closingDate}
          onChange={(date) => handleDateChange(date, record.key)}
        />;
      },
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
          <div
            className="mt-4"
            style={{ marginRight: "80px", marginTop: "10px" }}
          >
            <Button onClick={showModal}>{message?.Maintenance?.addNew}</Button>
            <Modal
              title={message.Maintenance.shipperMaster}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="ok" onClick={createShipper}>
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
                    {message.Maintenance.shipperName}
                  </label>
                  <Input
                    type="text"
                    value={shipperName}
                    onChange={handleShipperName}
                    style={{ width: "40%" }}
                  />
                </div>

                <div>
                  <label style={{ marginRight: "12px" }}>
                    {message.Maintenance.postCode}
                  </label>
                  <Input
                    type="text"
                    value={postCode}
                    onChange={handlePostCode}
                    style={{ width: "30%", marginTop: "20px" }}
                  />
                </div>
                <div>
                  <label style={{ marginRight: "24px" }}>
                    {message.Maintenance.mainAddress}
                  </label>
                  <Input
                    type="text"
                    value={mainAddress}
                    onChange={handleMainAddress}
                    style={{ width: "50%" }}
                  />
                </div>
                <div>
                  <label style={{ marginRight: "25px" }}>
                    {message.Maintenance.subAddress}
                  </label>
                  <Input
                    type="text"
                    value={subAddress}
                    onChange={handleSubAddress}
                    style={{ width: "50%" }}
                  />
                </div>
                <div>
                  <label style={{ marginRight: "12px" }}>
                    {message.Maintenance.telephoneNumber}
                  </label>
                  <Input
                    type="text"
                    value={tel}
                    onChange={handleTel}
                    style={{ width: "30%" }}
                  />
                </div>

                <div>
                  <label style={{ marginRight: "38px" }}>
                    {message.Maintenance.closingDate}
                  </label>
                  <DatePicker
                    type="text"
                    value={closingDate}
                    onChange={handleClosingDate}
                    style={{ width: "30%", marginTop: "20px" }}
                  />
                </div>
                {/* <div>
                  <label style={{ marginRight: "12px" }}>
                    {message.Maintenance.calCategory}
                  </label>
                  <Input
                    type="text"
                    value={calCategory}
                    onChange={handleCalCategory}
                    style={{ width: "30%" }}
                  />
                </div> */}
                {/* <div>
                  <label style={{ marginRight: "12px" }}>
                    {message.Maintenance.usedTsubos}
                  </label>
                  <Input
                    type="text"
                    value={usedTsubos}
                    onChange={handleUsedTsubo}
                    style={{ width: "30%" }}
                  />
                </div> */}
                {/* <div>
                  <label style={{ marginRight: "25px" }}>
                    {message.Maintenance.priceTsubo}
                  </label>
                  <Input style={{ width: "30%" }}/>
                </div> */}
                {/* <div>
                  <label style={{ marginRight: "26px" }}>
                    {message.Maintenance.discountRate}
                  </label>
                  <Input
                    type="text"
                    value={discountRate}
                    onChange={handleDiscountRate}
                    style={{ width: "30%" }}
                  />
                </div> */}
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
                dataSource={allData}
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
