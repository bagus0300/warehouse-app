import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  Form,
  Layout,
  Select,
  Space,
  Input,
  DatePicker,
  Divider,
  Button,
  Modal,
  notification,
  Card,
} from "antd";
import moment from "moment";
import { makeHttpReq, makeHttpOptions } from "../utils/helper";
import DepositTable from "../components/Deposit/DepositTable";
import localeJP from "antd/es/date-picker/locale/ja_JP";
import messages from "../utils/content/jp.json";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import {
  shipperURL,
  postReceivedPaymentURL,
  getReceivedPaymentURL,
} from "../utils/contants";

const { Search } = Input;
const { Content } = Layout;

const { RangePicker } = DatePicker;
const DepositPage = () => {
  const [form] = Form.useForm();
  const [updateData, setUpdateData] = useState({});
  const [isDelete, setIsDelelte] = useState("true");

  // variables for filter
  const [receivedDateRange, setReceivedDateRange] = useState([]);
  const [processedDateRange, setProcessedDateRange] = useState([]);
  const [showData, setShowData] = useState([]);
  const [searchBtn, setSearchBtn] = useState(false);
  const [searchShipperName, setSearchShipperName] = useState("");

  // -----------Table Data--------------
  const [prepareProducts, setPrepareProducts] = useState([]);

  // ----------Modal---------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // ----------Register values-----------
  const handleOK = () => {
    setIsModalOpen(false);
    makeHttpReq(
      makeHttpOptions(
        {
          shipper_id: shipperId.id,
          shipper_name: shipperId.name,
          received_on: depositDate,
          amount: amount,
          description: description,
          processing_on: "",
          received: "1",
        },
        "post",
        postReceivedPaymentURL
      )
    ).then((req) => {});
    notification.success({ message: "正常に作成されました。", duration: 1 });
    initDataValue();
    getAllReceivedValue();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalOpen(false);
  };

  // -----------Modal Value------------
  const [shipperId, setShipperId] = useState({ id: "", name: "", code: "" });
  const [shipperOptions, setShipperOptions] = useState();
  const selShipperChange = (value, option) => {
    setShipperId({ id: option.id, name: value, code: option.code });
  };

  const [depositDate, setDepositDate] = useState();
  const selDepositDate = (value) => {
    setDepositDate(value);
  };

  const [amount, setAmount] = useState();
  const selAmount = (value) => {
    setAmount(value);
  };

  const [description, setDescription] = useState();
  const selDescription = (value) => {
    setDescription(value);
  };

  // -------Initize modal values when we click save button-------
  const initDataValue = () => {
    setShipperId("");
    setDepositDate("");
    setAmount("");
    setDescription("");
  };

  // ------Get shipperId and shipperName for select value from database "shippers"------
  const getAllShipper = () => {
    makeHttpReq(makeHttpOptions({}, "get", shipperURL)).then((res) => {
      let index = 0;
      const shipper = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          key: index++,
          id: item.id,
          code: item.code,
        };
      });
      setShipperOptions(shipper);
    });
  };

  // ---------Get shipperId and shipperName for select value from database "received_on"--------
  const getAllReceivedValue = () => {
    makeHttpReq(makeHttpOptions({}, "get", getReceivedPaymentURL)).then(
      (res) => {
        let index = 0;
        const receivedPayment = res.data.data.map((item) => {
          return {
            ...item,
            key: index++,
            id: item.id,
          };
        });
        setPrepareProducts(receivedPayment);
        setShowData(receivedPayment);
      }
    );
  };

  // ----------Modal End------------

  // ----------table value-----------

  // ------------Edit---------------
  const editRow = (item) => {
    form.setFieldsValue({
      description: item.description,
      receivedShipperCode: "",
      shipper_id: item.shipper_id,
      amount: item.amount,
      received: item.received,
      received_on: item.received_on,
      processingOnDate: "",
      key: item.key,
    });

    setModalOpen(true);
    setUpdateData(item);
  };

  const handleEdit = async () => {
    let data = await form.validateFields();
    if (updateData) {
      makeHttpReq(
        makeHttpOptions(
          {
            id: updateData.id,
            ...data,
          },
          "put",
          getReceivedPaymentURL
        )
      );
      notification.success({ message: "編集が成功しました。", duration: 1 });
      setModalOpen(false);
    }
  };

  const deleteRow = (id) => {
    makeHttpReq(makeHttpOptions({ id }, "delete", postReceivedPaymentURL)).then(
      (res) => {}
    );
    notification.success({ message: "正常に削除されました。", duration: 1 });
    setIsDelelte(true);
  };

  // search data for filtering
  const handleSearchSelect = (value) => {
    setSearchShipperName(value);
  };
  const getByReceivedDate = (data) => {
    if (receivedDateRange) {
      return data.filter((item) => {
        const itemDate = item.received_on; // Assuming the date property is in a valid format
        const startDate = moment(receivedDateRange[0]?.toDate()).format(
          "YYYY-MM-DD"
        );
        const endDate = moment(receivedDateRange[1]?.toDate()).format(
          "YYYY-MM-DD"
        );
        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        } else if (startDate) {
          return itemDate >= startDate;
        } else if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    } else {
      return data;
    }
  };
  const getByShipperName = (data) => {
    if (searchShipperName) {
      return data.filter((item) => item.shipper_id == searchShipperName);
    } else {
      return data;
    }
  };
  const getByProcessedDate = (data) => {
    if (processedDateRange) {
      return data.filter((item) => {
        const itemDate = item.processing_on; // Assuming the date property is in a valid format
        const startDate = moment(processedDateRange[0]?.toDate()).format(
          "YYYY-MM-DD"
        );
        const endDate = moment(processedDateRange[1]?.toDate()).format(
          "YYYY-MM-DD"
        );
        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        } else if (startDate) {
          return itemDate >= startDate;
        } else if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    } else {
      return data;
    }
  };

  const getShowData = () => {
    setSearchBtn(true);
    const res0 = getByReceivedDate(prepareProducts);
    const res1 = getByShipperName(res0);
    //const res2 = getByProcessedDate(res1);
    console.log("resgetshowdata", res1);
    setShowData(res1);
  };

  useEffect(() => {
    getShowData();
  }, [searchBtn]);

  useEffect(() => {
    getShowData();
    getAllReceivedValue();
  }, []);

  useEffect(() => {
    getAllShipper();
    getAllReceivedValue();
    setIsDelelte("false");
  }, [modalOpen, isModalOpen, isDelete, depositDate]);

  return (
    <div>
      <Content
        style={{ width: 1280 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <div name="basic" autoComplete="off" style={{ margin: "50px 0 0px 0" }}>
          <Card style={{}} bordered={false} className="py-4">
            <Button
              style={{ width: 120, cursor: "pointer" }}
              onClick={showModal}
              className="btn-bg-black"
            >
              {messages.buttons.register}
            </Button>
            <Modal
              title={messages.buttons.register}
              open={isModalOpen}
              onOk={handleOK}
              onCancel={handleCancel}
              footer={[
                <Button onClick={handleOK} key="ok" className="btn-bg-black">
                  {messages.buttons.save}
                </Button>,
                <Button
                  key="cancel"
                  onClick={handleCancel}
                  className="btn-bg-black"
                >
                  {messages.buttons.cancel}
                </Button>,
              ]}
            >
              <Form>
                <Form.Item
                  label={messages.Maintenance.shipperName}
                  style={{
                    display: "",
                    width: 300,
                    marginBottom: 0,
                    flexFlow: "nowrap",
                  }}
                >
                  <Select
                    style={{ width: 200, marginLeft: 43 }}
                    options={shipperOptions}
                    value={shipperId.name}
                    onChange={selShipperChange}
                  />
                </Form.Item>
                <Divider />
                <Form.Item
                  label={messages.DepositPage.depositDate}
                  style={{
                    display: "inline-block",
                    width: 400,
                    marginBottom: 0,
                  }}
                >
                  <Input
                    type="date"
                    placeholder={messages.DepositPage.depositDate}
                    style={{ marginLeft: 15, width: 200 }}
                    value={depositDate}
                    onChange={(e) => selDepositDate(e.target.value)}
                  />
                </Form.Item>
                <div style={{ height: 20 }}></div>
                <Form.Item
                  label={messages.DepositPage.amount}
                  style={{
                    display: "",
                    width: 400,
                    marginBottom: 0,
                    flexFlow: "nowrap",
                  }}
                >
                  <Input
                    style={{ width: 200, marginLeft: 43 }}
                    value={amount}
                    type="number"
                    onChange={(e) => selAmount(e.target.value)}
                  />
                </Form.Item>
                <div style={{ height: 20 }}></div>
                <Form.Item
                  label={messages.DepositPage.description}
                  style={{
                    display: "",
                    width: 400,
                    marginBottom: 0,
                    flexFlow: "nowrap",
                  }}
                >
                  <Input
                    style={{ width: 200, marginLeft: 57 }}
                    value={description}
                    onChange={(e) => selDescription(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Modal>
            <div>
              <div style={{ height: 20 }}></div>
              <label>{messages.DepositPage.received_on}:</label>
              <RangePicker
                style={{ marginLeft: 11 }}
                placeholder={[
                  `${messages.DepositPage.received_onFrom}`,
                  `${messages.DepositPage.received_onTo}`,
                ]}
                onChange={setReceivedDateRange}
                allowClear={false}
              />
              <div style={{ height: 15 }}></div>
              <label>{messages.IncomePageJp.shipper}:</label>
              <Select
                style={{ width: 200, marginLeft: 24 }}
                placeholder={messages.Maintenance.shipperName}
                value={searchShipperName}
                onChange={handleSearchSelect}
                options={shipperOptions}
              />
              <div style={{ height: 15 }}></div>
              <label>{messages.DepositPage.processing_on}:</label>
              <RangePicker
                style={{ marginLeft: 11 }}
                placeholder={[
                  `${messages.DepositPage.processing_onFrom}`,
                  `${messages.DepositPage.processing_onTo}`,
                ]}
                onChange={setProcessedDateRange}
                allowClear={false}
              />
              <Button
                onClick={getShowData}
                style={{ width: 120, marginLeft: 60 }}
                className="btn-bg-black"
              >
                {messages.IncomePageJp.search}
              </Button>
              <Button
                style={{ width: 150, marginLeft: 60 }}
                className="btn-bg-black"
              >
                {messages.buttons.csvExchange}
              </Button>
            </div>
          </Card>
        </div>
        <Card bordered={false} className="py-4 " style={{ marginTop: "20px" }}>
          <DepositTable
            data={showData}
            editRow={(key) => editRow(key)}
            deleteRow={deleteRow}
            pagination={true}
          />
          {/* <div style={{    display: "flex", marginTop: 20, justifyContent: "flex-end"}}>
						<Button style={{width: 120, }}>{messages.buttons.next}</Button>
				</div> */}
        </Card>
      </Content>
      <Modal
        form={form}
        title={messages.buttons.register}
        open={modalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleEdit} key="ok">
            {messages.buttons.save}
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            {messages.buttons.cancel}
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label={messages.DepositPage.description}
            style={{
              display: "",
              width: 300,
              marginBottom: 0,
              flexFlow: "nowrap",
            }}
            name={"description"}
          >
            <Input style={{ width: 200, marginLeft: 57 }} />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.DepositPage.received}
            style={{
              display: "",
              width: 300,
              marginBottom: 0,
              flexFlow: "nowrap",
            }}
            name={"received"}
          >
            <Input disabled style={{ width: 200, marginLeft: 57 }} />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.DepositPage.shipperCode}
            style={{
              display: "",
              width: 300,
              marginBottom: 0,
              flexFlow: "nowrap",
            }}
            name={""}
          >
            <Input style={{ width: 200, marginLeft: 15 }} />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.Maintenance.shipperName}
            style={{
              display: "",
              width: 300,
              marginBottom: 0,
              flexFlow: "nowrap",
            }}
            name={"shipper_id"}
          >
            <Select
              style={{ width: 200, marginLeft: 43 }}
              options={shipperOptions}
            />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.DepositPage.received_on}
            style={{
              display: "inline-block",
              width: 400,
              marginBottom: 0,
            }}
            name={"received_on"}
          >
            <Input
              type="date"
              placeholder={messages.DepositPage.received_on}
              style={{ marginLeft: 43, width: 200 }}
            />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.DepositPage.processing_onDate}
            style={{
              display: "inline-block",
              width: 400,
              marginBottom: 0,
            }}
            name={"processingOnDate"}
          >
            <Input
              type="date"
              placeholder={messages.DepositPage.processing_onDate}
              style={{ marginLeft: 30, width: 200 }}
            />
          </Form.Item>
          <div style={{ height: 20 }}></div>
          <Form.Item
            label={messages.DepositPage.amount}
            style={{
              display: "",
              width: 400,
              marginBottom: 0,
              flexFlow: "nowrap",
            }}
            name={"amount"}
          >
            <Input style={{ width: 200, marginLeft: 43 }} type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepositPage;
