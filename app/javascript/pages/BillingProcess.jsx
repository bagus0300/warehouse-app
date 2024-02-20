import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import $lang from "../utils/content/jp.json";
import CTable from "../components/CTable";
import { makeHttpReq, makeHttpOptions } from "../utils/helper";
import { warehouseURL, shipperURL } from "../utils/contants";
const { RangePicker } = DatePicker;

import {
  Form,
  Input,
  InputNumber,
  Layout,
  Popconfirm,
  Table,
  Select,
  Button,
  Modal,
  notification,
  DatePicker,
  message,
} from "antd";
const { Content } = Layout;

const BillingProcess = () => {
  const billingProcessColumns = [
    {
      title: `${$lang.billing.number}`,
      dataIndex: "key",
      align: "center",
      width: "8%",
    },
    {
      title: `${$lang.Maintenance.shipperID}`,
      key: "name",
      width: "8%",
      dataIndex: "name",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.name.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.shipperName}`,
      key: "name",
      width: "10%",
      dataIndex: "name",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.name.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.billing.lastBilledAmount}`,
      key: "name",
      width: "10%",
      dataIndex: "name",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.name.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.DepositPage.amount}`,
      key: "name",
      width: "10%",
      dataIndex: "name",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.name.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.handlingFee}`,
      dataIndex: "handling_fee_rate",
      key: "handling_fee_rate",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.storageFee}`,
      dataIndex: "storage_fee_rate",
      key: "storage_fee_rate",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.billing.billingAmout}`,
      dataIndex: "fee_category",
      align: "center",
      key: "fee_category",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.billing.consumptionTax}`,
      dataIndex: "fee_category",
      align: "center",
      key: "fee_category",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.billing.output}`,
      dataIndex: "operation",
      render: (text, record, dataIndex) => {
        return (
          <div className="flex justify-center">
            <div className="hidden rounded-full">
              {(star_color = record.done == true ? "text-yellow-500" : "")}
            </div>
            <div className="p-2 rounded-full cursor-pointer text-center">
              <PencilSquareIcon
                shape="circle"
                className="w-20"
                style={{ marginRight: "5px" }}
                onClick={() => {
                  setUpdateStatus("Edit");
                  onAction(record);
                }}
              />
            </div>
            <div className="p-2 rounded-full cursor-pointer items-center text-center">
              <TrashIcon
                shape="circle"
                className="w-20"
                onClick={() => {
                  onDelete(record);
                }}
              />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  const [form] = Form.useForm();
  const [allData, setAllData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [dValue, setDValue] = useState();
  const [shipperOptions, setShipperOptions] = useState();
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState({
    value: "",
    label: "",
  });
  // ------------Shipper-----------
  const [seletedShipper, setSeletedShipper] = useState({
    value: "",
    label: "",
  });
  const dateOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const onChangeDateValue = () => {
    console.log("log");
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

  const onChangeWarehouse = (value, option) => {
    setSelectedWarehouse({ value: value, label: option.label });
  };
  const onChangeShipper = (value, option) => {
    setSeletedShipper({ value: value, label: option.label });
  };

  const exportDataAndDownloadPdf = async () => {
    try {
      const response = await axios.post(
        "/api/product_export",
        {
          /* your data */
        },
        {
          responseType: "arraybuffer",
        }
      );

      // Handle the response and initiate the PDF download
      downloadPDF(response);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  const downloadPDF = (response) => {
    const blob = new Blob([response.data], { type: "application/pdf" });
    const fileName = "generated_pdf.pdf";

    // Construct the URL and initiate the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", fileName);
    a.click();
  };

  const exportDataAndDownloadCVS = async () => {
    try {
      const response = await axios.get("/api/product_csv_export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  useEffect(() => {
    getWarehouses();
    getShippers();
  }, []);

  return (
    <Content style={{ width: 1024 }} className="mx-auto content-h">
      <div>
        <div className="mt-5">
          <div className="mt-5  flex flex-row item-center">
            <label>{$lang.billing.billingDate}:</label>
            <DatePicker
              theme={"light"}
              popoverDirection={"down"}
              toggleClassName="invisible"
              showShortcuts={true}
              picker="year"
              className="ml-4"
            />
            <label>{$lang.billing.year}</label>
            <DatePicker
              theme={"light"}
              popoverDirection={"down"}
              toggleClassName="invisible"
              showShortcuts={true}
              picker="month"
              className="ml-4"
            />
            <label>{$lang.billing.month}</label>
            <label className="ml-16">{$lang.billing.day}:</label>
            <Select
              defaultValue={dateOptions[0]}
              onChange={onChangeDateValue}
              value={dValue}
              options={dateOptions.map((v) => ({
                label: v,
                value: v,
              }))}
              style={{ width: 80 }}
            ></Select>

            <Button
              className="btn-bg-black ml-16"
              onClick={exportDataAndDownloadPdf}
            >
              {/* {$lang.buttons.return} */}
              download pdf
            </Button>
            <Button
              className="btn-bg-black ml-16"
              onClick={exportDataAndDownloadCVS}
            >
              {/* {$lang.buttons.return} */}
              download cvs
            </Button>
          </div>
          <div className="mt-5  flex flex-row item-center">
            <label>{$lang.billing.targetPeriod}</label>
            <RangePicker
              theme={"light"}
              popoverDirection={"down"}
              toggleClassName="invisible"
              showShortcuts={true}
              placeholder={["YYYY/MM/DD", "YYYY/MM/DD"]}
              className="ml-4"
            />
          </div>
          <div className="flex flex-row item-center">
            <label>{$lang.billing.targetShipper}</label>
            <Select
              style={{ width: 300, marginLeft: 14 }}
              onChange={onChangeShipper}
              options={shipperOptions}
              value={seletedShipper.value}
              defaultValue={""}
              placeholder={$lang.IncomePageJp.shipper}
            />
          </div>
          <div className="mt-5  flex flex-row item-center ">
            <div>
              <label>{$lang.billing.targetWarehouse}</label>
              <Select
                placeholder={$lang.IncomePageJp.warehouse}
                style={{ width: 150, marginLeft: 14 }}
                value={selectedWarehouse}
                options={warehouseOptions}
                onChange={onChangeWarehouse}
              />
            </div>
            <label className="ml-16"></label>
            <label className="ml-16"></label>
            <Button className="btn-bg-black ml-16">
              {$lang.buttons.calculation}
            </Button>
          </div>
          <div className="mt-5">
            <div>{$lang.billing.new}</div>
            <div className="flex flex-row">
              <Button className="btn-bg-black">
                {$lang.buttons.billingListOutput}
              </Button>
              <label className="ml-16"></label>
              <label className="ml-16"></label>
              <label className="ml-16"></label>
              <Button className="btn-bg-black ml-32">
                {$lang.buttons.billingConfirmed}
              </Button>
            </div>
          </div>
          <div className="mt-5">
            <CTable
              rowKey={(node) => node.key}
              dataSource={allData}
              columns={billingProcessColumns}
              pagination={false}
            />
          </div>
          <div>
            <Button className="btn-bg-black ml-64">{$lang.buttons.next}</Button>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default BillingProcess;
