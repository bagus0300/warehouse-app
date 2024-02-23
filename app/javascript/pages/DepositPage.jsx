import React, { useState, useEffect } from "react";
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
  Pagination,
  Row,
  Col,
  InputNumber,
} from "antd";
import moment from "moment";
import { API } from "../utils/helper";
import DepositTable from "../components/Deposit/DepositTable";
import lang from "../utils/content/jp.json";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import {
  shipperURL,
  receivedPaymentURL,
  exportDepositCSVDataUrl,
} from "../utils/contants";
import $lang from "../utils/content/jp.json";
import { dateFormat } from "../utils/contants";
import { openNotificationWithIcon } from "../components/common/notification";

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
  const [editShipperOptions, setEditShipperOptions] = useState([]);
  const [shipperDisctription, setShipperDescription] = useState({
    code: "",
    closingDate: "",
  });
  const [registerShipper, setRegisterShipper] = useState({
    value: "",
    label: "",
  });
  const [searchShipper, setSearchShipper] = useState({
    value: "",
    label: "",
  });
  const [depositData, setDepositData] = useState([]);
  const [receivedPaymentData, setReceivedPaymentData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [registerDate, setRegisterDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isposted, setIsPosted] = useState(false);
  const [processDate, setProcessDate] = useState("");
  const [editMode, setEditMode] = useState("new");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [seletedId, setSelectedId] = useState("");
  const [isDelete, setIsDelelte] = useState("true");
  const [inStockRangeDates, setInstockRangeDates] = useState([]);
  const [processRangeDates, setProcessRangeDates] = useState([]);

  const getShippers = () => {
    API.get(shipperURL).then((res) => {
      let index = 1;
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
      setEditShipperOptions(shippers);
      const shippersWithAll = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          key: index++,
          id: item.id,
          code: item.code,
          closingDate: item.closing_date,
        };
      });
      shippersWithAll.unshift({
        value: "",
        label: "ALL",
        index: 1,
        id: 0,
        code: "",
        closingDate: "",
      });
      setShipperOptions(shippersWithAll);
    });
  };

  const getReceivePayment = () => {
    const inStockDateParam =
      inStockRangeDates.length > 0
        ? `&instockFromDate=${new Date(inStockRangeDates[0].toString())
            .toISOString()
            .substring(0, 10)}&instockToDate=${new Date(
            inStockRangeDates[1].toString()
          )
            .toISOString()
            .substring(0, 10)}`
        : "";
    const processDateParam =
      processRangeDates.length > 0
        ? `&instockFromDate=${new Date(processRangeDates[0].toString())
            .toISOString()
            .substring(0, 10)}&instockToDate=${new Date(
            processRangeDates[1].toString()
          )
            .toISOString()
            .substring(0, 10)}`
        : "";
    const searchShipperParam =
      searchShipper.value != "" ? `&shipper=${searchShipper}` : "";
    const urlParam = `${receivedPaymentURL}?offset=${currentPage}&limit=${itemsPerPage}${inStockDateParam}${processDateParam}${searchShipperParam}`;

    API.get(urlParam).then((res) => {
      let index = 0;
      const receivedPayment = res.data.data.data.map((item) => {
        return {
          ...item.attributes,
          shipper_name: item.attributes.shipper.name,
          shipper_code: item.attributes.shipper.code,
          key: index++,
          id: item.id,
        };
      });

      setReceivedPaymentData(receivedPayment);
      setTotal(res.data.count);

      // setShowData(receivedPayment);
    });
  };

  const editRow = (item) => {
    setAmount(item.amount);
    setDescription(item.description);
    setProcessDate(
      item.processing_on != undefined
        ? dayjs.tz(new Date(item.processing_on), "Asia/Tokyo")
        : ""
    );
    setRegisterDate(item.received_on);
    setRegisterDate(dayjs.tz(new Date(item.received_on), "Asia/Tokyo"));

    setRegisterShipper({ value: item.shipper_id, label: item.shipper_name });

    setModalOpen(true);

    setEditMode("edit");
    setSelectedId(item.id);
  };

  const deleteRow = (id) => {
    API.delete(receivedPaymentURL, { data: { id: id } }).then((res) => {
      notification.success({ message: $lang.messages.success, duration: 1 });
      setIsDelelte(true);
    });
  };

  const initDataValue = () => {
    setRegisterShipper({
      value: "",
      label: "",
    });
    setRegisterDate("");
    setAmount("");
    setDescription("");
  };

  const validate = () => {
    if (registerShipper.label == "" || registerDate != "" || amount != "") {
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (!validate()) {
      openNotificationWithIcon(
        "warning",
        $lang.popConrimType.warning,
        $lang.messages.complete_all_nput_fields
      );
      return;
    }
    setModalOpen(false);
    API.post(receivedPaymentURL, {
      shipper_id: registerShipper.value,
      shipper_name: registerShipper.label,
      received_on: registerDate,
      amount: amount,
      description: description,
      processing_on: processDate,
    })
      .then((res) => {
        openNotificationWithIcon(
          "success",
          $lang.popConrimType.warning,
          "正常に作成されました。"
        );
        initDataValue();
        getReceivePayment();
      })
      .then((err) => {});
  };

  const updateResiger = () => {
    if (!validate) {
      return;
    }
    setModalOpen(false);

    API.put(receivedPaymentURL, {
      shipper_id: registerShipper.value,
      shipper_name: registerShipper.label,
      received_on: registerDate,
      amount: amount,
      description: description,
      processing_on: processDate,
      id: seletedId,
    })
      .then((res) => {
        openNotificationWithIcon(
          "warning",
          $lang.popConrimType.warning,
          "正常に作成されました。"
        );
        initDataValue();
        getReceivePayment();
      })
      .then((err) => {});
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage((page - 1) * pageSize);
    setItemPerPage(pageSize);
  };

  const onChangeRegisterShipper = (value, option) => {
    setRegisterShipper({
      value: value,
      label: option.label,
    });
  };

  const onChangeSearchShipper = (value, option) => {
    setSearchShipper({
      value: value,
      label: option.label,
    });
    setShipperDescription({
      code: option.code,
      closingDate: option.closingDate,
    });
  };

  const onchangeProcessRangeDates = (_, dateStrings) => {
    if (!dateStrings[0] || !dateStrings[1]) {
      setProcessDate([]);
      // setPaymentData([]);
      return;
    }
    const fromDate = dayjs(dateStrings[0], "YYYY-MM-DD");
    const toDate = dayjs(dateStrings[1], "YYYY-MM-DD").add(1, "day");
    setProcessRangeDates([fromDate.toDate(), toDate.toDate()]);
  };

  const onchangeInStorkRangeDates = (_, dateStrings) => {
    if (!dateStrings[0] || !dateStrings[1]) {
      setInstockRangeDates([]);
      return;
    }
    const fromDate = dayjs(dateStrings[0], "YYYY-MM-DD");
    const toDate = dayjs(dateStrings[1], "YYYY-MM-DD").add(1, "day");
    // setInstockRangeDates(date);
    setInstockRangeDates([fromDate, toDate]);
  };

  const exportDataAndDownloadCVS = async () => {
    const inStockDateParam =
      inStockRangeDates.length > 0
        ? `&instockFromDate=${new Date(inStockRangeDates[0].toString())
            .toISOString()
            .substring(0, 10)}&instockToDate=${new Date(
            inStockRangeDates[1].toString()
          )
            .toISOString()
            .substring(0, 10)}`
        : "";
    const processDateParam =
      processRangeDates.length > 0
        ? `&instockFromDate=${new Date(processRangeDates[0].toString())
            .toISOString()
            .substring(0, 10)}&instockToDate=${new Date(
            processRangeDates[1].toString()
          )
            .toISOString()
            .substring(0, 10)}`
        : "";
    const searchShipperParam =
      searchShipper.value != "" ? `&shipper=${searchShipper}` : "";
    const urlParam = `${exportDepositCSVDataUrl}?offset=${currentPage}&limit=${itemsPerPage}${inStockDateParam}${processDateParam}${searchShipperParam}`;

    API.get(urlParam)
      .then((response) => {
        const timestamp = Date.now();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "入庫_" + timestamp + ".csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          openNotificationWithIcon(
            "success",
            $lang.popConrimType.success,
            $lang.messages.success
          );
        }, 1000);
      })
      .catch((err) => {
        openNotificationWithIcon(
          "error",
          $lang.popConrimType.error,
          err.messages
        );
      });
  };

  useEffect(() => {
    getShippers();
  }, []);

  useEffect(() => {
    setIsDelelte("false");
    getReceivePayment();
  }, [currentPage, itemsPerPage, isDelete]);

  return (
    <div>
      <Content
        style={{ width: 1280 }}
        className="mx-auto flex flex-col justify-content content-h s-content"
      >
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-2 my-2"
          bordered={false}
        >
          <Row className="my-2">
            <Col span={1}>{$lang.deposit.received_on}:</Col>
            <DatePicker.RangePicker
              style={{ width: 250 }}
              value={inStockRangeDates}
              onChange={onchangeInStorkRangeDates}
            />
          </Row>
          <Row className="my-2">
            <Col span={1}>
              <label>{$lang.inStock.shipper}:</label>
            </Col>
            <Col span={6}>
              <Select
                style={{ width: 250 }}
                options={shipperOptions}
                value={searchShipper.value}
                onChange={onChangeSearchShipper}
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
            <DatePicker.RangePicker
              style={{ width: 250 }}
              value={processRangeDates}
              onChange={onchangeProcessRangeDates}
            />
          </Row>
          <Divider />
          <Row>
            <Space align="center">
              {" "}
              <Button
                className="btn-bg-black"
                style={{ marginLeft: 40 }}
                onClick={getReceivePayment}
              >
                {$lang.buttons.search}
              </Button>
              <Button
                className="btn-bg-black ml-1"
                onClick={exportDataAndDownloadCVS}
              >
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
                onClick={() => {
                  setEditMode("new");
                  setSelectedId("");
                  setModalOpen(true);
                }}
              >
                {$lang.buttons.register}
              </Button>
              <Modal
                title={$lang.buttons.register}
                open={isModalOpen}
                footer={[
                  <Button
                    onClick={editMode == "new" ? handleRegister : updateResiger}
                    key="ok"
                    className="btn-bg-black"
                  >
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
                <div style={{ marginTop: 30, marginBottom: 30 }}>
                  <div className="my-2">
                    {$lang.Maintenance.shipperName}:
                    <Select
                      style={{ width: 200, marginLeft: 43 }}
                      options={editShipperOptions}
                      value={registerShipper.value}
                      onChange={onChangeRegisterShipper}
                    />
                  </div>
                  <div className="my-2">
                    {$lang.deposit.depositDate}
                    {" :"}
                    <DatePicker
                      style={{ marginLeft: 15, width: 200 }}
                      placeholder={$lang.deposit.depositDate}
                      value={registerDate}
                      format={dateFormat}
                      onChange={(date, dt) => {
                        if (dt == "") {
                          setRegisterDate(dayjs(currentDate, dateFormat));
                        } else {
                          setRegisterDate(dayjs(date, dateFormat));
                        }
                      }}
                    />
                  </div>
                  <div className="my-2">
                    {$lang.deposit.amount}:
                    <Input
                      style={{ width: 200, marginLeft: 45 }}
                      value={amount}
                      type="number"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="my-2">
                    {$lang.deposit.description}
                    {" :"}
                    <Input
                      style={{ width: 200, marginLeft: 57 }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    {$lang.deposit.processing_onDate}
                    {" :"}
                    <DatePicker
                      style={{ marginLeft: 30, width: 200 }}
                      placeholder={$lang.deposit.processing_onDate}
                      value={processDate}
                      format={dateFormat}
                      onChange={(date, dt) => {
                        if (dt == "") {
                          setProcessDate(dayjs(currentDate, dateFormat));
                        } else {
                          setProcessDate(dayjs(date, dateFormat));
                        }
                      }}
                    />
                  </div>
                </div>
              </Modal>
            </Col>
          </Row>
          <div className="my-2">
            <DepositTable
              data={receivedPaymentData}
              editRow={(key) => editRow(key)}
              deleteRow={deleteRow}
              is_edit={1}
            />
            <div className="flex justify-center w-full bg-base-200 rounded-md mt-5">
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={total}
                onChange={handlePageChange}
                pageSizeOptions={[10, 20, 50, 100]}
                showSizeChanger
                className="p-1"
                style={{ float: "right" }}
              />
            </div>
          </div>
        </Card>
      </Content>
    </div>
  );
};

export default deposit;
