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
  Row,
  Col,
} from "antd";
import moment from "moment";
import { API } from "../utils/helper";
import DepositTable from "../components/Deposit/DepositTable";
import localeJP from "antd/es/date-picker/locale/ja_JP";
import lang from "../utils/content/jp.json";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import {
  shipperURL,
  postReceivedPaymentURL,
  getReceivedPaymentURL,
} from "../utils/contants";
import $lang from "../utils/content/jp.json";

const { Search } = Input;
const { Content } = Layout;

const { RangePicker } = DatePicker;
const deposit = () => {
  // useEffect(() => {
  //   getShowData();
  // }, [searchBtn]);

  // useEffect(() => {
  //   getShowData();
  //   getAllReceivedValue();
  // }, []);

  // useEffect(() => {
  //   getAllShipper();
  //   getAllReceivedValue();
  //   setIsDelelte("false");
  // }, [modalOpen, isModalOpen, isDelete, depositDate]);
  const [shipperOptions, setShipperOptions] = useState([]);
  const [seletedShipper, setSeletedShipper] = useState({
    value: "",
    label: "",
  });
  const [shipperDisctription, setShipperDescription] = useState({
    code: "",
    closingDate: "",
  });
  const [depositData, setDepositData] = useState([]);
  const [receivedPaymentData, setReceivedPaymentData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const getShippers = () => {
    API.get(shipperURL).then((res) => {
      let index = 0;
      const shippers = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          key: index++,
          id: item.id,
          code: item.code,
          closingDate: item.closing_date,
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

  const getAllReceivedPayment = () => {
    API.get(getReceivedPaymentURL).then((res) => {
      let index = 0;
      const receivedPayment = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
          id: item.id,
        };
      });

      setReceivedPaymentData(receivedPayment);
      // setShowData(receivedPayment);
    });
  };

  const deleteRow = (id) => {
    API.delete(postReceivedPaymentURL, { id }).then((res) => {});
    notification.success({ message: "正常に削除されました。", duration: 1 });
    setIsDelelte(true);
  };
  const handleEdit = async () => {
    let data = await form.validateFields();
    if (updateData) {
      API.put(getReceivedPaymentURL, { id: updateData.id, ...data })
        .then((res) => {
          notification.success({
            message: "編集が成功しました。",
            duration: 1,
          });
          setModalOpen(false);
        })
        .catch((err) => {});
    }
  };

  const editRow = (item) => {
    // form.setFieldsValue({
    //   description: item.description,
    //   receivedShipperCode: "",
    //   shipper_id: item.shipper_id,
    //   amount: item.amount,
    //   received: item.received,
    //   received_on: item.received_on,
    //   processingOnDate: "",
    //   key: item.key,
    // });
    // setModalOpen(true);
    // setUpdateData(item);
  };

  const handleOK = () => {
    // setModalOpen(false);
    // makeHttpReq(
    //   makeHttpOptions(
    //     {
    //       shipper_id: shipperId.id,
    //       shipper_name: shipperId.name,
    //       received_on: depositDate,
    //       amount: amount,
    //       description: description,
    //       processing_on: "",
    //       received: "1",
    //     },
    //     "post",
    //     postReceivedPaymentURL
    //   )
    // ).then((req) => {});
    // notification.success({ message: "正常に作成されました。", duration: 1 });
    // initDataValue();
    // getAllReceivedValue();
  };

  const showModal = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    getShippers();
    getAllReceivedPayment();
  }, []);

  return (
    <div>
      <Content
        style={{ width: 1280 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-2 my-2"
          bordered={false}
        >
          <Row className="my-2">
            <Col span={1}>{$lang.deposit.received_on}:</Col>
            <DatePicker.RangePicker style={{ width: 250 }} />
          </Row>
          <Row className="my-2">
            <Col span={1}>
              <label>{$lang.inStock.shipper}:</label>
            </Col>
            <Col span={6}>
              <Select
                style={{ width: 250 }}
                options={shipperOptions}
                value={seletedShipper.value}
                // value={shipperId.name}
                // onChange={selShipperChange}
              />
              <p>
                {shipperOptions.length > 0 && (
                  <span className="" style={{ marginLeft: 0 }}>
                    {$lang.inStock.shipper} :&nbsp;&nbsp;
                    {shipperDisctription.code} &nbsp;/ &nbsp;
                    {shipperDisctription.closingDate}
                  </span>
                )}{" "}
              </p>
            </Col>
          </Row>
          <Row className="my-2">
            <Col span={1}>{$lang.deposit.processing_on}:</Col>
            <DatePicker.RangePicker style={{ width: 250 }} />
          </Row>
          <Divider />
          <Row>
            <Space align="center">
              {" "}
              <Button className="btn-bg-black" style={{ marginLeft: 40 }}>
                {$lang.buttons.search}
              </Button>
              <Button className="btn-bg-black ml-1">
                {$lang.buttons.csvExchange}
              </Button>
            </Space>
          </Row>
        </Card>
        <Card bordered={false} className="py-4 " style={{ marginTop: "20px" }}>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Button
                className="btn-bg-black"
                style={{ float: "right" }}
                onClick={() => setModalOpen(true)}
              >
                {$lang.buttons.register}
              </Button>
              <Modal
                title={$lang.buttons.register}
                open={isModalOpen}
                onOk={handleOK}
                onCancel={() => setModalOpen(false)}
                footer={[
                  <Button onClick={handleOK} key="ok" className="btn-bg-black">
                    {$lang.buttons.save}
                  </Button>,
                  <Button
                    key="cancel"
                    onClick={() => setModalOpen(false)}
                    className=""
                  >
                    {$lang.buttons.cancel}
                  </Button>,
                ]}
              >
                {/* label={$lang.Maintenance.shipperName} */}
                <Select
                  style={{ width: 200, marginLeft: 43 }}
                  options={shipperOptions}
                  value={seletedShipper.name}
                  // onChange={selShipperChange}
                />
                <Divider />
                <div>
                  <DatePicker
                    style={{ marginLeft: 15, width: 200 }}
                    placeholder={$lang.deposit.depositDate}
                    // value={outStockDate}
                    // onChange={(date, dt) => {
                    //   if (dt == "") {
                    //     setOutStockDate(dayjs(currentDate, dateFormat));
                    //   } else {
                    //     setOutStockDate(dayjs(date, dateFormat));
                    //   }
                    // }}
                    // className="ml-1"
                    // format={dateFormat}
                  />
                </div>
                <div style={{ height: 20 }}></div>
                {/* label={$lang.deposit.amount} */}
                <Input
                  style={{ width: 200, marginLeft: 43 }}
                  // value={amount}
                  type="number"
                  // onChange={(e) => selAmount(e.target.value)}
                />
                <div style={{ height: 20 }}></div>
                {/* <Form.Item
                    label={$lang.deposit.description}
                    style={{
                      display: "",
                      width: 400,
                      marginBottom: 0,
                      flexFlow: "nowrap",
                    }}
                  > */}
                <Input
                  style={{ width: 200, marginLeft: 57 }}
                  // value={description}
                  // onChange={(e) => selDescription(e.target.value)}
                />
              </Modal>
            </Col>
          </Row>
          <div className="my-2">
            <DepositTable
              data={receivedPaymentData}
              editRow={(key) => editRow(key)}
              deleteRow={deleteRow}
              pagination={true}
            />
          </div>
        </Card>
      </Content>
    </div>
  );
};

export default deposit;
