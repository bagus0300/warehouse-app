import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import CTable from '../CTable'
import { feeUrl } from "../../utils/contants";

import {
  Form,
  Input,
  InputNumber,
  Table,
  Layout,
  Select,
  Button,
  Modal,
  notification,
} from "antd";

import {
  TrashIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";

import message from "../utils/content/jp.json";

let plan_color, star_color, plan_text;

const { Content } = Layout;

const WarehouseFee = () => {
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [reget, setReget] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [isposted, setIsPosted] = useState(false);

  const [updateStatus, setUpdateStatus] = useState("Create");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);

  const getAllUnitPrice = () => {
    axios.get(`${feeUrl}`).then((res) => {
      let index = 1;
      const feeData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setAllData(feeData);
    });
  };

  const onSubmit = async () => {
    try {
      let fee = await form.validateFields();
      if (updateData) {
        await axios.put(`${feeUrl}`, {
          id: updateData.id, ...fee
        }
        );
        notification.success({ message: 'Update Success' });
        setIsModalOpen(false);
        setIsPosted(!isposted);
      } else {
        await axios.post(`${feeUrl}`, fee);
        notification.success({ message: 'Create Success', duration: 1 })
        setIsModalOpen(false);
        setIsPosted(!isposted);
      }
    } catch (err) {
      notification.error({
        message: "Complete All Input Fields.",
        duration: 1,
      });
    }
  };

  const onDelete = async (item) => {
    try {
      const response = await axios.delete(`${feeUrl}`, { data: { id: item.id } });
      setIsPosted(!isposted);
      notification.success({ message: "Delete Success.", duration: 1 });
      //getAllShipper();
    } catch (error) {
      notification.error({ message: "Server Error", duration: 1 });
    }
  };

  useEffect(() => {
    getAllUnitPrice();
  }, [isposted]);

  const onAction = async (item) => {
    if (item) {
      form.setFieldsValue({
        packaging: item.packaging,
        handling_fee_rate: item.handling_fee_rate,
        storage_fee_rate: item.storage_fee_rate,
        fee_category: item.fee_category,
        code: item.code,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
    setUpdateData(item);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const feeListColumns = [
    {
      title: "No",
      dataIndex: "key",
      sorter: true,
      align: "center",
      width: "5%",
    },
    {
      title: `${message.Maintenance.packing}`,
      key: "packaging",
      dataIndex: "packaging",
      align: "center",
      render: (text, record, dataIndex) => {
        return (
          <div>
            {record.packaging.slice(0, 18)}
            {text.length >= 18 ? "..." : ""}
          </div>
        );
      },
    },
    {
      title: `${message.Maintenance.handlingFeeUnitPrice}`,
      dataIndex: "handling_fee_rate",
      key: "handling_fee_rate",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.handling_fee_rate.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${message.Maintenance.storageFeeUnitPrice}`,
      dataIndex: "storage_fee_rate",
      key: "storage_fee_rate",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.storage_fee_rate.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${message.Maintenance.billingClass}`,
      dataIndex: "fee_category",
      key: "fee_category",
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
      title: `${message.buttons.change}`,
      dataIndex: "operation",
      render: (text, record, dataIndex) => {
        return (
          <div className="flex justify-center items-center">
            <div className="hidden rounded-full">
              {(star_color = record.done == true ? "text-yellow-500" : "")}
            </div>
            <div className="p-2 rounded-full cursor-pointer items-center text-center">
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

  return (
    <div>
      <NavbarSection />
      <Content
        style={{ width: 1024 }}
        className="mx-auto flex flex-col content-h"
      >
        <div>
          <div className="mt-5" style={{ marginLeft: "880px" }}>
            <Button
              onClick={() => {
                onAction();
                setUpdateStatus("Create");
              }}
            >
              {message?.Maintenance?.addNew}
            </Button>
            <Modal
              title={message.Maintenance.shipperMaster}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="ok" onClick={onSubmit}>
                  {message.Maintenance.register}
                </Button>,
                <Button key="cancel" onClick={handleCancel}>
                  {message.buttons.cancel}
                </Button>,
              ]}
            >
              <div>
                <Form
                  form={form}
                  size="middle"
                  scrollToFirstError
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                >
                  <Form.Item
                    label={message.Maintenance.packing}
                    name={"packaging"}
                    rules={[
                      {
                        required: true,
                        message: `${message.tableCommon.warning}`,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={message.shipper.code}
                    name={"code"}
                    rules={[
                      {
                        required: true,
                        message: `${message.tableCommon.warning}`,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={message.Maintenance.handlingFeeUnitPrice}
                    name={"handling_fee_rate"}
                    rules={[
                      {
                        required: true,
                        message: `${message.tableCommon.warning}`,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={message.Maintenance.storageFeeUnitPrice}
                    name={"storage_fee_rate"}
                    rules={[
                      {
                        required: true,
                        message: `${message.tableCommon.warning}`,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={message.Maintenance.billingClass}
                    name={"fee_category"}
                    rules={[
                      {
                        required: true,
                        message: `${message.tableCommon.warning}`,
                      },
                    ]}
                  >
                    <Select
                      defaultValue={message.Maintenance.fullTimeRequest}
                      options={[
                        {
                          value: "0",
                          label: `${message.Maintenance.fullTimeRequest}`,
                        },
                        {
                          value: "1",
                          label: `${message.Maintenance.firstBilling}`,
                        },
                      ]}
                    />
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
          <div className="mt-5">
            <CTable
              rowKey={(node) => node.id}
              dataSource={allData}
              columns={feeListColumns}
              pagination={true}
            />
          </div>
        </div>
      </Content>
      <FooterSection />
    </div>
  );
};
export default WarehouseFee;
